import File from 'osh-js/ext/datasource/File';
import {EventType} from 'osh-js/core/event/EventType';


const videoDivElement = document.getElementById('datasource-file');

const NB_FILES = 8;
const files = [];

for(let i=1;i <= NB_FILES;i++) {
  files.push('./data/earthquakes.' + i + '.csv');
}

const fileDatasource = new File('EQ data',{
  paths: files,
  batchSize: 5000
});

fileDatasource.subscribe(async (message) => {
  let dataEvent;
  for (let i = 0; i < message.values.length; i++) {
    dataEvent = message.values[i];
    const str = JSON.stringify(dataEvent.data,null,2);
    document.getElementById('json-container').innerHTML = str;
    await sleep(50);
  }
}, [EventType.DATA])

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// start streaming onclick
fileDatasource.connect();
