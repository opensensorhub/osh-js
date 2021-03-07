import {isDefined} from "../../utils/Utils";
import DataSourceParser from "./DataSourceParser";

class TimeSeriesParserParser extends DataSourceParser{

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
    buildUrl(properties) {
        let url = super.buildUrl(properties);

        // adds request
        url += "&request=GetResult";

        // adds offering
        url += "&offering=" + properties.offeringID;

        // adds observedProperty
        url += "&observedProperty=" + properties.observedProperty;

        // adds temporalFilter
        const stTime = (isDefined(properties.lastTimeStamp)) ? properties.lastTimeStamp :  properties.startTime;
        this.lastStartTime = properties.startTime;
        let endTime = properties.endTime;
        url += "&temporalFilter=phenomenonTime," + stTime+ "/" + endTime;
        if (properties.replaySpeed) {
            // adds replaySpeed
            url += "&replaySpeed=" + properties.replaySpeed;
        }

        return url;
    }
}

export default TimeSeriesParserParser;
