// create data source for Android phone GPS
import DataSynchronizer from "../../../source/core/timesync/DataSynchronizer";
import {startDataSet} from './datasynchronizer';


export function startStatic() {
    const dataSet = [
        {
            dataSourceId: '1',
            data: {
                data: '(1) 25',
                timeStamp: 25,
            },
            terminate: function() {}
        }, {
            dataSourceId: '1',
            data: {
                data: '(1) 50',
                timeStamp: 50,
            },
            terminate: function() {}
        }, {
            dataSourceId: '1',
            data: {
                data: '(1) 75',
                timeStamp: 75,
            },
            terminate: function() {}
        },
        {
            dataSourceId: '1',
            data: {
                data: '(1) 100',
                timeStamp: 100,
            },
            terminate: function() {}
        },
        /////
        {
            dataSourceId: '2',
            data: {
                data: '(2) 10',
                timeStamp: 10,
            },
            terminate: function() {}
        }, {
            dataSourceId: '2',
            data: {
                data: '(2) 40',
                timeStamp: 40,
            },
            terminate: function() {}
        }, {
            dataSourceId: '2',
            data: {
                data: '(2) 80',
                timeStamp: 80,
            },
            terminate: function() {}
        },
        {
            dataSourceId: '2',
            data: {
                data: '(2) 120',
                timeStamp: 120,
            },
            terminate: function() {}
        },
        /////
        {
            dataSourceId: '3',
            data: {
                data: '(3) 30',
                timeStamp: 30,
            },
            terminate: function() {}
        }, {
            dataSourceId: '3',
            data: {
                data: '(3) 60',
                timeStamp: 60,
            },
            terminate: function() {}
        }, {
            dataSourceId: '3',
            data: {
                data: '(3) 90',
                timeStamp: 90,
            },
            terminate: function() {}
        },
        {
            dataSourceId: '3',
            data: {
                data: '(3) 120',
                timeStamp: 120,
            },
            terminate: function() {}
        }, {
            dataSourceId: '3',
            data: {
                data: '(3) 150',
                timeStamp: 150,
            },
            terminate: function() {}
        },
    ];
    const timeSync = new DataSynchronizer({
        replaySpeed: 1,
        dataSources: [{
            id: '1',
            properties: {
                bufferingTime: 100,
                timeOut: 0,
                name: '1'
            },
            terminate: function() {}
        }, {
            id: '2',
            properties: {
                bufferingTime: 200,
                timeOut: 0
            },
            terminate: function() {}
        }, {
            id: '3',
            properties: {
                bufferingTime: 300,
                timeOut: 0
            },
            terminate: function() {}
        }]
    });

    for (let i = 0; i < dataSet.length; i++) {
        let event = dataSet[i];
        setTimeout(() => {
            event.data.clockTime = performance.now();
            timeSync.push(event.dataSourceId, event.data);
        },event.data.timeStamp);
    }

    const eltStatic = document.getElementById("buffer-static");
    const expectedResults = [{
        d0 : 10,
        d1: 30,
        d2: 30,
    },{
        d0: 10,
        d1: 25,
        d2: 25,
    },{
        d0: 10,
        d1: 30,
        d2: 30,
    },{
        d0: 15,
        d1: 25,
        d2: 25,
    },{
        d0: 5,
        d1: 40,
        d2: 40,
    },{
        d0: 10,
        d1: 30,
        d2: 30,
    },{
        d0: 10,
        d1: 25,
        d2: 25,
    }];

    startDataSet(eltStatic, 1000, null,expectedResults, ['1','2','3']);

    setTimeout(() => {
        timeSync.terminate();
    },1000 * 15);
}
