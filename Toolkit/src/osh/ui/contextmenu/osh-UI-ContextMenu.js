/**
 * @classdesc This class is an abstract class for ContextMenu.
 * @abstract
 * @class OSH.UI.ContextMenu
 * @listens {@link OSH.EventManager.EVENT.CONTEXT_MENU}
 * @param {Object} properties the properties object
 * @param {string} properties.id the context menu id
 */
OSH.UI.ContextMenu = BaseClass.extend({
	initialize : function(properties) {
		if(typeof  properties != "undefined" && typeof  properties.id != "undefined") {
			this.id = properties.id;
		} else {
			this.id = "contextMenu-" + OSH.Utils.randomUUID();
		}
		this.handleEvents();
	},

	/**
	 * Shows the context menu
	 * @memberof OSH.UI.ContextMenu
	 * @instance
	 */
	show:function() {},

	/**
	 * Hides the context menu
	 * @memberof OSH.UI.ContextMenu
	 * @instance
	 */
	hide:function() {},

	/**
	 * Inits events
	 * @memberof OSH.UI.ContextMenu
	 * @instance
	 */
	handleEvents:function() {
		/*
		 * @event {@link OSH.EventManager.EVENT.CONTEXT_MENU}
		 * @type {Object}
		 * @property {Object} event
		 * @property {string} action - show | hide
		 */
		OSH.EventManager.observe(OSH.EventManager.EVENT.CONTEXT_MENU+"-"+this.id,function(event) {
			if(event.action == "show") {
				this.show(event);
			} else if(event.action == "hide") {
				this.hide();
			}
		}.bind(this));
	}
});