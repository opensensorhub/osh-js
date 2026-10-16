/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2020 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoftware.com>

 ******************************* END LICENSE BLOCK ***************************/

import Ajax from '../connector/Ajax.js';
import {randomUUID} from "../utils/Utils.js";

/**
 * This class is in charge of send command to the server
 */
class DataSink {
    /**
     *
     * @param {String} name -
     * @param {Object} properties -
     * @param {String} properties.protocol - ['http']
     * @param {String} properties.endpointUrl -
     */
    constructor(name, properties) {
        if (properties.protocol === 'http') {
            this.connector = new Ajax(this.buildUrl(properties));
            this.connector.onError = this.onCatchError.bind(this);
            this.connector.onSuccess = this.onCatchSuccess.bind(this);
        }
        this.id = "DataSender-" + randomUUID();
        this.name = name;
        this.properties = properties;
    }

    /**
     * Sends the request.
     * @param {Object} properties -
     */
    sendRequest(properties) {
        this.connector.sendRequest(this.buildRequest(properties));
    }

    /**
     * @private
     * @param properties
     */
    buildRequest(properties) {
        return "";
    }

    /**
     * @param properties
     * @private
     */
    buildUrl(properties) {
        let url = "";

        // adds protocol
        url += properties.protocol + "://";

        // adds endpoint url
        url += properties.endpointUrl;

        return url;
    }

    /**
     * Called when an error is caught.
     * @private
     * @param response
     * @event
     */
    onCatchError(response) {
        this.onError(response);
    }

    /**
     * Called when the request succeeded.
     * @private
     * @param response
     * @event
     */
    onCatchSuccess(response) {
        this.onSuccess(response);
    }

    /**
     * Called when an error is caught.
     * @param response
     * @event
     */
    onError(response) {

    }

    /**
     * Called when the request succeeded.
     * @param response
     * @event
     */
    onSuccess(response) {

    }

    /**
     * Gets the data protocol default id.
     * @return {String} The id
     */
    getId() {
        return this.id;
    }

    /**
     * Gets the name.
     * @return {String} The name
     */
    getName() {
        return this.name;
    }
}

export default  DataSink;
