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

import DataSource from './DataSource';

/**
 * This datasource provides parsing to Lat,Lon,Alt location.
 * Data: ISODATE,LAT,LON,ALT
 * @extends DataSource
 * @example
 * let androidPhoneGpsDataSource = new DataSourceLatLonAlt("android-GPS", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: "2015-02-16T07:58:00Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: replayFactor+"",
    syncMasterTime: true,
    bufferingTime: 1000,
    timeShift: -16000
  });
 */

class LatLonAlt extends DataSource {

    /**
     * Extracts timestamp from the message. The timestamp is the first token got from split(',')
     * @param {String} data - the data to parse
     * @returns {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        let rec = String.fromCharCode.apply(null, new Uint8Array(data));
        let tokens = rec.trim().split(",");
        return new Date(tokens[0]).getTime();
    }

    /**
     * Extract data from the message. The data are got such as:<p><ul><li>lat: tokens[1]</li><li>lon: tokens [2]</li><li>alt: tokens[3]</li></ul></p>.
     * @param {Object} data - the data to parse
     * @return {{alt: number, lon: number, lat: number}} the parsed data
     * @example
     * {
     *   lat:43.61758626,
     *   lon: 1.42376557,
     *   alt:100
     * }
     */
    parseData(data) {
        let rec = String.fromCharCode.apply(null, new Uint8Array(data));
        let tokens = rec.trim().split(",");
        let lat = parseFloat(tokens[1]);
        let lon = parseFloat(tokens[2]);
        let alt = parseFloat(tokens[3]);

        return {
            lat: lat,
            lon: lon,
            alt: alt
        };
    }
}
export default  LatLonAlt;
