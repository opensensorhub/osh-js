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
 * @classdesc This datasource provides parsing to fragmented mp4 raw data. The data is encapsulated into mp4 fragment.
 * Data: ArrayBuffer
 * @class VideoMp4
 * @augments DataSource
 * @example
 * let videoDataSource = new VideoMp4("MP4 video ", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:a0e0eac2fea3f614-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2016-08-11T20:17:30.402Z",
        endTime: "2016-08-11T20:18:05.451Z",
        replaySpeed: 1,
        syncMasterTime: false,
        bufferingTime: 1000,
        responseFormat: "video/mp4
  });
 */
import DataSource from './osh-DataReceiver-DataSource.js';

export default class VideoMp4 extends DataSource {
    constructor(name, properties, options) {
        super(name, properties, options);
        this.absoluteTime = -1;
    }

    /**
     * Extracts timestamp from the message. The timestamp is located at the 60th bytes and is 8 bytes length.
     * @param {ArrayBuffer} data the data to parse
     * @returns {number} the extracted timestamp
     * @memberof VideoMp4
     * @instance
     */
    parseTimeStamp(data) {
        // got the first box => MVDH
        if (this.absoluteTime === -1) {
            let infos = readMP4Info(data);

            //console.log("PTS : "+infos.pts);
            //console.log("timeScale : "+infos.timeScale);
            //console.log("duration : "+infos.duration);
            //console.log("rate : "+infos.rate);

            this.absoluteTime = infos.absoluteTime;
            this.timeScale = infos.timeScale;

            return this.absoluteTime;
        } else {
            // for debug only --> MVDH has already been calculated
            // got the first box
            let infos = readMP4Info(data);
            //console.log("PTS : "+infos.pts);
            //console.log("timeScale : "+infos.timeScale);
            //console.log("duration : "+infos.duration);
            //console.log("rate : "+infos.rate);
            // end debug
            return ((infos.pts * 1000) * this.timeScale) + this.absoluteTime; // FPS to FPMS
        }
    }
}

function readMP4Info(data) {
    let infos = {
        absoluteTime: 0,
        pts: 0,
        timeScale: 0,
        duration: 0,
        rate: 0
    };

    let pos = 60; // 60 bytes
    // starts at 60 bytes length
    //console.log(data.byteLength);
    infos.absoluteTime = new DataView(data, pos, pos + 8).getUint32(0); //8 bytes length but takes the  last four
    infos.absoluteTime = (infos.absoluteTime - 2082844800) * 1000;
    //console.log(new Date(infos.absoluteTime).toISOString());
    pos += 8;

    //modification time// 32 bits
    infos.pts = new DataView(data, pos, pos + 4).getUint32(0); //4 bytes length
    pos += 4;

    //time scale // 32 bits
    infos.timeScale = new DataView(data, pos, pos + 4).getUint32(0); //4 bytes length
    infos.timeScale = 1 / (infos.timeScale); // FPS
    pos += 4;

    //duration // 32 bits
    infos.duration = new DataView(data, pos, pos + 4).getUint32(0); //4 bytes length
    pos += 4;

    //rate  // 32 bits / 65536
    infos.rate = (new DataView(data, pos, pos + 4).getUint32(0));

    return infos;
}

function readNCC(bytes, n) {
    let res = "";
    for (let i = 0; i < n; i++) {
        res += String.fromCharCode(bytes[i]);
    }
    return res;
}
