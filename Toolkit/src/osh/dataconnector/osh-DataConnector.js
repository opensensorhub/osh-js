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
 * @classdesc The DataConnector is the abstract class used to create different connectors.
 * @constructor
 * @abstract
 * @param {string} url The full url used to connect to the data stream
 */

import {randomUUID} from '../osh-Utils';

export default class DataConnector {
    constructor(url) {
        this.url = url;
        this.id = "DataConnector-" + randomUUID();
    }

    /**
     * The data connector default id.
     * @returns {string}
     * @memberof OSH.DataConnector.DataConnector
     * @instance
     */
    getId() {
        return this.id;
    }

    /**
     * The stream url.
     * @returns {string}
     * @memberof OSH.DataConnector.DataConnector
     * @instance
     */
    getUrl() {
        return this.url;
    }
}
