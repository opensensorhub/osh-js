class SweApiMqttJsonParser {

    constructor( properties) {
        this.properties = properties;
    }
    /**
     * Does not return the time since it is generic File parser
     * @param {String} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        return data.phenomenonTime;
    }

    /**
     * Return the data read by the file protocol
     * @param {Object} data - the data to parse
     * @return {Object} the parsed data
     */
    async parseData(data) {
        return data.result;
    }

    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.endpoint the endpoint url
     * @param {String} properties.protocol the protocol mqtt | mqtts
     * @return {String} the full url
     */
    buildUrl(properties) {
        return properties.protocol + '://'+properties.endpoint + '/mqtt';
    }

}

export default SweApiMqttJsonParser;
