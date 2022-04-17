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

import {isDefined} from "../utils/Utils";
import SweCollectionDataParser from "./SweCollectionDataParser";

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
        this.currentOffset = 0;
        this.nextOffset = undefined;
        this.previousOffset = undefined;
        this.init = false;
        this.total = 0;
        this.data = [];
        this.collectionDataParser = new SweCollectionDataParser(filter.props.format);
    }

    /**
     * Check if has next page
     * @return {boolean}
     */
    hasNext() {
        return !isDefined(this.nextOffset) || (this.nextOffset !== -1);
    }

    async fetchData(offset) {
        const response = await this.connector.doRequest(
            this.url,
            `${this.filter.toQueryString()}&offset=${offset}&limit=${this.pageSize}`,
            this.filter.props.responseType
            );
        await this.onFetchData(response);
    }

    async onFetchData(response) {
        await this.parseResponse(response);
    }

    async parseResponse(encodedResponse) {
        const items = this.collectionDataParser.parseData(encodedResponse);
        for(let item of items) {
            this.data.push(this.parser.parseData(item));
        }
        this.parseBoundsOffset(encodedResponse);
    }

    parseBoundsOffset(encodedResponse) {
        try {
            let response = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(encodedResponse)));
            const links = response.links;
            let next = false, previous = false;
            if (isDefined(links)) {
                // check all rel and find out 'next' property
                for (let i = 0; i < links.length; i++) {
                    if (links[i].rel === 'next') {
                        // update nextOffset
                        const url = new URL(links[i].href);
                        this.nextOffset = parseInt(url.searchParams.get('offset'));
                        next = true;
                    }
                    if (links[i].rel === 'prev') {
                        // update nextOffset
                        const url = new URL(links[i].href);
                        this.previousOffset = parseInt(url.searchParams.get('offset'));
                        previous = true;
                    }
                }
            }
            if (!next) {
                this.nextOffset = -1;
            }
            if (!previous) {
                this.previousOffset = -1;
            }
        } catch (error) {
            // skip error, useful for initial JSON fetch then XML one
        }
    }

    /**
     * Fetches next page.
     * @param page - the number of page to fetch
     * @return {Promise<Array>}
     */
    async nextPage(page = undefined) {
        if(isDefined(page)) {
            this.nextOffset = page * this.pageSize;
        } else {
            if(!isDefined(this.nextOffset)) {
                this.nextOffset = 0;
            }
        }
        await this.fetchData(this.nextOffset);
        return this.data;
    }

    /**
     * Fetches previous page.
     * @param page - the number of page to fetch
     * @return {Promise<Array>}
     */
    async previousPage(page = undefined) {
        if(isDefined(page)) {
            this.previousOffset = page * this.pageSize;
        } else {
            if(!isDefined(this.previousOffset)) {
                this.previousOffset = 0;
            }
        }
        await this.fetchData(this.previousOffset);
        return this.data;
    }

    /**
     * Check if has previous page
     * @return {boolean}
     */
    hasPrevious() {
        return !isDefined(this.previousOffset) || (this.previousOffset !== -1);
    }

}

export default Collection;
