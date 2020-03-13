/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

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