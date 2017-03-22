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
 * @classdesc This datasource provides parsing to euler orientation.
 * Data has to be under the format : ISODATE,X,Y,
 * @class OSH.DataReceiver.EulerOrientation
 * @augments OSH.DataReceiver.DataSource
 */
OSH.DataReceiver.EulerOrientation = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.EulerOrientation
   * @instance
   */
  parseTimeStamp: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var t =  new Date(tokens[0]).getTime();
    return t;
  },

  /**
   * Extract data from the message. The data are got such as:<p><ul><li>yaw: tokens[1]</li><li>pitch: tokens [2]</li><li>roll: tokens[3]</li></ul></p>.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @example
   * {
   *   pitch:10,
   *   roll: 11,
   *   heading:12
   * }
   * @memberof OSH.DataReceiver.EulerOrientation
   * @instance
   */
  parseData: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var yaw = parseFloat(tokens[1]);    
    var pitch = parseFloat(tokens[2]);
    var roll = parseFloat(tokens[3]);
    
    return {
      pitch : pitch,
      roll : roll,
      heading: yaw
    };
  } 
});
