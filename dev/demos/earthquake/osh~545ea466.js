(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{10:function(e,t,r){"use strict";r.d(t,"g",(function(){return s})),r.d(t,"e",(function(){return i})),r.d(t,"f",(function(){return o})),r.d(t,"h",(function(){return n})),r.d(t,"b",(function(){return d})),r.d(t,"d",(function(){return c})),r.d(t,"a",(function(){return h})),r.d(t,"c",(function(){return u})),r.d(t,"i",(function(){return p}));Math.pow(2,53);function s(e){return null!=e}function i(e){return s(e)&&null!==e}function o(e){const[t,r,s]=e.match(/\w\w/g).map(e=>parseInt(e,16));return[t,r,s]}function a(e,t){return i(e)&&typeof e===t}function n(e,t){return a(e,"function")}function d(e,t="letiable"){if(!s(e))throw t+" must be defined";return e}function c(e,t="letiable"){if(!s(e)||!e)throw t;return e}function l(e,t,r="letiable"){if(d(e,r),typeof e!==t)throw r+" must be of type "+t;return e}function h(e,t="letiable"){if(d(e,t),!Array.isArray(e))throw t+" must be an array";return e}function u(e,t){return l(e,"function",t)}function p(){return"xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}},149:function(e,t,r){e.exports=function(){return new Worker(r.p+"68f3bcc5ccf8255b22b2.worker.js")}},154:function(e,t,r){"use strict";var s=r(10),i=(r(169),r(94)),o=r(95);const a="data",n="status";var d=class{constructor(e){this.layers=[],this.lastRec={},this.dataSources=[],this.id="view-"+Object(s.i)(),this.css="",Object(s.g)(e)&&Object(s.g)(e.css)&&(this.css=e.css),Object(s.b)(e&&e.supportedLayers,"supportedLayers"),Object(s.a)(e.supportedLayers,"supportedLayers"),Object(s.d)(e.supportedLayers.length>0,"supportedLayers.length === 0"),this.supportedLayers=e.supportedLayers,this.init(e)}init(e){this.elementDiv=document.createElement("div"),this.elementDiv.setAttribute("id",this.id),this.elementDiv.setAttribute("class",this.css+" osh-view"),this.divId=this.id;let t=Object(s.g)(e.container)?e.container:document.body,r=document.getElementById(t);if(Object(s.g)(r)&&null!==r?(r.appendChild(this.elementDiv),this.container=r):(document.body.appendChild(this.elementDiv),this.hide(),this.container=document.body),this.beforeAddingItems(e),Object(s.g)(e)&&Object(s.g)(e.layers))for(let t=0;t<e.layers.length;t++)this.addLayer(e.layers[t]);Object(s.g)(e)&&Object(s.g)(e.visible)&&(document.getElementById(this.divId).style.display=e.visible?"block":"none");const i=this;new MutationObserver(e=>{e.forEach((function(e){"style"===e.attributeName&&i.onResize()}))}).observe(this.elementDiv,{attributes:!0});new MutationObserver((function(e){Object(s.g)(document.getElementById(i.divId))||(this.disconnect(),i.destroy())})).observe(document.body,{childList:!0})}hide(){this.elementDiv.style.display="none"}onResize(){}attachTo(e){Object(s.g)(this.elementDiv.parentNode)&&this.elementDiv.parentNode.removeChild(this.elementDiv),document.getElementById(e).appendChild(this.elementDiv),"none"===this.elementDiv.style.display&&(this.elementDiv.style.display="block"),this.onResize()}beforeAddingItems(e){}getId(){return this.id}getDivId(){return this.divId}setData(e,t){}show(e){}destroy(){}addLayer(e){Object(s.d)(this.supportedLayers.includes(e.type),"this layer is not supported: "+e.type+", should be "+this.supportedLayers),this.layers.push(e);let t=e.getDataSourcesIds();for(let r=0;r<t.length;r++){const s=t[r];let d=this;new BroadcastChannel(i.a+s).onmessage=t=>{t.data.type===n&&t.data.status===o.a.DISCONNECTED||(t.data.message&&"reset"===t.data.message||t.data.type===n&&t.data.status===o.a.DISCONNECTED?d.reset():t.data.type===a&&(e.setData(s,t.data.values),this.setData(s,e.getProps()),d.lastRec[s]=t.data))}}}removeAllFromLayer(e){if(this.layers.includes(e)){for(let t in e.dataSourcesToFn)delete this.lastRec[t];e.reset()}}removeAllFromLayers(){for(let e of this.layers)this.removeAllFromLayer(e)}getDataSourcesId(){let e=[];for(let t=0;t<this.layers.length;t++){let r=this.layers[t];e=e.concat(r.getDataSourcesIds())}return e}reset(){}};var c=class extends d{constructor(e){super(e),this.layerIdToMarkers={},this.layerIdToPolylines={}}setData(e,t){const r=t.values;for(let e=0;e<r.length;e++){const s=r[e];"marker"===t.type?this.updateMarker(s):"polyline"===t.type?this.updatePolyline(s):"draping"===t.type&&this.updateDrapedImage(s)}}addMarkerToLayer(e,t){this.getLayer(e);e.id in this.layerIdToMarkers||(this.layerIdToMarkers[e.id]={}),this.layerIdToMarkers[e.id][e.markerId]=t}addPolylineToLayer(e,t){e.id in this.layerIdToPolylines||(this.layerIdToPolylines[e.id]={}),this.layerIdToPolylines[e.id][e.polylineId]=t}getMarker(e){return e.id in this.layerIdToMarkers?this.layerIdToMarkers[e.id][e.markerId]:null}getMarkers(){const e=[];for(let t in this.layerIdToMarkers)for(let r in this.layerIdToMarkers[t])e.push(this.layerIdToMarkers[t][r]);return e}getPolylines(){const e=[];for(let t in this.layerIdToPolylines)for(let r in this.layerIdToPolylines[t])e.push(this.layerIdToPolylines[t][r]);return e}getPolyline(e){return e.id in this.layerIdToPolylines?this.layerIdToPolylines[e.id][e.polylineId]:null}getLayer(e){for(let t of this.layers)if(t.props.id===e)return t;return null}removeAllFromLayer(e){super.removeAllFromLayer(e),this.removeMarkers(e),this.removePolylines(e)}removeMarkers(e){if(Object(s.g)(e.props.markerId)){const t=this.layerIdToMarkers[e.props.id];if(Object(s.g)(t))for(let e in t){const r=t[e];this.removeMarkerFromLayer(r)}delete this.layerIdToMarkers[e.props.id]}}removePolylines(e){if(Object(s.g)(e.props.polylineId)){const t=this.layerIdToPolylines[e.props.id];if(Object(s.g)(t))for(let e in t){const r=t[e];this.removePolylineFromLayer(r)}delete this.layerIdToPolylines[e.props.id]}}removeMarkerFromLayer(e){}removePolylineFromLayer(e){}onMarkerLeftClick(e,t,r,i){Object(s.g)(r.onLeftClick)&&r.onLeftClick.call(r,e,t,i)}onMarkerRightClick(e,t,r,i){Object(s.g)(r.onRightClick)&&r.onRightClick.call(r,e,t,i)}onMarkerMove(e,t,r,i){Object(s.g)(r.onMove)&&r.onMove.call(r,e,t,i)}onMarkerHover(e,t,r,i){Object(s.g)(r.onHover)&&r.onHover.call(r,e,t,i)}getLayerId(e){const t=e.split("$");return Object(s.g)(t)&&2===t.length?t[0]:null}getMarkerId(e){if(!Object(s.g)(e))return null;const t=e.split("$");return Object(s.g)(t)&&2===t.length?t[1]:null}},l=r(153),h=r(215),u=r(222),p=r(221),y=r(123),g=r(216);r(171);t.a=class extends c{constructor(e){super({supportedLayers:["marker","polyline"],...e});let t=document.getElementById(this.divId).className;document.getElementById(this.divId).setAttribute("class",t+" "+this.css),this.autoZoomOnFirstMarker=!1,Object(s.g)(e)&&Object(s.g)(e.autoZoomOnFirstMarker)&&(this.autoZoomOnFirstMarker=e.autoZoomOnFirstMarker)}beforeAddingItems(e){this.initMap(e)}initMap(e){this.INITIAL_VIEW_STATE={longitude:0,latitude:0,zoom:2,bearing:0,pitch:0};const t=document.createElement("canvas");if(t.setAttribute("id",Object(s.i)()),t.setAttribute("style","width:100%;height:100%;position:relative;"),document.getElementById(this.divId).appendChild(t),this.deckLayers=[],Object(s.g)(e)&&Object(s.g)(e.deckProps)&&Object(s.g)(e.deckProps.layers))for(let t=0;t<e.deckProps.layers.length;t++){const r=e.deckProps.layers[t].id?e.deckProps.layers[t].id:"base_"+r;this.deckLayers.push(e.deckProps.layers[t])}else this.deckLayers.push(new g.a({id:"base",data:"https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",minZoom:0,maxZoom:19,tileSize:256,renderSubLayers:e=>{const{bbox:{west:t,south:r,east:s,north:i}}=e.tile;return new p.a(e,{data:null,image:e.data,bounds:[t,r,s,i]})}}));let r={canvas:t.id,width:"100%",height:"100%",controller:!0,views:[new l.a],initialViewState:this.INITIAL_VIEW_STATE,onViewStateChange:({viewState:e})=>{},layers:this.deckLayers};Object(s.g)(e)&&Object(s.g)(r)&&(r={...r,...e.deckProps}),this.INITIAL_VIEW_STATE=r.initialViewState,this.deckgl=new h.a(r)}updateMarker(e){const t=e.id+"$"+e.markerId,r=e.markerId,i=new u.a({id:t,data:[{position:[e.location.x,e.location.y]}],pickable:!0,iconAtlas:e.icon,iconMapping:{marker:{x:0,y:0,anchorX:e.iconAnchor[0],anchorY:e.iconAnchor[1],width:e.iconSize[0],height:e.iconSize[1],mask:"#000000"!==e.iconColor}},getIcon:e=>"marker",sizeScale:e.iconScale,getPosition:e=>e.position,getSize:t=>e.iconScale,getColor:t=>Object(s.f)(e.iconColor),onHover:(t,s)=>this.onMarkerHover(r,t,e,s),onClick:(t,s)=>s.leftButton?this.onMarkerLeftClick(r,t,e,s):this.onMarkerRightClick(r,t,e,s)});this.addMarkerToLayer(e,i);const o={};this.autoZoomOnFirstMarker&&(this.autoZoomOnFirstMarker=!1,o.initialViewState={...this.INITIAL_VIEW_STATE,longitude:e.location.x,latitude:e.location.y,zoom:e.zoomLevel}),this.render(o)}updatePolyline(e){const t=e.id+"$"+e.polylineId,r=e.locations[e.polylineId].map(e=>[e.x,e.y,e.z]),s=[{weight:e.weight,name:e.id,color:e.color,path:r}],i=new y.a({id:t,data:s,widthUnits:"pixels",widthMinPixels:5,getPath:e=>e.path,getColor:e=>e.color,getWidth:e=>e.weight});this.addPolylineToLayer(e,i),this.render({})}removeMarker(e){super.removeMarkers(e),this.render({})}removePolylines(e){super.removePolylines(e),this.render({})}render(e){const t=this.getMarkers(),r=this.getPolylines(),s={layers:[...this.deckLayers,...r,...t]};this.deckgl.setProps({...e,...s})}}},156:function(e,t,r){"use strict";var s=r(10);var i=class{constructor(e){this.properties=e,this.dataSourcesToFn=void 0,this.data=[],this.props={},this.props.id="layer-"+Object(s.i)(),this.props.name="",this.props.description="",this.props.dataSourceId="",Object(s.g)(e.name)&&(this.props.name=e.name),Object(s.g)(e.description)&&(this.props.description=e.description),Object(s.g)(e.dataSourceId)&&(this.props.dataSourceId=e.dataSourceId),this.initEvents()}saveState(){this.initialState={...this.props}}restoreState(){this.props={...this.initialState}}getFunc(e){return this.properties[e].handler||this.properties[e]}checkFn(e){let t=this.properties[e];if(Object(s.h)(t))return Object(s.b)(this.properties.dataSourceId,"dataSourceId"),!0;{let r=Object(s.e)(t);return r&&(Object(s.a)(t.dataSourceIds,e+".dataSourceIds"),Object(s.c)(t.handler,e+".handler")),r}}initEvents(){}clear(){}getId(){return this.id}select(e){}addFn(e,t){Object(s.g)(this.dataSourcesToFn)||(this.dataSourcesToFn={});for(let r=0;r<e.length;r++){let i=e[r];Object(s.g)(this.dataSourcesToFn[i])||(this.dataSourcesToFn[i]=[]),this.dataSourcesToFn[i].push(t)}}setData(e,t,r){if(this.data=[],e in this.dataSourcesToFn){let s=this.dataSourcesToFn[e];for(let e=0;e<t.length;e++){for(let i=0;i<s.length;i++)s[i](t[e].data,t[e].timeStamp,r);this.data.push({...this.props})}}}getDataSourcesIds(){if(Object(s.g)(this.dataSourcesToFn)){let e=[];for(let t in this.dataSourcesToFn)e.push(t);return e}return Object(s.b)(this.properties.dataSourceId,"dataSourceId must be defined"),[this.properties.dataSourceId]}getDataSourcesIdsByProperty(e){return this.properties[e].dataSourceIds||[this.properties.dataSourceId]}init(){}getProps(){return{type:this.type,values:this.data}}reset(){this.restoreState()}};t.a=class extends i{constructor(e){super(e),this.type="data"}setData(e,t,r){this.props.data=t}getProps(){return{type:this.type,values:this.props.data}}}},157:function(e,t,r){"use strict";var s=r(10),i=r(94),o=r(95);var a=class{constructor(e,t,r){this.id="DataSource-"+Object(s.i)(),this.name=e,this.properties={fetch:1,...t},this.dataSourceWorker=r,this.currentRunningProperties={},this.initDataSource(t)}initDataSource(e){this.dataSourceWorker.postMessage({message:"init",id:this.id,properties:JSON.stringify(e),topic:i.a+this.id})}disconnect(){this.dataSourceWorker.postMessage({message:"disconnect"})}onDisconnect(){return new Promise(e=>{new BroadcastChannel(i.a+this.id).onmessage=t=>{t.data.status===o.a.DISCONNECTED&&e()}})}async connect(){return this.dataSourceWorker.postMessage({message:"connect"}),this.isConnected()}async isConnected(){const e=new Promise(e=>{null!==this.dataSourceWorker&&(this.dataSourceWorker.onmessage=t=>{"is-connected"===t.data.message&&e(t.data.data)})});return null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"is-connected"}),e}getId(){return this.id}getName(){return this.name}updateProperties(e){this.currentRunningProperties={...this.properties,...e},null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"update-url",data:e})}getCurrentRunningProperties(){return this.currentRunningProperties}terminate(){null!==this.dataSourceWorker&&this.dataSourceWorker.terminate()}},n=r(149),d=r.n(n);t.a=class extends a{constructor(e,t){super(e,{...t,protocol:"file"},new d.a)}}},169:function(e,t,r){var s=r(170);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,r(46).default)("6cba1d79",s,!1,{})},170:function(e,t,r){(t=r(44)(!1)).push([e.i,".osh-view {\n    width:100%;\n    height: 100%;\n}\n",""]),e.exports=t},171:function(e,t,r){var s=r(172);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,r(46).default)("93ae12fe",s,!1,{})},172:function(e,t,r){(t=r(44)(!1)).push([e.i,".osh-view > .deckgl-overlay {\n    position: relative !important;\n}\n",""]),e.exports=t},94:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));const s="datasource-data-"},95:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));const s={CONNECTED:"connected",DISCONNECTED:"disconnected"}}}]);