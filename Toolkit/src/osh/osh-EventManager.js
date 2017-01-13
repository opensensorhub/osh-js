var observedEvent = {};

/**
 *
 * @constructor
 */
OSH.EventManager = function() {};

OSH.EventManager.getFireTarget = function(element) {
    if (element !== document)
        return element;
    if (document.createEvent && !element.dispatchEvent)
      return document.documentElement;
    return element;
};

OSH.EventManager.fireEvent_STD = function(element, eventName, memo, bubble) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('dataavailable', bubble, true);

    event.eventName = eventName;
    event.memo = memo;

    element.dispatchEvent(event);
    return event;
};


OSH.EventManager.fireEvent_IE = function(element, eventName, memo, bubble) {
    var event = document.createEventObject();
    event.eventType = bubble ? 'ondataavailable' : 'onlosecapture';

    event.eventName = eventName;
    event.memo = memo;

    element.fireEvent(event.eventType, event);
    return event;
};

OSH.EventManager.fireEvent = function(element, eventName, properties, bubble) {
    if(OSH.Utils.isElement(element))
        element = OSH.EventManager.getFireTarget(element);
    else if(typeof element == 'string')
        element = OSH.EventManager.getFireTarget(document.getElementById(element));
    else
        return;

    if (typeof(bubble) == 'undefined')
        bubble = true;
    properties = properties || {};

    if(document.createEvent)
        return OSH.EventManager.fireEvent_STD(element, eventName, properties, bubble);
    else
        return OSH.EventManager.fireEvent_IE(element, eventName, properties, bubble);
};


/**
 *
 * @param eventName
 * @param properties
 * @instance
 * @memberof OSH.EventManager
 */
OSH.EventManager.fire = function(eventName, properties) {
    OSH.EventManager.fireEvent(document, "osh:"+eventName, properties);
};

/**
 *
 * @param eventName
 * @param fnCallback
 * @param id
 * @instance
 * @memberof OSH.EventManager
 */
OSH.EventManager.observe = function(eventName, fnCallback, id) {
    var handleEvent = function (event) {
        if(typeof fnCallback != "undefined") {
            fnCallback(event.memo);
        }
    };
    if(typeof  id != "undefined") {
        observedEvent[id] = handleEvent;
    }
    OSH.DomEvent.on(document, "osh:"+eventName, handleEvent);
};

/**
 *
 * @param eventName
 * @param id
 * @instance
 * @memberof OSH.EventManager
 */
OSH.EventManager.stopObserving = function(eventName, id) {
    if(typeof id != "undefined") {
        OSH.DomEvent.off(document, eventName, observedEvent[id]);
        delete observedEvent[id];
    }
};

/**
 *
 * @param divId
 * @param eventName
 * @param fnCallback
 * @instance
 * @memberof OSH.EventManager
 */
OSH.EventManager.observeDiv = function(divId, eventName, fnCallback) {
    elem = document.getElementById(divId);
    OSH.DomEvent.on(elem, eventName, function(event) {
        if(typeof fnCallback != "undefined") {
            fnCallback(event);
        }
    });
};

/**
 * This part defines the events used INTO the API
 * @const
 * @type {{DATA: string, SYNC_DATA: string, SELECT_VIEW: string, CONTEXT_MENU: string, SHOW_VIEW: string, CONNECT_DATASOURCE: string, DISCONNECT_DATASOURCE: string, DATASOURCE_UPDATE_TIME: string, CURRENT_MASTER_TIME: string, UAV_TAKEOFF: string, UAV_GOTO: string, UAV_LOOKAT: string, UAV_LAND: string, UAV_ORBIT: string, LOADING_START: string, LOADING_STOP: string, ADD_VIEW_ITEM: string}}
 */
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
    LOADING_STOP: "loading:stop",
    ADD_VIEW_ITEM: "addViewItem",
    RESIZE:"resize"
};
