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
import { isDefined } from '../utils/Utils.js';
/**
 * This class is in charge of send command to the server
 */
var DataSenderController = /** @class */ (function () {
    /**
     *
     * @param {Object} options -
     */
    function DataSenderController(options) {
        this.dataSources = {};
    }
    /**
     * Adds a datasource to the list of datasources to process
     * @param {Object} datasource - the datasource to add
     */
    DataSenderController.prototype.addDataSource = function (dataSource) {
        this.dataSources[dataSource.getId()] = dataSource;
    };
    /**
     * Sends request to the server
     * @param {String} dataSourceId - the datasource id to process
     * @param {Object} properties - the properties to use
     * @param {Function} onSuccess - the onSucess function
     * @param {Function} onError - the onError function
     */
    DataSenderController.prototype.sendRequest = function (dataSourceId, properties, onSuccess, onError) {
        if (dataSourceId in this.dataSources) {
            // may be optimized. It is redefined the callback for every requests
            if (isDefined(onSuccess) && onSuccess !== null) {
                this.dataSources[dataSourceId].onSuccess = function (response) { return onSuccess(response); };
            }
            if (isDefined(onError) && onError !== null) {
                this.dataSources[dataSourceId].onError = function (response) { return onError(response); };
            }
            this.dataSources[dataSourceId].sendRequest(properties);
        }
    };
    return DataSenderController;
}());
export default DataSenderController;
//# sourceMappingURL=DataSenderController.js.map