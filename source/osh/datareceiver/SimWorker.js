// Worker to generate data simulating a datasource

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
            dataCallback = data.callback;
            break;
        case 'setIntercval':
            self.postMessage('SETTING DATA CALLBACK INTERVAL');
            dataInterval = data.interval;
            break;
        default:
            self.postMessage('UNKNOWN COMMAND');
            break;
    }
});

function generateData(dataCallback) {
    let data = dataCallback();
    console.log(data);
    self.postMessage({data: data});
    return true;
}