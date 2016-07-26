OSH.DataReceiver.DataReceiverController = Class.create({
  initialize: function(options) {
    this.options = options;
    this.initBuffer();
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

    OSH.EventManager.observe(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME,function(event) {
      this.initBuffer();
      //for now, reconnect each datasource
      for (var id in this.dataSourcesIdToDataSources) {
        // disconnect stream
        this.dataSourcesIdToDataSources[id].disconnect();

        // get current parameters
        var props = this.dataSourcesIdToDataSources[id].properties;
        var name = this.dataSourcesIdToDataSources[id].name;
        var options = this.dataSourcesIdToDataSources[id].options;

        // update start/end time
        if(typeof event.startTime != "undefined") {
          props.startTime = event.startTime;
        }

        if(typeof event.endTime != "undefined") {
          props.endTime = event.endTime;
        }

        // reset parameters
        this.dataSourcesIdToDataSources[id].initDataSource(name,props,options);

        // reconnect the stream with new parameters
        this.dataSourcesIdToDataSources[id].connect();
      }
    }.bind(this));
  },

  initBuffer: function() {
    this.buffer = new OSH.Buffer();
    if(this.options.startTime) {
      this.buffer.setStartDate(new Date(this.options.startTime));
    }
    if(this.options.endTime) {
      this.buffer.setEndDate(new Date(this.options.endTime));
    }
    if(this.options.replayFactor) {
      this.buffer.setReplayFactor(this.options.replayFactor);
    }
    if(this.options.bufferingTime) {
      this.buffer.setDelay(this.options.bufferingTime);
    }
    if(this.options.synchronizedTime != 'undefined') {
      this.buffer.setSynchronized(this.options.synchronizedTime);
    }
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
      //TODO: make a specific SYNC_DATA event with parameter dataSourceId instead of having it into the eventName
      OSH.EventManager.fire(OSH.EventManager.EVENT.CURRENT_SYNC_TIME,{timeStamp : data.timeStamp});
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
