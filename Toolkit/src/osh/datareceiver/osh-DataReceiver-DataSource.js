OSH.DataReceiver.DataSource = Class.create({
  initialize: function(name,properties) {
    this.id = "DataSource-"+OSH.Utils.randomUUID();
    this.name = name;
    this.properties = properties;
    this.timeShift = 0;
    this.connected = false;

    this.initDataSource(properties);
  },

  initDataSource: function(properties) {
    
    if(typeof(properties.timeShift) != "undefined") {
        this.timeShift = properties.timeShift;
    }

    if(typeof properties.syncMasterTime != "undefined") {
      this.syncMasterTime = properties.syncMasterTime;
    } else {
      this.syncMasterTime = false;
    }

    if(typeof properties.bufferingTime != "undefined") {
      this.bufferingTime = properties.bufferingTime;
    }

    if(typeof properties.timeOut != "undefined") {
      this.timeOut = properties.timeOut;
    }
    
    // checks if type is WebSocket
    if(properties.protocol == "ws") {
      this.connector = new OSH.DataConnector.WebSocketDataConnector(this.buildUrl(properties));
      // connects the callback
      this.connector.onMessage = this.onMessage.bind(this);
    }
  },
  /**
   * Disconnect the dataSource then the connector will be closed as well.
   */
  disconnect : function() {
    this.connector.disconnect();
    this.connected = false;
    
    // send data reset event
    OSH.EventManager.fire(OSH.EventManager.EVENT.DATA+"-"+this.id,{
        dataSourceId: this.id,
        reset: true
    });
  },

  connect: function() {
    this.connector.connect();
    this.connected = true;
  },
  
  onMessage: function(data) {
    var data = {
      timeStamp: this.parseTimeStamp(data) + this.timeShift,
      data: this.parseData(data)
    };
    this.onData(data);
  },
  
  parseTimeStamp: function(data){
    return new Date().getTime();
  },
  
  parseData: function(data){
    return data;
  },
  
  /**
   * data is represented as 
   * data = { 
   *    timeStamp: timeStamp // number
   *    data: data // data to render
   * };
   */ 
  onData:function(data) {},
  
  getId: function() {
    return this.id;
  },
  
  getName: function() {
    return this.name;
  },
  
  buildUrl: function(properties) {
	  var url = "";
	  
	  // adds protocol
	  url += properties.protocol + "://";
	  
	  // adds endpoint url
	  url += properties.endpointUrl+"?";
	  
	  // adds service
	  url += "service="+properties.service+"&";
	  
	  // adds version
	  url += "version=2.0&";
	  
	  // adds request
	  url += "request=GetResult&";
	  
	  // adds offering
	  url += "offering="+properties.offeringID+"&";
	  
	  // adds observedProperty
	  url += "observedProperty="+properties.observedProperty+"&";
	  
	  // adds temporalFilter
	  var startTime = properties.startTime;
	  var endTime = properties.endTime;
	  if (startTime !== "now" && this.timeShift != 0) {	      
	      // HACK: don't do it for old Android dataset that is indexed differently
	      if (properties.offeringID !== "urn:android:device:060693280a28e015-sos") {
	         // apply time shift
	         startTime = new Date(Date.parse(startTime) - this.timeShift).toISOString();
	         endTime = new Date(Date.parse(endTime) - this.timeShift).toISOString();
	      }
	  }
	  url += "temporalFilter=phenomenonTime,"+startTime+"/"+endTime+"&";
	  
	  if(properties.replaySpeed) {
		  // adds replaySpeed
		  url += "replaySpeed="+properties.replaySpeed;
	  }
	  
	  // adds responseFormat (optional)
	  if(properties.responseFormat) {
		  url += "&responseFormat="+properties.responseFormat;
	  }
	  
	  return url;
  }
});
