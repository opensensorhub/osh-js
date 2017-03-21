/**
 * @classdesc This class is responsible for sending request to server.
 * @class
 * @param {Object} options
 */
OSH.DataSender.DataSenderController = Class.create({
    initialize: function (options) {
        this.dataSources = {};
    },

    /**
     * Adds a datasource to the list of datasources to process
     * @param {Object} datasource the datasource to add
     * @instance
     * @memberof OSH.DataSender.DataSenderController
     */
    addDataSource: function(dataSource) {
        this.dataSources[dataSource.getId()] = dataSource;
    },

    /**
     * Sends request to the server
     * @param {string} dataSourceId the datasource id to process
     * @param {Object} properties the properties to use
     * @param {function} onSucess the onSucess function
     * @param {function} onError the onError function
     * @instance
     * @memberof OSH.DataSender.DataSenderController
     */
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