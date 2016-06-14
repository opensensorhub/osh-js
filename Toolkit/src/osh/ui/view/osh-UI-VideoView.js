OSH.UI.VideoView = Class.create(OSH.UI.View, {
	initialize : function($super, divId, options) {
		$super(divId);

		var type = "";

		if (typeof (options) && options.format) {
			format = options.format;
		}

		this.videoView = null;

		if (format == "mp4") {
			this.videoView = new OSH.UI.Mp4View(divId, options);
		} else if (format == "h264") {
			this.videoView = new OSH.UI.H264View(divId, options);
		} else if(format == "mjpeg") {
			this.videoView = new OSH.UI.MJpegView(divId, options);
		}
	},
	
	setData: function(dataSourceId,data) {
		if(this.videoView != null) {
			this.videoView.setData(dataSourceId,data);
		}
	},
	
	selectDataView: function($super,dataSourceIds) {
		if(this.videoView != null) {
			this.videoView.selectDataView(dataSourceIds);
		}
	}
});