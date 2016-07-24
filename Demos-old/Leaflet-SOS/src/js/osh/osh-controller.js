var instanceController = null;

OSH.Controller = function() {
  this.table = new Hashtable();
  this.buffer = Buffer.getBufferSingleton();
  this.tableEvents = new Hashtable();
};

OSH.Controller.getSingleton = function() {
	if(instanceController == null){
		instanceController = new OSH.Controller();
	}
	return instanceController;
}

/**
 * Set the buffer mode:
 * - BUFFER_MODE.REPLAY is parametized by 
 * {
 *    startTime: value (Date),
 *    endTime: value (Date),
 *    replayFactor: value (number)
 * }
 * - BUFFER_MODE.REPLAY does not need any parameters
 */  
OSH.Controller.prototype.setOptions = function(params) {
    if(params.startTime) {
      this.buffer.setStartDate(params.startTime);
    }
    if(params.endTime) {
      this.buffer.setEndDate(params.endTime);
    }
    if(params.replayFactor) {
      this.buffer.setReplayFactor(params.replayFactor);
    }
    if(params.bufferingTime) {
      this.buffer.setDelay(params.bufferingTime);
    }
    if(params.synchronizedTime != 'undefined') {
      this.buffer.setSynchronized(params.synchronizedTime);
    }
};

/**
 * Add a data source into the controller. 
 * @param url: the WebSocket url
 * @param name: the name of the data source
 * @param timeStampParser: the time stamp parser. Because the buffer is using timeStamp to synchronized the data (in Replay Mode), 
 * the time stamp has to be defined and cannot be NULL
 * @param callback: the callback function by which the data is returned. It's the raw data from event.data of the WebSocket (including any timeStamp)
 */  
OSH.Controller.prototype.addDataSource = function(object,url,name,timeStampParser,callback){
  var uuid = getUUID();
  this.table.put(uuid,object);
  
  //creates Web Socket
  var ws = new WebSocket(url);
  ws.binaryType = 'arraybuffer';
  ws.onmessage = function(event) {
    //push data onto the buffer. In the replay mode, the buffer will synchronize data before sending them back using
    //the callback method
    var timeStamp = new Date().getTime();
    
    if(timeStampParser != null) {
        //time stamp to synchronize the data
        timeStamp = timeStampParser(event.data);
    }
    
    this.buffer.push(uuid, event.data, timeStamp , name, name+"-"+uuid);
  }.bind(this);
  ws.onerror = function(event) {
    ws.close();
  }
  
  this.buffer.register(uuid, callback);
  return uuid;
};

OSH.Controller.prototype.addDataSourceObserver = function(observer) {
  this.buffer.addObserver(observer);
};

function getUUID(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

