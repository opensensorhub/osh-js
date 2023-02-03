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
import { randomUUID } from '../utils/Utils.js';
import { Status } from './Status.js';
/**
 * The DataConnector is the abstract class used to create different connectors.
 */
var DataConnector = /** @class */ (function () {
    /**
     * @param {String} url - The full url used to connect to the data stream
     */
    function DataConnector(url, properties) {
        this.url = url;
        this.properties = properties;
        this.id = "DataConnector-" + randomUUID();
        this.reconnectTimeout = 1000 * 60 * 2; //2 min
        this.status = Status.DISCONNECTED;
    }
    DataConnector.prototype.disconnect = function () {
        this.checkStatus(Status.DISCONNECTED);
        this.checkAndClearReconnection();
    };
    /**
     * Sets the url
     * @param url
     */
    DataConnector.prototype.setUrl = function (url) {
        this.url = url;
    };
    /**
     * The data protocol default id.
     * @return {String}
     */
    DataConnector.prototype.getId = function () {
        return this.id;
    };
    /**
     * The stream url.
     * @return {String}
     */
    DataConnector.prototype.getUrl = function () {
        return this.url;
    };
    /**
     * Sets the reconnection timeout
     * @param {Number} timeout - delay in milliseconds before reconnecting dataSource
     */
    DataConnector.prototype.setReconnectTimeout = function (timeout) {
        this.reconnectTimeout = timeout;
    };
    DataConnector.prototype.onReconnect = function () {
        return true;
    };
    DataConnector.prototype.connect = function () { };
    DataConnector.prototype.forceReconnect = function () {
        this.disconnect();
        this.connect();
    };
    /**
     * Called when the connection STATUS changes
     * @param {Status} status - the new status
     */
    DataConnector.prototype.onChangeStatus = function (status) {
    };
    /**
     * Check a change of the status and call the corresponding callbacks if necessary
     * @param {Status} status - the currentStatus
     */
    DataConnector.prototype.checkStatus = function (status) {
        if (status !== this.status) {
            this.onChangeStatus(status);
            this.status = status;
        }
    };
    /**
     * Called when the protocol has been disconnected
     */
    DataConnector.prototype.onDisconnect = function () {
    };
    /**
     * Called when the protocol has been connected
     */
    DataConnector.prototype.onConnect = function () {
    };
    DataConnector.prototype.postRequest = function () { };
    DataConnector.prototype.publishRequest = function () { };
    DataConnector.prototype.reset = function () { };
    DataConnector.prototype.close = function () { };
    DataConnector.prototype.onClose = function (statusCode) { };
    DataConnector.prototype.onError = function (reason) { };
    return DataConnector;
}());
export default DataConnector;
//# sourceMappingURL=DataConnector.js.map