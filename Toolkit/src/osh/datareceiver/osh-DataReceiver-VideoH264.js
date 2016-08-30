/**
 * @classdesc This datasource provides parsing to H264 raw data.
 * Data: ArrayBuffer
 * @class OSH.DataReceiver.VideoH264
 * @inheritdoc
 */
OSH.DataReceiver.VideoH264 = Class.create(OSH.DataReceiver.DataSource,{
  initialize: function($super,name,properties,options) {
    $super(name,properties,options);
  },

  /**
   * Extracts timestamp from the message. The timestamp is corresponding to the first 64bits of the binary message.
   * @override
   * @inheritdoc
   * @param {function} $super the parseTimeStamp super method
   * @param {ArrayBuffer} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.VideoH264
   * @instance
   */
  parseTimeStamp: function($super,data){
	// read double time stamp as big endian
    return new DataView(data).getFloat64(0, false)*1000;
  },

  /**
   * Extract data from the message. The H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length.
   * @override
   * @inheritdoc
   * @param {function} $super the parseData super method
   * @param {ArrayBuffer} data the data to parse
   * @returns {Uint8Array} the parsed data
   * @memberof OSH.DataReceiver.VideoH264
   * @instance
   */
  parseData: function($super,data){
    var len = data.byteLength;
    return new Uint8Array(data, 12, len-12); // H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length
  }
});

