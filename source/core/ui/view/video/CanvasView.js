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
            averageBitRate:0
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
        if(this.showTime || this.showStats) {
            this.textDiv = document.createElement("div");
            this.textDiv.setAttribute("width",""+this.width);
            this.textDiv.setAttribute("height",15);
            this.textDiv.setAttribute("class","ffmpeg-info");

            if(this.showTime) {
                this.textFpsDiv = document.createElement("div");
                this.textFpsDiv.setAttribute("class","ffmpeg-fps");
                this.textDiv.appendChild(this.textFpsDiv);
            }
            if(this.showStats) {
                this.textStatsDiv = document.createElement("div");
                this.textStatsDiv.setAttribute("class","ffmpeg-stats");
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
            }
        }

        document.addEventListener(visibilityChange, handleVisibilityChange, false);

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

    onUpdated(stats) {

    }

    destroy() {
        super.destroy();
    }

    /**
     * Called after each decoded frame.
     * @event
     */
    onAfterDecoded(decodedFrame, frameType) {
    }
}

export default CanvasView;
