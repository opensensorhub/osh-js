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
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.capabilities = OSH.Utils.jsonix_XML2JSON(xhr.responseText);
                for(var i = 0; i < this.capabilities.value.contents.contents.offering.length; i++) {
                    var sensor = new OSH.Sensor(this.capabilities.value.contents.contents.offering[i].abstractOffering.value);
                    sensor.server = this;
                    this.sensors.push(sensor);
                }
                var s = successCallback.bind(this);
                s(xhr.responseText);
            }
            else {
                errorCallback(xhr.responseText);
            }
        }.bind(this);
        xhr.open('GET', req, true);
        xhr.send();
    }
});
