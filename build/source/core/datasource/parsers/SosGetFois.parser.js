import DataSourceParser from "./DataSourceParser";
import {assertDefined, isDefined} from "../../utils/Utils";
import SWEXmlStreamParser from "../../parsers/SWEXmlStreamParser.js";

class SosGetFoisParser extends DataSourceParser {
    /**
     * Extract data from the message. The message is in XML format following the OGC specification
     * @param {Object} data - the data to parse
     * @return {Object} the parsed data
     * @example
        <?xml version='1.0' encoding='UTF-8'?>
        <sos:GetFeatureOfInterestResponse xmlns:sos="http://www.opengis.net/sos/2.0"
                                          xmlns:gml="http://www.opengis.net/gml/3.2"
                                          xmlns:xlink="http://www.w3.org/1999/xlink"
                                          xmlns:ns1="http://www.opengis.net/sensorml/2.0">
            <sos:featureMember>
                <ns1:PhysicalSystem gml:id="FE12">
                    <gml:description>Vehicle FE12 from Huntsville Fire Department</gml:description>
                    <gml:identifier codeSpace="uid">urn:core:sensor:avl:911:fleet:FE12</gml:identifier>
                    <gml:name>FE12</gml:name>
                </ns1:PhysicalSystem>
            </sos:featureMember>
            <sos:featureMember>
                <ns1:PhysicalSystem gml:id="FE4">
                    <gml:description>Vehicle FE4 from Huntsville Fire Department</gml:description>
                    <gml:identifier codeSpace="uid">urn:core:sensor:avl:911:fleet:FE4</gml:identifier>
                    <gml:name>FE4</gml:name>
                </ns1:PhysicalSystem>
            </sos:featureMember>
        </sos:GetFeatureOfInterestResponse>
     */
    async parseData(data) {
        let sweXmlParser = new SWEXmlStreamParser(data);
        sweXmlParser.setXml(data);
        const json =  sweXmlParser.toJson();
        assertDefined(json.GetFeatureOfInterestResponse,'json.GetFeatureOfInterestResponse does not exist');
        assertDefined(json.GetFeatureOfInterestResponse.featureMember,'json.GetFeatureOfInterestResponse.featureMember does not exist');
        return json.GetFeatureOfInterestResponse.featureMember;
    }

    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.protocol the protocol protocol
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.procedureId the foi procedure id
     * @param {String} [properties.responseFormat=application/xml] the response format (e.g video/mp4)
     * @return {String} the full url
     */
    buildUrl(properties) {
        let url = super.buildUrl({
            responseFormat:'application/xml',
            ...properties,
        });
        // adds request
        url += "&request=GetFeatureOfInterest";

        // adds foiURN if any
        if(isDefined(properties.procedureId)) {
            url += '&procedure='+properties.procedureId;
        }
        return url;
    }
}

export default SosGetFoisParser;
