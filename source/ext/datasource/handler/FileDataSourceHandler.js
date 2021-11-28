/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2021 Georobotix Inc.. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import DataSourceHandler from "../../../core/datasource/handler/DataSourceHandler";
import FileConnector from "../../protocol/FileConnector";

class FileDataSourceHandler  extends DataSourceHandler {

    constructor(parser) {
        super(parser);
    }

    /**
     * Override default data connector build
     * @private
     */
    createDataConnector(properties) {
        const url = this.parser.buildUrl({
            ...properties,
            timeShift: this.timeShift
        });

        this.connector = new FileConnector(url,properties);

        // set the reconnectTimeout
        this.connector.setReconnectTimeout(this.reconnectTimeout);

        // connects the callback
        this.connector.onMessage = this.onMessage.bind(this);

        // bind change connection STATUS
        this.connector.onChangeStatus   = this.onChangeStatus.bind(this);
    }
}
export default FileDataSourceHandler;

