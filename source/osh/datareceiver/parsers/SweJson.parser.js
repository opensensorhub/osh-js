import DataSourceParser from "./DataSourceParser";

class SweJsonParser extends DataSourceParser {
    /**
     * Extracts timestamp from the message. The timestamp corresponds to the 'time' attribute of the JSON object.
     * @param {String} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        console.log(data);
        let rec = String.fromCharCode.apply(null, new Uint8Array(data));
        let parseRec = JSON.parse(rec);
        console.log(parseRec);
        console.log('HasPropTime', rec.hasOwnProperty('Time'));

        let timestamp;
        if(parseRec.hasOwnProperty('Time')){
            console.log(parseRec.Time);
            timestamp =  new Date(parseRec.Time).getTime();
        }else if(parseRec.hasOwnProperty('time')){
           timestamp =  new Date(parseRec.time).getTime();
        }
        console.log(timestamp);

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

    /**
     * Builds the full url.
     * @param {Object} properties
     * @param {String} properties.protocol - the connector protocol
     * @param {String} properties.endpointUrl - the endpoint url
     * @param {String} properties.service - the service
     * @param {String} properties.offeringID - the offeringID
     * @param {String} properties.observedProperty -  the observed property
     * @param {String} properties.startTime - the start time (ISO format)
     * @param {String} properties.endTime - the end time (ISO format)
     * @param {Number} properties.replaySpeed - the replay factor
     * @param {Number} properties.responseFormat - the response format (e.g video/mp4)
     * @param {Number} properties.timeShift - the time to shift
     * @return {String} the full url
     */
    buildUrl(properties) {
        let url = "";

        // adds protocol
        url += properties.protocol + "://";

        // adds endpoint url
        url += properties.endpointUrl + "?";

        // adds service
        url += "service=" + properties.service + "&";

        // adds version
        url += "version=2.0&";

        // adds request
        url += "request=GetResult&";

        // adds offering
        url += "offering=" + properties.offeringID + "&";

        // adds feature of interest urn
        if (properties.foiURN && properties.foiURN !== '') {
            url += 'featureOfInterest=' + properties.foiURN + '&';
        }

        // adds observedProperty
        url += "observedProperty=" + properties.observedProperty + "&";

        // adds temporalFilter
        let startTime = properties.startTime;
        let endTime = properties.endTime;
        // console.log(startTime);
        // console.log(endTime);
        // console.log('TimeShift', properties.timeShift);
        if (startTime !== "now" && properties.timeShift !== 0) {
            if (properties.timeShift === undefined){
                properties.timeShift =0;
            }
            // HACK: don't do it for old Android dataset that is indexed differently
            if (properties.offeringID !== "urn:android:device:060693280a28e015-sos") {
                // apply time shift
                startTime = new Date(Date.parse(startTime) - properties.timeShift).toISOString();
                endTime = new Date(Date.parse(endTime) - properties.timeShift).toISOString();
                // console.log(startTime);
                // console.log(endTime);
            }
        }
        url += "temporalFilter=phenomenonTime," + startTime + "/" + endTime + "&";

        if (properties.replaySpeed) {
            // adds replaySpeed
            url += "replaySpeed=" + properties.replaySpeed;
        }

        // adds responseFormat (mandatory)
        url += "&responseFormat=application/json";

        return url;
    }
}

export default SweJsonParser;
