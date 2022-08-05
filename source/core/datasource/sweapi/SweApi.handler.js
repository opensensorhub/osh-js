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

import TimeSeriesHandler from "../handler/TimeSeries.handler";

class SweApiHandler extends TimeSeriesHandler {
    constructor(context) {
        super(context);
    }

    createState(properties) {
        this.state = this.realTimeState;
        this.updateState(properties);
    }

    init(properties, topics, dataSourceId) {
        super.init(properties, topics, dataSourceId);
        this.context.onMessage = this.onMessage.bind(this);
    }

    connect() {
        // specific to SweApi context
        this.context.startStream();
    }

    async parseData(messages){
        // already parsed by internal SweApi API
        return messages;
    }


    async updateProperties(properties) {
        // re-init the SweApi context using the new values and recreate the stream function
        this.context.init({
            ...this.properties,
            ...properties
        }, this.connector);
        await super.updateProperties(properties, this.connector);
    }

    async onMessage(messages, format) {
        // in case of om+json ,we have to add the timestamp which is not included for each record but at the root level
        if (format === 'application/om+json') {
            let results = [];
            for(let message of messages) {
                results.push({
                    timestamp: message.timestamp,
                    ...message.result
                })
            }
            return super.onMessage(results);
        } else {
            return super.onMessage(messages);
        }
    }
}

export default SweApiHandler;
