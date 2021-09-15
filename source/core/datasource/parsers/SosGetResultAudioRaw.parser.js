import DataSourceParser from "./DataSourceParser.js";
import TimeSeriesParser from "./TimeSeriesParser.parser";

class AudioParserRaw extends TimeSeriesParser {

    /**
     * Extracts timestamp from the message. The timestamp is corresponding to the first 64bits of the binary message.
     * @param {ArrayBuffer} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        // read double time stamp as big endian
        let ts = new DataView(data).getFloat64(0, false) * 1000;
        console.log('timestamp is ' + ts);
        return ts;
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
        // numSamples * 8 bytes for samples
        let sr = new DataView(data).getUint32(8, false);
        // console.log('sampling rate: ' + sr);
        let numSamples = new DataView(data).getUint32(12, false);
        // console.log(numSamples);
        let endIndex = 16 + numSamples;
        let samples = new Uint8Array(data.slice(16, endIndex));
        // console.log("End Index: " + endIndex);
        // for (let i = 0; i < 256; i++)
        //     if (i < 2) console.log("Sample" + i + ": " + samples[i]); // + "," + samples[1] + "," + samples[2]);
        return {
            sampleRate: sr,
            nbSamples: numSamples,
            // pktLength: new DataView(data).getUint32(16, false),
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
        console.log(url);
        return url;
    }
}

export default AudioParserRaw;