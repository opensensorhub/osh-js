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
import SweApiContext from "./SweApi.context";
import Control from "../../../sweapi/control/Control";
import DataStream from "../../../sweapi/datastream/DataStream";
import { isDefined } from "../../../utils/Utils";
var SweApiRealTimeContext = /** @class */ (function (_super) {
    __extends(SweApiRealTimeContext, _super);
    function SweApiRealTimeContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SweApiRealTimeContext.prototype.init = function (properties) {
        this.properties = properties;
        var networkProperties = __assign(__assign({}, properties), { streamProtocol: properties.protocol });
        var filter;
        var regex = new RegExp('\\/systems\\/(.*)\\/controls\\/(.*)\\/status');
        this.streamObject = undefined;
        // check control status
        if (regex.test(properties.resource)) {
            filter = this.createControlFilter(properties);
            // is observation streaming
            var match = regex.exec(properties.resource);
            this.streamObject = new Control({
                id: match[2],
                'system@id': match[1]
            }, networkProperties);
            this.streamFunction = function () {
                var _this = this;
                this.streamObject.streamStatus(filter, function (messages) { return _this.onStreamMessage(messages, filter.props.format); });
            };
        }
        else {
            // check for datastream observations
            regex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/observations
            if (regex.test(properties.resource)) {
                filter = this.createObservationFilter(properties);
                // is observation streaming
                var match = regex.exec(properties.resource);
                this.streamObject = new DataStream({
                    id: match[2]
                }, networkProperties);
                this.streamFunction = function () {
                    var _this = this;
                    this.streamObject.streamObservations(filter, function (messages) { return _this.onStreamMessage(messages, filter.props.format); });
                };
            }
        }
        this.streamObject.stream().onChangeStatus = this.onChangeStatus.bind(this);
    };
    SweApiRealTimeContext.prototype.onStreamMessage = function (messages, format) {
        // in case of om+json ,we have to add the timestamp which is not included for each record but at the root level
        var results = messages;
        if (format === 'application/om+json') {
            results = [];
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                results.push(__assign({ timestamp: message.timestamp }, message.result));
            }
        }
        this.handleData(results, format);
    };
    SweApiRealTimeContext.prototype.connect = function () {
        this.streamFunction();
    };
    SweApiRealTimeContext.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (isDefined(this.streamObject)) {
                    this.streamObject.stream().disconnect();
                }
                this.properties.version++;
                return [2 /*return*/];
            });
        });
    };
    SweApiRealTimeContext.prototype.isConnected = function () {
        return this.streamObject.stream().status;
    };
    return SweApiRealTimeContext;
}(SweApiContext));
export default SweApiRealTimeContext;
//# sourceMappingURL=SweApi.realtime.context.js.map