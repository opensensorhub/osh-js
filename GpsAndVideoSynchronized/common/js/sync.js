var startCurrentTime = 0;
var startRealTime = new Date("2015-02-16T07:58:00Z").getTime();
var endRealTime   = new Date("2015-02-16T08:09:00Z").getTime();
var replayFactor = 5;
var clientTable = new Hashtable();
var buffer = new Array();

var observers = new Array();
var percent = 0;

function start(){
	startCurrentTime = new Date().getTime();
	computeNextData();
}

function Client(callback){
	this.callback = callback;
	this.buffer = new Array();
}

function registerForSync(id,callback){
	clientTable.put(id,new Client(callback));
}

function computeNextData(){
	var currentEllapsedTime = new Date().getTime() - startCurrentTime;
	if(buffer.length > 0) {
		var next = buffer[0];
		var waitTime = (((next.timeStamp-startRealTime) / replayFactor) - currentEllapsedTime);
		if( waitTime > 0 ){
			window.setTimeout(function(){
				waitCB();
			},waitTime);
		} else {
			waitCB();
		}
	}
}

//buffering
function pushIntoBuffer(id,data,timeStamp) {
	var datum = {
		id : id, 
		data : data, 
		timeStamp : timeStamp
	}
	
	//TBD : improve sort !
	buffer.push(datum);
	buffer.sort(function (a, b) {
		if (a.timeStamp > b.timeStamp) {
			return 1;
		}
		if (a.timeStamp < b.timeStamp) {
			return -1;
		}
		return 0;
	});
	if(observers.length > 0){
		//callback percent
		var p = ((timeStamp - startRealTime) * 100 ) / (endRealTime - startRealTime);
		if(p > percent){
			for(var i = 0; i < observers.length; i++){
				var callback = observers[i];
				callback(percent.toFixed(2));
			}
			percent = p;
		}
	}
}

function addObserver(observerCB) {
	observers.push(observerCB);
}
function waitCB(){
	var next = buffer.shift();
	clientTable.get(next.id).callback(next.data);
	computeNextData();
}

window.setTimeout(function(){
	start();
},10000);
