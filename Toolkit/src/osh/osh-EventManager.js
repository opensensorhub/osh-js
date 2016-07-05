OSH.EventManager = Class.create({
    initialize: function () {
        this.views = [];
        this.initEvents();
        this.dataSourcesId = [];

    },

    initEvents: function () {
        document.observe("osh:select", function (event) {
            var ds = this.getDataSourcesId(event.memo);
            for (var i = 0; i < this.views.length; i++) {
                this.views[i].selectDataView(ds);
            }
        }.bind(this));
    },

    addEntity: function (entity) {
        if (typeof(entity.dataSources) != "undefined") {
            //store for instance only dataSources group
            var tmpArr = [];
            for (var i = 0; i < entity.dataSources.length; i++) {
                tmpArr.push(entity.dataSources[i].getId());
            }
            this.dataSourcesId.push(tmpArr);
        }
    },

    addDataSource: function (dataSource) {
        this.dataSourcesId.push([dataSource]);
    },

    addView: function (oshView) {
        this.views.push(oshView);
        if (oshView.divId) {
            /*var div = $(oshView.divId);
             if(div != null){
             $(oshView.divId).observe("click", function(event) {
             console.log(event.target.id);
             if(event.target.id.startsWith("DataSource-")) {
             // gets associated datasources
             var ds = getFullMemo([event.target.id]);
             for(var i = 0; i < this.views.length;i++) {
             this.views[i].selectDataView(ds);
             }
             }
             }.bind(this));
             }*/
        }
    },

    /**
     * Get the corresponding dataSource owning by the entities.
     * @param dataSourcesId The dataSources to search
     * @returns {Array} The whole corresponding list of dataSources, including the ones in the entities
     */
    getDataSourcesId: function (dataSourcesId) {
        var dataSourcesResult = [];

        for (var i = 0; i < dataSourcesId.length; i++) {
            var currentDs = dataSourcesId[i];
            // tries to find if it's included into one of the arrays
            for (var j = 0; j < this.dataSourcesId.length; j++) {
                var currentDsArray = this.dataSourcesId[j];
                if (currentDsArray.indexOf(currentDs) > -1) {
                    // checks for duplicates before adding into the result array
                    dataSourcesResult = dataSourcesResult.concat(currentDsArray);
                }
            }
        }

        // filter unique elements
        return dataSourcesResult.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
    }
});
