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
import DataConnector from './DataConnector.js';
import { isDefined } from '../utils/Utils.js';
import { Status } from './Status.js';
/**
 * Defines the WebSocketConnector to connect to a remote server by creating a WebSocket channel.
 * @extends DataConnector
 * @example
 * import WebSocketConnector from 'osh-js/dataconnector/WebSocketConnector.js';
 *
 * let url = ...;
 * let connector = new WebSocketConnector(url);
 *
 * // connect
 * connector.connect();
 *
 * // disconnect
 * connector.disconnect();
 *
 * // close
 * connector.close();
 *
 */
var reconnectionInterval = -1;
var WebSocketConnector = /** @class */ (function (_super) {
    __extends(WebSocketConnector, _super);
    /**
     *
     * @param url -
     * @param {Object} properties -
     */
    function WebSocketConnector(url, properties) {
        var _this = _super.call(this, url, properties) || this;
        _this.interval = -1;
        _this.lastReceiveTime = 0;
        _this.extraUrl = '';
        return _this;
    }
    /**
     * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
     * the main thread.
     */
    WebSocketConnector.prototype.doRequest = function (extraUrl, queryString) {
        var _this = this;
        if (extraUrl === void 0) { extraUrl = this.extraUrl; }
        if (queryString === void 0) { queryString = this.queryString; }
        if (!this.init) {
            this.extraUrl = extraUrl;
            this.queryString = queryString;
            var fullUrl = this.getUrl() + extraUrl;
            if (isDefined(queryString)) {
                fullUrl += '?' + queryString;
            }
            this.closed = false;
            this.init = true;
            //creates Web Socket
            this.ws = new WebSocket(fullUrl);
            this.ws.binaryType = 'arraybuffer';
            this.checkStatus(Status.CONNECTING);
            console.warn('WebSocket stream connecting');
            this.ws.onopen = function (event) {
                this.checkAndClearReconnection();
                this.checkStatus(Status.CONNECTED);
                console.warn('WebSocket stream connected');
            }.bind(this);
            this.ws.onmessage = function (event) {
                this.lastReceiveTime = Date.now();
                //callback data on message received
                if (event.data.byteLength > 0) {
                    this.onMessage(event.data);
                }
            }.bind(this);
            // closes socket if any errors occur
            this.ws.onerror = function (event) {
                console.error('WebSocket stream error');
                this.checkStatus(Status.CLOSED_ERROR);
                this.init = false;
                this.lastReceiveTime = -1;
                this.createReconnection();
                this.onError(event);
            }.bind(this);
            this.ws.onclose = function (event) {
                console.warn('WebSocket stream closed: ', event.reason, event.code);
                if (event.code !== 1000 && !_this.closed) {
                    _this.checkStatus(Status.CLOSED_ERROR);
                    _this.createReconnection();
                }
                else {
                    _this.checkStatus(Status.DISCONNECTED);
                }
                _this.onClose(event.code);
            };
            if (this.reconnectionInterval !== -1) {
                clearInterval(this.reconnectionInterval);
                this.reconnectionInterval = -1;
            }
        }
    };
    /**
     * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
     * the main thread.
     */
    WebSocketConnector.prototype.doAsyncRequest = function (extraUrl, queryString) {
        var _this = this;
        if (extraUrl === void 0) { extraUrl = this.extraUrl; }
        if (queryString === void 0) { queryString = this.queryString; }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var fullUrl, results_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.init) {
                    this.extraUrl = extraUrl;
                    this.queryString = queryString;
                    fullUrl = this.getUrl() + extraUrl;
                    if (isDefined(queryString)) {
                        fullUrl += '?' + queryString;
                    }
                    this.closed = false;
                    this.init = true;
                    //creates Web Socket
                    this.ws = new WebSocket(fullUrl);
                    this.ws.binaryType = 'arraybuffer';
                    this.checkStatus(Status.CONNECTING);
                    console.warn('WebSocket stream connecting');
                    results_1 = [];
                    this.ws.onopen = function (event) {
                        this.checkAndClearReconnection();
                        this.checkStatus(Status.CONNECTED);
                        console.warn('WebSocket stream connected');
                    }.bind(this);
                    this.ws.onmessage = function (event) {
                        this.lastReceiveTime = Date.now();
                        //callback data on message received
                        if (event.data.byteLength > 0) {
                            // this.onMessage(event.data);
                            results_1.push(event.data);
                        }
                    }.bind(this);
                    // closes socket if any errors occur
                    this.ws.onerror = function (event) {
                        console.error('WebSocket stream error');
                        this.checkStatus(Status.CLOSED_ERROR);
                        this.init = false;
                        this.lastReceiveTime = -1;
                        this.createReconnection();
                        this.onError(event);
                        reject("onError WS: ".concat(event));
                    }.bind(this);
                    this.ws.onclose = function (event) {
                        console.warn('WebSocket stream closed: ', event.reason, event.code);
                        if (event.code !== 1000 && !_this.closed) {
                            _this.checkStatus(Status.CLOSED_ERROR);
                            _this.createReconnection();
                        }
                        else {
                            _this.checkStatus(Status.DISCONNECTED);
                        }
                        _this.onClose(event.code);
                        resolve(results_1);
                    };
                    if (this.reconnectionInterval !== -1) {
                        clearInterval(this.reconnectionInterval);
                        this.reconnectionInterval = -1;
                    }
                }
                return [2 /*return*/];
            });
        }); });
    };
    WebSocketConnector.prototype.connect = function () {
        this.doRequest();
    };
    WebSocketConnector.prototype.publishRequest = function (topic, payload) {
        if (isDefined(this.ws)) {
            this.ws.send(payload);
        }
    };
    WebSocketConnector.prototype.checkAndClearReconnection = function () {
        if (reconnectionInterval !== -1) {
            clearInterval(reconnectionInterval);
            reconnectionInterval = -1;
        }
    };
    WebSocketConnector.prototype.createReconnection = function () {
        if (!this.closed && reconnectionInterval === -1 && this.onReconnect()) {
            var count_1 = 0;
            var url_1 = this.url;
            reconnectionInterval = setInterval(function () {
                var delta = Date.now() - this.lastReceiveTime;
                // -1 means the WS went in error
                if (this.lastReceiveTime === -1 || (delta >= this.reconnectTimeout)) {
                    if (count_1++ >= this.properties.reconnectRetry) {
                        console.warn("Maximum reconnection retries attempted: ".concat(this.properties.reconnectRetry));
                        clearInterval(reconnectionInterval);
                    }
                    else {
                        var fullUrl = url_1;
                        if (isDefined(this.extraUrl)) {
                            fullUrl += this.extraUrl;
                        }
                        if (isDefined(this.queryString)) {
                            fullUrl += '?' + this.queryString;
                        }
                        console.warn("(".concat(count_1, "/").concat(this.properties.reconnectRetry, ") trying to reconnect: ").concat(fullUrl));
                        this.init = false;
                        this.connect();
                    }
                }
            }.bind(this), this.reconnectTimeout);
        }
    };
    /**
     * Disconnects and close the websocket.
     */
    WebSocketConnector.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // super.disconnect();
                this.init = false;
                this.closed = true;
                if (this.ws != null && this.ws.readyState !== WebSocket.CLOSED) {
                    this.ws.close();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * The onMessage method used by the websocket to callback the data
     * @param data the callback data
     * @event
     */
    WebSocketConnector.prototype.onMessage = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    WebSocketConnector.prototype.isConnected = function () {
        return (this.ws != null && this.ws.readyState === WebSocket.OPEN);
    };
    return WebSocketConnector;
}(DataConnector));
export default WebSocketConnector;
//# sourceMappingURL=WebSocketConnector.js.map