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

class System extends SensorWebApi {
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
    constructor(properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        this.sweApiFetchSystemParser = new SweApiFetchSystemParser(networkProperties);
        this.sweApiDataStreamParser = new SweApiDataStreamParser(networkProperties);
        this.sweApiFetchFeatureOfInterestParser = new SweApiFetchFeatureOfInterestParser(networkProperties);
        this.sweApiFetchEventParser = new SweApiFetchEventParser(networkProperties);
        this.sweApiFetchControlParser = new SweApiFetchControlParser(networkProperties);
    }

    /**
     * Get the latest specsheet of a system
     * route: /systems/{sysid}/details
     * @param {SystemFilter} [systemFilter=new SystemFilter()] - the system filter
     * @return {Promise<JSON>} - SensorlML Description
     */
    async getDetails(systemFilter = new SystemFilter()) {
        const apiUrl = API.systems.details.replace('{sysid}',this.properties.id);
        const queryString = systemFilter.toQueryString(['select', 'format']);
        return this.fetchAsJson(apiUrl, queryString);
    }

    /**
     * Search for subsystems
     * route: /systems
     * @param {SystemFilter} [systemFilter= new SystemFilter()] - the system filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<System>>} - A collection of System
     */
    async searchSubSystems(systemFilter = new SystemFilter(), pageSize = 10) {
        return new Collection(this.baseUrl() + API.systems.search, systemFilter, pageSize, this.sweApiFetchSystemParser);
    }

    /**
     * List or search output datastreams of the selected system. Individual datastreams can be retrieved by ID directly on the root "datastreams" collection.
     * route: /systems/{sysid}/datastreams
     * @param {DataStreamFilter} [dataStreamFilter=new DataStreamFilter()] - default DataStream filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<DataStream>>}  - A collection of DataStream
     */
    async searchDataStreams(dataStreamFilter = new DataStreamFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.datastreams.replace('{sysid}',this.properties.id),
            dataStreamFilter,
            pageSize,
            this.sweApiDataStreamParser
        );
    }

    /**
     * List or search features of interest of a system. Individual features can be retrieved by ID directly on the root "featuresOfInterest" collection
     * route: /systems/{sysid}/featuresOfInterest
     * @param {FeatureOfInterestFilter} [featureOfInterestFilter=new FeatureOfInterestFilter()] - FOI filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<FeatureOfInterest>>} - A collection of FeatureOfInterest
     */
    async searchFeaturesOfInterest(featureOfInterestFilter = new FeatureOfInterestFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.fois.replace('{sysid}',this.properties.id),
            featureOfInterestFilter,
            pageSize,
            this.sweApiFetchFeatureOfInterestParser
        );
    }

    /**
     * Get a list of control interfaces of a system
     * route: /systems/{sysid}/controls
     * @param {ControlFilter} [controlFilter=new ControlFilter()] - the control filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<Control>>} - A collection of Control
     */
    async searchControls(controlFilter = new ControlFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.controls.replace('{sysid}',this.properties.id),
            controlFilter,
            pageSize,
            this.sweApiFetchControlParser
        );
    }

    /**
     * Get a specific control interface description by ID
     * route: /systems/{sysid}/controls/{dsid}
     * @param {String} datastreamId - The ID of the datastream or command stream
     * @param {ControlFilter} [controlFilter= new ControlFilter()] - the control filter
     * @return {Control} - The corresponding Control
     */
    async getControlById(datastreamId,controlFilter = new ControlFilter()) {
        const apiUrl = API.systems.control_by_id.replace('{sysid}',this.properties.id).replace('{dsid}', datastreamId);
        const queryString = controlFilter.toQueryString(['select', 'format']);
        const jsonData = await this.fetchAsJson(apiUrl, queryString);
        return this.sweApiFetchControlParser.parseData(jsonData);
    }

    /**
     * List or search events related to a system (e.g. maintenance events, contact change, etc.)
     * route: /systems/{sysid}/events
     * @param {EventFilter} [eventFilter= new EventFilter()] - the event filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<Event>>} - A collection of Event
     */
    async searchEvents(eventFilter = new EventFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.events.replace('{sysid}',this.properties.id),
            eventFilter,
            pageSize,
            this.sweApiFetchEventParser
        );
    }

    /**
     * List or search for historical descriptions of a specific system (ordered by time of validity)
     * route: /systems/{sysid}/history
     * @param {SystemHistoryFilter} [systemHistoryFilter= new SystemHistoryFilter()] - the history filer
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<System>>} - A collection of System
     */
    async searchHistory(systemHistoryFilter = new SystemHistoryFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.history.replace('{sysid}',this.properties.id),
            systemHistoryFilter,
            pageSize,
            this.sweApiFetchSystemParser
        );
    }

    /**
     * List or search members of a system group. Individual members can be retrieved by ID directly on the root "systems" collection
     * route: /systems/{sysid}/members
     * @param {SystemFilter} [systemFilter=new SystemFilter()] - the system filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<System>>} - A collection of System
     */
    async searchMembers(systemFilter = new SystemFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.members.replace('{sysid}',this.properties.id),
            systemFilter,
            pageSize,
            this.sweApiFetchSystemParser
        );
    }
}

export default System;
