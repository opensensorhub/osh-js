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
import { isDefined } from "../../../utils/Utils";
import DataSourceContext from "../../common/context/DataSource.context";
import BinaryDataParser from "../../../parsers/BinaryDataParser";
import WebSocketFetchConnector from "../../../connector/WebSocketFetchConnector";
import HttpConnector from "../../../connector/HttpConnector";
var SosContext = /** @class */ (function (_super) {
    __extends(SosContext, _super);
    function SosContext(parser) {
        var _this = _super.call(this) || this;
        _this.parser = parser;
        return _this;
    }
    SosContext.prototype.init = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.parser.init(properties);
                return [2 /*return*/, _super.prototype.init.call(this, properties)];
            });
        });
    };
    SosContext.prototype.checkInit = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    SosContext.prototype.createDataConnector = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            var tls, url, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tls = (properties.tls) ? 's' : '';
                        // issue with SOS < 1.4, binary data cannot be fetch as HTTP in octet-stream, must use WebSocket as workaround
                        return [4 /*yield*/, this.checkInit()];
                    case 1:
                        // issue with SOS < 1.4, binary data cannot be fetch as HTTP in octet-stream, must use WebSocket as workaround
                        _a.sent();
                        if (this.parser.parser instanceof BinaryDataParser) {
                            url = 'ws' + tls + '://' + properties.endpointUrl;
                            return [2 /*return*/, new WebSocketFetchConnector(url, properties)];
                        }
                        else {
                            url = 'http' + tls + '://' + properties.endpointUrl;
                            return [2 /*return*/, new HttpConnector(url, __assign(__assign({}, properties), { method: 'GET' }))];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.protocol the protocol protocol
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Object} properties.customUrlParams - the encoding options
     * @param {Number} properties.customUrlParams.video_bitrate - define a custom bitrate (in b/s)
     * @param {Number} properties.customUrlParams.video_scale - define a custom scale, 0.0 < value < 1.0
     * @param {Number} properties.customUrlParams.video_width - define a custom width
     * @param {Number} properties.customUrlParams.video_height - define a custom height
     * @return {String} the full url
     */
    SosContext.prototype.getQueryString = function (properties) {
        var queryString = "";
        // adds service
        queryString = "service=" + properties.service;
        // adds version
        queryString += "&version=2.0";
        // adds responseFormat (optional)
        if (properties.responseFormat) {
            queryString += "&responseFormat=" + properties.responseFormat;
        }
        if (isDefined(properties.customUrlParams) && Object.keys(properties.customUrlParams).length > 0) {
            queryString += '&';
            for (var key in properties.customUrlParams) {
                queryString += key + '=' + properties.customUrlParams[key] + '&';
            }
            if (url.endsWith('&')) {
                queryString = url.slice(0, -1);
            }
        }
        return queryString;
    };
    return SosContext;
}(DataSourceContext));
export default SosContext;
//# sourceMappingURL=Sos.context.js.map