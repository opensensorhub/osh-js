var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import View from "../View";
import { isDefined } from "../../../utils/Utils";
var CanvasView = /** @class */ (function (_super) {
    __extends(CanvasView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {string} properties.container - The div element to attach to
     * @param {string} properties.css - The css classes to set, can be multiple if separate by spaces
     * @param {boolean} properties.visible - set the default behavior of the visibility of the view
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     */
    function CanvasView(properties) {
        var _this = _super.call(this, properties) || this;
        _this.fps = 0;
        _this.width = 1920;
        _this.height = 1080;
        _this.showTime = false;
        _this.showStats = false;
        _this.statistics = {
            averageFps: 0,
            frames: 0,
            firstTime: 0,
            bitRate: 0,
            averageBitRate: 0
        };
        _this.framerate = 29.67;
        if (isDefined(properties)) {
            if (isDefined(properties.framerate)) {
                _this.framerate = properties.framerate;
            }
            if (isDefined(properties.directPlay)) {
                _this.directPlay = properties.directPlay;
            }
            if (isDefined(properties.codec)) {
                _this.codec = properties.codec;
            }
            if (isDefined(properties.showTime)) {
                _this.showTime = properties.showTime;
            }
            if (isDefined(properties.showStats)) {
                _this.showStats = properties.showStats;
            }
            if (isDefined(properties.width)) {
                _this.width = properties.width;
            }
            if (isDefined(properties.height)) {
                _this.height = properties.height;
            }
        }
        var domNode = document.getElementById(_this.divId);
        // if need to draw text
        if (_this.showTime || _this.showStats) {
            _this.textDiv = document.createElement("div");
            _this.textDiv.setAttribute("width", "" + _this.width);
            _this.textDiv.setAttribute("height", 15);
            _this.textDiv.setAttribute("class", "ffmpeg-info");
            if (_this.showTime) {
                _this.textFpsDiv = document.createElement("div");
                _this.textFpsDiv.setAttribute("class", "ffmpeg-fps");
                _this.textDiv.appendChild(_this.textFpsDiv);
            }
            if (_this.showStats) {
                _this.textStatsDiv = document.createElement("div");
                _this.textStatsDiv.setAttribute("class", "ffmpeg-stats");
                _this.textDiv.appendChild(_this.textStatsDiv);
            }
            domNode.appendChild(_this.textDiv);
        }
        // create webGL canvas
        _this.domNode = domNode;
        var hidden, visibilityChange;
        if (isDefined(document.hidden)) { // Opera 12.10 and Firefox 18 and later support
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        }
        else if (isDefined(document.msHidden)) {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        }
        else if (isDefined(document.webkitHidden)) {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }
        var that = _this;
        function handleVisibilityChange() {
            if (document.hidden) {
                that.skipFrame = true;
            }
            else {
                that.skipFrame = false;
            }
        }
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
        return _this;
    }
    /**
     */
    CanvasView.prototype.updateStatistics = function (pktSize) {
        this.statistics.frames++;
        this.statistics.pktSize += pktSize;
        if (this.statistics.firstTime === 0) {
            this.statistics.firstTime = performance.now();
            return;
        }
        var currentTime = performance.now();
        if (currentTime - this.statistics.firstTime < 1000) {
            return;
        }
        // compute current time
        this.statistics.averageFps = (this.statistics.frames - 1) / ((currentTime - this.statistics.firstTime) / 1000);
        this.statistics.averageBitRate = (this.statistics.pktSize - pktSize) / ((currentTime - this.statistics.firstTime) / 1000);
        this.statistics.frames = 1;
        this.statistics.pktSize = pktSize;
        this.statistics.firstTime = currentTime;
    };
    CanvasView.prototype.onUpdated = function (stats) {
    };
    CanvasView.prototype.destroy = function () {
    };
    /**
     * Called after each decoded frame.
     * @event
     */
    CanvasView.prototype.onAfterDecoded = function (decodedFrame, frameType) {
    };
    return CanvasView;
}(View));
export default CanvasView;
//# sourceMappingURL=CanvasView.js.map