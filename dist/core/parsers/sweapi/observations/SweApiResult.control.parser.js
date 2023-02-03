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
import OmJsonParser from "../common/OmJsonParser.parser";
import SweApiResultParser from "./SweApiResult.parser";
import SweJsonParser from "../common/SweJsonParser.parser";
import SweBinaryParser from "../common/SweBinaryParser.parser";
import SweCsvParser from "../common/SweCsvParser.parser";
var SweApiResultControlParser = /** @class */ (function (_super) {
    __extends(SweApiResultControlParser, _super);
    function SweApiResultControlParser(dataObject) {
        return _super.call(this, dataObject) || this;
    }
    SweApiResultControlParser.prototype.init = function (schema, format) {
        if (format === 'application/om+json') {
            //resultSchema
            this.parsers[format].parser = new OmJsonParser(schema.commandSchema);
        }
        else if (format === 'application/swe+json') {
            //recordSchema
            this.parsers[format].parser = new SweJsonParser(schema.commandSchema);
        } /*else if(format === 'application/swe+xml') {
            //recordSchema
            this.parsers[format].parser = new SweXmlParser(schema.recordSchema);
        }*/
        else if (format === 'application/swe+binary') {
            //recordSchema
            this.parsers[format].parser = new SweBinaryParser(schema.commandSchema, schema.commandEncoding);
        }
        else if (format === 'application/swe+csv') {
            //recordSchema
            this.parsers[format].parser = new SweCsvParser(schema.commandSchema, schema.commandEncoding);
        }
        else {
            throw Error("Not supported parser format: ".concat(format));
        }
    };
    return SweApiResultControlParser;
}(SweApiResultParser));
export default SweApiResultControlParser;
//# sourceMappingURL=SweApiResult.control.parser.js.map