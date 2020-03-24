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
import {View} from "../osh-UI-View.js";
import {isDefined} from "../../../osh-Utils.js";
import EventManager from "../../../osh-EventManager.js";

export default class MjpegView extends View {
  constructor(parentElementDivId,options) {
    super(parentElementDivId,[],options);

    // create timestamp slot
    this.timeStamp = null;
    if (isDefined(options.showTime) && options.showTime) {
        this.timeStamp = document.createElement("div");
        this.timeStamp.setAttribute("class", "video-time");
        document.getElementById(this.divId).appendChild(this.timeStamp);
    }

    // creates video tag element
    this.imgTag = document.createElement("img");
    this.imgTag.setAttribute("class", "video-mjpeg");

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
    let self = this;
    EventManager.observeDiv(this.divId,"click",(event) => {
      EventManager.fire(EventManager.EVENT.SELECT_VIEW,{
        dataSourcesIds: [self.dataSourceId],
        entityId : self.entityId
      });
    });
  }

  /**
   *
   * @param $super
   * @param dataSourceId
   * @param data
   * @instance
   * @memberof OSH.UI.MjpegView
   */
  setData(dataSourceId,data) {
      let oldBlobURL = this.imgTag.src;
      this.imgTag.src = data.data;
      if (this.timeStamp !== null) {
          this.timeStamp.innerHTML = new Date(data.timeStamp).toISOString();
      }
      window.URL.revokeObjectURL(oldBlobURL);
  }

  /**
   *
   * @param $super
   * @param dataSourceIds
   * @param entityId
   * @instance
   * @memberof OSH.UI.MjpegView
   */
  selectDataView(dataSourceIds,entityId) {
    if(dataSourceIds.indexOf(this.dataSourceId) > -1 || (isDefined(this.entityId)) && this.entityId === entityId) {
      document.getElementById(this.divId).setAttribute("class",this.css+" "+this.cssSelected);
    } else {
      document.getElementById(this.divId).setAttribute("class",this.css);
    }
  }

  /**
   * @instance
   * @memberof OSH.UI.MjpegView
   */
  reset() {
      this.imgTag.src = "";
  }
}

