/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/
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
import mqtt from './mqtt.min.js';
import { isDefined } from "../utils/Utils.js";
var mqttCallbacks = {};
var MqttProvider = /** @class */ (function () {
    /**
     * Build the MqttProvider.
     * @param {Object} properties - the object properties
     * @param {String} properties.endpoint - the mqtt endpoint[:port]
     * @param {String} properties.clientId - the clientId
     * @param {String} [properties.mqttPrefix='/api'] - a prefix to each topic
     * @param {Object} properties.options - the MQTT.js property options as defined  [mqtt.Client(streamBuilder, options)]{@link https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options}
     * Note that the credentials are passed in the object options as for the mqtt.js client.
     */
    function MqttProvider(properties) {
        this.properties = properties;
        if (!isDefined(properties)) {
            throw Error('endpoint and clientId are mandatory properties');
        }
        if (!isDefined(properties.endpoint)) {
            throw Error('endpoint is a mandatory property');
        }
        if (!isDefined(properties.clientId)) {
            throw Error('clientId is a mandatory property');
        }
        this.mqttPrefix = '/api';
        if (isDefined(properties.mqttPrefix)) {
            this.mqttPrefix = properties.mqttPrefix;
        }
        this.topics = [];
        var options = {
            reconnectPeriod: 30,
            connectTimeout: 30 * 1000,
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            wsOptions: {
                binaryType: 'arraybuffer'
            }
        };
        // merge generic options
        if (isDefined(this.properties.options)) {
            options = __assign(__assign({}, options), this.properties.options);
        }
        this.options = options;
        this.endpoint = properties.endpoint + '/mqtt';
        this.clientId = properties.clientId;
        this.client = null;
    }
    MqttProvider.prototype.subscribe = function (topic, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var interval, topicQuery;
            var _this = this;
            return __generator(this, function (_a) {
                if (topic in this.topics) {
                    // already subscribed, skipping
                    return [2 /*return*/];
                }
                if (!isDefined(this.client)) {
                    throw Error('You must connect the client before subscribing any topic');
                }
                topicQuery = "".concat(this.mqttPrefix).concat(topic);
                this.topics.push(topic);
                return [2 /*return*/, new Promise(function (resolve, error) {
                        interval = setInterval(function () {
                            if (_this.client.connected) {
                                try {
                                    // subscribe
                                    // store callback for this topic
                                    if (!(topicQuery in mqttCallbacks)) {
                                        mqttCallbacks[topicQuery] = [];
                                    }
                                    mqttCallbacks[topicQuery].push(callback);
                                    _this.client.subscribe("".concat(topicQuery), function (err) {
                                        if (err) {
                                            callback(err);
                                            error(err);
                                        }
                                        else {
                                            console.warn("Subscribed to ".concat(topicQuery));
                                            resolve();
                                        }
                                    });
                                }
                                catch (exception) {
                                    console.error(exception);
                                }
                                finally {
                                    clearInterval(interval);
                                }
                            }
                        }, 100);
                    })];
            });
        });
    };
    MqttProvider.prototype.publish = function (topic, payload) {
        var topicQuery = "".concat(this.mqttPrefix).concat(topic);
        this.client.publish(topicQuery, payload);
    };
    /**
     * Check to unsuscribe to any topic listened by this dsId
     * If the topic is only subscribed by the dsId, unsubscribe from broken
     * Otherwise, remove from the list of subscribe topic/dsId
     * @param topic
     */
    MqttProvider.prototype.unsubscribe = function (topic) {
        return __awaiter(this, void 0, void 0, function () {
            var topicQuery;
            var _this = this;
            return __generator(this, function (_a) {
                topicQuery = "".concat(this.mqttPrefix).concat(topic);
                return [2 /*return*/, new Promise(function (resolve, error) {
                        _this.client.unsubscribe(topicQuery, function (err) {
                            delete mqttCallbacks[topicQuery];
                            if (err) {
                                var messageErr = "Cannot Unsubscribed topic: ".concat(topicQuery, " : ").concat(err);
                                console.error(messageErr);
                                error(messageErr);
                            }
                            else {
                                console.warn("Unsubscribed topic: ".concat(topicQuery));
                                resolve();
                            }
                        });
                    })];
            });
        });
    };
    MqttProvider.prototype.unsubscribeAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, topic;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.topics;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        topic = _a[_i];
                        return [4 /*yield*/, this.unsubscribe(topic)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.topics = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    MqttProvider.prototype.connect = function () {
        if (!isDefined(this.client)) {
            // connects to the broker specified by the given url and options and returns a Client.
            this.client = mqtt.connect(this.endpoint, __assign({}, this.options));
            var that_1 = this;
            this.client.on('connect', function (e) {
                console.info("Mqtt client is connected to ".concat(that_1.endpoint));
            });
            this.client.on('message', this.onMessage.bind(this));
            this.client.on('offline', function (e) {
                throw new Error("The server ".concat(that_1.endpoint, " seems offline"));
            });
            this.client.on('error', function (e) {
                throw new Error(error);
            });
        }
    };
    MqttProvider.prototype.onMessage = function (topic, message) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, callbackFn;
            return __generator(this, function (_b) {
                // console.log(new DataView(message.buffer, message.byteOffset).getFloat64(0, false) * 1000)
                // console.log(new DataView(new Uint8Array(message).subarray(message.byteOffset).buffer).getFloat64(0, false) * 1000)
                // console.log(String.fromCharCode.apply(null, new Uint8Array(message)));
                if (topic in mqttCallbacks) {
                    // callback for the corresponding topic
                    for (_i = 0, _a = mqttCallbacks[topic]; _i < _a.length; _i++) {
                        callbackFn = _a[_i];
                        // callback to all subscription registered
                        callbackFn(new Uint8Array(message).subarray(message.byteOffset).buffer);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    MqttProvider.prototype.disconnect = function () {
        if (!isDefined(this.client)) {
            throw Error('The client has not been created yet');
        }
        // close the client
        this.client.end();
        mqttCallbacks = {};
        this.client = null;
    };
    MqttProvider.prototype.isConnected = function () {
        return isDefined(this.client) && this.client.connected;
    };
    return MqttProvider;
}());
export default MqttProvider;
//# sourceMappingURL=MqttProvider.js.map