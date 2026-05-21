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

import ConSysApiContext from "./ConSysApi.context";
import DataStream from "../../../consysapi/datastream/DataStream";
import {isDefined} from "../../../utils/Utils";
import ControlStream from "../../../consysapi/controlstream/ControlStream";

class ConSysApiRealTimeContext extends ConSysApiContext {
    init(properties) {
        this.properties = properties;

        const networkProperties = {
            ...properties,
            streamProtocol: properties.protocol
        };
        let filter;
        let regex = new RegExp('\\/systems\\/(.*)\\/controlstreams\\/(.*)\\/status');

        this.streamObject = undefined;

        // check control status
        if(regex.test(properties.resource)) {
            filter = this.createControlStreamFilter(properties);
            // is observation streaming
            const match = regex.exec(properties.resource);

            this.streamObject = new ControlStream({
                id: match[2],
                'system@id': match[1]
            }, networkProperties);
            this.streamFunction = function() {
                this.streamObject.streamStatus(filter, (messages) => this.onStreamMessage(messages, filter.props.format));
            }
        } else {
            // check for datastream observations
            regex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/observations
            if(regex.test(properties.resource)) {
                filter = this.createObservationFilter(properties);
                // is observation streaming
                const match = regex.exec(properties.resource);
                this.streamObject = new DataStream({
                    id: match[2]
                }, networkProperties);
                this.streamFunction = function() {
                    this.streamObject.streamObservations(filter, (messages) => this.onStreamMessage(messages, filter.props.format));
                }
            }
        }
        this.streamObject.stream().onChangeStatus = this.onChangeStatus.bind(this);
    }
    onStreamMessage(messages, format) {
         // in case of om+json ,we have to add the timestamp which is not included for each record but at the root level
        let results = messages;
        let version = this.properties.version;
        for(let message of messages) {
            message.version = version;
        }
        this.handleData(results, format);
    }

    connect() {
        this.streamFunction();
    }

    async disconnect() {
        if(isDefined(this.streamObject)) {
            this.streamObject.stream().disconnect();
        }
    }

    isConnected() {
        return this.streamObject.stream().status;
    }
}


export default ConSysApiRealTimeContext;
