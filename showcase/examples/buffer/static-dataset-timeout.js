// create data source for Android phone GPS
import DataSynchronizer from "../../../source/osh/buffer/DataSynchronizer";
import {startDataSet} from './buffer';

export function startStaticWithTimeout() {
    const dataSet = [
        {
            dataSourceId: '1',
            data: {
                data: '(1) 30',
                timeStamp: 30,
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
                data: '(1) 100',
                timeStamp: 100,
            }
        },
        {
            dataSourceId: '1',
            data: {
                data: '(1) 150',
                timeStamp: 150,
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
                data: '(2) 90',
                timeStamp: 90,
            }
        },
        {
            dataSourceId: '2',
            data: {
                data: '(2) 170',
                timeStamp: 170,
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
                data: '(3) 40',
                timeStamp: 40,
            }
        }, {
            dataSourceId: '3',
            data: {
                data: '(3) 180',
                timeStamp: 180,
            }
        },
        {
            dataSourceId: '3',
            data: {
                data: '(3) 5000',
                timeStamp: 5000,
            }
        }, {
            dataSourceId: '3',
            data: {
                data: '(3) 5020',
                timeStamp: 5020,
            }
        },
    ];
// static with TimeOut
    const bufferStaticWithTimeOut = new DataSynchronizer({
        replayFactor: 1,
        dataSources: [{
            id: '1',
            bufferingTime: 100,
            timeOut: 4500,
            name: '1'
        }, {
            id: '2',
            bufferingTime: 200,
            timeOut: 4500
        }, {
            id: '3',
            bufferingTime: 300,
            timeOut: 4500
        }]
    });

    for (let i = 0; i < dataSet.length; i++) {
        let event = dataSet[i];
        bufferStaticWithTimeOut.push(event.dataSourceId, event.data);
    }

    startDataSet(bufferStaticWithTimeOut, document.getElementById("buffer-timeout-static"));

    setTimeout(() => {
        bufferStaticWithTimeOut.terminate();
    },1000 * 15);
}
