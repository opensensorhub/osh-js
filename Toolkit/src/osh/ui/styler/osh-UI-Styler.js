OSH.UI.Styler = Class.create({
	initialize : function(jsonProperties) {
		this.properties = jsonProperties;
		this.id = "styler-" + OSH.Utils.randomUUID();

		this.dataSourceToStylerMap = {};
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

	setData : function($super, dataSourceId, rec, view, options) {
		if (dataSourceId in this.dataSourceToStylerMap) {
			var fnArr = this.dataSourceToStylerMap[dataSourceId];
			for (var i = 0; i < fnArr.length; i++) {
				fnArr[i](rec.data, options);
			}
			return true;
		} else {
			return false;
		}
	},

	getDataSourceIds : function() {
		var res = [];
		for ( var i in this.dataSourceToStylerMap) {
			res.push(i);
		}
		return res;
	}
});