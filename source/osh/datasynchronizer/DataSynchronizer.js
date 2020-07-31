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
import {isDefined, randomUUID} from "../utils/Utils";
import DataSynchronizerWorker from './DataSynchronizer.worker';
import {DATA_SYNCHRONIZER_TOPIC} from "../Constants";

class DataSynchronizer {
    /**
     * Creates The dataSynchronizer.
     * @param {Object} properties - the property of the object
     * @param {Number} properties.replayFactor - replayFactor value
     * @param {Number} properties.intervalRate - interval in which data is played
     * @param {DataSource[]} properties.dataSources - the dataSource array
     */
    constructor(properties) {
        if(!isDefined(properties.dataSources)) {
            throw 'You must specify a dataSource array';
        }
        this.bufferingTime = 1000; // default
        this.currentTime = Date.now();
        this.id = randomUUID();

        let replayFactor = 1;
        let intervalRate = 5;

        if(isDefined(properties.replayFactor)) {
            replayFactor = properties.replayFactor;
        }
        if(isDefined(properties.intervalRate)) {
            intervalRate = properties.intervalRate;
        }
        this.initWorker(properties.dataSources, replayFactor, intervalRate);
    }

    /**
     * @private
     */
    initWorker(dataSources, replayFactor, intervalRate) {
        // build object for Worker because DataSource is not clonable
        const dataSourcesForWorker = [];
        for(let dataSource of dataSources) {
            dataSourcesForWorker.push({
                bufferingTime: dataSource.properties.bufferingTime || 0,
                timeOut: dataSource.properties.timeOut || 0,
                id: dataSource.id
            });
            try {
                dataSource.setDataSynchronizer(this);
            } catch(ex) {
                console.warn("Cannot set the synchronizer to this DataSource");
            }
        }

        this.synchronizerWorker = new DataSynchronizerWorker();
        this.synchronizerWorker.postMessage({
            message: 'init',
            dataSources: dataSourcesForWorker,
            replayFactor: replayFactor,
            intervalRate: intervalRate,
            dataSynchronizerId:this.id,
            topic: DATA_SYNCHRONIZER_TOPIC+this.id
        });
    }

    addDataSource(dataSource) {
        const obj = {
            bufferingTime: dataSource.bufferingTime || 0,
            timeOut: dataSource.timeOut || 0,
            id: dataSource.id
        };
        // bind dataSource data onto dataSynchronizer data
        try {
            dataSource.setDataSynchronizer(this);
        } catch(ex) {
            console.warn("Cannot set the synchronizer to this DataSource");
        }
        this.synchronizerWorker.postMessage({
            message: 'add',
            dataSources: [obj]
        });
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
