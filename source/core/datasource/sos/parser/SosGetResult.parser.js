import TimeSeriesParser from "../../parsers/TimeSeriesParser.parser";
import TextDataParser from "../../parsers/TextDataParser";
import {assertDefined, assertTrue} from "../../../utils/Utils";

class SosGetResultParser extends TimeSeriesParser {
    constructor() {
        super();
        this.c = false;
    }

    init(properties) {
       this.properties = properties;
    }

    async fetchGetResultTemplate(properties) {
        assertDefined(this.properties,'Properties are not defined, the parser has not been initialized');

        const getResultTemplateUrl = this.buildGetResultTemplateUrl(properties);
        const response = await fetch(getResultTemplateUrl);
        const template = await response.text();
        // define SosParser depending on responseFormat
        if(!('responseFormat' in properties)) {
            this.parser = new TextDataParser();
            this.parser.setSchema(template, true);
        }
    }

    async checkInit() {
        if(!this.initialized) {
            await this.fetchGetResultTemplate(this.properties);
            this.initialized = true;
        }
    }

    async parseDataBlock(data) {
        await this.checkInit();
        let rec = String.fromCharCode.apply(null, new Uint8Array(data));
        const dataBlocks = this.parser.parseDataBlock(rec);
        return dataBlocks[0];
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
     * @param {String} properties.foiId the foiId
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay factor
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Date} properties.lastTimeStamp - the last timestamp to start at this time (ISO String)
     * @param {Object} properties.customUrlParams - the encoding options
     * @return {String} the full url
     */
    buildUrl(properties) {
        let url = super.buildUrl({
            ...properties,
        });

         // adds feature of interest urn
        if (properties.foiId && properties.of !== '') {
            url += '&featureOfInterest=' + properties.foiId;
        }
        return url;
    }

    buildGetResultTemplateUrl(properties) {
        let url = '';

        const protocol = properties.tls ? 'https' : 'http';

        url += protocol + '://' + properties.endpointUrl + '?';

        url += "service=SOS";

        url += "&version=2.0";

        // adds request
        url += "&request=GetResultTemplate";

        // adds offering
        url += "&offering=" + properties.offeringID;

        // adds observedProperty
        url += "&observedProperty=" + properties.observedProperty;

        if('responseFormat' in properties) {
            url += "&responseFormat=" + properties.responseFormat;
        }

        return url;
    }
}

export default SosGetResultParser;
