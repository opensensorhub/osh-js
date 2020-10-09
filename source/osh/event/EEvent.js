import {EventType} from "./EventType.js";

class EEvent {
    /**
     * Generic Event object
     * @param {String} dataSourceId - the datasource id
     * @param {EventType} eventType - the event type
     */
    constructor(dataSourceId, eventType) {
        this.dataSourceId = dataSourceId;
        this.type = eventType;
    }
}

export default EEvent;
