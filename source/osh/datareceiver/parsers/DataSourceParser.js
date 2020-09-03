import {isDefined} from "../../utils/Utils";

class DataSourceParser {
    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.protocol the connector protocol
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
     * @param {Number} properties.customUrlParams.video_bitrate - define a custom bitrate (in b/s)
     * @param {Number} properties.customUrlParams.video_scale - define a custom scale, 0.0 < value < 1.0
     * @param {Number} properties.customUrlParams.video_width - define a custom width
     * @param {Number} properties.customUrlParams.video_height - define a custom height
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
        const stTime = (isDefined(properties.lastTimeStamp)) ? properties.lastTimeStamp :  properties.startTime;
        this.lastStartTime = properties.startTime;
        let endTime = properties.endTime;
        url += "temporalFilter=phenomenonTime," + stTime+ "/" + endTime + "&";
        if (properties.replaySpeed) {
            // adds replaySpeed
            url += "replaySpeed=" + properties.replaySpeed;
        }

        // adds responseFormat (optional)
        if (properties.responseFormat) {
            url += "&responseFormat=" + properties.responseFormat;
        }

        if(isDefined(properties.customUrlParams) && Object.keys(properties.customUrlParams).length > 0) {
            url += '&';
            for (let key in properties.customUrlParams) {
                url += key+'='+properties.customUrlParams[key]+'&';
            }
            if(url.endsWith('&')) {
                url = url.slice(0, -1);
            }
        }
        return url;
    }
}

export default DataSourceParser;
