/**
 * Created by mdhsl on 5/4/17.
 */

import X2JS from "../../../vendor-local/x2js/x2js";

/**
 * @class Javascript binding for SWE requests
 * @classdesc
 *
 */
export default class SWEXmlParser {

    constructor(xml) {
        this.originalXml = xml;

        let x2jsOptions = {
            xmlns: false, // does not keep xmlns
            attributePrefix:"",
            prefix: false,
            removeAttrPrefix:true,
            arrayAccessFormPaths : [
                /.*.coordinate$/,
                /.*.field$/,
                /.*.item$/,
                /.*.quality$/,
                /.*.member$/,
                /.*.constraint\.value$/,
                /.*.constraint\.interval$/,
                /.*.offering$/,
                /.*.observableProperty/
            ],
            numericalAccessFormPaths: [
                "value",
                "nilValue",
                "paddingBytes-after",
                "paddingBytes-before",
                "byteLength",
                "significantBits",
                "bitLength",
                /.*.Time\.value/,
                /.*.Quantity\.value/,
                /.*.Count\.value/
            ],
            skip: [
                "type"
            ]

        };

        this.x2jsParser = new X2JS(x2jsOptions);
    }

    toXml() {
        return this.originalXml;
    }

    toJson() {
        return this.x2jsParser.xml_str2json(this.originalXml);
    }
}
