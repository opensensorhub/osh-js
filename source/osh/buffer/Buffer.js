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

/** @constant
 @type {number}
 @default
 */
const INITIAL_BUFFERING_TIME = 3000; // ms time
const MAX_LONG = Math.pow(2, 53) + 1;
/**
 * This enumeration contains the whole list of available status for a job.
 * @enum
 * @readonly
 * @type {{CANCEL: string, START: string, STOP: string, NOT_START_YET: string}}
 */
const BUFFER_STATUS = {
    CANCEL: 'cancel',
    START: 'start',
    STOP: 'stop',
    NOT_START_YET: 'notStartYet'
};

/**
 * @classdesc Represents the buffer element which is in charge of synchronizing data.
 * @class
 * @param {Object} options The options object
 * @param {Object} options.replayFactor defines the replay speed of the buffer in order to synchronize data
 * @example
 let buffer = new Buffer({
    replayFactor: 1
 });
 */
import {isDefined,randomUUID} from '../utils/Utils.js';
import EventManager from '../events/EventManager.js';

export default class Buffer {
    constructor(options) {
        this.buffers = {};

        this.replayFactor = 1;

        // update values from options
        if (isDefined(options)) {
            if (isDefined(options.replayFactor)) {
                this.replayFactor = options.replayFactor;
            }
        }

        // define buffer letiable

        // defines a status to stop the buffer after stop() calling.
        // If start() method is called, this letiable should be set to TRUE
        this.stop = false;
        this.bufferingState = false;
    }

    /**
     * Starts observing the data stream.
     * @memberof Buffer
     * @instance
     */
    startObservers() {
        this.observeId = randomUUID();
        this.boundHandlerMethod = this.push.bind(this);
        EventManager.observe(EventManager.EVENT.DATA, this.boundHandlerMethod, this.observeId);
    }

    /**
     * Stops observing the data stream.
     * @memberof Buffer
     * @instance
     */
    stopObservers() {
        if (isDefined(this.observeId) || this.observeId !== null) {
            EventManager.observe(EventManager.EVENT.DATA, this.boundHandlerMethod, this.observeId);
            this.observeId = 'undefined';
        }
    }

    /**
     * Starts the buffer and starts the observers.
     * @memberof Buffer
     * @instance
     */
    start() {
        this.stop = false;
        this.startObservers();
        this.startRealTime = new Date().getTime();
        this.processSyncData();
    }

    /**
     * Stops the buffer and stops the observers.
     * @memberof Buffer
     * @instance
     */
    stop() {
        this.stopObservers();
        this.stop = true;
    }

    /**
     * Cancels all current running/pending jobs. This function loop over the
     * datasources and cancel them one by one.
     * @memberof Buffer
     * @instance
     */
    cancelAll() {
        for (let dataSourceId of this.buffers) {
            this.cancelDataSource(dataSourceId);
        }
    }

    /**
     * Cancels the dataSource. Cancels means to clear the data contained into the buffer and change the status to CANCEL
     * @param dataSourceId The dataSource to cancel
     * @memberof Buffer
     * @instance
     */
    cancelDataSource(dataSourceId) {
        this.buffers[dataSourceId].buffer = [];
        this.buffers[dataSourceId].status = BUFFER_STATUS.CANCEL;
    }

    /**
     * Starts buffering the dataSource.
     * @param dataSourceId the dataSource to start
     * @memberof Buffer
     * @instance
     */
    startDataSource(dataSourceId) {
        this.buffers[dataSourceId].status = BUFFER_STATUS.NOT_START_YET;
        this.buffers[dataSourceId].lastRecordTime = Date.now();
    }

    /**
     * Starts all dataSources. The method loops over all datasources and
     * calls the {@link
     * @memberof Buffer
     * @instance
     */
    startAll() {
        for (let dataSourceId of this.buffers) {
            this.startDataSource(dataSourceId);
        }
    }

