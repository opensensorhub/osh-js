var observedEvent = {};

OSH.EventManager = function() {}

OSH.EventManager.fire = function(eventName,properties) {
    document.fire("osh:"+eventName, properties);
}

OSH.EventManager.observe = function(eventName,fnCallback,id) {
    var handleEvent = function (event) {
        if(typeof fnCallback != "undefined") {
            fnCallback(event.memo);
        }
    };
    if(typeof  id != "undefined") {
        observedEvent[id] = handleEvent;
    }
    document.observe("osh:"+eventName, handleEvent);
};

OSH.EventManager.stopObserving = function(eventName,id) {
    if(typeof id != "undefined") {
        document.stopObserving(eventName, observedEvent[id]);
        delete observedEvent[id];
    }
};

OSH.EventManager.observeDiv = function(divId,eventName,fnCallback) {
    $(divId).observe(eventName, function(event) {
        if(typeof fnCallback != "undefined") {
            fnCallback(event);
        }
    });
};

// This part defines the events used INTO the API
OSH.EventManager.EVENT = {
    DATA : "data",
    SYNC_DATA : "syncData",
    SELECT_VIEW : "selectView",
    CONTEXT_MENU : "contextMenu",
    SHOW_VIEW : "showView",
    CONNECT_DATASOURCE : "connectDataSource",
    DISCONNECT_DATASOURCE : "disconnectDataSource",
    DATASOURCE_UPDATE_TIME: "updateDataSourceTime",
    CURRENT_MASTER_TIME : "currentMasterTime",
    UAV_TAKEOFF : "uav:takeoff",
    UAV_GOTO: "uav:goto",
    UAV_LOOKAT : "uav:lookat",
    UAV_LAND: "uav:land",
    UAV_ORBIT: "uav:orbit",
    LOADING_START: "loading:start",
    LOADING_STOP: "loading:stop"
};
