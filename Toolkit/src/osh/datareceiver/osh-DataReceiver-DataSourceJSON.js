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
 * @classdesc This datasource provides generic parsing for JSON response.
 *
 * @class OSH.DataReceiver.JSON
 * @augments OSH.DataReceiver.DataSource
 * @example
 * let androidPhoneGpsDataSource = new OSH.DataReceiver.JSON("android-GPS", {
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

import DataSource from './osh-DataReceiver-DataSource';

export default class JSON extends DataSource {

    /**
     * Extracts timestamp from the message. The timestamp corresponds to the 'time' attribute of the JSON object.
     * @param {function} $super the parseTimeStamp super method
     * @param {string} data the data to parse
     * @returns {number} the extracted timestamp
     * @memberof OSH.DataReceiver.JSON
     * @instance
     */
    parseTimeStamp(data) {
        let rec = String.fromCharCode.apply(null, new Uint8Array(data));
        return new Date(JSON.parse(rec)['time']).getTime();
    }

    /**
     * Extract data from the message. The data are corresponding to the whole list of attributes of the JSON object
     * excepting the 'time' one.
     * @param {function} $super the parseData super method
     * @param {Object} data the data to parse
     * @returns {Object} the parsed data
     * @example
     * {
     *   location : {
     *    lat:43.61758626,
     *    lon: 1.42376557,
     *    alt:100
     *   }
     * }
     * @memberof OSH.DataReceiver.JSON
     * @instance
     */
    parseData(data) {
        let rec = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));

        let result = {};

        for (let key in rec) {
            if (key !== 'time') {
                result[key] = rec[key];
            }
        }
        return result;
    }

    /**
     * Builds the full url.
     * @param {object} properties
     * @param {string} properties.protocol the connector protocol
     * @param {string} properties.endpointUrl the endpoint url
     * @param {string} properties.service the service
     * @param {string} properties.offeringID the offeringID
     * @param {string} properties.observedProperty the observed property
     * @param {string} properties.startTime the start time (ISO format)
     * @param {string} properties.endTime the end time (ISO format)
     * @param {number} properties.replaySpeed the replay factor
     * @param {number} properties.responseFormat the response format (e.g video/mp4)
     * @instance
     * @memberof OSH.DataReceiver.DataSource
     * @returns {string} the full url
     */
    buildUrl(properties) {
        let url = "";

        // adds protocol
        url += properties.protocol + "://";

        // adds endpoint url
        url += properties.endpointUrl + "?";

        // adds service
        url += "service=" + properties.service + "&";

        // adds version
        url += "version=2.0&";

        // adds request
        url += "request=GetResult&";

        // adds offering
        url += "offering=" + properties.offeringID + "&";

        // adds feature of interest urn
        if (properties.foiURN && properties.foiURN !== '') {
            url += 'featureOfInterest=' + properties.foiURN + '&';
        }

        // adds observedProperty
        url += "observedProperty=" + properties.observedProperty + "&";

        // adds temporalFilter
        let startTime = properties.startTime;
        let endTime = properties.endTime;
        if (startTime !== "now" && this.timeShift !== 0) {
            // HACK: don't do it for old Android dataset that is indexed differently
            if (properties.offeringID !== "urn:android:device:060693280a28e015-sos") {
                // apply time shift
                startTime = new Date(Date.parse(startTime) - this.timeShift).toISOString();
                endTime = new Date(Date.parse(endTime) - this.timeShift).toISOString();
            }
        }
        url += "temporalFilter=phenomenonTime," + startTime + "/" + endTime + "&";

        if (properties.replaySpeed) {
            // adds replaySpeed
            url += "replaySpeed=" + properties.replaySpeed;
        }

        // adds responseFormat (mandatory)
        url += "&responseFormat=application/json";

        return url;
    }
}
