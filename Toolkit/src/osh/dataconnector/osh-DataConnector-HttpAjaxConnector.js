/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

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
OSH.DataConnector.AjaxConnector = OSH.DataConnector.DataConnector.extend({

    initialize: function(url,properties) {
        this._super(url);

        this.method = "POST";
        this.responseType = "arraybuffer";

        if(typeof(properties) !== "undefined") {
            if(properties.method) {
                this.method = properties.method;
            }

            if(properties.responseType) {
                this.responseType = properties.responseType;
            }
        }
    },
    /**
     * Sends the request to the defined server.
     * @param request The Http request (as a String format)
     * @memberof OSH.DataConnector.AjaxConnector
     * @instance
     */
    sendRequest: function (request,extraUrl) {
        var self = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.timeout = 60000;
        if(request === null) {
            if(typeof (extraUrl) !== "undefined") {
                xmlhttp.open("GET", this.getUrl()+"?"+extraUrl, true);
            } else {
                xmlhttp.open("GET", this.getUrl(), true);
            }
            xmlhttp.responseType = this.responseType;
            xmlhttp.onload = function (oEvent) {
                if (xmlhttp.response) {
                    self.onMessage(xmlhttp.response);
                }
            };
            xmlhttp.ontimeout = function (e) {
                console.log("Timeout");
            };

            xmlhttp.send(null);
        } else {
            xmlhttp.open("POST", this.getUrl(), true);
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');

            xmlhttp.send(request);

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState < 4) {
                    // while waiting response from server
                }  else if (xmlhttp.readyState === 4) {                // 4 = Response from server has been completely loaded.
                    if (xmlhttp.status == 200 && xmlhttp.status < 300) { // http status between 200 to 299 are all successful
                        this.onSuccess(xmlhttp.responseText);
                    } else {
                        this.onError("");
                    }
                }
            }.bind(this);
        }


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

    },

    connect:function(){
        this.sendRequest(null);
    }
});