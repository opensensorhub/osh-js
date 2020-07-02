import DataConnector from "./DataConnector";
import {parseTimestamp} from "vuetify/lib/components/VCalendar/util/timestamp";

class SimConnector extends DataConnector {

    constructor(properties) {
        super(properties);
        this.interval = 1000;
        this.lastTimestamp = -1;

        if (properties.hasOwnProperty('interval')) {
            this.interval = properties.interval;
        }
        if (properties.hasOwnProperty('dataCallback')) {
            this.dataCallback = properties.dataCallback;
        }

        this.blobURL = URL.createObjectURL(new Blob(['(',
                function () {
                    // Generate data every X milliseconds
                    let dataInterval = 1000;
                    let dataCallback = () => 'Hello';

                    self.addEventListener('message', (e) => {
                        let data = e.data;

                        switch (data.cmd) {
                            case 'start':
                                self.postMessage('SIM DATA WORKER STARTED: ' + data.msg);
                                break;
                            case 'stop':
                                self.postMessage('SIM DATA WORKER STOPPED ' + data.msg);
                                clearInterval();
                                self.close();
                                break;
                            case 'startData':
                                self.postMessage('STARTING DATA GENERATION...');
                                setInterval(generateData, dataInterval, dataCallback);
                                break;
                            case 'setDataCallback':
                                self.postMessage('SETTING DATA CALLBACK FUNCTION');
                                let reader = new FileReader();
                                reader.addEventListener('loadend', () => {
                                    console.log(reader.result);
                                    dataCallback = reader.result;
                                });
                                reader.readAsText(data.callback);
                                // dataCallback = data.callback;
                                break;
                            case 'setInterval':
                                self.postMessage('SETTING DATA CALLBACK INTERVAL');
                                dataInterval = data.interval;
                                break;
                            default:
                                self.postMessage('UNKNOWN COMMAND');
                                break;
                        }
                    });

                    function generateData(dataCallback) {
                        // let data = eval(dataCallback);
                        let data = createDataEntries();
                        // console.log(data);
                        self.postMessage({data: data});
                        return true;
                    }

                    function createDataEntries() {
                        let tempDataArr = [];
                        let freqCounter = 0;

                        let maxPower = 250;
                        let minPower = -80;
                        let numBands = 10;

                        for (let i = 0; i < numBands; i++) {
                            let randomPower = Math.random() * (maxPower - minPower) + minPower;
                            tempDataArr.push({
                                time: Date.now(),
                                freqBand: [freqCounter, freqCounter + 400],
                                power: randomPower
                            });
                            freqCounter += 400;
                        }
                        return tempDataArr;
                    }

                }.toString(), ')()'],
            {type: 'application/javascript'}));
    }

    connect() {
        console.log('Connecting...')
        if (!this.init) {
            // this.worker = new Worker('../datareceiver/SimWorker.js');
            this.worker = new Worker(this.blobURL);
            this.worker.postMessage({cmd: 'start', msg: 'Start Data'});
            this.worker.postMessage({cmd: 'setInterval', msg: this.interval, interval: this.interval});
            // this.worker.postMessage({cmd: 'setDataCallback', callback: this.dataCallback});

            this.worker.onmessage = function (ev) {
                this.lastTimestamp = Date.now();
                this.onMessage(ev.data);
            }.bind(this); // Do we need a binding here?

            this.worker.postMessage({cmd: 'startData'});
        }
    }

    /**
     * Disconnects the websocket.
     */
    disconnect() {
        // this.fullDisconnect(true);
        this.worker.postMessage({cmd: 'stop', msg: 'Stop Worker'});
    }

    /**
     * Try to reconnect if the connexion if closed
     */
    reconnect() {
        this.onReconnect();
        if (this.init) {
            this.fullDisconnect(false);
        }
        this.connect();

    }

    /**
     * The onMessage method used by the websocket to callback the data
     * @param data the callback data
     */
    onMessage(data) {
        console.log(data);
        this.onData({
            timestamp: this.parseTimeStamp(data) + this.timeShift,
            data: this.parseData(data)
        })
    }

    /**
     * Closes the webSocket.
     */
    close() {
        this.disconnect();
    }

    /**
     * Extracts timestamp from the message. The timestamp corresponds to the 'time' attribute of the JSON object.
     * @param {String} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        console.log(data)
        // let rec = String.fromCharCode.apply(null, new Uint8Array(data));
        this.lastTimeStamp = data.data[0].time;
        return this.lastTimeStamp;
    }

    /**
     * Extract data from the message. The data are corresponding to the whole list of attributes of the JSON object
     * excepting the 'time' one.
     * @param {Object} data - the data to parse
     * @return {Object} the parsed data
     * @example
     * {
     *   location : {
     *    lat:43.61758626,
     *    lon: 1.42376557,
     *    alt:100
     *   }
     * }
     */
    parseData(data) {
        // let rec = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));
        // let result = {};
        //
        // for (let key in rec) {
        //     if (key !== 'time') {
        //         result[key] = rec[key];
        //     }
        // }

        return data;
    }

}

export default SimConnector;