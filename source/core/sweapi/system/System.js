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
import SweApiFetchSystemParser from "../../datasource/sweapi/parser/collection/SweApiFetchSystem.parser";
import DataStreamFilter from "../datastream/DataStreamFilter";
import SweApiDataStreamParser from "../../datasource/sweapi/parser/collection/SweApiDataStream.parser";
import FeatureOfInterestFilter from "../featureofinterest/FeatureOfInterestFilter";
import SweApiFetchFeatureOfInterestParser  from "../../datasource/sweapi/parser/collection/SweApiFetchFeatureOfInterest.parser";
import API from "../routes.conf";
import ControlFilter from "../control/ControlFilter";
import SweApiFetchControlParser from "../../datasource/sweapi/parser/collection/SweApiFetchControl.parser";
import EventFilter from "../event/EventFilter";
import SystemHistoryFilter from "../history/SystemHistoryFilter";
import SweApiFetchEventParser from "../../datasource/sweapi/parser/collection/SweApiFetchEvent.parser";

class System extends SensorWebApi {

    constructor(properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        this.systemParser = new SweApiFetchSystemParser(networkProperties);
        this.dataStreamParser = new SweApiDataStreamParser(networkProperties);
        this.featureOfInterestParser = new SweApiFetchFeatureOfInterestParser(networkProperties);
        this.eventParser = new SweApiFetchEventParser(networkProperties);
        this.controlParser = new SweApiFetchControlParser(networkProperties);
    }

    /**
     * Get the latest specsheet of a system
     * @param {SystemFilter} systemFilter - the system filter
     * @return Promise<JSON> - SensorlML Description
     */
    async getDetails(systemFilter = new SystemFilter()) {
        const apiUrl = API.systems.details.replace('{sysid}',this.properties.id);
        const queryString = systemFilter.toQueryString(['select', 'format']);
        return this.fetchAsJson(apiUrl, queryString);
    }

    /**
     *
     * @param {SystemFilter} systemFilter - the system filter
     * @param pageSize
     * @return Promise<Collection<System>>
     */
    async searchSubSystems(systemFilter = new SystemFilter(), pageSize = 10) {
        return new Collection(this.baseUrl() + API.systems.search, systemFilter, pageSize, this.systemParser);
    }

    /**
     * List or search output datastreams of the selected system. Individual datastreams can be retrieved by ID directly on the root "datastreams" collection.     * @param dataStreamFilter
     * @param dataStreamFilter
     * @param pageSize
     * @return {Promise<Collection>}
     */
    async searchDataStreams(dataStreamFilter = new DataStreamFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.datastreams.replace('{sysid}',this.properties.id),
            dataStreamFilter,
            pageSize,
            this.dataStreamParser
        );
    }

    /**
     * List or search features of interest of a system. Individual features can be retrieved by ID directly on the root "featuresOfInterest" collection
     * @param featureOfInterestFilter
     * @param pageSize
     * @return {Promise<Collection>}
     */
    async searchFeaturesOfInterest(featureOfInterestFilter = new FeatureOfInterestFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.fois.replace('{sysid}',this.properties.id),
            featureOfInterestFilter,
            pageSize,
            this.featureOfInterestParser
        );
    }

    /**
     * Get a list of control interfaces of a system
     * @param {ControlFilter} controlFilter - the control filter
     * @param pageSize
     * @return {Promise<Collection<Control>>}
     */
    async searchControls(controlFilter = new ControlFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.controls.replace('{sysid}',this.properties.id),
            controlFilter,
            pageSize,
            this.controlParser
        );
    }

    /**
     * Get a specific control interface description by ID
     * @param {String} datastreamId - The ID of the datastream or command stream
     * @param {ControlFilter} controlFilter - the control filter
     * @return {Promise<Control>}
     */
    async getControlById(datastreamId,controlFilter = new ControlFilter()) {
        const apiUrl = API.systems.control_by_id.replace('{sysid}',this.properties.id).replace('{dsid}', datastreamId);
        const queryString = controlFilter.toQueryString(['select', 'format']);
        const jsonData = await this.fetchAsJson(apiUrl, queryString);
        return this.controlParser.parseData(jsonData);
    }

    /**
     * List or search events related to a system (e.g. maintenance events, contact change, etc.)
     * @param {EventFilter} eventFilter - the event filter
     * @param pageSize - the page size
     * @return {Promise<Collection<Event>>}
     */
    async searchEvents(eventFilter = new EventFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.events.replace('{sysid}',this.properties.id),
            eventFilter,
            pageSize,
            this.eventParser
        );
    }

    /**
     * List or search for historical descriptions of a specific system (ordered by time of validity)
     * @param {SystemHistoryFilter} systemHistoryFilter - the history filer
     * @param [pageSize=10] - the page size
     * @return {Promise<Collection<System>>}
     */
    async searchHistory(systemHistoryFilter = new SystemHistoryFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.history.replace('{sysid}',this.properties.id),
            systemHistoryFilter,
            pageSize,
            this.systemParser
        );
    }

    /**
     * List or search members of a system group. Individual members can be retrieved by ID directly on the root "systems" collection
     * @param {SystemFilter} systemFilter - the system filter
     * @param pageSize - the page size
     * @return {Promise<Collection<System>>}
     */
    async searchMembers(systemFilter = new SystemFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.systems.members.replace('{sysid}',this.properties.id),
            systemFilter,
            pageSize,
            this.systemParser
        );
    }
}

export default System;
