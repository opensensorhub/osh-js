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
 * @classdesc
 * @class OSH.UI.Styler
 * @abstract
 */
OSH.UI.Styler = BaseClass.extend({
	initialize : function(jsonProperties) {
		this.properties = jsonProperties;
		this.id = "styler-" + OSH.Utils.randomUUID();

		this.dataSourceToStylerMap = {};

		this.initEvents();
	},

	/**
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	initEvents:function() {
		OSH.EventManager.observe(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME,function(event){
			this.clear();
		}.bind(this));
	},

	/**
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	clear: function() {

	},

	/**
	 * @param {string} dataSourceId the datasource id
	 * @param {Object} data the data
	 * @param {OSH.View} view the osh.view
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	setData : function(dataSourceId, data, view) {
	},

	/**
	 * Gets the styler id.
	 * @returns {string} the styler id
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	getId : function() {
		return this.id;
	},

	/**
	 * Selects the datasource contained into the list
	 * @param {Array} dataSourceIds the list of datasources
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	select : function(dataSourceIds) {
	},

	/**
	 * Adds a function
	 * @param {Array} dataSourceIds the list of datasources
	 * @param {function} fn the function to apply
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	addFn : function(dataSourceIds, fn) {
		for (var i = 0; i < dataSourceIds.length; i++) {
			var dataSourceId = dataSourceIds[i];
			if (typeof (this.dataSourceToStylerMap[dataSourceId]) == "undefined") {
				this.dataSourceToStylerMap[dataSourceId] = [];
			}
			this.dataSourceToStylerMap[dataSourceId].push(fn);
		}
	},

	/**
	 *
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @returns {boolean}
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
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

	/**
	 *
	 * @returns {Array}
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	getDataSourcesIds : function() {
		var res = [];
		for ( var i in this.dataSourceToStylerMap) {
			res.push(i);
		}
		return res;
	},

	/**
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	init: function() {}
});