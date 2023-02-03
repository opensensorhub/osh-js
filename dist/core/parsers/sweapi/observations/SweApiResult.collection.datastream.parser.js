var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import OmJsonCollectionParser from "../collection/CollectionOmJsonParser.parser";
import SweApiResultDatastreamParser from "./SweApiResult.datastream.parser";
var SweApiResultCollectionDatastreamParser = /** @class */ (function (_super) {
    __extends(SweApiResultCollectionDatastreamParser, _super);
    function SweApiResultCollectionDatastreamParser(dataObject) {
        return _super.call(this, dataObject) || this;
    }
    SweApiResultCollectionDatastreamParser.prototype.init = function (schema, format) {
        if (format === 'application/om+json') {
            //resultSchema
            this.parsers[format].parser = new OmJsonCollectionParser(schema.resultSchema);
        }
        else if (format === 'application/swe+xml') {
            //resultSchema
            throw new Error("Format not supported ".concat(format));
        }
        else {
            _super.prototype.init.call(this, schema, format);
        }
    };
    return SweApiResultCollectionDatastreamParser;
}(SweApiResultDatastreamParser));
export default SweApiResultCollectionDatastreamParser;
//# sourceMappingURL=SweApiResult.collection.datastream.parser.js.map