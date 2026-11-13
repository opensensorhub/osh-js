/***************************** BEGIN LICENSE BLOCK ***************************
 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.
 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.
 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.
 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>
 ******************************* END LICENSE BLOCK ***************************/

import {isDefined, isWebWorker, randomUUID} from "../../../utils/Utils.js";
import '../../../resources/css/ffmpegview.css';
import CanvasView from "./CanvasView.js";
import {FrameType} from "./FrameType.js";

/**
 * This class is in charge of displaying H264 data by decoding ffmpeg.js library and displaying into them a YUV canvas.
 * @extends CanvasView
 * @example
 *
 import WebCodecView from 'core/ui/view/video/WebCodecView.js';
 
 let videoView = new WebCodecView({
 container: 'video-h264-container',
 css: 'video-h264',
 name: 'UAV Video',
 layers: [
 new DataLayer({
 dataSourceId: videoDataSource.id,
 getFrameData: (rec) => rec.videoFrame,
 getTimestamp: (rec) => rec.timestamp
 })
 ]
 });
 */

class WebCodecView extends CanvasView {
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {string} properties.container - The div element to attach to
     * @param {string} properties.css - The css classes to set, can be multiple if separate by spaces
     * @param {boolean} properties.visible - set the default behavior of the visibility of the view
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Boolean} [properties.showTime=false] - Enable or ignore the show timestamp text onto the canvas
     * @param {Boolean} [properties.showStats=false] - Enable or ignore the display stats (FPS number) onto the canvas
     * @param {String} [properties.codec='h264'] - Video codec
     */
    constructor(properties) {
        super({
            supportedLayers: ['videoData'],
            ...properties
        });
        
        if (!('VideoDecoder' in window)) {
            // WebCodecs API is not supported.
            throw Error('WebCodec API is not supported');
        }
        
        //https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter
        // common VP8/ VP9/ H264 profiles. May not work depending on the video encoding profile
        //        case "H264":
        //           config.codec = "avc1.42002A";  // baseline profile, level 4.2
        //           config.avc = { format: "annexb" };
        //           config.pt = 1;
        //           break;
        //         case "H265":
        //           config.codec = "hvc1.1.6.L123.00"; // Main profile, level 4.1, main Tier
        //           config.hevc = { format: "annexb" };
        //           config.pt = 2;
        //           break;
        //         case "VP8":
        //           config.codec = "vp8";
        //           config.pt = 3;
        //           break;
        //         case "VP9":
        //           config.codec = "vp09.00.10.08"; //VP9, Profile 0, level 1, bit depth 8
        //           config.pt = 4;
        //           break;
        //         case "AV1":
        //           config.codec = "av01.0.08M.10.0.110.09" // AV1 Main Profile, level 4.0, Main tier, 10-bit content, non-monochrome, with 4:2:0 chroma subsampling
        //           config.pt = 5;
        //           break;
        //       }
        this.codecMap = {
            'vp9':  'vp09.02.10.10.01.09.16.09.01',
            'vp8':  'vp08.00.41.08',
            'h264': 'avc1.42e01e',
            'h265': 'hev1.1.6.L123.00'
        };
        
        // default use H264 codec
        this.codec = this.codecMap['h264'];
        
        if(isDefined(properties.codec)) {
            if(!(properties.codec in this.codecMap)) {
                throw Error(`The codec properties.codec is not supported, the list of supported codec: this.codecMap`);
            } else {
                this.codec = this.codecMap[properties.codec];
            }
        }
        this.compression = properties.codec;
        
        // create webGL canvas
        this.canvasElt = this.createCanvas(this.width, this.height);
        this.domNode.appendChild(this.canvasElt);
        
        this.queue = [];
    }
    /**
     * Create <canvas> DOM element with some height/width/style
     * @protected
     * @param {String} width - the width
     * @param {String} height - the height
     * @param {String} style - the dom element style (Optional)
     */
    createCanvas(width, height, style) {
        const canvasElement = document.createElement('canvas');
        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);
        if (isDefined(style)) {
            canvasElement.setAttribute('style', style);
        }
        return canvasElement;
    }
    
    updateCanvasSize(width, height) {
        this.canvasElt.width = width;
        this.canvasElt.height = height;
    }
    
    async setData(dataSourceId, data) {
        if(data.type === 'videoData') {
            const values = data.values;
            for(let i=0;i < values.length;i++) {
                await this.updateVideo(values[i]);
            }
        }
    }
    async updateVideo(props, keyFrame) {
        if (!this.skipFrame) {
            if (!this.codecConfigured) {
                this.codec = this.codecMap[props.frameData.compression.toLowerCase()]
                this.initDecoder();
            }
            
            await this.decode(
                props.frameData.data.length,
                props.frameData.data,
                props.timestamp,
                props.roll || 0,
                keyFrame
            );
        }
    }
    
    /**
     * Reset the view by drawing no data array into the YUV canvas.
     * @override
     */
    reset() {
    }
    
    /**
     * Called when the decoder needs a new keyframe before decoding again (decoding error...).
     * VideoView overrides it to go back to "skip until keyframe" mode.
     */
    onKeyFrameRequired() {}
    
    initDecoder() {
        this.gl = this.canvasElt.getContext("2d");
        
        const init = {
            output: async (videoFrame) => {
                // check picture width
                if (this.width !== videoFrame.codedWidth || this.height !== videoFrame.codedHeight) {
                    this.width = videoFrame.codedWidth;
                    this.height = videoFrame.codedHeight;
                    
                    this.updateCanvasSize(this.width ,this.height);
                }
                const queueElt = this.queue.shift();
                try {
                    await this.handleDocodedFrame(videoFrame, this.width, this.height, videoFrame.timestamp, queueElt);
                } finally {
                    videoFrame.close();
                }
            },
            error: (error) => {
                this.queue.length = 0;
                console.error(error);
                this.onKeyFrameRequired();
                if(this.videoDecoder.state === 'closed') {
                    this.initDecoder();
                }
            }
        };
        try {
            this.videoDecoder = new VideoDecoder(init);
            const config = {
                codec: this.codec,
                codedWidth: this.width,
                codedHeight: this.height,
                optimizeForLatency: true,
            };
            // data is expected in Annex B format (start codes 00 00 01)
            if (this.codec.startsWith('avc1')) config.avc = { format: 'annexb' };
            if (this.codec.startsWith('hev1') || this.codec.startsWith('hvc1')) config.hevc = { format: 'annexb' };
            this.videoDecoder.configure(config);
            this.codecConfigured = true;
        }catch (ex) {
            this.elementDiv.remove(); // remove reserved div element
            throw Error('Cannot configure WebCodec API VideoDecoder');
        }
    }
    
    async handleDocodedFrame(videoFrame, width, height, timestamp = 0, queueElt = null) {
        try {
            // draw image
            let roll = Math.round(queueElt.roll/90) * 90;
            if (roll > 180) roll -= 360;
            let scale = 1.0;
            if (Math.abs(roll) === 90) {
                scale = this.height / this.width;
            }
            const angleRad = roll*Math.PI/180.;
            if (this.angleRad !== angleRad || this.scale !== scale) {
                this.canvasElt.style = `transform:rotate(${angleRad}rad) scale(${scale})`;
                this.angleRad = angleRad;
                this.scale = scale;
            }
            
            this.gl.drawImage(videoFrame, 0, 0);
            
            // update stats
            this.onAfterDecoded(videoFrame, FrameType.ARRAY);
            this.updateStatistics(queueElt.pktSize);
            if(this.showTime) {
                this.textFpsDiv.textContent = new Date(timestamp).toISOString()+' ';
            }
            if(this.showStats) {
                this.textStatsDiv.innerText  = this.statistics.averageFps.toFixed(2) + ' fps, ' +
                    (this.statistics.averageBitRate/1000).toFixed(2)+' kB/s @'+
                    width+"x"+height+'\n '+this.compression;
            }
            this.onUpdated(this.statistics);
        } catch (exception) {
            console.error(exception);
            //continue;
        }
    }
    
    /**
     * Build the H264 codec string (avc1.PPCCLL) from the SPS (NAL type 7) found in an Annex B packet.
     * @private
     * @param pktData
     * @return {String|null} the codec string, or null if the packet does not contain a SPS
     */
    getH264CodecString(pktData) {
        for (let i = 0; i + 7 < pktData.length; i++) {
            if (pktData[i] === 0 && pktData[i + 1] === 0 &&
                (pktData[i + 2] === 1 || (pktData[i + 2] === 0 && pktData[i + 3] === 1))) {
                const nal = i + (pktData[i + 2] === 1 ? 3 : 4);
                const nalType = pktData[nal] & 0x1f;
                if (nalType === 1 || nalType === 5) return null;
                if (nalType === 7) {
                    const hex = (b) => b.toString(16).padStart(2, '0');
                    return 'avc1.' + hex(pktData[nal + 1]) + hex(pktData[nal + 2]) + hex(pktData[nal + 3]);
                }
            }
        }
        return null;
    }
    
    /**
     * Build the H265 codec string (hev1.[space]profile.compatFlags.[tier]level.constraints) from the SPS
     * (NAL type 33) found in an Annex B packet.
     * @private
     * @param pktData
     * @return {String|null} the codec string, or null if the packet does not contain a SPS
     */
    getH265CodecString(pktData) {
        for (let i = 0; i + 7 < pktData.length; i++) {
            if (pktData[i] === 0 && pktData[i + 1] === 0 &&
                (pktData[i + 2] === 1 || (pktData[i + 2] === 0 && pktData[i + 3] === 1))) {
                const nal = i + (pktData[i + 2] === 1 ? 3 : 4);
                const nalType = (pktData[nal] >> 1) & 0x3f;
                if (nalType < 32) return null;
                if (nalType === 33) {
                    // skip the 2-byte NAL header and remove the emulation prevention bytes (00 00 03)
                    const rbsp = [];
                    for (let j = nal + 2; j < pktData.length && rbsp.length < 15; j++) {
                        const n = rbsp.length;
                        if (pktData[j] === 3 && n >= 2 && rbsp[n - 1] === 0 && rbsp[n - 2] === 0) continue;
                        rbsp.push(pktData[j]);
                    }
                    if (rbsp.length < 13) return null;
                    
                    // rbsp[0]: vps id / max sub layers / nesting flag, then profile_tier_level()
                    const profileSpace = ['', 'A', 'B', 'C'][rbsp[1] >> 6];
                    const tier = (rbsp[1] & 0x20) ? 'H' : 'L';
                    const profileIdc = rbsp[1] & 0x1f;
                    
                    // compatibility flags: the codec string uses the reversed bit order
                    const flags = ((rbsp[2] << 24) | (rbsp[3] << 16) | (rbsp[4] << 8) | rbsp[5]) >>> 0;
                    let reversed = 0;
                    for (let b = 0; b < 32; b++) {
                        reversed = (reversed << 1) | ((flags >>> b) & 1);
                    }
                    reversed = reversed >>> 0;
                    
                    // 6 constraint bytes, trailing zero bytes are omitted
                    let last = 11;
                    while (last > 6 && rbsp[last] === 0) last--;
                    const constraints = rbsp.slice(6, last + 1)
                        .map((b) => b.toString(16).toUpperCase().padStart(2, '0')).join('.');
                    
                    const levelIdc = rbsp[12];
                    return 'hev1.' + profileSpace + profileIdc + '.' + reversed.toString(16).toUpperCase() +
                        '.' + tier + levelIdc + '.' + constraints;
                }
            }
        }
        return null;
    }
    
    /**
     * @private
     * @param pktSize
     * @param pktData
     * @param timestamp
     * @param keyFrame - true if the packet is a keyframe (computed by VideoView)
     */
    async decode(pktSize, pktData, timestamp, roll, keyFrame) {
        if (this.codecConfigured) {
            if (!keyFrame && this.videoDecoder.decodeQueueSize > 10) {
                this.onKeyFrameRequired();
                return;
            }
            let chunk = new EncodedVideoChunk({
                timestamp: timestamp,
                type: keyFrame ? 'key' : 'delta',
                data: pktData
            });
            try {
                if (keyFrame && this.codec.startsWith('avc1')) {
                    // use the profile/level declared in the SPS of the stream
                    const codec = this.getH264CodecString(pktData);
                    if (codec && codec !== this.codec) {
                        this.codec = codec;
                        this.videoDecoder.configure({
                            codec: this.codec,
                            codedWidth: this.width,
                            codedHeight: this.height,
                            optimizeForLatency: true,
                            avc: { format: 'annexb' }
                        });
                    }
                }
                if (keyFrame && (this.codec.startsWith('hev1') || this.codec.startsWith('hvc1'))) {
                    // use the profile/tier/level declared in the SPS of the stream
                    const codec = this.getH265CodecString(pktData);
                    if (codec && codec !== this.codec) {
                        this.codec = codec;
                        this.videoDecoder.configure({
                            codec: this.codec,
                            codedWidth: this.width,
                            codedHeight: this.height,
                            optimizeForLatency: true,
                            hevc: { format: 'annexb' }
                        });
                    }
                }
                this.videoDecoder.decode(chunk);
                // push only if decode() did not throw, to keep the queue in sync with the output frames
                this.queue.push({
                    roll: roll,
                    pktSize: pktSize
                });
            } catch (e) {
                console.error("Error during decode chunk:", e);
                this.onKeyFrameRequired();
            }
        } else {
            console.warn('decoder has not been initialized yet');
        }
    }
    
    destroy() {
        super.destroy();
        if(this.videoDecoder) {
            this.videoDecoder.close();
        }
    }
    
    async getCanvas() {
        return this.canvasElt;
    }
}

export default WebCodecView;
