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
    constructor(url, filter, pageSize, parser) {
        super(url,filter ,pageSize ,parser);
    }

    async fetchData(offset) {
        const queryString = `${this.filter.toQueryString()}&offset=${offset}&limit=${this.pageSize}`;
        const fullUrl = this.url + '?' + queryString;

        const encodedResponse = await fetch(fullUrl, {
            method: 'GET',
            headers: {}
        }).then((response) => {
            if (!response.ok) {
                const err = new Error(`Got ${response.status} response from ${this.baseUrl()}`);
                err.response = response;
                throw err;
            }
            return response.arrayBuffer();
        });

        await this.parseResponse(encodedResponse);
    }

    async parseResponse(encodedResponse) {
        console.log('ici')
        this.data = await this.parser.parseDataBlock(encodedResponse,this.filter.props.format);
        console.log('ici000')
    }
}

export default ObservationsCollection;
