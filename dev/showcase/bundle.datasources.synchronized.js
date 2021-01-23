!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t,r){e.exports=function(){return new Worker(r.p+"WorkerName.ab3eead5f74043605514.js")}},function(e,t,r){e.exports=function(){return new Worker(r.p+"WorkerName.a92bb3ad303673fad27a.js")}},function(e,t,r){e.exports=function(){return new Worker(r.p+"WorkerName.65a47c281cf2d3161ebe.js")}},function(e,t,r){"use strict";r.r(t);const n=document.getElementById("datasource-gps"),a=document.getElementById("datasource-orientation"),s=document.getElementById("datasource-video"),o=document.getElementById("last-gps"),i=document.getElementById("last-orient"),c=document.getElementById("last-video");let d=0,u=0,p=0;Math.pow(2,53);function h(e){return null!=e}function l(){return"xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}const m="disconnected";var S=class{constructor(e,t,r){this.id="DataSource-"+l(),this.name=e,this.properties={fetch:1,...t},this.dataSourceWorker=r,this.currentRunningProperties={},this.initDataSource(t)}initDataSource(e){this.dataSourceWorker.postMessage({message:"init",id:this.id,properties:JSON.stringify(e),topic:"datasource-data-"+this.id})}disconnect(){this.dataSourceWorker.postMessage({message:"disconnect"})}onDisconnect(){return new Promise(e=>{new BroadcastChannel("datasource-data-"+this.id).onmessage=t=>{t.data.status===m&&e()}})}async connect(){return this.dataSourceWorker.postMessage({message:"connect"}),this.isConnected()}async isConnected(){const e=new Promise(e=>{null!==this.dataSourceWorker&&(this.dataSourceWorker.onmessage=t=>{"is-connected"===t.data.message&&e(t.data.data)})});return null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"is-connected"}),e}getId(){return this.id}getName(){return this.name}updateProperties(e){this.currentRunningProperties={...this.properties,...e},null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"update-url",data:e})}getCurrentRunningProperties(){return this.currentRunningProperties}terminate(){null!==this.dataSourceWorker&&this.dataSourceWorker.terminate()}};var g=class extends S{constructor(e,t,r){super(e,t,r),this.dataSynchronizer=null}setDataSynchronizer(e){this.dataSynchronizer=e,this.dataSourceWorker.postMessage({message:"topic",topic:"data-synchronizer-"+this.dataSynchronizer.id})}setTimeRange(e,t,r){this.updateProperties({...this.currentRunningProperties,startTime:e,endTime:t,replaySpeed:r})}getStartTime(){return this.properties.startTime}getEndTime(){return this.properties.endTime}getReplaySpeed(){return h(this.properties.replaySpeed)?this.properties.replaySpeed:1}async getCurrentTime(){if(h(this.dataSynchronizer))return this.dataSynchronizer.getCurrentTime();{const e=new Promise(e=>{null!==this.dataSourceWorker&&(this.dataSourceWorker.onmessage=t=>{"last-timestamp"===t.data.message&&e(t.data.data)})});return null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"last-timestamp"}),e}}updateProperties(e){super.updateProperties(e)}},y=r(0),f=r.n(y);var x=class extends g{constructor(e,t){super(e,{timeShift:0,reconnectTimeout:5e3,...t},new f.a)}},k=r(1),v=r.n(k);var W=class extends g{constructor(e,t){super(e,{timeShift:0,reconnectTimeout:5e3,...t},new v.a)}},w=r(2),T=r.n(w);var b=class{constructor(e){if(!h(e.dataSources))throw"You must specify a dataSource array";this.bufferingTime=1e3,this.currentTime=Date.now(),this.id=l(),this.dataSources=[],this.replaySpeed=1,this.intervalRate=5,h(e.replaySpeed)&&(this.replaySpeed=e.replaySpeed),h(e.intervalRate)&&(this.intervalRate=e.intervalRate),this.initWorker(e.dataSources,this.intervalRate)}initWorker(e,t){const r=[];for(let t of e){const e=this.createDataSourceForWorker(t);r.push(e),this.dataSources.push(t)}this.synchronizerWorker=new T.a,this.synchronizerWorker.postMessage({message:"init",dataSources:r,replaySpeed:this.replaySpeed,intervalRate:t,dataSynchronizerId:this.id,topic:"data-synchronizer-"+this.id})}createDataSourceForWorker(e){const t={bufferingTime:e.bufferingTime||0,timeOut:e.timeOut||0,id:e.id};try{e.setDataSynchronizer(this),e.properties.replaySpeed=this.replaySpeed}catch(e){console.error("Cannot set the synchronizer to this DataSource",e)}return t}addDataSource(e){const t=this.createDataSourceForWorker(e);this.dataSources.push(e),this.synchronizerWorker.postMessage({message:"add",dataSources:[t]})}push(e,t){null!==this.synchronizerWorker&&this.synchronizerWorker.postMessage({type:"data",dataSourceId:e,data:t})}connect(){for(let e of this.dataSources)e.connect()}disconnect(){this.reset();for(let e of this.dataSources)e.disconnect()}getStartTime(){if(0===this.dataSources.length)throw"dataSource array is empty";return this.dataSources[0].properties.startTime}getEndTime(){if(0===this.dataSources.length)throw"dataSource array is empty";return this.dataSources[0].properties.endTime}getReplaySpeed(){return this.replaySpeed}setTimeRange(e,t,r){for(let n of this.dataSources)n.setTimeRange(e,t,r)}reset(){null!==this.synchronizerWorker&&this.synchronizerWorker.postMessage({message:"reset"})}terminate(){null!==this.synchronizerWorker&&(this.synchronizerWorker.terminate(),this.synchronizerWorker=null);for(let e of this.dataSources)e.terminate()}async getCurrentTime(){const e=new Promise(e=>{null!==this.synchronizerWorker&&(this.synchronizerWorker.onmessage=t=>{"current-time"===t.data.message&&e(t.data.data)})});return null!==this.synchronizerWorker&&this.synchronizerWorker.postMessage({message:"current-time"}),e}};const O="2015-12-19T21:04:29.231Z",z="2015-12-19T21:09:19.675Z",P=new W("drone-Video",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:video2",observedProperty:"http://sensorml.com/ont/swe/property/VideoFrame",startTime:O,endTime:z,replaySpeed:1}),D=new x("android-GPS",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:nav2",observedProperty:"http://www.opengis.net/def/property/OGC/0/PlatformLocation",startTime:O,endTime:z,replaySpeed:1}),M=new x("android-Heading",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:nav2",observedProperty:"http://www.opengis.net/def/property/OGC/0/PlatformOrientation",startTime:O,endTime:z,replaySpeed:1}),R=new b({replaySpeed:1,intervalRate:5,dataSources:[P,D,M]});R.connect();const I=new BroadcastChannel("datasource-data-"+P.id),C=new BroadcastChannel("datasource-data-"+D.id),N=new BroadcastChannel("datasource-data-"+M.id);C.onmessage=e=>{var t;"data"===e.data.type&&(t=e.data.values,++d%100==0?n.value=JSON.stringify(t)+"\n":n.value+=JSON.stringify(t)+"\n",o.innerText=new Date(t[t.length-1].timeStamp).toISOString()+" - Location")},N.onmessage=e=>{var t;"data"===e.data.type&&(t=e.data.values,++u%100==0?a.value=JSON.stringify(t)+"\n":a.value+=JSON.stringify(t)+"\n",i.innerText=new Date(t[t.length-1].timeStamp).toISOString()+" - Orientation")},I.onmessage=e=>{"data"===e.data.type&&function(e){let t;for(let r=0;r<e.length;r++)t=e[r],t.data.frameData=e[r].data.frameData.slice(0,10),++p%1e3==0?s.value=JSON.stringify([t])+"\n":s.value+=JSON.stringify([t])+"\n";c.innerText=new Date(e[e.length-1].timeStamp).toISOString()+" - Video"}(e.data.values)},R.connect()}]);