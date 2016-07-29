OSH.Sensor = Class.create({
  initialize: function (jsonix_offering) {
    this.server = null;
    this.identifier = jsonix_offering.identifier;
    this.name = jsonix_offering.name[0].value;
    this.description = jsonix_offering.description;
    this.procedure = jsonix_offering.procedure;

    var timePeriod = null;
    if (typeof jsonix_offering.phenomenonTime != 'undefined')
      timePeriod = jsonix_offering.phenomenonTime.timePeriod;

    this.timeRangeStart = (timePeriod != null && timePeriod.beginPosition.value.length > 0) ? timePeriod.beginPosition.value[0] : 'now';
    this.timeRangeEnd = (timePeriod != null && timePeriod.endPosition.value.length > 0) ? timePeriod.endPosition.value[0] : 'now';

    if (this.timeRangeEnd == 'now') {
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
  describeSensor: function () {
    var req = this.server.url + 'sensorhub/sos?service=SOS&version=2.0&request=DescribeSensor&procedure=' + this.procedure;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(this.name);
        var desc = OSH.Utils.jsonix_XML2JSON(xhr.responseText);
        this.onDescribeSensor(desc);
      }
    }.bind(this);
    xhr.open('GET', req, true);
    xhr.send();
  },

  //get result template for single observable prop
  getResultTemplate: function (observabeProp) {
    if (this.hasObservableProperty(observabeProp)) {
      var req = this.server.url + 'sensorhub/sos?service=SOS&version=2.0&request=GetResultTemplate&offering=' + this.identifier + '&observedProperty=' + observabeProp;
      var xhr = new XMLHttpRequest();
      xhr.prop = observabeProp;
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var resultTemplate = OSH.Utils.jsonix_XML2JSON(xhr.responseText);
          
          //First get the encoding type for each field
          resEncoding = {};
          resEncoding.fields = [];
          resEncoding.type = resultTemplate.value.resultEncoding.abstractEncoding.name.localPart;
          if (resEncoding.type == 'BinaryEncoding') {
            var binaryEncodingOpts = resultTemplate.value.resultEncoding.abstractEncoding.value.member;
            for (i = 0; i < binaryEncodingOpts.length; i++) {
              //this is the variable/field that the encoding affects, the reference may be nested so there is some parsing to do
              var ref = binaryEncodingOpts[i].component.ref;
              refToks = ref.split('/');
              var dataTypeToks = binaryEncodingOpts[i].component.dataType.split('/');
              resEncoding.fields.push({name: ref, type: dataTypeToks[dataTypeToks.length - 1]});
            }
          } else if (resEncoding.type == 'TextEncoding') {
            var txtEncodingOpts = resultTemplate.value.resultEncoding.abstractEncoding.value;
            resEncoding.collapseWhiteSpaces = txtEncodingOpts.collapseWhiteSpaces;
            resEncoding.tokenSeparator = txtEncodingOpts.tokenSeparator;
            resEncoding.decimalSeparator = txtEncodingOpts.decimalSeparator;
          } else {
            //TODO: handle xml encoding if necessary
          }
          
          //Build the result structure
          var resStruct = {};
          resStruct.fieldOrder = [];
          var fields = resultTemplate.value.resultStructure.abstractDataComponent.value.field;
          
          //the fields read from the json object may be complex such as a nested array
          //or an array of vectors etc. buildDataField is a recursive function that will take
          //a given field and produce the correct data structure for it
          for (var i = 0; i < fields.length; i++) {
            this.buildDataField(fields[i], resStruct);
            resStruct.fieldOrder.push(fields[i].name);
          }

          for(var i = 0; i < resEncoding.fields.length; i++) {
            this.setFieldEncoding(resStruct, resEncoding.fields[i]);
          }
          
          //build up rest of result structure
          this.onGetResultTemplate(observabeProp, resStruct, resEncoding);
        }
      }.bind(this);
      xhr.open('GET', req, true);
      xhr.send();
    }
  },

  setFieldEncoding: function(struct, fieldEncoding) {
    var path = fieldEncoding.name;
    var pathToks = path.split('/');
    pathToks.shift();  //first item is always empty because the string starts with slash character
    console.log('orig toks length'+pathToks.length);
    if(pathToks.length >= 1) {
      this.recurseFieldEncoding(pathToks, struct, fieldEncoding.type);
    }
  },

  recurseFieldEncoding: function (pathToken, struct, encodingType) {
    var nextPath = pathToken.shift();
    if(pathToken.length > 0) {
      this.recurseFieldEncoding(pathToken, struct[nextPath], encodingType);
    }
    else {
      struct[nextPath] = {val:null, type:encodingType};
    }
  },

  buildDataField: function(field, resultStruct) {
    var dataComp = field.abstractDataComponent;
    if(typeof dataComp != 'undefined' && dataComp != null) {

      if(dataComp.name.localPart == 'DataArray') {
        //get the element type and count of the array
        var elemType = dataComp.value.elementType;
        var elemCount = dataComp.value.elementCount;
        var countVal = 0;
        
        //Check if the count is referencing another field for its value
        //or if there is a static value provided already
        if(typeof elemCount.href != 'undefined')
          countVal = elemCount.href.split('#')[1];
        else
          countVal = elemCount.count.value;
        
        resultStruct[field.name] = {val:[], count: countVal, fieldOrder:[]};
        resultStruct[field.name].fieldOrder.push(elemType.name);

        //recurse
        this.buildDataField(elemType, resultStruct[field.name]);

      } else if(dataComp.name.localPart == 'Vector') {
        resultStruct[field.name] = {};
        resultStruct[field.name].fieldOrder = [];
        for(var i = 0; i < dataComp.value.coordinate.length; i++) {
          this.buildDataField(dataComp.value.coordinate[i], resultStruct[field.name]);
          resultStruct[field.name].fieldOrder.push(dataComp.value.coordinate[i].name);
        }
      } else {
        resultStruct[field.name] = null;
        if(typeof dataComp.value.id != 'undefined') {
          //This map holds references between ids and the fields that they represent. 
          //This is used to reference values in one field from another. Example: A field
          //that represents an array of values may have its count stored in another field
          resultStruct.id2FieldMap = {};
          var id = dataComp.value.id;
          resultStruct.id2FieldMap[id] = field.name;
        }
      }
    }
    else {
      resultStruct[field.name] = null;
    }
  },

  //get result template for all properties
  getResultTemplateAll: function () {
    for (var i = 0; i < this.observableProperties.length; i++) {
      this.getResultTemplate(this.observableProperties[i]);
    }
  },

  //creates a data connector based on specified parameters
  createDataConnector: function (observableProp, featureOfInterest = null, spatialFilter=null, startTime=this.timeRangeStart, endTime=this.timeRangeEnd, playbackSpeed=1) {
    if (observableProp == null || typeof observableProp == 'undefined' || !this.hasObservableProperty(observableProp)) {
      console.log('Could not create data connector! Property: ' + observableProp + ' does not exist.');
      return null;
    }

    var url = this.server.getUrl();
    url = url.replace('http://', 'ws://');
    url += 'sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=' + this.identifier;
    url += '&observedProperty=' + observableProp;

    //ensure time validity (this can break request so we return null if requested time range is invalid)
    if (this.isValidTime(startTime) && this.isValidTime(endTime)) {
      url += '&temporalFilter=phenomenonTime,' + startTime + '/' + endTime;
    }
    else {
      console.log('Could not create data connector! Invalid time range');
      return null;
    }

    //check playback speed, a value < 0 will return all observations over the specified time period
    if (playbackSpeed > 0) {
      url += '&replaySpeed=' + playbackSpeed;
    }

    //check features of interest (bad feature of interest will not break request)
    if (featureOfInterest != null && hasFeatureOfInterest(featureOfInterest)) {
      url += '&featureOfInterest=' + featureOfInterest;
    }
    else {
      console.log('Warning! Feature Of Interest: ' + featureOfInterest + ' does not exist. Ignoring and returning all data');
    }

    var conn = new OSH.DataConnector.WebSocketDataConnector(url);
    this.dataConnectors.push(conn);
    return conn;
  },

  //creates a data connection for each observable property with the following params
  createDataConnectorAll: function (featureOfInterest=null, spatialFilter=null, startTime=this.timeRangeStart, endTime=this.timeRangeEnd, playbackSpeed=1) {
    var conns = [];
    for (var i = 0; i < this.observableProperties.length; i++) {
      conns.push(this.createDataConnector(this.observableProperties[i], featureOfInterest, spatialFilter, startTime, endTime, playbackSpeed));
    }
    return conns;
  },

  //checks if observable property exists for this sensor
  hasObservableProperty: function (prop) {
    for (var i = 0; i < this.observableProperties.length; i++) {
      if (this.observableProperties[i] == prop)
        return true;
    }
    return false;
  },

  //checks if feature of interest exists for this sensor
  hasFeatureOfInterest: function (foi) {
    for (var i = 0; i < this.featuresOfInterest.length; i++) {
      if (this.featuresOfInterest[i] == foi)
        return true;
    }
    return false;
  },

  //checks if the time is within range defined for this sensor
  isValidTime: function (timeStr) {
    var d;
    if (timeStr == 'now')
      d = new Date();
    else
      d = new Date(timeStr);

    var start;
    if (this.timeRangeStart == 'now')
      start = new Date();
    else
      start = new Date(this.timeRangeStart);

    var end;
    if (this.timeRangeEnd == 'now')
      end = new Date();
    else
      end = new Date(this.timeRangeEnd);

    return (d >= start && d <= end);
  },

  //callback for checking when a sensor description has returned
  onDescribeSensor: function (data) {

  },

  onGetResultTemplate: function (obsProperty, resultStruct, resultEncoding) {

  }
});
