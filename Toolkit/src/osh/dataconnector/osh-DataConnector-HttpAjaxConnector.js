/**
 * @type {OSH.DataConnector.DataConnector}
 * @classdesc Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @class
 * @augments OSH.DataConnector.DataConnector
 * @example
 * var request = ...;
 * var connector = new OSH.DataConnector.AjaxConnector(url);
 *
 * // handle onSuccess
 * connector.onSuccess = function(event) {
 *  // does something
 * }
 *
 * connector.onError = function(event) {
 *  // does something
 * }
 *
 * // send request
 * connector.sendRequest(request);
 *
 */

OSH.DataConnector.AjaxConnector = function(url) {
    OSH.DataConnector.AjaxConnector.parent.constructor.apply(this, arguments);
};

//derive from base class
osh_extend(OSH.DataConnector.AjaxConnector, OSH.DataConnector.DataConnector);


/**
 * Sends the request to the defined server.
 * @param request The Http request (as a String format)
 * @memberof OSH.DataConnector.AjaxConnector
 * @instance
 */

OSH.DataConnector.AjaxConnector.prototype.sendRequest = function(request) {
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
};


/**
 * This is the callback method in case of getting error connection.
 * @param event The error details
 * @memberof OSH.DataConnector.AjaxConnector
 * @instance
 */

OSH.DataConnector.AjaxConnector.prototype.onError = function(event) {

};


/**
 * This is the callback method in case of getting success connection.
 * @param event
 * @memberof OSH.DataConnector.AjaxConnector
 * @instance
 */

OSH.DataConnector.AjaxConnector.prototype.onSuccess = function(event) {

};