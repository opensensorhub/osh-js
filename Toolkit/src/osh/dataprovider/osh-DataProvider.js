OSH.DataProvider.DataProvider = Class.create({
  initialize: function(name,properties,options) {
    // checks if type is WebSocket
    if(properties.protocol == "ws") {
      this.connector = new OSH.DataConnector.WebSocketDataConnector(this.buildUrl(properties));
      // connects the callback 
      this.connector.onMessage = this.onMessage.bind(this);
      this.id = "DataSource-"+OSH.Utils.randomUUID();
      this.name = name;
    }
    
    this.androidShift = 0;
    
    if(typeof(options) != "undefined"  && options.androidShift) {
      this.androidShift = 16 * 1000;  
    }
  },
  
  connect: function() {
    this.connector.connect();
  },
  
  onMessage: function(data) {
    var data = {
      timeStamp: this.parseTimeStamp(data),
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
   * data is represented by 
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
	  url += "temporalFilter=phenomenonTime,"+properties.startTime+"/"+properties.endTime+"&";
	  
	  // adds replaySpeed
	  url += "replaySpeed="+properties.replaySpeed;
	  
	  // adds responseFormat (optional)
	  if(properties.responseFormat) {
		  url += "&responseFormat="+properties.responseFormat;
	  }
	  
	  return url;
  }
});
