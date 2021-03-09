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
import { isDefined } from "../../utils/Utils";
import DataSourceParser from "./DataSourceParser";
var TimeSeriesParserParser = /** @class */ (function (_super) {
    __extends(TimeSeriesParserParser, _super);
    function TimeSeriesParserParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.protocol the protocol protocol
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay factor
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Date} properties.lastTimeStamp - the last timestamp to start at this time (ISO String)
     * @param {Object} properties.customUrlParams - the encoding options
     * @return {String} the full url
     */
    TimeSeriesParserParser.prototype.buildUrl = function (properties) {
        var url = _super.prototype.buildUrl.call(this, properties);
        // adds request
        url += "&request=GetResult";
        // adds offering
        url += "&offering=" + properties.offeringID;
        // adds observedProperty
        url += "&observedProperty=" + properties.observedProperty;
        // adds temporalFilter
        var stTime = (isDefined(properties.lastTimeStamp)) ? properties.lastTimeStamp : properties.startTime;
        this.lastStartTime = properties.startTime;
        var endTime = properties.endTime;
        url += "&temporalFilter=phenomenonTime," + stTime + "/" + endTime;
        if (properties.replaySpeed) {
            // adds replaySpeed
            url += "&replaySpeed=" + properties.replaySpeed;
        }
        return url;
    };
    return TimeSeriesParserParser;
}(DataSourceParser));
export default TimeSeriesParserParser;
//# sourceMappingURL=TimeSeriesParser.parser.js.map