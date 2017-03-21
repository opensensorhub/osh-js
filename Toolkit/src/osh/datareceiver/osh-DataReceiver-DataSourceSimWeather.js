/**
 * @classdesc This datasource provides parsing to Sim Weather Sensor.
 * @class OSH.DataReceiver.DataSourceSimWeather
 * @augments OSH.DataReceiver.DataSource
 */
OSH.DataReceiver.DataSourceSimWeather = Class.create(OSH.DataReceiver.DataSource,{

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.DataSourceSimWeather
   * @instance
   */
  parseTimeStamp: function($super,data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    return new Date(tokens[0]).getTime();
  },

  /**
   * Extract data from the message.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @memberof OSH.DataReceiver.DataSourceSimWeather
   * @instance
   */
  parseData: function($super,data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var airTemp = parseFloat(tokens[1]);
    var airPres = parseFloat(tokens[2]);
    var windSpeed = parseFloat(tokens[3]);
    var windDir = parseFloat(tokens[4]);
    
    return {
      airTemp : airTemp,
      airPres : airPres,
      windSpeed: windSpeed,
      windDir: windDir,
    };
  } 
});
