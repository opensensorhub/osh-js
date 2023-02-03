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
import SosGetResultContext from "./SosGetResult.context";
import WebSocketConnector from "../../../connector/WebSocketConnector";
import MqttConnector from "../../../connector/MqttConnector";
import { isDefined } from "../../../utils/Utils";
var SosGetResultRealTimeContext = /** @class */ (function (_super) {
    __extends(SosGetResultRealTimeContext, _super);
    function SosGetResultRealTimeContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay factor
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Object} properties.customUrlParams - the encoding options
     * @return {String} the full url
     */
    SosGetResultRealTimeContext.prototype.getQueryString = function (properties) {
        var queryString = _super.prototype.getQueryString.call(this, properties);
        // adds temporalFilter
        queryString += "&temporalFilter=phenomenonTime,now/2055-01-01Z";
        return queryString;
    };
    SosGetResultRealTimeContext.prototype.createDataConnector = function (properties) {
        var tls = (properties.tls) ? 's' : '';
        var url = properties.protocol + tls + '://' + properties.endpointUrl;
        var connector;
        // if we switch of protocol
        if (properties.protocol === 'ws') {
            connector = new WebSocketConnector(url, properties);
        }
        else if (properties.protocol === 'mqtt') {
            var tls_1 = (properties.tls) ? 's' : '';
            var url_1 = properties.protocol + tls_1 + '://' + properties.mqttOpts.endpointUrl;
            connector = new MqttConnector(url_1, properties);
        }
        else {
            throw Error("Unsupported connector ".concat(properties.protocol));
        }
        return connector;
    };
    SosGetResultRealTimeContext.prototype.onMessage = function (messages, format) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.handleData;
                        return [4 /*yield*/, this.parseData(messages)];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    SosGetResultRealTimeContext.prototype.connect = function () {
        if (isDefined(this.connector)) {
            this.connector.doRequest('', this.getQueryString(this.properties));
        }
        else {
            throw Error('there is no connector defined');
        }
    };
    SosGetResultRealTimeContext.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.connector.disconnect();
                return [2 /*return*/];
            });
        });
    };
    SosGetResultRealTimeContext.prototype.parseData = function (messages) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.parser.parseDataBlock(messages)];
            });
        });
    };
    SosGetResultRealTimeContext.prototype.onChangeStatus = function (status) {
        console.log(status);
    };
    return SosGetResultRealTimeContext;
}(SosGetResultContext));
export default SosGetResultRealTimeContext;
//# sourceMappingURL=SosGetResult.realtime.context.js.map