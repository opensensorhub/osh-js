!function(t){var e={};function r(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(i,a,function(e){return t[e]}.bind(null,a));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=8)}([function(t,e,r){"use strict";var i,a=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},s=function(){var t={};return function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}t[e]=r}return t[e]}}(),o=[];function n(t){for(var e=-1,r=0;r<o.length;r++)if(o[r].identifier===t){e=r;break}return e}function u(t,e){for(var r={},i=[],a=0;a<t.length;a++){var s=t[a],u=e.base?s[0]+e.base:s[0],h=r[u]||0,c="".concat(u," ").concat(h);r[u]=h+1;var d=n(c),l={css:s[1],media:s[2],sourceMap:s[3]};-1!==d?(o[d].references++,o[d].updater(l)):o.push({identifier:c,updater:v(l,e),references:1}),i.push(c)}return i}function h(t){var e=document.createElement("style"),i=t.attributes||{};if(void 0===i.nonce){var a=r.nc;a&&(i.nonce=a)}if(Object.keys(i).forEach((function(t){e.setAttribute(t,i[t])})),"function"==typeof t.insert)t.insert(e);else{var o=s(t.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(e)}return e}var c,d=(c=[],function(t,e){return c[t]=e,c.filter(Boolean).join("\n")});function l(t,e,r,i){var a=r?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(t.styleSheet)t.styleSheet.cssText=d(e,a);else{var s=document.createTextNode(a),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(s,o[e]):t.appendChild(s)}}function p(t,e,r){var i=r.css,a=r.media,s=r.sourceMap;if(a?t.setAttribute("media",a):t.removeAttribute("media"),s&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var f=null,m=0;function v(t,e){var r,i,a;if(e.singleton){var s=m++;r=f||(f=h(e)),i=l.bind(null,r,s,!1),a=l.bind(null,r,s,!0)}else r=h(e),i=p.bind(null,r,e),a=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(r)};return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else a()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=a());var r=u(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var i=0;i<r.length;i++){var a=n(r[i]);o[a].references--}for(var s=u(t,e),h=0;h<r.length;h++){var c=n(r[h]);0===o[c].references&&(o[c].updater(),o.splice(c,1))}r=s}}}},function(t,e,r){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r=function(t,e){var r=t[1]||"",i=t[3];if(!i)return r;if(e&&"function"==typeof btoa){var a=(o=i,n=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),u="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(n),"/*# ".concat(u," */")),s=i.sources.map((function(t){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(t," */")}));return[r].concat(s).concat([a]).join("\n")}var o,n,u;return[r].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(r,"}"):r})).join("")},e.i=function(t,r,i){"string"==typeof t&&(t=[[null,t,""]]);var a={};if(i)for(var s=0;s<this.length;s++){var o=this[s][0];null!=o&&(a[o]=!0)}for(var n=0;n<t.length;n++){var u=[].concat(t[n]);i&&a[u[0]]||(r&&(u[2]?u[2]="".concat(r," and ").concat(u[2]):u[2]=r),e.push(u))}},e}},function(t,e,r){t.exports=function(){return new Worker(r.p+"WorkerName.a92bb3ad303673fad27a.js")}},function(t,e,r){t.exports=function(){return new Worker(r.p+"WorkerName.2523c982904505bb40c4.js")}},function(t,e,r){var i=r(0),a=r(5);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[t.i,a,""]]);var s={insert:"head",singleton:!1},o=(i(a,s),a.locals?a.locals:{});t.exports=o},function(t,e,r){(e=r(1)(!1)).push([t.i,".osh-view {\n    width:100%;\n    height: 100%;\n}\n",""]),t.exports=e},function(t,e,r){var i=r(0),a=r(7);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[t.i,a,""]]);var s={insert:"head",singleton:!1},o=(i(a,s),a.locals?a.locals:{});t.exports=o},function(t,e,r){(e=r(1)(!1)).push([t.i,".ffmpeg-info{\n    position:absolute;\n    font-size: 12px;\n    color:#FFFFFF;\n    padding:2px;\n    font-weight: bold;\n    background-color: rgba(0, 0, 0, 0.3);\n    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);\n    z-index: 10;\n}\n",""]),t.exports=e},function(t,e,r){"use strict";r.r(e);Math.pow(2,53);function i(t){return null!=t}function a(t){return i(t)&&null!==t}function s(t,e){return a(t)&&typeof t===e}function o(t,e="letiable"){if(!i(t))throw e+" must be defined";return t}function n(t,e="letiable"){if(!i(t)||!t)throw e;return t}function u(t,e,r="letiable"){if(o(t,r),typeof t!==e)throw r+" must be of type "+e;return t}function h(t,e="letiable"){if(o(t,e),!Array.isArray(t))throw e+" must be an array";return t}function c(){return"xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){let e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}))}const d="disconnected";var l=class{constructor(t,e,r){this.id="DataSource-"+c(),this.name=t,this.properties={fetch:1,...e},this.dataSourceWorker=r,this.currentRunningProperties={},this.initDataSource(e)}initDataSource(t){this.dataSourceWorker.postMessage({message:"init",id:this.id,properties:JSON.stringify(t),topic:"datasource-data-"+this.id})}disconnect(){this.dataSourceWorker.postMessage({message:"disconnect"})}onDisconnect(){return new Promise(t=>{new BroadcastChannel("datasource-data-"+this.id).onmessage=e=>{e.data.status===d&&t()}})}async connect(){return this.dataSourceWorker.postMessage({message:"connect"}),this.isConnected()}async isConnected(){const t=new Promise(t=>{null!==this.dataSourceWorker&&(this.dataSourceWorker.onmessage=e=>{"is-connected"===e.data.message&&t(e.data.data)})});return null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"is-connected"}),t}getId(){return this.id}getName(){return this.name}updateProperties(t){this.currentRunningProperties={...this.properties,...t},null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"update-url",data:t})}getCurrentRunningProperties(){return this.currentRunningProperties}terminate(){null!==this.dataSourceWorker&&this.dataSourceWorker.terminate()}};var p=class extends l{constructor(t,e,r){super(t,e,r),this.dataSynchronizer=null}setDataSynchronizer(t){this.dataSynchronizer=t,this.dataSourceWorker.postMessage({message:"topic",topic:"data-synchronizer-"+this.dataSynchronizer.id})}setTimeRange(t,e,r){this.updateProperties({...this.currentRunningProperties,startTime:t,endTime:e,replaySpeed:r})}getStartTime(){return this.properties.startTime}getEndTime(){return this.properties.endTime}getReplaySpeed(){return i(this.properties.replaySpeed)?this.properties.replaySpeed:1}async getCurrentTime(){if(i(this.dataSynchronizer))return this.dataSynchronizer.getCurrentTime();{const t=new Promise(t=>{null!==this.dataSourceWorker&&(this.dataSourceWorker.onmessage=e=>{"last-timestamp"===e.data.message&&t(e.data.data)})});return null!==this.dataSourceWorker&&this.dataSourceWorker.postMessage({message:"last-timestamp"}),t}}updateProperties(t){super.updateProperties(t)}},f=r(2),m=r.n(f);var v=class extends p{constructor(t,e){super(t,{timeShift:0,reconnectTimeout:5e3,...e},new m.a)}};r(4);const g="data",x="status";var y=class{constructor(t){this.layers=[],this.lastRec={},this.dataSources=[],this.id="view-"+c(),this.css="",i(t)&&i(t.css)&&(this.css=t.css),o(t&&t.supportedLayers,"supportedLayers"),h(t.supportedLayers,"supportedLayers"),n(t.supportedLayers.length>0,"supportedLayers.length === 0"),this.supportedLayers=t.supportedLayers,this.init(t)}init(t){this.elementDiv=document.createElement("div"),this.elementDiv.setAttribute("id",this.id),this.elementDiv.setAttribute("class",this.css+" osh-view"),this.divId=this.id;let e=i(t.container)?t.container:document.body,r=document.getElementById(e);if(i(r)&&null!==r?(r.appendChild(this.elementDiv),this.container=r):(document.body.appendChild(this.elementDiv),this.hide(),this.container=document.body),this.beforeAddingItems(t),i(t)&&i(t.layers))for(let e=0;e<t.layers.length;e++)this.addLayer(t.layers[e]);i(t)&&i(t.visible)&&(document.getElementById(this.divId).style.display=t.visible?"block":"none");const a=this;new MutationObserver(t=>{t.forEach((function(t){"style"===t.attributeName&&a.onResize()}))}).observe(this.elementDiv,{attributes:!0});new MutationObserver((function(t){i(document.getElementById(a.divId))||(this.disconnect(),a.destroy())})).observe(document.body,{childList:!0})}hide(){this.elementDiv.style.display="none"}onResize(){}attachTo(t){i(this.elementDiv.parentNode)&&this.elementDiv.parentNode.removeChild(this.elementDiv),document.getElementById(t).appendChild(this.elementDiv),"none"===this.elementDiv.style.display&&(this.elementDiv.style.display="block"),this.onResize()}beforeAddingItems(t){}getId(){return this.id}getDivId(){return this.divId}setData(t,e){}show(t){}destroy(){}addLayer(t){n(this.supportedLayers.includes(t.type),"this layer is not supported: "+t.type+", should be "+this.supportedLayers),this.layers.push(t);let e=t.getDataSourcesIds();for(let r=0;r<e.length;r++){const i=e[r];let a=this;new BroadcastChannel("datasource-data-"+i).onmessage=e=>{e.data.type===x&&e.data.status===d||(e.data.message&&"reset"===e.data.message||e.data.type===x&&e.data.status===d?a.reset():e.data.type===g&&(t.setData(i,e.data.values),this.setData(i,t.getProps()),a.lastRec[i]=e.data))}}}removeAllFromLayer(t){if(this.layers.includes(t)){for(let e in t.dataSourcesToFn)delete this.lastRec[e];t.reset()}}removeAllFromLayers(){for(let t of this.layers)this.removeAllFromLayer(t)}getDataSourcesId(){let t=[];for(let e=0;e<this.layers.length;e++){let r=this.layers[e];t=t.concat(r.getDataSourcesIds())}return t}reset(){}},T=r(3),R=r.n(T);r(6);var S=class{constructor(t){t=t||{},this.canvasElement=t.canvas||document.createElement("canvas"),this.contextOptions=t.contextOptions,this.type=t.type||"yuv420",this.customYUV444=t.customYUV444,this.conversionType=t.conversionType||"rec601",this.width=t.width||640,this.height=t.height||320,this.animationTime=t.animationTime||0,this.canvasElement.width=this.width,this.canvasElement.height=this.height,this.init()}init(){this.initContextGL(),this.contextGL&&(this.initProgram(),this.initBuffers(),this.initTextures()),"yuv420"===this.type?this.drawNextOuptutPictureGL=t=>{var e=this.contextGL,r=this.texturePosBuffer,i=this.uTexturePosBuffer,a=this.vTexturePosBuffer,s=this.yTextureRef,o=this.uTextureRef,n=this.vTextureRef,u=t.yData,h=t.uData,c=t.vData,d=this.width,l=this.height,p=t.yDataPerRow||d,f=t.yRowCnt||l,m=t.uDataPerRow||d/2,v=t.uRowCnt||l/2,g=t.vDataPerRow||m,x=t.vRowCnt||v;let y=90*Math.round(t.roll/90);y>180&&(y-=360),90==Math.abs(y)?(this.canvasElement.width=this.height,this.canvasElement.height=this.width,e.viewport(0,0,l,d)):(this.canvasElement.width=this.width,this.canvasElement.height=this.height,e.viewport(0,0,d,l));var T=l/f,R=d/p,S=new Float32Array([R,0,0,0,R,T,0,T]);e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,S,e.DYNAMIC_DRAW),this.customYUV444?(T=l/v,R=d/m):(T=l/2/v,R=d/2/m);var b=new Float32Array([R,0,0,0,R,T,0,T]);e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,b,e.DYNAMIC_DRAW),this.customYUV444?(T=l/x,R=d/g):(T=l/2/x,R=d/2/g);var w=new Float32Array([R,0,0,0,R,T,0,T]);e.bindBuffer(e.ARRAY_BUFFER,a),e.bufferData(e.ARRAY_BUFFER,w,e.DYNAMIC_DRAW),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s),e.texImage2D(e.TEXTURE_2D,0,e.LUMINANCE,p,f,0,e.LUMINANCE,e.UNSIGNED_BYTE,u),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,o),e.texImage2D(e.TEXTURE_2D,0,e.LUMINANCE,m,v,0,e.LUMINANCE,e.UNSIGNED_BYTE,h),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.LUMINANCE,g,x,0,e.LUMINANCE,e.UNSIGNED_BYTE,c),e.uniform1f(this.rollUniform,y*Math.PI/180),e.drawArrays(e.TRIANGLE_STRIP,0,4)}:"yuv422"===this.type&&(this.drawNextOuptutPictureGL=t=>{var e=this.contextGL,r=this.texturePosBuffer,i=this.textureRef,a=t.data,s=this.width,o=this.height,n=t.dataPerRow||2*s,u=t.rowCnt||o;e.viewport(0,0,s,o);var h=o/u,c=s/(n/2),d=new Float32Array([c,0,0,0,c,h,0,h]);e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,d,e.DYNAMIC_DRAW),e.uniform2f(e.getUniformLocation(this.shaderProgram,"resolution"),n,o),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,i),e.texImage2D(e.TEXTURE_2D,0,e.LUMINANCE,n,u,0,e.LUMINANCE,e.UNSIGNED_BYTE,a),e.drawArrays(e.TRIANGLE_STRIP,0,4)})}isWebGL(){return this.contextGL}initContextGL(){for(var t=this.canvasElement,e=null,r=["webgl","experimental-webgl","moz-webgl","webkit-3d"],i=0;!e&&i<r.length;){var a=r[i];try{e=this.contextOptions?t.getContext(a,this.contextOptions):t.getContext(a)}catch(t){e=null}e&&"function"==typeof e.getParameter||(e=null),++i}this.contextGL=e}initProgram(){var t,e,r=this.contextGL;"yuv420"===this.type?(t=["attribute vec4 vertexPos;","attribute vec4 texturePos;","attribute vec4 uTexturePos;","attribute vec4 vTexturePos;","varying vec2 textureCoord;","varying vec2 uTextureCoord;","varying vec2 vTextureCoord;","uniform float roll;","void main()","{","  vec4 ctr = vec4(0.5, 0.5, 0, 0);","  mat4 rotMatrix = mat4( cos(roll), -sin(roll), 0, 0,","                         sin(roll),  cos(roll), 0, 0,","                         0,          0,         1, 0,","                         0,          0,         0, 1);","  gl_Position = vertexPos;","  textureCoord = mat2(rotMatrix) * (texturePos.xy - vec2(ctr)) + vec2(ctr);","  uTextureCoord = mat2(rotMatrix) * (uTexturePos.xy - vec2(ctr)) + vec2(ctr);","  vTextureCoord = mat2(rotMatrix) * (vTexturePos.xy - vec2(ctr)) + vec2(ctr);","}"].join("\n"),e=["precision highp float;","varying highp vec2 textureCoord;","varying highp vec2 uTextureCoord;","varying highp vec2 vTextureCoord;","uniform sampler2D ySampler;","uniform sampler2D uSampler;","uniform sampler2D vSampler;","uniform mat4 YUV2RGB;","void main(void) {","  highp float y = texture2D(ySampler,  textureCoord).r;","  highp float u = texture2D(uSampler,  uTextureCoord).r;","  highp float v = texture2D(vSampler,  vTextureCoord).r;","  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;","}"].join("\n")):"yuv422"===this.type&&(t=["attribute vec4 vertexPos;","attribute vec4 texturePos;","varying vec2 textureCoord;","void main()","{","  gl_Position = vertexPos;","  textureCoord = texturePos.xy;","}"].join("\n"),e=["precision highp float;","varying highp vec2 textureCoord;","uniform sampler2D sampler;","uniform highp vec2 resolution;","uniform mat4 YUV2RGB;","void main(void) {","  highp float texPixX = 1.0 / resolution.x;","  highp float logPixX = 2.0 / resolution.x;","  highp float logHalfPixX = 4.0 / resolution.x;","  highp float steps = floor(textureCoord.x / logPixX);","  highp float uvSteps = floor(textureCoord.x / logHalfPixX);","  highp float y = texture2D(sampler, vec2((logPixX * steps) + texPixX, textureCoord.y)).r;","  highp float u = texture2D(sampler, vec2((logHalfPixX * uvSteps), textureCoord.y)).r;","  highp float v = texture2D(sampler, vec2((logHalfPixX * uvSteps) + texPixX + texPixX, textureCoord.y)).r;","  gl_FragColor = vec4(y, u, v, 1.0) * YUV2RGB;","}"].join("\n"));var i=[];i="rec709"===this.conversionType?[1.16438,0,1.79274,-.97295,1.16438,-.21325,-.53291,.30148,1.16438,2.1124,0,-1.1334,0,0,0,1]:[1.16438,0,1.59603,-.87079,1.16438,-.39176,-.81297,.52959,1.16438,2.01723,0,-1.08139,0,0,0,1];var a=r.createShader(r.VERTEX_SHADER);r.shaderSource(a,t),r.compileShader(a),r.getShaderParameter(a,r.COMPILE_STATUS)||console.log("Vertex shader failed to compile: "+r.getShaderInfoLog(a));var s=r.createShader(r.FRAGMENT_SHADER);r.shaderSource(s,e),r.compileShader(s),r.getShaderParameter(s,r.COMPILE_STATUS)||console.log("Fragment shader failed to compile: "+r.getShaderInfoLog(s));var o=r.createProgram();r.attachShader(o,a),r.attachShader(o,s),r.linkProgram(o),r.getProgramParameter(o,r.LINK_STATUS)||console.log("Program failed to compile: "+r.getProgramInfoLog(o)),r.useProgram(o);var n=r.getUniformLocation(o,"YUV2RGB");r.uniformMatrix4fv(n,!1,i),this.rollUniform=r.getUniformLocation(o,"roll"),this.shaderProgram=o}initBuffers(){var t=this.contextGL,e=this.shaderProgram,r=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,1,-1,1,1,-1,-1,-1]),t.STATIC_DRAW);var i=t.getAttribLocation(e,"vertexPos");if(t.enableVertexAttribArray(i),t.vertexAttribPointer(i,2,t.FLOAT,!1,0,0),this.animationTime){var a=this.animationTime,s=0,o=function(){var r=1*(s+=15)/a;s>=a?r=1:setTimeout(o,15);var i=-1*r,n=1*r,u=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,new Float32Array([n,n,i,n,n,i,i,i]),t.STATIC_DRAW);var h=t.getAttribLocation(e,"vertexPos");t.enableVertexAttribArray(h),t.vertexAttribPointer(h,2,t.FLOAT,!1,0,0);try{t.drawArrays(t.TRIANGLE_STRIP,0,4)}catch(t){}};o()}var n=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,0,0,0,1,1,0,1]),t.STATIC_DRAW);var u=t.getAttribLocation(e,"texturePos");if(t.enableVertexAttribArray(u),t.vertexAttribPointer(u,2,t.FLOAT,!1,0,0),this.texturePosBuffer=n,"yuv420"===this.type){var h=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,h),t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,0,0,0,1,1,0,1]),t.STATIC_DRAW);var c=t.getAttribLocation(e,"uTexturePos");t.enableVertexAttribArray(c),t.vertexAttribPointer(c,2,t.FLOAT,!1,0,0),this.uTexturePosBuffer=h;var d=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,d),t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,0,0,0,1,1,0,1]),t.STATIC_DRAW);var l=t.getAttribLocation(e,"vTexturePos");t.enableVertexAttribArray(l),t.vertexAttribPointer(l,2,t.FLOAT,!1,0,0),this.vTexturePosBuffer=d}}initTextures(){var t=this.contextGL,e=this.shaderProgram;if("yuv420"===this.type){var r=this.initTexture(),i=t.getUniformLocation(e,"ySampler");t.uniform1i(i,0),this.yTextureRef=r;var a=this.initTexture(),s=t.getUniformLocation(e,"uSampler");t.uniform1i(s,1),this.uTextureRef=a;var o=this.initTexture(),n=t.getUniformLocation(e,"vSampler");t.uniform1i(n,2),this.vTextureRef=o}else if("yuv422"===this.type){var u=this.initTexture(),h=t.getUniformLocation(e,"sampler");t.uniform1i(h,0),this.textureRef=u}}initTexture(){var t=this.contextGL,e=t.createTexture();return t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.bindTexture(t.TEXTURE_2D,null),e}drawNextOutputPicture(t,e,r,i){this.contextGL?this.drawNextOuptutPictureGL(t,e,r,i):this.drawNextOuptutPictureRGBA(t,e,r,i)}drawNextOuptutPictureRGBA(t,e,r,i){var a=i,s=this.canvasElement.getContext("2d"),o=s.getImageData(0,0,t,e);o.data.set(a),null===r?s.putImageData(o,0,0):s.putImageData(o,-r.left,-r.top,0,0,r.width,r.height)}resize(t,e){this.canvasElement.width=t,this.canvasElement.height=e,this.width=t,this.height=e}};var b=class extends y{constructor(t){super(t),this.fps=0,this.width="1920",this.height="1080",this.showTime=!1,this.showStats=!1,this.statistics={averageFps:0,frames:0,firstTime:0,bitRate:0,averageBitRate:0},this.framerate=29.67,i(t)&&(i(t.framerate)&&(this.framerate=t.framerate),i(t.directPlay)&&(this.directPlay=t.directPlay),i(t.codec)&&(this.codec=t.codec),i(t.showTime)&&(this.showTime=t.showTime),i(t.showStats)&&(this.showStats=t.showStats));let e,r,a=document.getElementById(this.divId);(this.showTime||this.showStats)&&(this.textDiv=document.createElement("div"),this.textDiv.setAttribute("width",this.width),this.textDiv.setAttribute("height",15),this.textDiv.setAttribute("class","ffmpeg-info"),this.showTime&&(this.textFpsDiv=document.createElement("div"),this.textFpsDiv.setAttribute("class","ffmpeg-fps"),this.textDiv.appendChild(this.textFpsDiv)),this.showStats&&(this.textStatsDiv=document.createElement("div"),this.textStatsDiv.setAttribute("class","ffmpeg-stats"),this.textDiv.appendChild(this.textStatsDiv)),a.appendChild(this.textDiv)),this.domNode=a,i(document.hidden)?(e="hidden",r="visibilitychange"):i(document.msHidden)?(e="msHidden",r="msvisibilitychange"):i(document.webkitHidden)&&(e="webkitHidden",r="webkitvisibilitychange");const s=this;document.addEventListener(r,(function(){document.hidden?s.skipFrame=!0:s.skipFrame=!1}),!1)}updateStatistics(t){if(this.statistics.frames++,this.statistics.pktSize+=t,0===this.statistics.firstTime)return void(this.statistics.firstTime=performance.now());const e=performance.now();e-this.statistics.firstTime<1e3||(this.statistics.averageFps=(this.statistics.frames-1)/((e-this.statistics.firstTime)/1e3),this.statistics.averageBitRate=(this.statistics.pktSize-t)/((e-this.statistics.firstTime)/1e3),this.statistics.frames=1,this.statistics.pktSize=t,this.statistics.firstTime=e)}onUpdated(t){}destroy(){}onAfterDecoded(){}};var w=class extends b{constructor(t){super({supportedLayers:["data"],...t}),this.directPlay=!1,this.codec="h264",this.yuvCanvas=this.createCanvas(this.width,this.height),this.domNode.appendChild(this.yuvCanvas.canvasElement),this.buf=[],this.bufferingTime=2e3}createCanvas(t,e,r){return new S({width:t,height:e,contextOptions:{preserveDrawingBuffer:!0}})}setData(t,e){const r=e.values;for(let t=0;t<r.length;t++)if(!this.skipFrame){null==this.decodeWorker&&this.initFFMPEG_DECODER_WORKER();const t=r.shift();let e=t.data.frameData,i=t.data.roll,a=e.length;this.decode(a,e,t.timeStamp,i)}}reset(){null!==this.decodeWorker&&(this.decodeWorker.terminate(),this.decodeWorker=null),this.resetCalled=!0;let t=new Uint8Array(1);t[0]=128,this.yuvCanvas.drawNextOuptutPictureGL({yData:t,yDataPerRow:1,yRowCnt:1,uData:t,uDataPerRow:1,uRowCnt:1,vData:t,vDataPerRow:1,vRowCnt:1})}initFFMPEG_DECODER_WORKER(){this.decodeWorker=new R.a,this.decodeWorker.id=c();const t=this;this.decodeWorker.onmessage=function(e){let r=e.data;t.width===r.frame_width&&t.height===r.frame_height||(t.yuvCanvas.resize(r.frame_width,r.frame_height),t.width=r.frame_width,t.height=r.frame_height),t.yuvCanvas.canvasElement.drawing=!0,t.yuvCanvas.drawNextOuptutPictureGL({yData:r.frameYData,yDataPerRow:r.frame_width,yRowCnt:r.frame_height,uData:r.frameUData,uDataPerRow:r.frame_width/2,uRowCnt:r.frame_height/2,vData:r.frameVData,vDataPerRow:r.frame_width/2,vRowCnt:r.frame_height/2,roll:r.roll}),t.yuvCanvas.canvasElement.drawing=!1,this.updateStatistics(r.pktSize),this.showTime&&(this.textFpsDiv.innerText=new Date(r.timeStamp).toISOString()+" "),this.showStats&&(this.textStatsDiv.innerText=this.statistics.averageFps.toFixed(2)+" fps, "+(this.statistics.averageBitRate/1e3).toFixed(2)+" kB/s @"+t.yuvCanvas.width+"x"+t.yuvCanvas.height+"\n "+this.codec),this.onUpdated(this.statistics)}.bind(this)}decode(t,e,r,i){if(t>0){let a=e.buffer;this.decodeWorker.postMessage({pktSize:t,pktData:a,roll:i,byteOffset:e.byteOffset,codec:this.codec,timeStamp:r,dataSourceId:this.dataSourceId},[a]),e=null}}destroy(){super.destroy(),i(this.interval)&&clearInterval(this.interval),this.decodeWorker.postMessage({message:"release"}),this.decodeWorker.terminate()}};var E=class{constructor(t){this.properties=t,this.dataSourcesToFn=void 0,this.data=[],this.props={},this.props.id="layer-"+c(),this.props.name="",this.props.description="",this.props.dataSourceId="",i(t.name)&&(this.props.name=t.name),i(t.description)&&(this.props.description=t.description),i(t.dataSourceId)&&(this.props.dataSourceId=t.dataSourceId),this.initEvents()}saveState(){this.initialState={...this.props}}restoreState(){this.props={...this.initialState}}getFunc(t){return this.properties[t].handler||this.properties[t]}checkFn(t){let e=this.properties[t];if(s(e,"function"))return o(this.properties.dataSourceId,"dataSourceId"),!0;{let r=a(e);return r&&(h(e.dataSourceIds,t+".dataSourceIds"),function(t,e){u(t,"function",e)}(e.handler,t+".handler")),r}}initEvents(){}clear(){}getId(){return this.id}select(t){}addFn(t,e){i(this.dataSourcesToFn)||(this.dataSourcesToFn={});for(let r=0;r<t.length;r++){let a=t[r];i(this.dataSourcesToFn[a])||(this.dataSourcesToFn[a]=[]),this.dataSourcesToFn[a].push(e)}}setData(t,e,r){if(this.data=[],t in this.dataSourcesToFn){let i=this.dataSourcesToFn[t];for(let t=0;t<e.length;t++){for(let a=0;a<i.length;a++)i[a](e[t].data,e[t].timeStamp,r);this.data.push({...this.props})}}}getDataSourcesIds(){if(i(this.dataSourcesToFn)){let t=[];for(let e in this.dataSourcesToFn)t.push(e);return t}return o(this.properties.dataSourceId,"dataSourceId must be defined"),[this.properties.dataSourceId]}getDataSourcesIdsByProperty(t){return this.properties[t].dataSourceIds||[this.properties.dataSourceId]}init(){}getProps(){return{type:this.type,values:this.data}}reset(){this.restoreState()}};var A=class extends E{constructor(t){super(t),this.type="data"}setData(t,e,r){this.props.data=e}getProps(){return{type:this.type,values:this.props.data}}};let D=new v("drone-Video",{protocol:"ws",service:"SOS",endpointUrl:"sensiasoft.net:8181/sensorhub/sos",offeringID:"urn:mysos:solo:video2",observedProperty:"http://sensorml.com/ont/swe/property/VideoFrame",startTime:"2015-12-19T21:04:30Z",endTime:"2015-12-19T21:09:19Z",replaySpeed:1});new w({container:"video-h264-container",css:"video-h264",name:"UAV Video",framerate:25,showTime:!0,showStats:!0,layers:[new A({dataSourceId:D.id})]});D.connect()}]);