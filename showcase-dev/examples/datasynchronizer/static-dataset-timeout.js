// create data source for Android phone GPS
import DataSynchronizer from "../../../source/core/timesync/DataSynchronizer";
import {startDataSet} from './datasynchronizer';

export function startStaticWithTimeout() {
    const dataSet = [
        {
            dataSourceId: '1b',
            data: {
                data: '(1) 25',
                timeStamp: 25,
            },
            terminate: function() {}
        }, {
            dataSourceId: '1b',
            data: {
                data: '(1) 50',
                timeStamp: 50,
            },
            terminate: function() {}
        }, {
            dataSourceId: '1b',
            data: {
                data: '(1) 100',
                timeStamp: 100,
            },
            terminate: function() {}
        },
        {
            dataSourceId: '1b',
            data: {
                data: '(1) 150',
                timeStamp: 150,
            },
            terminate: function() {}
        },
        /////
        {
            dataSourceId: '2b',
            data: {
                data: '(2) 10',
                timeStamp: 10,
            },
            terminate: function() {}
        }, {
            dataSourceId: '2b',
            data: {
                data: '(2) 40',
                timeStamp: 40,
            },
            terminate: function() {}
        }, {
            dataSourceId: '2b',
            data: {
                data: '(2) 80',
                timeStamp: 80,
            },
            terminate: function() {}
        },
        {
            dataSourceId: '2b',
            data: {
                data: '(2) 120',
                timeStamp: 120,
            },
            terminate: function() {}
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
            },
            terminate: function() {}
        }, {
            dataSourceId: '3b',
            data: {
                data: '(3) 60',
                timeStamp: 60,
            },
            terminate: function() {}
        },
        {
            dataSourceId: '3b',
            data: {
                data: '(3) 90',
                timeStamp: 90,
            },
            terminate: function() {}
        }, {
            dataSourceId: '3b',
            data: {
                data: '(3) 150',
                timeStamp: 150  ,
            },
            terminate: function() {}
        },
    ];
// static with TimeOut
    const timeSyncWithTimeout = new DataSynchronizer({
        replaySpeed: 1,
        dataSources: [{
            id: '1b',
            properties: {
                bufferingTime: 100,
                timeOut: 4500,
                name: '1'
            },
            terminate: function() {}
        }, {
            id: '2b',
            properties: {
                bufferingTime: 200,
                timeOut: 4500
            },
            terminate: function() {}
        }, {
            id: '3b',
            properties: {
                bufferingTime: 300,
                timeOut: 4500
            },
            terminate: function() {}
        }]
    });

    for (let i = 0; i < dataSet.length; i++) {
        let event = dataSet[i];
        timeSyncWithTimeout.push(event.dataSourceId, event.data);
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
        timeSyncWithTimeout.terminate();
    },1000 * 15);
}
