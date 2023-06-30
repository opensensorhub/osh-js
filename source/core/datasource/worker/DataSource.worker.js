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

let dataSourceHandlers = {};

self.onmessage = async (event) => {
    handleMessage(event);
};

function handleMessage(event) {
    let resp = {};
    if (event.data.ackId) {
        resp.ackId = event.data.ackId;
    }
    const eventData = event.data;
    const dsId = eventData.dsId;

    try {
        if (eventData.message === 'init') {
            dataSourceHandlers[dsId] = createHandlerFromProperties(eventData.properties);
            dataSourceHandlers[dsId].init(eventData.properties, eventData.topics, eventData.id).then(() => {
                resp.data = dataSourceHandlers[dsId].isInitialized();
                self.postMessage(resp);
            });
        }
        if (eventData.message === 'connect') {
            dataSourceHandlers[dsId].connect(eventData.startTime, eventData.version).then(() => {
                self.postMessage(resp);
            });
        } else if (eventData.message === 'disconnect') {
            dataSourceHandlers[dsId].disconnect().then(() => {
                self.postMessage(resp);
            });
        } else if (eventData.message === 'topics') {
            dataSourceHandlers[dsId].setTopics(eventData.topics);
            self.postMessage(resp);
        } else if (eventData.message === 'update-properties') {
            dataSourceHandlers[dsId].updateProperties(eventData.data);
            self.postMessage(resp);
        } else if (eventData.message === 'is-connected') {
            resp.data = dataSourceHandlers[dsId].isConnected();
            self.postMessage(resp);
        } else if (eventData.message === 'is-init') {
            resp.data = dataSourceHandlers[dsId].isInitialized();
            self.postMessage(resp);
        }
    } catch (ex) {
        console.error(ex);
        resp.error = ex;
        self.postMessage(resp);
    } finally {
        // resp.data = returnValue;
        // self.postMessage(resp);
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
