const locationDivElement        = document.getElementById('datasource-gps');
const orientationDivElement     = document.getElementById('datasource-orientation');
const videoDivElement           = document.getElementById('datasource-video');
const errorDivElement           = document.getElementById('error');

const lastLocationDivElement    = document.getElementById('last-gps');
const lastOrientationDivElement = document.getElementById('last-orient');
const lastVideoDivElement       = document.getElementById('last-video');
const currentTimeDivElement       = document.getElementById('current-time');

let locationCount = 0;
let orientCount = 0;
let videoCount = 0;

let lastTimestamp = 0;

export function displayLocation(values) {
    if(++locationCount%100 === 0) {
        locationDivElement.value = JSON.stringify(values) +'\n';
    } else {
        locationDivElement.value += JSON.stringify(values) +'\n';
    }

    lastLocationDivElement.innerText = new Date(values[values.length-1].timeStamp).toISOString()+ ' - Location';
    currentTimeDivElement.innerText = new Date(values[values.length-1].timeStamp).toISOString()+ ' - Current';
}

export  function displayOrientation(values) {
    if(++orientCount%100 === 0) {
        orientationDivElement.value = JSON.stringify(values) + '\n';
    } else {
        orientationDivElement.value += JSON.stringify(values) + '\n';
    }
    lastOrientationDivElement.innerText = new Date(values[values.length-1].timeStamp).toISOString()+ ' - Orientation';
    currentTimeDivElement.innerText = new Date(values[values.length-1].timeStamp).toISOString()+ ' - Current';
}

export function displayVideo(values) {
    let dataEvent;
    for(let i=0;i < values.length;i++) {
        dataEvent =  values[i];
        dataEvent.data.frameData = values[i].data.frameData.slice(0,10);
        if(++videoCount%1000 === 0) {
            videoDivElement.value = JSON.stringify([dataEvent]) + '\n';
        } else {
            videoDivElement.value += JSON.stringify([dataEvent]) + '\n';
        }
    }
    lastVideoDivElement.innerText = new Date(values[values.length-1].timeStamp).toISOString()+ ' - Video';
    currentTimeDivElement.innerText = new Date(values[values.length-1].timeStamp).toISOString()+ ' - Current';
}

export function displayError(timestamp) {
    if(timestamp < lastTimestamp) {
        errorDivElement.value += new Date(timestamp).toISOString() + ' < ' + new Date(lastTimestamp).toISOString()+ '\n';
    }
    lastTimestamp = timestamp;
}
