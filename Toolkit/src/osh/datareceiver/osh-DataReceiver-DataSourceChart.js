/**
 * @classdesc This datasource provides parsing to chart data.
 * Data has to be under the format : ISODATE,X,Y,
 * @class
 * @augments OSH.DataReceiver.DataSource
 * @example
 *var chartDataSource = new OSH.DataReceiver.Chart("chart", {
      protocol: "ws",
      service: "SOS",
      endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
      offeringID: "urn:mysos:offering03",
      observedProperty: "http://sensorml.com/ont/swe/property/Weather",
      startTime: "now",
      endTime: "2055-01-01Z",
      syncMasterTime: false,
      bufferingTime: 1000
  });
 */
OSH.DataReceiver.Chart = OSH.DataReceiver.DataSource.extend({

    /**
     * Extracts timestamp from the data. The timestamp is the first token got from split(',')
     * @param {function} $super the parseTimeStamp super method
     * @param {string} data the data to parse
     * @returns {number} the extracted timestamp
     * @memberof OSH.DataReceiver.Chart
     * @instance
     */
    parseTimeStamp: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data));
        var tokens = rec.trim().split(",");
        var t = new Date(tokens[0]).getTime();
        return t;
    },

    /**
     * Extract data from the message. This split over ",".
     * @param {function} $super the parseData super method
     * @param {Object} data the data to parse
     * @returns {Array} the parsed data as an array of tokens
     * @memberof OSH.DataReceiver.Chart
     * @instance
     */
    parseData: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data));
        var tokens = rec.trim().split(",");
        //skip time
        tokens.shift();
        return tokens;
    }
});
