(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{132:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return O}));var a=r(0),n=r.n(a);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var b=n.a.createContext({}),p=function(e){var t=n.a.useContext(b),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=p(e.components);return n.a.createElement(b.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},m=n.a.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,b=l(e,["components","mdxType","originalType","parentName"]),s=p(r),m=a,O=s["".concat(c,".").concat(m)]||s[m]||u[m]||i;return r?n.a.createElement(O,o(o({ref:t},b),{},{components:r})):n.a.createElement(O,o({ref:t},b))}));function O(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,c=new Array(i);c[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:a,c[1]=o;for(var b=2;b<i;b++)c[b]=r[b];return n.a.createElement.apply(null,c)}return n.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},78:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return o})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return p}));var a=r(2),n=r(6),i=(r(0),r(132)),c={id:"index",title:"View",sidebar_label:"General"},o={unversionedId:"views/index",id:"views/index",isDocsHomePage:!1,title:"View",description:"The Views are components made for displaying any kind of data. Some are framework based such as Leaflet, Cesium, Openlayers, Charts.js etc.",source:"@site/docs/views/index.md",slug:"/views/index",permalink:"/osh-js/v2.0.0/documentationV2/docs/views/index",version:"current",sidebar_label:"General",sidebar:"someSidebar",previous:{title:"DataSynchronizer",permalink:"/osh-js/v2.0.0/documentationV2/docs/datasynchronizer/index"},next:{title:"General",permalink:"/osh-js/v2.0.0/documentationV2/docs/views/map/index"}},l=[],b={rightToc:l};function p(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},b,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"The Views are components made for displaying any kind of data. Some are framework based such as Leaflet, Cesium, Openlayers, Charts.js etc.\nor pure Javascript."),Object(i.b)("p",null,"This is the list of actual supported Views in the Toolkit:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Map",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"./map/cesium"}),"Cesium")," 1.68 "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"map/leafletcomp"}),"Leaflet"),"  1.6"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"./map/ol"}),"OpenLayers"),"  6.2.1"))),Object(i.b)("li",{parentName:"ul"},"Chart",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"./chart"}),"Chart.js"),"   2.9.3"))),Object(i.b)("li",{parentName:"ul"},"TimeLine",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"./ext/rangeslider"}),"NoUiSlider"),"  14.2.0"))),Object(i.b)("li",{parentName:"ul"},"Video",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"./video/mjpeg"}),"MJPEG"),"  native osh view"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"./video/ffmpeg"}),"FFMPEG")," native osh view based on emscripten 2.0 & FFMPEG.js 4.3"),Object(i.b)("li",{parentName:"ul"},"VideCodecApi native osh view"))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"./entity/entity"}),"Entity"),"  native osh view"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"./ext/tasking"}),"Tasking"),"  native osh view       "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(a.a)({parentName:"li"},{href:"./spectrogram"}),"Spectrogram"),"  native osh view",Object(i.b)("br",{parentName:"li"}),"")),Object(i.b)("p",null,"Some Views have to use ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"./stylers/styler"}),"Styler")," to allow styling data."))}p.isMDXComponent=!0}}]);