    /**
     * Adds a new dataSource into the buffer.
     * @param dataSourceId The dataSource to add
     * @param options syncMasterTime | bufferingTime | timeOut | name
     * @memberof Buffer
     * @instance
     */
    addDataSource(dataSourceId, options) {
        this.buffers[dataSourceId] = {
            buffer: [],
            syncMasterTime: false,
            bufferingTime: INITIAL_BUFFERING_TIME,
            timeOut: 3000,
            lastRecordTime: Date.now(),
            status: BUFFER_STATUS.NOT_START_YET,
            name: 'undefined'
        };

        if (isDefined(options)) {
            if (isDefined(options.syncMasterTime)) {
                this.buffers[dataSourceId].syncMasterTime = options.syncMasterTime;
            }

            if (isDefined(options.bufferingTime)) {
                this.buffers[dataSourceId].bufferingTime = options.bufferingTime;
            }

            if (isDefined(options.timeOut)) {
                this.buffers[dataSourceId].timeOut = options.timeOut;
            }

            if (isDefined(options.name)) {
                this.buffers[dataSourceId].name = options.name;
            }
        }
    }

    /**
     * Adds an entity which contains one or more dataSources.
     * The dataSources are then added to the buffer using {@link addDataSource}
     * @param entity The entity to add
     * @param options The options object passed to the {@link addDataSource}
     * @memberof Buffer
     * @instance
     */
    addEntity(entity, options) {
        // get dataSources from entity and add them to buffers
        if (isDefined(entity.dataSources)) {
            for (let i = 0; i < entity.dataSources.length; i++) {
                this.addDataSource(entity.dataSources[i], options);
            }
        }
    }

    /**
     * Pushes a data into the buffer. This method is used as internal method by the {@link
     * The event contains the necessary elements to process the data.
     * @param event The event object received from the EventManager
     * @param event.dataSourceId The dataSource id to process
     * @param event.syncMasterTime A boolean used to check if the data has to be synchronized with another data. If the value
     * is FALSE, the data will pass through the buffer and send back immediately.
     * @param event.data The raw data provided by the DataSource
     * @param event.data.timeStamp The timeStamp of the data. It will be used in case of the syncMasterTime is set to TRUE.
     * @memberof Buffer
     * @instance
     */
    push(event) {
        let dataSourceId = event.dataSourceId;

        // append the data to the existing corresponding buffer
        let currentBufferObj = this.buffers[dataSourceId];

        // discard data if it should be synchronized by was too late
        let sync = currentBufferObj.syncMasterTime;
        if (sync && event.data.timeStamp < this.currentTime) {
            return;
        }

        // also discard if streamwas canceled
        if (currentBufferObj.status === BUFFER_STATUS.CANCEL) {
            return;
        }

        // define the time of the first data as relative time
        if (currentBufferObj.status === BUFFER_STATUS.NOT_START_YET) {
            currentBufferObj.startRelativeTime = event.data.timeStamp;
            currentBufferObj.startRelativeRealTime = new Date().getTime();
            currentBufferObj.status = BUFFER_STATUS.START;
        }

        currentBufferObj.buffer.push(event.data);
        currentBufferObj.lastRecordTime = Date.now();

        if (!sync) {
            this.dispatchData(dataSourceId, currentBufferObj.buffer.shift());
        }

    }

