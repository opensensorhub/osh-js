OSH.Server = Class.create({
    initialize: function(url) {
        this.url = url;
        this.id = "Server-"+OSH.Utils.randomUUID();
        this.httpConnector = new OSH.DataConnector.AjaxConnector();
        this.capabilities = null;
        this.sensors = [];
        var jsonix_XML2JSON = function (xmlStr) {
            var module = SOS_2_0_Module_Factory();
            var context = new Jsonix.Context([XLink_1_0, IC_2_0, SMIL_2_0, SMIL_2_0_Language, GML_3_1_1, SWE_1_0_1, GML_3_2_1, OWS_1_1_0, SWE_2_0, SWES_2_0, WSN_T_1, WS_Addr_1_0_Core, OM_2_0, ISO19139_GMD_20070417, ISO19139_GCO_20070417, ISO19139_GSS_20070417, ISO19139_GTS_20070417, ISO19139_GSR_20070417, Filter_2_0, SensorML_2_0, SOS_2_0]);
            var unmarshaller = context.createUnmarshaller();
            var data = unmarshaller.unmarshalString(xmlStr);
            return data;
        };
        
        
    },

    getId: function() {
        return this.id;
    },

    getUrl: function() {
        return this.url;
    },
    
    getCapabilities: function(successCallback, errorCallback) {
        var req = this.url + 'sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities';
        this.httpConnector.onSuccess = function(response) {
            this.capabilities = jsonix_XML2JSON(response);

            for(var i = 0; i < this.capabilities.value.contents.contents.offering.length; i++) {
                var sensor = new OSH.sensor(this.capabilities.value.contents.contents.offering[i].abstractOffering.value);
                sensor.server = this;
                this.sensors.push(sensor);
            }
            successCallback();
        };
        this.httpConnector.onError   = errorCallback;
        this.httpConnector.sendRequest(req);
    }
});
