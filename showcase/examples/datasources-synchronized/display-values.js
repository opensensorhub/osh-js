const locationDivElement        = document.getElementById('datasource-gps');
const orientationDivElement     = document.getElementById('datasource-orientation');
const videoDivElement           = document.getElementById('datasource-video');
const errorDivElement           = document.getElementById('error');

const lastLocationDivElement    = document.getElementById('last-gps');
const lastOrientationDivElement = document.getElementById('last-orient');
const lastVideoDivElement       = document.getElementById('last-video');
const currentTimeDivElement       = document.getElementById('current-time');

let error = 0;

let lastTimestamp = 0;

export function displayLocation(values) {
    locationDivElement.value = JSON.stringify(values);
    lastLocationDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Location';
    currentTimeDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Current';
}

export  function displayOrientation(values) {
    orientationDivElement.value = JSON.stringify(values) + '\n';
    lastOrientationDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Orientation';
    currentTimeDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Current';
}

export function displayVideo(values) {
    let dataEvent;
    for(let i=0;i < values.length;i++) {
        dataEvent =  values[i];
        dataEvent.data.videoFrame.data = values[i].data.videoFrame.data.slice(0,10);
        videoDivElement.value = JSON.stringify([dataEvent]) + '\n';
    }
    lastVideoDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Video';
    currentTimeDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Current';
}

export function displayError(timestamp) {
    if(timestamp < lastTimestamp) {
        errorDivElement.value = new Date(timestamp).toISOString() + ' < ' + new Date(lastTimestamp).toISOString()+ '\n';
    }
    lastTimestamp = timestamp;
}