    /**
     * [TODO] This is an internal method.
     * @memberof Buffer
     * @instance
     */
    processSyncData() {
        if (!this.bufferingState) {

            let minTimeStampBufferObj = null;
            let minTimeStampDSId = null;
            let minTimeStamp = MAX_LONG;

            let that = this;
            for (let dataSourceId in this.buffers) {
                let currentBufferObj = this.buffers[dataSourceId];
                if ((currentBufferObj.status === BUFFER_STATUS.START || currentBufferObj.status === BUFFER_STATUS.NOT_START_YET) && currentBufferObj.syncMasterTime) {
                    if (currentBufferObj.buffer.length === 0) {
                        /*if(maxBufferingTime < currentBufferObj.bufferingTime) {
                          maxBufferingTime = currentBufferObj.bufferingTime;
                        }*/
                        let waitTime = currentBufferObj.timeOut - (Date.now() - currentBufferObj.lastRecordTime);
                        if (waitTime > 0) {
                            window.setTimeout(() =>  // to be replaced by setInterval
                                this.processSyncData(), waitTime / 10.0);
                            return;
                        } else {
                            //console.log("Timeout of data source " + dataSourceId);
                        }
                    } else if (currentBufferObj.buffer[0].timeStamp < minTimeStamp) {
                        minTimeStampBufferObj = currentBufferObj;
                        minTimeStampDSId = dataSourceId;
                        minTimeStamp = currentBufferObj.buffer[0].timeStamp;
                    }
                }
            }

            // re-buffer because at least one dataSource has no data and its status is START
            /*if(maxBufferingTime > -1) {
              this.buffering(currentBufferObj.name,maxBufferingTime);
            } else*/
            if (minTimeStampBufferObj !== null) {
                this.currentTime = minTimeStamp;
                this.processData(minTimeStampBufferObj, minTimeStampDSId, () => {
                    that.processSyncData();
                });
            } else {
                window.setTimeout(() => {
                    that.processSyncData();
                }, 1000);
            }
        }
    }

    /**
     * [TODO] This is an internal method.
     * @memberof Buffer
     * @instance
     */
    processData(bufferObj, dataSourceId, fnEndTimeout) {
        // compute waitTime and dispatch data
        let startRelativeTime = bufferObj.startRelativeTime;
        let elapsedTime = new Date().getTime() - bufferObj.startRelativeRealTime;
        let data = bufferObj.buffer.shift();

        let waitTime = (((data.timeStamp - startRelativeTime) / this.replayFactor) - elapsedTime);
        bufferObj.startRelativeTime = data.timeStamp;
        bufferObj.startRelativeRealTime = new Date().getTime();

        if (waitTime > 0) {
            //callback the data after waiting for a time equals to the difference between the two timeStamps
            let that = this;
            window.setTimeout(() => {
                //TODO: check if BUFFER TASK isw
                that.dispatchData(dataSourceId, data);
                if (isDefined(fnEndTimeout)) {
                    fnEndTimeout();
                }
            }, waitTime);
        } else {
            this.dispatchData(dataSourceId, data);
            if (isDefined(fnEndTimeout)) {
                fnEndTimeout();
            }
        }
    }

    /**
     * Dispatches the data through the EventManager. If the data to process is synchronized, it will launch a {@link CURRENT_MASTER_TIME} event
     * with {timeStamp:xxx} as parameter. In all case, it launches a {@link
     * @param dataSourceId The dataSourceId of the data. It will be used as concatenated String into the fire method.
     * @param data The data to fire
     * @memberof Buffer
     * @instance
     */
    dispatchData(dataSourceId, data) {
        let bufObj = this.buffers[dataSourceId];
        if (bufObj.status !== BUFFER_STATUS.CANCEL) {
            if (bufObj.syncMasterTime) {
                EventManager.fire(EventManager.EVENT.CURRENT_MASTER_TIME,
                    {
                        timeStamp: data.timeStamp,
                        dataSourceId: dataSourceId
                    });
            }
            EventManager.fire(EventManager.EVENT.DATA + "-" + dataSourceId, {data: data});
        }
    }

    /**
     * This method is responsible of buffering data, that is to say it will timeOut the whole process to wait after more data.
     * @param name The name of the current dataSource which needs to be buffered
     * @param bufferingTime The buffering time
     * @memberof Buffer
     * @instance
     */
    buffering(name, bufferingTime) {
        EventManager.fire(EventManager.EVENT.LOADING_START, {name: name});
        this.bufferingState = true;
        let that = this;
        window.setTimeout(() => {
            that.bufferingState = false;
            EventManager.fire(EventManager.EVENT.LOADING_STOP);
            that.processSyncData();
        }, bufferingTime);
    }
}
