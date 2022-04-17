class SweCollectionDataParser {

    constructor(format, parser) {
        this.format = format;
        this.parser = parser;
    }

    parseData(data) {
        if (this.format === 'application/om+json' || this.format === 'application/json') {
            return this.parseOmJsonData(data);
        } else if (this.format === 'application/swe+json') {
            return this.parseSweJsonData(data);
        } else if (this.format === 'application/swe+csv' || this.format === 'application/swe+xml') {
            return this.parseSweText(data);
        } else {
            throw Error(`Unsupported collection format ${this.format}`);
        }
    }

    parseOmJsonData(data) {
        return (data instanceof ArrayBuffer) ? JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data))).items : data.items;
    }

    parseSweJsonData(data) {
        return (data instanceof ArrayBuffer) ? JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data))) : data;
    }

    parseSweText(data) {
        return (data instanceof ArrayBuffer) ? String.fromCharCode.apply(null, new Uint8Array(data)) : data;
    }
}
export default SweCollectionDataParser;
