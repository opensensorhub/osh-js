!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){e.exports=function(){return new Worker(r.p+"WorkerName.a114cabac1df52ebc43f.js")}},function(e,t,r){"use strict";r.r(t);Math.pow(2,53);function n(e){return null!=e}function i(e,t="letiable"){if(!n(e))throw t+" must be defined";return e}function s(){return"xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}const a="disconnected";var o=class{constructor(e,t,r){this.id="DataSource-"+s(),this.name=e,this.properties=t,this.dataSourceWorker=r,this.currentRunningProperties={},this.initDataSource(t)}initDataSource(e){this.dataSourceWorker.postMessage({message:"init",id:this.id,properties:JSON.stringify(e),topic:this.getTopicId()})}disconnect(){this.dataSourceWorker.postMessage({message:"disconnect"})}onDisconnect(){return new Promise(e=>{new BroadcastChannel(this.getTopicId()).onmessage=t=>{t.data.status===a&&e()}})}async connect(){return this.dataSourceWorker.postMessage({message:"connect"}),this.isConnected()}async isConnected(){const e=new Promise(e=>{null!==this.dataSourceWorker&&(this.dataSourceWorker.onmessage=t=>{"is-connected"===t.data.message&&e(t.data.data)})});return null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"is-connected"}),e}getId(){return this.id}getName(){return this.name}updateProperties(e){this.currentRunningProperties={...this.properties,...e},null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"update-url",data:e})}getCurrentRunningProperties(){return this.currentRunningProperties}terminate(){null!==this.dataSourceWorker&&this.dataSourceWorker.terminate()}getTopicId(){return"datasource-data-"+this.id}};var u=class extends o{constructor(e,t,r){super(e,t,r),i(t,"Some properties must be defined"),i(t.startTime,"startTime must must be defined"),i(t.endTime,"startTime must must be defined"),this.timeSync=null}setDataSynchronizer(e){this.timeSync=e,this.dataSourceWorker.postMessage({message:"topic",topic:"data-synchronizer-"+this.timeSync.id,timeTopic:this.getTimeTopicId()})}initDataSource(e){super.initDataSource(e),this.dataSourceWorker.postMessage({message:"topic",topic:this.getTopicId(),timeTopic:this.getTimeTopicId()})}setTimeRange(e,t,r,i=!1){let s={};n(r)&&(s={replaySpeed:r}),this.updateProperties({...this.currentRunningProperties,startTime:e,endTime:t,...s,reconnect:i})}getStartTime(){return this.properties.startTime}getEndTime(){return this.properties.endTime}getMinTime(){return this.properties.minTime}getMaxTime(){return this.properties.maxTime}getReplaySpeed(){return n(this.currentRunningProperties)&&n(this.currentRunningProperties.replaySpeed)?this.currentRunningProperties.replaySpeed:n(this.properties.replaySpeed)?this.properties.replaySpeed:1}async getCurrentTime(){if(n(this.timeSync))return this.timeSync.getCurrentTime();{const e=new Promise(e=>{null!==this.dataSourceWorker&&(this.dataSourceWorker.onmessage=t=>{"last-timestamp"===t.data.message&&e(t.data.data)})});return null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"last-timestamp"}),e}}updateProperties(e){super.updateProperties(e)}getTimeTopicId(){return"datasource-time-"+this.id}},c=r(0),d=r.n(c);let p=new class extends u{constructor(e,t){super(e,{timeShift:0,reconnectTimeout:5e3,...t},new d.a)}}("alex-audio",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:android:device:dd90fceba7fd5b47-sos",observedProperty:"http://sensorml.com/ont/swe/property/AudioFrame",startTime:"2021-04-12T10:48:45Z",endTime:"2021-04-12T10:49:45Z",replaySpeed:1,bufferingTime:1e3});const m=new BroadcastChannel("datasource-data-"+p.id),l=document.getElementById("datasource-audio");m.onmessage=e=>{if("data"===e.data.type){let t;for(let r=0;r<e.data.values.length;r++)t=e.data.values[r],t.data.frameData=e.data.values[r].data.frameData.slice(0,10),l.value+=JSON.stringify([t])+"\n"}};document.getElementById("run-datasource-button").onclick=()=>p.connect()}]);