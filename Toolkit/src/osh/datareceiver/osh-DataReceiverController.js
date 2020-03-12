/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This class is responsible of handling datasources. It observes necessary events to manage datasources.
 * @class OSH.DataReceiver.DataReceiverController
 * @listens {@link OSH.EventManager.EVENT.CONNECT_DATASOURCE}
 * @listens {@link OSH.EventManager.EVENT.DISCONNECT_DATASOURCE}
 * @listens {@link OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME}
 * @example
 *
 * let datasource = new OSH.DataReceiver... // creates OSH.DataReceiver.<>
 *
 * // creates controller
 * let dataProviderController = new OSH.DataReceiver.DataReceiverController({
 *   replayFactor : replayFactor
 * });
 *
 * // adds datasource to controller
 * dataProviderController.addDataSource(weatherDataSource);
 *
 * // and/or adds entity to controller
 * let entity = {
 *       id : "entity-"+OSH.Utils.randomUUID(),
 *       name: "Some entity",
 *       dataSources: [datasource]
 * };
 *
 * dataProviderController.addEntity(entity);
 *
 */
import {isDefined} from '../osh-Utils.js';
import EventManager from '../osh-EventManager.js';
import Buffer from "../osh-Buffer.js";

export default class DataReceiverController {
    constructor(options) {
        this.options = options;
        this.initBuffer();
        this.dataSourcesIdToDataSources = {};

        /*
        * @event {@link OSH.EventManager.EVENT.CONNECT_DATASOURCE}
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
                    // if sync to master to time, request data starting at current time
                    if (that.dataSourcesIdToDataSources[id].syncMasterTime) {
                        that.updateDataSourceTime(id, new Date(that.buffer.currentTime).toISOString());
                    }
                    that.dataSourcesIdToDataSources[id].connect();
                    that.buffer.startDataSource(id);
                }
            }
        });

        /*
         * @event {@link OSH.EventManager.EVENT.DISCONNECT_DATASOURCE}
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
                    that.buffer.cancelDataSource(id);
                }
            }
        });


        /*
         * @event {@link OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME}
         * @type {Object}
         * @property {Object} event - Is notified when the datasource has to be updated
         * @property {Object} event.startTime - The corresponding new start time
         * @property {Object} event.endTime - The corresponding new end time
         */
        EventManager.observe(EventManager.EVENT.DATASOURCE_UPDATE_TIME, (event) => {

            let dataSourcesToReconnect = [];

            // disconnect all synchronized datasources
            for (let id of that.dataSourcesIdToDataSources) {
                let dataSrc = that.dataSourcesIdToDataSources[id];
                if (dataSrc.syncMasterTime && dataSrc.connected) {
                    dataSrc.disconnect();
                    that.buffer.cancelDataSource(id);
                    dataSourcesToReconnect.push(id);
                }
            }

            // reset buffer current time
            that.buffer.currentTime = Date.parse(event.startTime);

            // reconnect all synchronized datasources with new time parameters
            for (let i = 0; i < dataSourcesToReconnect.length; i++) {
                let id = dataSourcesToReconnect[i];
                let dataSrc = this.dataSourcesIdToDataSources[id];
                that.updateDataSourceTime(id, event.startTime, event.endTime);
                dataSrc.connect();
                that.buffer.startDataSource(id);
            }

        });
    }

    /**
     * Updates the datasource time range.
     * @param id the datasource id
     * @param startTime the start time
     * @param endTime the end time
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
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
     * Instantiates a new OSH.Buffer {@link OSH.Buffer}
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    initBuffer() {
        this.buffer = new Buffer(this.options);
    }

    /**
     * Adds a entity to the current list of datasources and pushes it into the buffer.
     * @see {@link OSH.Buffer}
     * @param {Object} dataSource the datasource to add
     * @param options @deprecated
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    addEntity(entity, options) {
        if (isDefined(entity.dataSources)) {
            for (let i = 0; i < entity.dataSources.length; i++) {
                this.addDataSource(entity.dataSources[i], options);
            }
        }
    }

    /**
     * Adds a dataSource to the current list of datasources and pushes it into the buffer.
     * @see {@link OSH.Buffer}
     * @param {Object} dataSource the datasource to add
     * @param options @deprecated
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    addDataSource(dataSource, options) {
        this.dataSourcesIdToDataSources[dataSource.id] = dataSource;
        this.buffer.addDataSource(dataSource.id, {
            name: dataSource.name,
            syncMasterTime: dataSource.syncMasterTime,
            bufferingTime: dataSource.bufferingTime,
            timeOut: dataSource.timeOut
        });

        //TODO: make frozen letiables?
        var that = this;
        dataSource.onData = (data) => that.buffer.push({dataSourceId: dataSource.getId(), data: data});
    }

    /**
     * Connects each connector
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    connectAll() {
        this.buffer.start();
        for (let id of this.dataSourcesIdToDataSources) {
            let ds = this.dataSourcesIdToDataSources[id];
            if (ds.properties.connect) {
                ds.connect();
            }
        }
    }
}
