/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2016 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoftware.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides parsing to UAH Weather Station.
 * @class UAHWeather
 * @augments DataSource
 */
import DataSource from './osh-DataReceiver-DataSource.js';

export default class DataSourceUAHWeather extends DataSource {

    /**
     * Extracts timestamp from the message. The timestamp is the first token got from split(',')
     * @param {string} data the data to parse
     * @returns {number} the extracted timestamp
     * @memberof DataSourceUAHWeather
     * @instance
     */
    parseTimeStamp(data) {
        let rec = String.fromCharCode.apply(null, new Uint8Array(data));
        let tokens = rec.trim().split(",");
        return new Date(tokens[0]).getTime();
    }

    /**
     * Extract data from the message.
     * @param {Object} data the data to parse
     * @returns {Object} the parsed data
     * @memberof DataSourceUAHWeather
     * @instance
     */
    parseData(data) {
        let rec = String.fromCharCode.apply(null, new Uint8Array(data));
        let tokens = rec.trim().split(",");
        let airPres = parseFloat(tokens[1]);
        let airTemp = parseFloat(tokens[2]);
        let humidity = parseFloat(tokens[3]);
        let windSpeed = parseFloat(tokens[4]);
        let windDir = parseFloat(tokens[5]);
        let rainCnt = parseFloat(tokens[6]);

        return {
            airPres: airPres,
            airTemp: airTemp,
            humidity: humidity,
            windSpeed: windSpeed,
            windDir: windDir,
            rainCnt: rainCnt
        };
    }
}
