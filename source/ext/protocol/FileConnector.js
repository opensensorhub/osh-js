/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import DataConnector from "../../core/protocol/DataConnector";
import {Status} from "../../core/protocol/Status";

/**
 * Defines the FileConnector to read a File content
 * @extends DataConnector
 * @example
 * import FileConnector from 'core/protocol/FileConnector.js';
 *
 * let paths = ['path1','path2]...];
 * let protocol = new FileConnector(paths);
 *
 * // connect
 * protocol.connect();
 *
 * // disconnect
 * protocol.disconnect();
 *
 * // close
 * protocol.close();
 *
 */
class FileConnector extends DataConnector {
    /**
     * @param (string[]) paths - list of file paths
     */
    constructor(paths) {
        super(paths);
        this.opened = false;
    }

    /**
     * Start reading file content
     */
    async doRequest(extraUrl = '', urls = undefined) {
        if(!this.opened) {
            this.opened = true;
            this.onChangeStatus(Status.CONNECTED);
            for(let url of urls) {
                this.onMessage(await fetch(url));
            }
            this.onChangeStatus(Status.DISCONNECTED);
            // read is done
            this.opened = false;
        }
    }

    isConnected() {
        return this.opened;
    }
}

export default FileConnector;
