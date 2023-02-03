/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Georobotix Inc. All Rights Reserved.

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
import TimeSeriesHandler from "../../common/handler/TimeSeries.handler";
import SosGetResultRealTimeContext from "../context/SosGetResult.realtime.context";
import SosGetResultReplayContext from "../context/SosGetResult.replay.context";
import { Mode } from "../../Mode";
import SosGetResultBatchContext from "../context/SosGetResult.batch.context";
var SosGetResultHandler = /** @class */ (function (_super) {
    __extends(SosGetResultHandler, _super);
    function SosGetResultHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SosGetResultHandler.prototype.createContext = function (properties) {
        if (properties.mode === Mode.REAL_TIME) {
            return new SosGetResultRealTimeContext();
        }
        else if (properties.mode === Mode.REPLAY) {
            return new SosGetResultReplayContext();
        }
        else if (properties.mode === Mode.BATCH) {
            return new SosGetResultBatchContext();
        }
        throw Error("Not supported mode=".concat(properties.mode));
    };
    return SosGetResultHandler;
}(TimeSeriesHandler));
export default SosGetResultHandler;
//# sourceMappingURL=SosGetResult.handler.js.map