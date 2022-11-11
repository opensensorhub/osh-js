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

import SweCollectionDataParser from "../parsers/sweapi/collection/SweCollectionDataParser";

class Collection {
    /**
     *
     */
    constructor(url, filter, pageSize, parser, responseFormat = 'json') {
        this.url = url;
        this.filter = filter;
        this.pageSize = pageSize;
        this.parser = parser;
        this.pageOffset = 0;
        this.init = false;
        this.total = 0;
        this.collectionDataParser = new SweCollectionDataParser(filter.props.format);
        this.responseFormat = responseFormat;
        this.currentPage = -1;
    }

    /**
     * Check if has next page
     * @return {boolean}
     */
    hasNext() {
        return this.pageOffset !== -1;
    }

    async fetchData(offset) {
        const queryString = `${this.filter.toQueryString()}&offset=${offset}&limit=${this.pageSize}`;
        const fullUrl = this.url + '?' + queryString;

        const jsonResponse = await fetch(fullUrl, {
            method: 'GET',
            headers: {}
        }).then((response) => {
            if (!response.ok) {
                const err = new Error(`Got ${response.status} response from ${fullUrl}`);
                err.response = response;
                throw err;
            }
            if (this.responseFormat === 'json') {
                return response.json();
            } else if (this.responseFormat === 'arraybuffer') {
                return response.arrayBuffer();
            }
        });

        return this.parseResponse(jsonResponse);
    }

    async parseResponse(jsonResponse) {
        const items = this.collectionDataParser.parseData(jsonResponse);
        const data = [];
        if (Array.isArray(items)) {
            for (let item of items) {
                data.push(this.parser.parseData(item));
            }
        } else {
            data.push(items);
        }
        return data;
    }

    /**
     * Fetches next page.
     * @param page - the number of page to fetch
     * @return {Promise<Array>}
     */
    async nextPage() {
        if (this.hasNext()) {
            this.currentPage++;
            this.pageOffset = this.currentPage * this.pageSize;
            const data = await this.fetchData(this.pageOffset);
            if (data.length === 0 || data.length < this.pageSize) {
                this.pageOffset = -1;
            }
            return data;
        } else {
            throw Error('Has no more pages');
        }
    }

    async page(page) {
        this.currentPage = page;
        this.pageOffset = this.currentPage * this.pageSize;
        const data = await this.fetchData(this.pageOffset);
        if (data.length === 0 || data.length < this.pageSize) {
            this.pageOffset = -1;
        }
        return data;
    }

    /**
     * Fetches previous page.
     * @param page - the number of page to fetch
     * @return {Promise<Array>}
     */
    async previousPage() {
        if (this.hasPrevious()) {
            this.currentPage--;
            this.pageOffset = this.currentPage * this.pageSize;
            return this.fetchData(this.pageOffset);
        } else {
            throw Error('Has no more pages');
        }
    }

    /**
     * Check if has previous page
     * @return {boolean}
     */
    hasPrevious() {
        return this.currentPage > 0;
    }

}

export default Collection;
