import {EventType} from "./EventType.js";

class DataEvent extends Event {
    /**
     * Class representing a data event object.
     * @param {Array} data - the data array
     * @param {Number} timestamp - the timestamp
     * @param {String} dataSourceId - the datasource id
     */
    constructor(data, timestamp, dataSourceId) {
        super(dataSourceId, EventType.DATA);
        this.data = data;
        this.timestamp = timestamp;
    }
}

export default DataEvent;
