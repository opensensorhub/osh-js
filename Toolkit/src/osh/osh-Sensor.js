OSH.Sensor = Class.create({
    initialize: function (jsonix_offering) {
        this.server = null;
        this.identifier = jsonix_offering.identifier;
        this.name = jsonix_offering.name[0].value;
        this.description = jsonix_offering.description;
        this.procedure = jsonix_offering.procedure;
        this.timeRangeStart = jsonix_offering.phenomenonTime.timePeriod.beginPosition.value.length > 0 ? jsonix_offering.phenomenonTime.timePeriod.beginPosition.value[0] : 'now';
        this.timeRangeEnd = jsonix_offering.phenomenonTime.timePeriod.endPosition.value.length > 0 ? jsonix_offering.phenomenonTime.timePeriod.endPosition.value[0] : 'now';
        this.observableProperties = [];
        this.featuresOfInterest = [];

        //collect the observableProperty names that can be observed on this sensor
        for (var i = 0; i < jsonix_offering.observableProperty.length; i++) {
            this.observableProperties.push(jsonix_offering.observableProperty[i]);
            this.observableProperties[i].createDataConnector = function() {
                return new OSH.DataConnector.WebSocketDataConnector()
            }
        }


        if (typeof jsonix_offering.relatedFeature != 'undefined') {
            for (var i = 0; i < jsonix_offering.relatedFeature.length; i++) {
                this.featuresOfInterest.push(jsonix_offering.relatedFeature[i].featureRelationship.target.href);
            }
        }

        this.dataReceivers = [];
        this.dataSenders = [];
    },

    //get result template for all properties
    getResultTemplateAll: function () {
        for (var i = 0; i < this.observableProperties.length; i++) {
            var req = this.url + 'sensorhub/sos?service=SOS&version=2.0&request=GetResultTemplate&offering=' + this.identifier + '&observedProperty=' + this.observableProperties[i];
            var xhr = new XMLHttpRequest('GET', req, true);
            xhr.prop = observableProperties[i];
            xhr.onreadystatechange = function (response) {
                if (this.readyState == 4 && this.status == 200) {
                    this.prop.resultTemplate = OSH.Utils.jsonix_XML2JSON(response.data);
                }
            };
        }
    },

    //creates a data connector based on specified parameters
    createDataConnector: function(observableProp, featureOfInterest=null, spatialFilter=null, startTime=this.timeRangeStart, endTime=this.timeRangeEnd, playbackSpeed=1) {
        if(observableProp == null || typeof observableProp == 'undefined' || !this.hasObservableProperty(observableProp)) {
            console.log('Could not create data connector! Property: '+observableProp+' does not exist.');
            return null;
        }

        var url = this.server.getUrl();
        url += 'sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering='+this.identifier;
        url += '&observedProperty='+observableProp;

        //ensure time validity (this can break request so we return null if requested time range is invalid)
        if(isValidTime(startTime) && isValidTime(endTime)) {
            url += '&temporalFilter=phenomenonTime,'+startTime+'/'+endTime;
        }
        else {
            console.log('Could not create data connector! Invalid time range');
            return null;
        }

        //check playback speed, a value < 0 will return all observations over the specified time period
        if(playbackSpeed > 0) {
            url += '&replaySpeed='+playbackSpeed;
        }

        //check features of interest (bad feature of interest wil not break request)
        if(featureOfInterest != null && hasFeatureOfInterest(featureOfInterest)) {
            url += '&featureOfInterest='+featureOfInterest;
        }
        else {
            console.log('Warning! Feature Of Interest: '+featureOfInterest+' does not exist. Ignoring and returning all data');
        }

        return new OSH.DataConnector.WebSocketDataConnector(url);
    },

    hasObservableProperty: function(prop) {
        for(var i = 0; i < this.observableProperties.length; i++) {
            if(this.observableProperties[i]==prop)
                return true;
        }
        return false;
    },

    hasFeatureOfInterest: function(foi) {
        for(var i = 0; i < this.featuresOfInterest.length; i++) {
            if(this.featuresOfInterest[i]==foi)
                return true;
        }
        return false;
    },

    isValidTime: function(timeStr) {
        var d = new Date(timeStr);
        var start = new Date(this.timeRangeStart);
        var end = new Date(this.timeRangeEnd);
        if(d >= start && d <= end)
            return true;
        return false;
    }
});
