import DataSourceParser from "./DataSourceParser.js";

class VideoParser extends DataSourceParser {

    /**
     * Extracts timestamp from the message. The timestamp is corresponding to the first 64bits of the binary message.
     * @param {ArrayBuffer} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        // read double time stamp as big endian
        return new DataView(data).getFloat64(0, false) * 1000;
    }

    /**
     * Extract data from the message. The H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length.
     * @param {ArrayBuffer} data - the data to parse
     * @return {Uint8Array} the parsed data
     */
    parseData(data) {
        return {
            // H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length
            frameData: new Uint8Array(data, 12, data.byteLength - 12),
            roll: 0
        }
    }
}

export default  VideoParser;
