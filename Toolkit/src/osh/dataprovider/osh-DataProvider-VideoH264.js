OSH.DataProvider.VideoH264 = Class.create(OSH.DataProvider.DataProvider,{
  initialize: function($super,name,properties,options) {
    $super(name,properties,options);
  },
  
  parseTimeStamp: function($super,data){
    //gets the timeStamp
    return new DataView(data).getFloat64(0, false); // read double time stamp as big endian
  },
  
  parseData: function($super,data){
    var len = data.byteLength;
    return new Uint8Array(data, 8, len-8); // H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length
  }
});

