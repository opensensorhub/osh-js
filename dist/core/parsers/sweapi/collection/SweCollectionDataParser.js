var SweCollectionDataParser = /** @class */ (function () {
    function SweCollectionDataParser(format) {
        if (format === void 0) { format = 'application/json'; }
        this.format = format;
    }
    SweCollectionDataParser.prototype.parseData = function (data) {
        if (this.format === 'application/om+json' || this.format === 'application/json') {
            return this.parseOmJsonData(data);
        }
        else if (this.format === 'application/swe+json') {
            return this.parseSweJsonData(data);
        }
        else if (this.format === 'application/swe+csv') {
            return this.parseSweCsv(data);
        }
        else if (this.format === 'application/swe+xml') {
            return this.parseSweXml(data);
        }
        else {
            throw Error("Unsupported collection format ".concat(this.format));
        }
    };
    SweCollectionDataParser.prototype.parseOmJsonData = function (data) {
        return (data instanceof ArrayBuffer) ? JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data))).items : data.items;
    };
    SweCollectionDataParser.prototype.parseSweJsonData = function (data) {
        return (data instanceof ArrayBuffer) ? JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data))) : data;
    };
    SweCollectionDataParser.prototype.parseSweCsv = function (data) {
        var content = (data instanceof ArrayBuffer) ? String.fromCharCode.apply(null, new Uint8Array(data)) : data;
        return content.split('\n');
    };
    SweCollectionDataParser.prototype.parseSweXml = function (data) {
        return (data instanceof ArrayBuffer) ? String.fromCharCode.apply(null, new Uint8Array(data)) : data;
    };
    return SweCollectionDataParser;
}());
export default SweCollectionDataParser;
//# sourceMappingURL=SweCollectionDataParser.js.map