import VideoParser from "./Video.parser";

class VideoWithRollParser extends VideoParser {
    /**
     * Extract data from the message. The H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length.
     * @param {ArrayBuffer} data - the data to parse
     * @return {Uint8Array} the parsed data
     */
    parseData(data) {
        return {
            // H264 NAL unit starts at offset 14 after 8-bytes time stamp, 2-bytes roll value, and 4-bytes frame length
            frameData: new Uint8Array(data, 14),
            roll: new DataView(data).getInt16(8, false)
        }
    }
}

export default  VideoWithRollParser;
