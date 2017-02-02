/**
 * @classdesc This datasource provides parsing to Lat,Lon,Alt location.
 * Data: ISODATE,LAT,LON,ALT
 * @class OSH.DataReceiver.LatLonAlt
 * @augments OSH.DataReceiver.DataSource
 * @example
 * var androidPhoneGpsDataSource = new OSH.DataReceiver.LatLonAlt("android-GPS", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: "2015-02-16T07:58:00Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: replayFactor+"",
    syncMasterTime: true,
    bufferingTime: 1000,
    timeShift: -16000
  });
 */
OSH.DataReceiver.LatLonAlt = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.LatLonAlt
   * @instance
   */
  parseTimeStamp: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var t =  new Date(tokens[0]).getTime();
    return t;
  },

  /**
   * Extract data from the message. The data are got such as:<p><ul><li>lat: tokens[1]</li><li>lon: tokens [2]</li><li>alt: tokens[3]</li></ul></p>.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @example
   * {
   *   lat:43.61758626,
   *   lon: 1.42376557,
   *   alt:100
   * }
   * @memberof OSH.DataReceiver.LatLonAlt
   * @instance
   */
  parseData: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var lat = parseFloat(tokens[1]);
    var lon = parseFloat(tokens[2]);
    var alt = parseFloat(tokens[3]);
    
    return {
      lat : lat,
      lon : lon,
      alt : alt
    };
  } 
});
