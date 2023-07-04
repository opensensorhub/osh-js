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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import MjpegView from "./MjpegView";
import WebCodecView from "./WebCodecView";
import FFMPEGView from "./FFMPEGView";
import View from "../View";
import { isDefined } from "../../../utils/Utils";
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
var VideoView = /** @class */ (function (_super) {
    __extends(VideoView, _super);
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
    function VideoView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['videoData'] }, properties)) || this;
        _this.videoView = undefined;
        _this.canvasResolve = undefined;
        return _this;
    }
    VideoView.prototype.createVideoView = function (compression) {
        var _this = this;
        if (compression === 'jpeg') {
            // create MJPEG View
            this.videoView = new MjpegView(__assign(__assign({}, this.properties), { layers: [] }));
        }
        else if ('useWebCodecApi' in this.properties && this.properties['useWebCodecApi']) {
            this.videoView = new WebCodecView(__assign(__assign({}, this.properties), { layers: [] }));
        }
        else {
            this.videoView = new FFMPEGView(__assign(__assign({}, this.properties), { layers: [] }));
        }
        this.hide();
        // this.elementDiv.replaceWith(this.videoView.elementDiv);
        if (this.canvasResolve) {
            this.canvasResolve(this.videoView.getCanvas());
        }
        this.videoView.onAfterDecoded = function (decodedFrame, frameType) {
            _this.onDecode(decodedFrame, frameType);
        };
    };
    VideoView.prototype.setData = function (dataSourceId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var values, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(data.type === 'videoData')) return [3 /*break*/, 4];
                        values = data.values;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < values.length)) return [3 /*break*/, 4];
                        if (!isDefined(this.videoView)) {
                            this.createVideoView(values[i].frameData.compression.toLowerCase());
                        }
                        return [4 /*yield*/, this.videoView.updateVideo(values[i])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VideoView.prototype.getVideoCanvas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (isDefined(this.videoView)) {
                    return [2 /*return*/, this.videoView.getCanvas()];
                }
                else {
                    that_1 = this;
                    return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                that_1.canvasResolve = resolve;
                                return [2 /*return*/];
                            });
                        }); })];
                }
                return [2 /*return*/];
            });
        });
    };
    VideoView.prototype.reset = function () {
        _super.prototype.reset.call(this);
        if (isDefined(this.videoView)) {
            this.videoView.reset();
        }
    };
    VideoView.prototype.destroy = function () {
        console.warn('Destroying VideoView');
        _super.prototype.destroy.call(this);
        if (isDefined(this.videoView)) {
            this.videoView.destroy();
        }
    };
    VideoView.prototype.onDecode = function (decodedFrame, frameType) { };
    return VideoView;
}(View));
export default VideoView;
//# sourceMappingURL=VideoView.js.map