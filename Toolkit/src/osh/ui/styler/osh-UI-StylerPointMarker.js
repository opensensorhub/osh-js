/**
 * @classdesc
 * @class OSH.UI.Styler.PointMarker
 * @type {OSH.UI.Styler}
 */
OSH.UI.Styler.PointMarker = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
		this.properties = properties;
		this.location = null;
		this.orientation = {heading:0};
		this.icon = null;
		this.iconAnchor = [16,16];
		this.label = null;
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
		
		if(typeof(properties.iconAnchor) != "undefined"){
            this.iconAnchor = properties.iconAnchor;
        }
		
		if(typeof(properties.label) != "undefined"){
			this.label = properties.label;
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
		
		if(typeof(properties.labelFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.label = properties.labelFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.labelFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.color = properties.colorFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.colorFunc.dataSourceIds,fn);
		}
	},

	/**
	 *
	 * @param $super
	 * @param view
	 * @memberof OSH.UI.Styler.PointMarker
	 * @instance
	 */
	init: function($super,view) {
		$super(view);
		if(typeof(view) != "undefined" && this.location != null) {
			view.updateMarker(this,0,{});
		}
	},

	/**
	 *
	 * @param $super
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @memberof OSH.UI.Styler.PointMarker
	 * @instance
	 */
	setData: function($super,dataSourceId,rec,view,options) {
		if($super(dataSourceId,rec,view,options)) {
			if (typeof(view) != "undefined" && this.location != null) {
				view.updateMarker(this, rec.timeStamp, options);
			}
		}
	},

	/**
	 *
	 * @param $super
	 * @memberof OSH.UI.Styler.PointMarker
	 * @instance
	 */
	clear:function($super){
	}

});