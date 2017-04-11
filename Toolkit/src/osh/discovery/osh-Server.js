/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Richard Becker. All Rights Reserved.

 Author: Richard Becker <beckerr@prominentedge.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @class
 * @classdesc
 * @example
 * var oshServer = new OSH.Server(option.value);
 *
 * var onSuccessGetCapabilities = function(event) {
      this.sensors = oshServer.sensors;
   };

   var onErrorGetCapabilities = function(event) {
    // does something
   };

   oshServer.getCapabilities(onSuccessGetCapabilities,onErrorGetCapabilities);
 */
OSH.Server = BaseClass.extend({
  initialize: function (url) {
    this.url = url;
    this.id = "Server-" + OSH.Utils.randomUUID();
    this.capabilities = null;
    this.sensors = [];
  },

  /**
   *
   * @returns {string|*}
   * @instance
   * @memberof OSH.Server
   */
  getId: function () {
    return this.id;
  },

  /**
   *
   * @returns {*}
   * @instance
   * @memberof OSH.Server
   */
  getUrl: function () {
    return this.url;
  },

  /**
   *
   * @param successCallback
   * @param errorCallback
   * @instance
   * @memberof OSH.Server
   */
  getCapabilities: function (successCallback, errorCallback) {
    var req = this.url + 'sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        this.capabilities = OSH.Utils.jsonix_XML2JSON(xhr.responseText);
        for (var i = 0; i < this.capabilities.value.contents.contents.offering.length; i++) {
          var sensor = new OSH.Sensor(this.capabilities.value.contents.contents.offering[i].abstractOffering.value);
          sensor.server = this;
          this.sensors.push(sensor);
        }
        var s = successCallback.bind(this);
        s(xhr.responseText);
      }
      else {
        errorCallback(xhr.responseText);
      }
    }.bind(this);
    xhr.open('GET', req, true);
    xhr.send();
  },

  /**
   *
   * @param id
   * @returns {*}
   * @instance
   * @memberof OSH.Server
   */
  getSensorById: function (id) {
    for (var i = 0; i < this.sensors.length; i++) {
      if (this.sensors[i].identifier == id)
        return this.sensors[i];
    }
    return null;
  }
});
