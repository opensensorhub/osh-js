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
import SosGetResultContext from "./SosGetResult.context";
import { isDefined } from "../../../utils/Utils";
var SosGetResultReplayContext = /** @class */ (function (_super) {
    __extends(SosGetResultReplayContext, _super);
    function SosGetResultReplayContext() {
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
    SosGetResultReplayContext.prototype.getQueryString = function (properties) {
        var queryString = _super.prototype.getQueryString.call(this, properties);
        var startTime = properties.startTime;
        var endTime = properties.endTime;
        // adds temporalFilter
        queryString += "&temporalFilter=phenomenonTime," + startTime + "/" + endTime;
        // queryString += `&replaySpeed=${properties.replaySpeed}`;
        // TODO: server issue, waiting for fix
        // queryString += "&responseFormat=application/octet-stream";
        return queryString;
    };
    SosGetResultReplayContext.prototype.checkInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.parser.checkInit()];
            });
        });
    };
    SosGetResultReplayContext.prototype.init = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.startTimestamp = new Date(properties.startTime).getTime();
                this.endTimestamp = new Date(properties.endTime).getTime();
                this.relativeDate = undefined;
                return [2 /*return*/, _super.prototype.init.call(this, properties)];
            });
        });
    };
    SosGetResultReplayContext.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.relativeDate = undefined;
                return [2 /*return*/];
            });
        });
    };
    SosGetResultReplayContext.prototype.nextBatch = function (properties, masterTimestamp, status) {
        if (status === void 0) { status = { cancel: false }; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var fetchDuration_1, moveTimeCursor, fetchNext, data, ex_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    fetchDuration_1 = this.properties.prefetchBatchDuration;
                                    moveTimeCursor = function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        if (isDefined(this.relativeDate)) {
                                                            // move cursor ahead
                                                            this.relativeDate = new Date(this.relativeDate.getTime() + fetchDuration_1);
                                                        }
                                                        else {
                                                            this.relativeDate = new Date(this.properties.startTime);
                                                        }
                                                        resolve();
                                                        return [2 /*return*/];
                                                    });
                                                }); })];
                                        });
                                    }); };
                                    fetchNext = function (startTime, endTime) { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                    var data, results, _i, data_1, d, _a, _b, _c, _d, _e, _f;
                                                    return __generator(this, function (_g) {
                                                        switch (_g.label) {
                                                            case 0:
                                                                console.warn("fetching ".concat(startTime, " -> ") +
                                                                    "".concat(endTime, " for datasource ").concat(this.properties.dataSourceId));
                                                                return [4 /*yield*/, this.connector.doRequest('', this.getQueryString(__assign(__assign(__assign({}, this.properties), properties), { startTime: startTime, endTime: endTime })))];
                                                            case 1:
                                                                data = _g.sent();
                                                                results = [];
                                                                if (!Array.isArray(data)) return [3 /*break*/, 6];
                                                                _i = 0, data_1 = data;
                                                                _g.label = 2;
                                                            case 2:
                                                                if (!(_i < data_1.length)) return [3 /*break*/, 5];
                                                                d = data_1[_i];
                                                                _b = (_a = results.push).apply;
                                                                _c = [results];
                                                                return [4 /*yield*/, this.parseData(d)];
                                                            case 3:
                                                                _b.apply(_a, _c.concat([_g.sent()]));
                                                                _g.label = 4;
                                                            case 4:
                                                                _i++;
                                                                return [3 /*break*/, 2];
                                                            case 5: return [3 /*break*/, 8];
                                                            case 6:
                                                                _e = (_d = results.push).apply;
                                                                _f = [results];
                                                                return [4 /*yield*/, this.parseData(data)];
                                                            case 7:
                                                                _e.apply(_d, _f.concat([_g.sent()]));
                                                                _g.label = 8;
                                                            case 8:
                                                                if (status.cancel) {
                                                                    reject('Status=canceled');
                                                                }
                                                                else {
                                                                    resolve(results);
                                                                }
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        });
                                    }); };
                                    data = void 0;
                                    _a.label = 1;
                                case 1: return [4 /*yield*/, moveTimeCursor()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, fetchNext(this.relativeDate.toISOString(), new Date(this.relativeDate.getTime() + fetchDuration_1).toISOString())];
                                case 3:
                                    data = _a.sent();
                                    _a.label = 4;
                                case 4:
                                    if (data.length === 0 && this.relativeDate.getTime() < this.endTimestamp) return [3 /*break*/, 1];
                                    _a.label = 5;
                                case 5:
                                    resolve(data);
                                    return [3 /*break*/, 7];
                                case 6:
                                    ex_1 = _a.sent();
                                    reject(ex_1);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    SosGetResultReplayContext.prototype.parseData = function (messages) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.parser.parseDataBlock(messages)];
            });
        });
    };
    SosGetResultReplayContext.prototype.isConnected = function () {
        return isDefined(this.connector) && this.connector.isConnected();
    };
    SosGetResultReplayContext.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return SosGetResultReplayContext;
}(SosGetResultContext));
export default SosGetResultReplayContext;
//# sourceMappingURL=SosGetResult.replay.context.js.map