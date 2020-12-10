(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{114:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return u}));var r=n(2),o=n(6),a=(n(0),n(132)),s={id:"swejson",title:"SweJson",sidebar_label:"SweJson"},c={unversionedId:"datasources/sos/swejson",id:"datasources/sos/swejson",isDocsHomePage:!1,title:"SweJson",description:"SweJson is a specific DataSource to parse JSON data.",source:"@site/docs/datasources/sos/swejson.md",slug:"/datasources/sos/swejson",permalink:"/osh-js/v2.0.0/documentationV2/docs/datasources/sos/swejson",version:"current",sidebar_label:"SweJson",sidebar:"someSidebar",previous:{title:"DataSources",permalink:"/osh-js/v2.0.0/documentationV2/docs/datasources/sos/index"},next:{title:"Video",permalink:"/osh-js/v2.0.0/documentationV2/docs/datasources/sos/video"}},i=[{value:"Parser",id:"parser",children:[]}],l={rightToc:i};function u(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"SweJson is a specific DataSource to parse JSON data."),Object(a.b)("p",null,"The class inherits directly from ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/osh-js/v2.0.0/documentationV2/docs/datasources/sos/index"}),"DataSource"),"."),Object(a.b)("p",null,"There are not specific properties for this DataSource. "),Object(a.b)("h2",{id:"parser"},"Parser"),Object(a.b)("p",null,"The time field formatted as String ISO Date is converted into time in milliseconds."),Object(a.b)("p",null,"The other fields are keeping as they are and are forwarded to the result object."),Object(a.b)("ins",null,"From Server"),":",Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-json"}),'{\n  "time": "2015-02-16T07:58:52Z",\n  "location": {\n    "lat": 43.61759959, \n    "lon": 1.42376351, \n    "alt": 195.0\n  }\n}\n')),Object(a.b)("ins",null,"After parsing"),":",Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-json"}),'{\n    timeStamp: 1424073532000,\n    data: {\n        "location": {\n            "lat": 43.61759959, \n            "lon": 1.42376351, \n            "alt": 195.0\n        }              \n    }\n}  \n')),Object(a.b)("p",null,"The result is then processed through the Toolkit to be synchronized or/and displayed into the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"../../views/index"}),"View"),"."))}u.isMDXComponent=!0},132:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),u=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),p=u(n),b=r,f=p["".concat(s,".").concat(b)]||p[b]||d[b]||a;return n?o.a.createElement(f,c(c({ref:t},l),{},{components:n})):o.a.createElement(f,c({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,s=new Array(a);s[0]=b;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,s[1]=c;for(var l=2;l<a;l++)s[l]=n[l];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);