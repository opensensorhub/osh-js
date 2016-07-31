OSH.EventManager = function() {}

OSH.EventManager.fire = function(eventName,properties) {
    document.fire("osh:"+eventName, properties);
}

OSH.EventManager.observe = function(eventName,fnCallback) {
    document.observe("osh:"+eventName, function (event) {
        if(typeof fnCallback != "undefined") {
            fnCallback(event.memo);
        }
    });
};

OSH.EventManager.observeDiv = function(divId,eventName,fnCallback) {
    $(divId).observe(eventName, function(event) {
        if(typeof fnCallback != "undefined") {
            fnCallback(event.memo);
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
    CURRENT_SYNC_TIME : "currentSyncTime",
    UAV_TAKEOFF : "uav:takeoff",
    UAV_GOTO: "uav:goto",
    UAV_LOOKAT : "uav:lookat",
    UAV_LAND: "uav:land",
    UAV_ORBIT: "uav:orbit"
};
