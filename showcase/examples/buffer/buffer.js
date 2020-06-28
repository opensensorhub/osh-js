// create data source for Android phone GPS
import DataSynchronizer from "../../../source/osh/buffer/DataSynchronizer";

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
  },{
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
  },{
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
  },{
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
  },{
    dataSourceId: '3',
    data: {
      data: '5020',
      timeStamp: 5020,
    }
  },
];
const buffer = new DataSynchronizer({
  replayFactor:1,
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

for(let i=0;i <dataSet.length;i++ ) {
  let event = dataSet[i];
  buffer.push(event.dataSourceId,event.data);
}

const eltStatic = document.getElementById("buffer-static");
startDataSet(buffer, eltStatic);

// dynamic part
const bufferDynamic = new DataSynchronizer({
  replayFactor:1,
  dataSources: [{
    id: '1',
    bufferingTime: 100,
    timeOut:0,
  },{
    id: '3',
    timeOut:0,
    bufferingTime: 300

  },{
    id: '2',
    timeOut:0,
    bufferingTime: 200
  }]
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}
let count = 0;

function getNewData() {
  let time = Date.now();
  return  {
    dataSourceId: ''+getRandomInt(1,3),
    data: {
      data: new Date(time).toISOString(),
      timeStamp: time,
    }
  };
}

const eltDynamic = document.getElementById("buffer-dynamic");
startDataSet(bufferDynamic, eltDynamic);

function addNewData() {
  const data = getNewData();
  bufferDynamic.push(data.dataSourceId,data.data);
}

// ingest new random data
let lastTimeStamp = 30;
for(let i=0;i < 200;i++) {
  const random = getRandomInt(40,100);
  lastTimeStamp += random;
  setTimeout(()=> addNewData(), lastTimeStamp);
}


function startDataSet(buffer, div) {
  const refClockTime = performance.now();
  let lastData = null;
  let lastClockTime;
  const intervalTime = 5;
  buffer.onData = function(databaseId, data) {
    const clockTime = performance.now();
    let diffClockTime = clockTime - refClockTime;
    div.innerHTML = div.innerHTML + data.data +' (Absolute +' + diffClockTime.toFixed(2) + 'ms)';
    let colorTag = '<span style="color:green">';

    if(lastData !== null) {
      const diffLast = clockTime - lastClockTime;
      const diffTimeStamp = data.timeStamp - lastData.timeStamp;
      if( diffLast > diffTimeStamp + intervalTime*2 || diffLast < diffTimeStamp - intervalTime*2 ) {
        colorTag = '<span style="color:red">';
      }
      div.innerHTML += colorTag + ' expected: '+diffTimeStamp+'ms, real= '+diffLast.toFixed(2)+
          'ms, delta= '+(diffTimeStamp-diffLast).toFixed(2)+' (+/- '+(intervalTime*2)+'ms)</span>';
    }
    div.innerHTML += '<br>';
    lastData = data;
    lastClockTime = clockTime;
  };
}