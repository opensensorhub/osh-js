/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Richard Becker. All Rights Reserved.

 Author: Richard Becker <beckerr@prominentedge.com>
 Alex Robin, SensiaSoft

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
/**
 * @example
 * import Server from 'core/server/Server.js';
 *
 * let oshServer = new Server({
 *    url : <someUrl>,
 *    sosService: 'sos',
 *    spsService: 'sps',
 *    baseUrl: 'sensorhub'
 * });
 */
import { isDefined, randomUUID, isWebWorker } from "../utils/Utils.js";
import SWEXmlStreamParser from "../parsers/SWEXmlStreamParser.js";
import Worker from './GetRequest.worker.js';
var Server = /** @class */ (function () {
    /**
     * @param {Object} properties -
     * @param {String} properties.url -
     * @param {String} properties.baseUrl -
     * @param {String} [properties.sos="sos"] -
     * @param {String} [properties.sps="sps"] -
     */
    function Server(properties) {
        this.url = properties.url;
        this.sos = (isDefined(properties.sos)) ? properties.sos : 'sos';
        this.sps = (isDefined(properties.sps)) ? properties.sps : 'sps';
        this.baseUrl = properties.baseUrl;
        this.id = "Server-" + randomUUID();
    }
    /**
     * Gets the server Capabilities.
     * @param {Function} successCallback - async method called when the response succeeded
     * @param {Function} errorCallback - async method called when an error occured
     */
    Server.prototype.getCapabilities = function (successCallback, errorCallback) {
        var request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetCapabilities';
        this.executeGetRequest(request, successCallback, errorCallback);
    };
    /**
     * Gets the server Feature of interest.
     * @param {Function} successCallback - async method called when the response succeeded
     * @param {Function} errorCallback - async method called when an error occurred
     */
    Server.prototype.getFeatureOfInterest = function (successCallback, errorCallback) {
        var request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetFeatureOfInterest';
        this.executeGetRequest(request, successCallback, errorCallback);
    };
    /**
     * Gets the server Feature of interest given a procedure id.
     * @param {String} procedure - The procedure id
     * @param {Function} successCallback - async method called when the response succeeded
     * @param {Function} errorCallback - async method called when an error occurred
     */
    Server.prototype.getFeatureOfInterestById = function (procedure, successCallback, errorCallback) {
        var request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetFeatureOfInterest&procedure=' + procedure;
        this.executeGetRequest(request, successCallback, errorCallback);
    };
    /**
     * Gets the server result template.
     * @param {String} offering - The corresponding offering
     * @param {String} observedProperty - The corresponding observed property
     * @param {Function} successCallback - async method called when the response succeeded
     * @param {Function} errorCallback - async method called when an error occurred
     */
    Server.prototype.getResultTemplate = function (offering, observedProperty, successCallback, errorCallback) {
        var request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetResultTemplate&offering=' + offering + "&observedProperty=" + observedProperty;
        this.executeGetRequest(request, successCallback, errorCallback);
    };
    /**
     * Gets the server Feature of interest given a procedure id.
     * @param {String} procedure - The procedure id
     * @param {Function} successCallback - async method called when the response succeeded
     * @param {Function} errorCallback - async method called when an error occurred
     */
    Server.prototype.getDescribeSensor = function (procedure, successCallback, errorCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            var _this = this;
            return __generator(this, function (_a) {
                request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=DescribeSensor&procedure=' + procedure;
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.executeGetRequest(request, resolve, errorCallback);
                    })];
            });
        });
    };
    Server.prototype.getDescribeSensorAsJson = function (procedure, errorCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            var _this = this;
            return __generator(this, function (_a) {
                request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=DescribeSensor&procedure='
                    + procedure + '&procedureDescriptionFormat=http://www.opengis.net/sensorml-json/2.0';
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.executeGetRequest(request, resolve, errorCallback, true);
                    })];
            });
        });
    };
    /**
     * @private
     * @param request
     * @param successCallback
     * @param errorCallback
     */
    Server.prototype.executeGetRequest = function (request, successCallback, errorCallback, fromJson) {
        if (fromJson === void 0) { fromJson = false; }
        if (isWebWorker()) { // run in web worker if possible
            this.executeGetRequestWebWorker(request, successCallback, errorCallback, fromJson);
        }
        else {
            var xhr_1 = new XMLHttpRequest();
            var that_1 = this;
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState === 4) {
                    if (xhr_1.status === 200) {
                        var s = successCallback.bind(that_1);
                        if (fromJson) {
                            s(JSON.parse(xhr_1.responseText));
                        }
                        else {
                            var sweXmlParser = new SWEXmlStreamParser(xhr_1.responseText);
                            s(sweXmlParser.toJson());
                        }
                    }
                    else {
                        errorCallback(xhr_1.responseText);
                    }
                }
            };
            xhr_1.withCredentials = true;
            xhr_1.open('GET', request, true);
            xhr_1.send();
        }
    };
    /**
     * @private
     * @param request
     * @param successCallback
     * @param errorCallback
     */
    Server.prototype.executeGetRequestWebWorker = function (request, successCallback, errorCallback, fromJson) {
        if (fromJson === void 0) { fromJson = false; }
        // create worker source code blob if not created yet
        var worker = new Worker();
        worker.onerror = function (e) {
            worker.terminate();
            errorCallback("Internal error in worker: " + e.message);
        };
        worker.onmessage = function (e) {
            worker.terminate();
            if (isDefined(e.data.error)) {
                errorCallback(e.data.msg);
            }
            else {
                successCallback(e.data);
            }
        };
        worker.postMessage({
            request: request,
            json: fromJson
        });
    };
    return Server;
}());
export default Server;
1;
//# sourceMappingURL=Server.js.map