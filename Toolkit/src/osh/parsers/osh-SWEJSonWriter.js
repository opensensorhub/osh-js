/**
 * Created by mdhsl on 5/4/17.
 */

/**
 * @class Javascript binding for SWE requests
 * @classdesc
 *
 */
OSH.SWEJSonWriter = BaseClass.extend({

    initialize:function(xml) {
        this.originalXml = xml;

        var x2jsOptions = {
            xmlns: true, // does not keep xmlns
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
                /.*.constraint\.interval$/
            ],
            numericalAccessFormPaths: ["value", "nilValue", "paddingBytes-after", "paddingBytes-before",
                "byteLength", "significantBits", "bitLength","Count/value","Quantity/value","Time/value"]

        };

        this.x2jsParser = new X2JS(x2jsOptions);
    },

    getXml:function() {
        return this.originalXml;
    },

    getJson:function() {
        return this.x2jsParser.xml_str2json(this.originalXml);

    }
});