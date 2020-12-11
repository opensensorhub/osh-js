window.OSH.Services = {};

OSH.Services.WFST = BaseClass.extend({
    initialize: function (properties) {

        this.options = {};

        if(typeof(properties) !== "undefined") {
            if(properties.featureNS) {
                this.featureNS = properties.featureNS;
                this.options['featureNS'] = properties.featureNS;
            }

            if(properties.featureType) {
                this.featureType = properties.featureType;
                this.options['featureType'] = properties.featureType;
            }

            if(properties.srsName) {
                this.srsName = properties.srsName;
                this.options['srsName'] = properties.srsName;
            }

            if(properties.featurePrefix) {
                this.featurePrefix = properties.featurePrefix;
                this.options['featurePrefix'] = properties.featurePrefix;
            }
        }

        this.DOCUMENT = document.implementation.createDocument('', '', null);
    },

    writeTransaction:function(inserts,updates,deletes) {
        var node = this.DOCUMENT.createElementNS('http://www.opengis.net/wfs', 'Transaction');
        node.setAttribute('service', 'WFS');
        node.setAttribute('version', '1.1.0');

        node.setAttributeNS('http://www.w3.org/2001/XMLSchema-instance','xsi:schemaLocation',"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd");

        var objectStack = [];

        var obj = {node: node, 'featureNS': this.featureNS,
            'featureType': this.featureType, 'featurePrefix': this.featurePrefix,
            'srsName': this.srsName};

        if (inserts) {

            this.assign(obj, new ol.format.GML(this.options));
            ol.xml.pushSerializeAndPop(
                obj,
                ol.format.WFS.TRANSACTION_SERIALIZERS_,
                ol.xml.makeSimpleNodeFactory('Insert'),
                inserts,
                objectStack);
        }

        if (updates) {
            this.assign(obj, new ol.format.GML(this.options));

            ol.xml.pushSerializeAndPop(obj,
                ol.format.WFS.TRANSACTION_SERIALIZERS_,
                ol.xml.makeSimpleNodeFactory('Update'),
                updates,
                objectStack);
        }

        if (deletes) {
            ol.xml.pushSerializeAndPop(obj,
                ol.format.WFS.TRANSACTION_SERIALIZERS_,
                ol.xml.makeSimpleNodeFactory('Delete'), deletes,
                objectStack);
        }

        return node;
    },

    //TODO: should be move into OSH.Utils
    assign:function(target,src) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var i = 1, ii = arguments.length; i < ii; ++i) {
            var source = arguments[i];
            if (source !== undefined && source !== null) {
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        output[key] = source[key];
                    }
                }
            }
        }
        return output;
    }
});