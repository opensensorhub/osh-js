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

// adapter le chemin selon l'emplacement réel de CanvasView
import CanvasView from "./CanvasView.js";
import {isDefined} from "../../../utils/Utils.js";

/**
 * @extends CanvasView
 * @example
 *
 import MjpegView from 'core/ui/view/video/MjpegView.js';
 
 let videoView = new MjpegView({
 container: 'container',
 css: 'video-h264',
 name: 'UAV Video',
 showTime: true,
 showStats: true,
 layers: [
 new DataLayer({
 dataSourceId: videoDataSource.id,
 getFrameData: (rec) => rec.videoFrame,
 getTimestamp: (rec) => rec.timestamp
 })
 ]
 });
 */

class MjpegView extends CanvasView {
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {string} properties.container - The div element to attach to
     * @param {string} properties.css - The css classes to set, can be multiple if separate by spaces
     * @param {String} properties.showTime - Display or not the time onto the view
     * @param {String} properties.showStats - Display or not the stats onto the view
     * @param {String} properties.rotation - Allow to define a rotation in degree
     *
     */
    constructor(properties) {
        // on ne délègue à CanvasView que l'affichage des stats :
        // le temps reste géré ici, comme avant
        super({
            supportedLayers: ['videoData'],
            codec: 'mjpeg',
            ...properties,
            showTime: false
        });
        
        // create timestamp slot
        this.timestamp = null;
        if (isDefined(properties.showTime) && properties.showTime) {
            this.timestamp = document.createElement("div");
            this.timestamp.setAttribute("class", "video-time");
            if (isDefined(this.textDiv)) {
                // même overlay que les stats, au-dessus d'elles, pour ne pas être recouvert
                this.textDiv.insertBefore(this.timestamp, this.textDiv.firstChild);
            } else {
                document.getElementById(this.divId).appendChild(this.timestamp);
            }
        }
        
        // creates video tag element
        this.imgTag = document.createElement("img");
        this.imgTag.setAttribute("class", "video-mjpeg");
        
        // rotation option
        this.rotation = 0;
        if (typeof (properties) != "undefined" && typeof (properties.rotation) != "undefined") {
            this.rotation = properties.rotation * Math.PI / 180;
            this.canvas = document.createElement('canvas');
            this.canvas.width = 640;
            this.canvas.height = 480;
            var ctx = this.canvas.getContext('2d');
            ctx.translate(0, 480);
            ctx.rotate(this.rotation);
            document.getElementById(this.divId).appendChild(this.canvas);
        } else {
            // appends <img> tag to <div>
            document.getElementById(this.divId).appendChild(this.imgTag);
        }
    }
    
    async setData(dataSourceId, data) {
        if (data.type === 'videoData') {
            const values = data.values;
            for (let i = 0; i < values.length; i++) {
                this.updateVideo(values[i]);
            }
        }
    }
    
    updateVideo(props) {
        const frame = props.frameData.data;
        
        let imgBlob = new Blob([frame]);
        let url = window.URL.createObjectURL(imgBlob);
        
        let oldBlobURL = this.imgTag.src;
        this.imgTag.src = url;
        if (this.timestamp !== null) {
            this.timestamp.innerHTML = new Date(props.timestamp).toISOString();
        }
        window.URL.revokeObjectURL(oldBlobURL);
        
        if (this.showStats) {
            this.updateStatistics(isDefined(frame.byteLength) ? frame.byteLength : frame.length);
            this.updateStatsText(this.imgTag.naturalWidth, this.imgTag.naturalHeight, this.codec);
        }
    }
    
    selectDataView(dataSourceIds, entityId) {
        if (dataSourceIds.indexOf(this.dataSourceId) > -1 || (isDefined(this.entity)) && this.entity.getId() === entityId) {
            document.getElementById(this.divId).setAttribute("class", this.css + " " + this.cssSelected);
        } else {
            document.getElementById(this.divId).setAttribute("class", this.css);
        }
    }
    
    reset() {
        this.imgTag.src = "";
    }
    
    async getCanvas() {
        return this.canvas;
    }
}

export default MjpegView;
