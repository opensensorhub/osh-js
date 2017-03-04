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
 * @class OSH.DataReceiver.UAHWeather
 * @augments OSH.DataReceiver.DataSource
 */
OSH.DataReceiver.DataSourceUAHWeather = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.DataSourceUAHWeather
   * @instance
   */
  parseTimeStamp: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    return new Date(tokens[0]).getTime();
  },

  /**
   * Extract data from the message.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @memberof OSH.DataReceiver.DataSourceUAHWeather
   * @instance
   */
  parseData: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var airPres = parseFloat(tokens[1]);
    var airTemp = parseFloat(tokens[2]);
    var humidity = parseFloat(tokens[3]);
    var windSpeed = parseFloat(tokens[4]);
    var windDir = parseFloat(tokens[5]);
    var rainCnt = parseFloat(tokens[6]);
    
    return {
      airPres : airPres,
      airTemp : airTemp,
      humidity : humidity,
      windSpeed: windSpeed,
      windDir: windDir,
      rainCnt: rainCnt
    };
  } 
});
