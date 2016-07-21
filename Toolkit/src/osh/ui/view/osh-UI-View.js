OSH.UI.View = Class.create({
    initialize: function (divId, viewItems,options) {
        this.divId = divId;
        this.id = "view-" + OSH.Utils.randomUUID();

        this.lastRec = {};
        this.selectedDataSources = [];
        this.selectedEntities = [];
        this.dataSources = [];
        
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
            for (var i =0;i < viewItems.length;i++) {
                this.addViewItem(viewItems[i]);
            }
        }

        if(typeof (options) != "undefined") {
            if(typeof (options.show) != "undefined") {
                document.getElementById(this.divId).style.display = (options.show)? "block": "none";
            }
        }

        this.handleEvents();
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

    show: function(properties) {
    },

    shows: function(properties) {
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
            styler.viewItem = viewItem;
        }
        if (viewItem.hasOwnProperty("contextmenu")) {
            this.contextMenus.push(viewItem.contextmenu);
        }
    },

    handleEvents: function() {
        // observes the data come in
        OSH.EventManager.observe(OSH.EventManager.EVENT.DATA,function(event){

        }.bind(this));

        // observes the selected event
        OSH.EventManager.observe(OSH.EventManager.EVENT.SELECT_VIEW,function(event){
            this.selectDataView(event.dataSourcesIds,event.entityId);
        }.bind(this));

        // observes the SHOW event
        OSH.EventManager.observe(OSH.EventManager.EVENT.SHOW_VIEW,function(event){
            this.show(event);
        }.bind(this));
    }
});
