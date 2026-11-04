import View from "../View";
import {isDefined} from "../../../utils/Utils";

class CanvasView extends View {
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {string} properties.container - The div element to attach to
     * @param {string} properties.css - The css classes to set, can be multiple if separate by spaces
     * @param {boolean} properties.visible - set the default behavior of the visibility of the view
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     */
    constructor(properties) {
        super(properties);

        this.fps = 0;
        this.width = 1920;
        this.height = 1080;
        this.showTime = false;
        this.showStats = false;

        this.statistics = {
            averageFps: 0,
            frames: 0,
            firstTime: 0,
            bitRate: 0,
            averageBitRate:0,
            pktSize: 0
        };

        this.framerate = 29.67;

        if (isDefined(properties)) {
            if (isDefined(properties.framerate)) {
                this.framerate = properties.framerate;
            }

            if (isDefined(properties.directPlay)) {
                this.directPlay = properties.directPlay;
            }

            if (isDefined(properties.codec)) {
                this.codec = properties.codec;
            }

            if (isDefined(properties.showTime)) {
                this.showTime = properties.showTime;
            }

            if (isDefined(properties.showStats)) {
                this.showStats = properties.showStats;
            }

            if (isDefined(properties.width)) {
                this.width = properties.width;
            }

            if (isDefined(properties.height)) {
                this.height = properties.height;
            }
        }
        
        let domNode = document.getElementById(this.divId);

        // if need to draw text
        if (this.showTime || this.showStats) {
            if (window.getComputedStyle(domNode).position === 'static') {
                domNode.style.position = 'relative';
            }
            
            this.textDiv = document.createElement("div");
            this.textDiv.setAttribute("class", "ffmpeg-info");
            this.textDiv.style.position = 'absolute';
            this.textDiv.style.top = '0';
            this.textDiv.style.left = '0';
            this.textDiv.style.zIndex = '1';
            this.textDiv.style.pointerEvents = 'none';
            
            if (this.showTime) {
                this.textFpsDiv = document.createElement("div");
                this.textFpsDiv.setAttribute("class", "ffmpeg-fps");
                this.textDiv.appendChild(this.textFpsDiv);
            }
            if (this.showStats) {
                this.textStatsDiv = document.createElement("div");
                this.textStatsDiv.setAttribute("class", "ffmpeg-stats");
                this.textDiv.appendChild(this.textStatsDiv);
            }
            
            domNode.appendChild(this.textDiv);
        }

        // create webGL canvas
        this.domNode = domNode;
        let hidden, visibilityChange;

        if (isDefined(document.hidden)) { // Opera 12.10 and Firefox 18 and later support
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (isDefined(document.msHidden)) {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (isDefined(document.webkitHidden)) {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }

        const that = this;

        function handleVisibilityChange() {
            if (document.hidden) {
                that.skipFrame = true;
            } else {
                that.skipFrame = false;
                // frames were dropped while hidden, a new keyframe is needed to decode again
                that.onKeyFrameRequired();
            }
        }

        document.addEventListener(visibilityChange, handleVisibilityChange, false);
        // kept to remove the listener on destroy
        this.visibilityChange = visibilityChange;
        this.handleVisibilityChange = handleVisibilityChange;

    }

    /**
     */
    updateStatistics(pktSize) {
        this.statistics.frames++;
        this.statistics.pktSize+=pktSize;
        if(this.statistics.firstTime === 0) {
            this.statistics.firstTime = performance.now();
            return;
        }
        const currentTime = performance.now();
        if(currentTime - this.statistics.firstTime < 1000) {
            return;
        }

        // compute current time
        this.statistics.averageFps = (this.statistics.frames-1) / ((currentTime - this.statistics.firstTime)/1000);
        this.statistics.averageBitRate=   (this.statistics.pktSize-pktSize) / ((currentTime - this.statistics.firstTime)/1000);
        this.statistics.frames = 1;
        this.statistics.pktSize = pktSize;
        this.statistics.firstTime = currentTime;
    }

    /**
     * Update the stats text, only when updateStatistics() has computed new values (about once per second).
     * @protected
     * @param {Number} width - the picture width
     * @param {Number} height - the picture height
     * @param {String} codec - the codec name to display
     */
    updateStatsText(width, height, codec) {
        if(this.statsUpdateTime !== this.statistics.firstTime) {
            this.statsUpdateTime = this.statistics.firstTime;
            this.textStatsDiv.innerText  = this.statistics.averageFps.toFixed(2) + ' fps, ' +
                (this.statistics.averageBitRate/1000).toFixed(2)+' kB/s @'+
                width+"x"+height+'\n '+codec;
        }
    }

    onUpdated(stats) {

    }

    /**
     * Called when the decoder needs a new keyframe before decoding again.
     * VideoView overrides it to go back to "skip until keyframe" mode.
     */
    onKeyFrameRequired() {}

    destroy() {
        super.destroy();
        document.removeEventListener(this.visibilityChange, this.handleVisibilityChange, false);
    }

    /**
     * Called after each decoded frame.
     * @event
     */
    onAfterDecoded(decodedFrame, frameType) {
    }
}

export default CanvasView;
