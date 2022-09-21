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

import {isDefined} from "../../utils/Utils";
import SweApiHandler from "../sweapi/handler/SweApi.handler";
import SosGetFoisHandler from "../sos/handler/SosGetFois.handler";
import SosGetResultHandler from "../sos/handler/SosGetResult.handler";

let dataSourceHandler = undefined;

self.onmessage = async (event) => {
    await handleMessage(event.data, self);
};

let promise = new Promise(resolve => {resolve()});

async function checkPerformingAction() {
    await promise;
}
async function handleMessage(event) {
    await checkPerformingAction();
    // ensure the right order of the actions
    promise = new Promise(async resolve => {
        let value;
        if (!isDefined(dataSourceHandler)) {
            if (event.message === 'init') {
                dataSourceHandler = createHandlerFromProperties(event.properties);
                await dataSourceHandler.init(event.properties, event.topics, event.id);
                value = dataSourceHandler.isInitialized();
            }
        } else {
            if (event.message === 'connect') {
                await dataSourceHandler.connect(event.startTime);
                // send back result or just return
                postMessage({
                    message: event.message,
                    data: value,
                    messageId: event.messageId
                });
                resolve();
            } else if (event.message === 'disconnect') {
                dataSourceHandler.disconnect();
            } else if (event.message === 'topics') {
                dataSourceHandler.setTopics(event.topics);
            } else if (event.message === 'update-properties') {
                dataSourceHandler.updateProperties(event.data);
            } else if (event.message === 'is-connected') {
                value = dataSourceHandler.isConnected();
            } else if (event.message === 'is-init') {
                value = dataSourceHandler.isInitialized();
            }
        }

        // send back result or just return
        postMessage({
            message: event.message,
            data: value,
            messageId: event.messageId
        });
        resolve();
    });
    return promise;
}

function createHandlerFromProperties(properties) {
    if(properties.type === 'SosGetResult') {
        return new SosGetResultHandler();
    } else if(properties.type === 'SosGetFois') {
        return new SosGetFoisHandler();
    } else if(properties.type === 'SweApiStream') {
        return new SweApiHandler();
    } else {
        throw Error('Unsupported SOS service Error');
    }
}
