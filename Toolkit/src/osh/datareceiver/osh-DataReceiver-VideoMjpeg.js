/**
 * @classdesc This datasource provides parsing to MJPEG raw data.
 * Data: ArrayBuffer
 * @class OSH.DataReceiver.VideoMjpeg
 * @augments OSH.DataReceiver.DataSource
 */
OSH.DataReceiver.VideoMjpeg = Class.create(OSH.DataReceiver.DataSource,{
  initialize: function($super,name,properties,options) {
    $super(name,properties,options);
  },

  /**
   * Extracts timestamp from the message. The timestamp is corresponding to the first 64 bits of the binary message.
   * @param {function} $super the parseTimeStamp super method
   * @param {ArrayBuffer} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.VideoMjpeg
   * @instance
   */
  parseTimeStamp: function($super,data){
    return new DataView(data).getFloat64(0, false) * 1000; // read double time stamp as big endian
  },

  /**
   * Extract data from the message. Creates a Blob object starting at byte 12. (after the 64 bits of the timestamp).
   * @param {function} $super the parseData super method
   * @param {ArrayBuffer} data the data to parse
   * @returns {Blob} the parsed data
   * @memberof OSH.DataReceiver.VideoMjpeg
   * @instance
   */
  parseData: function($super,data){
    var imgBlob = new Blob([data]);
    var blobURL = window.URL.createObjectURL(imgBlob.slice(12));
    return blobURL;
  } 
});
