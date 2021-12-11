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

import {isDefined} from "../../utils/Utils";

class Collection {
    /**
     *
     */
    constructor(url, filter, pageSize, parser, connector) {
        this.url = url;
        this.filter = filter;
        this.pageSize = pageSize;
        this.parser = parser;
        this.connector = connector;
        this.nextOffset = 0;
        this.parseData = [];
        this.init = false;
        this.cursorPosition = 0;
        this.total = 0;
    }

    // cannot fetch dynamically data here otherwise we must change this function into async
    hasNext() {
        return this.cursorPosition <= this.nextOffset || this.cursorPosition < this.parseData.length;
    }

    async fetchData() {
        const response = await this.connector.doRequest(
            this.url,
            `${this.filter.toQueryString()}&offset=${this.nextOffset}&limit=${this.pageSize}`,
            this.filter.props.format
            );
        this.onFetchData(response);
    }

    onFetchData(response) {
        this.parseResponse(response);
    }

    parseResponse(encodedResponse) {
        const response = this.parser.parseData(encodedResponse);
        for(let i=0;i < response.items.length;i++) {
            this.parseData.push(response.items[i]);
        }
        this.nextOffset = this.parseNextOffset(response);

    }

    parseNextOffset(response) {
        const links = response.links;
        if (isDefined(links)) {
            // check all rel and find out 'next' property
            for (let i = 0; i < links.length; i++) {
                if (links[i].rel === 'next') {
                    // update nextOffset
                    const url = new URL(links[i].href);
                    return parseInt(url.searchParams.get('offset'));
                }
            }
        }
        return -1;// max values
    }

    async nextPage(pageSize = undefined) {
        // > 0 => 0 = start, -1 = maxValues
        if (this.parseData.length === 0 || (this.nextOffset > 0 &&
            (this.nextOffset > this.parseData.length
            || this.cursorPosition === this.nextOffset))
        ) {
            await this.fetchData();
        }
        const length = Math.min(this.cursorPosition+this.pageSize, this.parseData.length);
        const result = this.parseData.slice(this.cursorPosition, length);
        this.cursorPosition += result.length;

        return result;
    }

    previousPage(pageSize = undefined) {
        this.cursorPosition = this.cursorPosition - this.pageSize;
        let length = this.pageSize;
        if(this.cursorPosition < 0 ){
            length = this.cursorPosition + this.pageSize;
            this.cursorPosition = 0;
        }
        return this.parseData.slice(this.cursorPosition, this.cursorPosition + length);
    }

    hasPrevious() {
        return this.cursorPosition > 0;
    }

}

export default Collection;
