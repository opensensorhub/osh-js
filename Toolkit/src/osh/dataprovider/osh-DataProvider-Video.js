OSH.DataProvider.Video = Class.create(OSH.DataProvider.DataProvider,{
  initialize: function($super,name,properties,options) {
    $super(name,properties,options);
    
    var format = "";
    
    if(typeof(options) && options.format) {
    	format = options.format;
    }
    
    this.videoDataSource = null;
    
    if(format == "mp4") {
      this.videoDataSource = new OSH.DataProvider.VideoMp4(name,properties);
    } else if(format == "h264") {
      this.videoDataSource = new OSH.DataProvider.VideoH264(name,properties);
    } else if(format == "mjpeg"){
      this.videoDataSource = new OSH.DataProvider.VideoMjpeg(name,properties);
    }
  },
  
  parseTimeStamp: function($super,data){
	if(typeof(this.videoDataSource) == "undefined") {
		return {};
	} else {
		return this.videoDataSource.parseTimeStamp(data);
	}
  },
  
  parseData: function($super,data){
	if(typeof(this.videoDataSource) == "undefined") {
		return {};
	} else {
		return this.videoDataSource.parseData(data);
	}
  }
});
