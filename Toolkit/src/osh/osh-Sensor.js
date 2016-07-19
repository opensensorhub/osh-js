OSH.Sensor = Class.create({
    initialize: function (jsonix_offering) {
        this.server = null;
        this.identifier = jsonix_offering.identifier;
        this.name = jsonix_offering.name[0].value;
        this.description = jsonix_offering.description;
        this.procedure = jsonix_offering.procedure;
        
        var timePeriod = null;
        if(typeof jsonix_offering.phenomenonTime != 'undefined')
            timePeriod = jsonix_offering.phenomenonTime.timePeriod;
       
        this.timeRangeStart = (timePeriod != null && timePeriod.beginPosition.value.length > 0) ? timePeriod.beginPosition.value[0] : 'now';
        this.timeRangeEnd = (timePeriod != null && timePeriod.endPosition.value.length > 0) ? timePeriod.endPosition.value[0] : 'now';

        if(this.timeRangeEnd == 'now') {
            var d = new Date();
            d.setUTCFullYear(9999);
            this.timeRangeEnd = d.toISOString();
        }

        this.observableProperties = [];
        this.outputs = [];
        this.featuresOfInterest = [];
        this.dataConnectors = [];
        //this.dataReceivers = [];
        //this.dataSenders = [];

        //collect the observableProperty names that can be observed on this sensor
        if (typeof jsonix_offering.observableProperty != 'undefined') {
            for (var i = 0; i < jsonix_offering.observableProperty.length; i++) {
                this.observableProperties.push(jsonix_offering.observableProperty[i]);
            }
        }

        if (typeof jsonix_offering.relatedFeature != 'undefined') {
            for (i = 0; i < jsonix_offering.relatedFeature.length; i++) {
                this.featuresOfInterest.push(jsonix_offering.relatedFeature[i].featureRelationship.target.href);
            }
        }
    },

    //describe sensor retrieves data about a sensor's observable properties and metadata
    describeSensor: function() {
        var req = this.server.url + 'sensorhub/sos?service=SOS&version=2.0&request=DescribeSensor&procedure='+this.procedure;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(this.name);
                var desc = OSH.Utils.jsonix_XML2JSON(xhr.responseText);
                //desc.value.description[0].sensorDescription.data.any.value.outputs.outputlist.output;
                this.onDescribeSensor(desc);
            }
        }.bind(this);
        xhr.open('GET', req, true);
        xhr.send();
    },

    //get result template for single observable prop
    getResultTemplate: function (observabeProp) {
        if(this.hasObservableProperty(observabeProp)) {
            var req = this.server.url + 'sensorhub/sos?service=SOS&version=2.0&request=GetResultTemplate&offering=' + this.identifier + '&observedProperty=' + observabeProp;
            var xhr = new XMLHttpRequest();
            xhr.prop = observabeProp;
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    xhr.prop.resultTemplate = OSH.Utils.jsonix_XML2JSON(xhr.responseText);
                }
            };
            xhr.open('GET', req, true);
            xhr.send();
        }
    },

    //get result template for all properties
    getResultTemplateAll: function () {
        for (var i = 0; i < this.observableProperties.length; i++) {
            this.getResultTemplate(this.observableProperties[i]);
        }
    },

    //creates a data connector based on specified parameters
    createDataConnector: function(observableProp, featureOfInterest = null, spatialFilter=null, startTime=this.timeRangeStart, endTime=this.timeRangeEnd, playbackSpeed=1) {
        if(observableProp == null || typeof observableProp == 'undefined' || !this.hasObservableProperty(observableProp)) {
            console.log('Could not create data connector! Property: '+observableProp+' does not exist.');
            return null;
        }

        var url = this.server.getUrl();
        url = url.replace('http://', 'ws://');
        url += 'sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering='+this.identifier;
        url += '&observedProperty='+observableProp;

        //ensure time validity (this can break request so we return null if requested time range is invalid)
        if(this.isValidTime(startTime) && this.isValidTime(endTime)) {
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

        var conn =  new OSH.DataConnector.WebSocketDataConnector(url);
        this.dataConnectors.push(conn);
        return conn;
    },
    
    //creates a data connection for each observable property with the following params
    createDataConnectorAll: function(featureOfInterest=null, spatialFilter=null, startTime=this.timeRangeStart, endTime=this.timeRangeEnd, playbackSpeed=1) {
        var conns =[];
        for(var i = 0; i < this.observableProperties.length; i++) {
            conns.push(this.createDataConnector(this.observableProperties[i], featureOfInterest, spatialFilter, startTime, endTime, playbackSpeed));
        }
        return conns;
    },
    
    //checks if observable property exists for this sensor
    hasObservableProperty: function(prop) {
        for(var i = 0; i < this.observableProperties.length; i++) {
            if(this.observableProperties[i]==prop)
                return true;
        }
        return false;
    },

    //checks if feature of interest exists for this sensor
    hasFeatureOfInterest: function(foi) {
        for(var i = 0; i < this.featuresOfInterest.length; i++) {
            if(this.featuresOfInterest[i]==foi)
                return true;
        }
        return false;
    },

    //checks if the time is within range defined for this sensor
    isValidTime: function(timeStr) {
        var d; 
        if(timeStr == 'now')
            d = new Date();
        else 
            d = new Date(timeStr);
        
        var start;
        if(this.timeRangeStart == 'now')
            start = new Date();
        else
            start = new Date(this.timeRangeStart);

        var end;
        if(this.timeRangeEnd == 'now')
            end = new Date();
        else
            end = new Date(this.timeRangeEnd);
        
        if(d >= start && d <= end)
            return true;
        return false;
    },
    
    //callback for checking when a sensor description has returned
    onDescribeSensor: function(data) {

    }
});
