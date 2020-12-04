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
 *
 * @class
 * @classdesc
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 *
 */
var htmlTaskingComponent="";
htmlTaskingComponent += "<div class=\"ptz-zoom\">";
htmlTaskingComponent += "   <div class=\"ptz-zoom-in\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i></div>";
htmlTaskingComponent += "   <div class=\"ptz-zoom-bar\"></div>";
htmlTaskingComponent += "   <div class=\"ptz-zoom-out\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></div>";
htmlTaskingComponent += "<\/div>";
htmlTaskingComponent += "<div class=\"ptz\">";
htmlTaskingComponent += "   <div tag=\"0\" class='moveUp' name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"91\" class='moveTopLeft' name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"90\" class=\"moveTopRight\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"6\" class=\"moveLeft\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div cmd=\"ptzReset\" class=\"reset\" title=\"Center\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"4\" class=\"moveRight\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"93\" class=\"moveBottomLeft\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"92\" class=\"moveBottomRight\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"2\" class=\"moveDown\" name=\"\"><\/div>";
htmlTaskingComponent += "<\/div>";
htmlTaskingComponent += "<div class=\"ptz-right\">";
htmlTaskingComponent += "<ul>";
htmlTaskingComponent += "            <li>";
htmlTaskingComponent += "                <label>Presets:<\/label>";
htmlTaskingComponent += "                <div class=\"ptz-select-style\">";
htmlTaskingComponent += "                     <select class=\"ptz-presets\" required pattern=\"^(?!Select a Preset).*\">";
htmlTaskingComponent += "                         <option value=\"\" disabled selected>Select a Preset<\/option>";
htmlTaskingComponent += "                     <\/select>";
htmlTaskingComponent += "                <\/div>";
htmlTaskingComponent += "            <\/li>";
htmlTaskingComponent += "</ul>";
htmlTaskingComponent += "<\/div>";

OSH.UI.PtzTaskingView = OSH.UI.View.extend({
    initialize: function (divId, options) {
        this._super(divId,[],options);
        var width = "640";
        var height = "480";
        this.css = "tasking";

        this.cssSelected = "";

        if(typeof (options) !== "undefined") {
            if (options.width) {
                width = options.width;
            }

            if (options.height) {
                height = options.height;
            }

            if (options.css) {
                this.css += options.css;
            }

            if (options.cssSelected) {
                this.cssSelected = options.cssSelected;
            }

            if(options.dataSenderId) {
                this.dataSenderId = options.dataSenderId;
            }
        }

        // creates video tag element
        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("height", height);
        this.rootTag.setAttribute("width", width);
        this.rootTag.setAttribute("class", this.css);
        this.rootTag.setAttribute("id", "dataview-" + OSH.Utils.randomUUID());

        // appends <img> tag to <div>
        document.getElementById(this.divId).appendChild(this.rootTag);

        this.rootTag.innerHTML = htmlTaskingComponent;

        this.pan = 0;
        this.tilt = 0;
        this.zoom = 0;

        var increment = 5;

        this.observers = [];

        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveUp").onclick = function(){this.onTiltClick(increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveTopLeft").onclick = function(){this.onTiltPanClick(-1*increment,increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveTopRight").onclick =  function(){this.onTiltPanClick(increment,increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveRight").onclick =  function(){this.onPanClick(increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveLeft").onclick =  function(){this.onPanClick(-1*increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveDown").onclick =  function(){this.onTiltClick(-1*increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveBottomLeft").onclick = function(){this.onTiltPanClick(-1*increment,-1*increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveBottomRight").onclick =  function(){this.onTiltPanClick(increment,-1*increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz-zoom > .ptz-zoom-in").onclick =  function(){this.onZoomClick(increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz-zoom > .ptz-zoom-out").onclick =  function(){this.onZoomClick(-1*increment)}.bind(this);

        // add presets if any
        if(typeof (options) !== "undefined" && (options.presets)) {
            this.addPresets(options.presets);

            // add listeners
            document.querySelector('#'+this.rootTag.id+ "  .ptz-right  .ptz-select-style  .ptz-presets").onchange = this.onSelectedPresets.bind(this);
        }
    },

    /**
     *
     * @param presets array
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    addPresets:function(presetsArr) {
        var selectTag = document.querySelector('#'+this.rootTag.id+ "  .ptz-right  .ptz-select-style  .ptz-presets");
        for(var i in presetsArr) {
            var option = document.createElement("option");
            option.text = presetsArr[i];
            option.value = presetsArr[i];
            selectTag.add(option);
        }
    },

    /**
     *
     * @param event
     * @memberof OSH.UI.PtzTaskingView
     * @instance
     */
    onSelectedPresets : function(event) {
        var serverTag = document.querySelector('#'+this.rootTag.id+ "  .ptz-right  .ptz-select-style  .ptz-presets");
        var option = serverTag.options[serverTag.selectedIndex];
        this.onChange(null,null,null,option.value);
    },

    /**
     *
     * @param interval
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    removeInterval: function(interval) {
        if(this.timerIds.length > 0) {
            setTimeout(clearInterval(this.timerIds.pop()),interval+50);
        }
    },

    /**
     *
     * @param value
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    onTiltClick: function (value) {
        this.tilt += value;
        this.onChange(null,value,null,null);
    },

    /**
     *
     * @param tiltValue the titl value
     * @param panValue the panValue value
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    onTiltPanClick:function(tiltValue,panValue) {
        this.tilt += tiltValue;
        this.pan += panValue;

        this.onChange(tiltValue,panValue,null,null);
    },

    /**
     *
     * @param value
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    onPanClick: function(value) {
        this.pan += value;
        this.onChange(value,null,null,null);
    },

    /**
     *
     * @param value
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    onZoomClick: function(value) {
        this.zoom += value;
        this.onChange(null,null,value,null);
    },

    /**
     *
     * @param rpan
     * @param rtilt
     * @param rzoom
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    onChange: function(rpan, rtilt, rzoom,preset) {
        OSH.EventManager.fire(OSH.EventManager.EVENT.PTZ_SEND_REQUEST+"-"+this.dataSenderId,{
            cmdData : {rpan:rpan,rtilt:rtilt,rzoom:rzoom,preset:preset},
            onSuccess:function(event){console.log("Failed to send request: "+event);},
            onError:function(event){console.log("Request sent successfully: "+event);}
        });
    }
});

