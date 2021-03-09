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
import DataSource from '../../core/datasource/DataSource.js';
/**
 * This datasource provides parsing to DataSource Nexrad.
 * @extends DataSource
 */
var Nexrad = /** @class */ (function (_super) {
    __extends(Nexrad, _super);
    function Nexrad() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Extracts timestamp from the message. The timestamp is the first token got from split(',')
     * @param {String} data - the data to parse
     * @return {number} the extracted timestamp
     */
    Nexrad.prototype.parseTimeStamp = function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data));
        var tokens = rec.trim().split(",");
        this.lastTimeStamp = new Date(tokens[0]).getTime();
        return this.lastTimeStamp;
    };
    /**
     * Extracts data from the message.
     * @param {Object} data the data to parse
     * @return {Object} the parsed data
     */
    Nexrad.prototype.parseData = function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data));
        var tokens = rec.trim().split(",");
        var el = parseFloat(tokens[2]);
        var az = parseFloat(tokens[3]);
        var rangeToCenterOfFirstRefGate = parseFloat(tokens[4]);
        var refGateSize = parseFloat(tokens[5]);
        var numRefGates = parseInt(tokens[6]);
        var rangeToCenterOfFirstVelGate = parseFloat(tokens[7]);
        var velGateSize = parseFloat(tokens[8]);
        var numVelGates = parseInt(tokens[9]);
        var rangeToCenterOfFirstSwGate = parseFloat(tokens[10]);
        var swGateSize = parseFloat(tokens[11]);
        var numSwGates = parseInt(tokens[12]);
        var i = 13;
        var refData = [];
        for (var count = 0; count < numRefGates; count++) {
            refData.push(parseFloat(tokens[i++]));
        }
        var velData = [];
        for (var count = 0; count < numVelGates; count++) {
            velData.push(parseFloat(tokens[i++]));
        }
        var swData = [];
        for (var count = 0; count < numSwGates; count++) {
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
    };
    return Nexrad;
}(DataSource));
export default Nexrad;
//# sourceMappingURL=Nexrad.js.map