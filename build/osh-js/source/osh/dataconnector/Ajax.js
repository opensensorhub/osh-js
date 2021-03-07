/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import DataConnector from './DataConnector.js';
import {isDefined} from '../utils/Utils.js';
import {Status} from './Status.js';

/**
 * Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @extends DataConnector
 * @example
 * import Ajax from 'core/protocol/Ajax.js';
 *
 * let request = ...;
 * let protocol = new Ajax(url);
 *
 * // handle onSuccess
 * protocol.onSuccess = function(event) {
 *  // does something
 * }
 *
 * protocol.onError = function(event) {
 *  // does something
 * }
 *
 * // send request
 * protocol.sendRequest(request);
 *
 */
class Ajax extends DataConnector {

    /**
     * Creates Ajax.
     * @param {String} url -
     * @param {Object} properties -
     * @param {String} properties.method -
     * @param {String} properties.responseType -
     */
    constructor(url, properties) {
        super(url);

        this.method = "POST";
        this.responseType = "arraybuffer";

        if (isDefined(properties)) {
            if (properties.method) {
                this.method = properties.method;
            }

            if (properties.responseType) {
                this.responseType = properties.responseType;
            }
        }
    }

    /**
     * Sends the request to the defined server.
     * @param {String} request - The Http request
     * @param {String} extraUrl - get query parameters
     */
    sendRequest(request, extraUrl) {
        let self = this;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
        xmlhttp.timeout = 60000;
        if (request === null) {
            if (isDefined(extraUrl)) {
                xmlhttp.open("GET", this.getUrl() + "?" + extraUrl, true);
            } else {
                xmlhttp.open("GET", this.getUrl(), true);
            }
            xmlhttp.responseType = this.responseType;
            xmlhttp.onload = (oEvent) => {
                if (xmlhttp.response) {
                    self.onMessage(xmlhttp.response);
                }
                self.checkStatus(Status.DISCONNECTED);
            };
            xmlhttp.ontimeout = (e) => {
                console.log("Timeout");
                self.checkStatus(Status.DISCONNECTED);
            };
            self.checkStatus(Status.CONNECTED);
            xmlhttp.send(null);
        } else {
            xmlhttp.open("POST", this.getUrl(), true);
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');

            xmlhttp.send(request);
            self.checkStatus(Status.CONNECTED);
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState < 4) {
                    // while waiting response from server
                } else if (xmlhttp.readyState === 4) {                // 4 = Response from server has been completely loaded.
                    if (xmlhttp.status === 200 && xmlhttp.status < 300) { // http status between 200 to 299 are all successful
                        self.onSuccess(xmlhttp.responseText);
                    } else {
                        self.onError("");
                    }
                    self.checkStatus(Status.DISCONNECTED);
                }
            };
        }
    }

    /**
     * This is the callback method in case of getting error connection.
     * @param event The error details
     * @event
     */
    onError(event) {

    }

    /**
     * This is the callback method in case of getting success connection.
     * @param event
     * @event
     */
    onSuccess(event) {

    }

    /**
     * Sends the request
     * @private
     */
    connect() {
        this.sendRequest(null);
    }

    isConnected() {
        return false;
    }
}
export default Ajax;
