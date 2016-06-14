OSH.UI.Styler.PointMarker = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
		this.properties = properties;
		this.location = {x:0,y:0,z:0};
		this.orientation = {heading:0};
		this.icon = null;
		this.color = "#000000";
		
		this.functions = [];
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
			this.functions.push(properties.locationFunc);
			var fn = function(rec,options) {
				this.location = properties.locationFunc.handler(rec,options);
			}.bind(this);
			this.addFn(properties.locationFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.orientationFunc) != "undefined") {
			var fn = function(rec,options) {
				this.orientation = properties.orientationFunc.handler(rec,options);
			}.bind(this);
			this.addFn(properties.orientationFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.iconFunc) != "undefined") {
			var fn = function(rec,options) {
				this.icon = properties.iconFunc.handler(rec,options);
			}.bind(this);
			this.addFn(properties.iconFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec,options) {
				this.color = properties.colorFunc.handler(rec,options);
			}.bind(this);
			this.addFn(properties.colorFunc.dataSourceIds,fn);
		}
	},
	
	addFn : function(dataSourceIds, fn) {
		for(var i = 0; i < dataSourceIds.length; i++) {
			var dataSourceId = dataSourceIds[i];
			if(typeof(this.dataSourceToStylerMap[dataSourceId]) == "undefined") {
				this.dataSourceToStylerMap[dataSourceId] = [];
			}
			this.dataSourceToStylerMap[dataSourceId].push(fn);
		}
	},
	
	setData: function($super,dataSourceId,rec,view,options) {
		if (dataSourceId in this.dataSourceToStylerMap) {
			var fnArr = this.dataSourceToStylerMap[dataSourceId];
			for(var i=0; i < fnArr.length;i++) {
				fnArr[i](rec.data,options);
			}
			//if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
			if(typeof(view) != "undefined") {
				view.updateMarker(this,rec.timeStamp,options);
			}
		}
	},
	
	getDataSourceIds: function() {
		var res = [];
		for (var i in this.dataSourceToStylerMap) {
			res.push(i);
		}
		return res;
	}
});