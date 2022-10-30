import TextDataParser from "../../parsers/TextDataParser";
import {assertDefined, assertTrue, isDefined} from "../../utils/Utils";
import SWEXmlStreamParser from "../../parsers/SWEXmlStreamParser";
import JsonDataParser from "../../parsers/JsonDataParser";
import BinaryDataParser from "../../parsers/BinaryDataParser";

class SosGetResultParser {
    constructor() {
        this.templatePromise = undefined;
    }

    init(properties) {
       this.properties = properties;
    }

    async fetchGetResultTemplate(properties) {
        assertDefined(this.properties,'Properties are not defined, the parser has not been initialized');

        const getResultTemplateUrl = this.buildGetResultTemplateUrl(properties);
        const response = await fetch(getResultTemplateUrl);
        const template = await response.text();


        //
        if('responseFormat' in properties && properties.responseFormat === 'application/json'){
            this.parser = new JsonDataParser(JSON.parse(template), {timeShift: this.properties.timeShift || 0});
        } else {
            let sweXmlParser = new SWEXmlStreamParser(template);
            const json = sweXmlParser.toJson();
            let respSchema;
            // Retro compatibility
            if(isDefined(json.GetResultTemplateResponse)) {
                respSchema = json.GetResultTemplateResponse;
            } else {
                respSchema = json;
            }

            let resultEncoding = respSchema.resultEncoding;
            let rootElement = respSchema.resultStructure
            if(resultEncoding && resultEncoding.type === 'TextEncoding') {
                this.parser = new TextDataParser(rootElement, resultEncoding, {timeShift: this.properties.timeShift || 0});
            } else if(resultEncoding && resultEncoding.type === 'BinaryEncoding') {
                this.parser = new BinaryDataParser(rootElement, resultEncoding, {timeShift: this.properties.timeShift || 0});
            } else {
                throw Error('Not supported parser format');
            }
        }
    }

    async checkInit() {
        if(!this.initialized) {
            if(!isDefined(this.templatePromise)) {
                this.templatePromise = this.fetchGetResultTemplate(this.properties);
            }
            await this.templatePromise;
            this.initialized = true;
        }
    }

    async parseDataBlock(arrayBuffer) {
        await this.checkInit();
        return this.parser.parseDataBlock(arrayBuffer);
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
