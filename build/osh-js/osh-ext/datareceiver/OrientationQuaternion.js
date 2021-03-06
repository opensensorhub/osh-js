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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import DataSource from '../../osh/datasource/DataSource.js';
/**
 * This datasource provides parsing to Orientation Quaternion.
 * Data: ISODATE,Qx,Qy,Qz,Qw.
 * @extends DataSource
 * @example
 * import OrientationQuaternion from 'ext/datasource/OrientationQuaternion.js';
 *
 * let androidPhoneOrientationDataSource = new OrientationQuaternion("android-Orientation", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: replaySpeed+"",
        bufferingTime: 1000
    });
 */
var OrientationQuaternion = /** @class */ (function (_super) {
    __extends(OrientationQuaternion, _super);
    function OrientationQuaternion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Extracts timestamp from the message. The timestamp is the first token got from split(',')
     * @param {String} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    OrientationQuaternion.prototype.parseTimeStamp = function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data));
        var tokens = rec.trim().split(",");
        this.lastTimeStamp = new Date(tokens[0]).getTime();
        return this.lastTimeStamp;
    };
    /**
     * Extracts data from the message. The data are got such as:<p><ul><li>qx: tokens[1]</li><li>qy: tokens [2]</li><li>qz: tokens[3]</li><li>qw: tokens[4]</li></ul></p>.
     * @param {Object} data - the data to parse
     * @return {Object} the parsed data
     * @example
     * {
     *   pitch:10,
     *   roll: 11,
     *   heading:12
     * }
     */
    OrientationQuaternion.prototype.parseData = function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data));
        var tokens = rec.trim().split(",");
        var qx = parseFloat(tokens[1]);
        var qy = parseFloat(tokens[2]);
        var qz = parseFloat(tokens[3]);
        var qw = parseFloat(tokens[4]);
        //let q = new THREE.Quaternion(qx, qy, qz, qw);
        //let look = new THREE.Vector3( 0, 0, -1 );
        //look.applyQuaternion(q);
        // look dir vector
        var x = 0;
        var y = 0;
        var z = -1;
        // calculate quat * vector
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;
        // calculate result * inverse quat
        var xp = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        var yp = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        var zp = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        var yaw = 90 - (180 / Math.PI * Math.atan2(yp, xp));
        //TODO: computes roll & pitch values
        return { heading: yaw, roll: null, pitch: null };
    };
    return OrientationQuaternion;
}(DataSource));
export default OrientationQuaternion;
//# sourceMappingURL=OrientationQuaternion.js.map
