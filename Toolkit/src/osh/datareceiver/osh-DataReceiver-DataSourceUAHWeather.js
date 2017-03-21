/**
 * @classdesc This datasource provides parsing to UAH Weather Station.
 * @class OSH.DataReceiver.UAHWeather
 * @augments OSH.DataReceiver.DataSource
 */
OSH.DataReceiver.DataSourceUAHWeather = Class.create(OSH.DataReceiver.DataSource,{

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.DataSourceUAHWeather
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
   * @memberof OSH.DataReceiver.DataSourceUAHWeather
   * @instance
   */
  parseData: function($super,data){
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
