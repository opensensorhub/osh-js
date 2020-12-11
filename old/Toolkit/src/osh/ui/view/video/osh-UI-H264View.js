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
 * @class
 * @classdesc
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 */
OSH.UI.H264View = OSH.UI.View.extend({
	initialize : function(parentElementDivId, options) {
		this._super(parentElementDivId,[],options);

		var width = "640";
		var height = "480";
		
		if(typeof options != "undefined") {
			if (options.width) {
				width = options.width;
			}

			if (options.height) {
				height = options.height;
			}
		}

		var useWorker = false;
		var reuseMemory = false;
		var webgl = "auto";
		this.hasSps = false;

		this.avcWs = new Player({
			useWorker : useWorker,
			reuseMemory : reuseMemory,
			webgl : webgl,
			size : {
				width : width,
				height : height
			}
		});

		this.video = this.avcWs.canvas
		this.video.setAttribute("width", width);
		this.video.setAttribute("height", height);
		var domNode = document.getElementById(this.divId);
		domNode.appendChild(this.video);

		// adds listener
		var self = this;
		OSH.EventManager.observeDiv(this.divId,"click",function(event){
			OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
				dataSourcesIds: [self.dataSourceId],
				entityId : self.entityId
			});
		});
	},

	/**
	 *
	 * @param fullNal
	 * @instance
	 * @memberof OSH.UI.H264View
	 */
	decode : function(fullNal) {
		this.avcWs.decode(fullNal);
	},

	/**
	 *
	 * @param dataSourceId
	 * @param data
	 * @instance
	 * @memberof OSH.UI.H264View
	 */
	setData : function(dataSourceId, data) {
		this.computeFullNalFromRaw(data.data, function(nal) {
			var nalType = nal[0] & 0x1F;
			//7 => PPS
			//8 => SPS
			//6 => SEI
			//5 => IDR
			if (nalType != 7 && nalType != 8 && nalType != 1
					&& nalType != 5 & nalType != 6)
				return;
			if (nalType == 7)
				this.hasSps = true;
			if (this.hasSps) {
				this.decode(nal);
			}
		}.bind(this));
	},

	/**
	 *
	 * @param data
	 * @param callback
	 * @instance
	 * @memberof OSH.UI.H264View
	 */
	computeFullNalFromRaw : function(data, callback) {
		if (!(data && data.length)) {
			return;
		} else {
			var endIndex = -1;
			var firstIndex = -1;

			// find first NAL separator
			var nalSeparator = false;
			while ((firstIndex = data.indexOf(1, firstIndex + 1)) != -1) {
				nalSeparator = data[firstIndex - 1] == 0;
				nalSeparator &= data[firstIndex - 2] == 0;
				nalSeparator &= data[firstIndex - 3] == 0;
				if (nalSeparator)
					break;
			}

			//if found a NAL separator
			if (nalSeparator) {
				endIndex = firstIndex;
				//gets the data until the next separator
				while ((endIndex = data.indexOf(1, endIndex + 1)) != -1) {
					nalSeparator = data[endIndex - 1] == 0;
					nalSeparator &= data[endIndex - 2] == 0;
					nalSeparator &= data[endIndex - 3] == 0;

					//end separator found, callback full NAL unit
					if (nalSeparator) {
						callback(data.subarray(firstIndex + 1, endIndex - 3)); // subarray provides a new view of the array
						firstIndex = endIndex;
					}
				}

				if (endIndex == -1) {
					//otherwise = end of buffer       
					callback(data.subarray(firstIndex + 1, data.length)); // subarray provides a new view of the array
					firstIndex = endIndex;
				}
			}
		}
	},

	/**
	 *
	 * @param $super
	 * @param dataSourceIds
	 * @param entityId
	 * @instance
	 * @memberof OSH.UI.H264View
	 */
	selectDataView: function(dataSourceIds,entityId) {
	    if(dataSourceIds.indexOf(this.dataSourceId) > -1 || (typeof this.entityId != "undefined") && this.entityId == entityId) {
	      document.getElementById(this.divId).setAttribute("class",this.css+" "+this.cssSelected);
	    } else {
	      document.getElementById(this.divId).setAttribute("class",this.css);
	    }
	}
});