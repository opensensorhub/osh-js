/**
 * @classdesc
 * @class OSH.UI.Styler.Nexrad
 * @type {OSH.UI.Styler}
 */
OSH.UI.Styler.Nexrad = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
		this.properties = properties;
		this.location = null;
		this.radialData = null;
		
		this.options = {};
		
		if (typeof(properties.location) != "undefined"){
			this.location = properties.location;
		}  
		
		if (typeof(properties.radialData) != "undefined"){
			this.radialData = properties.radialData;
		} 
		
		if (typeof(properties.locationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.location = properties.locationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.locationFunc.dataSourceIds,fn);
		}
		
		if (typeof(properties.radialDataFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.radialData = properties.radialDataFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.radialDataFunc.dataSourceIds,fn);
		}
		
		this.reflectivityColorMap = [
			Cesium.Color.fromBytes(100, 100, 100),
			Cesium.Color.fromBytes(204, 255, 255),
			Cesium.Color.fromBytes(204, 153, 204),
			Cesium.Color.fromBytes(153, 102, 153),
			Cesium.Color.fromBytes(102,  51, 102),
			Cesium.Color.fromBytes(204, 204, 153),
			Cesium.Color.fromBytes(153, 153, 102),
			Cesium.Color.fromBytes(100, 100, 100),
			Cesium.Color.fromBytes(  4, 233, 231),
			Cesium.Color.fromBytes(  1, 159, 244),
			Cesium.Color.fromBytes(  3,   0, 244),
			Cesium.Color.fromBytes(  2, 253,   2),
			Cesium.Color.fromBytes(  1, 197,   1),
			Cesium.Color.fromBytes(  0, 142,   0),
			Cesium.Color.fromBytes(253, 248,   2),
			Cesium.Color.fromBytes(229, 188,   0),
			Cesium.Color.fromBytes(253, 149,   0),
			Cesium.Color.fromBytes(253,   0,   0),
			Cesium.Color.fromBytes(212,   0,   0),
			Cesium.Color.fromBytes(188,   0,   0),
			Cesium.Color.fromBytes(248,   0, 253),
			Cesium.Color.fromBytes(152,  84, 198),
			Cesium.Color.fromBytes(253, 253, 253)
		];
		
		this.pointCollection = new Cesium.PointPrimitiveCollection();
		this.radialCount = 0;
	},

	/**
	 *
	 * @param $super
	 * @param view
	 * @instance
	 * @memberof OSH.UI.Styler.Nexrad
	 */
	init: function($super,view) {
		$super(view);
	},

	/**
	 *
	 * @param $super
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @instance
	 * @memberof OSH.UI.Styler.Nexrad
	 */
	setData: function($super,dataSourceId,rec,view,options) {
		if ($super(dataSourceId,rec,view,options)) {
			if (typeof(view) != "undefined") {
				
				var DTR = Math.PI/180;
				
				// keep only first elevation
				if (rec.data.elevation > 0.7)
					return;
				
				// draw directly in Cesium view
				var radarLoc = Cesium.Cartesian3.fromDegrees(this.location.x, this.location.y, this.location.z);
				var quat = Cesium.Transforms.headingPitchRollQuaternion(radarLoc, (rec.data.azimuth-90)*DTR, rec.data.elevation*DTR, 0.0);
				var rotM = Cesium.Matrix3.fromQuaternion(quat);
				
				var points = new Cesium.PointPrimitiveCollection();
				var dist0 = rec.data.rangeToCenterOfFirstRefGate;
				var step = rec.data.refGateSize;
				for (var i=0; i<rec.data.reflectivity.length; i++) {
					
				   var val = rec.data.reflectivity[i];
				   
				   // skip points that are out of range
				   if (val < -32 || val > 94.5)
					  continue;
				   
				   var gatePos = new Cesium.Cartesian3(dist0 + i*step, 0, 0);
				   Cesium.Matrix3.multiplyByVector(rotM, gatePos, gatePos);
				   
				   // apply color map and add point to collection
				   this.pointCollection.add({
					  position : Cesium.Cartesian3.add(radarLoc, gatePos, gatePos),
					  color : this.getReflectivityColor(val),
					  pixelSize : 3
				   });
				}
				
				this.radialCount++;
				if (this.radialCount == 100)
			    {
					view.viewer.scene.primitives.add(this.pointCollection);
					this.pointCollection = new Cesium.PointPrimitiveCollection();
					this.radialCount = 0;
			    }
			}
		}
	},

	/**
	 *
	 * @param val
	 * @returns {*}
	 * @instance
	 * @memberof OSH.UI.Styler.Nexrad
	 */
	getReflectivityColor: function(val)
	{
		var index = Math.floor((val + 30) / 5) + 1;
	    return this.reflectivityColorMap[index];
	}

});