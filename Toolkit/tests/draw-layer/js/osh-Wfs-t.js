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
});