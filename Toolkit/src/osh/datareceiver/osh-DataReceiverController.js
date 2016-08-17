OSH.DataReceiver.DataReceiverController = Class.create({
  initialize: function(options) {
    this.options = options;
    this.initBuffer();
    this.dataSourcesIdToDataSources = {};

    // observe CONNECT event and connect dataSources consequently
    OSH.EventManager.observe(OSH.EventManager.EVENT.CONNECT_DATASOURCE,function(event) {
      var eventDataSourcesIds = event.dataSourcesId;
      for (var i = 0; i < eventDataSourcesIds.length; i++) {
          var id = eventDataSourcesIds[i];          
          if(id in this.dataSourcesIdToDataSources) {
              // if sync to master to time, request data starting at current time
              if(this.dataSourcesIdToDataSources[id].syncMasterTime) {
                  this.updateDataSourceTime(id, new Date(this.buffer.currentTime).toISOString());
              }          
              this.dataSourcesIdToDataSources[id].connect();
              this.buffer.startDataSource(id);
          }
      }
    }.bind(this));

    // observe DISCONNECT event and disconnect dataSources consequently
    OSH.EventManager.observe(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE,function(event) {
      var eventDataSourcesIds = event.dataSourcesId;
      for (var i = 0; i < eventDataSourcesIds.length; i++) {
          var id = eventDataSourcesIds[i];          
          if(id in this.dataSourcesIdToDataSources) {
              this.dataSourcesIdToDataSources[id].disconnect();
              this.buffer.cancelDataSource(id);
          }
      }
    }.bind(this));


    OSH.EventManager.observe(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME,function(event) {
      
      var dataSourcesToReconnect = [];
      
      // disconnect all synchronized datasources
      for (var id in this.dataSourcesIdToDataSources) {
          var dataSrc = this.dataSourcesIdToDataSources[id];
          if(dataSrc.syncMasterTime && dataSrc.connected) {
              dataSrc.disconnect();
              this.buffer.cancelDataSource(id);
              dataSourcesToReconnect.push(id);
          }
      }
      
      // reset buffer current time
      this.buffer.currentTime = Date.parse(event.startTime);
      
      // reconnect all synchronized datasources with new time parameters
      for (var i=0; i<dataSourcesToReconnect.length; i++) {
          var id = dataSourcesToReconnect[i];
          var dataSrc = this.dataSourcesIdToDataSources[id];
          this.updateDataSourceTime(id, event.startTime, event.endTime);
          dataSrc.connect();
          this.buffer.startDataSource(id);
      }
      
    }.bind(this));
  },
  
  updateDataSourceTime: function(id, startTime, endTime) {
      // get current parameters
      var dataSource = this.dataSourcesIdToDataSources[id];
      var props = dataSource.properties;
      var options = dataSource.options;

      // update start/end time
      if (typeof startTime != "undefined") {
        props.startTime = startTime;
      }

      if (typeof endTime != "undefined") {
        props.endTime = endTime;
      }

      // reset parameters
      dataSource.initDataSource(props, options);
  },

  initBuffer: function() {
    this.buffer = new OSH.Buffer(this.options);
  },

  addEntity : function(entity,options) {
    if(typeof (entity.dataSources) != "undefined") {
      for(var i=0;i < entity.dataSources.length;i++) {
        this.addDataSource(entity.dataSources[i],options);
      }
    }
  },

  addDataSource: function(dataSource,options) {
    this.dataSourcesIdToDataSources[dataSource.id] = dataSource;
    this.buffer.addDataSource(dataSource.id,{
      name: dataSource.name,
      syncMasterTime: dataSource.syncMasterTime,
      bufferingTime : dataSource.bufferingTime,
      timeOut: dataSource.timeOut
    });

    //TODO: make frozen variables?
    dataSource.onData = function(data) {
        this.buffer.push({dataSourceId:dataSource.getId(),data : data});
        
    }.bind(this);
  },

  /**
   * Connects each connector
   */ 
  connectAll: function() {
    this.buffer.start();
    for (var id in this.dataSourcesIdToDataSources) {
      this.dataSourcesIdToDataSources[id].connect();
    }
  }
});
