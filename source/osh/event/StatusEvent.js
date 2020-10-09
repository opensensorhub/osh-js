import {EventType} from "./EventType.js";
import EEvent from "./EEvent";

class StatusEvent extends EEvent {
    /**
     * Class representing a status event object.
     * @param {StatusEvent} status - the status
     * @param {String} dataSourceId - the datasource id
     */
    constructor(status,  dataSourceId) {
        super(dataSourceId, EventType.STATUS);
        this.status = status;
    }
}

export default StatusEvent;
