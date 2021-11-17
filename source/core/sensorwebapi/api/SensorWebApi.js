/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import HttpConnector from "../../protocol/HttpConnector";
import {assertDefined} from "../../utils/Utils";

class SensorWebApi {
    constructor(networkProperties) {
        this.networkProperties = networkProperties;
        this.protocol = this.networkProperties.protocol || 'https';
        this.endpoint = this.networkProperties.endpoint;

        assertDefined(this.networkProperties.endpoint, 'endpoint');
        if(this.networkProperties.endpoint.endsWith('/')) {
            this.endpoint = this.networkProperties.endpoint.substring(0,this.networkProperties.endpoint.length - 1);
        }
        this.connector = this.createConnector();
    }
    createConnector() {
        if(this.protocol === 'https' || this.protocol === 'https') {
            return new HttpConnector(this.protocol + '://' + this.endpoint  ,{
                responseType: 'application/json',
                method: 'GET'
            });
        } else if(this.protocol === 'mqtts' || this.protocol === 'mqtt') {

        } else if(this.protocol === 'wss' || this.protocol === 'ws') {

        }
    }
}
export default SensorWebApi;
