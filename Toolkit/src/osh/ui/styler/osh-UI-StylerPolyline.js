OSH.UI.Styler.Polyline = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
		this.properties = properties;
		this.locations = [];
     	this.color = 'red';
		this.weight = 1;
		this.opacity = 1;
		this.smoothFactor = 1;
		this.maxPoints = 10;
		
		if(typeof(properties.color) != "undefined"){
			this.color = properties.color;
		} 
		
		if(typeof(properties.weight) != "undefined"){
			this.weight = properties.weight;
		} 
		
		if(typeof(properties.opacity) != "undefined"){
			this.opacity = properties.opacity;
		} 
		
		if(typeof(properties.smoothFactor) != "undefined"){
			this.smoothFactor = properties.smoothFactor;
		} 
		
		if(typeof(properties.maxPoints) != "undefined"){
			this.maxPoints = properties.maxPoints;
		} 
		
		if(typeof(properties.locationFunc) != "undefined") {
			var fn = function(rec) {
				var loc = properties.locationFunc.handler(rec);
				this.locations.push(loc);
				if(this.locations.length > this.maxPoints) {
					this.locations.shift();
				}
			}.bind(this);
			this.addFn(properties.locationFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec) {
				this.color = properties.colorFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.colorFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.weightFunc) != "undefined") {
			var fn = function(rec) {
				this.weight = properties.weightFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.weightFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.opacityFunc) != "undefined") {
			var fn = function(rec) {
				this.opacity = properties.opacityFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.opacityFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.smoothFactorFunc) != "undefined") {
			var fn = function(rec) {
				this.smoothFactor = properties.smoothFactorFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.smoothFactorFunc.dataSourceIds,fn);
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
			if(typeof(view) != "undefined"){
				view.updatePolyline(this);
			}
		}
	}
});