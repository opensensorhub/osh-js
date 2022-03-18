import defaultValue from"../../Core/defaultValue.js";import defined from"../../Core/defined.js";import DeveloperError from"../../Core/DeveloperError.js";import Event from"../../Core/Event.js";import wrapFunction from"../../Core/wrapFunction.js";import CzmlDataSource from"../../DataSources/CzmlDataSource.js";import GeoJsonDataSource from"../../DataSources/GeoJsonDataSource.js";import KmlDataSource from"../../DataSources/KmlDataSource.js";import getElement from"../getElement.js";function viewerDragDropMixin(e,r){if(!defined(e))throw new DeveloperError("viewer is required.");if(e.hasOwnProperty("dropTarget"))throw new DeveloperError("dropTarget is already defined by another mixin.");if(e.hasOwnProperty("dropEnabled"))throw new DeveloperError("dropEnabled is already defined by another mixin.");if(e.hasOwnProperty("dropError"))throw new DeveloperError("dropError is already defined by another mixin.");if(e.hasOwnProperty("clearOnDrop"))throw new DeveloperError("clearOnDrop is already defined by another mixin.");if(e.hasOwnProperty("flyToOnDrop"))throw new DeveloperError("flyToOnDrop is already defined by another mixin.");r=defaultValue(r,defaultValue.EMPTY_OBJECT);var o=!0,t=defaultValue(r.flyToOnDrop,!0),n=new Event,a=defaultValue(r.clearOnDrop,!0),i=defaultValue(r.dropTarget,e.container),s=defaultValue(r.clampToGround,!0),d=r.proxy;function u(r){stop(r),a&&(e.entities.removeAll(),e.dataSources.removeAll());for(var o=r.dataTransfer.files,t=o.length,n=0;n<t;n++){var i=o[n],u=new FileReader;u.onload=createOnLoadCallback(e,i,d,s),u.onerror=createDropErrorCallback(e,i),u.readAsText(i)}}i=getElement(i),Object.defineProperties(e,{dropTarget:{get:function(){return i},set:function(e){if(!defined(e))throw new DeveloperError("value is required.");unsubscribe(i,u),subscribe(i=e,u)}},dropEnabled:{get:function(){return o},set:function(e){e!==o&&(e?subscribe(i,u):unsubscribe(i,u),o=e)}},dropError:{get:function(){return n}},clearOnDrop:{get:function(){return a},set:function(e){a=e}},flyToOnDrop:{get:function(){return t},set:function(e){t=e}},proxy:{get:function(){return d},set:function(e){d=e}},clampToGround:{get:function(){return s},set:function(e){s=e}}}),subscribe(i,u),e.destroy=wrapFunction(e,e.destroy,(function(){e.dropEnabled=!1})),e._handleDrop=u}function stop(e){e.stopPropagation(),e.preventDefault()}function unsubscribe(e,r){var o=e;defined(o)&&(o.removeEventListener("drop",r,!1),o.removeEventListener("dragenter",stop,!1),o.removeEventListener("dragover",stop,!1),o.removeEventListener("dragexit",stop,!1))}function subscribe(e,r){e.addEventListener("drop",r,!1),e.addEventListener("dragenter",stop,!1),e.addEventListener("dragover",stop,!1),e.addEventListener("dragexit",stop,!1)}function createOnLoadCallback(e,r,o,t){var n=e.scene;return function(a){var i=r.name;try{var s;if(/\.czml$/i.test(i))s=CzmlDataSource.load(JSON.parse(a.target.result),{sourceUri:i});else if(/\.geojson$/i.test(i)||/\.json$/i.test(i)||/\.topojson$/i.test(i))s=GeoJsonDataSource.load(JSON.parse(a.target.result),{sourceUri:i,clampToGround:t});else{if(!/\.(kml|kmz)$/i.test(i))return void e.dropError.raiseEvent(e,i,"Unrecognized file: "+i);s=KmlDataSource.load(r,{sourceUri:i,proxy:o,camera:n.camera,canvas:n.canvas,clampToGround:t})}defined(s)&&e.dataSources.add(s).then((function(r){e.flyToOnDrop&&e.flyTo(r)})).otherwise((function(r){e.dropError.raiseEvent(e,i,r)}))}catch(r){e.dropError.raiseEvent(e,i,r)}}}function createDropErrorCallback(e,r){return function(o){e.dropError.raiseEvent(e,r.name,o.target.error)}}export default viewerDragDropMixin;