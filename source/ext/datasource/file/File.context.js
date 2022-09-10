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

import DataSourceContext from "../../../core/datasource/context/DataSource.context";
import {assertArray, isDefined} from "../../../core/utils/Utils";
import FileParser from "../../parsers/File.parser";

class FileContext extends DataSourceContext {

    constructor() {
        super(new FileParser());
    }

    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.paths the file paths
     * @return {String} the full url or array of urls
     */
    getPaths(properties) {
        assertArray(properties.paths);
        return properties.paths;
    }

    connect() {
        if(isDefined(this.connector)) {
            this.connector.doRequest(this.getPaths(this.properties));
        } else {
            throw Error('there is no connector defined');
        }
    }
}

export default FileContext;