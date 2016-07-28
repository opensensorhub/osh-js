OSH.UI.Styler.PointMarker = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
		this.properties = properties;
		this.location;
		this.orientation = {heading:0};
		this.icon = null;
		this.color = "#000000";
		
		this.options = {};
		
		if(typeof(properties.location) != "undefined"){
			this.location = properties.location;
		} 
		
		if(typeof(properties.orientation) != "undefined"){
			this.orientation = properties.orientation;
		} 
		
		if(typeof(properties.icon) != "undefined"){
			this.icon = properties.icon;
		} 
		
		if(typeof(properties.color) != "undefined"){
			this.color = properties.color;
		} 
		
		if(typeof(properties.locationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.location = properties.locationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.locationFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.orientationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.orientation = properties.orientationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.orientationFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.iconFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.icon = properties.iconFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.iconFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.color = properties.colorFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.colorFunc.dataSourceIds,fn);
		}
	},

	init: function($super,view) {
		$super(view);
		if(typeof(view) != "undefined" && typeof(this.location) != "undefined") {
			view.updateMarker(this,0,{});
		}
	},

	setData: function($super,dataSourceId,rec,view,options) {
		if($super(dataSourceId,rec,view,options)) {
			//if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
			if (typeof(view) != "undefined" && typeof(this.location) != "undefined") {
				view.updateMarker(this,rec.timeStamp,options);
			}
		}
	}

});