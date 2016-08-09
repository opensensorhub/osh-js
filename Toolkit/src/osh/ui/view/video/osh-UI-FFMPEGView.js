OSH.UI.FFMPEGView = Class.create(OSH.UI.View, {
	initialize : function($super, divId, options) {
		$super(divId,[],options);

		var width = "640";
		var height = "480";
		
		if(typeof options != "undefined") {
			if (options.width) {
				width = options.width;
			}

			if (options.height) {
				height = options.height;
			}
		}

		// register all compiled codecs
		Module.ccall('avcodec_register_all');

	    // find h264 decoder
	    var codec = Module.ccall('avcodec_find_decoder_by_name', 'number', ['string'], ["h264"]);
	    if (codec == 0)
	    {
	        console.error("Could not find H264 codec");
	        return;
	    }

	    // init codec and conversion context
	    this.av_ctx = _avcodec_alloc_context3(codec);
	    
	    // open codec
	    var ret = _avcodec_open2(this.av_ctx, codec, 0);
	    if (ret < 0)
	    {
	    	console.error("Could not initialize codec");
	    	return;
	    }
	    
	    // allocate packet
	    this.av_pkt = Module._malloc(96);	    
	    this.av_pktData = Module._malloc(1024*150);
	    _av_init_packet(this.av_pkt);
	    Module.setValue(this.av_pkt+24, this.av_pktData, '*');

	    // allocate video frame
	    this.av_frame = _avcodec_alloc_frame();
	    if (!this.av_frame)
	        alert("Could not allocate video frame");

	    // init decode frame function
	    this.got_frame = Module._malloc(4);

	    // create webGL canvas
	    this.yuvCanvas = new YUVCanvas({width: width, height: height});
		var domNode = document.getElementById(this.divId);
		domNode.appendChild(this.yuvCanvas.canvasElement);

		// add selection listener
		var self = this;
		OSH.EventManager.observeDiv(this.divId,"click",function(event){
			OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
				dataSourcesIds: [self.dataSourceId],
				entityId : self.entityId
			});
		});
	},

	setData : function(dataSourceId, data) {
	   
	   var pktData = data.data;
	   var pktSize = pktData.length;
	   
	   // prepare packet
       Module.setValue(this.av_pkt+28, pktSize, 'i32');
       Module.writeArrayToMemory(pktData, this.av_pktData);
	  
       // decode next frame
       var len = _avcodec_decode_video2(this.av_ctx, this.av_frame, this.got_frame, this.av_pkt);
       if (len < 0) {
          console.log("Error while decoding frame");
          return;
       }

       if (Module.getValue(this.got_frame, 'i8') == 0) {
          //console.log("No frame");
          return;
       }

       var decoded_frame = this.av_frame;
       var frame_width = Module.getValue(decoded_frame+68, 'i32');
	   var frame_height = Module.getValue(decoded_frame+72, 'i32'); 
	   //console.log("Decoded Frame, W=" + frame_width + ", H=" + frame_height);

	   // copy Y channel to canvas
	   var frameYDataPtr = Module.getValue(decoded_frame, '*');
	   var frameUDataPtr = Module.getValue(decoded_frame+4, '*');
	   var frameVDataPtr = Module.getValue(decoded_frame+8, '*');          
	   var frameYData = new Uint8Array(Module.HEAPU8.buffer, frameYDataPtr, frame_width*frame_height);
	   var frameUData = new Uint8Array(Module.HEAPU8.buffer, frameUDataPtr, frame_width/2*frame_height/2);
	   var frameVData = new Uint8Array(Module.HEAPU8.buffer, frameVDataPtr, frame_width/2*frame_height/2);

	   this.yuvCanvas.drawNextOuptutPictureGL({
	      yData: frameYData,
          yDataPerRow: frame_width,
          yRowCnt: frame_height,
	      uData: frameUData,
          uDataPerRow: frame_width/2,
          uRowCnt: frame_height/2,
	      vData: frameVData,
          vDataPerRow: frame_width/2,
          vRowCnt: frame_height/2
	   });
	},
	
	
	selectDataView: function($super,dataSourceIds,entityId) {
	    if(dataSourceIds.indexOf(this.dataSourceId) > -1 || (typeof this.entityId != "undefined") && this.entityId == entityId) {
	      document.getElementById(this.divId).setAttribute("class",this.css+" "+this.cssSelected);
	    } else {
	      document.getElementById(this.divId).setAttribute("class",this.css);
	    }
	}
});