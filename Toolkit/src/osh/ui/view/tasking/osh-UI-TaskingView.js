var htmlTaskingComponent =
    "<div class=\"flex-container\">"+
        "<div class=\"remote fixed\">" +
            "<div class=\"remote-left\"><input id=\"button-pan-left\" type=\"image\" src=\"images/remote-left.png\" class=\"remote-button\"/></div>" +
            "<div class=\"remote-up\"><input id=\"button-tilt-up\" type=\"image\" src=\"images/remote-up.png\" class=\"remote-button\"/></div>" +
            "<div class=\"remote-zoomin\"><input id=\"button-zoom-in\" type=\"image\" src=\"images/remote-zoomin.png\" class=\"remote-button\"/></div>" +
            "<div class=\"remote-zoomout\"><input id=\"button-zoom-out\" type=\"image\" src=\"images/remote-zoomout.png\" class=\"remote-button\"/></div>" +
            "<div class=\"remote-right\"><input id=\"button-pan-right\" type=\"image\" src=\"images/remote-right.png\" class=\"remote-button\"/></div>"+
            "<div class=\"remote-down\"><input id=\"button-tilt-down\" type=\"image\" src=\"images/remote-down.png\" class=\"remote-button\"/></div>"+
        "</div>"+
        "<div class=\"ptz flex-item\">" +
            "<!--div class=\"preset\">" +
                "<label for=\"preset\">Preset:</label>" +
                "<select name=\"preset\">"+
                    "<option value=\"value1\">Value 1</option>"+
                    "<option value=\"value2\" selected>Value 2</option>"+
                    "<option value=\"value3\">Value 3</option>"+
                "</select>" +
            "</div-->"+
            "<div class=\"pan\"><label for=\"pan\">Pan:</label><input id=\"input-pan\" type=\"text\" name=\"pan\" size=\"2\" value=\"0\" disabled></div>"+
            "<div class=\"tilt\"><label for=\"tilt\">Tilt:</label><input id=\"input-tilt\" type=\"text\" name=\"tilt\" size=\"2\" value=\"0\" disabled></div>"+
            "<div class=\"zoom\"><label for=\"zoom\">Zoom:</label><input id=\"input-zoom\" type=\"text\" name=\"zoom\" size=\"2\" value=\"0\" disabled></div>"+
        "</div>"+
    "</div>";


OSH.UI.TaskingView = Class.create(OSH.UI.View, {
    initialize: function ($super, divId, options) {
        $super(divId);
        var width = "640";
        var height = "480";
        this.css = "";

        this.cssSelected = "";

        if(typeof (options) != "undefined") {
            if (options.width) {
                width = options.width;
            }

            if (options.height) {
                height = options.height;
            }

            if (options.css) {
                this.css = options.css;
            }

            if (options.cssSelected) {
                this.cssSelected = options.cssSelected;
            }

            if(options.dataSourceId) {
                this.dataSourceId = options.dataSourceId;
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

        this.observers = [];

        this.pan = 0;
        this.tilt = 0;
        this.zoom = 0;
        this.timerId = 0;

        var interval = 100;
        this.timerIds = new Array();
        // inits listeners
       /* $("button-tilt-up").observe('mousedown',  function(){this.timerIds.unshift(setInterval(function(){this.onTiltClick(1)}.bind(this),interval))}.bind(this));
        $("button-tilt-down").observe('mousedown',  function(){this.timerIds.unshift(setInterval(function(){this.onTiltClick(-1)}.bind(this),interval))}.bind(this));
        $("button-pan-left").observe('mousedown',  function(){this.timerIds.unshift(setInterval(function(){this.onPanClick(-1)}.bind(this),interval))}.bind(this));
        $("button-pan-right").observe('mousedown',  function(){this.timerIds.unshift(setInterval(function(){this.onPanClick(1)}.bind(this),interval))}.bind(this));
        $("button-zoom-in").observe('mousedown',  function(){this.timerIds.unshift(setInterval(function(){this.onZoomClick(1)}.bind(this),interval*5))}.bind(this));
        $("button-zoom-out").observe('mousedown',  function(){this.timerIds.unshift(setInterval(function(){this.onZoomClick(-1)}.bind(this),interval*5))}.bind(this));

        $("button-tilt-up").observe('mouseup',  function(){this.removeInterval(interval)}.bind(this));
        $("button-tilt-down").observe('mouseup',  function(){this.removeInterval(interval)}.bind(this));
        $("button-pan-left").observe('mouseup',  function(){this.removeInterval(interval)}.bind(this));
        $("button-pan-right").observe('mouseup',  function(){this.removeInterval(interval)}.bind(this));
        $("button-zoom-in").observe('mouseup',  function(){this.removeInterval(interval)}.bind(this));
        $("button-zoom-out").observe('mouseup',  function(){this.removeInterval(interval)}.bind(this));*/


        var increment = 5;
        $("button-tilt-up").observe('click',  function(){this.onTiltClick(increment)}.bind(this));
        $("button-tilt-down").observe('click',  function(){this.onTiltClick(-1*increment)}.bind(this));
        $("button-pan-left").observe('click',  function(){this.onPanClick(-1*increment)}.bind(this));
        $("button-pan-right").observe('click',  function(){this.onPanClick(increment)}.bind(this));
        $("button-zoom-in").observe('click',  function(){this.onZoomClick(-1*increment)}.bind(this));
        $("button-zoom-out").observe('click',  function(){this.onZoomClick(increment)}.bind(this));
    },

    removeInterval: function(interval) {
        if(this.timerIds.length > 0) {
            setTimeout(clearInterval(this.timerIds.pop()),interval+50);
        }
    },

    onTiltClick: function (value) {
        this.tilt += value;
        document.getElementById("input-tilt").value = this.tilt;
        this.onChange();
    },

    onPanClick: function(value) {
        this.pan += value;
        document.getElementById("input-pan").value = this.pan;
        this.onChange();
    },

    onZoomClick: function(value) {
        this.zoom += value;
        document.getElementById("input-zoom").value = this.zoom;
        this.onChange();
    },

    onChange: function() {
        //TODO: get values from INPUT
        var properties = {
            pan : this.pan,
            zoom: this.zoom,
            tilt : this.tilt
        }

        for(var i=0;i < this.observers.length;i++) {
            this.observers[i].sendRequest(this.dataSourceId,properties);
        }
    },

    register: function(observer) {
        this.observers.push(observer);
    }
});

