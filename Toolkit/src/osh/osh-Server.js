OSH.Server = Class.create({
    initialize: function(url) {
        this.url = url;
        this.id = "Server-"+OSH.Utils.randomUUID();
        this.capabilities = null;
        this.sensors = [];
    },

    getId: function() {
        return this.id;
    },

    getUrl: function() {
        return this.url;
    },
    
    getCapabilities: function(successCallback, errorCallback) {
        var req = this.url + 'sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities';
        var xhr = new XMLHttpRequest('GET', req, true);
        xhr.onreadystatechange = function (response) {
            if (this.readyState == 4 && this.status == 200) {
                this.capabilities = OSH.Utils.jsonix_XML2JSON(response.data);
                for(var i = 0; i < this.capabilities.value.contents.contents.offering.length; i++) {
                    var sensor = new OSH.sensor(this.capabilities.value.contents.contents.offering[i].abstractOffering.value);
                    sensor.server = this;
                    this.sensors.push(sensor);
                }
                successCallback();
            }
            else {
                errorCallback();
            }
        };
        xhr.send(null);
    }
});
