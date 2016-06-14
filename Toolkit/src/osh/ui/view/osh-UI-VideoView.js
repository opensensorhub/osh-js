OSH.UI.VideoView = Class.create(OSH.UI.View, {
	initialize : function($super, divId, options) {

		var type = "";

		if (typeof (options) && options.format) {
			format = options.format;
		}

		var name = "";
		if (typeof (options) && options.name) {
			name = options.name;
		}
		
		this.videoView = null;
		this.dataSourceId = options.dataSourceId;
		
		var currentDivId = divId;
		
		if(typeof(options.draggable) != "undefined" && options.draggable) {
			this.divDialog = document.createElement("div");
			this.divDialog.setAttribute("id", "dialog-"+OSH.Utils.randomUUID());
			  
			document.getElementById(divId).appendChild(this.divDialog);
			
			var divDialogContent = document.createElement("div");
			divDialogContent.setAttribute("id", "dialog-"+OSH.Utils.randomUUID());
			divDialogContent.setAttribute("class","popup-content");
			
			this.dialog = new OSH.UI.Dialog({
	          title: name,
	          div: this.divDialog
			});
			
			this.dialog.appendContent(divDialogContent);
			//this.dialog.setContentSize(contentDiv.width+"px",contentDiv.height+"px");
			this.dialog.setContentSize("150px","150px");
			
			this.css = this.divDialog.className;
			
			currentDivId = divDialogContent.id;
		}
		
		if (format == "mp4") {
			this.videoView = new OSH.UI.Mp4View(currentDivId, options);
		} else if (format == "h264") {
			this.videoView = new OSH.UI.H264View(currentDivId, options);
		} else if(format == "mjpeg") {
			this.videoView = new OSH.UI.MJpegView(currentDivId, options);
		}
	},
	
	setData: function(dataSourceId,data) {
		if(this.videoView != null) {
			this.videoView.setData(dataSourceId,data);
		}
	},
	
	selectDataView: function($super,dataSourceIds) {
		if(typeof(this.divDialog) != "undefined") {
			if(dataSourceIds.indexOf(this.dataSourceId) > -1) {
				this.divDialog.setAttribute("class",this.css+" pop-over-selected");  
			} else {
				this.divDialog.setAttribute("class",this.css);
			}
		} else {
			if(this.videoView != null) {
				this.videoView.selectDataView(dataSourceIds);
			}
		}
	},
	
	getId: function() {
		if(this.videoView != null) {
			this.videoView.getId();
		}
    },
    
    getDivId: function() {
    	if(this.videoView != null) {
			this.videoView.getDivId();
		}
    }
});