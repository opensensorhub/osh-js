OSH.DataProvider.DataProviderController = Class.create({
  initialize: function(options) {
    this.buffer = new OSH.Buffer();
    if(options.startTime) {
      this.buffer.setStartDate(new Date(options.startTime));
    }
    if(options.endTime) {
      this.buffer.setEndDate(new Date(options.endTime));
    }
    if(options.replayFactor) {
      this.buffer.setReplayFactor(options.replayFactor);
    }
    if(options.bufferingTime) {
      this.buffer.setDelay(options.bufferingTime);
    }
    if(options.synchronizedTime != 'undefined') {
      this.buffer.setSynchronized(options.synchronizedTime);
    }
    
    this.dataSources = [];
    this.observers = [];
  },
  
  setBufferingTime : function(bufferingTime) {
     this.buffer.setDelay(bufferingTime);
  },
  
  setReplayFactor : function(replayFactor) {
    this.buffer.setReplayFactor(replayFactor);
  },
  
  setSynchronized : function(synchronizeTime) {
    this.buffer.setSynchronized(synchronizeTime);
  },
  
  setStartDate : function(startTime) {
    this.buffer.setStartDate(startTime);
  },
  
  getReplayFactor : function() {
    return this.buffer.getReplayFactor();
  },
  
  registerObserver: function(observer) {
	  this.observers.push(observer);
  },
  
  addDataSource: function(dataSource) {
    this.dataSources.push(dataSource);
    this.buffer.register(dataSource.getId(),function(data) {
        this.onData(dataSource.getId(),data);
    }.bind(this));
    
    dataSource.onData = function(data) {
        this.buffer.push(dataSource.getId(), data.data, data.timeStamp , dataSource.getName());
    }.bind(this);
  },
  
  /**
   * Connects each connector
   */ 
  connectAll: function() {
    for(var i = 0; i< this.dataSources.length; i++) {
      // connects this current dataSource 
      this.dataSources[i].connect();
    }
  },
  
  onData: function(id,data) {
	// notifies observers
    for(var i=0;i < this.observers.length;i++) {
    	this.observers[i].setData(id,data);
    }
  }
});
