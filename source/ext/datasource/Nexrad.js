/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2020 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoftware.com>

 ******************************* END LICENSE BLOCK ***************************/

import DataSource from '../../core/datasource/DataSource.js';

/**
 * This datasource provides parsing to DataSource Nexrad.
 * @extends DataSource
 */
class Nexrad extends DataSource {

    /**
     * Extracts timestamp from the message. The timestamp is the first token got from split(',')
     * @param {String} data - the data to parse
     * @return {number} the extracted timestamp
     */
    parseTimeStamp(data) {
        let rec = String.fromCharCode.apply(null, new Uint8Array(data));
        let tokens = rec.trim().split(",");
        this.lastTimeStamp = new Date(tokens[0]).getTime();
        return this.lastTimeStamp;
    }

    /**
     * Extracts data from the message.
     * @param {Object} data the data to parse
     * @return {Object} the parsed data
     */
    parseData(data) {
        let rec = String.fromCharCode.apply(null, new Uint8Array(data));
        let tokens = rec.trim().split(",");
        let el = parseFloat(tokens[2]);
        let az = parseFloat(tokens[3]);

        let rangeToCenterOfFirstRefGate = parseFloat(tokens[4]);
        let refGateSize = parseFloat(tokens[5]);
        let numRefGates = parseInt(tokens[6]);

        let rangeToCenterOfFirstVelGate = parseFloat(tokens[7]);
        let velGateSize = parseFloat(tokens[8]);
        let numVelGates = parseInt(tokens[9]);

        let rangeToCenterOfFirstSwGate = parseFloat(tokens[10]);
        let swGateSize = parseFloat(tokens[11]);
        let numSwGates = parseInt(tokens[12]);

        let i = 13;

        let refData = [];
        for (let count = 0; count < numRefGates; count++) {
            refData.push(parseFloat(tokens[i++]));
        }

        let velData = [];
        for (let count = 0; count < numVelGates; count++) {
            velData.push(parseFloat(tokens[i++]));
        }

        let swData = [];
        for (let count = 0; count < numSwGates; count++) {
            swData.push(parseFloat(tokens[i++]));
        }

        return {
            elevation: el,
            azimuth: az,
            rangeToCenterOfFirstRefGate: rangeToCenterOfFirstRefGate,
            refGateSize: refGateSize,
            rangeToCenterOfFirstVelGate: rangeToCenterOfFirstVelGate,
            velGateSize: velGateSize,
            rangeToCenterOfFirstSwGate: rangeToCenterOfFirstSwGate,
            swGateSize: swGateSize,
            reflectivity: refData,
            velocity: velData,
            spectrumWidth: swData
        };
    }
}
export default Nexrad;
