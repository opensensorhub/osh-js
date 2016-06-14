OSH.DataProvider.VideoMjpeg = Class.create(OSH.DataProvider.DataProvider,{
  initialize: function($super,name,properties,options) {
    $super(name,properties,options);
  },
  
  parseTimeStamp: function($super,data){
    return new DataView(data).getFloat64(0, false) * 1000 -  this.androidShift; // read double time stamp as big endian
  },
  
  parseData: function($super,data){
    var imgBlob = new Blob([data]);
    var blobURL = window.URL.createObjectURL(imgBlob.slice(12));
    return blobURL;
  } 
});
