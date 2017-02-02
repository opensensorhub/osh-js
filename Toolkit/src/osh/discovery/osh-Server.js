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
