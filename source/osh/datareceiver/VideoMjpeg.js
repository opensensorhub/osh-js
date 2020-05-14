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
 * This datasource provides parsing to MJPEG raw data.
 * Data: ArrayBuffer
 * @extends DataSource
 * @example
 var androidPhoneVideoDataSource = new DataSourceVideoMjpeg("android-Video", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
    startTime: "2015-02-16T07:58:00Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: 1,
    syncMasterTime: true,
    bufferingTime: 1000
  });
 */
class VideoMjpeg extends DataSource {

    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Boolean} properties.timeShift - fix some problem with some android devices with some timestamp shift to 16 sec
     * @param {Boolean} properties.syncMasterTime - defines if the datasource is synchronize with the others one
     * @param {Number} properties.bufferingTime - defines the time during the data has to be buffered
     * @param {Number} properties.timeOut - defines the limit time before data has to be skipped
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     */
    constructor(name, properties) {
        super(name, properties);
        this.setReconnectTimeout(1000 * 5); // 5 sec
    }

    /**
     * Extracts timestamp from the message. The timestamp is corresponding to the first 64 bits of the binary message.
     * @param {ArrayBuffer} data - the data to parse
     * @returns {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        this.lastTimeStamp = new DataView(data).getFloat64(0, false) * 1000; // read double time stamp as big endian
        return this.lastTimeStamp;
    }

    /**
     * Extracts data from the message. Creates a Blob object starting at byte 12. (after the 64 bits of the timestamp).
     * @param {ArrayBuffer} data - the data to parse
     * @return {Blob} the parsed data
     */
    parseData(data) {
        let imgBlob = new Blob([data]);
        // slice makes a shallow copy, we can release the blob
        let url = window.URL.createObjectURL(imgBlob.slice(12));
        window.URL.revokeObjectURL(imgBlob);
        return url;
    }
}

export default  VideoMjpeg;
