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
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", this.getUrl(), true);
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(request);

        xmlhttp.onreadystatechange = function() {
            /*if (xhr.readyState < 4) {
                // while waiting response from server
            }  else if (xhr.readyState === 4) {                // 4 = Response from server has been completely loaded.
                if (xhr.status == 200 && xhr.status < 300) { // http status between 200 to 299 are all successful
                    this.onSuccess(xhr.responseText);
                } else {
                    this.onError("");
                }
            }*/
        }.bind(this);
    },

    onError:function(event){

    },

    onSuccess:function(event) {

    }
});