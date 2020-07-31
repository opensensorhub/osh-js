// create data source for Android phone GPS
import DataSynchronizer from "../../../source/osh/datasynchronizer/DataSynchronizer";
import {startDataSet} from './datasynchronizer';

export function startStaticWithTimeout() {
    const dataSet = [
        {
            dataSourceId: '1b',
            data: {
                data: '(1) 25',
                timeStamp: 25,
            }
        }, {
            dataSourceId: '1b',
            data: {
                data: '(1) 50',
                timeStamp: 50,
            }
        }, {
            dataSourceId: '1b',
            data: {
                data: '(1) 100',
                timeStamp: 100,
            }
        },
        {
            dataSourceId: '1b',
            data: {
                data: '(1) 150',
                timeStamp: 150,
            }
        },
        /////
        {
            dataSourceId: '2b',
            data: {
                data: '(2) 10',
                timeStamp: 10,
            }
        }, {
            dataSourceId: '2b',
            data: {
                data: '(2) 40',
                timeStamp: 40,
            }
        }, {
            dataSourceId: '2b',
            data: {
                data: '(2) 80',
                timeStamp: 80,
            }
        },
        {
            dataSourceId: '2b',
            data: {
                data: '(2) 120',
                timeStamp: 120,
            }
        },
        /////
        {
            dataSourceId: '3b',
            data: {
                data: '(3) 30',
                timeStamp: 30,
            }
        }, {
            dataSourceId: '3b',
            data: {
                data: '(3) 40',
                timeStamp: 40,
            }
        }, {
            dataSourceId: '3b',
            data: {
                data: '(3) 60',
                timeStamp: 60,
            }
        },
        {
            dataSourceId: '3b',
            data: {
                data: '(3) 90',
                timeStamp: 90,
            }
        }, {
            dataSourceId: '3b',
            data: {
                data: '(3) 150',
                timeStamp: 150  ,
            }
        },
    ];
// static with TimeOut
    const dataSynchronizerWithTimeout = new DataSynchronizer({
        replayFactor: 1,
        dataSources: [{
            id: '1b',
            properties: {
                bufferingTime: 100,
                timeOut: 4500,
                name: '1'
            }
        }, {
            id: '2b',
            properties: {
                bufferingTime: 200,
                timeOut: 4500
            }
        }, {
            id: '3b',
            properties: {
                bufferingTime: 300,
                timeOut: 4500
            }
        }]
    });

    for (let i = 0; i < dataSet.length; i++) {
        let event = dataSet[i];
        dataSynchronizerWithTimeout.push(event.dataSourceId, event.data);
    }
    const expectedResults = [{
        d0 : 10,
        d1: 10,
        d2: 10
    },{
        d0: 0,
        d1: 30,
        d2: 30
    },{
        d0: 10,
        d1: 25,
        d2: 25
    },{
        d0: 10,
        d1: 20,
        d2: 20
    },{
        d0: 20,
        d1: 40,
        d2: 40
    },{
        d0: 10,
        d1: 30,
        d2: 30
    },{
        d0: 10,
        d1: 50,
        d2:50
    }, {
        d0: 20,
        d1: 40,
        d2: 40
    }, {
        d0: 30,
        d1: 60,
        d2: 60 // ds 2 timeout
    },{
        d0: 0,
        d1: 50,
        d2: 50
    }];

    startDataSet(document.getElementById("buffer-timeout-static"), 1000,
        null, expectedResults, ['1b','2b','3b']);

    setTimeout(() => {
        dataSynchronizerWithTimeout.terminate();
    },1000 * 15);
}
