var INITIAL_BUFFERING_TIME = 3000; // ms time

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

        // define a status to cancel task after cancel() calling
        this.cancelled = false;

        // defines a status to stop the buffer after stop() calling.
        // If start() method is called, this variable should be set to TRUE
        this.stop = false;
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
        window.setTimeout(function(){
            this.startRealTime = new Date().getTime();
            this.processSyncData();
        }.bind(this),this.bufferingTime);
    },

    stop : function() {
        this.stopObservers();
        this.stop = true;
    },

    cancelAll: function() {
        this.cancelled = false;

        // clear the buffers
        this.buffers = {};
    },

    addDataSource : function(dataSourceId,sync) {
        this.buffers[dataSourceId] = {buffer:[],sync : sync};
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
        if(typeof (currentBufferObj.startRelativeTime) == "undefined") {
            currentBufferObj.startRelativeTime = event.data.timeStamp;
            currentBufferObj.startRelativeRealTime = new Date().getTime();
        }
        currentBufferObj.buffer.push(event.data);

        if(!sync) {
            this.processData(currentBufferObj,dataSourceId)
        }

    },

    processSyncData:function() {
        var minTimeStampBufferObj = null;
        var minTimeStampDSId = null;
        var minTimeStamp = MAX_LONG;
        var currentBufferObj = null;

        for(var dataSourceId in this.buffers) {
            currentBufferObj = this.buffers[dataSourceId];
            if(currentBufferObj.sync && currentBufferObj.buffer.length > 0 && currentBufferObj.buffer[0].timeStamp < minTimeStamp) {
                minTimeStampBufferObj = currentBufferObj;
                minTimeStampDSId = dataSourceId;
                minTimeStamp = currentBufferObj.buffer[0].timeStamp;
            }
        }

        if(minTimeStampBufferObj != null) {
            this.processData(minTimeStampBufferObj,minTimeStampDSId,function(){
                this.processSyncData();
            }.bind(this));
        } else  {
            //TODO: BUFFERING AGAIN?
            window.setTimeout(function(){
                this.processSyncData();
            }.bind(this),this.bufferingTime);
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
    }
});