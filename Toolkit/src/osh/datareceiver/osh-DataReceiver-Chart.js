/**
 * @classdesc This datasource provides parsing to chart data.
 * Data has to be under the format : ISODATE,X,Y,
 * @class
 * @inheritdoc
 */
OSH.DataReceiver.Chart = Class.create(OSH.DataReceiver.DataSource,{

  /**
   * Extracts timestamp from the data. The timestamp is the first token got from split(',')
   * @override
   * @inheritdoc
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.Chart
   * @instance
   */
  parseTimeStamp: function($super,data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var t =  new Date(tokens[0]).getTime();
    return t;
  },

  /**
   * Extract data from the message. This split over ",".
   * @override
   * @inheritdoc
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Array} the parsed data as an array of tokens
   * @memberof OSH.DataReceiver.Chart
   * @instance
   */
  parseData: function($super,data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    //skip time
    tokens.shift();
    return tokens;
  } 
});
