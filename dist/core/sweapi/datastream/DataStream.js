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
import SensorWebApi from "../SensorWebApi";
import ObservationFilter from "../observation/ObservationFilter";
import API from "../routes.conf";
import DataStreamFilter from "./DataStreamFilter";
import ObservationsCollection from "../ObservationsCollection";
import SweApiResultParser from "../../parsers/sweapi/observations/SweApiResult.datastream.parser";
import SweApiResultCollectionDatastreamParser from "../../parsers/sweapi/observations/SweApiResult.collection.datastream.parser";
var DataStream = /** @class */ (function (_super) {
    __extends(DataStream, _super);
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
    function DataStream(properties, networkProperties) {
        var _this = _super.call(this, networkProperties) || this;
        _this.properties = properties;
        _this.sweApiResultParser = new SweApiResultParser(_this);
        _this.sweApiResultCollectionDatastreamParser = new SweApiResultCollectionDatastreamParser(_this);
        return _this;
    }
    /**
     * Retrieve historical observations from a datastream
     * route: /datastreams/{id}/observations
     * @param {ObservationFilter} [observationFilter=new ObservationFilter()] - default ObservationFilter
     * @param {Function} callback - A callback to get observations
     */
    DataStream.prototype.streamObservations = function (observationFilter, callback) {
        var _this = this;
        if (observationFilter === void 0) { observationFilter = new ObservationFilter(); }
        if (callback === void 0) { callback = function () { }; }
        this.stream().onMessage = function (message) { return __awaiter(_this, void 0, void 0, function () {
            var dataBlock;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sweApiResultParser.parseDataBlock(message, observationFilter.props.format)];
                    case 1:
                        dataBlock = _a.sent();
                        callback(dataBlock);
                        return [2 /*return*/];
                }
            });
        }); };
        return this.stream().doRequest(API.datastreams.observations.replace('{id}', this.properties.id), observationFilter.toQueryString([], ['phenomenonTime']), 'arraybuffer');
    };
    /**
     * Retrieve historical observations from a datastream
     * route: /datastreams/{id}/observations
     * @param {ObservationFilter} [observationFilter=new ObservationFilter()] - default ObservationFilter
     * @param {Number} [pageSize=10] - default page size
     * @param {DataSourceParser} [parser=new SweApiResultParser()] - default observations parser
     * @return {Collection<JSON>} - result observations as JSON
     */
    DataStream.prototype.searchObservations = function (observationFilter, pageSize, parser) {
        if (observationFilter === void 0) { observationFilter = new ObservationFilter(); }
        if (pageSize === void 0) { pageSize = 10; }
        if (parser === void 0) { parser = this.sweApiResultParser; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new ObservationsCollection(this.baseUrl() + API.datastreams.observations.replace('{id}', this.properties.id), observationFilter, pageSize, this.sweApiResultCollectionDatastreamParser)];
            });
        });
    };
    /**
     * Get the schema of a datastream
     * route: /datastreams/{id}/schema
     * @param {DataStreamFilter} [dataStreamFilter=new DataStreamFilter()] - default datastream filter
     * @return {Promise<JSON>} - the JSON schema
     */
    DataStream.prototype.getSchema = function (dataStreamFilter) {
        if (dataStreamFilter === void 0) { dataStreamFilter = new DataStreamFilter(); }
        return __awaiter(this, void 0, void 0, function () {
            var apiUrl, queryString;
            return __generator(this, function (_a) {
                apiUrl = API.datastreams.schema.replace('{id}', this.properties.id);
                queryString = dataStreamFilter.toQueryString(['select', 'obsFormat']);
                return [2 /*return*/, this.fetchAsJson(apiUrl, queryString)];
            });
        });
    };
    return DataStream;
}(SensorWebApi));
export default DataStream;
//# sourceMappingURL=DataStream.js.map