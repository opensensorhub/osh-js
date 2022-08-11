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

class DataSourceContext {
    constructor(parser) {
        this.parser = parser;
        this.connector = undefined;
        this.properties = undefined;
    }

    init(properties, connector) {
        this.parser.init(properties);
        this.properties = properties;
        this.connector = connector;
    }

    getParser() {
        return this.parser;
    }

    connect() {
        throw Error('Should be overridden');
    }

    async disconnect() {
        if(isDefined(this.connector)) {
            return this.connector.disconnect();
        } else {
            throw Error('there is no connector defined');
        }
    }

    async parseData(messages) {
        return await this.getParser().parseDataBlock(messages);
    }

    handleData(data) {}

    async onMessage(messages, format) {
        this.handleData(await this.parseData(messages));
    }
}

export default DataSourceContext;
