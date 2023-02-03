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
var SweApiReplayContext = /** @class */ (function (_super) {
    __extends(SweApiReplayContext, _super);
    function SweApiReplayContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SweApiReplayContext.prototype.init = function (properties) {
        this.collection = undefined;
        this.relativeStartTimestamp = undefined;
        this.properties = properties;
        this.replayFunction = undefined;
        var networkProperties = __assign({}, properties);
        var filter;
        var regex = new RegExp('\\/systems\\/(.*)\\/controls\\/(.*)\\/status');
        // check control status
        if (regex.test(properties.resource)) {
            filter = this.createControlFilter(properties);
            // is observation streaming
            var match = regex.exec(properties.resource);
            var control_1 = new Control({
                id: match[2],
                'system@id': match[1]
            }, networkProperties);
            this.replayFunction = function (props, startTimestamp, endTimestamp) {
                var controlFilter = this.createControlFilter(__assign(__assign(__assign({}, properties), props), { startTime: new Date(startTimestamp).toISOString(), endTime: new Date(endTimestamp).toISOString() }));
                return control_1.searchStatus(controlFilter, 1);
            };
        }
        else {
            // check for datastream observations
            regex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/observations
            if (regex.test(properties.resource)) {
                // is observation streaming
                var match = regex.exec(properties.resource);
                var dataStream_1 = new DataStream({
                    id: match[2]
                }, networkProperties);
                this.dataStream = dataStream_1;
                this.replayFunction = function (props, startTime, endTime) {
                    var obsFilter = this.createObservationFilter(__assign(__assign(__assign({}, properties), props), { replaySpeed: undefined, startTime: startTime, endTime: endTime }));
                    return dataStream_1.searchObservations(obsFilter, properties.prefetchBatchSize);
                };
            }
        }
    };
    SweApiReplayContext.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.collection = undefined;
                this.relativeStartTimestamp = undefined;
                this.replayFunction = undefined;
                return [2 /*return*/];
            });
        });
    };
    SweApiReplayContext.prototype.nextBatch = function (properties, masterTimestamp, status) {
        if (status === void 0) { status = { cancel: false }; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var data_1, results_1, moveTimeCursor, fetchNext, ex_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    results_1 = [];
                                    moveTimeCursor = function () { return __awaiter(_this, void 0, void 0, function () {
                                        var relativeStartTime, _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    if (isDefined(this.relativeStartTimestamp)) {
                                                        relativeStartTime = new Date(this.relativeStartTimestamp + 1).toISOString();
                                                    }
                                                    else {
                                                        //TOCHECK: ISO or timestamp
                                                        relativeStartTime = new Date(this.properties.startTime).toISOString();
                                                    }
                                                    console.warn("fetching ".concat(relativeStartTime, " -> ") +
                                                        "".concat(this.properties.endTime, " for datasource ").concat(this.properties.dataSourceId));
                                                    _a = this;
                                                    return [4 /*yield*/, this.replayFunction(properties, relativeStartTime, this.properties.endTime)];
                                                case 1:
                                                    _a.collection = _b.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); };
                                    fetchNext = function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _i, data_2, d;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.collection.nextPage()];
                                                case 1:
                                                    data_1 = _a.sent();
                                                    if (status.cancel) {
                                                        reject('Status has been cancelled');
                                                    }
                                                    if (data_1.length > 0) {
                                                        if (this.properties.responseFormat === 'application/om+json') {
                                                            for (_i = 0, data_2 = data_1; _i < data_2.length; _i++) {
                                                                d = data_2[_i];
                                                                results_1.push(__assign({ timestamp: d.timestamp }, d.result));
                                                            }
                                                        }
                                                        else {
                                                            results_1 = data_1;
                                                        }
                                                        if (status.cancel) {
                                                            reject('Status has been cancelled');
                                                        }
                                                        else {
                                                            // start startTime cursor
                                                            this.relativeStartTimestamp = results_1[results_1.length - 1].timestamp;
                                                            resolve(results_1);
                                                        }
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); };
                                    return [4 /*yield*/, moveTimeCursor()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, fetchNext()];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    ex_1 = _a.sent();
                                    reject(ex_1);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return SweApiReplayContext;
}(SweApiContext));
export default SweApiReplayContext;
//# sourceMappingURL=SweApi.replay.context.js.map