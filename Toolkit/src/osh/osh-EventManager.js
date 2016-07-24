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
    SELECT_VIEW : "selectView",
    CONTEXT_MENU : "contextMenu",
    SHOW_VIEW : "showView",
    CONNECT_DATASOURCE : "connectDataSource",
    DISCONNECT_DATASOURCE : "disconnectDataSource"
};

