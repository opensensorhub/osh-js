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

import {randomUUID} from '../utils/Utils';

/**
 * The DataConnector is the abstract class used to create different connectors.
 */
class DataConnector {
    /**
     * @param {String} url - The full url used to connect to the data stream
     */
    constructor(url) {
        this.url = url;
        this.id = "DataConnector-" + randomUUID();

        this.reconnectTimeout = 1000 * 60 * 2; //2 min
    }

    /**
     * Sets the url
     * @param url
     */
    setUrl(url) {
        this.url = url;
    }

    /**
     * The data connector default id.
     * @return {String}
     */
    getId() {
        return this.id;
    }

    /**
     * The stream url.
     * @return {String}
     */
    getUrl() {
        return this.url;
    }

    /**
     * Sets the reconnection timeout
     * @param {Number} timeout - delay in milliseconds before reconnecting dataSource
     */
    setReconnectTimeout(timeout) {
        this.reconnectTimeout = timeout;
    }

    onReconnect(){}
}

export default DataConnector;
