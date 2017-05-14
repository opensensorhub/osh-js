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
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
var videoView = new OSH.UI.MjpegView("containerId", {
    dataSourceId: datasource.id,
    entityId : entity.id,
    css: "video",
    cssSelected: "video-selected",
    name: "Video"
});
 */
OSH.UI.MjpegView = OSH.UI.View.extend({
  initialize: function(parentElementDivId,options) {
    this._super(parentElementDivId,[],options);

    // creates video tag element
    this.imgTag = document.createElement("img");
    this.imgTag.setAttribute("id", "dataview-"+OSH.Utils.randomUUID());

    // rotation option
    this.rotation = 0;
    if (typeof(options) != "undefined" && typeof(options.rotation) != "undefined") {
        this.rotation = options.rotation*Math.PI/180;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 640;
        this.canvas.height = 480;
        var ctx = this.canvas.getContext('2d');
        ctx.translate(0, 480) ;
        ctx.rotate(this.rotation);
        document.getElementById(this.divId).appendChild(this.canvas);
    } else {
        // appends <img> tag to <div>
        document.getElementById(this.divId).appendChild(this.imgTag);
    }

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
   * @param $super
   * @param dataSourceId
   * @param data
   * @instance
   * @memberof OSH.UI.MjpegView
   */
  setData: function(dataSourceId,data) {
      var oldBlobURL = this.imgTag.src;
      this.imgTag.src = data.data;
      window.URL.revokeObjectURL(oldBlobURL);
  },

  /**
   *
   * @param $super
   * @param dataSourceIds
   * @param entityId
   * @instance
   * @memberof OSH.UI.MjpegView
   */
  selectDataView: function(dataSourceIds,entityId) {
    if(dataSourceIds.indexOf(this.dataSourceId) > -1 || (typeof this.entityId != "undefined") && this.entityId == entityId) {
      document.getElementById(this.divId).setAttribute("class",this.css+" "+this.cssSelected);
    } else {
      document.getElementById(this.divId).setAttribute("class",this.css);
    }
  },

  /**
   * @instance
   * @memberof OSH.UI.MjpegView
   */
  reset: function() {
      this.imgTag.src = "";
  }
});

