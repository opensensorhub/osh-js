/**
 * Created by mdhsl on 5/4/17.
 */

import X2JS from "../../../vendor-local/x2js/x2js.js";

/**
 * @class Javascript binding for SWE requests
 * @classdesc
 *
 */

export default class SWEJsonParser {

    constructor(json) {
        this.originalJson = json;

        let x2jsOptions = {
            xmlns: true, // does not keep xmlns
            attributePrefix:"",
            prefix: true,
            removeAttrPrefix:false
        };

        this.x2jsParser = new X2JS(x2jsOptions);
    }

    toJson() {
        return {};
    }

    toXml() {
        return this.x2jsParser.json2xml_str(this.originalJson);

    }
}
