/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2016 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoftware.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 */
import AjaxConnector from '../dataconnector/AjaxConnector.js';
import {randomUUID} from "../utils/Utils";

export default class DataSink {
    constructor(name, properties, options) {
        if (properties.protocol === 'http') {
            this.connector = new AjaxConnector(this.buildUrl(properties));
            this.connector.onError = this.onCatchError.bind(this);
            this.connector.onSuccess = this.onCatchSuccess.bind(this);
        }
        this.id = "DataSender-" + randomUUID();
        this.name = name;
        this.properties = properties;
    }

    /**
     * @param properties
     * @instance
     * @memberof DataSink
     */
    sendRequest(properties) {
        this.connector.sendRequest(this.buildRequest(properties));
    }

    /**
     * @param properties
     * @instance
     * @memberof DataSink
     */
    buildRequest(properties) {
        return "";
    }

    /**
     * @param properties
     * @instance
     * @memberof DataSink
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
     * @param response
     * @instance
     * @memberof DataSink
     */
    onCatchError(response) {
        this.onError(response);
    }

    /**
     * @param response
     * @instance
     * @memberof DataSink
     */
    onCatchSuccess(response) {
        this.onSuccess(response);
    }

    /**
     * @param response
     * @instance
     * @memberof DataSink
     */
    onError(response) {

    }

    /**
     * @param response
     * @instance
     * @memberof DataSink
     */
    onSuccess(response) {

    }

    /**
     * The data connector default id.
     * @returns {string|*}
     * @memberof DataSink
     * @instance
     */
    getId() {
        return this.id;
    }

    /**
     * The name.
     * @returns {string}
     * @memberof DataSink
     * @instance
     */
    getName() {
        return this.name;
    }
}
