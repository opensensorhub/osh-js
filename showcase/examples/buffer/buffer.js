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

let scrolled = false;
const scrollControl = document.getElementById("scroll");

function updateScroll(divElement){
  if(scrollControl.checked){
    divElement.scrollTop = divElement.scrollHeight;
  }
}

export function startDataSet(buffer, div, waitDisplayFactor, divError=null, expectedResults = []) {
  let lastWait = -1;
  let lastDsWait;
  let count = 0;

  buffer.onWait = (dataSourceId, time ,total) => {
    if(lastDsWait !== dataSourceId) {
      lastWait = -1;
      count = 0;
    }
    const line = document.createElement("div");
    line.setAttribute('class', 'wait');

    lastDsWait = dataSourceId;
    if(lastWait === -1) {
      line.innerHTML = 'Wait '+total.toFixed(1)+' for dataSource '+dataSourceId+'...';
      lastWait = 0;
    } else {
      if(parseInt((time/(waitDisplayFactor))) === count) {
        line.innerHTML = 'Wait '+(total - time).toFixed(1)+' for dataSource '+dataSourceId+'...';
        lastWait = time;
        count++;
      }
    }
    div.appendChild(line);
    updateScroll(div);
    //
  };

  let lastDataMap = {};
  let lastDiffClockTime=0;
  const refClockTime = performance.now();
  let lineCount = 0;
  buffer.onData = function (dataSourceId, data) {
    if(lineCount++ >= 500) {
      div.innerHTML = '';
      lineCount = 0;
    }
    if(lastDsWait === dataSourceId) {
      lastWait = -1;
      count = 0;
    }
    const clockTime = performance.now();
    let diffClockTime = clockTime - refClockTime;

    const line = document.createElement("div");
    const absoluteTime = ' (Absolute +' + clockTime.toFixed(2) + 'ms)';

    const lastDataByDs = lastDataMap[dataSourceId];
    if (isDefined(lastDataByDs)) {
      let delayed = data.delayed? ' (delayed) ' : '';

      let htmlContent = '';

      // diff between real time spent and the last data
      // d0
      const dct = (diffClockTime - lastDiffClockTime);
      // expected time based on data timeStamp
      // d1
      const diffDataTimeStamp = (data.timeStamp - lastDataByDs.timeStamp);
      // real spent time
      const deltaClockTime = clockTime - lastDataByDs.refClockTime;

      let error = false;
      // check lastData for a DS
      for(let d in lastDataMap) {
        if(lastDataMap[d].timeStamp > data.timeStamp) {
          error = true;
          break;
        }
      }
      // let error = (lastDataByDs.timeStamp > data.timeStamp);

      let d0Details = '';
      let d1Details = '';
      let d2Details = '';

      if (expectedResults.length > 0) {
        const nextExpectedResult = expectedResults.shift();
        // d0
        error |=  Math.abs(Math.abs(dct) - nextExpectedResult.d0) > 15.0;
        // d1
        error |=  Math.abs(Math.abs(diffDataTimeStamp) - nextExpectedResult.d1)  > 15.0;
        // d2
        error |=  Math.abs(Math.abs(deltaClockTime) - nextExpectedResult.d2)  > 15.0;

        d0Details = ' (+'+ Math.abs(Math.abs(dct) - nextExpectedResult.d0).toFixed(1)+')';
        d1Details = ' (+'+ Math.abs(Math.abs(diffDataTimeStamp) - nextExpectedResult.d1).toFixed(1)+')';
        d2Details = ' (+'+Math.abs(Math.abs(deltaClockTime) - nextExpectedResult.d2).toFixed(1)+')';
      }

      if (error) {
        let classes = 'error line '+selectorMapping[dataSourceId];
        if(data.delayed) {
          classes += ' delayed';
        }
        line.setAttribute('class', classes);
        htmlContent +=  data.data +
            absoluteTime +
            delayed;

        if(divError !== null) {
          const lineError = document.createElement("div");
          lineError.setAttribute('class', classes);
          lineError.innerHTML =  data.data +
              absoluteTime +
              delayed;
          divError.appendChild(lineError);
        }
      } else {
        let classes = 'noerror line '+selectorMapping[dataSourceId];
        if(data.delayed) {
          classes += ' delayed';
        }
        line.setAttribute('class', classes);
        htmlContent +=  data.data + ' (Absolute +' + clockTime.toFixed(2) + 'ms)' + delayed;
      }

      // diff between real time spent and the last data
      // d0
      htmlContent += '&nbsp;&nbsp;&#916;&nbsp;' +
          ((dct > 0)? '+':'') +
          dct.toFixed(1)+'ms' +
          d0Details
      ;

      // expected time based on data timeStamp
      // d1
      htmlContent += '&nbsp;&nbsp;&#916;&nbsp;' +
          ((diffDataTimeStamp > 0)? '+':'') +
          diffDataTimeStamp+'ms'
      ;

      // real spent time
      // d2
      htmlContent += '&nbsp;&nbsp;&#916;&nbsp;' +
          ((deltaClockTime > 0)? '+':'') +
          deltaClockTime.toFixed(1) + 'ms' +
          d2Details
      ;

      line.innerHTML = htmlContent;
    } else {
      line.innerHTML =  data.data + absoluteTime;
    }
    lastDataMap[dataSourceId] = data;
    lastDataMap[dataSourceId].refClockTime = clockTime;

    div.appendChild(line);

    updateScroll(div);
    lastDiffClockTime = diffClockTime;
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





