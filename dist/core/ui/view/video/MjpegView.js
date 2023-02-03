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
import View from "../View.js";
import { isDefined } from "../../../utils/Utils.js";
/**
 * @extends View
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
var MjpegView = /** @class */ (function (_super) {
    __extends(MjpegView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {string} properties.container - The div element to attach to
     * @param {string} properties.css - The css classes to set, can be multiple if separate by spaces
     * @param {String} properties.showTime - Display or not the time onto the view
     * @param {String} properties.rotation - Allow to define a rotation in degree
     *
     */
    function MjpegView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['videoData'] }, properties)) || this;
        // create timestamp slot
        _this.timestamp = null;
        if (isDefined(properties.showTime) && properties.showTime) {
            _this.timestamp = document.createElement("div");
            _this.timestamp.setAttribute("class", "video-time");
            document.getElementById(_this.divId).appendChild(_this.timestamp);
        }
        // creates video tag element
        _this.imgTag = document.createElement("img");
        _this.imgTag.setAttribute("class", "video-mjpeg");
        // rotation option
        _this.rotation = 0;
        if (typeof (properties) != "undefined" && typeof (properties.rotation) != "undefined") {
            _this.rotation = properties.rotation * Math.PI / 180;
            _this.canvas = document.createElement('canvas');
            _this.canvas.width = 640;
            _this.canvas.height = 480;
            var ctx = _this.canvas.getContext('2d');
            ctx.translate(0, 480);
            ctx.rotate(_this.rotation);
            document.getElementById(_this.divId).appendChild(_this.canvas);
        }
        else {
            // appends <img> tag to <div>
            document.getElementById(_this.divId).appendChild(_this.imgTag);
        }
        return _this;
    }
    MjpegView.prototype.setData = function (dataSourceId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var values, i;
            return __generator(this, function (_a) {
                if (data.type === 'videoData') {
                    values = data.values;
                    for (i = 0; i < values.length; i++) {
                        this.updateVideo(values[i]);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    MjpegView.prototype.updateVideo = function (props) {
        var imgBlob = new Blob([props.frameData.data]);
        var url = window.URL.createObjectURL(imgBlob);
        var oldBlobURL = this.imgTag.src;
        this.imgTag.src = url;
        if (this.timestamp !== null) {
            this.timestamp.innerHTML = new Date(props.timestamp).toISOString();
        }
        window.URL.revokeObjectURL(oldBlobURL);
    };
    MjpegView.prototype.selectDataView = function (dataSourceIds, entityId) {
        if (dataSourceIds.indexOf(this.dataSourceId) > -1 || (isDefined(this.entity)) && this.entity.getId() === entityId) {
            document.getElementById(this.divId).setAttribute("class", this.css + " " + this.cssSelected);
        }
        else {
            document.getElementById(this.divId).setAttribute("class", this.css);
        }
    };
    MjpegView.prototype.reset = function () {
        this.imgTag.src = "";
    };
    MjpegView.prototype.getCanvas = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.canvas];
            });
        });
    };
    return MjpegView;
}(View));
export default MjpegView;
//# sourceMappingURL=MjpegView.js.map