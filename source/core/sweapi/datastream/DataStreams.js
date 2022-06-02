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

import SensorWebApi from "../SensorWebApi";
import Collection from "../Collection";
import DataStreamFilter from "./DataStreamFilter";
import SweApiDataStreamParser from "../../datasource/sweapi/parser/collection/SweApiDataStream.parser";
import API from "../routes.conf";

class DataStreams extends SensorWebApi {
    /**
     *
     */
    constructor(networkProperties) {
        super(networkProperties);
        this.sweApiDataStreamParser = new SweApiDataStreamParser(networkProperties);
    }

    /**
     * List or search all datastreams available through this API.
     * @param {DataStreamFilter} [dataStreamFilter=new DataStreamFilter()] - default DataStream filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<DataStream>>} - A Collection of DataStream
     */
    async searchDataStreams(dataStreamFilter = new DataStreamFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.datastreams.search,
            dataStreamFilter,
            pageSize,
            this.sweApiDataStreamParser
        );
    }

    /**
     * Get a specific datastream resource by ID
     * @param {DataStreamFilter} [dataStreamFilter=new DataStreamFilter(] - default datastream filter
     * @return {Promise<DataStream>} - The corresponding DataStream
     */
    async getDataStreamById(datastreamId,dataStreamFilter = new DataStreamFilter()) {
        const apiUrl = API.datastreams.by_id.replace('{id}',datastreamId);
        const queryString = dataStreamFilter.toQueryString(['select','format']);
        const jsonData = await this.fetchAsJson(apiUrl, queryString);
        return this.sweApiDataStreamParser.parseData(jsonData);

    }
}
export default DataStreams;
