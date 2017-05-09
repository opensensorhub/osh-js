/**
 * Created by mdhsl on 5/4/17.
 */

/**
 * @class Javascript binding for SWE requests
 * @classdesc
 *
 */
OSH.SWEXmlParser = BaseClass.extend({

    initialize:function(xml) {
        this.originalXml = xml;

        var x2jsOptions = {
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
    },

    toXml:function() {
        return this.originalXml;
    },

    toJson:function() {
        return this.x2jsParser.xml_str2json(this.originalXml);

    }
});