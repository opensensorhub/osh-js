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
import {assertArray} from "../../../core/utils/Utils";

class FileDataSourceHandler  extends DataSourceHandler {

    constructor(parser) {
        super();
        this.parser = parser
    }

    /**
     * Override default data connector build
     * @private
     */
    async createDataConnector(properties) {
        const fileConnector = new FileConnector(this.buildUrl(properties),properties);
        await super.createDataConnector(properties, fileConnector);
    }

    async parseData(message) {
        return Promise.resolve(this.parser.parseDataBlock(message));
    }

    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.protocol the protocol protocol
     * @param {String} properties.paths the file paths
     * @return {String} the full url or array of urls
     */
    buildUrl(properties) {
        assertArray(properties.paths);
        return properties.paths;
    }
}
export default FileDataSourceHandler;

