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

import SweApiDataStreamParser from "../../datasource/sweapi/parser/collection/SweApiDataStream.parser";
import FeatureOfInterestFilter from "./FeatureOfInterestFilter";
import SensorWebApi from "../SensorWebApi";
import Collection from "../Collection";
import API from "../routes.conf";
import SweCollectionDataParser from "../../datasource/sweapi/SweCollectionDataParser";

class FeaturesOfInterest extends SensorWebApi {
    /**
     *
     */
    constructor(networkProperties) {
        super(networkProperties);
        this.jsonParser = new SweCollectionDataParser(networkProperties);
    }

    /**
     * List or search all sampled and sampling features available through this API. By default, only top level features
     * and collections are listed (i.e. nested members of feature collections are ommitted) unless the "parent" query parameter is set.
     * @param featureOfInterestFilter
     * @param pageSize
     * @return {Promise<Collection>}
     */
    async searchFeaturesOfInterest(featureOfInterestFilter = new FeatureOfInterestFilter(), pageSize= 10) {
        return new Collection(this.baseUrl() + '/featuresOfInterest', featureOfInterestFilter, pageSize,this.jsonParser);
    }

    /**
     * Get a specific feature resource by ID. Note that this will return the description of the feature valid at the current time.
     * To get the description valid for a past (or future) time, use the "history" sub-collection.
     * @param fId - The ID of the Feature resource
     * @param featureOfInterestFilter
     * @return {Promise<DataStream>}
     */
    async getFeatureOfInterestById(fId,featureOfInterestFilter = new FeatureOfInterestFilter()) {
        const apiUrl = API.fois.by_id.replace('{id}',fId);
        const queryString = featureOfInterestFilter.toQueryString(['select', 'format']);
        return this.fetchAsJson(apiUrl, queryString);
    }
}
export default FeaturesOfInterest;
