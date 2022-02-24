import TimeSeriesParser from "../../../parsers/TimeSeriesParser.parser";

class SweApiFetchGenericJson extends TimeSeriesParser {

    constructor(timeFieldName) {
        super();
        this.timeFieldName = timeFieldName || 'phenomenonTime';
    }
    /**
     * Extracts timestamp from the message. The timestamp corresponds to the 'time' attribute of the JSON object.
     * @param {String} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        let rec = data;
        if((data instanceof ArrayBuffer)) {
            rec = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));
        }

        return new Date(rec[this.timeFieldName]).getTime();
    }

    /**
     * Extract data from the message. The data are corresponding to the whole list of attributes of the JSON object
     * excepting the 'time' one.
     * @param {Object} data - the data to parse
     * @return {Object} the parsed data
     * @example
     * {
     *   location : {
     *    lat:43.61758626,
     *    lon: 1.42376557,
     *    alt:100
     *   }
     * }
     */
    parseData(data) {
        const result = (data instanceof ArrayBuffer) ? JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data))) : data;
        if(result.hasOwnProperty('result')) {
            return result.result;
        } else {
            return result;
        }
    }

    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @return {String} the full url
     */
    buildUrl(properties) {
    }
}

export default SweApiFetchGenericJson;
