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
import FeatureOfInterestFilter from "./FeatureOfInterestFilter";
import SensorWebApi from "../SensorWebApi";
import Collection from "../Collection";
import API from "../routes.conf";
import SweCollectionDataParser from "../../parsers/sweapi/collection/SweCollectionDataParser";
var FeaturesOfInterest = /** @class */ (function (_super) {
    __extends(FeaturesOfInterest, _super);
    /**
     * @param {Object} [networkProperties={}]
     * @param {String} networkProperties.endpointUrl - defines the Http(s) endpoint URL
     * @param {Boolean} networkProperties.tls - defines is use Http or Https secure protocol for fetching data
     * @param {String} [networkProperties.streamProtocol='ws'] - the Stream protocol to use: 'ws' pr 'mqtt'
     * @param {Object} [networkProperties.mqttOpts={}] - the Mqtt options if stream protocol is 'mqtt'
     * @param {String} networkProperties.mqttOpts.prefix - the Mqtt prefix value
     * @param {String} networkProperties.mqttOpts.endpointUrl - the Mqtt specific endpointUrl
     */
    function FeaturesOfInterest(networkProperties) {
        var _this = _super.call(this, networkProperties) || this;
        _this.sweCollectionDataParser = new SweCollectionDataParser(networkProperties);
        return _this;
    }
    /**
     * List or search all sampled and sampling features available through this API. By default, only top level features
     * and collections are listed (i.e. nested members of feature collections are ommitted) unless the "parent" query parameter is set.
     * route: /featuresOfInterest
     * @param {FeatureOfInterestFilter} [featureOfInterestFilter=new FeatureOfInterestFilter()] - default FOI filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<FeaturesOfInterest>>} - A Collection of FeaturesOfInterest
     */
    FeaturesOfInterest.prototype.searchFeaturesOfInterest = function (featureOfInterestFilter, pageSize) {
        if (featureOfInterestFilter === void 0) { featureOfInterestFilter = new FeatureOfInterestFilter(); }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Collection(this.baseUrl() + API.fois, featureOfInterestFilter, pageSize, this.sweCollectionDataParser)];
            });
        });
    };
    /**
     * Get a specific feature resource by ID. Note that this will return the description of the feature valid at the current time.
     * To get the description valid for a past (or future) time, use the "history" sub-collection.
     * route: /featuresOfInterest/{id}
     * @param {String} fId - The ID of the Feature resource
     * @param {FeatureOfInterestFilter} [featureOfInterestFilter=new FeatureOfInterestFilter()] - default FOI filter
     * @return {Promise<JSON>} - The corresponding FeaturesOfInterest as JSON
     */
    FeaturesOfInterest.prototype.getFeatureOfInterestById = function (fId, featureOfInterestFilter) {
        if (featureOfInterestFilter === void 0) { featureOfInterestFilter = new FeatureOfInterestFilter(); }
        return __awaiter(this, void 0, void 0, function () {
            var apiUrl, queryString;
            return __generator(this, function (_a) {
                apiUrl = API.fois.by_id.replace('{id}', fId);
                queryString = featureOfInterestFilter.toQueryString(['select', 'format']);
                return [2 /*return*/, this.fetchAsJson(apiUrl, queryString)];
            });
        });
    };
    return FeaturesOfInterest;
}(SensorWebApi));
export default FeaturesOfInterest;
//# sourceMappingURL=FeatureOfInterests.js.map