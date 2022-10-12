import CanvasView from "./CanvasView";
import MjpegView from "./MjpegView";
import WebCodecView from "./WebCodecView";
import FFMPEGView from "./FFMPEGView";
import View from "../View";
import {isDefined} from "../../../utils/Utils";

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
     * @param {Number} [properties.useWebCodecApi=false] - Use experimental WebCodecApi
     */
    constructor(properties) {
        super({
            supportedLayers: ['videoData'],
            ...properties
        });
        this.videoView = undefined;
        this.canvasResolve = undefined;
    }

    createVideoView(compression) {
        if(compression === 'jpeg') {
            // create MJPEG View
            this.videoView = new MjpegView({
                ...this.properties,
                layers: []
            });
        } else if('useWebCodecApi' in this.properties && this.properties['useWebCodecApi']) {
            this.videoView = new WebCodecView({
                ...this.properties,
                layers: []
            });
        } else {
            this.videoView = new FFMPEGView({
                ...this.properties,
                layers: []
            });
        }
        this.hide();
        // this.elementDiv.replaceWith(this.videoView.elementDiv);
        if(this.canvasResolve) {
            this.canvasResolve(this.videoView.getCanvas());
        }
    }

    async setData(dataSourceId, data) {
        if (data.type === 'videoData') {
            const values = data.values;
            for (let i = 0; i < values.length; i++) {
                if(!isDefined(this.videoView)) {
                    this.createVideoView(values[i].frameData.compression.toLowerCase());
                }
                await this.videoView.updateVideo(values[i]);
            }
        }
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
        if(isDefined(this.videoView)) {
            this.videoView.reset();
        }
    }

    destroy() {
        super.destroy();
        if(isDefined(this.videoView)) {
            this.videoView.destroy();
        }
    }
}

export default VideoView;
