OSH.UI.Styler.Curve = Class.create(OSH.UI.Styler, {
	initialize : function($super, properties) {
		$super(properties);
	},
	
	setData: function($super,dataSourceId,rec,view,options) {
		if($super(dataSourceId,rec,view,options)) {
			//if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
			if(typeof(view) != "undefined") {
				view.updateCurve(this,rec.timeStamp,options);
			}
		}
	}
});