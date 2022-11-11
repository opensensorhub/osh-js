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

import FeatureOfInterestFilter from "./FeatureOfInterestFilter";
import SensorWebApi from "../SensorWebApi";
import Collection from "../Collection";
import API from "../routes.conf";
import SweCollectionDataParser from "../../parsers/sweapi/collection/SweCollectionDataParser";

class FeaturesOfInterest extends SensorWebApi {
    /**
     * @param {Object} [networkProperties={}]
     * @param {String} networkProperties.endpointUrl - defines the Http(s) endpoint URL
     * @param {Boolean} networkProperties.tls - defines is use Http or Https secure protocol for fetching data
     * @param {String} [networkProperties.streamProtocol='ws'] - the Stream protocol to use: 'ws' pr 'mqtt'
     * @param {Object} [networkProperties.mqttOpts={}] - the Mqtt options if stream protocol is 'mqtt'
     * @param {String} networkProperties.mqttOpts.prefix - the Mqtt prefix value
     * @param {String} networkProperties.mqttOpts.endpointUrl - the Mqtt specific endpointUrl
     */
    constructor(networkProperties) {
        super(networkProperties);
        this.sweCollectionDataParser = new SweCollectionDataParser(networkProperties);
    }

    /**
     * List or search all sampled and sampling features available through this API. By default, only top level features
     * and collections are listed (i.e. nested members of feature collections are ommitted) unless the "parent" query parameter is set.
     * route: /featuresOfInterest
     * @param {FeatureOfInterestFilter} [featureOfInterestFilter=new FeatureOfInterestFilter()] - default FOI filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<FeaturesOfInterest>>} - A Collection of FeaturesOfInterest
     */
    async searchFeaturesOfInterest(featureOfInterestFilter = new FeatureOfInterestFilter(), pageSize= 10) {
        return new Collection(this.baseUrl() + API.fois, featureOfInterestFilter, pageSize,this.sweCollectionDataParser);
    }

    /**
     * Get a specific feature resource by ID. Note that this will return the description of the feature valid at the current time.
     * To get the description valid for a past (or future) time, use the "history" sub-collection.
     * route: /featuresOfInterest/{id}
     * @param {String} fId - The ID of the Feature resource
     * @param {FeatureOfInterestFilter} [featureOfInterestFilter=new FeatureOfInterestFilter()] - default FOI filter
     * @return {Promise<JSON>} - The corresponding FeaturesOfInterest as JSON
     */
    async getFeatureOfInterestById(fId,featureOfInterestFilter = new FeatureOfInterestFilter()) {
        const apiUrl = API.fois.by_id.replace('{id}',fId);
        const queryString = featureOfInterestFilter.toQueryString(['select', 'format']);
        return this.fetchAsJson(apiUrl, queryString);
    }
}
export default FeaturesOfInterest;
