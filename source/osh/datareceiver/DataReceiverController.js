/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import {isDefined} from '../utils/Utils.js';
import EventManager from '../events/EventManager.js';
import DataSynchronizer from "../datasynchronizer/DataSynchronizer.js";

/**
 * This class is responsible of handling datasources. It observes necessary events to manage datasources.
 * @listens {@link CONNECT_DATASOURCE}
 * @listens {@link DISCONNECT_DATASOURCE}
 * @listens {@link DATASOURCE_UPDATE_TIME}
 * @example
 *import DataReceiverController from 'osh/datareceiver/DataReceiverController.js';
 *
 * let datasource = new <>
 *
 * // creates controller
 * let dataProviderController = new DataReceiverController({
 *   replayFactor : replayFactor
 * });
 *
 * // adds datasource to controller
 * dataProviderController.addDataSource(weatherDataSource);
 *
 * // and/or adds entity to controller
 * let entity = new Entity("Some entity", [datasource])
 *
 * dataProviderController.addEntity(entity);
 *
 */
class DataReceiverController {
    /**
     * Creates the DataReceiverController
     * @param {Object} options -
     */
    constructor(options) {
        this.options = options;
        this.dataSynchronizer = new DataSynchronizer(this.options);
        this.dataSourcesIdToDataSources = {};

        if(isDefined(options.dataSources)) {
            for(let ds of options.dataSources) {
                this.addDataSource(ds);
            }
        }
        /*
        * @event {@link CONNECT_DATASOURCE}
        * @type {Object}
        * @property {Object} event - Is notified when a dataSource has to be connected
        * @property {Object} event.dataSourcesId - The datasource id
        */
        // observe CONNECT event and connect dataSources consequently

        let that = this;
        EventManager.observe(EventManager.EVENT.CONNECT_DATASOURCE, (event) => {
            let eventDataSourcesIds = event.dataSourcesId;
            for (let i = 0; i < eventDataSourcesIds.length; i++) {
                let id = eventDataSourcesIds[i];
                if (id in that.dataSourcesIdToDataSources) {
                    //TODO: how to handle that with new DataSynchronizer??
                    // if sync to master to time, request data starting at current time
                    // if (that.dataSourcesIdToDataSources[id].syncMasterTime && isDefined(that.dataSynchronizer.currentTime)) {
                    //     that.updateDataSourceTime(id, new Date(that.dataSynchronizer.currentTime).toISOString());
                    // }
                    that.dataSourcesIdToDataSources[id].connect();
                }
            }
        });

        /*
         * @event {@link DISCONNECT_DATASOURCE}
         * @type {Object}
         * @property {Object} event - Is notified when a dataSource has to be disconnected
         * @property {Object} event.dataSourcesId - The datasource id
         */
        // observe DISCONNECT event and disconnect dataSources consequently
        EventManager.observe(EventManager.EVENT.DISCONNECT_DATASOURCE, (event) => {
            let eventDataSourcesIds = event.dataSourcesId;
            for (let i = 0; i < eventDataSourcesIds.length; i++) {
                let id = eventDataSourcesIds[i];
                if (id in that.dataSourcesIdToDataSources) {
                    that.dataSourcesIdToDataSources[id].disconnect();
                }
            }
        });


        /*
         * @event {@link DATASOURCE_UPDATE_TIME}
         * @type {Object}
         * @property {Object} event - Is notified when the datasource has to be updated
         * @property {Object} event.startTime - The corresponding new start time
         * @property {Object} event.endTime - The corresponding new end time
         */
        EventManager.observe(EventManager.EVENT.DATASOURCE_UPDATE_TIME, (event) => {

            let dataSourcesToReconnect = [];

            // disconnect all synchronized datasources
            for (let id in that.dataSourcesIdToDataSources) {
                let dataSrc = that.dataSourcesIdToDataSources[id];
                if (dataSrc.syncMasterTime && dataSrc.connected) {
                    dataSrc.disconnect();
                    dataSourcesToReconnect.push(id);
                }
            }

            // reset dataSynchronizer current time
            that.dataSynchronizer.currentTime = Date.parse(event.startTime);

            // reconnect all synchronized datasources with new time parameters
            for (let i = 0; i < dataSourcesToReconnect.length; i++) {
                let id = dataSourcesToReconnect[i];
                let dataSrc = this.dataSourcesIdToDataSources[id];
                that.updateDataSourceTime(id, event.startTime, event.endTime);
                dataSrc.connect();
            }

        });
    }

    /**
     * Updates the datasource time range.
     * @param {String} id - the datasource id
     * @param {Number} startTime - the start time
     * @param {Number} endTime - the end time
     */
    updateDataSourceTime(id, startTime, endTime) {
        // get current parameters
        let dataSource = this.dataSourcesIdToDataSources[id];
        let props = dataSource.properties;
        let options = dataSource.options;

        // update start/end time
        if (isDefined(startTime)) {
            props.startTime = startTime;
        }

        if (isDefined(endTime)) {
            props.endTime = endTime;
        }

        // reset parameters
        dataSource.initDataSource(props, options);
    }


    /**
     * Adds an entity to the current list of datasources and pushes it into the dataSynchronizer.
     * @see {@link Buffer}
     * @param {Entity} entity - the entity to add
     */
    addEntity(entity) {
        for (let i = 0; i < entity.getDataSources().length; i++) {
            this.addDataSource(entity.getDataSources()[i]);
        }
    }

    /**
     * Adds a dataSource to the current list of datasources and pushes it into the dataSynchronizer.
     * @see {@link Buffer}
     * @param {Object} dataSource - the datasource to add
     */
    addDataSource(dataSource) {
        this.dataSourcesIdToDataSources[dataSource.id] = dataSource;
        this.dataSynchronizer.addDataSource(dataSource);
    }

    /**
     * Connects each dataSources
     */
    connectAll() {
        for (let id in this.dataSourcesIdToDataSources) {
            this.dataSourcesIdToDataSources[id].connect();
        }
    }

    /**
     * Connects a specific dataSource
     * @param {String} dataSourceId - the id of the dataSource to connect
     */
    connect(dataSourceId) {
        if (id in this.dataSourcesIdToDataSources) {
            this.dataSourcesIdToDataSources[id].connect();
        }
    }

    /**
     * Disconnects a specific dataSource
     * @param {String} dataSourceId - the id of the dataSource to disconnect
     */
    disconnect(dataSourceId) {
        if (id in this.dataSourcesIdToDataSources) {
            this.dataSourcesIdToDataSources[id].disconnect();
        }
    }
}

export default DataReceiverController;
