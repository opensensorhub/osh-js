import {EventType} from "../../../source/core/event/EventType";

const locationDivElement        = document.getElementById('datasource-gps');
const orientationDivElement     = document.getElementById('datasource-orientation');
const videoDivElement           = document.getElementById('datasource-video');
const errorDivElement           = document.getElementById('error');

const lastLocationDivElement    = document.getElementById('last-gps');
const lastOrientationDivElement = document.getElementById('last-orient');
const lastVideoDivElement       = document.getElementById('last-video');
const currentTimeDivElement       = document.getElementById('last-time');
const masterTimeDivElement       = document.getElementById('master-time');

let error = 0;
export function displayMasterTime(timestamp) {
    masterTimeDivElement.innerText = new Date(timestamp).toISOString()+ ' - MasterTime';
}

export function displayLastTime(timestamp) {
    currentTimeDivElement.innerText = new Date(timestamp).toISOString()+ ' - LastTime';
}

export function displayLocation(values) {
    locationDivElement.value = JSON.stringify(values);
    lastLocationDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Location';
}

export  function displayOrientation(values) {
    orientationDivElement.value = JSON.stringify(values) + '\n';
    lastOrientationDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Orientation';
}

export function displayVideo(values) {
    let dataEvent;
    for(let i=0;i < values.length;i++) {
        dataEvent =  values[i];
        dataEvent.data.videoFrame.data = values[i].data.videoFrame.data.slice(0,10);
        videoDivElement.value = JSON.stringify([dataEvent]) + '\n';
    }
    lastVideoDivElement.innerText = new Date(values[values.length-1].data.timestamp).toISOString()+ ' - Video';
}

let lastMasterTime, lastDataTime;
export function displayError(message) {
    if(message.type === EventType.MASTER_TIME){
        lastMasterTime = message.timestamp;
    } else if(message.type === EventType.LAST_TIME) {
        lastDataTime = message.timestamp;
        if (lastDataTime < lastMasterTime) {
            errorDivElement.value = new Date(lastMasterTime).toISOString() + ' < ' + new Date(lastMasterTime).toISOString() + '\n';
        }
    } else {
        return;
    }
}
