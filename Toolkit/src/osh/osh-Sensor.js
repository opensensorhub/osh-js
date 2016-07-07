OSH.Sensor = Class.create({
    initialize: function(jsonix_offering) {
        this.server = null;
        this.identifier = jsonix_offering.identifier;
        this.name = jsonix_offering.name[0].value;
        this.description = jsonix_offering.description;
        this.procedure = jsonix_offering.procedure;
        this.timeRangeStart = jsonix_offering.phenomenonTime.timePeriod.beginPosition.value.length > 0 ? jsonix_offering.phenomenonTime.timePeriod.beginPosition.value[0] : 'now';
        this.timeRangeEnd = jsonix_offering.phenomenonTime.timePeriod.endPosition.value.length > 0 ? jsonix_offering.phenomenonTime.timePeriod.endPosition.value[0] : 'now';
        this.observableProperties = [];
        this.featuresOfInterest =[];

        //collect the observableProperty names that can be observed on this sensor
        for(var i = 0; i < jsonix_offering.observableProperty.length; i++) {
            this.observableProperties.push(jsonix_offering.observableProperty[i]);
        }
        
        
        if(typeof jsonix_offering.relatedFeature != 'undefined') {
            for(var i = 0; i < jsonix_offering.relatedFeature.length; i++) {
                this.featuresOfInterest.push(jsonix_offering.relatedFeature[i].featureRelationship.target.href);
            }
        }
        
        this.dataReceivers = [];
        this.dataSenders = [];
        
        //get result template for all properties
    },
    
    getResultTemplateAll : function() {
      for(var i= 0; i < this.observableProperties.length; i++) {
          var req = this.url + 'sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities';
          this.server.httpConnector.sendRequest()
      }
    },
    
    createDataReceiver: function(observedProperty, interval, speed) {
        if(this.observableProperties[observedProperty] != null && typeof this.observableProperties[observedProperty] !== 'undefined') {
           var props = {
               
           };
           return new OSH.DataReceiver.LatLonAlt(
                "gps2",
                "ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/Location&temporalFilter=phenomenonTime,2015-02-16T08:03:00Z/2015-02-16T08:09:00Z&replaySpeed=3");

        }
        return null;
    }
});
