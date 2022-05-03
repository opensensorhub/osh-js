const video0DivElement           = document.getElementById('datasource-video0');
const video1DivElement           = document.getElementById('datasource-video1');
const video2DivElement           = document.getElementById('datasource-video2');
const errorDivElement           = document.getElementById('error');

const lastVideo0DivElement       = document.getElementById('last-video0');
const lastVideo1DivElement       = document.getElementById('last-video1');
const lastVideo2DivElement       = document.getElementById('last-video2');
const currentTimeDivElement       = document.getElementById('current-time');

let video0Count = 0;
let video1Count = 0;
let video2Count = 0;

let lastTimestamp = 0;

const MAX_TEXTAERA_NUMBER = 10;

export function displayVideo0(values) {
    let dataEvent;
    for(let i=0;i < values.length;i++) {
        dataEvent =  values[i];
        dataEvent.data.videoFrame.data = values[i].data.videoFrame.data.slice(0,5);
        if(++video0Count%MAX_TEXTAERA_NUMBER === 0) {
            video0DivElement.value = JSON.stringify([dataEvent]) + '\n';
        } else {
            video0DivElement.value += JSON.stringify([dataEvent]) + '\n';
        }
    }
    lastVideo0DivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Video 0';
    currentTimeDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Current';

    video0DivElement.scrollTop = video0DivElement.scrollHeight;
}

export function displayVideo1(values) {
    let dataEvent;
    for(let i=0;i < values.length;i++) {
        dataEvent =  values[i];
        dataEvent.data.videoFrame.data = values[i].data.videoFrame.data.slice(0,5);
        if(++video1Count%MAX_TEXTAERA_NUMBER === 0) {
            video1DivElement.value = JSON.stringify([dataEvent]) + '\n';
        } else {
            video1DivElement.value += JSON.stringify([dataEvent]) + '\n';
        }
    }
    lastVideo1DivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Video 1';
    currentTimeDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Current';

    video1DivElement.scrollTop = video1DivElement.scrollHeight;
}

export function displayVideo2(values) {
    let dataEvent;
    for(let i=0;i < values.length;i++) {
        dataEvent =  values[i];
        dataEvent.data.videoFrame.data = values[i].data.videoFrame.data.slice(0,5);
        if(++video2Count%MAX_TEXTAERA_NUMBER === 0) {
            video2DivElement.value = JSON.stringify([dataEvent]) + '\n';
        } else {
            video2DivElement.value += JSON.stringify([dataEvent]) + '\n';
        }
    }
    lastVideo2DivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Video 2';
    currentTimeDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Current';

    video2DivElement.scrollTop = video2DivElement.scrollHeight;
}

export function displayError(timestamp) {
    if(timestamp < lastTimestamp) {
        errorDivElement.value += new Date(timestamp).toISOString() + ' < ' + new Date(lastTimestamp).toISOString()+ '\n';
    }
    lastTimestamp = timestamp;
}
