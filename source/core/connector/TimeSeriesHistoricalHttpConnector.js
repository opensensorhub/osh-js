import HttpConnector from "./HttpConnector";

class TimeSeriesHistoricalHttpConnector extends HttpConnector {
    constructor(url, properties, timeSeriesReplayState ) {
        super(url, properties);
        this.method = "GET";
        this.interval = -1;
        this.buffer = [];
        this.batchSizeInMillis = 10000; // 10 sec
        this.deltaTimeThreshold = 3000; // fetch if remaining only 3 sec of data
        this.timeSeriesReplayState = timeSeriesReplayState;
        this.loadState();
    }

    loadState() {
        this.startTimestamp = new Date(this.timeSeriesReplayState.getStartTime()).getTime();
        this.endTimestamp = new Date(this.timeSeriesReplayState.getEndTime()).getTime();
        this.replaySpeed = this.timeSeriesReplayState.getReplaySpeed();
        this.currentTimestamp = this.startTimestamp; // current offset of the time into the current stream
    }

    /**
     * This is the callback method in case of getting error connection.
     * @param event The error details
     * @event
     */
    onError(event) {

    }

    startLoop() {
        if(this.interval === -1) {
            let tsRef = -1;
            let tsRun = 0;
            let refClockTime = performance.now();
            this.interval = setInterval(() => {
                // fetch if less or equal than deltaTimeThreshold
                if(this.buffer.length === 0) {
                    //either fetch new batch or disconnect because there is no more data
                    let deltaTimeToFetch = this.batchSizeInMillis;
                    if((deltaTimeToFetch + this.currentTimestamp) > this.endTimestamp) {
                        deltaTimeToFetch = this.endTimestamp - this.currentTimestamp;
                    }
                    //TODO fetch data

                    this.currentTimestamp += deltaTimeToFetch;
                    if(this.currentTimestamp >= this.endTimestamp) {
                        this.disconnect(); // end of stream, no more data
                    }
                } else {
                    const dClock = (performance.now() - refClockTime) * this.replaySpeed;
                    tsRun = tsRef + dClock;
                    const dTs = (this.buffer.data.timestamp - tsRef);
                    if (dTs <= dClock) {
                        this.onMessage(this.buffer.shift());
                    }
                }
            },5);
        }
    }
    /**
     * This is the callback method in case of getting success connection.
     * @param event
     * @event
     */
    onMessage(event) {

    }

    disconnect() {
        //TODO: stop loop
        clearInterval(this.interval);
    }

    /**
     * Sends the request
     * @private
     */
    connect() {
        //TODO: start Loop if not started yet
        this.startLoop();
    }

    isConnected() {
        //TODO: check currentTime <= endTime && values.length > 0
        return false;
    }

}

export default TimeSeriesHistoricalHttpConnector;
