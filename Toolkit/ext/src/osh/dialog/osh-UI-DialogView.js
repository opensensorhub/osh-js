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
 var dialogView new OSH.UI.DialogView(containerDivId, {
        draggable: false,
        css: "dialog",
        name: title,
        show:false,
        dockable: true,
        closeable: true,
        connectionIds : dataSources ,
        swapId: "main-container"
    });
 */
OSH.UI.DialogView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, options) {
        this._super(parentElementDivId,[],options);
        // creates HTML eflement
        this.dialogId = "dialog-" + OSH.Utils.randomUUID();
        this.pinDivId = "dialog-pin-" + OSH.Utils.randomUUID();
        var closeDivId = "dialog-close-" + OSH.Utils.randomUUID();
        this.connectDivId = "dialog-connect-" + OSH.Utils.randomUUID();
        this.name = "Untitled";

        var htmlVar = "";
        htmlVar += "<div>";

        this.dockable = false;
        this.closeable = false;
        this.connected = false;
        this.swapped = false;
        this.connectionIds = [];
        this.draggable = false;

        if(!isUndefined(options)){
            if( typeof (options.swapId) != "undefined" && options.swapId != "") {
                this.swapDivId = "dialog-exchange-" + OSH.Utils.randomUUID();
                htmlVar += "<a id=\"" + this.swapDivId + "\"class=\"pop-exchange fa fa-exchange\" title=\"swap\"><\/a>";
                this.divIdToSwap  = options.swapId;
            }

            if( typeof (options.connectionIds) != "undefined" && typeof options.connectionIds != "undefined" && options.connectionIds.length > 0) {
                // add connected icon to disconnect/connect datasource
                htmlVar += "<a id=\"" + this.connectDivId + "\"class=\"pop-connect\"><\/a>";
                this.connected = true;
                this.connectionIds = options.connectionIds;
            }

            if( typeof (options.dockable) != "undefined" && options.dockable) {
                htmlVar +=  "<a id=\""+this.pinDivId+"\"class=\"pop-pin\"><\/a>";
                this.dockable = options.dockable;
            }

            if(typeof (options.closeable) != "undefined" && options.closeable) {
                htmlVar += "<a id=\""+closeDivId+"\"class=\"pop-close\" title=\"close\">x<\/a>";
                this.closeable = options.closeable;
            }

            if(typeof (options.draggable) != "undefined" && options.draggable) {
                this.draggable = options.draggable;
            }

            if(typeof (options.name) != "undefined") {
                this.name = options.name;
            }

        }

        this.titleId = "dialog-title-"+OSH.Utils.randomUUID();
        htmlVar += "<h3 id=\""+this.titleId+"\">"+this.name+"<\/h3></div>";

        this.rootTag = document.getElementById(this.divId);
        this.rootTag.innerHTML = htmlVar;

        this.rootTag.setAttribute("class", "pop-over resizable");
        this.rootTag.setAttribute("draggable", this.draggable);

        this.keepRatio = false;

        if(!isUndefined(options)) {
            var css = this.rootTag.className;
            if (options.css) {
                css += " " + options.css;
            }
            if(options.keepRatio){
                css += " keep-ratio-w";
                this.keepRatio = true;
            }

            this.rootTag.setAttribute("class", css);
        }

        this.flexDiv = document.createElement("div");
        this.flexDiv.setAttribute("class","pop-inner");

        this.popContentDiv = document.createElement("div");
        this.popContentDiv.setAttribute("class","pop-content");
        this.popContentDiv.setAttribute("id","pop-content-id-"+OSH.Utils.randomUUID());

        if(!this.keepRatio) {
            OSH.Utils.addCss(this.popContentDiv,"no-keep-ratio");
        }

        this.flexDiv.appendChild(this.popContentDiv);
        // plugs it into the new draggable dialog
        this.rootTag.appendChild(this.flexDiv);

        if(typeof (options) != "undefined") {
            if(typeof (options.show) != "undefined" && !options.show) {
                this.rootTag.style.display = "none";
            } else {
                this.initialWidth = this.rootTag.offsetWidth;
            }
        }

        // adds listener
        this.rootTag.addEventListener('dragstart', this.drag_start.bind(this), false);
        document.addEventListener('dragover', this.drag_over.bind(this), false);
        document.addEventListener('drop', this.drop.bind(this), false);

        if(this.closeable) {
            document.getElementById(closeDivId).onclick = this.close.bind(this);
        }

        if(this.dockable) {
            document.getElementById(this.pinDivId).onclick = this.unpin.bind(this);
        }

        if(this.connectionIds.length > 0) {
            document.getElementById(this.connectDivId).onclick = this.connect.bind(this);
        }

        if(typeof  this.swapDivId != "undefined") {
            document.getElementById(this.swapDivId).onclick = this.swapClick.bind(this);
        }

        // calls super handleEvents
        this.handleEvents();

        var self = this;

        // observe events to update the dialog after disconnect/connect events handling
        OSH.EventManager.observe(OSH.EventManager.EVENT.CONNECT_DATASOURCE,function(event) {
            var dataSources = event.dataSourcesId;
            if(dataSources.length == self.connectionIds.length) {
                if(dataSources.filter(function(n) {
                        return self.connectionIds.indexOf(n) != -1;
                    }).length == self.connectionIds.length) {
                    document.getElementById(self.connectDivId).setAttribute("class", "pop-connect");
                    self.connected = true;
                }
            }
        });

        OSH.EventManager.observe(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE,function(event) {
            var dataSources = event.dataSourcesId;
            if(dataSources.length == self.connectionIds.length) {
                if(dataSources.filter(function(n) {
                        return self.connectionIds.indexOf(n) != -1;
                    }).length == self.connectionIds.length) {
                    document.getElementById(self.connectDivId).setAttribute("class", "pop-disconnect");
                    self.connected = false;
                }
            }
        });

        OSH.EventManager.observe("swap-restore",function(event) {
            if(self.swapped && event.exclude != self.id) {
                self.swap();
                self.swapped = false;
            }
        });

        var p = this.rootTag.parentNode;

        var testDiv = document.createElement("div");
        testDiv.setAttribute("class","outer-dialog");
        testDiv.appendChild(this.rootTag);

        p.appendChild(testDiv);
    },

    /**
     * Swap the current div with the div given as parameter
     * @instance
     * @memberof OSH.UI.DialogView
     */
    swapClick: function() {
        OSH.EventManager.fire("swap-restore",{exclude: this.id});
        this.swap();
    },

    /**
     * @instance
     * @memberof OSH.UI.DialogView
     */
    swap:function() {
        // swap the child of the popContentDiv with the child contained in the the containerDiv
        var containerDivToSwap = document.getElementById(this.divIdToSwap);
        if(containerDivToSwap != "undefined" && containerDivToSwap != null) {
            if(!this.swapped) {
                // get
                var popContent = this.popContentDiv.firstChild;
                this.contentViewId = popContent.id;
                var swapContainerContent = containerDivToSwap.firstChild;

                // remove
                containerDivToSwap.removeChild(swapContainerContent);
                this.popContentDiv.removeChild(popContent);

                // append
                containerDivToSwap.appendChild(popContent);
                this.popContentDiv.appendChild(swapContainerContent);
                this.swapped = true;

                // update title
                document.getElementById(this.titleId).innerText = "- Swapped -";

                // if keep ratio
                if(this.keepRatio) {
                    // remove css class from dialog
                    OSH.Utils.removeCss(this.rootTag,"keep-ratio-w");
                    // does not keep ratio for the new content
                    OSH.Utils.addCss(this.popContentDiv,"no-keep-ratio");
                    OSH.Utils.addCss(containerDivToSwap,"keep-ratio-h");
                }
            } else {
                // get
                var popContent = this.popContentDiv.firstChild;
                var swapContainerContent = document.getElementById(this.contentViewId);

                // remove
                containerDivToSwap.removeChild(swapContainerContent);
                this.popContentDiv.removeChild(popContent);

                // append
                containerDivToSwap.appendChild(popContent);
                this.popContentDiv.appendChild(swapContainerContent);

                // update title
                document.getElementById(this.titleId).innerText = this.name;
                this.swapped = false;

                // if keep ratio
                if(this.keepRatio) {
                    // remove css class from dialog
                    OSH.Utils.addCss(this.rootTag,"keep-ratio-w");
                    OSH.Utils.removeCss(this.popContentDiv,"no-keep-ratio");
                    OSH.Utils.removeCss(containerDivToSwap,"keep-ratio-h");
                }
            }

            // send resize event to the view
            var everyChild = document.getElementById(this.divIdToSwap).querySelectorAll("div");
            for (var i = 0; i<everyChild.length; i++) {
                var id = everyChild[i].id;
                if(id.startsWith("view-")) {
                    OSH.EventManager.fire(OSH.EventManager.EVENT.RESIZE+"-"+id);
                }
            }

            var everyChild = this.popContentDiv.querySelectorAll("div");
            for (var i = 0; i<everyChild.length; i++) {
                var id = everyChild[i].id;
                if(id.startsWith("view-")) {
                    OSH.EventManager.fire(OSH.EventManager.EVENT.RESIZE+"-"+id);
                }
            }
        }
    },

    /**
     *
     * @param $super
     * @param properties
     * @instance
     * @memberof OSH.UI.DialogView
     */
    show: function(properties) {
        if(properties.viewId.indexOf(this.getId()) > -1) {
            this.rootTag.style.display = "block";
            if(typeof(this.initialWidth) == "undefined" ) {
                this.initialWidth = this.rootTag.offsetWidth;
            }
        }
    },

    /**
     * @instance
     * @memberof OSH.UI.DialogView
     */
    connect: function() {
        if(!this.swapped) {
            if (!this.connected) {
                OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE, {dataSourcesId: this.connectionIds});
            } else {
                OSH.EventManager.fire(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE, {dataSourcesId: this.connectionIds});
            }
        }
    },

    /**
     * @instance
     * @memberof OSH.UI.DialogView
     */
    unpin: function() {
        if (!this.draggable) {
            var bodyRect = document.body.getBoundingClientRect(),
                elemRect = this.rootTag.getBoundingClientRect(),
                offsetTop = elemRect.top - bodyRect.top,
                offsetLeft = elemRect.left - bodyRect.left;

            this.rootTag.setAttribute("draggable", true);
            this.rootTag.parentNode.removeChild(this.rootTag);
            document.body.appendChild(this.rootTag);
            this.rootTag.style.top = offsetTop;
            this.rootTag.style.left = offsetLeft;
            this.rootTag.style.position = "absolute";
            this.draggable = true;

            document.getElementById(this.pinDivId).setAttribute("class", "pop-pin pop-pin-drag");
        } else {
            this.rootTag.style.top = 0;
            this.rootTag.style.left = 0 - (this.rootTag.offsetWidth - this.initialWidth);
            this.rootTag.style.position = "relative";
            this.rootTag.setAttribute("draggable", false);
            document.body.removeChild(this.rootTag);
            this.container.appendChild(this.rootTag);
            this.draggable = false;
            document.getElementById(this.pinDivId).setAttribute("class", "pop-pin");
        }
    },


    /**
     *
     * @param callback
     * @instance
     * @memberof OSH.UI.DialogView
     */
    onClose: function (callback) {
        this.onClose = callback;
    },

    /**
     * @instance
     * @memberof OSH.UI.DialogView
     */
    close: function () {
       // this.rootTag.parentNode.removeChild(this.rootTag);
        this.rootTag.style.display = "none";
        if (this.onClose) {
            this.onClose();
        }
    },

    /**
     *
     * @param event
     * @instance
     * @memberof OSH.UI.DialogView
     */
    drag_start: function (event) {
        event.stopPropagation();
        // Grab all computed styles of the dragged object
        var style = window.getComputedStyle(event.target, null);
        // dataTransfer sets data that is being dragged. In this case, the current X and Y values (ex. "1257,104")
        event.dataTransfer.effectAllowed = 'all';
        event.dataTransfer.setData("text-" + this.rootTag.id,
            (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));

    },

    /**
     *
     * @param event
     * @returns {boolean}
     * @instance
     * @memberof OSH.UI.DialogView
     */
    drag_over: function (event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    },

    /**
     *
     * @param event
     * @returns {boolean}
     * @instance
     * @memberof OSH.UI.DialogView
     */
    drop: function (event) {
        event.stopPropagation();
        // Set array of x and y values from the transfer data
        var offset = event.dataTransfer.getData("text-" + this.rootTag.id).split(',');
        this.rootTag.style.left = ((event.clientX + parseInt(offset[0], 10)) * 100) / window.innerWidth + "%";
        this.rootTag.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
        return false;
    }
});