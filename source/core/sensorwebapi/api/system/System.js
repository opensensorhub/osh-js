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

import SystemFilter from "./SystemFilter";
import SensorWebApi from "../SensorWebApi";
import Collection from "../Collection";
import SensorWebApiFetchSystemParser from "../../../datasource/parsers/SensorWebApiFetchSystem.parser";
import DataStreamFilter from "../datastream/DataStreamFilter";
import SensorWebApiDataStreamParser from "../../../datasource/parsers/SensorWebApiDataStream.parser";
import FeatureOfInterestFilter from "../featureofinterest/FeatureOfInterestFilter";
import SensorWebApiFetchFeatureOfInterestParser  from "../../../datasource/parsers/SensorWebApiFetchFeatureOfInterest.parser";
import API from "../routes.conf";

class System extends SensorWebApi {

    constructor(properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        this.systemParser = new SensorWebApiFetchSystemParser(networkProperties);
        this.dataStreamParser = new SensorWebApiDataStreamParser(networkProperties);
        this.featureOfInterestParser = new SensorWebApiFetchFeatureOfInterestParser(networkProperties);
    }

    /**
     * @param {SystemFilter} systemFilter - the system filter
     * @return Promise<JSON> - SensorlML Description
     */
    async getDetails(systemFilter = new SystemFilter()) {
        return this._network.info.connector.doRequest(
            API.systems.details.replace('{id}',this.properties.id),
            systemFilter.toQueryString(['select', 'format'])
        );
    }

    /**
     *
     * @param {SystemFilter} systemFilter - the system filter
     * @param pageSize
     * @return Promise<Collection<System>>
     */
    async searchSubSystems(systemFilter = new SystemFilter(), pageSize = 10) {
        systemFilter.props.parent = this.properties.id;
        return new Collection(API.systems.search, systemFilter.toQueryString(), pageSize, this.systemParser, this._network.info.connector);
    }

    /**
     *
     * @returns {Collection<DataStream>} A collection of System
     */
    async searchDataStreams(dataStreamFilter = new DataStreamFilter(), pageSize= 10) {
        return new Collection(
            API.systems.datastreams.replace('{id}',this.properties.id),
            dataStreamFilter.toQueryString(), pageSize,this.dataStreamParser, this._network.info.connector);
    }

    /**
     *
     * @returns {Collection<FeatureOfInterest>} A collection of FeatureOfInterest
     */
    async searchFeaturesOfInterest(featureOfInterestFilter = new FeatureOfInterestFilter(), pageSize= 10) {
        return new Collection(
            API.systems.fois.replace('{id}',this.properties.id),
            pageSize,this.featureOfInterestParser, this._network.info.connector);
    }
}

export default System;
