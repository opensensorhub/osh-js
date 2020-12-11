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
 var videoView = new OSH.UI.Mp4View("videoContainer-id", {
    dataSourceId: videoDataSource.id,
    css: "video",
    cssSelected: "video-selected",
    name: "Video"
 });
 */
OSH.UI.Mp4View = OSH.UI.View.extend({
  initialize: function(parentElementDivId,options) {
    this._super(parentElementDivId,[],options);

    var width = "640";
    var height = "480";

    var width = "640";
    var height = "480";

    this.codecs = "avc1.64001E";
    //this.codecs="avc1.42401F";
    //this.codecs = 'avc1.42E01E';

      if(typeof options != "undefined" ) {
      if (options.css) {
        this.css = options.css;
      }

      //this.codecs="avc1.42401F";

      if (options.codecs) {
        this.codecs = options.codecs;
      }
    }

    // creates video tag element
    this.video = document.createElement("video");
    this.video.setAttribute("control", '');
    // appends <video> tag to <div>
    document.getElementById(this.divId).appendChild(this.video);

    // adds listener
    var self = this;
    OSH.EventManager.observeDiv(this.divId,"click",function(event){
      OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
        dataSourcesIds: [self.dataSourceId],
        entityId : self.entityId
      });
    });

    // creates MediaSource object
    this.mediaSource = new MediaSource();
    this.buffer = null;
    this.queue = [];

    this.video.src = window.URL.createObjectURL(this.mediaSource);

    this.mediaSource.addEventListener('sourceopen', function(e) {
      this.mediaSource.duration = 10000000;
      this.video.play();

        /**
         * avc1.42E01E: H.264 Constrained Baseline Profile Level 3
           avc1.4D401E: H.264 Main Profile Level 3
           avc1.64001E: H.264 High Profile Level 3
         */
      this.buffer = this.mediaSource.addSourceBuffer('	video/mp4; codecs="avc1.64001E"; profiles="isom,iso2,avc1,iso6,mp41"');

      var mediaSource = this.mediaSource;

      this.buffer.addEventListener('updatestart', function(e) {
        /*console.log('updatestart: ' + mediaSource.readyState);*/
        if(this.queue.length > 0 && !this.buffer.updating) {
          this.buffer.appendBuffer(this.queue.shift());
        }
      }.bind(this));
      this.buffer.addEventListener('error', function(e) { /*console.log('error: ' + mediaSource.readyState);*/ });
      this.buffer.addEventListener('abort', function(e) { /*console.log('abort: ' + mediaSource.readyState);*/ });

      this.buffer.addEventListener('updateend', function() { // Note: Have tried 'updateend'
        if(this.queue.length > 0) {
          this.buffer.appendBuffer(this.queue.shift());
        }
      }.bind(this));
    }.bind(this), false);

     var mediaSource = this.mediaSource;

    this.mediaSource.addEventListener('sourceopen', function(e) { /*console.log('sourceopen: ' + mediaSource.readyState);*/ });
    this.mediaSource.addEventListener('sourceended', function(e) { /*console.log('sourceended: ' + mediaSource.readyState);*/ });
    this.mediaSource.addEventListener('sourceclose', function(e) { /*console.log('sourceclose: ' + mediaSource.readyState);*/ });
    this.mediaSource.addEventListener('error', function(e) { /*console.log('error: ' + mediaSource.readyState);*/ });

    OSH.EventManager.observeDiv(this.divId, "click", function (event) {
        OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
            dataSourcesIds: [self.dataSourceId],
            entityId: self.entityId
        });
    });

  },

  /**
   *
   * @param dataSourceId
   * @param data
   * @instance
   * @memberof OSH.UI.Mp4View
   */
  setData: function(dataSourceId,data) {
      if (this.buffer.updating || this.queue.length > 0) {
        this.queue.push(data.data);
      } else {
        this.buffer.appendBuffer(data.data);
      }
      /*if(!this.buffer.updating) {
          this.buffer.appendBuffer(data.data);
      }*/
  },

  /**
   *
   * @param $super
   * @param dataSourceIds
   * @param entityId
   * @instance
   * @memberof OSH.UI.Mp4View
   */
  selectDataView: function(dataSourceIds, entityId) {
	  if(dataSourceIds.indexOf(this.dataSourceId) > -1 || (typeof this.entityId != "undefined") && this.entityId == entityId) {
		  document.getElementById(this.divId).setAttribute("class",this.css+" "+this.cssSelected);
	  } else {
          document.getElementById(this.divId).setAttribute("class",this.css);
	  }
  }
});