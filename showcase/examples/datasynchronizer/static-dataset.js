// create data source for Android phone GPS
import DataSynchronizer from "../../../source/osh/datasynchronizer/DataSynchronizer";
import {startDataSet} from './datasynchronizer';


export function startStatic() {
    const dataSet = [
        {
            dataSourceId: '1',
            data: {
                data: '(1) 25',
                timeStamp: 25,
            }
        }, {
            dataSourceId: '1',
            data: {
                data: '(1) 50',
                timeStamp: 50,
            }
        }, {
            dataSourceId: '1',
            data: {
                data: '(1) 75',
                timeStamp: 75,
            }
        },
        {
            dataSourceId: '1',
            data: {
                data: '(1) 100',
                timeStamp: 100,
            }
        },
        /////
        {
            dataSourceId: '2',
            data: {
                data: '(2) 10',
                timeStamp: 10,
            }
        }, {
            dataSourceId: '2',
            data: {
                data: '(2) 40',
                timeStamp: 40,
            }
        }, {
            dataSourceId: '2',
            data: {
                data: '(2) 80',
                timeStamp: 80,
            }
        },
        {
            dataSourceId: '2',
            data: {
                data: '(2) 120',
                timeStamp: 120,
            }
        },
        /////
        {
            dataSourceId: '3',
            data: {
                data: '(3) 30',
                timeStamp: 30,
            }
        }, {
            dataSourceId: '3',
            data: {
                data: '(3) 60',
                timeStamp: 60,
            }
        }, {
            dataSourceId: '3',
            data: {
                data: '(3) 90',
                timeStamp: 90,
            }
        },
        {
            dataSourceId: '3',
            data: {
                data: '(3) 120',
                timeStamp: 120,
            }
        }, {
            dataSourceId: '3',
            data: {
                data: '(3) 150',
                timeStamp: 150,
            }
        },
    ];
    const buffer = new DataSynchronizer({
        replayFactor: 1,
        dataSources: [{
            id: '1',
            bufferingTime: 100,
            timeOut: 0,
            name: '1'
        }, {
            id: '2',
            bufferingTime: 200,
            timeOut: 0
        }, {
            id: '3',
            bufferingTime: 300,
            timeOut: 0
        }]
    });

    for (let i = 0; i < dataSet.length; i++) {
        let event = dataSet[i];
        setTimeout(() => {
            event.data.clockTime = performance.now();
            buffer.push(event.dataSourceId, event.data);
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

    startDataSet(buffer, eltStatic, 1000, null,expectedResults);

    setTimeout(() => {
        buffer.terminate();
    },1000 * 15);
}
