OSH.UI.MjpegView = Class.create(OSH.UI.View,{
  initialize: function($super,divId,options) {
    $super(divId,[],options);
    
    this.dataSourceId = -1;
    // sets dataSourceId
    if(typeof(options.dataSourceId) != "undefined") {
    	this.dataSourceId = options.dataSourceId;
    }
    this.css = "";
    
    this.cssSelected = "";
    
    if(options.css) {
    	this.css = options.css;
    }
    
    if(options.cssSelected) {
    	this.cssSelected = options.cssSelected;
    }
    
    // creates video tag element
    this.imgTag = document.createElement("img");
    this.imgTag.setAttribute("class", this.css);
    this.imgTag.setAttribute("id", "dataview-"+OSH.Utils.randomUUID());
    
    // appends <img> tag to <div>
    document.getElementById(this.divId).appendChild(this.imgTag);
    
    // adds listener
    $(this.divId).observe("click", function(event) {
    	$(this.divId).fire("osh:select", [this.dataSourceId]);
    }.bind(this));
  },
  
  setData: function(dataSourceId,data) {
	if(dataSourceId == this.dataSourceId) {
	    var oldBlobURL = this.imgTag.src;
	    this.imgTag.src = data.data;
	    window.URL.revokeObjectURL(oldBlobURL);
	}
  },
  
  selectDataView: function($super,dataSourceIds) {
	  if(dataSourceIds.indexOf(this.dataSourceId) > -1) {
		  this.imgTag.setAttribute("class",this.css+" "+this.cssSelected);  
	  } else {
		  this.imgTag.setAttribute("class",this.css);
	  }
  }
});