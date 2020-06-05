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

class DataSynchronizer {
    constructor(properties) {
        this.dataSourceMap = {};
        this.bufferingTime = properties.bufferingTime ? properties.bufferingTime : 1000;
        this.startBufferingTime = -1;
        this.currentMasterTime = -1;
    }

    push(dataSourceId, data) {
        const ds = this.dataSourceMap[dataSourceId];

        if(this.startBufferingTime === -1) {
            this.startBufferingTime = Date.now();
            // start iterating on data after bufferingTime
            setTimeout(() => this.processData(), this.bufferingTime);
        }

        ds.data.push(data);
        // can we use the same attribute to determine if the DS has already timed out?
        ds.timedOut = false;
        ds.lastReceivedTime = Date.now();
    }

    processData() {
        let oldestDataDs = null;
        let minDelta = -1;

        let currentDelta = -1;

        for(let currentDsId in this.dataSourceMap) {
            let currentDs = this.dataSourceMap[currentDsId];
            if(currentDs.data.length > 0) {
                if (oldestDataDs === null) {
                    oldestDataDs = currentDs;
                    if(oldestDataDs.data.length > 1) {
                        minDelta = oldestDataDs.data[1].timeStamp - oldestDataDs.data[0].timeStamp;
                    }
                } else if(currentDs.data[0].timeStamp < oldestDataDs.data[0].timeStamp) {
                    minDelta = oldestDataDs.data[0].timeStamp - currentDs.data[0].timeStamp;
                    oldestDataDs = currentDs;
                } else {
                    currentDelta = currentDs.data[0].timeStamp - oldestDataDs.data[0].timeStamp;
                    minDelta = minDelta === -1 ? currentDelta: minDelta < currentDelta? minDelta: currentDelta;
                }
            } else if(!currentDs.timedOut){
                // handle timeOut
                // we wait until reach the timeOut
                let waitTime = currentDs.timeOut - (Date.now() - currentDs.lastReceivedTime);
                if (waitTime > 0) {
                    currentDs.timedOut = true;
                    window.setTimeout(() => this.processData(), waitTime );
                    return;
                }
            }
        }

        // no more data, re-buffering
        if(oldestDataDs === null) {
            this.startBufferingTime = -1;
        } else {
            this.currentMasterTime = oldestDataDs.data[0].timeStamp;
            // return oldest data
            this.onData(oldestDataDs.id, oldestDataDs.data.shift());
            if(minDelta >= 0) {
                // re play next data at min time
                setTimeout(() => this.processData(), minDelta);
            }
        }
    }

    addDataSource(dataSource) {
        this.dataSourceMap[dataSource.id] = {
            bufferingTime: dataSource.bufferingTime,
            timeOut: dataSource.timeOut? dataSource.timeOut: 5000,
            syncMasterTime: dataSource.syncMasterTime,
            data: [],
            startBufferingTime: -1,
            id: dataSource.id,
            lastReceivedTime:-1,
            timedOut: false
        };
    }

    onData(dataSourceId, data) {

    }
}
export default  DataSynchronizer;
