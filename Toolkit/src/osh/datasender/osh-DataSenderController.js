OSH.DataSender.DataSenderController = Class.create({
    initialize: function (options) {
        this.dataSources = {};
    },

    addDataSource: function(dataSource) {
        this.dataSources[dataSource.getId()] = dataSource;
    },

    sendRequest: function(dataSourceId,properties, onSuccess, onError) {
        if (dataSourceId in this.dataSources) {
            // may be optimized. It is redefined the callback for every requests
            if(typeof(onSuccess) != "undefined" && onSuccess != null) {
                this.dataSources[dataSourceId].onSuccess = function(response) {
                    onSuccess(response);
                }
            }

            if(typeof(onError) != "undefined" && onError != null) {
                this.dataSources[dataSourceId].onError = function(response) {
                    onError(response);
                }
            }

            this.dataSources[dataSourceId].sendRequest(properties);
        }
    }
});