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

import SensorWebApi from "./SensorWebApi";
import Collection from "./Collection";
import SensorWebApiFetchDataStreamParser from "../../../datasource/parsers/SensorWebApiFetchDataStream.parser";
import DataStreamFilter from "./DataStreamFilter";
import SystemFilter from "../system/SystemFilter";
import FeatureOfInterestFilter from "./FeatureOfInterestFilter";

class FeaturesOfInterest extends SensorWebApi {
    /**
     *
     */
    constructor(networkProperties) {
        super(networkProperties);
        this.parser = new SensorWebApiFetchDataStreamParser(networkProperties);
    }

    /**
     *
     * @returns {Collection<FeaturesOfInterest>} A collection of FeatureOfInterest
     */
    async searchFeaturesOfInterest(featureOfInterestFilter = new FeatureOfInterestFilter(), pageSize) {
        return new Collection('/featuresOfInterest', featureOfInterestFilter.toQueryString(), pageSize,this.parser, this._network.info.connector);
    }

    async getFeatureOfInterestById(fId,featureOfInterestFilter = new FeatureOfInterestFilter()) {
        const response = await this._network.info.connector.doRequest(`/featuresOfInterest/${fId}`,featureOfInterestFilter.toQueryString(['select','format']));
        return this.parser.parseData(response);
    }
}
export default FeaturesOfInterest;
