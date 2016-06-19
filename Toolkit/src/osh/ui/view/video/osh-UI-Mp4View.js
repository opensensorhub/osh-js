OSH.UI.Mp4View = Class.create(OSH.UI.View,{
  initialize: function($super,divId,options) {
    $super(divId);
    
    this.dataSourceId = -1;
    // sets dataSourceId
    if(typeof(options.dataSourceId) != "undefined") {
    	this.dataSourceId = options.dataSourceId;
    }
    
    var width = "640";
    var height = "480";
    this.cssSelected = "";
    
    var width = "640";
    var height = "480";
    this.css = "";
    
    this.cssSelected = "";
    
    if(options.width) {
    	width = options.width;
    }
    
    if(options.height) {
    	height = options.height;
    }
    
    if(options.css) {
    	this.css = options.css;
    }
    
    if(options.cssSelected) {
    	this.cssSelected = options.cssSelected;
    }
    
    this.codecs = "avc1.64001E";
    //this.codecs="avc1.42401F";
    
    if(options.codecs) {
      this.codecs = options.codecs;
    }
    
    // creates video tag element
    this.video = document.createElement("video");
    this.video.setAttribute("height", height);
    this.video.setAttribute("control", '');
    this.video.setAttribute("width", width);
    this.video.setAttribute("class", this.css);
    // appends <video> tag to <div>
    document.getElementById(this.divId).appendChild(this.video);
    
 // adds listener
    $(this.divId).observe("click", function(event) {
    	$(this.divId).fire("osh:select", [this.dataSourceId]);
    }.bind(this));
    
    // creates MediaSource object
    this.mediaSource = new MediaSource();
    this.buffer = null;
    this.queue = [];
    
    this.video.src = window.URL.createObjectURL(this.mediaSource);
    
    this.mediaSource.addEventListener('sourceopen', function(e) {
      this.mediaSource.duration = 10000000;
      this.video.play();

      this.buffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="'+this.codecs+'"');
      
      var mediaSource = this.mediaSource;
      
      this.buffer.addEventListener('updatestart', function(e) { 
        /*console.log('updatestart: ' + mediaSource.readyState);*/ 
        if(this.queue.length > 0 && !this.buffer.updating) {
          this.buffer.appendBuffer(this.queue.shift());
        }
      }.bind(this));
      this.buffer.addEventListener('updateend', function(e) { /*console.log('updateend: ' + mediaSource.readyState);*/ });
      this.buffer.addEventListener('error', function(e) { /*console.log('error: ' + mediaSource.readyState);*/ });
      this.buffer.addEventListener('abort', function(e) { /*console.log('abort: ' + mediaSource.readyState);*/ });

      this.buffer.addEventListener('update', function() { // Note: Have tried 'updateend'
        if(this.queue.length > 0 && !this.buffer.updating) {
          this.buffer.appendBuffer(this.queue.shift());
        }
      }.bind(this));
    }.bind(this), false);

     var mediaSource = this.mediaSource;
      
    this.mediaSource.addEventListener('sourceopen', function(e) { /*console.log('sourceopen: ' + mediaSource.readyState);*/ });
    this.mediaSource.addEventListener('sourceended', function(e) { /*console.log('sourceended: ' + mediaSource.readyState);*/ });
    this.mediaSource.addEventListener('sourceclose', function(e) { /*console.log('sourceclose: ' + mediaSource.readyState);*/ });
    this.mediaSource.addEventListener('error', function(e) { /*console.log('error: ' + mediaSource.readyState);*/ });
    
  },
  
  setData: function(dataSourceId,data) {
	if(dataSourceId == this.dataSourceId) {  
	    if (this.buffer.updating || this.queue.length > 0) {
	      this.queue.push(data.data);
	    } else {
	      this.buffer.appendBuffer(data.data);
	    }
	}
  },
  
  selectDataView: function($super,dataSourceIds) {
	  if(dataSourceIds.indexOf(this.dataSourceId) > -1) {
		  this.video.setAttribute("class",this.css+" "+this.cssSelected);  
	  } else {
		  this.video.setAttribute("class",this.css);
	  }
  }
});