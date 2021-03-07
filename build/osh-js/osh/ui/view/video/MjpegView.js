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
        dataSourceId: videoDataSource.id
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
        var _this = _super.call(this, __assign({ supportedLayers: ['data'] }, properties)) || this;
        // create timestamp slot
        _this.timeStamp = null;
        if (isDefined(properties.showTime) && properties.showTime) {
            _this.timeStamp = document.createElement("div");
            _this.timeStamp.setAttribute("class", "video-time");
            document.getElementById(_this.divId).appendChild(_this.timeStamp);
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
        var values = data.values;
        for (var i = 0; i < values.length; i++) {
            var value = values.shift();
            var imgBlob = new Blob([value.data.frameData]);
            var url = window.URL.createObjectURL(imgBlob);
            var oldBlobURL = this.imgTag.src;
            this.imgTag.src = url;
            if (this.timeStamp !== null) {
                this.timeStamp.innerHTML = new Date(value.timeStamp).toISOString();
            }
            window.URL.revokeObjectURL(oldBlobURL);
        }
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
    return MjpegView;
}(View));
export default MjpegView;
//# sourceMappingURL=MjpegView.js.map
