class SweApiFetchBinaryVideoParser  {
    /**
     * Extracts timestamp from the message. The timestamp corresponds to the 'time' attribute of the JSON object.
     * @param {String} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        return new DataView(data).getFloat64(0, false) * 1000;
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
        return {
            // H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length
            frameData: new Uint8Array(data, 12, data.byteLength - 12),
            roll: 0
        }
    }
}

export default SweApiFetchBinaryVideoParser;
