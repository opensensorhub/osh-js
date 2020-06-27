// create data source for Android phone GPS
import DataSynchronizer from "../../../source/osh/buffer/DataSynchronizer";

const dataSet = [
  {
    dataSourceId: '1',
    data: {
      data: '3',
      timeStamp: 3,
    }
  }, {
    dataSourceId: '1',
    data: {
      data: '5',
      timeStamp: 5,
    }
  },{
    dataSourceId: '1',
    data: {
      data: '10',
      timeStamp: 10,
    }
  },
  {
    dataSourceId: '1',
    data: {
      data: '15',
      timeStamp: 15,
    }
  },
    /////
  {
    dataSourceId: '2',
    data: {
      data: '1',
      timeStamp: 1,
    }
  }, {
    dataSourceId: '2',
    data: {
      data: '4',
      timeStamp: 4,
    }
  },{
    dataSourceId: '2',
    data: {
      data: '9',
      timeStamp: 9,
    }
  },
  {
    dataSourceId: '2',
    data: {
      data: '17',
      timeStamp: 17,
    }
  },
  /////
  {
    dataSourceId: '3',
    data: {
      data: '3',
      timeStamp: 3,
    }
  }, {
    dataSourceId: '3',
    data: {
      data: '4',
      timeStamp: 4,
    }
  },{
    dataSourceId: '3',
    data: {
      data: '18',
      timeStamp: 18,
    }
  },
  {
    dataSourceId: '3',
    data: {
      data: '5000',
      timeStamp: 5000,
    }
  },{
    dataSourceId: '3',
    data: {
      data: '5001',
      timeStamp: 5001,
    }
  },
];
const buffer = new DataSynchronizer({
  replayFactor:1,
  dataSources: [{
      id: '1',
      bufferingTime: 100,
      timeOut: 5000,
      name: '1'
    }, {
      id: '2',
      bufferingTime: 200,
      timeOut: 5000
    }, {
      id: '3',
      bufferingTime: 300,
      timeOut: 1000
    }]
});

for(let i=0;i <dataSet.length;i++ ) {
  let event = dataSet[i];
  buffer.push(event.dataSourceId,event.data);
}

const eltStatic = document.getElementById("buffer-static");

buffer.onData = function(databaseId, data) {
  eltStatic.innerHTML = eltStatic.innerHTML+" "+data.data;
};

// // dynamic part
// const bufferDynamic = new DataSynchronizer({
//   replayFactor:1,
//   dataSources: [{
//     id: '1',
//     syncMasterTime: true,
//     bufferingTime: 100
//   },{
//     id: '3',
//     syncMasterTime: true,
//     bufferingTime: 300
//   },{
//     id: '2',
//     syncMasterTime: true,
//     bufferingTime: 200
//   }]
// });
//
// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min +1)) + min;
// }
// let count = 0;
//
// function getNewData() {
//   let time = Date.now();
//   return  {
//     dataSourceId: ''+getRandomInt(1,3),
//     data: {
//       data: new Date(time).toISOString(),
//       timeStamp: time,
//     }
//   };
// }
//
// const eltDynamic = document.getElementById("buffer-dynamic");
//
// bufferDynamic.onData = function(dataSourceId, data) {
//   eltDynamic.innerText = eltDynamic.innerText+dataSourceId+" =>  "+data.data+" \n";
// };
//
// function addNewData() {
//   const data = getNewData();
//   bufferDynamic.push(data.dataSourceId,data.data);
// }
//
// // ingest new random data
// for(let i=0;i < 40;i++) {
//   const random = getRandomInt(10,100);
//   setTimeout(()=> addNewData(), random);
// }


