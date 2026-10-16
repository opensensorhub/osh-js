/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import {isDefined} from "../../../core/utils/Utils";
import FileContext from "../file/File.context";
import FileHandler from "../file/File.handler";

let dataSourceHandler = undefined;

self.onmessage = (event) => {
    handleMessage(event, self);
};

function handleMessage(event) {
    const data = event.data;

    let resp = {};
    if (data.ackId) {
        resp.ackId = data.ackId;
    }
    let value;
    console.log(data);
    try {
        if (!isDefined(dataSourceHandler)) {
            if (data.message === 'init') {
                dataSourceHandler = createHandlerFromProperties(data.properties);
                dataSourceHandler.init(data.properties, data.topics, data.id);
                value = dataSourceHandler.isInitialized();
            }
        } else {
            if (data.message === 'connect') {
                dataSourceHandler.connect();
            } else if (data.message === 'disconnect') {
                dataSourceHandler.disconnect();
            } else if (data.message === 'topics') {
                dataSourceHandler.setTopics(data.topics);
            } else if (data.message === 'update-properties') {
                dataSourceHandler.updateProperties(data.data);
            } else if (data.message === 'is-connected') {
                value = dataSourceHandler.isConnected();
            } else if (data.message === 'is-init') {
                value = dataSourceHandler.isInitialized();
            }
        }
    } catch (ex) {
        console.error(ex);
        resp.error = ex;
    } finally {
        resp.data = value;
        self.postMessage(resp);
    }
}

function createHandlerFromProperties(properties) {
    // create context to set to the DataSourceHandler
    let context;
    if (properties.type === 'File') {
        context = new FileContext();
        return new FileHandler(context);
    } else {
        throw Error('Unsupported SOS service Error');
    }
}
