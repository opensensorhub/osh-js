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
 * @classdesc A css context menu allowing to create various context menu using only css.
 * @type {OSH.UI.ContextMenu}
 * @augments OSH.UI.ContextMenu
 */
OSH.UI.ContextMenu.CssMenu = OSH.UI.ContextMenu.extend({
    initialize:function(properties,type) {
        this._super(properties);

        this.items = [];
        if(typeof(type) != "undefined") {
            this.type = type;
        } else {
            this.type = "";
        }

        if(typeof(properties) != "undefined") {
            if(typeof (properties.items) != "undefined") {
                for(var i = 0;i < properties.items.length;i++) {
                    var elId = OSH.Utils.randomUUID();
                    var htmlVar = "<a  id=\""+elId+"\" ";
                    if(typeof (properties.items[i].css) != "undefined"){
                        htmlVar += "class=\""+properties.items[i].css+"\" ";
                    }
                    var name = "";
                    if(typeof (properties.items[i].name) != "undefined") {
                        name = properties.items[i].name;
                    }
                    htmlVar += "title=\""+name+"\"";
                    htmlVar += "><span id =\""+elId+"\"class=\""+this.type+"-menu-label\">"+name+"</span><\/a>";

                    //htmlVar += "<label for=\""+elId+"\" class=\""+this.type+"-menu-label\">"+name+"</label></div>";

                    var action = "";
                    if(typeof (properties.items[i].action) != "undefined") {
                        action = properties.items[i].action;
                    }
                    var viewId = "";
                    if(typeof (properties.items[i].viewId) != "undefined") {
                        viewId = properties.items[i].viewId;
                    }

                    var clickOverride;
                    var locationDatasource;
                    if(properties.items[i].hasOwnProperty('clickOverride') && properties.items[i].hasOwnProperty('locationDatasource')){
                        clickOverride = properties.items[i].clickOverride;
                        locationDatasource = properties.items[i].locationDatasource;
                    }
                    else if(properties.items[i].hasOwnProperty('clickOverride')){
                        clickOverride = properties.items[i].clickOverride;
                    }

                    this.items.push({
                        html : htmlVar,
                        id : elId,
                        action : action,
                        viewId : viewId,
                        clickOverride: clickOverride,
                        locationDatasource: locationDatasource
                    })
                }
            }
        }
    },
    /**
     *
     * @param $super
     * @param {Object} properties
     * @param {number} properties.offsetX - the x offset to shift the menu
     * @param {number} properties.offsetY - the y offset to shift the menu
     * @instance
     * @memberof OSH.UI.ContextMenu.CssMenu
     */
    show:function(properties) {
        this.removeElement();
        var closeId = OSH.Utils.randomUUID();
        var videoId = OSH.Utils.randomUUID();

        var htmlVar="";
        htmlVar += "<div class=\""+this.type+"-menu\">";
        htmlVar += "  <div class=\""+this.type+"-menu-circle\">";
        // adds items
        for(var i = 0; i < this.items.length; i++) {
            htmlVar += this.items[i].html;
        }
        htmlVar += "  <\/div>";
        htmlVar += "  <a id=\""+closeId+"\"class=\""+this.type+"-menu-button fa fa-times fa-2x\"><\/a>";
        htmlVar += "<\/div>";

        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("class",""+this.type+"-menu-container");
        this.rootTag.innerHTML = htmlVar;

        document.body.appendChild(this.rootTag);

        var items = document.querySelectorAll('.'+this.type+'-menu-circle a');

        for(var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
            items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        }

        document.getElementById(closeId).onclick = this.hide.bind(this);

        var offsetX = 0;
        var offsetY = 0;

        if(properties.offsetX) {
            offsetX = properties.offsetX;
        }

        if(properties.offsetY) {
            offsetY = properties.offsetY;
        }

        document.querySelector('.'+this.type+'-menu-circle').classList.toggle('open');

        if(typeof properties.x != "undefined") {
            this.rootTag.style.left = properties.x + offsetX;
        }
        if(typeof properties.y != "undefined") {
            this.rootTag.style.top = properties.y + offsetY;
        }

        // binds actions based on items
        this.bindEvents = {};
        for(var i = 0; i < this.items.length; i++) {
            var item =  this.items[i];
            this.bindEvents[item.id] = item.viewId;
            document.getElementById(item.id).onclick = function(event) {
                OSH.EventManager.fire(OSH.EventManager.EVENT.SHOW_VIEW, {
                    viewId: this.bindEvents[event.target.id]
                });
            }.bind(this);
        }

        // this causes preventing any closing event
        this.rootTag.onmousedown = function(event) {
            event.preventDefault();
            event.stopPropagation();
        }
    },

    /**
     * Hides the menu
     * @param $super
     * @instance
     * @memberof OSH.UI.ContextMenu.CssMenu
     */
    hide:function($super){
        document.querySelector('.'+this.type+'-menu-circle').classList.toggle('open');
        this.removeElement();
    },

    /**
     * @instance
     * @memberof OSH.UI.ContextMenu.CssMenu
     */
    removeElement: function() {
        if(typeof(this.rootTag) != "undefined" && this.rootTag != null && typeof(this.rootTag.parentNode) != "undefined") {
            this.rootTag.parentNode.removeChild(this.rootTag);
            this.rootTag = null;
        }
    },

    /**
     * @instance
     * @memberof OSH.UI.ContextMenu.CssMenu
     */
    getTransform: function(el) {
        var transform = el.style.transform;
        if(!transform || 0 === transform.length) {
            return "";
        }
        var regExp = /^\s*((\w+)\s*\(([^)]+)\))/;
        var matches = regExp.exec(transform);

        return matches[1];
    },

    /**
     *
     * @param properties
     * @returns {boolean}
     */
    manualShow: function (properties) {
        this.removeElement();

        // TODO: make sure this is stable
        var body = document.body;
        var circMenuList = Array.from(document.getElementsByClassName('circular-menu-container'));
        console.log(circMenuList);
        for (var el in circMenuList) {
            // console.debug('Removing: ', circMenuList[el]);
            body.removeChild(circMenuList[el]);
        }
        // *******************************************

        if (properties !== null || properties !== undefined) {   // TODO: check that properties isn't an empty object
            // console.debug('Manually Showing This Menu');
            var closeId = OSH.Utils.randomUUID();
            var videoId = OSH.Utils.randomUUID();

            var htmlVar = "";
            htmlVar += "<div class=\"" + this.type + "-menu\">";
            htmlVar += "  <div class=\"" + this.type + "-menu-circle\">";

            // console.debug(this.items);

            // adds items
            for (var i = 0; i < this.items.length; i++) {
                htmlVar += this.items[i].html;
            }
            htmlVar += "  <\/div>";
            htmlVar += "  <a id=\"" + closeId + "\"class=\"" + this.type + "-menu-button fa fa-times fa-2x\"><\/a>";
            htmlVar += "<\/div>";

            // var outerDiv = document.createElement('div');
            // var innerDiv = document.createElement('div');
            // outerDiv.className = this.type + '-menu';
            // innerDiv.className = this.type + '-menu-circle';


            this.rootTag = document.createElement("div");
            this.rootTag.setAttribute("class", "" + this.type + "-menu-container");
            // TODO: verify that position is correct
            this.rootTag.style.top = properties.y + 'px';
            this.rootTag.style.left = properties.x + 'px';
            this.rootTag.innerHTML = htmlVar;

            document.body.appendChild(this.rootTag);

            var items = document.querySelectorAll('.' + this.type + '-menu-circle a');

            for (var i = 0, l = items.length; i < l; i++) {
                items[i].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
                items[i].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
            }

            var closeButton = document.getElementById(closeId);
            closeButton.onclick = this.hide.bind(this);

            var offsetX = 0;
            var offsetY = 0;

            if (properties.offsetX) {
                offsetX = properties.offsetX;
            }

            if (properties.offsetY) {
                offsetY = properties.offsetY;
            }

            document.querySelector('.' + this.type + '-menu-circle').classList.toggle('open');

            if (typeof properties.x != "undefined") {
                this.rootTag.style.left = properties.x + offsetX + 'px';
            }
            if (typeof properties.y != "undefined") {
                this.rootTag.style.top = properties.y + offsetY + 'px';
            }

            // binds actions based on items
            this.bindEvents = {};
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                // console.log(item);
                this.bindEvents[item.id] = item.viewId;
                // TODO: add to osh-js source if effective
                if (item.clickOverride !== undefined) {
                    document.getElementById(item.id).onclick = item.clickOverride.bind(this);
                } else {
                    document.getElementById(item.id).onclick = function (event) {
                        OSH.EventManager.fire(OSH.EventManager.EVENT.SHOW_VIEW, {
                            viewId: this.bindEvents[event.target.id]
                        });
                    }.bind(this);
                }
            }

            // this causes preventing any closing event
            this.rootTag.onmousedown = function (event) {
                event.preventDefault();
                event.stopPropagation();
            };

            // prevent unintentional opening of the default context menu
            this.rootTag.addEventListener('contextmenu', evt => evt.preventDefault(), {capture: true});

            return true;
        } else {
            console.error('Argument: Properties is required');
            return false;
        }

    }
});