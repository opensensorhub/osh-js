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
    initialize: function (divId, options) {
        this._super(divId, [], options);

        var width = "640";
        var height = "480";

        var width = "640";
        var height = "480";

        this.codecs = "avc1.64001E";
        //this.codecs="avc1.42401F";
        //this.codecs = 'avc1.42E01E';

        if (typeof options != "undefined") {
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

        var mediaSource = new MediaSource();
        this.video.src = window.URL.createObjectURL(mediaSource);


        this.sourceBuffer = null;

        mediaSource.addEventListener('sourceopen', function () {
            this.sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.640029"');
            this.sourceBuffer.mode = 'sequence';
            this.video.play();

            this.sourceBuffer.addEventListener('error', function (e) {
                console.log("Error: " + e);
            });
            this.sourceBuffer.addEventListener('updateend', function(e) { console.log(e);});
            this.sourceBuffer.addEventListener('error', function(e) {console.log("Error: " + e);});
            this.sourceBuffer.addEventListener('abort', function(e) { console.log("Error: " + e); });

        }.bind(this));
        // appends <video> tag to <div>
        document.getElementById(this.divId).appendChild(this.video);

        // adds listener


    },

    /**
     *
     * @param dataSourceId
     * @param data
     * @instance
     * @memberof OSH.UI.Mp4View
     */
    setData: function (dataSourceId, data) {
        if (!this.sourceBuffer.updating){
            this.sourceBuffer.appendBuffer(data.data);
        }
    },

    /**
     *
     * @param $super
     * @param dataSourceIds
     * @param entityId
     * @instance
     * @memberof OSH.UI.Mp4View
     */
    selectDataView: function (dataSourceIds, entityId) {
        if (dataSourceIds.indexOf(this.dataSourceId) > -1 || (typeof this.entityId != "undefined") && this.entityId == entityId) {
            document.getElementById(this.divId).setAttribute("class", this.css + " " + this.cssSelected);
        } else {
            document.getElementById(this.divId).setAttribute("class", this.css);
        }
    }
});