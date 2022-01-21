import TimeSeriesParser from "../../parsers/TimeSeriesParser.parser";

class AudioParserRaw extends TimeSeriesParser {

    /**
     * Extracts timestamp from the message. The timestamp is corresponding to the first 64bits of the binary message.
     * @param {ArrayBuffer} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        // read double time stamp as big endian
        return new DataView(data).getFloat64(0, true) * 1000;
    }

    /**
     * Parse sample data from buffer
     * @param {ArrayBuffer} data - the data to parse
     * @return {Uint8Array} the parsed data
     */
    parseData(data) {
        // 8 bytes for timestamp
        // 4 bytes for sampleRate
        // 4 bytes for nbSamples
        // numSamples * 4 bytes for samples
        let sr = new DataView(data).getUint32(8, true);
        let numSamples = new DataView(data).getUint32(12, true);
        let samples = new Float32Array(data.slice(16, data.byteLength));

        return {
            sampleRate: sr,
            nbSamples: numSamples,
            frameData: samples
        }
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
     * @param {String} properties.startTime sthe start time (ISO format)
     * @param {String} properties.endTime the end time timestampISO formast)
     * @param {Number} properties.replaySpeed thtsr
     * @param {String} properties.foiId the foiId
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Date} properties.lastTimeStamp - the last timestamp to start at this time (ISO String)
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

export default AudioParserRaw;
