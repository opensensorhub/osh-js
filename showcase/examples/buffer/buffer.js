// create data source for Android phone GPS
import DataSynchronizer from "../../../source/osh/buffer/DataSynchronizer";
import {startStatic} from './static-dataset';
import {startStaticWithTimeout} from './static-dataset-timeout';
import {startDynamicWithTimeout} from './dynamic-datatset-timeout';

export function startDataSet(buffer, div) {
  const refClockTime = performance.now();
  let lastData = null;
  let lastClockTime;
  const intervalTime = 5;
  buffer.onData = function (databaseId, data) {
    const clockTime = performance.now();
    let diffClockTime = clockTime - refClockTime;

    if (lastData !== null) {
      let colorTag = '<span style="color:green">';
      const diffLast = clockTime - lastClockTime;
      const diffTimeStamp = data.timeStamp - lastData.timeStamp;

      let delayed = data.delayed? ' (delayed) ' : '';
      const italicSt = data.delayed? '<i>': '';
      const italicEnd = data.delayed? '</i>': '';
      if (lastData.timeStamp > data.timeStamp) {
        div.innerHTML = div.innerHTML + italicSt+ '<span style="color:red">' + data.data +
            '</span> (Absolute +' + diffClockTime.toFixed(2) + 'ms)'+ delayed +
            italicEnd;
      } else {
        div.innerHTML = div.innerHTML +italicSt+'<span style="color:green">' +  data.data +
            '</span> (Absolute +' + diffClockTime.toFixed(2) + 'ms)' + delayed +
            italicEnd;
      }

      if (diffLast > diffTimeStamp + intervalTime * 2 || diffLast < diffTimeStamp - intervalTime * 2) {
        colorTag = '<span style="color:red">';
      }
      // div.innerHTML += colorTag + ' expected: '+diffTimeStamp+'ms, real= '+diffLast.toFixed(2)+
      //     'ms, delta= '+(diffTimeStamp-diffLast).toFixed(2)+' (+/- '+(intervalTime*2)+'ms)</span>';
    } else {
      div.innerHTML = div.innerHTML + data.data + ' (Absolute +' + diffClockTime.toFixed(2) + 'ms)';
    }
    div.innerHTML += '<br>';
    lastData = data;
    lastClockTime = clockTime;
  };
}

startStatic();
startStaticWithTimeout();

const simulButton = document.getElementById("simulation");
simulButton.onclick = () => {
  simulButton.disabled = true;
  startDynamicWithTimeout();
};



