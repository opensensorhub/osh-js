import TimeSeriesParser from 'osh-js/core/datasource/parsers/TimeSeriesParser.parser';

class AudioParser extends TimeSeriesParser {

    /**
     * Extracts timestamp from the message. The timestamp is corresponding to the first 64bits of the binary message.
     * @param {ArrayBuffer} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        // read double time stamp as big endian
        return data;
    }

    /**
     * Extract data from the message. The H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length.
     * @param {ArrayBuffer} data - the data to parse
     * @return {Uint8Array} the parsed data
     */
    parseData(data) {
       return data;
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
     * @param {String} properties.foiId the foiId
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Date} properties.lastTimeStamp - the last timestamp to start at this time (ISO String)
     * @param {Object} properties.customUrlParams - the encoding options
     * @return {String} the full url
     */
    buildUrl(properties) {
        let url = super.buildUrl(properties);

        // adds feature of interest urn
        if (properties.foiId && properties.of !== '') {
            url += '&featureOfInterest=' + properties.foiId;
        }
        return url;
    }
}

export default  VideoParser;
