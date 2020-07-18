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

import EventManager from "osh/events/EventManager";
import {isDefined} from "../utils/Utils";
import DataSynchronizerWorker from './DataSynchronizer.worker';

class DataSynchronizer {
    /**
     * Creates The dataSynchronizer.
     * @param {Object} properties - the property of the object
     * @param {Number} properties.replayFactor - replayFactor value
     * @param {DataSource[]} properties.dataSources - the dataSource array
     */
    constructor(properties) {
        if(!isDefined(properties.dataSources)) {
            throw 'You must specified a dataSource array';
        }
        this.bufferingTime = 1000; // default
        let replayFactor = 1;
        if(isDefined(properties.replayFactor)) {
            replayFactor = properties.replayFactor;
        }
        this.initWorker(properties.dataSources, replayFactor);
    }

    /**
     * @private
     */
    initWorker(dataSources, replayFactor) {
        // build object for Worker because DataSource is not clonable
        const dataSourcesForWorker = [];
        for(let dataSource of dataSources) {
            dataSourcesForWorker.push({
                bufferingTime: dataSource.bufferingTime,
                timeOut: dataSource.timeOut,
                id: dataSource.id
            });
            // bind dataSource data onto dataSynchronizer data
            dataSource.onData = (data) => this.push(dataSource.id, data);
        }

        this.synchronizerWorker = new DataSynchronizerWorker();
        this.synchronizerWorker.postMessage({
            dataSources: dataSourcesForWorker,
            replayFactor: replayFactor
        });

        this.synchronizerWorker.onmessage =(event) => {
            if(event.data.message === 'data') {
                this.onData(event.data.dataSourceId, event.data.data);
            } else if(event.data.message === 'wait') {
                this.onWait(event.data.dataSourceId, event.data.time, event.data.total);
            }
        }
    }

    onWait(dataSourceId, time, total) {}

    onData(dataSourceId, data) {
        EventManager.fire(EventManager.EVENT.DATA + "-" + dataSourceId, {data: data});
    }

    /**
     * @param {String} dataSourceId - the dataSource id
     * @param {Object} data - the data to push into the data synchronizer
     */
    push(dataSourceId, data) {
        if(this.synchronizerWorker !== null) {
            this.synchronizerWorker.postMessage({
                dataSourceId: dataSourceId,
                data: data
            });
        }
    }

    /**
     * Terminate the corresponding running WebWorker by calling terminate() on it.
     */
    terminate() {
        if(this.synchronizerWorker !== null) {
            this.synchronizerWorker.terminate();
            this.synchronizerWorker = null;
        }
    }
}
export default  DataSynchronizer;
