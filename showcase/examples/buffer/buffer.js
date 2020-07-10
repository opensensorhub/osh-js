// create data source for Android phone GPS
import DataSynchronizer from "../../../source/osh/buffer/DataSynchronizer";
import {startStatic} from './static-dataset';
import {startStaticWithTimeout} from './static-dataset-timeout';
import {startDynamicWithTimeout} from './dynamic-datatset-timeout';
import {isDefined} from "../../../source/osh/utils/Utils";

const selectorMapping= {
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five'
}
export function startDataSet(buffer, div) {
  const refClockTime = performance.now();
  let lastData = null;
  let lastClockTime;
  const intervalTime = 5;
  buffer.onData = function (databaseId, data) {
    const clockTime = performance.now();
    let diffClockTime = clockTime - refClockTime;

    let htmlContent = '';
    if (lastData !== null) {
      let colorTag = '<span style="color:green"  class="line '+selectorMapping[databaseId]+'">';
      const diffLast = clockTime - lastClockTime;
      const diffTimeStamp = data.timeStamp - lastData.timeStamp;

      let delayed = data.delayed? ' (delayed) ' : '';
      const italicSt = data.delayed? '<i>': '';
      const italicEnd = data.delayed? '</i>': '';
      if (lastData.timeStamp > data.timeStamp) {
        htmlContent += italicSt+ '<span style="color:red" class="line '+selectorMapping[databaseId]+'">' + data.data +
            '</span> (Absolute +' + diffClockTime.toFixed(2) + 'ms)'+ delayed +
            italicEnd;
      } else {
        htmlContent += italicSt+'<span style="color:green" class="line '+selectorMapping[databaseId]+'">' +  data.data +
            '</span> (Absolute +' + diffClockTime.toFixed(2) + 'ms)' + delayed +
            italicEnd;
      }

      if (diffLast > diffTimeStamp + intervalTime * 2 || diffLast < diffTimeStamp - intervalTime * 2) {
        colorTag = '<span style="color:red">';
      }
      // div.innerHTML += colorTag + ' expected: '+diffTimeStamp+'ms, real= '+diffLast.toFixed(2)+
      //     'ms, delta= '+(diffTimeStamp-diffLast).toFixed(2)+' (+/- '+(intervalTime*2)+'ms)</span>';
    } else {
      htmlContent+= data.data + ' (Absolute +' + diffClockTime.toFixed(2) + 'ms)';
    }
    htmlContent += '<br>';
    div.innerHTML += htmlContent;
    lastData = data;
    lastClockTime = clockTime;
  };
}

startStatic();
startStaticWithTimeout();

const simulButton = document.getElementById("simulation");
const selectLine = document.getElementById("select-line");
const bufferDynamicData = document.getElementById("buffer-dynamic-data");

simulButton.onclick = () => {
  simulButton.disabled = true;
  selectLine.disabled = true;
  startDynamicWithTimeout(() => {
    simulButton.disabled = false;
    selectLine.disabled = false;
  });
};

selectLine.onchange = (event) => {
  let value = selectLine.value;
  if(value !== '-') {
    value = selectorMapping[parseInt(value)];
  }
  const elements = bufferDynamicData.querySelectorAll('.line');
  elements.forEach(element => {
   if (isDefined(element.classList)) {
     element.classList.remove("select-this");
     element.classList.remove("select-none");
     if (element.classList.contains(value)) {
       element.classList.add("select-this");
     } else if(value !== '-'){
       element.classList.add("select-none");
     }
   }
  });
};





