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
import { isDefined } from "../../utils/Utils";
import SweApiHandler from "../sweapi/handler/SweApi.handler";
import SosGetFoisHandler from "../sos/handler/SosGetFois.handler";
import SosGetResultHandler from "../sos/handler/SosGetResult.handler";
var dataSourceHandler = undefined;
self.onmessage = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, handleMessage(event.data, self)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var promise = new Promise(function (resolve) { resolve(); });
function checkPerformingAction() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promise];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function handleMessage(event) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkPerformingAction()];
                case 1:
                    _a.sent();
                    // ensure the right order of the actions
                    promise = new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var value;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!isDefined(dataSourceHandler)) return [3 /*break*/, 3];
                                    if (!(event.message === 'init')) return [3 /*break*/, 2];
                                    dataSourceHandler = createHandlerFromProperties(event.properties);
                                    return [4 /*yield*/, dataSourceHandler.init(event.properties, event.topics, event.id)];
                                case 1:
                                    _a.sent();
                                    value = dataSourceHandler.isInitialized();
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 6];
                                case 3:
                                    if (!(event.message === 'connect')) return [3 /*break*/, 5];
                                    return [4 /*yield*/, dataSourceHandler.connect(event.startTime)];
                                case 4:
                                    _a.sent();
                                    // send back result or just return
                                    postMessage({
                                        message: event.message,
                                        data: value,
                                        messageId: event.messageId
                                    });
                                    resolve();
                                    return [3 /*break*/, 6];
                                case 5:
                                    if (event.message === 'disconnect') {
                                        dataSourceHandler.disconnect();
                                    }
                                    else if (event.message === 'topics') {
                                        dataSourceHandler.setTopics(event.topics);
                                    }
                                    else if (event.message === 'update-properties') {
                                        dataSourceHandler.updateProperties(event.data);
                                    }
                                    else if (event.message === 'is-connected') {
                                        value = dataSourceHandler.isConnected();
                                    }
                                    else if (event.message === 'is-init') {
                                        value = dataSourceHandler.isInitialized();
                                    }
                                    _a.label = 6;
                                case 6:
                                    // send back result or just return
                                    postMessage({
                                        message: event.message,
                                        data: value,
                                        messageId: event.messageId
                                    });
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/, promise];
            }
        });
    });
}
function createHandlerFromProperties(properties) {
    if (properties.type === 'SosGetResult') {
        return new SosGetResultHandler();
    }
    else if (properties.type === 'SosGetFois') {
        return new SosGetFoisHandler();
    }
    else if (properties.type === 'SweApiStream') {
        return new SweApiHandler();
    }
    else {
        throw Error('Unsupported SOS service Error');
    }
}
//# sourceMappingURL=DataSource.worker.js.map