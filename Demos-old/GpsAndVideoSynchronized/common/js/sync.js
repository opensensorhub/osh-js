////////

var BUFFER_MODE = {
  REALTIME: 0,
  REPLAY : 1
};

var instance = null;
const defaultDelay = 10 * 1000;

var Buffer = function(){
	this.startCurrentTime = null;
	this.startRealTime = null;
	this.endRealTime = null;
	this.replayFactor = null;
	this.buffer = new Array();
	this.clientTable = new Hashtable();
	this.observers = new Array();
	this.startedBuffering = false;
	this.bufferDelay = defaultDelay;
	this.currentMode = BUFFER_MODE.REPLAY;
	this.noData = true;
}

function getBufferSingleton() {
	if(instance == null){
		instance = new Buffer();
	}
	return instance;
}


Buffer.prototype.setDelay = function(delay){
	this.bufferDelay = delay;
}

Buffer.prototype.setStartDate = function(date) {
	this.startRealTime = date.getTime();
}

Buffer.prototype.setEndDate = function(date){
	this.endRealTime = date.getTime();
}

Buffer.prototype.setReplayFactor = function(replayFactor){
	this.replayFactor = replayFactor;
}

Buffer.prototype.addObserver = function(observerCB){
	this.observers.push(observerCB);
}

//buffering
Buffer.prototype.push = function(id,data,timeStamp,type,name){
	//start buffering if first data received
	if(!this.startedBuffering){
		this.startedBuffering = true;
		this.start();
	} 
	
	var datum = {
		id : id, 
		data : data, 
		timeStamp : timeStamp
	}
	
	//TBD : improve sort !
	this.buffer.push(datum);
	this.buffer.sort(function (a, b) {
		if (a.timeStamp > b.timeStamp) {
			return 1;
		}
		if (a.timeStamp < b.timeStamp) {
			return -1;
		}
		return 0;
	});
	if(this.observers.length > 0){
		//callback 
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
	//handle case where some data come after the last computeNextData chaining
	var currentEllapsedTime = new Date().getTime() - this.startCurrentTime;
	if(this.bufferDelay - currentEllapsedTime < 0 && this.noData && this.startCurrentTime != null){
		this.computeNextData();
	}
}

Buffer.prototype.computeNextData = function(){
	var currentEllapsedTime = new Date().getTime() - this.startCurrentTime;
	if(this.buffer.length > 0) {
		this.noData = false;
		var next = this.buffer[0];
		var waitTime = (((next.timeStamp-this.startRealTime) / this.replayFactor) - currentEllapsedTime) * this.currentMode;
		if( waitTime > 0 ){
			window.setTimeout(function(){
				this.waitCB();
			}.bind(this),waitTime);
		} else {
			this.waitCB();
		}
	} else {
		this.noData = true;
	}
}

Buffer.prototype.waitCB = function(){
	var next = this.buffer.shift();
	if(typeof(next) != 'undefined'){
		this.clientTable.get(next.id)(next.data);
	}
	this.computeNextData();
}

Buffer.prototype.register = function(id,callback){
	this.clientTable.put(id,callback);
}

Buffer.prototype.start = function(){
	window.setTimeout(function(){
		this.startCurrentTime = new Date().getTime();
		this.computeNextData();
	 }.bind(this),this.bufferDelay);
}

Buffer.prototype.switchMode = function(mode){
	if(mode != this.currentMode){
		if(mode == BUFFER_MODE.REPLAY){
			this.bufferDelay = defaultDelay;
			this.currentMode = BUFFER_MODE.REPLAY;
			this.startCurrentTime = null;
			this.startedBuffering = false;
			this.noData = false;
		} else if(mode == BUFFER_MODE.REALTIME){
			this.bufferDelay = 0;
			this.currentMode = BUFFER_MODE.REALTIME;
			this.startCurrentTime = new Date().getTime();
			this.startedBuffering = true;
			this.noData = true;
		}
		this.buffer = new Array();
	}
}
