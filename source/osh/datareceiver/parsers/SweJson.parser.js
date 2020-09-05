import DataSourceParser from "./DataSourceParser";

class SweJsonParser extends DataSourceParser {
    /**
     * Extracts timestamp from the message. The timestamp corresponds to the 'time' attribute of the JSON object.
     * @param {String} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        let rec = String.fromCharCode.apply(null, new Uint8Array(data));
        let parseRec = JSON.parse(rec);

        let timestamp;
        if(parseRec.hasOwnProperty('Time')){
            timestamp =  new Date(parseRec.Time).getTime();
        }else if(parseRec.hasOwnProperty('time')){
           timestamp =  new Date(parseRec.time).getTime();
        }
        // console.log(timestamp);

        return timestamp
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
        let rec = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));

        let result = {};

        for (let key in rec) {
            if (key !== 'time') {
                result[key] = rec[key];
            }
        }
        return result;
    }

    buildUrl(properties) {
        return super.buildUrl({
            ...properties,
            responseFormat: 'application/json'
        });
    }
}

export default SweJsonParser;
