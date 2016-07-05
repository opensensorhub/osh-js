OSH.UI.DialogView = Class.create(OSH.UI.View,{
    initialize: function ($super,divId, options) {
        //$super(divId,[],options);
        // creates HTML element
        this.id = "dialog-" + OSH.Utils.randomUUID();
        var pinDiv = "dialog-" + OSH.Utils.randomUUID();
        var closeDiv = "dialog-" + OSH.Utils.randomUUID();

        var name = (typeof(options.name) != "undefined") ? options.name : "Untitled";

        var htmlVar = "";
        htmlVar += "<div>" +
            "<a id=\""+pinDiv+"\"class=\"pop-pin\"><\/a>" +
            "<a id=\""+closeDiv+"\"class=\"pop-close\">x<\/a>" +
            "<h3>"+name+"<\/h3>" +
            "</div>";

        this.draggable = (typeof(options.draggable) != "undefined") ? options.draggable : false;

        this.rootTag = document.createElement("div");
        this.rootTag.innerHTML = htmlVar;

        this.rootTag = this.rootTag.firstChild;
        this.rootTag.setAttribute("id", this.id);
        this.rootTag.setAttribute("class", "pop-over");
        this.rootTag.setAttribute("draggable", this.draggable);

        var div = document.getElementById(divId);
        this.parentDiv = div.parentNode;

        if(options.css) {
            this.rootTag.setAttribute("class",this.rootTag.className+" "+options.css);
        }

        // reset styles
        this.rootTag.style.top = div.style.top;
        this.rootTag.style.left = div.style.left;
        div.style.top = "";
        div.style.left = "";

        var classList = div.className;

        // removes the div from its parent
        div.parentNode.removeChild(div);

        // plugs it into the new draggable dialog
        this.rootTag.appendChild(div);
        div.setAttribute("class", "pop-content "+classList);
        if(this.draggable) {
            document.body.appendChild(this.rootTag);
        } else {
            this.parentDiv.appendChild(this.rootTag);
        }

        if(typeof (options) != "undefined") {
            if(typeof (options.show) != "undefined" && !options.show) {
                this.rootTag.style.display = "none";
            }
        }

        // adds listener
        this.rootTag.addEventListener('dragstart', this.drag_start.bind(this), false);
        document.addEventListener('dragover', this.drag_over.bind(this), false);
        document.addEventListener('drop', this.drop.bind(this), false);

        document.getElementById(closeDiv).onclick = this.close.bind(this);
        document.getElementById(pinDiv).onclick = this.unpin.bind(this);
    },

    show: function($super,properties) {
        if(properties.viewIds.indexOf(this.getId()) > -1) {
            this.rootTag.style.display = "block";
        }
    },

    unpin: function() {
        if(!this.draggable) {
            var bodyRect = document.body.getBoundingClientRect(),
                elemRect = this.rootTag.getBoundingClientRect(),
                offsetTop = elemRect.top - bodyRect.top,
                offsetLeft = elemRect.left - bodyRect.left;

            this.rootTag.setAttribute("draggable", true);
            this.rootTag.parentNode.removeChild(this.rootTag);
            document.body.appendChild(this.rootTag);
            this.rootTag.style.top = offsetTop;
            this.rootTag.style.left = offsetLeft - 350;
            this.rootTag.style.position = "absolute";
            this.draggable = true;
        } else {
            this.rootTag.style.top = 0;
            this.rootTag.style.left = 0;
            this.rootTag.style.position = "relative";
            this.rootTag.setAttribute("draggable", false);
            this.rootTag.parentNode.removeChild(this.rootTag);
            this.parentDiv.appendChild(this.rootTag);
            this.draggable = false;
        }
    },

    onClose: function (callback) {
        this.onClose = callback;
    },

    close: function () {
       // this.rootTag.parentNode.removeChild(this.rootTag);
        this.rootTag.style.display = "none";
        if (this.onClose) {
            this.onClose();
        }
    },

    drag_start: function (event) {
        event.stopPropagation();
        // Grab all computed styles of the dragged object
        var style = window.getComputedStyle(event.target, null);
        // dataTransfer sets data that is being dragged. In this case, the current X and Y values (ex. "1257,104")
        event.dataTransfer.effectAllowed = 'all';
        event.dataTransfer.setData("text-" + this.rootTag.id,
            (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));

    },

    drag_over: function (event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    },

    drop: function (event) {
        event.stopPropagation();
        // Set array of x and y values from the transfer data
        var offset = event.dataTransfer.getData("text-" + this.rootTag.id).split(',');
        this.rootTag.style.left = ((event.clientX + parseInt(offset[0], 10)) * 100) / window.innerWidth + "%";
        this.rootTag.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
        return false;
    },

    getId: function() {
        return this.id;
    }
});