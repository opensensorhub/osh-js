OSH.UI.ContextMenu = Class.create({
	initialize : function(properties) {
		if(typeof  properties != "undefined" && typeof  properties.id != "undefined") {
			this.id = properties.id;
		} else {
			this.id = "contextMenu-" + OSH.Utils.randomUUID();
		}
		this.handleEvents();
	},

	show:function() {},

	hide:function() {},

	handleEvents:function() {
		OSH.EventManager.observe(OSH.EventManager.EVENT.CONTEXT_MENU+"-"+this.id,function(event) {
			if(event.action == "show") {
				this.show(event);
			} else if(event.action == "hide") {
				this.hide();
			}
		}.bind(this));
	}
});