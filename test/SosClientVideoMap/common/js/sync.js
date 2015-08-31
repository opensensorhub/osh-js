// VERSION 1
//put data into buffer by sorting them every time a data is put
//return data in order following the max rate frequency (in our case : video)
/*var time = -1;
var minRate = 0;

var clientTable = new Hashtable();

var buffer = new Array();
var recordsNumber = 10;

function Client(callback){
	this.callback = callback;
	this.buffer = new Array();
	this.packetRateTime = 0 ;
	this.lastPacketTime = 0;
	this.inc = 0;
}

function registerForSync(id,callback){
	clientTable.put(id,new Client(callback));
}

//buffering
function pushIntoBuffer(id,data,timeStamp,packetTimeStamp) {
	var datum = {
		id : id, 
		data : data, 
		timeStamp : timeStamp, 
		packetTimeStamp : packetTimeStamp
	}
	
	var client = clientTable.get(id);
	
	if(client.inc < recordsNumber ){
		if(client.inc > 0){
			client.packetRateTime += packetTimeStamp - client.lastPacketTime;
		}
		client.lastPacketTime = packetTimeStamp;
		client.inc = client.inc + 1;
	} else if( client.inc == recordsNumber ){
		client.packetRateTime = client.packetRateTime / recordsNumber;
		client.inc = client.inc + 1;
	}
	
	// insert the element in the array at the right timeStamp position
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
}

//returns data if it is included in the time
function dispatchData(){
 var next = buffer.shift();
 //console.log(next);
 clientTable.get(next.id).callback(next.data);
}

function estimateAproximateMinRate(){
	if(clientTable.size() > 0 ){
		
		var clients = clientTable.values();
		var minRate = 9999999999999;
		
		for(var i = 0;i< clients.length;i++){
			if(clients[i].packetRateTime < minRate) {
				minRate = clients[i].packetRateTime;
			} 
		}
		
		//check data to display every minRate
		window.setInterval("dispatchData()",minRate);
	} 
}

window.setTimeout(function(){
	estimateAproximateMinRate();
},10000);*/


// VERSION 2
//put data into buffer by sorting them every time a data is put
//return data in order , and for each loop until the real start time + increment (of interval) > timeStamp of the current data

/*var interval = 100;
var clientTable = new Hashtable();

var startTime = new Date("2015-02-16T07:58:00Z").getTime();
var buffer = new Array();
var recordsNumber = 10;
var factorReplay = 5;

var inc = startTime;

function Client(callback){
	this.callback = callback;
	this.buffer = new Array();
	this.packetRateTime = 0 ;
	this.lastPacketTime = 0;
	this.inc = 0;
}

function registerForSync(id,callback){
	clientTable.put(id,new Client(callback));
}

//buffering
function pushIntoBuffer(id,data,timeStamp,packetTimeStamp) {
	var datum = {
		id : id, 
		data : data, 
		timeStamp : timeStamp, 
		packetTimeStamp : packetTimeStamp
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
}

//returns data if it is included in the time
function dispatchData(){
	inc += (interval*factorReplay);
	for(var i = 0; i < buffer.length;i++){
		if(buffer[i].timeStamp  > inc ){
				break;
		}
		var next = buffer.shift();
		console.log(next);
		clientTable.get(next.id).callback(next.data);
	}
}

function estimateAproximateMinRate(){
	if(clientTable.size() > 0 ){
		//check data to display every minRate
		window.setInterval("dispatchData()",interval);
	} 
}

window.setTimeout(function(){
	estimateAproximateMinRate();
},10000);*/


//V3

var startCurrentTime = 0;
var startRealTime = new Date("2015-02-16T07:58:00Z").getTime();
var replayFactor = 5;
var clientTable = new Hashtable();
var buffer = new Array();

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
		var waitTime = Math.max(0, (((next.timeStamp-startRealTime) / replayFactor) - currentEllapsedTime));
		window.setTimeout(function(){
			waitCB();
		},waitTime);
	}
}

//buffering
function pushIntoBuffer(id,data,timeStamp,packetTimeStamp) {
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
}

function waitCB(){
	var next = buffer.shift();
	clientTable.get(next.id).callback(next.data);
	computeNextData();
}

window.setTimeout(function(){
	start();
},10000);
