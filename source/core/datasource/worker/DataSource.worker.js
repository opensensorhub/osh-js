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
    handleMessage(event);
};

async function handleMessage(event) {
    let resp = {};
    if (event.data.ackId) {
        resp.ackId = event.data.ackId;
    }
    let returnValue;
    const eventData = event.data;

    try {
        if (!isDefined(dataSourceHandler)) {
            if (eventData.message === 'init') {
                dataSourceHandler = createHandlerFromProperties(eventData.properties);
                await dataSourceHandler.init(eventData.properties, eventData.topics, eventData.id);
                console.log(dataSourceHandler.delegateHandler);
                returnValue = dataSourceHandler.isInitialized();
            }
        } else {
            if (eventData.message === 'connect') {
                await dataSourceHandler.connect(eventData.startTime, eventData.version);
            } else if (eventData.message === 'disconnect') {
                await dataSourceHandler.disconnect();
            } else if (eventData.message === 'topics') {
                dataSourceHandler.setTopics(eventData.topics);
            } else if (eventData.message === 'update-properties') {
                dataSourceHandler.updateProperties(eventData.data);
            } else if (eventData.message === 'is-connected') {
                returnValue = dataSourceHandler.isConnected();
            } else if (eventData.message === 'is-init') {
                returnValue = dataSourceHandler.isInitialized();
            }
        }
    } catch (ex) {
        console.error(ex);
        resp.error = ex;
    } finally {
        resp.data = returnValue;
        self.postMessage(resp);
    }
}

function createHandlerFromProperties(properties) {
    if (properties.type === 'SosGetResult') {
        return new SosGetResultHandler();
    } else if (properties.type === 'SosGetFois') {
        return new SosGetFoisHandler();
    } else if (properties.type === 'SweApiStream') {
        return new SweApiHandler();
    } else {
        throw Error('Unsupported SOS service Error');
    }
}
