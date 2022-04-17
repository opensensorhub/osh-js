/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import Collection from "./Collection";
import {isDefined} from "../utils/Utils";

class ObservationsCollection extends Collection {
    /**
     *
     */
    constructor(url, filter, pageSize, parser, connector) {
        super(url,filter ,pageSize ,parser ,connector );
    }

    async parseResponse(encodedResponse) {
        this.data = this.collectionDataParser.parseData(encodedResponse);
        this.parseBoundsOffset(encodedResponse);
    }
}

export default ObservationsCollection;
