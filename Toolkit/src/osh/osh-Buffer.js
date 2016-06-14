var STATE = {
  NONE: 0,
  BUFFERING : 1,
  READY:2
  
};

/**
 * The buffer is in charge of buffering data given a buffering parameter.
 * If this parameter is equals to 0, so the data are directly sent back
 */ 
OSH.Buffer = Class.create({
  initialize: function() {
    this.startCurrentTime = null;
	  this.startDataTime = null;
	  this.endDataTime = null;
	  this.replayFactor = 1;
	  this.buffer = new Array();
    this.clientTable = {};
    this.observers = new Array();
    this.bufferState = 0;
    this.bufferDelay = 0; // default buffering time in ms
    this.isSynchronized = true;
  },

  /**
   * Set the buffering time before sending back the data to the corresponding client
   */   
  setDelay: function(delay) {
    this.bufferDelay = delay;
  },

  /**
   * Defines if the data has to be synchronized
   */   
  setSynchronized: function(isSynchronized) {
    this.isSynchronized = isSynchronized;
  },

  /**
   * Set the replay factor to compute the waiting time between two data (based on their timestamps)
   */    
  setReplayFactor: function(factor) {
    if(factor <= 0 ) {
      //cannot be <= 0
      this.replayFactor = 1;
    }
    this.replayFactor = factor;
  },

  getReplayFactor: function() {
    return this.replayFactor;
  },
  
  /**
   * Add observer to be notified when a data is handling
   */  
  addObserver: function(observer) {
    this.observers.push(observer);
  },

  setStartDate: function(date) {
	  this.startDataTime = date.getTime();
  },

  /**
   * Push the data into buffer and process them. The observers are notified that a data just come here.
   * If a buffering time has been defined, the processing will start after.
   */   
  push: function(id,data,timeStamp,name) {
    var datum = {
      id : id, 
      data : data, 
      timeStamp : timeStamp,
      name:name
    };
    
    // pushes data into the buffer
	  this.buffer.push(datum);
    if(this.isSynchronized) {
      this.buffer.sort(function (a, b) {
        if (a.timeStamp > b.timeStamp) {
          return 1;
        }
        if (a.timeStamp < b.timeStamp) {
          return -1;
        }
          return 0;
      });
    }
    
    // notifies the observers
    this.callbackObservers(id,name,timeStamp,data,'before');
    
    // update the start data time if needed
    if(this.startDataTime == null || this.startDataTime > datum.timeStamp) {
      this.startDataTime = datum.timeStamp;
    }
    
    // at the first buffer initialization
    if(this.bufferState == STATE.NONE) {
      // start buffering 
      this.bufferState = STATE.BUFFERING;
      this.start();
    }
    
    // the buffering is done, start to send back data to the corresponding clients
    if(this.bufferState == STATE.READY) {
      // the buffer is empty and the processNextData recursive method is finished, so process the data and start a new 
      // recursive loop
      if(this.buffer.length == 1) {
        this.processNextData();
      }
    } 
  },
  
  /**
   * Processes the data. Computes the time to wait between two data (based on timeStamp).
   */ 
  processNextData:function() {
    // computes the ellasped time
    //var currentEllapsedTime = new Date().getTime();
    var currentEllapsedTime = new Date().getTime() - this.startCurrentTime;
    // if the buffer has data
    if(this.buffer.length > 0) {
      var next = this.buffer[0];
      var waitTime = -1;
      if(this.isSynchronized) {
        //(dataTimeStamp - startBufferTime) - (currentTime - endBufferTimer)
        // => (bufferLengthTime + dataTimeStamp  - currentTime)
        waitTime = (((next.timeStamp-this.startDataTime) / this.replayFactor) - currentEllapsedTime);
      }
      
      // this is not true in case of real time data    
      if(waitTime > 0) {
        //callback the data after waiting for a time equals to the difference between the two timeStamps
        window.setTimeout(function(){
          this.callbackData();
        }.bind(this),waitTime);
      } else {
          // in case of real time data, the data is callback directly
          this.callbackData();
      }
    } 
  },
  
  /**
   * Callback the data to the client. Once the data sent, the next one is processed.
   */
  callbackData:function() {
    // removes the first elements of buffer
    var next = this.buffer.shift();
    if(typeof(next) != 'undefined' && !isNaN(next.timeStamp)){
      // notifies the observers
      this.callbackObservers(next.id,next.name,next.timeStamp,[],'after');
      // callback the data to the client
      this.clientTable[next.id]( {timeStamp:next.timeStamp, data:next.data});
    }
    // recursive call
    this.processNextData();
  },
  
  /**
   * Callback stats to observers
   */ 
  callbackObservers:function(id,name,timeStamp,data,status) {
    if(this.observers.length > 0){
      //callback  to observers
      //var percent = ((timeStamp - this.startRealTime) * 100 ) / (this.endRealTime - this.startRealTime);
      for(var i = 0; i < this.observers.length; i++){
        var callback = this.observers[i];
        callback(
          {
           // percent : percent.toFixed(2),
            percent:0,
            name : name,
            id: id,
            timeStamp : timeStamp,
            received : new Date().getTime(),
            status:status
            //data : data //useless overload system
          }
        );
      }
	  }
  },

  /**
   *  Registers a new client
   */ 
  register:function(id,callback) {
    this.clientTable[id] = callback;
  },
  
  /**
   * Starts buffering data
   */ 
  start: function(){
    this.startCurrentTime = new Date().getTime();
    window.setTimeout(function(){
      this.bufferState = STATE.READY;
      this.processNextData();
     }.bind(this),this.bufferDelay);
  },

  /**
   *  Resets all
   */
  reset: function(){
    this.bufferDelay = 0;
    this.startCurrentTime = new Date().getTime();
    this.bufferState = STATE.NONE;
    this.buffer = new Array();
  }  
});
