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
 * @classdesc A stack context menu
 * @class
 * @type {OSH.UI.ContextMenu.CssMenu}
 * @augments OSH.UI.ContextMenu.CssMenu
 * @example
 * var menuItems = [{
        name: "Item 1",
        viewId: viewId,
        css: "someCssClass"
   },{
        name: "Item 2",
        viewId: viewId2,
        css: "someCssClass"
   }];

   var contextStackMenu = new OSH.UI.ContextMenu.StackMenu({id : randomId,groupId: randomGroupId,items : menuItems});
 */
OSH.UI.ContextMenu.StackMenu = OSH.UI.ContextMenu.CssMenu.extend({
    initialize:function(properties) {
        this._super(properties,"stack");
    },

    /**
     * Shows the context menu.
     * @param $super
     * @param properties
     * @instance
     * @memberof OSH.UI.ContextMenu.StackMenu
     */
    show:function(properties) {
        this.removeElement();
        var htmlVar="";
        htmlVar += "  <div class=\""+this.type+"-menu-circle\">";
        // adds items
        for(var i = 0; i < this.items.length; i++) {
            htmlVar += this.items[i].html;
        }
        htmlVar += "  <\/div>";

        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("class",""+this.type+"-menu-container");
        this.rootTag.innerHTML = htmlVar;

        if(typeof properties.div != "undefined") {
            properties.div.appendChild(this.rootTag);
        } else {
            document.body.appendChild(this.rootTag);
        }

        var offsetX = 0;
        var offsetY = 0;

        if(properties.offsetX) {
            offsetX = properties.offsetX;
        }

        if(properties.offsetY) {
            offsetY = properties.offsetY;
        }

        if(typeof properties.x !== 'undefined') {
            var locX = properties.x + offsetX;
            this.rootTag.style.left = locX + 'px';
        }
        if(typeof properties.y !== 'undefined') {
            var locY = properties.y + offsetY;
            this.rootTag.style.top = locY + 'px';
        }

        document.querySelector('.'+this.type+'-menu-circle').classList.toggle('open');

        // binds actions based on items
        this.bindEvents = {};
        for(var i = 0; i < this.items.length; i++) {
            var item =  this.items[i];
            // console.log(item);
            this.bindEvents[item.id] = item.viewId;
            // TODO: add to osh-js source if effective
            if(item.clickOverride !== undefined){
                document.getElementById(item.id).onclick = item.clickOverride.bind(this);
            }
            else {
                document.getElementById(item.id).onclick = function (event) {
                    OSH.EventManager.fire(OSH.EventManager.EVENT.SHOW_VIEW, {
                        viewId: this.bindEvents[event.target.id]
                    });
                }.bind(this);
            }
        }

        // this causes preventing any closing event
        this.rootTag.onmousedown = function(event) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
});