OSH.UI.View = Class.create({
    initialize: function (divId, viewItems,options) {
        this.divId = divId;
        this.id = "view-" + OSH.Utils.randomUUID();

        var div = document.getElementById(divId);
        if (div == "undefined" || div == null) {
            var hiddenDiv = document.createElement("div");
            hiddenDiv.style.display = "none";

            document.body.appendChild(hiddenDiv);

            var elementDiv = document.createElement("div");
            elementDiv.setAttribute("id", divId);

            hiddenDiv.appendChild(elementDiv);
        }

        // list of stylers
        this.stylers = [];
        this.contextMenus = [];
        this.viewItems = [];
        this.names = {};
        this.stylerToObj = {};

        // inits the view before adding the viewItem
        this.init(options);

        if (typeof (viewItems) != "undefined") {
            for (var i in viewItems) {
                this.addViewItem(viewItems[i]);
            }
        }
    },

    init: function (options) {},

    getId: function () {
        return this.id;
    },

    getDivId: function () {
        return this.divId;
    },

    selectDataView: function (dataSourceIds) {
    },

    /**
     * Add viewItem to the view
     */
    addViewItem: function (viewItem) {
        this.viewItems.push(viewItem);
        if (viewItem.hasOwnProperty("styler")) {
            var styler = viewItem.styler;
            this.stylers.push(styler);
            if (viewItem.hasOwnProperty("name")) {
                this.names[styler.getId()] = viewItem.name;
            }
            styler.init(this);
        }
        if (viewItem.hasOwnProperty("contextmenu")) {
            this.contextMenus.push(viewItem.contextmenu);
        }
    },

    handleEvent: function (event) {
    }
});
