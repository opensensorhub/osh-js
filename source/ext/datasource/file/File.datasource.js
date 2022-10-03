/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/



import DataSource from "../../../core/datasource/DataSource.datasource";
import FileDataSourceWorker from "../worker/DataSource.file.worker";

/**
 * This datasource provides generic parsing for File input. It is agnostic of the content of the file.
 *
 * @extends DataSource
 * @example
 * import File from 'core/datasource/File.js';
 *
 * let earthquakeDatasource = new File("EQ", {
    protocol: "file",
    paths: ["./data/earthquake.1.csv"]
  });
 */

class FileDataSource extends DataSource {
    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String[]} properties.paths the file paths
     */
    constructor(name, properties) {
        super(name, {
            ...properties,
            protocol: 'file',
            type: 'File'
        });
    }

    async createWorker(properties) {
        return new FileDataSourceWorker();
    }
}

export default FileDataSource;
