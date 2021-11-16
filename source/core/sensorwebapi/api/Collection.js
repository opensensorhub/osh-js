import {isDefined} from "../../utils/Utils";

class Collection {
    /**
     *
     */
    constructor(url, queryString, pageSize, parser, connector) {
        this.url = url;
        this.queryString = queryString;
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
        const response = await this.connector.doRequest(`${this.queryString}&offset=${this.nextOffset}&limit=${this.pageSize}`);
        this.parseResponse(response);
    }

    parseResponse(response) {
        const elements = this.parser.parseData(response);
        for(let i=0;i < elements.length;i++) {
            this.parseData.push(elements[i]);
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
        if (this.nextOffset > 0 && (!isDefined(this.parseData)
            || this.parseData.length === 0
            || this.nextOffset > this.parseData.length
            || this.cursorPosition === this.nextOffset)
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
