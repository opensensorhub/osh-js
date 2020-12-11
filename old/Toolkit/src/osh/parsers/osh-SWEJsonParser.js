/**
 * Created by mdhsl on 5/4/17.
 */

/**
 * @class Javascript binding for SWE requests
 * @classdesc
 *
 */
OSH.SWEJsonParser = BaseClass.extend({

    initialize:function(json) {
        this.originalJson = json;

        var x2jsOptions = {
            xmlns: true, // does not keep xmlns
            attributePrefix:"",
            prefix: true,
            removeAttrPrefix:false
        };

        this.x2jsParser = new X2JS(x2jsOptions);
    },

    toJson:function() {
        return this.originalXml;
    },

    toXml:function() {
        return this.x2jsParser.json2xml_str(this.originalJson);

    }
});