OSH.UI.Styler = Class.create({
    initialize:function(jsonProperties) {
    	this.properties = jsonProperties;
    	this.id = "styler-"+OSH.Utils.randomUUID();
    	
    	this.dataSourceToStylerMap = {};
    },
    
    setData: function(dataSourceId,data, view) {},
    
    getId: function() {
    	return this.id;
    },
    
    select: function(dataSourceIds) {}
});