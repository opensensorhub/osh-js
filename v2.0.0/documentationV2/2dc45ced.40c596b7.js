(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{132:function(e,t,r){"use strict";r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return h}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=a.a.createContext({}),b=function(e){var t=a.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=b(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),l=b(r),d=n,h=l["".concat(i,".").concat(d)]||l[d]||u[d]||o;return r?a.a.createElement(h,s(s({ref:t},p),{},{components:r})):a.a.createElement(h,s({ref:t},p))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var p=2;p<o;p++)i[p]=r[p];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},77:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return s})),r.d(t,"rightToc",(function(){return c})),r.d(t,"default",(function(){return b}));var n=r(2),a=r(6),o=(r(0),r(132)),i={id:"server",title:"Server",sidebar_label:"Server"},s={unversionedId:"server",id:"server",isDocsHomePage:!1,title:"Server",description:"OpenSensorHub Server",source:"@site/docs/server.md",slug:"/server",permalink:"/osh-js/v2.0.0/documentationV2/docs/server",version:"current",sidebar_label:"Server",sidebar:"someSidebar",previous:{title:"OpenSensorHub Javascript Toolkit",permalink:"/osh-js/v2.0.0/documentationV2/docs/"},next:{title:"Projects",permalink:"/osh-js/v2.0.0/documentationV2/docs/projects"}},c=[{value:"OpenSensorHub Server",id:"opensensorhub-server",children:[]},{value:"Using",id:"using",children:[]},{value:"Building",id:"building",children:[]},{value:"Contributing",id:"contributing",children:[]},{value:"License",id:"license",children:[]}],p={rightToc:c};function b(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h3",{id:"opensensorhub-server"},"OpenSensorHub Server"),Object(o.b)("p",null,Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://travis-ci.org/opensensorhub/osh-core"}),Object(o.b)("img",Object(n.a)({parentName:"a"},{src:"https://travis-ci.org/opensensorhub/osh-core.svg?branch=master",alt:"Build Status"}))),"\n",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/opensensorhub/osh-core/releases/latest"}),Object(o.b)("img",Object(n.a)({parentName:"a"},{src:"https://img.shields.io/github/release/opensensorhub/osh-core.svg",alt:"GitHub Release"})))),Object(o.b)("p",null,"OpenSensorHub (OSH) software allows one to easily build interoperable and evolutive sensor networks with advanced processing capabilities and based on open-standards for all data exchanges. "),Object(o.b)("p",null,"These open-standards are mostly ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://www.opengeospatial.org"}),"OGC")," standards from the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://www.opengeospatial.org/projects/groups/sensorwebdwg"}),"Sensor Web Enablement")," (SWE) initiative and are key to design sensor networks that can largely evolve with time (addition of new types of sensors, reconfigurations, etc.)."),Object(o.b)("p",null,"The framework allows one to connect any kind of sensors and actuators to a common bus via a simple yet generic driver API. Sensors can be connected through any available hardware interface such as ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://en.wikipedia.org/wiki/RS-232"}),"RS232/422"),", ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus"}),"SPI"),", ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://en.wikipedia.org/wiki/I%C2%B2C"}),"I2C"),", ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://en.wikipedia.org/wiki/USB"}),"USB"),", ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://en.wikipedia.org/wiki/Ethernet"}),"Ethernet"),", ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://en.wikipedia.org/wiki/Wi-Fi"}),"Wifi"),", ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://en.wikipedia.org/wiki/Bluetooth"}),"Bluetooth"),", ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://en.wikipedia.org/wiki/ZigBee"}),"ZigBee"),", ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol"}),"HTTP"),", etc..."),Object(o.b)("h3",{id:"using"},"Using"),Object(o.b)("p",null,"Refer to the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://docs.opensensorhub.org/"}),"Documentation Site")," for instructions on how to install and use OSH, as well as get the latest news."),Object(o.b)("h3",{id:"building"},"Building"),Object(o.b)("p",null,"OpenSensorHub can be built using Gradle either from the command line or within Eclipse. Please see the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://docs.opensensorhub.org/dev/dev-guide/#building-from-source"}),"Developer's Guide")," for detailed instructions."),Object(o.b)("h3",{id:"contributing"},"Contributing"),Object(o.b)("p",null,"Refer to the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://docs.opensensorhub.org/dev/dev-guide/#building-with-eclipse"}),"Developer's Guide")," for instructions on how to setup your development environment in Eclipse."),Object(o.b)("p",null,"You can also find useful information in the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://docs.opensensorhub.org/dev/javadoc/"}),"Javadocs")," and Design Documentation on the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"../../wiki/Home"}),"Wiki"),". "),Object(o.b)("p",null,"Several sensor driver examples are also available in the source code to help you get started."),Object(o.b)("h3",{id:"license"},"License"),Object(o.b)("p",null,"OpenSensorHub is licensed under the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"http://www.mozilla.org/MPL/2.0/"}),"Mozilla Public License version 2.0"),"."))}b.isMDXComponent=!0}}]);