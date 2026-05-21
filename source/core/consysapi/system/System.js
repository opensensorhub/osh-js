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
import ConnectedSystemsApi from "../ConnectedSystemsApi";
import Collection from "../Collection";
import DataStreamFilter from "../datastream/DataStreamFilter";
import SamplingFeatureFilter from "../samplingfeature/SamplingFeatureFilter";
import API from "../routes.conf";
import ControlStreamFilter from "../controlstream/ControlStreamFilter";
import EventFilter from "../event/EventFilter";
import SystemHistoryFilter from "../history/SystemHistoryFilter";
import ConSysApiFetchSystemParser from "../../parsers/consysapi/collection/ConSysApiFetchSystem.parser";
import ConSysApiDataStreamParser from "../../parsers/consysapi/collection/ConSysApiDataStream.parser";
import ConSysApiFetchSamplingFeatureParser from "../../parsers/consysapi/collection/ConSysApiFetchSamplingFeature.parser";
import ConSysApiFetchEventParser from "../../parsers/consysapi/collection/ConSysApiFetchEvent.parser";
import ConSysApiFetchControlStreamParser from "../../parsers/consysapi/collection/ConSysApiFetchControlStream.parser";

class System extends ConnectedSystemsApi {
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
        this.conSysApiFetchSystemParser = new ConSysApiFetchSystemParser(networkProperties);
        this.conSysApiDataStreamParser = new ConSysApiDataStreamParser(networkProperties);
        this.conSysApiFetchSamplingFeatureParser = new ConSysApiFetchSamplingFeatureParser(networkProperties);
        this.conSysApiFetchEventParser = new ConSysApiFetchEventParser(networkProperties);
        this.conSysApiFetchControlStreamParser = new ConSysApiFetchControlStreamParser(networkProperties);
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
     * route: /systems/{sysid}/subsystems
     * @param {SystemFilter} [systemFilter= new SystemFilter()] - the system filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<System>>} - A collection of System
     */
    async searchSubSystems(systemFilter = new SystemFilter(), pageSize = 10, pageOffset = 0) {
        return new Collection(
            this.baseUrl() + API.systems.subsystems.replace('{sysid}',this.properties.id),
            this.getHeaders(),
            systemFilter,
            pageSize,
            this.conSysApiFetchSystemParser,
            pageOffset
        );
    }

    /**
     * List or search output datastreams of the selected system. Individual datastreams can be retrieved by ID directly on the root "datastreams" collection.
     * route: /systems/{sysid}/datastreams
     * @param {DataStreamFilter} [dataStreamFilter=new DataStreamFilter()] - default DataStream filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<DataStream>>}  - A collection of DataStream
     */
    async searchDataStreams(dataStreamFilter = new DataStreamFilter(), pageSize= 10, pageOffset = 0) {
        return new Collection(
            this.baseUrl() + API.systems.datastreams.replace('{sysid}',this.properties.id),
            this.getHeaders(),
            dataStreamFilter,
            pageSize,
            this.conSysApiDataStreamParser,
            pageOffset
        );
    }

    /**
     * List or search sampling features of a system. Individual features can be retrieved by ID directly on the root "samplingFeatures" collection
     * route: /systems/{sysid}/samplingFeatures
     * @param {SamplingFeatureFilter} [samplingFeatureFilter=new SamplingFeatureFilter()] - FOI filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<SamplingFeature>>} - A collection of SamplingFeature
     */
    async searchSamplingFeatures(samplingFeatureFilter = new SamplingFeatureFilter(), pageSize= 10, pageOffset = 0) {
        return new Collection(
            this.baseUrl() + API.systems.samplingFeatures.replace('{sysid}',this.properties.id),
            this.getHeaders(),
            samplingFeatureFilter,
            pageSize,
            this.conSysApiFetchSamplingFeatureParser,
            pageOffset
        );
    }

    /**
     * Get a list of control interfaces of a system
     * route: /systems/{sysid}/controlstreams
     * @param {ControlStreamFilter} [controlStreamFilter=new ControlStreamFilter()] - the controlstream filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<ControlStream>>} - A collection of ControlStream
     */
    async searchControlStreams(controlStreamFilter = new ControlStreamFilter(), pageSize= 10, pageOffset = 0) {
        return new Collection(
            this.baseUrl() + API.systems.controlstreams.replace('{sysid}',this.properties.id),
            this.getHeaders(),
            controlStreamFilter,
            pageSize,
            this.conSysApiFetchControlStreamParser,
            pageOffset
        );
    }

    /**
     * Get a specific control interface description by ID
     * route: /systems/{sysid}/controlstreams/{dsid}
     * @param {String} controlstreamId - The ID of the control stream
     * @param {ControlStreamFilter} [controlStreamFilter= new ControlStreamFilter()] - the controlstream filter
     * @return {ControlStream} - The corresponding ControlStream
     */
    async getControlStreamById(controlstreamId,controlStreamFilter = new ControlStreamFilter()) {
        const apiUrl = API.systems.controlstream_by_id.replace('{sysid}',this.properties.id).replace('{csid}', controlstreamId);
        const queryString = controlStreamFilter.toQueryString(['select', 'format']);
        const jsonData = await this.fetchAsJson(apiUrl, queryString);
        return this.conSysApiFetchControlStreamParser.parseData(jsonData);
    }

    /**
     * List or search events related to a system (e.g. maintenance events, contact change, etc.)
     * route: /systems/{sysid}/events
     * @param {EventFilter} [eventFilter= new EventFilter()] - the event filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<Event>>} - A collection of Event
     */
    async searchEvents(eventFilter = new EventFilter(), pageSize= 10, pageOffset = 0) {
        return new Collection(
            this.baseUrl() + API.systems.events.replace('{sysid}',this.properties.id),
            this.getHeaders(),
            eventFilter,
            pageSize,
            this.conSysApiFetchEventParser,
            pageOffset
        );
    }

    /**
     * List or search for historical descriptions of a specific system (ordered by time of validity)
     * route: /systems/{sysid}/history
     * @param {SystemHistoryFilter} [systemHistoryFilter= new SystemHistoryFilter()] - the history filer
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<System>>} - A collection of System
     */
    async searchHistory(systemHistoryFilter = new SystemHistoryFilter(), pageSize= 10, pageOffset = 0) {
        return new Collection(
            this.baseUrl() + API.systems.history.replace('{sysid}',this.properties.id),
            this.getHeaders(),
            systemHistoryFilter,
            pageSize,
            this.conSysApiFetchSystemParser,
            pageOffset
        );
    }

    /**
     * List or search members of a system group. Individual members can be retrieved by ID directly on the root "systems" collection
     * route: /systems/{sysid}/members
     * @param {SystemFilter} [systemFilter=new SystemFilter()] - the system filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<System>>} - A collection of System
     */
    async searchMembers(systemFilter = new SystemFilter(), pageSize= 10, pageOffset = 0) {
        return new Collection(
            this.baseUrl() + API.systems.members.replace('{sysid}',this.properties.id),
            this.getHeaders(),
            systemFilter,
            pageSize,
            this.conSysApiFetchSystemParser,
            pageOffset
        );
    }
}

export default System;
