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

import DataSource from "./DataSource";
import SosGetResultJsonWorker from "./workers/SosGetFois.worker.js";

class SosGetFois extends DataSource {
    constructor(name, properties) {
        super(name, {
            timeShift:0,
            reconnectTimeout: 1000 * 5, // default if not defined into properties
            batchSize: 10,
            ...properties,
            responseType: 'application/xml',
        }, new SosGetResultJsonWorker());
    }
}
export default SosGetFois;
