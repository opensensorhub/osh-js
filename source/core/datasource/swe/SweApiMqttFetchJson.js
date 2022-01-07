import SweApiMqttJson from "./worker/SweApiMqttJson.worker.js";
import SweApiFetch from "./SweApiFetch";

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

class SweApiMqttFetchJson extends SweApiFetch {

    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.topic the service
     */
    constructor(name, properties) {
        super(name, {
            batchSize: 1,
            reconnectTimeout: 1000 * 30, // default if not defined into properties
            tls: false,
            ...properties,
        });
    }

    async createWorker(properties) {
        return new SweApiMqttJson();
    }
}
export default SweApiMqttFetchJson;
