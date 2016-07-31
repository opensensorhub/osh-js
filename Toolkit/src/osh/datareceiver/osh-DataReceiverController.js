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
        }
      }
    }.bind(this));

    // observe disconnect event and disconnect dataSources consequently
    OSH.EventManager.observe(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE,function(event) {
      var eventDataSourcesIds = event.dataSourcesId;
      for (var i = 0; i < eventDataSourcesIds.length; i++) {
        if(eventDataSourcesIds[i] in this.dataSourcesIdToDataSources) {
          this.dataSourcesIdToDataSources[eventDataSourcesIds[i]].disconnect();
        }
      }
    }.bind(this));


    OSH.EventManager.observe(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME,function(event) {
      this.buffer.reset();
      //for now, reconnect every datasources
      for (var id in this.dataSourcesIdToDataSources) {
        if(event.dataSourcesId.indexOf(id) > -1) {
          // disconnect stream
          this.dataSourcesIdToDataSources[id].disconnect();

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
    }.bind(this));
  },

  initBuffer: function() {
    this.buffer = new OSH.Buffer(this.options);
  },

  addEntity : function(entity,sync) {
    if(typeof (entity.dataSources) != "undefined") {
      var synchronize = false;
      if(typeof sync != "undefined") {
        synchronize = sync;
      }

      for(var i=0;i < entity.dataSources.length;i++) {
        this.addDataSource(entity.dataSources[i],synchronize);
      }
    }
  },

  addDataSource: function(dataSource,sync) {
    this.dataSourcesIdToDataSources[dataSource.id] = dataSource;
   /* this.buffer.register(dataSource.getId(),function(data) {
      //TODO: make a specific SYNC_DATA event with parameter dataSourceId instead of having it into the eventName
      OSH.EventManager.fire(OSH.EventManager.EVENT.CURRENT_SYNC_TIME,{timeStamp : data.timeStamp});
      OSH.EventManager.fire(OSH.EventManager.EVENT.DATA+"-"+dataSource.getId(), {data : data});
    }.bind(this));*/

    var synchronize = false;
    if(typeof sync != "undefined") {
      synchronize = sync;
    }

    this.buffer.addDataSource(dataSource.id,sync);
    //TODO: make frozen variables?
    dataSource.onData = function(data) {
        //this.buffer.push(dataSource.getId(), data.data, data.timeStamp , dataSource.getName());
        OSH.EventManager.fire(OSH.EventManager.EVENT.DATA,{dataSourceId:dataSource.getId(),dataSourceName:dataSource.getName(),data : data, sync:synchronize});
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
