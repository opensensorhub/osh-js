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
import SosGetResultContext from "../sos/SosGetResult.context";
import SosGetFoisContext from "../sos/SosGetFois.context";
import DataSourceHandler from "../handler/DataSource.handler";
import SweApiContext from "../sweapi/SweApi.context";
import SweApiHandler from "../sweapi/SweApi.handler";
import TimeSeriesHandler from "../handler/TimeSeries.handler";

let dataSourceHandler = undefined;

self.onmessage = (event) => {
    handleMessage(event.data, self);
};

function handleMessage(event) {
    let value;
    if(!isDefined(dataSourceHandler)) {
        if(event.message === 'init') {
            dataSourceHandler = createHandlerFromProperties(event.properties);
            dataSourceHandler.init(event.properties, event.topics, event.id);
            value = dataSourceHandler.isInitialized();
        }
    } else {
        if (event.message === 'connect') {
            dataSourceHandler.connect();
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
}

function createHandlerFromProperties(properties) {
    // create context to set to the DataSourceHandler
    let context;
    if(properties.type === 'SosGetResult') {
        context = new SosGetResultContext();
        return new TimeSeriesHandler(context);
    } else if(properties.type === 'SosGetFois') {
        context = new SosGetFoisContext();
        return new DataSourceHandler(context);
    } else if(properties.type === 'SweApiStream') {
        context = new SweApiContext();
        return new SweApiHandler(context);
    } else {
        throw Error('Unsupported SOS service Error');
    }
}
