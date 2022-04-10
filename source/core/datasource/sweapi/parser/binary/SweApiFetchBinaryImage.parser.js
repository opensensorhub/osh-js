class SweApiFetchBinaryImage  {
    /**
     * Parses variable size image data, the width and height of the image are provided within
     * the data stream, so those bytes must be skipped to get the actual image data to display
     */

    /**
     * Extracts timestamp from the message. The timestamp corresponds to the 'time' attribute of the JSON object.
     * @param {String} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        console.log("parsing time");
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
        console.log("parsing data");
        return {
            // Variable size image data starts offset by 20 bytes:
            //  8 for time stamp + 4 for payload size
            //  4 for width
            //  4 for height
            frameData: new Uint8Array(data, 12 + (4 + 4), data.byteLength - (12 + 4 + 4)),
            roll: 0
        };
    }
}

export default SweApiFetchBinaryImage;
