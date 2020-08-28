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


import DataSource from './DataSource.js';
import SweJsonWorker from './workers/SweJson.worker.js';

/**
 * This datasource provides generic parsing for JSON response.
 *
 * @extends DataSource
 * @example
 * import SweJson from 'osh/datareceiver/SweJson.js';
 *
 * let androidPhoneGpsDataSource = new SweJson("android-GPS", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: "2015-02-16T07:58:00Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: replaySpeed+"",
    bufferingTime: 1000,
    timeShift: -16000
  });
 */

class SweJson extends DataSource {
    constructor(name, properties) {
        super(name, {
            timeShift:0,
            reconnectTimeout: 1000 * 5, // default if not defined into properties
            ...properties
        }, new SweJsonWorker());
    }
}

export default SweJson;
