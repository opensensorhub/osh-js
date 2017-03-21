/**
 * @classdesc
 * @class OSH.UI.Styler.ImageDraping
 * @type {OSH.UI.Styler}
 * @augments OSH.UI.Styler
 */
OSH.UI.Styler.ImageDraping = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
		this.properties = properties;
		this.platformLocation = null;
		this.platformOrientation = null;
		this.gimbalOrientation = null;
		this.cameraModel = null;
		this.imageSrc = null;
		this.snapshotFunc = null;
		
		this.options = {};
		
		if (typeof(properties.platformLocation) != "undefined"){
			this.platformLocation = properties.platformLocation;
		} 
		
		if (typeof(properties.platformOrientation) != "undefined"){
			this.platformOrientation = properties.platformOrientation;
		} 
		
		if (typeof(properties.gimbalOrientation) != "undefined"){
			this.gimbalOrientation = properties.gimbalOrientation;
		} 
		
		if (typeof(properties.cameraModel) != "undefined"){
			this.cameraModel = properties.cameraModel;
		}
		
		if (typeof(properties.imageSrc) != "undefined"){
			this.imageSrc = properties.imageSrc;
		} 
		
		if (typeof(properties.platformLocationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.platformLocation = properties.platformLocationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.platformLocationFunc.dataSourceIds,fn);
		}
		
		if (typeof(properties.platformOrientationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.platformOrientation = properties.platformOrientationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.platformOrientationFunc.dataSourceIds,fn);
		}
		
		if (typeof(properties.gimbalOrientationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.gimbalOrientation = properties.gimbalOrientationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.gimbalOrientationFunc.dataSourceIds,fn);
		}
		
		if (typeof(properties.cameraModelFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.cameraModel = properties.cameraModelFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.cameraModelFunc.dataSourceIds,fn);
		}
		
		if (typeof(properties.snapshotFunc) != "undefined") {
			this.snapshotFunc = properties.snapshotFunc;
		}
	},

	/**
	 *
	 * @param $super
	 * @param view
	 * @memberof  OSH.UI.Styler.ImageDraping
	 * @instance
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
	 * @memberof  OSH.UI.Styler.ImageDraping
	 * @instance
	 */
	setData: function($super,dataSourceId,rec,view,options) {
		if ($super(dataSourceId,rec,view,options)) {
			
			var enabled = true;
			if (this.snapshotFunc != null)
				enabled = this.snapshotFunc();
			
			if (typeof(view) != "undefined" && enabled &&
				this.platformLocation != null &&
				this.platformOrientation != null &&
				this.gimbalOrientation != null &&
				this.cameraModel != null &&
				this.imageSrc != null) {
				    view.updateDrapedImage(this,rec.timeStamp,options);
			}
		}
	}

});