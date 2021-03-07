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
/**
 *
 * From describe tasking:
 * swe:item name="relMove">
 <swe:Text definition="http://sensorml.com/ont/swe/property/CameraRelativeMovementName">
 <swe:label>Camera Relative Movements</swe:label>
 <swe:constraint>
 <swe:AllowedTokens>
 <swe:value>Down</swe:value>
 <swe:value>Up</swe:value>
 <swe:value>Left</swe:value>
 <swe:value>Right</swe:value>
 <swe:value>TopLeft</swe:value>
 <swe:value>TopRight</swe:value>
 <swe:value>BottomLeft</swe:value>
 <swe:value>BottomRight</swe:value>
 </swe:AllowedTokens>
 </swe:constraint>
 </swe:Text>
 </swe:item>

 <swe:item name="preset">
 <swe:Text definition="http://sensorml.com/ont/swe/property/CameraPresetPositionName">
 <swe:label>Preset Camera Position</swe:label>
 <swe:constraint>
 <swe:AllowedTokens>
 <swe:value>Reset</swe:value>
 <swe:value>TopMost</swe:value>
 <swe:value>BottomMost</swe:value>
 <swe:value>LeftMost</swe:value>
 <swe:value>RightMost</swe:value>
 </swe:AllowedTokens>
 </swe:constraint>
 </swe:Text>
 </swe:item>
 */
import PtzTasking from './PtzTasking.js';
/**
 * @extends DataSink
 */
var FoscamPtzTasking = /** @class */ (function (_super) {
    __extends(FoscamPtzTasking, _super);
    function FoscamPtzTasking() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the command data.
     * @param {Object}  values -
     * @param {String}  values.preset -
     * @param {String}  values.rzoom -
     * @param {String}  values.rpan -
     * @param {String}  values.rtilt -
     * @return {string}
     */
    FoscamPtzTasking.prototype.getCommandData = function (values) {
        var cmdData = "";
        if (values.preset !== null) {
            cmdData = "preset," + values.preset;
        }
        else if (values.rzoom !== null) {
            cmdData = "zoom,";
            if (values.rzoom < 0) {
                cmdData += "out";
            }
            else {
                cmdData += "in";
            }
        }
        else {
            if (values.rpan !== null && values.rtilt !== null) {
                cmdData += "relMove,";
                if (values.rtilt !== null) {
                    if (values.rtilt < 0) {
                        cmdData += "Bottom";
                    }
                    else {
                        cmdData += "Top";
                    }
                }
                if (values.rpan < 0) {
                    cmdData += "Left";
                }
                else {
                    cmdData += "Right";
                }
            }
            else {
                if (values.rpan !== null) {
                    cmdData += "relMove,";
                    if (values.rpan < 0) {
                        cmdData += "Left";
                    }
                    else {
                        cmdData += "Right";
                    }
                    cmdData += " "; //block separator
                }
                if (values.rtilt !== null) {
                    cmdData += "relMove,";
                    if (values.rtilt < 0) {
                        cmdData += "Down";
                    }
                    else {
                        cmdData += "Up";
                    }
                }
            }
        }
        return cmdData;
    };
    return FoscamPtzTasking;
}(PtzTasking));
export default FoscamPtzTasking;
//# sourceMappingURL=FoscamPtzTasking.js.map