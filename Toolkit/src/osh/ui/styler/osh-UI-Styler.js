OSH.UI.Styler = Class.create({
	initialize : function(jsonProperties) {
		this.properties = jsonProperties;
		this.id = "styler-" + OSH.Utils.randomUUID();

		this.dataSourceToStylerMap = {};

		this.initEvents();
	},

	initEvents:function() {
		OSH.EventManager.observe(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME,function(event){
			for ( var i in this.dataSourceToStylerMap) {
				var currentDS = this.dataSourceToStylerMap[i];
				if(currentDS.syncMasterTime) {
					this.clear();
				}
			}
		}.bind(this));
	},

	clear: function() {

	},

	setData : function(dataSourceId, data, view) {
	},

	getId : function() {
		return this.id;
	},

	select : function(dataSourceIds) {
	},

	addFn : function(dataSourceIds, fn) {
		for (var i = 0; i < dataSourceIds.length; i++) {
			var dataSourceId = dataSourceIds[i];
			if (typeof (this.dataSourceToStylerMap[dataSourceId]) == "undefined") {
				this.dataSourceToStylerMap[dataSourceId] = [];
			}
			this.dataSourceToStylerMap[dataSourceId].push(fn);
		}
	},

	setData : function(dataSourceId, rec, view, options) {
		if (dataSourceId in this.dataSourceToStylerMap) {
			var fnArr = this.dataSourceToStylerMap[dataSourceId];
			for (var i = 0; i < fnArr.length; i++) {
				fnArr[i](rec.data, rec.timeStamp, options);
			}
			return true;
		} else {
			return false;
		}
	},

	getDataSourcesIds : function() {
		var res = [];
		for ( var i in this.dataSourceToStylerMap) {
			res.push(i);
		}
		return res;
	},

	init: function() {}
});