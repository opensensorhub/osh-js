import MjpegView from "./MjpegView.js";
import WebCodecView from "./WebCodecView.js";
import FFMPEGView from "./FFMPEGView.js";
import View from "../View.js";
import {isDefined} from "../../../utils/Utils.js";

/***************************** BEGIN LICENSE BLOCK ***************************
 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.
 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.
 
 Copyright (C) 2022 Georobotix Inc. All Rights Reserved.
 
 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>
 ******************************* END LICENSE BLOCK ***************************/

class VideoView extends View {
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {string} properties.container - The div element to attach to
     * @param {string} properties.css - The css classes to set, can be multiple if separate by spaces
     * @param {boolean} properties.visible - set the default behavior of the visibility of the view
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Number} [properties.framerate=29.67] - The framerate to play 1s/framerate and get smooth display
     * @param {Boolean} [properties.directPlay=false] - Enable or ignore the framerate play
     * @param {Boolean} [properties.showTime=false] - Enable or ignore the show timestamp text onto the canvas
     * @param {Boolean} [properties.showStats=false] - Enable or ignore the display stats (FPS number) onto the canvas
     * @param {Number} [properties.width=1920] - Set the default canvas width
     * @param {Number} [properties.height=1080] - Set the default canvas height
     * @param {Number} [properties.useWebCodecApi=true] - Use experimental WebCodecApi
     */
    constructor(properties) {
        super({
            supportedLayers: ['videoData'],
            ...properties
        });
        this.videoView = undefined;
        this.canvasResolve = undefined;
        this.useWebCodecApi = true;
        if('useWebCodecApi' in properties) {
            this.useWebCodecApi = properties['useWebCodecApi'];
        }
        // frames are skipped until a keyframe is received
        this._waitingForKeyFrame = true;
    }
    
    createVideoView(compression) {
        if(compression === 'jpeg') {
            // create MJPEG View
            this.videoView = new MjpegView({
                ...this.properties,
                layers: []
            });
        } else if(this.useWebCodecApi) {
            try {
                this.videoView = new WebCodecView({
                    ...this.properties,
                    codec: compression,
                    layers: []
                });
                this.videoView.initDecoder();
            } catch (ex) {
                // use ffmpeg as fallback
                this.videoView = new FFMPEGView({
                    ...this.properties,
                    codec: compression,
                    layers: []
                });
            }
        } else {
            this.videoView = new FFMPEGView({
                ...this.properties,
                codec: compression,
                layers: []
            });
        }
        this.hide();
        // this.elementDiv.replaceWith(this.videoView.elementDiv);
        if(this.canvasResolve) {
            this.canvasResolve(this.videoView.getCanvas());
        }
        this.videoView.onAfterDecoded = (decodedFrame, frameType) => {
            this.onDecode(decodedFrame, frameType);
        };
        this._waitingForKeyFrame = true;
        // the decoder can ask to wait for a new keyframe again (decoding error, re-initialization...)
        this.videoView.onKeyFrameRequired = () => {
            this._waitingForKeyFrame = true;
        };
    }
    
    async setData(dataSourceId, data) {
        if (data.type === 'videoData') {
            const values = data.values;
            for (let i = 0; i < values.length; i++) {
                const compression = values[i].frameData.compression.toLowerCase();
                if(!isDefined(this.videoView)) {
                    this.createVideoView(compression);
                }
                const keyFrame = VideoView.isKeyFrame(compression, values[i].frameData.data);
                // skip everything until a real keyframe is received
                if(this._waitingForKeyFrame && !keyFrame) {
                    continue;
                }
                if(keyFrame) {
                    this._waitingForKeyFrame = false;
                }
                await this.videoView.updateVideo(values[i], keyFrame);
            }
        }
    }
    
    /**
     * Tell if the encoded packet is a keyframe (random access point).
     * @param {String} compression - the codec name in lower case (jpeg, h264, h265, vp8, vp9)
     * @param {Uint8Array} data - the encoded packet
     * @return {boolean}
     */
    static isKeyFrame(compression, data) {
        if(!data || data.length === 0) {
            return false;
        }
        switch(compression) {
            case 'h264':
                return VideoView.isH264KeyFrame(data);
            case 'h265':
                return VideoView.isH265KeyFrame(data);
            case 'vp8':
                return VideoView.isVP8KeyFrame(data);
            case 'vp9':
                return VideoView.isVP9KeyFrame(data);
            default:
                // jpeg and unknown codecs: every frame can be decoded on its own
                return true;
        }
    }
    
    /**
     * Iterate over the NAL units of an Annex B stream until the predicate returns a boolean.
     * @private
     * @param {Uint8Array} data
     * @param {Function} predicate - called with the offset of the first NAL header byte,
     *                               returns true/false to stop with this result, undefined to continue
     * @return {boolean}
     */
    static findAnnexBNal(data, predicate) {
        const len = data.length;
        for(let i = 0; i + 3 < len; i++) {
            if(data[i] === 0 && data[i + 1] === 0) {
                let nalIdx = -1;
                if(data[i + 2] === 1) nalIdx = i + 3;                            // 3-byte start code
                else if(data[i + 2] === 0 && data[i + 3] === 1) nalIdx = i + 4;  // 4-byte start code
                if(nalIdx >= 0 && nalIdx < len) {
                    const result = predicate(nalIdx);
                    if(result !== undefined) return result;
                    i = nalIdx;
                }
            }
        }
        return false;
    }
    
    /**
     * H.264 (Annex B): keyframe if it contains an IDR slice (NAL type 5).
     * A non-IDR slice (NAL type 1) means the access unit is not a keyframe.
     * @private
     */
    static isH264KeyFrame(data) {
        return VideoView.findAnnexBNal(data, (idx) => {
            const nalType = data[idx] & 0x1f;
            if(nalType === 5) return true;
            if(nalType === 1) return false;
        });
    }
    
    /**
     * H.265 (Annex B): keyframe if it contains an IRAP NAL unit
     * (BLA_W_LP=16, BLA_W_RADL=17, BLA_N_LP=18, IDR_W_RADL=19, IDR_N_LP=20, CRA_NUT=21).
     * The NAL unit type is stored in bits 1..6 of the first byte of the 2-byte NAL header.
     * The first VCL NAL unit (type < 32) decides.
     * @private
     */
    static isH265KeyFrame(data) {
        return VideoView.findAnnexBNal(data, (idx) => {
            const nalType = (data[idx] >> 1) & 0x3f;
            if(nalType < 32) return nalType >= 16 && nalType <= 21;
        });
    }
    
    /**
     * VP8: bit 0 of the first byte is the frame type (0 = keyframe).
     * @private
     */
    static isVP8KeyFrame(data) {
        return (data[0] & 0x01) === 0;
    }
    
    /**
     * VP9: parse the beginning of the uncompressed header (bits are read MSB first):
     *   frame_marker (2 bits, must be 0b10)
     *   profile_low_bit (1), profile_high_bit (1)
     *   reserved_zero (1 bit, only if profile == 3)
     *   show_existing_frame (1)  -> if 1, only re-displays a previous frame: not a keyframe
     *   frame_type (1)           -> 0 = KEY_FRAME, 1 = NON_KEY_FRAME
     * @private
     */
    static isVP9KeyFrame(data) {
        let bitPos = 0;
        const readBit = () => {
            const bit = (data[bitPos >> 3] >> (7 - (bitPos & 7))) & 1;
            bitPos++;
            return bit;
        };
        
        const frameMarker = (readBit() << 1) | readBit();
        if(frameMarker !== 2) return false;           // invalid frame
        
        const profileLow = readBit();
        const profileHigh = readBit();
        const profile = (profileHigh << 1) | profileLow;
        if(profile === 3) readBit();                  // reserved_zero
        
        const showExistingFrame = readBit();
        if(showExistingFrame === 1) return false;
        
        return readBit() === 0;                       // frame_type
    }
    
    async getVideoCanvas() {
        if(isDefined(this.videoView)) {
            return this.videoView.getCanvas();
        } else {
            const that = this;
            return new Promise(async resolve => {
                that.canvasResolve = resolve;
            });
        }
    }
    
    reset() {
        super.reset();
        this._waitingForKeyFrame = true;
        if(isDefined(this.videoView)) {
            this.videoView.reset();
        }
    }
    
    destroy() {
        console.warn('Destroying VideoView');
        super.destroy();
        if(isDefined(this.videoView)) {
            this.videoView.destroy();
        }
    }
    
    onDecode(decodedFrame, frameType) {}
}

export default VideoView;
