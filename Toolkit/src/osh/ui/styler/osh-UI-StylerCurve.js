/**
 * @classdesc
 * @class OSH.UI.Styler.Curve
 * @type {OSH.UI.Style}
 */
OSH.UI.Styler.Curve = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
		this.xLabel = "";
		this.yLabel = "";
		this.color = "#000000";
		this.stroke = 1;
		this.x = 0;
		this.y = [];
		
		if(typeof(properties.stroke) != "undefined"){
			this.stroke = properties.stroke;
		} 
		
		if(typeof(properties.color) != "undefined"){
			this.color = properties.color;
		} 
		
		if(typeof(properties.x) != "undefined"){
			this.x = properties.x;
		} 
		
		if(typeof(properties.y) != "undefined"){
			this.y = properties.y;
		} 
		
		if(typeof(properties.strokeFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.stroke = properties.strokeFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.strokeFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.color = properties.colorFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.colorFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.valuesFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				var values = properties.valuesFunc.handler(rec,timeStamp,options);
				this.x = values.x;
				this.y = values.y;
			}.bind(this);
			this.addFn(properties.valuesFunc.dataSourceIds,fn);
		}
	},

	/**
	 * @override
	 * @param $super
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @instance
	 * @memberof OSH.UI.Styler.Curve
	 */
	setData: function($super,dataSourceId,rec,view,options) {
		if($super(dataSourceId,rec,view,options)) {
			//if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
			if(typeof(view) != "undefined") {
				view.updateCurve(this,rec.timeStamp,options);
			}
		}
	}
});