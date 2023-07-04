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
import SystemFilter from "./SystemFilter";
import SensorWebApi from "../SensorWebApi";
import Collection from "../Collection";
import DataStreamFilter from "../datastream/DataStreamFilter";
import FeatureOfInterestFilter from "../featureofinterest/FeatureOfInterestFilter";
import API from "../routes.conf";
import ControlFilter from "../control/ControlFilter";
import EventFilter from "../event/EventFilter";
import SystemHistoryFilter from "../history/SystemHistoryFilter";
import SweApiFetchSystemParser from "../../parsers/sweapi/collection/SweApiFetchSystem.parser";
import SweApiDataStreamParser from "../../parsers/sweapi/collection/SweApiDataStream.parser";
import SweApiFetchFeatureOfInterestParser from "../../parsers/sweapi/collection/SweApiFetchFeatureOfInterest.parser";
import SweApiFetchEventParser from "../../parsers/sweapi/collection/SweApiFetchEvent.parser";
import SweApiFetchControlParser from "../../parsers/sweapi/collection/SweApiFetchControl.parser";
var System = /** @class */ (function (_super) {
    __extends(System, _super);
    /**
     * @param {Object} properties - the properties of the object
     * @param {Object} [networkProperties={}]
     * @param {String} networkProperties.endpointUrl - defines the Http(s) endpoint URL
     * @param {Boolean} networkProperties.tls - defines is use Http or Https secure protocol for fetching data
     * @param {String} [networkProperties.streamProtocol='ws'] - the Stream protocol to use: 'ws' pr 'mqtt'
     * @param {Object} [networkProperties.mqttOpts={}] - the Mqtt options if stream protocol is 'mqtt'
     * @param {String} networkProperties.mqttOpts.prefix - the Mqtt prefix value
     * @param {String} networkProperties.mqttOpts.endpointUrl - the Mqtt specific endpointUrl
     */
    function System(properties, networkProperties) {
        var _this = _super.call(this, networkProperties) || this;
        _this.properties = properties;
        _this.sweApiFetchSystemParser = new SweApiFetchSystemParser(networkProperties);
        _this.sweApiDataStreamParser = new SweApiDataStreamParser(networkProperties);
        _this.sweApiFetchFeatureOfInterestParser = new SweApiFetchFeatureOfInterestParser(networkProperties);
        _this.sweApiFetchEventParser = new SweApiFetchEventParser(networkProperties);
        _this.sweApiFetchControlParser = new SweApiFetchControlParser(networkProperties);
        return _this;
    }
    /**
     * Get the latest specsheet of a system
     * route: /systems/{sysid}/details
     * @param {SystemFilter} [systemFilter=new SystemFilter()] - the system filter
     * @return {Promise<JSON>} - SensorlML Description
     */
    System.prototype.getDetails = function (systemFilter) {
        if (systemFilter === void 0) { systemFilter = new SystemFilter(); }
        return __awaiter(this, void 0, void 0, function () {
            var apiUrl, queryString;
            return __generator(this, function (_a) {
                apiUrl = API.systems.details.replace('{sysid}', this.properties.id);
                queryString = systemFilter.toQueryString(['select', 'format']);
                return [2 /*return*/, this.fetchAsJson(apiUrl, queryString)];
            });
        });
    };
    /**
     * Search for subsystems
     * route: /systems
     * @param {SystemFilter} [systemFilter= new SystemFilter()] - the system filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<System>>} - A collection of System
     */
    System.prototype.searchSubSystems = function (systemFilter, pageSize) {
        if (systemFilter === void 0) { systemFilter = new SystemFilter(); }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Collection(this.baseUrl() + API.systems.search, systemFilter, pageSize, this.sweApiFetchSystemParser)];
            });
        });
    };
    /**
     * List or search output datastreams of the selected system. Individual datastreams can be retrieved by ID directly on the root "datastreams" collection.
     * route: /systems/{sysid}/datastreams
     * @param {DataStreamFilter} [dataStreamFilter=new DataStreamFilter()] - default DataStream filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<DataStream>>}  - A collection of DataStream
     */
    System.prototype.searchDataStreams = function (dataStreamFilter, pageSize) {
        if (dataStreamFilter === void 0) { dataStreamFilter = new DataStreamFilter(); }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Collection(this.baseUrl() + API.systems.datastreams.replace('{sysid}', this.properties.id), dataStreamFilter, pageSize, this.sweApiDataStreamParser)];
            });
        });
    };
    /**
     * List or search features of interest of a system. Individual features can be retrieved by ID directly on the root "featuresOfInterest" collection
     * route: /systems/{sysid}/featuresOfInterest
     * @param {FeatureOfInterestFilter} [featureOfInterestFilter=new FeatureOfInterestFilter()] - FOI filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<FeatureOfInterest>>} - A collection of FeatureOfInterest
     */
    System.prototype.searchFeaturesOfInterest = function (featureOfInterestFilter, pageSize) {
        if (featureOfInterestFilter === void 0) { featureOfInterestFilter = new FeatureOfInterestFilter(); }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Collection(this.baseUrl() + API.systems.fois.replace('{sysid}', this.properties.id), featureOfInterestFilter, pageSize, this.sweApiFetchFeatureOfInterestParser)];
            });
        });
    };
    /**
     * Get a list of control interfaces of a system
     * route: /systems/{sysid}/controls
     * @param {ControlFilter} [controlFilter=new ControlFilter()] - the control filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<Control>>} - A collection of Control
     */
    System.prototype.searchControls = function (controlFilter, pageSize) {
        if (controlFilter === void 0) { controlFilter = new ControlFilter(); }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Collection(this.baseUrl() + API.systems.controls.replace('{sysid}', this.properties.id), controlFilter, pageSize, this.sweApiFetchControlParser)];
            });
        });
    };
    /**
     * Get a specific control interface description by ID
     * route: /systems/{sysid}/controls/{dsid}
     * @param {String} datastreamId - The ID of the datastream or command stream
     * @param {ControlFilter} [controlFilter= new ControlFilter()] - the control filter
     * @return {Control} - The corresponding Control
     */
    System.prototype.getControlById = function (datastreamId, controlFilter) {
        if (controlFilter === void 0) { controlFilter = new ControlFilter(); }
        return __awaiter(this, void 0, void 0, function () {
            var apiUrl, queryString, jsonData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = API.systems.control_by_id.replace('{sysid}', this.properties.id).replace('{dsid}', datastreamId);
                        queryString = controlFilter.toQueryString(['select', 'format']);
                        return [4 /*yield*/, this.fetchAsJson(apiUrl, queryString)];
                    case 1:
                        jsonData = _a.sent();
                        return [2 /*return*/, this.sweApiFetchControlParser.parseData(jsonData)];
                }
            });
        });
    };
    /**
     * List or search events related to a system (e.g. maintenance events, contact change, etc.)
     * route: /systems/{sysid}/events
     * @param {EventFilter} [eventFilter= new EventFilter()] - the event filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<Event>>} - A collection of Event
     */
    System.prototype.searchEvents = function (eventFilter, pageSize) {
        if (eventFilter === void 0) { eventFilter = new EventFilter(); }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Collection(this.baseUrl() + API.systems.events.replace('{sysid}', this.properties.id), eventFilter, pageSize, this.sweApiFetchEventParser)];
            });
        });
    };
    /**
     * List or search for historical descriptions of a specific system (ordered by time of validity)
     * route: /systems/{sysid}/history
     * @param {SystemHistoryFilter} [systemHistoryFilter= new SystemHistoryFilter()] - the history filer
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<System>>} - A collection of System
     */
    System.prototype.searchHistory = function (systemHistoryFilter, pageSize) {
        if (systemHistoryFilter === void 0) { systemHistoryFilter = new SystemHistoryFilter(); }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Collection(this.baseUrl() + API.systems.history.replace('{sysid}', this.properties.id), systemHistoryFilter, pageSize, this.sweApiFetchSystemParser)];
            });
        });
    };
    /**
     * List or search members of a system group. Individual members can be retrieved by ID directly on the root "systems" collection
     * route: /systems/{sysid}/members
     * @param {SystemFilter} [systemFilter=new SystemFilter()] - the system filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<System>>} - A collection of System
     */
    System.prototype.searchMembers = function (systemFilter, pageSize) {
        if (systemFilter === void 0) { systemFilter = new SystemFilter(); }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Collection(this.baseUrl() + API.systems.members.replace('{sysid}', this.properties.id), systemFilter, pageSize, this.sweApiFetchSystemParser)];
            });
        });
    };
    return System;
}(SensorWebApi));
export default System;
//# sourceMappingURL=System.js.map