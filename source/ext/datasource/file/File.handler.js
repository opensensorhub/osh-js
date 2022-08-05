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

import FileConnector from "../../connector/FileConnector";
import DataSourceHandler from "../../../core/datasource/handler/DataSource.handler";

class FileHandler extends DataSourceHandler {
    constructor(context) {
        super(context);
    }

    /**
     * Override default data connector build
     * @private
     */
    createDataConnector(properties) {
        return new FileConnector(this.context.getPath(properties),properties);
    }

    async parseData(message) {
        return this.context.getParser().parseDataBlock(message);
    }
}

export default FileHandler;
