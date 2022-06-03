class SweCollectionDataParser {

    constructor(format = 'application/json') {
        this.format = format;
    }

    parseData(data) {
        if (this.format === 'application/om+json' || this.format === 'application/json') {
            return this.parseOmJsonData(data);
        } else if (this.format === 'application/swe+json') {
            return this.parseSweJsonData(data);
        } else if (this.format === 'application/swe+csv') {
            return this.parseSweCsv(data);
        }  else if (this.format === 'application/swe+xml') {
            return this.parseSweXml(data);
        }  else {
            throw Error(`Unsupported collection format ${this.format}`);
        }
    }

    parseOmJsonData(data) {
        return (data instanceof ArrayBuffer) ? JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data))).items : data.items;
    }

    parseSweJsonData(data) {
        return (data instanceof ArrayBuffer) ? JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data))) : data;
    }

    parseSweCsv(data) {
        let content = (data instanceof ArrayBuffer) ? String.fromCharCode.apply(null, new Uint8Array(data)) : data;
        return content.split('\n');
    }
    parseSweXml(data) {
        return (data instanceof ArrayBuffer) ? String.fromCharCode.apply(null, new Uint8Array(data)) : data;
    }
}
export default SweCollectionDataParser;
