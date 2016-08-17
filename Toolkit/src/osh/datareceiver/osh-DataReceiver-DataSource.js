OSH.DataReceiver.DataSource = Class.create({
  initialize: function(name,properties,options) {
    this.id = "DataSource-"+OSH.Utils.randomUUID();
    this.name  = this.id;
    this.properties = properties;
    this.options = options;
    this.timeShift = 0;

    this.initDataSource(name,properties,options);

    OSH.EventManager.observe(OSH.EventManager.EVENT.CONNECT_DATASOURCE+"-"+this.id,function(event){
      this.connect();
    }.bind(this));

    OSH.EventManager.observe(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE+"-"+this.id,function(event){
      this.disconnect();
    }.bind(this));
  },

  initDataSource: function(name,properties,options) {
    
    if(typeof(options) != "undefined"  && options.androidShift) {
      this.timeShift = -16 * 1000;
    }
    
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

    if(typeof properties.name != "undefined") {
      this.name = properties.name;
    }
    
    // checks if type is WebSocket
    if(properties.protocol == "ws") {
      this.connector = new OSH.DataConnector.WebSocketDataConnector(this.buildUrl(properties));
      // connects the callback
      this.connector.onMessage = this.onMessage.bind(this);
      this.name = name;
    }
  },
  /**
   * Disconnect the dataSource then the connector will be closed as well.
   */
  disconnect : function() {
    this.connector.disconnect();
    
    // send data reset event
    OSH.EventManager.fire(OSH.EventManager.EVENT.DATA+"-"+this.id,{
        dataSourceId: this.id,
        reset: true
    });
  },

  connect: function() {
    this.connector.connect();
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
	      // apply time shift
	      startTime = new Date(Date.parse(startTime) - this.timeShift).toISOString();
	      endTime = new Date(Date.parse(endTime) - this.timeShift).toISOString();
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
