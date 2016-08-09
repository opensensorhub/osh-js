OSH.DataSender.DataSink = Class.create({
    initialize: function (name, properties, options) {
        if (properties.protocol == "http") {
            this.connector = new OSH.DataConnector.AjaxConnector(this.buildUrl(properties));
            this.connector.onError = this.onCatchError.bind(this);
            this.connector.onSuccess = this.onCatchSuccess.bind(this);
        }
        this.id = "DataSource-" + OSH.Utils.randomUUID();
        this.name = name;
        this.properties = properties;
    },

    sendRequest: function(properties) {
        this.connector.sendRequest(this.buildRequest(properties));
    },

    buildRequest:function(properties) {
        return "";
    },

    buildUrl: function(properties) {
        var url = "";

        // adds protocol
        url += properties.protocol + "://";

        // adds endpoint url
        url += properties.endpointUrl;

        return url;
    },

    onCatchError:function(response) {
        this.onError(response);
    },

    onCatchSuccess:function(response) {
        this.onSuccess(response);
    },

    onError:function(response) {

    },

    onSuccess:function(response) {

    },

    getId: function() {
        return this.id;
    },

    getName: function() {
        return this.name;
    }
});