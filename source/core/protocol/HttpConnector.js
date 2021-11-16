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
class HttpConnector extends DataConnector {

    /**
     * Creates Ajax.
     * @param {String} url -
     * @param {Object} properties -
     * @param {String} properties.method -
     * @param {String} properties.headers -
     */
    constructor(url, properties) {
        super(url);

        this.method = "POST";
        this.responseType = "application/json";

        if (isDefined(properties)) {
            if (properties.method) {
                this.method = properties.method;
            }

            if (properties.responseType) {
                this.responseType = properties.responseType;
            }

            if (properties.headers) {
                this.headers = properties.headers;
            }
        }
    }

    /**
     * Sends the request to the defined server.
     * @param {String} queryString - get query parameters
     */
    doRequest(queryString= undefined) {
        const instance = this;
        let fullUrl = this.getUrl();

        if(isDefined(queryString)) {
            fullUrl += '?'+queryString;
        }
        return fetch(fullUrl, {
            method: this.method,
            headers: this.headers
        })
        .then(function(response) {
            if(instance.responseType === 'application/json') {
                return response.json();
            }
            switch (instance.responseType) {
                case 'application/json': return response.json();break;
                case 'plain/text': return response.text();break;
                case 'arrayBuffer': return response.arrayBuffer();break;
                case 'blob': return response.blob(); break;
                default:
                    return response.json();
            }
        });
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
    onMessage(event) {

    }

    /**
     * Sends the request
     * @private
     */
    connect() {
        return this.doRequest();
    }

    isConnected() {
        return false;
    }
}
export default HttpConnector;
