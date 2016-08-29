/**
 * @type {OSH.DataConnector.DataConnector}
 * @classdesc Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @class
 * @augments OSH.DataConnector.DataConnector
 */
OSH.DataConnector.AjaxConnector = Class.create(OSH.DataConnector.DataConnector, {

    /**
     * Sends the request to the defined server.
     * @param request The Http request (as a String format)
     * @memberof OSH.DataConnector.AjaxConnector
     * @instance
     */
    sendRequest: function (request) {
        var self = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", this.getUrl(), true);
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(request);

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log("ici");
            }
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

    /**
     * This is the callback method in case of getting error connection.
     * @param event The error details
     * @memberof OSH.DataConnector.AjaxConnector
     * @instance
     */
    onError:function(event){

    },

    /**
     * This is the callback method in case of getting success connection.
     * @param event
     * @memberof OSH.DataConnector.AjaxConnector
     * @instance
     */
    onSuccess:function(event) {

    }
});