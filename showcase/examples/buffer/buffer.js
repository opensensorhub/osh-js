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
  let lastWait = -1;
  buffer.onWait = (dataSourceId, time ,total) => {
    if(lastWait === -1) {
      div.innerHTML += '<span style="color:darkgreen" >Wait '+total.toFixed(1)+' for dataSource '+dataSourceId+'...</span><br>';
      lastWait = 0;
    } else {
      const moduloTime = time - lastWait;
      console.log(total, time);
      if(moduloTime > 500) {
        div.innerHTML += '<span style="color:darkgreen" >Wait '+(total - time).toFixed(1)+' for dataSource '+dataSourceId+'...</span><br>';
        lastWait = time;
      }
    }
    //
  };
  const refClockTime = performance.now();
  let lastData = null;
  let lastClockTime;
  const intervalTime = 5;
  buffer.onData = function (databaseId, data) {
    const clockTime = performance.now();
    let diffClockTime = clockTime - refClockTime;
    let htmlContent = '';
    if (lastData !== null) {

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

      const diffTime = (data.timeStamp - lastData.timeStamp);

      //expected time
      htmlContent += '&nbsp;&nbsp;&#916;&nbsp;' +((diffTime > 0)? '+':'') + diffTime+'ms';

      // real spent time
      const d0 = (lastData.clockTime - refClockTime);
      const d1 = (data.clockTime - refClockTime);
      let delta = (d1-d0);

      htmlContent += '&nbsp;&nbsp;&#916;&nbsp;'+((delta > 0)? '+':'') + delta.toFixed(1)+'ms';

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





