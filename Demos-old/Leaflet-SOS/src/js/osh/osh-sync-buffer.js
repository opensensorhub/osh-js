////////

var instance = null;

var STATE = {
  NONE: 0,
  BUFFERING : 1,
  READY:2
  
};

/**
 * The buffer is in charge of buffering data given a buffering parameter.
 * If this parameter is equals to 0, so the data are directly sent back
 */ 
var Buffer = function(){
	this.startCurrentTime = null;
	this.startDataTime = new Date().getTime();
	this.endDataTime = null;
	this.replayFactor = null;
	this.buffer = new Array();
	this.clientTable = new Hashtable();
	this.observers = new Array();
	this.bufferState = 0;
	this.bufferDelay = 0; // default buffering time in ms
  this.synchronized = true;
}

/**
 * Get a single instance of the buffer
 */ 
Buffer.getBufferSingleton = function() {
	if(instance == null){
		instance = new Buffer();
	}
	return instance;
}

/**
 * Set the buffering time before sending back the data to the corresponding client
 */ 
Buffer.prototype.setDelay = function(delay){
	this.bufferDelay = delay;
}

/**
 * Defines if the data has to be synchronized
 */ 
Buffer.prototype.setSynchronized = function(synchronize){
	this.synchronized = synchronize;
}

/**
 * Set the replay factor to compute the waiting time between two data (based on their timestamps)
 */  
Buffer.prototype.setReplayFactor = function(replayFactor){
  if(replayFactor <= 0 ) {
    //cannot be <= 0
    this.replayFactor = 1;
  }
	this.replayFactor = replayFactor;
}

/**
 * Add observer to be notified when a data is handling
 */
Buffer.prototype.addObserver = function(observerCB){
	this.observers.push(observerCB);
}

//buffering
/**
 * Push the data into buffer and process them. The observers are notified that a data just come here.
 * If a buffering time has been defined, the processing will start after.
 */ 
Buffer.prototype.push = function(id,data,timeStamp,type,name){
   var datum = {
		  id : id, 
		  data : data, 
		  timeStamp : timeStamp
	  }
	
  // pushes data into the buffer
	this.buffer.push(datum);
  
  // notifies the observers
  this.callbackObservers(type,name,timeStamp,data);
  
  // update the start data time if needed
  if(this.startDataTime > datum.timeStamp) {
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
    if(this.synchronized) {
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
    
    // the buffer is empty and the processNextData recursive method is finished, so process the data and start a new 
    // recursive loop
    if(this.buffer.length == 1) {
      this.processNextData();
    }
  } 
}

/**
 * Processes the data. Computes the time to wait between two data (based on timeStamp).
 */ 
Buffer.prototype.processNextData = function(){
  // computes the ellasped time
	var currentEllapsedTime = new Date().getTime() - this.startCurrentTime;
  // if the buffer has data
	if(this.buffer.length > 0) {
		var next = this.buffer[0];
    var waitTime = -1;
    if(this.synchronized) {
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
}

/**
 * Callback the data to the client. Once the data sent, the next one is processed.
 */
Buffer.prototype.callbackData = function(){
  // removes the first elements of buffer
	var next = this.buffer.shift();
	if(typeof(next) != 'undefined' && !isNaN(next.timeStamp)){
    // callback the data to the client
		this.clientTable.get(next.id)(next.data);
	}
  // recursive call
	this.processNextData();
}

/**
 * Callback stats to observers
 */ 
Buffer.prototype.callbackObservers = function(type,name,timeStamp,data) {
  if(this.observers.length > 0){
      //callback  to observers
      var percent = ((timeStamp - this.startRealTime) * 100 ) / (this.endRealTime - this.startRealTime);
      for(var i = 0; i < this.observers.length; i++){
        var callback = this.observers[i];
        callback(
          {
            percent : percent.toFixed(2),
            type : type,
            name: name,
            timeStamp : timeStamp,
            received : new Date().getTime(),
            data : data
          }
        );
      }
	  }
}

/**
 *  Registers a new client
 */ 
Buffer.prototype.register = function(id,callback){
	this.clientTable.put(id,callback);
}

/**
 * Starts buffering data
 */ 
Buffer.prototype.start = function(){
	window.setTimeout(function(){
    this.bufferState = STATE.READY;
		this.startCurrentTime = new Date().getTime();
		this.processNextData();
	 }.bind(this),this.bufferDelay);
}

/**
 *  Resets all
 */
Buffer.prototype.reset = function(){
    this.bufferDelay = 0;
    this.startCurrentTime = new Date().getTime();
    this.bufferState = STATE.NONE;
		this.buffer = new Array();
}
