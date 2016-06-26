/**
 * Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @type {OSH.DataConnector.DataConnector}
 */
OSH.DataConnector.AjaxConnector = Class.create(OSH.DataConnector.DataConnector, {
    /**
     * Sends the request to the defined server.
     * @param properties
     */
    sendRequest: function (request) {
        var self = this;
        new Ajax.Request(this.getUrl(), {
            onSuccess: function (response) {
                // Handles the response content...
                self.onSuccess(response);
            },
            onComplete: function(response) {
                if (200 == response.status) {
                    // yada yada yada
                } else {
                    self.onError(response);
                }
            },
            onFailure: function(response) {
                self.onError(response);
            },
            onException: function(response) {
                self.onError(response);
            }
        });
    },

    onError:function(event){

    },

    onSuccess:function(event) {

    }
});