var INITIAL_BUFFERING_TIME = 3000; // ms time

var BUFFER_STATUS = {
  CANCEL: 'cancel',
  START: 'start',
  STOP: 'stop',
  NOT_START_YET: 'notStartYet'
};

OSH.Buffer = Class.create({
  initialize:function(options) {
    this.buffers = {};

    this.replayFactor = 1;
    this.synchronized = false;
    this.bufferingTime = INITIAL_BUFFERING_TIME;

    // update values from options
    if(typeof options != "undefined") {
      if(typeof options.replayFactor != "undefined") {
        this.replayFactor = options.replayFactor;
      }

      if(typeof  options.synchronized != "undefined") {
        this.synchronized = options.synchronized;
      }

      if(typeof options.bufferingTime != "undefined") {
        this.bufferingTime = options.bufferingTime;
      }
    }

    // define buffer variable

    // defines a status to stop the buffer after stop() calling.
    // If start() method is called, this variable should be set to TRUE
    this.stop = false;
    this.bufferingState = false;
  },

  startObservers : function() {
    this.observeId = OSH.Utils.randomUUID();
    this.boundHandlerMethod = this.push.bind(this);
    OSH.EventManager.observe(OSH.EventManager.EVENT.DATA,this.boundHandlerMethod,this.observeId);
  },

  stopObservers: function() {
    if(typeof this.observeId != "undefined" || this.observeId != null) {
      OSH.EventManager.observe(OSH.EventManager.EVENT.DATA, this.boundHandlerMethod,this.observeId);
      this.observeId = undefined;
    }
  },

  /**
   * Starts the buffer after INITIAL_BUFFERING_TIME elapsed.
   */
  start:function() {
    this.stop = false;
    this.startObservers();
    this.startRealTime = new Date().getTime();
    this.processSyncData();
  },

  stop : function() {
    this.stopObservers();
    this.stop = true;
  },

  cancelAll: function() {
    for(var dataSourceId in this.buffers){
      this.cancelDataSource(dataSourceId);
    }
  },

  /**
   * Cancel means to clear the data contained into the buffer and change the status to CANCEL
   * @param dataSourceId
   */
  cancelDataSource: function(dataSourceId) {
    //this.buffers[dataSourceId] = {buffer:[],sync :  this.buffers[dataSourceId].sync, status: BUFFER_STATUS.CANCEL};
    this.buffers[dataSourceId].buffer = [];
    this.buffers[dataSourceId].status = BUFFER_STATUS.CANCEL;
  },

  /**
   * Change the status to START
   * @param dataSourceId
   */
  startDataSource: function(dataSourceId) {
    this.buffers[dataSourceId].status = BUFFER_STATUS.NOT_START_YET;
  },

  startAll: function() {
    for(var dataSourceId in this.buffers){
      this.startDataSource(dataSourceId);
    }
  },

  addDataSource : function(dataSourceId,sync) {
    this.buffers[dataSourceId] = {buffer:[],sync : sync,status:BUFFER_STATUS.NOT_START_YET};
  },

  addEntity : function(entity,sync) {
    // get dataSources from entity and add them to buffers
    if(typeof  entity.dataSources != "undefined") {
      for(var i =0;i < entity.dataSources.length;i++) {
        this.addDataSource(entity.dataSources[i],sync);
      }
    }
  },

  push:function(event) {
    var name = event.name;
    var dataSourceId = event.dataSourceId;
    var sync = event.sync;

    // check if data has to be sync
    // append the data to the existing corresponding buffer
    var currentBufferObj = this.buffers[dataSourceId];

    // define the time of the first data as relative time
    if(currentBufferObj.status == BUFFER_STATUS.NOT_START_YET) {
      currentBufferObj.startRelativeTime = event.data.timeStamp;
      currentBufferObj.startRelativeRealTime = new Date().getTime();
      currentBufferObj.name = name;
      currentBufferObj.status = BUFFER_STATUS.START;
    }

    currentBufferObj.buffer.push(event.data);

    if(!sync) {
      this.processData(currentBufferObj,dataSourceId)
    }

  },

  processSyncData:function() {
    if(!this.bufferingState) {

      var minTimeStampBufferObj = null;
      var minTimeStampDSId = null;
      var minTimeStamp = MAX_LONG;
      var currentBufferObj = null;

      var mustBuffering = false;
      var mustBufferingName = '';

      for (var dataSourceId in this.buffers) {
        currentBufferObj = this.buffers[dataSourceId];
        if((mustBuffering = (currentBufferObj.buffer.length == 0) && currentBufferObj.status == BUFFER_STATUS.START && currentBufferObj.sync)){
          mustBufferingName = currentBufferObj.name;
          break;
        }

        if (currentBufferObj.sync && currentBufferObj.status == BUFFER_STATUS.START && currentBufferObj.sync && currentBufferObj.buffer[0].timeStamp < minTimeStamp) {
          minTimeStampBufferObj = currentBufferObj;
          minTimeStampDSId = dataSourceId;
          minTimeStamp = currentBufferObj.buffer[0].timeStamp;
        }
      }

      // re-buffer because at least one dataSource has no data and its status is START
      if(mustBuffering|| minTimeStampBufferObj == null) {
        this.buffering(mustBufferingName);
        this.processSyncData();
      } else {
        this.processData(minTimeStampBufferObj, minTimeStampDSId, function () {
          this.processSyncData();
        }.bind(this));
      }
    }
  },

  processData: function(bufferObj,dataSourceId,fnEndTimeout) {
    // compute waitTime and dispatch data
    var startRelativeTime = bufferObj.startRelativeTime;
    var elapsedTime = new Date().getTime() - bufferObj.startRelativeRealTime;
    var data = bufferObj.buffer.shift();

    var waitTime = (((data.timeStamp-startRelativeTime) / this.replayFactor) - elapsedTime);
    bufferObj.startRelativeTime = data.timeStamp;
    bufferObj.startRelativeRealTime = new Date().getTime();

    if(waitTime > 0) {
      //callback the data after waiting for a time equals to the difference between the two timeStamps
      window.setTimeout(function () {
        this.dispatchData(dataSourceId,data);
        if(typeof fnEndTimeout != "undefined") {
          fnEndTimeout();
        }
      }.bind(this), waitTime);
    } else {
      this.dispatchData(dataSourceId,data);
      if(typeof fnEndTimeout != "undefined") {
        fnEndTimeout();
      }
    }
  },

  dispatchData:function(dataSourceId,data) {
    OSH.EventManager.fire(OSH.EventManager.EVENT.CURRENT_SYNC_TIME,{timeStamp : data.timeStamp});
    OSH.EventManager.fire(OSH.EventManager.EVENT.DATA+"-"+dataSourceId, {data : data});
  },

  buffering:function(name) {
    //OSH.EventManager.fire(OSH.EventManager.EVENT.LOADING_START,{name:name});
    this.bufferingState = true;
    window.setTimeout(function(){
      this.bufferingState = false;
      OSH.EventManager.fire(OSH.EventManager.EVENT.LOADING_STOP);
      this.processSyncData();
    }.bind(this),this.bufferingTime);
  }
});