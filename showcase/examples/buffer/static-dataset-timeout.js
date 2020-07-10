// create data source for Android phone GPS
import DataSynchronizer from "../../../source/osh/buffer/DataSynchronizer";
import {startDataSet} from './buffer';

export function startStaticWithTimeout() {
    const dataSet = [
        {
            dataSourceId: '1',
            data: {
                data: '30',
                timeStamp: 30,
            }
        }, {
            dataSourceId: '1',
            data: {
                data: '50',
                timeStamp: 50,
            }
        }, {
            dataSourceId: '1',
            data: {
                data: '100',
                timeStamp: 100,
            }
        },
        {
            dataSourceId: '1',
            data: {
                data: '150',
                timeStamp: 150,
            }
        },
        /////
        {
            dataSourceId: '2',
            data: {
                data: '10',
                timeStamp: 10,
            }
        }, {
            dataSourceId: '2',
            data: {
                data: '40',
                timeStamp: 40,
            }
        }, {
            dataSourceId: '2',
            data: {
                data: '90',
                timeStamp: 90,
            }
        },
        {
            dataSourceId: '2',
            data: {
                data: '170',
                timeStamp: 170,
            }
        },
        /////
        {
            dataSourceId: '3',
            data: {
                data: '30',
                timeStamp: 30,
            }
        }, {
            dataSourceId: '3',
            data: {
                data: '40',
                timeStamp: 40,
            }
        }, {
            dataSourceId: '3',
            data: {
                data: '180',
                timeStamp: 180,
            }
        },
        {
            dataSourceId: '3',
            data: {
                data: '5000',
                timeStamp: 5000,
            }
        }, {
            dataSourceId: '3',
            data: {
                data: '5020',
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
            timeOut: 500,
            name: '1'
        }, {
            id: '2',
            bufferingTime: 200,
            timeOut: 500
        }, {
            id: '3',
            bufferingTime: 300,
            timeOut: 500
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
