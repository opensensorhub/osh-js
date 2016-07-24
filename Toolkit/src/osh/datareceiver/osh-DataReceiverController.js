OSH.DataReceiver.DataReceiverController = Class.create({
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
    
    this.dataSourcesIdToDataSources = {};
    OSH.EventManager.observe(OSH.EventManager.EVENT.CONNECT_DATASOURCE,function(event) {
      var eventDataSourcesIds = event.dataSourcesId;
      for (var i = 0; i < eventDataSourcesIds.length; i++) {
        if(eventDataSourcesIds[i] in this.dataSourcesIdToDataSources) {
          this.dataSourcesIdToDataSources[eventDataSourcesIds[i]].connect();
        }
      }
    }.bind(this));

    OSH.EventManager.observe(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE,function(event) {
      var eventDataSourcesIds = event.dataSourcesId;
      for (var i = 0; i < eventDataSourcesIds.length; i++) {
        if(eventDataSourcesIds[i] in this.dataSourcesIdToDataSources) {
          this.dataSourcesIdToDataSources[eventDataSourcesIds[i]].disconnect();
        }
      }
    }.bind(this));
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
  
  addEntity : function(entity) {
    if(typeof (entity.dataSources) != "undefined") {
      for(var i=0;i < entity.dataSources.length;i++) {
        this.addDataSource(entity.dataSources[i]);
      }
    }
  },

  addDataSource: function(dataSource) {
    this.dataSourcesIdToDataSources[dataSource.id] = dataSource;
    this.buffer.register(dataSource.getId(),function(data) {
        OSH.EventManager.fire(OSH.EventManager.EVENT.DATA+"-"+dataSource.getId(), {data : data});
    }.bind(this));
    
    dataSource.onData = function(data) {
        this.buffer.push(dataSource.getId(), data.data, data.timeStamp , dataSource.getName());
    }.bind(this);
  },
  
  /**
   * Connects each connector
   */ 
  connectAll: function() {
    for (var id in this.dataSourcesIdToDataSources) {
      this.dataSourcesIdToDataSources[id].connect();
    }
  }
});
