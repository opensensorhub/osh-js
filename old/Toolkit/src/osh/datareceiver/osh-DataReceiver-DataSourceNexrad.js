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
 * @classdesc This datasource provides parsing to Nexrad.
 * @class OSH.DataReceiver.Nexrad
 * @augments OSH.DataReceiver.DataSource
 */
OSH.DataReceiver.Nexrad = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.Nexrad
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
   * @memberof OSH.DataReceiver.Nexrad
   * @instance
   */
  parseData: function(data){
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
    
    var i = 13
    
    var refData = [];
    for (count=0; count<numRefGates; count++)
    	refData.push(parseFloat(tokens[i++]));
    
    var velData = [];
    for (count=0; count<numVelGates; count++)
    	velData.push(parseFloat(tokens[i++]));
    
    var swData = [];
    for (count=0; count<numSwGates; count++)
    	swData.push(parseFloat(tokens[i++]));
    
    return {
      elevation : el,
      azimuth : az,
      rangeToCenterOfFirstRefGate : rangeToCenterOfFirstRefGate,
      refGateSize: refGateSize,
      rangeToCenterOfFirstVelGate: rangeToCenterOfFirstVelGate,
      velGateSize: velGateSize,
      rangeToCenterOfFirstSwGate: rangeToCenterOfFirstSwGate,
      swGateSize: swGateSize,
      reflectivity: refData,
      velocity: velData,
      spectrumWidth: swData
    };
  } 
});
