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

import SamplingFeatureFilter from "./SamplingFeatureFilter";
import ConnectedSystemsApi from "../ConnectedSystemsApi";
import Collection from "../Collection";
import API from "../routes.conf";
import ConSysApiFetchSamplingFeatureParser from "../../parsers/consysapi/collection/ConSysApiFetchSamplingFeature.parser";

class SamplingFeatures extends ConnectedSystemsApi {
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
        this.conSysApiFetchSamplingFeatureParser = new ConSysApiFetchSamplingFeatureParser(networkProperties);
    }

    /**
     * List or search all sampled and sampling features available through this API. By default, only top level features
     * and collections are listed (i.e. nested members of feature collections are ommitted) unless the "parent" query parameter is set.
     * route: /samplingFeatures
     * @param {SamplingFeatureFilter} [samplingFeatureFilter=new SamplingFeatureFilter()] - default SamplingFeature filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<SamplingFeatures>>} - A Collection of SamplingFeatures
     */
    async searchSamplingFeatures(samplingFeatureFilter = new SamplingFeatureFilter(), pageSize= 10, pageOffset = 0) {
        return new Collection(
            this.baseUrl() + API.samplingFeatures.search,
            this.getHeaders(),
            samplingFeatureFilter,
            pageSize,
            this.conSysApiFetchSamplingFeatureParser,
            pageOffset
        );
    }

    /**
     * Get a specific feature resource by ID. Note that this will return the description of the feature valid at the current time.
     * To get the description valid for a past (or future) time, use the "history" sub-collection.
     * route: /samplingFeatures/{id}
     * @param {String} fId - The ID of the SamplingFeature resource
     * @param {SamplingFeatureFilter} [samplingFeatureFilter=new SamplingFeatureFilter()] - default SamplingFeature filter
     * @return {Promise<SamplingFeature>} - The corresponding SamplingFeatures as JSON
     */
    async getSamplingFeatureById(fId,samplingFeatureFilter = new SamplingFeatureFilter()) {
        const apiUrl = API.samplingFeatures.by_id.replace('{id}',fId);
        const queryString = samplingFeatureFilter.toQueryString(['select', 'format']);
        const jsonData = await this.fetchAsJson(apiUrl, queryString);
        return this.conSysApiFetchSamplingFeatureParser.parseData(jsonData);
    }
}
export default SamplingFeatures;
