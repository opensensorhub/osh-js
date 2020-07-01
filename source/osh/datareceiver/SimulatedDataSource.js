/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2020 Ian Patterson. All Rights Reserved.

 Author: Ian Patterson <cr31.dev@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/
import DataSource from "./DataSource.js";
import SimConnector from "../dataconnector/SimConnector.js";

class SimulatedDataSource extends DataSource {

    constructor(name, properties) {
        super(name, properties);
        this.initDataSource(properties)
    }

    initDataSource(properties) {
        this.connector = new SimConnector({
            interval: 1000,
            dataCallback: this.createDataEntries
        });
    }

    // TODO: Move this out of here after testing
    createDataEntries() {
        let tempDataArr = [];
        let freqCounter = 0;

        let maxPower = 250;
        let minPower = -80;
        let numBands = 10;

        for (let i = 0; i < numBands; i++) {
            let randomPower = Math.random() * (maxPower - minPower) + minPower;
            tempDataArr.push({
                time: Date.now(),
                freqBand: [freqCounter, freqCounter + 400],
                power: randomPower
            });
            freqCounter += 400;
        }
        return tempDataArr;
    }
}

export default SimulatedDataSource;