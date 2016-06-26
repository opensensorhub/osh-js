var htmlTaskingComponent =
    "<div class=\"preset\">" +
        "<label for=\"preset\">Preset:</label>" +
        "<select name=\"preset\">"+
        "<option value=\"value1\">Valeur 1</option>"+
        "<option value=\"value2\" selected>Valeur 2</option>"+
        "<option value=\"value3\">Valeur 3</option>"+
        "</select>" +
    "</div>"+
    "<div class=\"flex-container\">"+
        "<div class=\"remote fixed\">" +
            "<input type=\"image\" src=\"images/remote-left.png\" class=\"remote-left remote-button\"/>" +
            "<input type=\"image\" src=\"images/remote-up.png\" class=\"remote-up remote-button\"/>" +
            "<input type=\"image\" src=\"images/remote-right.png\" class=\"remote-right remote-button\"/>"+
            "<input type=\"image\" src=\"images/remote-down.png\" class=\"remote-down remote-button\"/>"+
        "</div>"+
        "<div class=\"ptz flex-item\">" +
            "<div class=\"pan\"><label for=\"pan\">Pan:</label><input type=\"text\" name=\"pan\"></div>"+
            "<div class=\"tilt\"><label for=\"tilt\">Tilt:</label><input type=\"text\" name=\"tilt\"></div>"+
            "<div class=\"zoom\"><label for=\"zoom\">Zoom:</label><input type=\"text\" name=\"zoom\"></div>"+
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
    }
});

