!function(e){var t={};function i(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(s,r,function(t){return e[t]}.bind(null,r));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=8)}([function(e,t,i){"use strict";var s,r=function(){return void 0===s&&(s=Boolean(window&&document&&document.all&&!window.atob)),s},n=function(){var e={};return function(t){if(void 0===e[t]){var i=document.querySelector(t);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(e){i=null}e[t]=i}return e[t]}}(),a=[];function o(e){for(var t=-1,i=0;i<a.length;i++)if(a[i].identifier===e){t=i;break}return t}function c(e,t){for(var i={},s=[],r=0;r<e.length;r++){var n=e[r],c=t.base?n[0]+t.base:n[0],d=i[c]||0,h="".concat(c," ").concat(d);i[c]=d+1;var u=o(h),l={css:n[1],media:n[2],sourceMap:n[3]};-1!==u?(a[u].references++,a[u].updater(l)):a.push({identifier:h,updater:v(l,t),references:1}),s.push(h)}return s}function d(e){var t=document.createElement("style"),s=e.attributes||{};if(void 0===s.nonce){var r=i.nc;r&&(s.nonce=r)}if(Object.keys(s).forEach((function(e){t.setAttribute(e,s[e])})),"function"==typeof e.insert)e.insert(t);else{var a=n(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var h,u=(h=[],function(e,t){return h[e]=t,h.filter(Boolean).join("\n")});function l(e,t,i,s){var r=i?"":s.media?"@media ".concat(s.media," {").concat(s.css,"}"):s.css;if(e.styleSheet)e.styleSheet.cssText=u(t,r);else{var n=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(n,a[t]):e.appendChild(n)}}function p(e,t,i){var s=i.css,r=i.media,n=i.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),n&&btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(n))))," */")),e.styleSheet)e.styleSheet.cssText=s;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(s))}}var m=null,f=0;function v(e,t){var i,s,r;if(t.singleton){var n=f++;i=m||(m=d(t)),s=l.bind(null,i,n,!1),r=l.bind(null,i,n,!0)}else i=d(t),s=p.bind(null,i,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(i)};return s(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;s(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=r());var i=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var s=0;s<i.length;s++){var r=o(i[s]);a[r].references--}for(var n=c(e,t),d=0;d<i.length;d++){var h=o(i[d]);0===a[h].references&&(a[h].updater(),a.splice(h,1))}i=n}}}},function(e,t,i){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var i=function(e,t){var i=e[1]||"",s=e[3];if(!s)return i;if(t&&"function"==typeof btoa){var r=(a=s,o=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),"/*# ".concat(c," */")),n=s.sources.map((function(e){return"/*# sourceURL=".concat(s.sourceRoot||"").concat(e," */")}));return[i].concat(n).concat([r]).join("\n")}var a,o,c;return[i].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(i,"}"):i})).join("")},t.i=function(e,i,s){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(s)for(var n=0;n<this.length;n++){var a=this[n][0];null!=a&&(r[a]=!0)}for(var o=0;o<e.length;o++){var c=[].concat(e[o]);s&&r[c[0]]||(i&&(c[2]?c[2]="".concat(i," and ").concat(c[2]):c[2]=i),t.push(c))}},t}},function(e,t,i){e.exports=function(){return new Worker(i.p+"WorkerName.ed8223be0891044269bf.js")}},function(e,t,i){e.exports=function(){return new Worker(i.p+"WorkerName.5535c5db6a512f6d95a6.js")}},function(e,t,i){var s=i(0),r=i(5);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var n={insert:"head",singleton:!1},a=(s(r,n),r.locals?r.locals:{});e.exports=a},function(e,t,i){(t=i(1)(!1)).push([e.i,".ffmpeg-info{\n    position:absolute;\n    font-size: 12px;\n    color:#FFFFFF;\n    padding:2px;\n    font-weight: bold;\n    background-color: rgba(0, 0, 0, 0.3);\n    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);\n    z-index: 10;\n}\n",""]),e.exports=t},function(e,t,i){var s=i(0),r=i(7);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var n={insert:"head",singleton:!1},a=(s(r,n),r.locals?r.locals:{});e.exports=a},function(e,t,i){(t=i(1)(!1)).push([e.i,".osh-view {\n    width:100%;\n    height: 100%;\n}\n",""]),e.exports=t},function(e,t,i){"use strict";i.r(t);Math.pow(2,53);function s(e){return null!=e}function r(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}var n=class{constructor(e,t,i){this.id="DataSource-"+r(),this.name=e,this.properties={fetch:1,...t},this.dataSourceWorker=i,this.dataSynchronizer=null,this.currentRunningProperties={},this.initDataSource(t)}initDataSource(e){this.dataSourceWorker.postMessage({message:"init",id:this.id,properties:JSON.stringify(e),topic:"datasource-data-"+this.id})}setDataSynchronizer(e){this.dataSynchronizer=e,this.dataSourceWorker.postMessage({message:"topic",topic:"data-synchronizer-"+this.dataSynchronizer.id})}setTimeRange(e,t,i){this.updateUrl({...this.currentRunningProperties,startTime:e,endTime:t,replaySpeed:i})}getStartTime(){return this.properties.startTime}getEndTime(){return this.properties.endTime}getReplaySpeed(){return s(this.properties.replaySpeed)?this.properties.replaySpeed:1}disconnect(){this.dataSourceWorker.postMessage({message:"disconnect"})}async connect(){return this.dataSourceWorker.postMessage({message:"connect"}),this.isConnected()}async isConnected(){const e=new Promise(e=>{null!==this.dataSourceWorker&&(this.dataSourceWorker.onmessage=t=>{"is-connected"===t.data.message&&e(t.data.data)})});return null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"is-connected"}),e}async getCurrentTime(){if(s(this.dataSynchronizer))return this.dataSynchronizer.getCurrentTime();{const e=new Promise(e=>{null!==this.dataSourceWorker&&(this.dataSourceWorker.onmessage=t=>{"last-timestamp"===t.data.message&&e(t.data.data)})});return null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"last-timestamp"}),e}}getId(){return this.id}getName(){return this.name}updateUrl(e){this.currentRunningProperties={...this.properties,...e},null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"update-url",data:e})}getCurrentRunningProperties(){return this.currentRunningProperties}terminate(){null!==this.dataSourceWorker&&this.dataSourceWorker.terminate()}},a=i(2),o=i.n(a);var c=class extends n{constructor(e,t){super(e,{timeShift:0,reconnectTimeout:5e3,...t},new o.a)}};i(4);const d=new class{constructor(){this.eventMap={}}remove(e,t){e in this.eventMap&&(this.eventMap[e]=this.eventMap[e].filter(e=>e.id!==t))}removeById(e){for(let t in this.eventMap)this.eventMap[t]=this.eventMap[t].filter(t=>t.id!==e)}observe(e,t,i="any"){s(e)&&s(t)&&s(i)&&(e in this.eventMap||(this.eventMap[e]=[]),this.eventMap[e].push({fn:t,id:i}))}fire(e,t){if(s(e)&&e in this.eventMap){let i=this.eventMap[e];for(let e=0;e<i.length;e++)i[e].fn(t)}}};var h=class{static remove(e,t="any"){d.remove("osh:"+e,t)}static removeById(e="any"){d.removeById(e)}static registerView(e){e.registerCallback()}static unregisterView(e){e.unregisterCallback()}static fire(e,t){t.name=e,d.fire("osh:"+e,t)}static observe(e,t,i="any"){d.observe("osh:"+e,t,i)}static observeDiv(e,t,i){document.getElementById(e).addEventListener(t,i)}static get EVENT(){return{SELECT_VIEW:"selectView",SHOW_VIEW:"showView",UAV_TAKEOFF:"uav:takeoff",UAV_GOTO:"uav:goto",UAV_LOOKAT:"uav:lookat",UAV_LAND:"uav:land",UAV_ORBIT:"uav:orbit",LOADING_START:"loading:start",LOADING_STOP:"loading:stop",ADD_VIEW_ITEM:"addViewItem",RESIZE:"resize",PTZ_SEND_REQUEST:"ptzSendRequest"}}};i(6);const u="disconnected",l="data",p="status";var m=class{constructor(e,t,i){this.layers=[],this.viewItems=[],this.names={},this.lastRec={},this.selectedDataSources=[],this.dataSources=[],this.entity=null,this.id="view-"+r(),this.entity=null,this.dataSourceId=-1,s(i)&&s(i.dataSourceId)&&(this.dataSourceId=i.dataSourceId),s(i)&&s(i.entity)&&(this.entity=i.entity),this.css="",this.cssSelected="",s(i)&&s(i.css)&&(this.css=i.css),s(i)&&s(i.cssSelected)&&(this.cssSelected=i.cssSelected),this.init(e,t,i)}init(e,t,i){this.elementDiv=document.createElement("div"),this.elementDiv.setAttribute("id",this.id),this.elementDiv.setAttribute("class",this.css+" osh-view"),this.divId=this.id;let r=document.getElementById(e);if(s(r)&&null!==r?(r.appendChild(this.elementDiv),this.container=r):(document.body.appendChild(this.elementDiv),this.hide(),this.container=document.body),this.beforeAddingItems(i),s(t))for(let e=0;e<t.length;e++)this.addViewItem(t[e]);s(i)&&s(i.show)&&(document.getElementById(this.divId).style.display=i.show?"block":"none"),this.handleEvents();var n=this;this.registerCallback(),new MutationObserver(e=>{e.forEach((function(e){"style"===e.attributeName&&n.onResize()}))}).observe(this.elementDiv,{attributes:!0});new MutationObserver((function(e){s(document.getElementById(n.divId))||(this.disconnect(),n.destroy())})).observe(document.body,{childList:!0})}registerCallback(){if(s(this.dataSourceId)||s(this.entity)){const t=this;function e(e){new BroadcastChannel("datasource-data-"+e).onmessage=i=>{i.data.message&&"reset"===i.data.message?t.reset():i.data.type===l?t.setData(e,i.data.values):i.data.type===p&&i.data.status===u&&t.reset()}}if(null!==this.entity)for(let t of this.entity.getDataSources())e(t.id);else e(this.dataSourceId)}}unregisterCallback(){h.removeById(this.divId)}hide(){this.elementDiv.style.display="none"}onResize(){}attachTo(e){s(this.elementDiv.parentNode)&&this.elementDiv.parentNode.removeChild(this.elementDiv),document.getElementById(e).appendChild(this.elementDiv),"none"===this.elementDiv.style.display&&(this.elementDiv.style.display="block"),this.onResize()}beforeAddingItems(e){}getId(){return this.id}getDivId(){return this.divId}setData(e,t){}show(e){}destroy(){this.unregisterCallback()}addViewItem(e){if(this.viewItems.push(e),e.hasOwnProperty("layer")){let t=e.layer;this.layers.push(t),e.hasOwnProperty("name")&&(this.names[t.markerId]=e.name),t.viewItem=e,t.init(this);let i=t.getDataSourcesIds();for(let e=0;e<i.length;e++){const s=i[e];let r=this;new BroadcastChannel("datasource-data-"+s).onmessage=e=>{e.data.type===p&&e.data.status===u||e.data.type===l&&(t.setData(s,e.data,r),r.lastRec[s]=e.data)}}}}removeViewItem(e){if(this.viewItems.includes(e)){for(let t in e.layer.dataSourceToLayerMap)delete this.lastRec[t];this.viewItems=this.viewItems.filter(t=>t!==e)}this.layers=this.layers.filter(t=>t.id!==e.layer.id),delete this.names[e.layer.markerId]}removeViewItems(){for(const e of this.viewItems)this.removeViewItem(e)}handleEvents(){var e=this;h.observe(h.EVENT.SELECT_VIEW,t=>e.selectDataView(t.dataSourcesIds,t.entityId),this.divId),h.observe(h.EVENT.SHOW_VIEW,t=>e.show(t),this.divId),h.observe(h.EVENT.ADD_VIEW_ITEM,t=>{s(t.viewId)&&t.viewId===e.id&&e.addViewItem(t.viewItem)},this.divId),h.observe(h.EVENT.RESIZE+"-"+this.divId,t=>e.onResize(),this.divId)}selectDataView(e,t){if(s(this.dataSources)){this.selectedDataSources=e,this.selectedEntity=t;for(let e=0;e<this.dataSources.length;e++)this.setData(this.dataSources[e],this.lastRec[this.dataSources[e]])}}getDataSourcesId(){let e=[];-1!==this.dataSourceId&&e.push(this.dataSourceId);for(let t=0;t<this.viewItems.length;t++){let i=this.viewItems[t];if(i.hasOwnProperty("layer")){let t=i.layer;e=e.concat(t.getDataSourcesIds())}}return e}reset(){}};var f=class extends m{constructor(e,t){super(e,[],t),this.fps=0,this.width="1920",this.height="1080",this.showTime=!1,this.showStats=!1,this.statistics={averageFps:0,frames:0,firstTime:0,bitRate:0,averageBitRate:0},this.framerate=29.67,s(t)&&(s(t.framerate)&&(this.framerate=t.framerate),s(t.directPlay)&&(this.directPlay=t.directPlay),s(t.codec)&&(this.codec=t.codec),s(t.showTime)&&(this.showTime=t.showTime),s(t.showStats)&&(this.showStats=t.showStats));let i,r,n=document.getElementById(this.divId);(this.showTime||this.showStats)&&(this.textDiv=document.createElement("div"),this.textDiv.setAttribute("width",this.width),this.textDiv.setAttribute("height",15),this.textDiv.setAttribute("class","ffmpeg-info"),this.showTime&&(this.textFpsDiv=document.createElement("div"),this.textFpsDiv.setAttribute("class","ffmpeg-fps"),this.textDiv.appendChild(this.textFpsDiv)),this.showStats&&(this.textStatsDiv=document.createElement("div"),this.textStatsDiv.setAttribute("class","ffmpeg-stats"),this.textDiv.appendChild(this.textStatsDiv)),n.appendChild(this.textDiv)),this.domNode=n,s(document.hidden)?(i="hidden",r="visibilitychange"):s(document.msHidden)?(i="msHidden",r="msvisibilitychange"):s(document.webkitHidden)&&(i="webkitHidden",r="webkitvisibilitychange");const a=this;document.addEventListener(r,(function(){document.hidden?a.skipFrame=!0:a.skipFrame=!1}),!1)}updateStatistics(e){if(this.statistics.frames++,this.statistics.pktSize+=e,0===this.statistics.firstTime)return void(this.statistics.firstTime=performance.now());const t=performance.now();t-this.statistics.firstTime<1e3||(this.statistics.averageFps=(this.statistics.frames-1)/((t-this.statistics.firstTime)/1e3),this.statistics.averageBitRate=(this.statistics.pktSize-e)/((t-this.statistics.firstTime)/1e3),this.statistics.frames=1,this.statistics.pktSize=e,this.statistics.firstTime=t)}onUpdated(e){}destroy(){}onAfterDecoded(){}},v=i(3),g=i.n(v);var y=class extends f{constructor(e,t){super(e,t),this.codec="h264",this.canvasElt=this.createCanvas(this.width,this.height,"transform: scaleY(-1)"),this.domNode.appendChild(this.canvasElt),this.videoDecoder=this.createWebDecoder(),this.initDecodeWorker()}createWebDecoder(){this.codecConfigured=!1;const e=this.canvasElt.getContext("bitmaprenderer");return new VideoDecoder({output:function(t){t.createImageBitmap({imageOrientation:"flipY"}).then(t=>{e.transferFromImageBitmap(t)})},error:function(e){console.error(e)}})}createCanvas(e,t,i){const r=document.createElement("canvas");return r.setAttribute("width",e),r.setAttribute("height",t),s(i)&&r.setAttribute("style",i),r}setData(e,t){for(let e=0;e<t.length;e++)if(!this.skipFrame){const e=t.shift();let i=e.data.frameData,s=e.data.roll,r=i.length;this.decode(r,i,e.timeStamp,s)}}initDecodeWorker(){this.decodeWorker=new g.a,this.decodeWorker.id=r();const e=this;this.decodeWorker.onmessage=function(t){let i=t.data,s=i.videoData,r=i.timeStamp,n=i.pktSize;const a=new EncodedVideoChunk({type:i.key?"key":"delta",timeStamp:r,data:s});try{e.videoDecoder.decode(a)}catch(e){console.error(e)}e.updateStatistics(n),e.showTime&&(e.textFpsDiv.innerText=new Date(r).toISOString()+" "),e.showStats&&(e.textStatsDiv.innerText=e.statistics.averageFps.toFixed(2)+" fps, "+(e.statistics.averageBitRate/1e3).toFixed(2)+" kB/s @"+e.width+"x"+e.height+"\n "+e.codec),e.onUpdated(e.statistics)}}reset(){}ev(e,t){let i=0;for(;0===this.getBit(t);)i++;let s=1;for(let e=0;e<i;e++){s=2*s+this.getBit(t)}return s--,e&&(s=(s+1)/2*(s%2==0?-1:1)),s}uev(e){return this.ev(!1,e)}sev(e){return this.ev(!0,e)}getU(e,t){let i=0;for(let s=0;s<e;s++)i=2*i+this.getBit(t);return i}getBit(e){let t=1<<7-(7&this.pos),i=this.pos>>3;return this.pos++,0==(e[i]&t)?0:1}decode(e,t,i,s){if(e>0){this.pos=32;let r=t.buffer;if(this.codecConfigured)this.decodeWorker.postMessage({pktSize:e,pktData:t,roll:s,timeStamp:i,dataSourceId:this.dataSourceId},[r]),t=null;else if(103===t[4]){const e=t,i=(this.getU(1,e),this.getU(2,e),this.getU(5,e),this.getU(8,e),this.getU(1,e),this.getU(1,e),this.getU(1,e),this.getU(1,e),this.getU(4,e),this.getU(8,e),this.uev(e),this.uev(e),this.uev(e));if(0===i)this.uev(e);else if(1===i){this.getU(1,e),this.sev(e),this.sev(e);const t=this.uev(e);for(let i=0;i<t;i++)this.sev(e)}this.uev(e),this.getU(1,e);const s=16*(this.uev(e)+1),r=16*(this.uev(e)+1);this.getU(1,e),this.getU(1,e),this.getU(1,e),this.getU(1,e),this.getU(1,e);this.videoDecoder.configure({codec:"avc1.42e01e",description:new Uint8Array([1,66,192,30,255,225,0,9,103,66,64,31,166,128,80,5,185,1,0,5,104,206,48,166,128]),codedWidth:parseInt(s),codedHeight:parseInt(r)}),this.codecConfigured=!0,this.width=s,this.height=r}}}destroy(){super.destroy()}};let S=new c("drone-Video",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:video2",observedProperty:"http://sensorml.com/ont/swe/property/VideoFrame",startTime:"2015-12-19T21:04:30Z",endTime:"2015-12-19T21:09:19Z",replaySpeed:1});new y("video-h264-container",{dataSourceId:S.id,css:"video-h264",name:"UAV Video",showTime:!0,showStats:!0});S.connect()}]);