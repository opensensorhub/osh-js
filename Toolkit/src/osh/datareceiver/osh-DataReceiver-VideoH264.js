OSH.DataReceiver.VideoH264 = Class.create(OSH.DataReceiver.DataSource,{
  initialize: function($super,name,properties,options) {
    $super(name,properties,options);
  },
  
  parseTimeStamp: function($super,data){
	// read double time stamp as big endian
    return new DataView(data).getFloat64(0, false)*1000;
  },
  
  parseData: function($super,data){
    var len = data.byteLength;
    return new Uint8Array(data, 12, len-12); // H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length
  }
});

