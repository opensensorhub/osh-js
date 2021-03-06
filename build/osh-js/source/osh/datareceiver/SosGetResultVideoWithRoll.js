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

import TimeSeriesDataSource from "./TimeSeriesDataSource";
import SosGetResultVideoWithRollWorker from './workers/SosGetResultVideoWithRoll.worker.js';

/**
 * This datasource provides parsing to H264 raw data with roll.
 * Data: ArrayBuffer
 * @extends DataSource
 * @example
 * import SosGetResultVideoWithRoll from 'core/datasource/SosGetResultVideoWithRoll.js';
 *
 * var videoDataSource = new SosGetResultVideoWithRoll("H264 video ", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:a0e0eac2fea3f614-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2016-08-11T20:17:30.402Z",
        endTime: "2016-08-11T20:18:05.451Z",
        replaySpeed: 1,
        bufferingTime: 1000
  });
 */
class SosGetResultVideoWithRoll extends TimeSeriesDataSource {
    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Boolean} [properties.timeShift=false] - fix some problem with some android devices with some timestamp shift to 16 sec
     * @param {Number} [properties.bufferingTime=0 - defines the time during the data has to be buffered. Useful only when used with DataSynchronizer
     * @param {Number} [properties.timeOut=0] - defines the limit time before data has to be skipped. Useful only when used with DataSynchronizer
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} [properties.replaySpeed=1] the replay factor
     * @param {Number} [properties.responseFormat] the response format (e.g video/mp4)
     * @param {Number} [properties.reconnectTimeout=10000] - the time before reconnecting (in milliseconds)
     * @param {Object} [properties.customUrlParams={}] - the encoding options
     * @param {Number} [properties.customUrlParams.video_bitrate] - define a custom bitrate (in b/s)
     * @param {Number} [properties.customUrlParams.video_scale] - define a custom scale, 0.0 < value < 1.0
     * @param {Number} [properties.customUrlParams.video_width] - define a custom width
     * @param {Number} [properties.customUrlParams.video_height] - define a custom height
     */
    constructor(name, properties) {
        super(name, {
            timeShift:0,
            reconnectTimeout: 1000 * 5, // default if not defined into properties
            ...properties
        }, new SosGetResultVideoWithRollWorker());
    }
}

export default  SosGetResultVideoWithRoll;
