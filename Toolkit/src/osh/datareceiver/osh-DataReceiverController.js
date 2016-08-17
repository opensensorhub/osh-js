OSH.DataReceiver.DataReceiverController = Class.create({
  initialize: function(options) {
    this.options = options;
    this.initBuffer();
    this.dataSourcesIdToDataSources = {};

    // observe CONNECT event and connect dataSources consequently
    OSH.EventManager.observe(OSH.EventManager.EVENT.CONNECT_DATASOURCE,function(event) {
      var eventDataSourcesIds = event.dataSourcesId;
      for (var i = 0; i < eventDataSourcesIds.length; i++) {
        if(eventDataSourcesIds[i] in this.dataSourcesIdToDataSources) {
          this.dataSourcesIdToDataSources[eventDataSourcesIds[i]].connect();
          this.buffer.startDataSource(this.dataSourcesIdToDataSources[eventDataSourcesIds[i]].id);
        }
      }
    }.bind(this));

    // observe disconnect event and disconnect dataSources consequently
    OSH.EventManager.observe(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE,function(event) {
      var eventDataSourcesIds = event.dataSourcesId;
      for (var i = 0; i < eventDataSourcesIds.length; i++) {
        if(eventDataSourcesIds[i] in this.dataSourcesIdToDataSources) {
          this.dataSourcesIdToDataSources[eventDataSourcesIds[i]].disconnect();
          this.buffer.cancelDataSource(this.dataSourcesIdToDataSources[eventDataSourcesIds[i]].id);
        }
      }
    }.bind(this));


    OSH.EventManager.observe(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME,function(event) {
      
      // disconnect all datasources
      for (var id in this.dataSourcesIdToDataSources) {
         if(this.dataSourcesIdToDataSources[id].syncMasterTime) {
            // disconnect stream
            this.dataSourcesIdToDataSources[id].disconnect();
         }
      }
           
      // reset synchronization buffer
      this.buffer.cancelAll();
      
      // reconnect all datasources with new time parameters
      for (var id in this.dataSourcesIdToDataSources) {
        if(this.dataSourcesIdToDataSources[id].syncMasterTime) {
          
          // get current parameters
          var props = this.dataSourcesIdToDataSources[id].properties;
          var name = this.dataSourcesIdToDataSources[id].name;
          var options = this.dataSourcesIdToDataSources[id].options;

          // update start/end time
          if (typeof event.startTime != "undefined") {
            props.startTime = event.startTime;
          }

          if (typeof event.endTime != "undefined") {
            props.endTime = event.endTime;
          }

          // reset parameters
          this.dataSourcesIdToDataSources[id].initDataSource(name, props, options);

          // reconnect the stream with new parameters
          this.dataSourcesIdToDataSources[id].connect();
        }
      }
      this.buffer.startAll();
    }.bind(this));
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
      syncMasterTime:dataSource.syncMasterTime,
      bufferingTime : dataSource.bufferingTime
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
