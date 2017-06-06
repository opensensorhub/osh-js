/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Richard Becker. All Rights Reserved.

 Author: Richard Becker <beckerr@prominentedge.com>

 ******************************* END LICENSE BLOCK ***************************/

/* Simple JavaScript Inheritance
* By John Resig http://ejohn.org/
* MIT Licensed.
*/

(function(){
    var initializing = false;
    var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    // The base BaseClass implementation (does nothing)
    this.BaseClass = function(){};

    // Create a new BaseClass that inherits from this class
    BaseClass.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don’t run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we’re overwriting an existing function
            if(typeof prop[name] == 'function' && typeof _super[name] == 'function' && fnTest.test(prop[name])) {
                prototype[name] = (function(name, fn){
                                      return function() {
                                          var tmp = this._super;

                                          // Add a new ._super() method that is the same method
                                          // but on the super-class
                                          this._super = _super[name];

                                          // The method only need to be bound temporarily, so we
                                          // remove it when we’re done executing
                                          var ret = fn.apply(this, arguments);
                                          this._super = tmp;

                                          return ret;
                                      };
                                  })(name, prop[name]);
            } else {
               prototype[name] = prop[name];
            }
        }

        // The dummy class constructor
        function BaseClass() {
            // All construction is actually done in the initialize method
            if ( !initializing && this.initialize )
                this.initialize.apply(this, arguments);
        }

        // Populate our constructed prototype object
        BaseClass.prototype = prototype;

        // Enforce the constructor to be what we expect
        BaseClass.prototype.constructor = BaseClass;

        // And make this class extendable
        BaseClass.extend = arguments.callee;

        return BaseClass;
    };
})();
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @namespace {object} OSH
 */
var OSH = {
	version: '1.2'
};

window.OSH = OSH;

/**
 * @namespace {object} OSH.Video
 * @memberof OSH
 */
window.OSH.Video = {};

/**
 * @namespace {object} OSH.UI
 * @memberof OSH
 */
window.OSH.UI = {};

/**
 * @namespace {object} OSH.UI.View
 * @memberof OSH.UI
 */
window.OSH.UI.View = {};

/**
 * @namespace {object} OSH.UI.Styler
 * @memberof OSH.UI
 */
window.OSH.Styler = {};

/**
 * @namespace {object} OSH.UI.ContextMenu
 * @memberof OSH.UI
 */
window.OSH.ContextMenu = {};

/**
 * @namespace {object} OSH.DataReceiver
 * @memberof OSH
 */
window.OSH.DataReceiver = {};

/**
 * @namespace {object} OSH.DataConnector
 * @memberof OSH
 */
window.OSH.DataConnector = {};

/**
 * @namespace {object} OSH.Utils
 * @memberof OSH
 */
window.OSH.Utils = {};

/**
 * @namespace {object} OSH.DataSender
 * @memberof OSH
 */
window.OSH.DataSender = {};

window.OSH.BASE_WORKER_URL = "js/workers";

// HELPER FUNCTION
function isUndefined(object) {
	return typeof(object) == "undefined";
}

function isUndefinedOrNull(object) {
	return typeof(object) === "undefined" || object === null;
}
/***************************** BEGIN LICENSE BLOCK ***************************

The contents of this file are subject to the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one
at http://mozilla.org/MPL/2.0/.

Software distributed under the License is distributed on an "AS IS" basis,
WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
for the specific language governing rights and limitations under the License.

Copyright (C) 2015-2017 Richard Becker. All Rights Reserved.

Author: Richard Becker <beckerr@prominentedge.com>

******************************* END LICENSE BLOCK ***************************/
/*
 * @namespace Browser
 * @aka OSH.Browser
 *
 * A namespace with static properties for browser/feature detection used by OSH internally.
 * This code is borrowed from Leaflet
 *
 * @example
 *
 * ```js
 * if (OSH.Browser.ielt9) {
 *   alert('Upgrade your browser, dude!');
 * }
 * ```
 */

(function () {

	var ua = navigator.userAgent.toLowerCase(),
	    doc = document.documentElement,

	    ie = 'ActiveXObject' in window,

	    webkit    = ua.indexOf('webkit') !== -1,
	    phantomjs = ua.indexOf('phantom') !== -1,
	    android23 = ua.search('android [23]') !== -1,
	    chrome    = ua.indexOf('chrome') !== -1,
	    gecko     = ua.indexOf('gecko') !== -1  && !webkit && !window.opera && !ie,

	    win = navigator.platform.indexOf('Win') === 0,

	    mobile = typeof orientation !== 'undefined' || ua.indexOf('mobile') !== -1,
	    msPointer = !window.PointerEvent && window.MSPointerEvent,
	    pointer = window.PointerEvent || msPointer,

	    ie3d = ie && ('transition' in doc.style),
	    webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
	    gecko3d = 'MozPerspective' in doc.style,
	    opera12 = 'OTransition' in doc.style;


	var touch = !window.L_NO_TOUCH && (pointer || 'ontouchstart' in window ||
			(window.DocumentTouch && document instanceof window.DocumentTouch));

	OSH.Browser = {

		// @property ie: Boolean
		// `true` for all Internet Explorer versions (not Edge).
		ie: ie,

		// @property ielt9: Boolean
		// `true` for Internet Explorer versions less than 9.
		ielt9: ie && !document.addEventListener,

		// @property edge: Boolean
		// `true` for the Edge web browser.
		edge: 'msLaunchUri' in navigator && !('documentMode' in document),

		// @property webkit: Boolean
		// `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
		webkit: webkit,

		// @property gecko: Boolean
		// `true` for gecko-based browsers like Firefox.
		gecko: gecko,

		// @property android: Boolean
		// `true` for any browser running on an Android platform.
		android: ua.indexOf('android') !== -1,

		// @property android23: Boolean
		// `true` for browsers running on Android 2 or Android 3.
		android23: android23,

		// @property chrome: Boolean
		// `true` for the Chrome browser.
		chrome: chrome,

		// @property safari: Boolean
		// `true` for the Safari browser.
		safari: !chrome && ua.indexOf('safari') !== -1,


		// @property win: Boolean
		// `true` when the browser is running in a Windows platform
		win: win,


		// @property ie3d: Boolean
		// `true` for all Internet Explorer versions supporting CSS transforms.
		ie3d: ie3d,

		// @property webkit3d: Boolean
		// `true` for webkit-based browsers supporting CSS transforms.
		webkit3d: webkit3d,

		// @property gecko3d: Boolean
		// `true` for gecko-based browsers supporting CSS transforms.
		gecko3d: gecko3d,

		// @property opera12: Boolean
		// `true` for the Opera browser supporting CSS transforms (version 12 or later).
		opera12: opera12,

		// @property any3d: Boolean
		// `true` for all browsers supporting CSS transforms.
		any3d: !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantomjs,


		// @property mobile: Boolean
		// `true` for all browsers running in a mobile device.
		mobile: mobile,

		// @property mobileWebkit: Boolean
		// `true` for all webkit-based browsers in a mobile device.
		mobileWebkit: mobile && webkit,

		// @property mobileWebkit3d: Boolean
		// `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
		mobileWebkit3d: mobile && webkit3d,

		// @property mobileOpera: Boolean
		// `true` for the Opera browser in a mobile device.
		mobileOpera: mobile && window.opera,

		// @property mobileGecko: Boolean
		// `true` for gecko-based browsers running in a mobile device.
		mobileGecko: mobile && gecko,


		// @property touch: Boolean
		// `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
		touch: !!touch,

		// @property msPointer: Boolean
		// `true` for browsers implementing the Microsoft touch events model (notably IE10).
		msPointer: !!msPointer,

		// @property pointer: Boolean
		// `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
		pointer: !!pointer,


		// @property retina: Boolean
		// `true` for browsers on a high-resolution "retina" screen.
		retina: (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1
	};

}());
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

var MAX_LONG = Math.pow(2, 53) + 1;

/**
 *
 * @constructor
 */
OSH.Utils = function() {};

/**
 *
 * @returns {string}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.randomUUID = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

/**
 * This function stamps/embeds a UUID into an object and returns the UUID generated for it
 * @returns {string}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.stampUUID = function(obj) {
  obj._osh_id = obj._osh_id || OSH.Utils.randomUUID();
  return obj._osh_id;
};

/**
 *
 * @param xmlStr
 * @returns {*}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.jsonix_XML2JSON = function (xmlStr) {
  var module = SOS_2_0_Module_Factory();
  var context = new Jsonix.Context([XLink_1_0, IC_2_0, SMIL_2_0, SMIL_2_0_Language, GML_3_1_1, SWE_1_0_1, GML_3_2_1, OWS_1_1_0, SWE_2_0, SWES_2_0, WSN_T_1, WS_Addr_1_0_Core, OM_2_0, ISO19139_GMD_20070417, ISO19139_GCO_20070417, ISO19139_GSS_20070417, ISO19139_GTS_20070417, ISO19139_GSR_20070417, Filter_2_0, SensorML_2_0, SOS_2_0]);
  var unmarshaller = context.createUnmarshaller();
  var jsonData = unmarshaller.unmarshalString(xmlStr);
  return jsonData;
};


OSH.Utils.jsonix_JSON2XML = function (jsonStr) {
    var module = SOS_2_0_Module_Factory();
    var context = new Jsonix.Context([XLink_1_0, IC_2_0, SMIL_2_0, SMIL_2_0_Language, GML_3_1_1, SWE_1_0_1, GML_3_2_1, OWS_1_1_0, SWE_2_0, SWES_2_0, WSN_T_1, WS_Addr_1_0_Core, OM_2_0, ISO19139_GMD_20070417, ISO19139_GCO_20070417, ISO19139_GSS_20070417, ISO19139_GTS_20070417, ISO19139_GSR_20070417, Filter_2_0, SensorML_2_0, SOS_2_0]);
    var marshaller = context.createMarshaller();
    var xmlData = marshaller.marshalString(jsonStr);
    return xmlData;
};

//buffer is an ArrayBuffer object, the offset if specified in bytes, and the type is a string
//corresponding to an OGC data type.
//See http://def.seegrid.csiro.au/sissvoc/ogc-def/resource?uri=http://www.opengis.net/def/dataType/OGC/0/
/**
 *
 * @param buffer
 * @param offset
 * @param type
 * @returns {*}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.ParseBytes = function (buffer, offset, type) {
  var view = new DataView(buffer);

  //Note: There exist types not listed in the map below that have OGC definitions, but no appropriate
  //methods or corresponding types available for parsing in javascript. They are float128, float16, signedLong,
  //and unsignedLong
  var typeMap = {
    double: function (offset) {
      return {val: view.getFloat64(offset), bytes: 8};
    },
    float64: function (offset) {
      return {val: view.getFloat64(offset), bytes: 8};
    },
    float32: function (offset) {
      return {val: view.getFloat32(offset), bytes: 4};
    },
    signedByte: function (offset) {
      return {val: view.getInt8(offset), bytes: 1};
    },
    signedInt: function (offset) {
      return {val: view.getInt32(offset), bytes: 4};
    },
    signedShort: function (offset) {
      return {val: view.getInt16(offset), bytes: 2};
    },
    unsignedByte: function (offset) {
      return {val: view.getUint8(offset), bytes: 1};
    },
    unsignedInt: function (offset) {
      return {val: view.getUint32(offset), bytes: 4};
    },
    unsignedShort: function (offset) {
      return {val: view.getUint16(offset), bytes: 2};
    },
    //TODO: string-utf-8:
  };
  return typeMap[type](offset);
};

//This function recursivley iterates over the resultStructure to fill in
//values read from data which should be an ArrayBuffer containing the payload from a websocket
/**
 *
 * @param struct
 * @param data
 * @param offsetBytes
 * @returns {*}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.ReadData = function(struct, data, offsetBytes) {
  var offset = offsetBytes;
  for(var i = 0 ; i < struct.fields.length; i++) {
    var currFieldStruct = struct.fields[i];
    if(typeof currFieldStruct.type != 'undefined' && currFieldStruct.type !== null) {
      var ret = OSH.Utils.ParseBytes(data, offset, currFieldStruct.type);
      currFieldStruct.val = ret.val;
      offset += ret.bytes;
    } else if(typeof currFieldStruct.count != 'undefined' && currFieldStruct.count !== null) {
      //check if count is a reference to another variable
      if(isNaN(currFieldStruct.count))
      {
        var id = currFieldStruct.count;
        var fieldName = struct.id2FieldMap[id];
        currFieldStruct.count = struct.findFieldByName(fieldName).val;
      }
      for(var c = 0; c < currFieldStruct.count; c++) {
        for(var j = 0 ; j < currFieldStruct.fields.length; j++) {
          var field = JSON.parse(JSON.stringify(currFieldStruct.fields[j]));
          offset = OSH.Utils.ReadData(field, data, offset);
          currFieldStruct.val.push(field);
        }
      }
    }
  }
  return offset;
};

/**
 *
 * @param resultStructure
 * @returns {{}}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.GetResultObject = function(resultStructure) {
  //TODO: handle cases for nested arrays / matrix data types
  var result = {};
  for(var i = 0; i < resultStructure.fields.length; i++) {
    if(typeof resultStructure.fields[i].count != 'undefined') {
      result[resultStructure.fields[i].name] = [];
      for(var c = 0; c < resultStructure.fields[i].count; c++) {
        var item = {};
        for(var k = 0; k < resultStructure.fields[i].val[c].fields.length; k++) {
          item[resultStructure.fields[i].val[c].fields[k].name] = resultStructure.fields[i].val[c].fields[k].val;
        }
        result[resultStructure.fields[i].name].push(item);
      }
    } else {
      result[resultStructure.fields[i].name] = resultStructure.fields[i].val;
    }
  }
  return result;
};

/**
 *
 * @returns {boolean}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.isOpera = function () {
  return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
};

/**
 *
 * @returns {boolean}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.isFirefox = function() {
  return typeof InstallTrigger !== 'undefined';
};

/**
 *
 * @returns {boolean}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.isSafari = function() {
  return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
};

/**
 *
 * @returns {boolean}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.isIE = function() {
  return /*@cc_on!@*/false || !!document.documentMode;
};

/**
 *
 * @returns {boolean}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.isChrome = function() {
  return !!window.chrome && !!window.chrome.webstore;
};

/**
 *
 * @returns {*|boolean}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.isBlink = function() {
  return (isChrome || isOpera) && !!window.CSS;
};

//------- GET X,Y absolute cursor position ---//
var absoluteXposition = null;
var absoluteYposition = null;

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

function onMouseUpdate(e) {
  absoluteXposition = e.pageX;
  absoluteYposition = e.pageY;
}

/**
 *
 * @returns {*}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.getXCursorPosition = function() {
  return absoluteXposition;
};

/**
 *
 * @returns {*}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.getYCursorPosition = function() {
  return absoluteYposition;
};

/**
 *
 * @param a
 * @param b
 * @returns {boolean}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.isArrayIntersect = function(a, b) {
  return a.filter(function(element){
        return b.indexOf(element) > -1;
       }).length > 0;
};


/**
 *
 * @param o
 * @returns {boolean}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.isElement = function isElement(o) {
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
};

/**
 *
 * @returns {*}
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.isWebWorker = function() {
  if (typeof(Worker) !== "undefined") {
      return true;
  }
  return false;
};

/**
 *
 * @param div
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.takeScreeshot = function(div) {
};

/**
 * Remove a css class from a the div given as argument.
 * @param div the div to remove the class from
 * @param css the css class to remove
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.removeCss = function(div,css) {
  var divCss = div.className;
  css = divCss.replace(css,"");
  div.className = css;
};


/**
 * Add a css class to a the div given as argument.
 * @param div the div to add the class to
 * @param css the css class to add
 * @instance
 * @memberof OSH.Utils
 */
OSH.Utils.addCss = function(div,css) {
  div.setAttribute("class",div.className+" "+css);
};

OSH.Utils.removeLastCharIfExist = function(value,char) {
  if(typeof value === undefined || value === null || value.length === 0 || !value.endsWith("/")) {
    return value;
  }

  return value.substring(0,value.length-1);
};


/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

OSH.EventMap = BaseClass.extend({

    initialize:function() {
        this.eventMap = {};
    },

    observe:function(eventName, fnCallback) {
        if(typeof(eventName) == "undefined" || typeof(fnCallback) == "undefined") {
            return;
        }
        if(!(eventName in this.eventMap)) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(fnCallback);
    },

    fire: function(eventName, properties) {
        if(typeof(eventName) == "undefined") {
            return;
        }
        if(eventName in this.eventMap) {
            var fnCallbackArr = this.eventMap[eventName];
            for(var i = 0; i < fnCallbackArr.length;i++){
                // callback the properties to the current callback
                fnCallbackArr[i](properties);
            }
        }
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 *
 * @constructor
 */
OSH.EventManager = function() {};

var eventMap = new OSH.EventMap();
/**
 *
 * @param eventName
 * @param properties
 * @instance
 * @memberof OSH.EventManager
 */
OSH.EventManager.fire = function(eventName, properties) {
    properties.name = eventName;
    eventMap.fire('osh:'+eventName,properties);
};

/**
 *
 * @param eventName
 * @param fnCallback
 * @param id
 * @instance
 * @memberof OSH.EventManager
 */
OSH.EventManager.observe = function(eventName, fnCallback) {
    eventMap.observe('osh:'+eventName,fnCallback);
};

/**
 *
 * @param divId
 * @param eventName
 * @param fnCallback
 * @instance
 * @memberof OSH.EventManager
 */
OSH.EventManager.observeDiv = function(divId, eventName, fnCallback) {
    elem = document.getElementById(divId);
    // use native dom event listener
    elem.addEventListener(eventName,fnCallback);
};

/**
 * This part defines the events used INTO the API
 * @const
 * @type {{DATA: string, SYNC_DATA: string, SELECT_VIEW: string, CONTEXT_MENU: string, SHOW_VIEW: string, CONNECT_DATASOURCE: string, DISCONNECT_DATASOURCE: string, DATASOURCE_UPDATE_TIME: string, CURRENT_MASTER_TIME: string, UAV_TAKEOFF: string, UAV_GOTO: string, UAV_LOOKAT: string, UAV_LAND: string, UAV_ORBIT: string, LOADING_START: string, LOADING_STOP: string, ADD_VIEW_ITEM: string}}
 */
OSH.EventManager.EVENT = {
    DATA : "data",
    SYNC_DATA : "syncData",
    SELECT_VIEW : "selectView",
    CONTEXT_MENU : "contextMenu",
    SHOW_VIEW : "showView",
    CONNECT_DATASOURCE : "connectDataSource",
    DISCONNECT_DATASOURCE : "disconnectDataSource",
    DATASOURCE_UPDATE_TIME: "updateDataSourceTime",
    CURRENT_MASTER_TIME : "currentMasterTime",
    UAV_TAKEOFF : "uav:takeoff",
    UAV_GOTO: "uav:goto",
    UAV_LOOKAT : "uav:lookat",
    UAV_LAND: "uav:land",
    UAV_ORBIT: "uav:orbit",
    LOADING_START: "loading:start",
    LOADING_STOP: "loading:stop",
    ADD_VIEW_ITEM: "addViewItem",
    RESIZE:"resize",
    PTZ_SEND_REQUEST:"ptzSendRequest"
};

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/** @constant
    @type {number}
    @default
 */
var INITIAL_BUFFERING_TIME = 3000; // ms time

/**
 * This enumeration contains the whole list of available status for a job.
 * @enum
 * @readonly
 * @type {{CANCEL: string, START: string, STOP: string, NOT_START_YET: string}}
 */
var BUFFER_STATUS = {
  CANCEL: 'cancel',
  START: 'start',
  STOP: 'stop',
  NOT_START_YET: 'notStartYet'
};

/**
 * @classdesc Represents the buffer element which is in charge of synchronizing data.
 * @class
 * @param {Object} options The options object
 * @param {Object} options.replayFactor defines the replay speed of the buffer in order to synchronize data
 * @example
 var buffer = new OSH.Buffer({
    replayFactor: 1
 });
 */
OSH.Buffer = BaseClass.extend({
  initialize:function(options) {
    this.buffers = {};

    this.replayFactor = 1;

    // update values from options
    if(typeof options != "undefined") {
      if(typeof options.replayFactor != "undefined") {
        this.replayFactor = options.replayFactor;
      }
    }

    // define buffer variable

    // defines a status to stop the buffer after stop() calling.
    // If start() method is called, this variable should be set to TRUE
    this.stop = false;
    this.bufferingState = false;
  },

  /**
   * Starts observing the data stream.
   * @memberof OSH.Buffer
   * @instance
   */
  startObservers: function() {
    this.observeId = OSH.Utils.randomUUID();
    this.boundHandlerMethod = this.push.bind(this);
    OSH.EventManager.observe(OSH.EventManager.EVENT.DATA,this.boundHandlerMethod,this.observeId);
  },

  /**
   * Stops observing the data stream.
   * @memberof OSH.Buffer
   * @instance
   */
  stopObservers: function() {
    if(typeof this.observeId != "undefined" || this.observeId !== null) {
      OSH.EventManager.observe(OSH.EventManager.EVENT.DATA, this.boundHandlerMethod,this.observeId);
      this.observeId = undefined;
    }
  },

  /**
   * Starts the buffer and starts the observers.
   * @memberof OSH.Buffer
   * @instance
   */
  start: function() {
    this.stop = false;
    this.startObservers();
    this.startRealTime = new Date().getTime();
    this.processSyncData();
  },

  /**
   * Stops the buffer and stops the observers.
   * @memberof OSH.Buffer
   * @instance
   */
  stop: function() {
    this.stopObservers();
    this.stop = true;
  },

  /**
   * Cancels all current running/pending jobs. This function loop over the
   * datasources and cancel them one by one.
   * @memberof OSH.Buffer
   * @instance
   */
  cancelAll: function() {
    for(var dataSourceId in this.buffers){
      this.cancelDataSource(dataSourceId);
    }
  },

  /**
   * Cancels the dataSource. Cancels means to clear the data contained into the buffer and change the status to CANCEL
   * @param dataSourceId The dataSource to cancel
   * @memberof OSH.Buffer
   * @instance
   */
  cancelDataSource: function(dataSourceId) {
    this.buffers[dataSourceId].buffer = [];
    this.buffers[dataSourceId].status = BUFFER_STATUS.CANCEL;
  },

  /**
   * Starts buffering the dataSource.
   * @param dataSourceId the dataSource to start
   * @memberof OSH.Buffer
   * @instance
   */
  startDataSource: function(dataSourceId) {
    this.buffers[dataSourceId].status = BUFFER_STATUS.NOT_START_YET;
    this.buffers[dataSourceId].lastRecordTime = Date.now();
  },

  /**
   * Starts all dataSources. The method loops over all datasources and
   * calls the {@link OSH.Buffer.startDataSource}.
   * @memberof OSH.Buffer
   * @instance
   */
  startAll: function() {
    for(var dataSourceId in this.buffers){
      this.startDataSource(dataSourceId);
    }
  },

  /**
   * Adds a new dataSource into the buffer.
   * @param dataSourceId The dataSource to add
   * @param options syncMasterTime | bufferingTime | timeOut | name
   * @memberof OSH.Buffer
   * @instance
   */
  addDataSource: function(dataSourceId,options) {
    this.buffers[dataSourceId] = {
        buffer: [],
        syncMasterTime: false,
        bufferingTime: INITIAL_BUFFERING_TIME,
        timeOut: 3000,
        lastRecordTime: Date.now(),
        status: BUFFER_STATUS.NOT_START_YET,
        name: "undefined"
    };

    if(typeof options != "undefined") {
      if(typeof  options.syncMasterTime != "undefined") {
        this.buffers[dataSourceId].syncMasterTime = options.syncMasterTime;
      }

      if(typeof  options.bufferingTime != "undefined") {
        this.buffers[dataSourceId].bufferingTime = options.bufferingTime;
      }
      
      if(typeof  options.timeOut != "undefined") {
          this.buffers[dataSourceId].timeOut = options.timeOut;
        }

      if(typeof  options.name != "undefined") {
        this.buffers[dataSourceId].name = options.name;
      }
    }
  },

  /**
   * Adds an entity which contains one or more dataSources.
   * The dataSources are then added to the buffer using {@link OSH.Buffer.addDataSource}
   * @param entity The entity to add
   * @param options The options object passed to the {@link OSH.Buffer.addDataSource}
   * @memberof OSH.Buffer
   * @instance
   */
  addEntity: function(entity,options) {
    // get dataSources from entity and add them to buffers
    if(typeof  entity.dataSources != "undefined") {
      for(var i =0;i < entity.dataSources.length;i++) {
        this.addDataSource(entity.dataSources[i],options);
      }
    }
  },

  /**
   * Pushes a data into the buffer. This method is used as internal method by the {@link OSH.Buffer.startObservers}.
   * The event contains the necessary elements to process the data.
   * @param event The event object received from the OSH.EventManager
   * @param event.dataSourceId The dataSource id to process
   * @param event.syncMasterTime A boolean used to check if the data has to be synchronized with another data. If the value
   * is FALSE, the data will pass through the buffer and send back immediately.
   * @param event.data The raw data provided by the DataSource
   * @param event.data.timeStamp The timeStamp of the data. It will be used in case of the syncMasterTime is set to TRUE.
   * @memberof OSH.Buffer
   * @instance
   */
  push: function(event) {
    var dataSourceId = event.dataSourceId;
    
    // append the data to the existing corresponding buffer
    var currentBufferObj = this.buffers[dataSourceId];
    
    // discard data if it should be synchronized by was too late
    var sync = currentBufferObj.syncMasterTime;
    if (sync && event.data.timeStamp < this.currentTime)
        return;
    
    // also discard if streamwas canceled
    if (currentBufferObj.status == BUFFER_STATUS.CANCEL)
      return;    

    // define the time of the first data as relative time
    if(currentBufferObj.status == BUFFER_STATUS.NOT_START_YET) {
      currentBufferObj.startRelativeTime = event.data.timeStamp;
      currentBufferObj.startRelativeRealTime = new Date().getTime();
      currentBufferObj.status = BUFFER_STATUS.START;
    }

    currentBufferObj.buffer.push(event.data);
    currentBufferObj.lastRecordTime = Date.now();

    if(!sync) {
      this.processData(currentBufferObj,dataSourceId);
    }

  },

  /**
   * [TODO] This is an internal method.
   * @memberof OSH.Buffer
   * @instance
   */
  processSyncData: function() {
    if(!this.bufferingState) {

      var minTimeStampBufferObj = null;
      var minTimeStampDSId = null;
      var minTimeStamp = MAX_LONG;
      var currentBufferObj = null;

      var mustBuffering = false;
      var maxBufferingTime = -1;

      for (var dataSourceId in this.buffers) {
        currentBufferObj = this.buffers[dataSourceId];
        if((currentBufferObj.status == BUFFER_STATUS.START || currentBufferObj.status == BUFFER_STATUS.NOT_START_YET) && currentBufferObj.syncMasterTime) {
          if(currentBufferObj.buffer.length === 0){
            /*if(maxBufferingTime < currentBufferObj.bufferingTime) {
              maxBufferingTime = currentBufferObj.bufferingTime;
            }*/
            var waitTime = currentBufferObj.timeOut - (Date.now() - currentBufferObj.lastRecordTime);
            if (waitTime > 0) {
                window.setTimeout(function () { // to be replaced by setInterval
                   this.processSyncData();
                }.bind(this), waitTime/10.0);
                return;
            } else {
                //console.log("Timeout of data source " + dataSourceId);
            }
          } else if (currentBufferObj.buffer[0].timeStamp < minTimeStamp) {
              minTimeStampBufferObj = currentBufferObj;
              minTimeStampDSId = dataSourceId;
              minTimeStamp = currentBufferObj.buffer[0].timeStamp;
          }
        }
      }

      // re-buffer because at least one dataSource has no data and its status is START
      /*if(maxBufferingTime > -1) {
        this.buffering(currentBufferObj.name,maxBufferingTime);
      } else*/ if(minTimeStampBufferObj !== null) {
        this.currentTime = minTimeStamp;
        this.processData(minTimeStampBufferObj, minTimeStampDSId, function () {
            this.processSyncData();
        }.bind(this));
      } else {
          window.setTimeout(function () {
              this.processSyncData();
          }.bind(this), 1000);
      }
    }
  },

  /**
   * [TODO] This is an internal method.
   * @memberof OSH.Buffer
   * @instance
   */
  processData: function(bufferObj,dataSourceId,fnEndTimeout) {
    // compute waitTime and dispatch data
    var startRelativeTime = bufferObj.startRelativeTime;
    var elapsedTime = new Date().getTime() - bufferObj.startRelativeRealTime;
    var data = bufferObj.buffer.shift();

    var waitTime = (((data.timeStamp-startRelativeTime) / this.replayFactor) - elapsedTime);
    bufferObj.startRelativeTime = data.timeStamp;
    bufferObj.startRelativeRealTime = new Date().getTime();

    if(waitTime > 0) {
      //callback the data after waiting for a time equals to the difference between the two timeStamps
      window.setTimeout(function () {
        //TODO: check if BUFFER TASK isw
        this.dispatchData(dataSourceId,data);
        if(typeof fnEndTimeout != "undefined") {
          fnEndTimeout();
        }
      }.bind(this), waitTime);
    } else {
      this.dispatchData(dataSourceId,data);
      if(typeof fnEndTimeout != "undefined") {
        fnEndTimeout();
      }
    }
  },

  /**
   * Dispatches the data through the EventManager. If the data to process is synchronized, it will launch a {@link OSH.EventManager.EVENT.CURRENT_MASTER_TIME} event
   * with {timeStamp:xxx} as parameter. In all case, it launches a {@link OSH.EventManager.EVENT.DATA}-dataSourceId event with {data:data} as parameter.
   * @param dataSourceId The dataSourceId of the data. It will be used as concatenated String into the fire method.
   * @param data The data to fire
   * @memberof OSH.Buffer
   * @instance
   */
  dispatchData: function(dataSourceId,data) {
    var bufObj = this.buffers[dataSourceId];
    if (bufObj.status != BUFFER_STATUS.CANCEL) {
        if(bufObj.syncMasterTime) {
          OSH.EventManager.fire(OSH.EventManager.EVENT.CURRENT_MASTER_TIME,
              {
                timeStamp: data.timeStamp,
                dataSourceId: dataSourceId
              });
        }
        OSH.EventManager.fire(OSH.EventManager.EVENT.DATA+"-"+dataSourceId, {data : data});
    }
  },

  /**
   * This method is responsible of buffering data, that is to say it will timeOut the whole process to wait after more data.
   * @param name The name of the current dataSource which needs to be buffered
   * @param bufferingTime The buffering time
   * @memberof OSH.Buffer
   * @instance
   */
  buffering: function(name,bufferingTime) {
    OSH.EventManager.fire(OSH.EventManager.EVENT.LOADING_START,{name:name});
    this.bufferingState = true;
    window.setTimeout(function(){
      this.bufferingState = false;
      OSH.EventManager.fire(OSH.EventManager.EVENT.LOADING_STOP);
      this.processSyncData();
    }.bind(this),bufferingTime);
  }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc The DataConnector is the abstract class used to create different connectors.
 * @constructor
 * @abstract
 * @param {string} url The full url used to connect to the data stream
 */
OSH.DataConnector.DataConnector = BaseClass.extend({
  initialize: function(url) {
    this.url = url;
    this.id = "DataConnector-"+OSH.Utils.randomUUID();
  },

  /**
   * The data connector default id.
   * @returns {string}
   * @memberof OSH.DataConnector.DataConnector
   * @instance
   */
  getId: function() {
    return this.id;
  },

  /**
   * The stream url.
   * @returns {string}
   * @memberof OSH.DataConnector.DataConnector
   * @instance
   */
  getUrl: function() {
    return this.url;
  }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @type {OSH.DataConnector.DataConnector}
 * @classdesc Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @class
 * @augments OSH.DataConnector.DataConnector
 * @example
 * var request = ...;
 * var connector = new OSH.DataConnector.AjaxConnector(url);
 *
 * // handle onSuccess
 * connector.onSuccess = function(event) {
 *  // does something
 * }
 *
 * connector.onError = function(event) {
 *  // does something
 * }
 *
 * // send request
 * connector.sendRequest(request);
 *
 */
OSH.DataConnector.AjaxConnector = OSH.DataConnector.DataConnector.extend({

    initialize: function(url,properties) {
        this._super(url);

        this.method = "POST";
        this.responseType = "arraybuffer";

        if(typeof(properties) !== "undefined") {
            if(properties.method) {
                this.method = properties.method;
            }

            if(properties.responseType) {
                this.responseType = properties.responseType;
            }
        }
    },
    /**
     * Sends the request to the defined server.
     * @param request The Http request (as a String format)
     * @memberof OSH.DataConnector.AjaxConnector
     * @instance
     */
    sendRequest: function (request,extraUrl) {
        var self = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.timeout = 60000;
        if(request === null) {
            if(typeof (extraUrl) !== "undefined") {
                xmlhttp.open("GET", this.getUrl()+"?"+extraUrl, true);
            } else {
                xmlhttp.open("GET", this.getUrl(), true);
            }
            xmlhttp.responseType = this.responseType;
            xmlhttp.onload = function (oEvent) {
                if (xmlhttp.response) {
                    self.onMessage(xmlhttp.response);
                }
            };
            xmlhttp.ontimeout = function (e) {
                console.log("Timeout");
            };

            xmlhttp.send(null);
        } else {
            xmlhttp.open("POST", this.getUrl(), true);
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');

            xmlhttp.send(request);

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState < 4) {
                    // while waiting response from server
                }  else if (xmlhttp.readyState == 4) {                // 4 = Response from server has been completely loaded.
                    if (xmlhttp.status == 200 && xmlhttp.status < 300) { // http status between 200 to 299 are all successful
                        this.onSuccess(xmlhttp.responseText);
                    } else {
                        this.onError("");
                    }
                }
            }.bind(this);
        }


    },

    /**
     * This is the callback method in case of getting error connection.
     * @param event The error details
     * @memberof OSH.DataConnector.AjaxConnector
     * @instance
     */
    onError:function(event){

    },

    /**
     * This is the callback method in case of getting success connection.
     * @param event
     * @memberof OSH.DataConnector.AjaxConnector
     * @instance
     */
    onSuccess:function(event) {

    },

    connect:function(){
        this.sendRequest(null);
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @type {OSH.DataConnector.DataConnector}
 * @classdesc Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @class
 * @augments OSH.DataConnector.DataConnector
 * @example
 * var url = ...;
 * var connector = new OSH.DataConnector.WebSocketDataConnector(url);
 *
 * // connect
 * connector.connect();
 *
 * // disconnect
 * connector.disconnect();
 *
 * // close
 * connector.close();
 *
 */
OSH.DataConnector.WebSocketDataConnector = OSH.DataConnector.DataConnector.extend({
    /**
     * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
     * the main thread.
     * @instance
     * @memberof OSH.DataConnector.WebSocketDataConnector
     */
    connect: function () {
        if (!this.init) {
            //creates Web Socket
            if (OSH.Utils.isWebWorker()){
                var url = this.getUrl();
                var blobURL = URL.createObjectURL(new Blob(['(',

                        function () {
                            var ws = null;
                            self.onmessage = function (e) {
                                if(e.data == "close") {
                                    close();
                                } else {
                                    // is URL
                                    init(e.data);
                                }
                            }

                            function init(url) {
                                ws = new WebSocket(url);
                                ws.binaryType = 'arraybuffer';
                                ws.onmessage = function (event) {
                                    //callback data on message received
                                    if (event.data.byteLength > 0) {
                                       self.postMessage(event.data,[event.data]);
                                    }
                                }

                                ws.onerror = function(event) {
                                    ws.close();
                                };
                            }

                            function close() {
                                ws.close();
                            }
                        }.toString(), ')()'],
                    {type: 'application/javascript'}));

                this.worker = new Worker(blobURL);

                this.worker.postMessage(url);
                this.worker.onmessage = function (e) {
                    this.onMessage(e.data);
                }.bind(this);

                // Won't be needing this anymore
                URL.revokeObjectURL(blobURL);
            } else {
                this.ws = new WebSocket(this.getUrl());
                this.ws.binaryType = 'arraybuffer';
                this.ws.onmessage = function (event) {
                    //callback data on message received
                    if (event.data.byteLength > 0) {
                        this.onMessage(event.data);
                    }
                }.bind(this);

                // closes socket if any errors occur
                this.ws.onerror = function(event) {
                    this.ws.close();
                }.bind(this);
            }
            this.init = true;
        }
    },

    /**
     * Disconnects the websocket.
     * @instance
     * @memberof OSH.DataConnector.WebSocketDataConnector
     */
    disconnect: function() {
        if (OSH.Utils.isWebWorker() && this.worker != null) {
            this.worker.postMessage("close");
            this.worker.terminate();
            this.init = false;
        } else if (this.ws != null) {
            this.ws.close();
            this.init = false;
        }
    },

    /**
     * The onMessage method used by the websocket to callback the data
     * @param data the callback data
     * @instance
     * @memberof OSH.DataConnector.WebSocketDataConnector
     */
    onMessage: function (data) {
    },

    /**
     * Closes the webSocket.
     * @instance
     * @memberof OSH.DataConnector.WebSocketDataConnector
     */
    close: function() {
        this.disconnect();
    }
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc The DataSource is the abstract class used to create different datasources.
 * @class
 * @abstract
 * @param {string} name the datasource name
 * @param {Object} properties the datasource properties
 * @param {boolean} properties.timeShift fix some problem with some android devices with some timestamp shift to 16 sec
 * @param {boolean} properties.syncMasterTime defines if the datasource is synchronize with the others one
 * @param {number} properties.bufferingTime defines the time during the data has to be buffered
 * @param {number} properties.timeOut defines the limit time before data has to be skipped
 * @param {string} properties.protocol defines the protocol of the datasource. @see {@link OSH.DataConnector.DataConnector}
 *
 */
OSH.DataReceiver.DataSource = BaseClass.extend({
  initialize: function(name,properties) {
    this.id = "DataSource-"+OSH.Utils.randomUUID();
    this.name = name;
    this.properties = properties;
    this.timeShift = 0;
    this.connected = false;

    this.initDataSource(properties);
  },

  /**
   * Inits the datasource with the constructor properties.
   * @param properties
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   */
  initDataSource: function(properties) {
    
    if(typeof(properties.timeShift) != "undefined") {
        this.timeShift = properties.timeShift;
    }

    if(typeof properties.syncMasterTime != "undefined") {
      this.syncMasterTime = properties.syncMasterTime;
    } else {
      this.syncMasterTime = false;
    }

    if(typeof properties.bufferingTime != "undefined") {
      this.bufferingTime = properties.bufferingTime;
    }

    if(typeof properties.timeOut != "undefined") {
      this.timeOut = properties.timeOut;
    }
    
    // checks if type is WebSocket
    if(properties.protocol == "ws") {
      this.connector = new OSH.DataConnector.WebSocketDataConnector(this.buildUrl(properties));
      // connects the callback
      this.connector.onMessage = this.onMessage.bind(this);
    } else if(properties.protocol == "http") {
        this.connector = new OSH.DataConnector.AjaxConnector(this.buildUrl(properties));
        this.connector.responseType = "arraybuffer";
        // connects the callback
        this.connector.onMessage = this.onMessage.bind(this);
    }
  },
  /**
   * Disconnect the dataSource then the connector will be closed as well.
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   */
  disconnect : function() {
    this.connector.disconnect();
    this.connected = false;
    
    // send data reset event
    OSH.EventManager.fire(OSH.EventManager.EVENT.DATA+"-"+this.id,{
        dataSourceId: this.id,
        reset: true
    });
  },

  /**
   * Connect the dataSource then the connector will be opened as well.
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   */
  connect: function() {
    this.connector.connect();
    this.connected = true;
  },

  /**
   * The callback which receives data.
   * @callback
   * @param data
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   */
  onMessage: function(data) {
    this.onData({
        timeStamp: this.parseTimeStamp(data) + this.timeShift,
        data: this.parseData(data)
    });
  },

  /**
   * The default timestamp parser
   * @param data the full data message returned by the connector
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   * @returns {number} the formatted timestamp
   */
  parseTimeStamp: function(data){
    return new Date().getTime();
  },

  /**
   * The default timestamp parser
   * @param data the full data message returned by the connector
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   * @returns {String|Object|number|ArrayBuffer|*} data the formatted data
   */
  parseData: function(data){
    return data;
  },
  
  /**
   * @param {Object} data the data object
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   * @example
   * data is represented as 
   * data = { 
   *    timeStamp: timeStamp // number
   *    data: data // data to render
   * };
   */ 
  onData:function(data) {},

  /**
   * Gets the datasource id.
   * @returns {string} the datasource id
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   */
  getId: function() {
    return this.id;
  },

  /**
   * Gets the datasource name.
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   * @returns {*}
   */
  getName: function() {
    return this.name;
  },

  /**
   * Builds the full url.
   * @param {object} properties
   * @param {string} properties.protocol the connector protocol
   * @param {string} properties.endpointUrl the endpoint url
   * @param {string} properties.service the service
   * @param {string} properties.offeringID the offeringID
   * @param {string} properties.observedProperty the observed property
   * @param {string} properties.startTime the start time (ISO format)
   * @param {string} properties.endTime the end time (ISO format)
   * @param {number} properties.replaySpeed the replay factor
   * @param {number} properties.responseFormat the response format (e.g video/mp4)
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   * @returns {string} the full url
   */
  buildUrl: function(properties) {
	  var url = "";
	  
	  // adds protocol
	  url += properties.protocol + "://";
	  
	  // adds endpoint url
	  url += properties.endpointUrl+"?";
	  
	  // adds service
	  url += "service="+properties.service+"&";
	  
	  // adds version
	  url += "version=2.0&";
	  
	  // adds request
	  url += "request=GetResult&";
	  
	  // adds offering
	  url += "offering="+properties.offeringID+"&";
	  
	  // adds observedProperty
	  url += "observedProperty="+properties.observedProperty+"&";
	  
	  // adds temporalFilter
	  var startTime = properties.startTime;
	  var endTime = properties.endTime;
	  url += "temporalFilter=phenomenonTime,"+startTime+"/"+endTime+"&";
	  
	  if(properties.replaySpeed) {
		  // adds replaySpeed
		  url += "replaySpeed="+properties.replaySpeed;
	  }
	  
	  // adds responseFormat (optional)
	  if(properties.responseFormat) {
		  url += "&responseFormat="+properties.responseFormat;
	  }

	  return url;
  }
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides parsing to euler orientation.
 * Data has to be under the format : ISODATE,X,Y,
 * @class OSH.DataReceiver.EulerOrientation
 * @augments OSH.DataReceiver.DataSource
 */
OSH.DataReceiver.EulerOrientation = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.EulerOrientation
   * @instance
   */
  parseTimeStamp: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var t =  new Date(tokens[0]).getTime();
    return t;
  },

  /**
   * Extract data from the message. The data are got such as:<p><ul><li>yaw: tokens[1]</li><li>pitch: tokens [2]</li><li>roll: tokens[3]</li></ul></p>.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @example
   * {
   *   pitch:10,
   *   roll: 11,
   *   heading:12
   * }
   * @memberof OSH.DataReceiver.EulerOrientation
   * @instance
   */
  parseData: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var yaw = parseFloat(tokens[1]);    
    var pitch = parseFloat(tokens[2]);
    var roll = parseFloat(tokens[3]);
    
    return {
      pitch : pitch,
      roll : roll,
      heading: yaw
    };
  } 
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides parsing to Lat,Lon,Alt location.
 * Data: ISODATE,LAT,LON,ALT
 * @class OSH.DataReceiver.LatLonAlt
 * @augments OSH.DataReceiver.DataSource
 * @example
 * var androidPhoneGpsDataSource = new OSH.DataReceiver.LatLonAlt("android-GPS", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: "2015-02-16T07:58:00Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: replayFactor+"",
    syncMasterTime: true,
    bufferingTime: 1000,
    timeShift: -16000
  });
 */
OSH.DataReceiver.LatLonAlt = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.LatLonAlt
   * @instance
   */
  parseTimeStamp: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var t =  new Date(tokens[0]).getTime();
    return t;
  },

  /**
   * Extract data from the message. The data are got such as:<p><ul><li>lat: tokens[1]</li><li>lon: tokens [2]</li><li>alt: tokens[3]</li></ul></p>.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @example
   * {
   *   lat:43.61758626,
   *   lon: 1.42376557,
   *   alt:100
   * }
   * @memberof OSH.DataReceiver.LatLonAlt
   * @instance
   */
  parseData: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var lat = parseFloat(tokens[1]);
    var lon = parseFloat(tokens[2]);
    var alt = parseFloat(tokens[3]);
    
    return {
      lat : lat,
      lon : lon,
      alt : alt
    };
  } 
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2016 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoftware.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides parsing to Nexrad.
 * @class OSH.DataReceiver.Nexrad
 * @augments OSH.DataReceiver.DataSource
 */
OSH.DataReceiver.Nexrad = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.Nexrad
   * @instance
   */
  parseTimeStamp: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    return new Date(tokens[0]).getTime();
  },

  /**
   * Extract data from the message.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @memberof OSH.DataReceiver.Nexrad
   * @instance
   */
  parseData: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var el = parseFloat(tokens[2]);
    var az = parseFloat(tokens[3]);
    
    var rangeToCenterOfFirstRefGate = parseFloat(tokens[4]);
    var refGateSize = parseFloat(tokens[5]);
    var numRefGates = parseInt(tokens[6]);
    
    var rangeToCenterOfFirstVelGate = parseFloat(tokens[7]);
    var velGateSize = parseFloat(tokens[8]);
    var numVelGates = parseInt(tokens[9]);
    
    var rangeToCenterOfFirstSwGate = parseFloat(tokens[10]);
    var swGateSize = parseFloat(tokens[11]);
    var numSwGates = parseInt(tokens[12]);
    
    var i = 13
    
    var refData = [];
    for (count=0; count<numRefGates; count++)
    	refData.push(parseFloat(tokens[i++]));
    
    var velData = [];
    for (count=0; count<numVelGates; count++)
    	velData.push(parseFloat(tokens[i++]));
    
    var swData = [];
    for (count=0; count<numSwGates; count++)
    	swData.push(parseFloat(tokens[i++]));
    
    return {
      elevation : el,
      azimuth : az,
      rangeToCenterOfFirstRefGate : rangeToCenterOfFirstRefGate,
      refGateSize: refGateSize,
      rangeToCenterOfFirstVelGate: rangeToCenterOfFirstVelGate,
      velGateSize: velGateSize,
      rangeToCenterOfFirstSwGate: rangeToCenterOfFirstSwGate,
      swGateSize: swGateSize,
      reflectivity: refData,
      velocity: velData,
      spectrumWidth: swData
    };
  } 
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2016 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoftware.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides parsing to UAH Weather Station.
 * @class OSH.DataReceiver.UAHWeather
 * @augments OSH.DataReceiver.DataSource
 */
OSH.DataReceiver.DataSourceUAHWeather = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.DataSourceUAHWeather
   * @instance
   */
  parseTimeStamp: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    return new Date(tokens[0]).getTime();
  },

  /**
   * Extract data from the message.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @memberof OSH.DataReceiver.DataSourceUAHWeather
   * @instance
   */
  parseData: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var airPres = parseFloat(tokens[1]);
    var airTemp = parseFloat(tokens[2]);
    var humidity = parseFloat(tokens[3]);
    var windSpeed = parseFloat(tokens[4]);
    var windDir = parseFloat(tokens[5]);
    var rainCnt = parseFloat(tokens[6]);
    
    return {
      airPres : airPres,
      airTemp : airTemp,
      humidity : humidity,
      windSpeed: windSpeed,
      windDir: windDir,
      rainCnt: rainCnt
    };
  } 
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides parsing to Orientation Quaternion.
 * Data: ISODATE,Qx,Qy,Qz,Qw.
 * @class OSH.DataReceiver.OrientationQuaternion
 * @augments OSH.DataReceiver.DataSource
 * @example
 * var androidPhoneOrientationDataSource = new OSH.DataReceiver.OrientationQuaternion("android-Orientation", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: replayFactor+"",
        syncMasterTime: true,
        bufferingTime: 1000
    });
 */
OSH.DataReceiver.OrientationQuaternion = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.OrientationQuaternion
   * @instance
   */
  parseTimeStamp: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    return new Date(tokens[0]).getTime();
  },

  /**
   * Extract data from the message. The data are got such as:<p><ul><li>qx: tokens[1]</li><li>qy: tokens [2]</li><li>qz: tokens[3]</li><li>qw: tokens[4]</li></ul></p>.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @example
   * {
   *   pitch:10,
   *   roll: 11,
   *   heading:12
   * }
   * @memberof OSH.DataReceiver.OrientationQuaternion
   * @instance
   */
  parseData: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var qx = parseFloat(tokens[1]);
    var qy = parseFloat(tokens[2]);
    var qz = parseFloat(tokens[3]);
    var qw = parseFloat(tokens[4]);

    //var q = new THREE.Quaternion(qx, qy, qz, qw);
    //var look = new THREE.Vector3( 0, 0, -1 );
    //look.applyQuaternion(q);

    // look dir vector
    var x = 0;
    var y = 0;
    var z = -1;

    // calculate quat * vector
    var ix =  qw * x + qy * z - qz * y;
    var iy =  qw * y + qz * x - qx * z;
    var iz =  qw * z + qx * y - qy * x;
    var iw = - qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    xp = ix * qw + iw * - qx + iy * - qz - iz * - qy;
    yp = iy * qw + iw * - qy + iz * - qx - ix * - qz;
    zp = iz * qw + iw * - qz + ix * - qy - iy * - qx;

    var yaw = 90 - (180/Math.PI*Math.atan2(yp, xp));
    
    //TODO: computes roll & pitch values
    return { heading: yaw, roll: null, pitch:null};
  } 
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides parsing to H264 raw data.
 * Data: ArrayBuffer
 * @class OSH.DataReceiver.VideoH264
 * @augments OSH.DataReceiver.DataSource
 * @example
 * var videoDataSource = new OSH.DataReceiver.VideoH264("H264 video ", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:a0e0eac2fea3f614-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2016-08-11T20:17:30.402Z",
        endTime: "2016-08-11T20:18:05.451Z",
        replaySpeed: 1,
        syncMasterTime: false,
        bufferingTime: 1000
  });
 */
OSH.DataReceiver.VideoH264 = OSH.DataReceiver.DataSource.extend({
    initialize: function (name, properties, options) {
        this._super(name, properties, options);
    },

    /**
     * Extracts timestamp from the message. The timestamp is corresponding to the first 64bits of the binary message.
     * @param {function} $super the parseTimeStamp super method
     * @param {ArrayBuffer} data the data to parse
     * @returns {number} the extracted timestamp
     * @memberof OSH.DataReceiver.VideoH264
     * @instance
     */
    parseTimeStamp: function (data) {
        // read double time stamp as big endian
        return new DataView(data).getFloat64(0, false) * 1000;
    },

    /**
     * Extract data from the message. The H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length.
     * @param {function} $super the parseData super method
     * @param {ArrayBuffer} data the data to parse
     * @returns {Uint8Array} the parsed data
     * @memberof OSH.DataReceiver.VideoH264
     * @instance
     */
    parseData: function (data) {
        return new Uint8Array(data, 12, data.byteLength - 12); // H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length
    }
});


/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides parsing to MJPEG raw data.
 * Data: ArrayBuffer
 * @class OSH.DataReceiver.VideoMjpeg
 * @augments OSH.DataReceiver.DataSource
 * @example
  var androidPhoneVideoDataSource = new OSH.DataReceiver.VideoMjpeg("android-Video", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
    startTime: "2015-02-16T07:58:00Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: 1,
    syncMasterTime: true,
    bufferingTime: 1000
  });
 */
OSH.DataReceiver.VideoMjpeg = OSH.DataReceiver.DataSource.extend({
  initialize: function(name,properties,options) {
    this._super(name,properties,options);
  },

  /**
   * Extracts timestamp from the message. The timestamp is corresponding to the first 64 bits of the binary message.
   * @param {function} $super the parseTimeStamp super method
   * @param {ArrayBuffer} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.VideoMjpeg
   * @instance
   */
  parseTimeStamp: function(data){
    return new DataView(data).getFloat64(0, false) * 1000; // read double time stamp as big endian
  },

  /**
   * Extract data from the message. Creates a Blob object starting at byte 12. (after the 64 bits of the timestamp).
   * @param {function} $super the parseData super method
   * @param {ArrayBuffer} data the data to parse
   * @returns {Blob} the parsed data
   * @memberof OSH.DataReceiver.VideoMjpeg
   * @instance
   */
  parseData: function(data){
    var imgBlob = new Blob([data]);
    var blobURL = window.URL.createObjectURL(imgBlob.slice(12));
    return blobURL;
  } 
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides parsing to fragmented mp4 raw data. The data is encapsulated into mp4 fragment.
 * Data: ArrayBuffer
 * @class OSH.DataReceiver.VideoMp4
 * @augments OSH.DataReceiver.DataSource
 * @example
 * var videoDataSource = new OSH.DataReceiver.VideoMp4("MP4 video ", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:a0e0eac2fea3f614-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2016-08-11T20:17:30.402Z",
        endTime: "2016-08-11T20:18:05.451Z",
        replaySpeed: 1,
        syncMasterTime: false,
        bufferingTime: 1000,
        responseFormat: "video/mp4
  });
 */
OSH.DataReceiver.VideoMp4 = OSH.DataReceiver.DataSource.extend({
    initialize: function (name, properties, options) {
        this._super(name, properties, options);
        this.absoluteTime = -1;
    },

    /**
     * Extracts timestamp from the message. The timestamp is located at the 60th bytes and is 8 bytes length.
     * @param {function} $super the parseTimeStamp super method
     * @param {ArrayBuffer} data the data to parse
     * @returns {number} the extracted timestamp
     * @memberof OSH.DataReceiver.VideoMp4
     * @instance
     */
    parseTimeStamp: function (data) {
        // got the first box => MVDH
        if (this.absoluteTime == -1) {
            var infos = readMP4Info(data);

            //console.log("PTS : "+infos.pts);
            //console.log("timeScale : "+infos.timeScale);
            //console.log("duration : "+infos.duration);
            //console.log("rate : "+infos.rate);

            this.absoluteTime = infos.absoluteTime;
            this.timeScale = infos.timeScale;

            return this.absoluteTime;
        } else {
            // for debug only --> MVDH has already been calculated
            // got the first box
            var infos = readMP4Info(data);
            //console.log("PTS : "+infos.pts);
            //console.log("timeScale : "+infos.timeScale);
            //console.log("duration : "+infos.duration);
            //console.log("rate : "+infos.rate);
            // end debug
            return ((infos.pts * 1000) * this.timeScale) + this.absoluteTime; // FPS to FPMS
        }
    }
});

function readMP4Info(data) {
    var infos = {
        absoluteTime: 0,
        pts: 0,
        timeScale: 0,
        duration: 0,
        rate: 0
    };

    var pos = 60; // 60 bytes
    // starts at 60 bytes length
    //console.log(data.byteLength);
    infos.absoluteTime = new DataView(data, pos, pos + 8).getUint32(0); //8 bytes length but takes the  last four
    infos.absoluteTime = (infos.absoluteTime - 2082844800) * 1000;
    //console.log(new Date(infos.absoluteTime).toISOString());
    pos += 8;

    //modification time// 32 bits
    infos.pts = new DataView(data, pos, pos + 4).getUint32(0); //4 bytes length
    pos += 4;

    //time scale // 32 bits
    infos.timeScale = new DataView(data, pos, pos + 4).getUint32(0); //4 bytes length
    infos.timeScale = 1 / (infos.timeScale); // FPS
    pos += 4;

    //duration // 32 bits
    infos.duration = new DataView(data, pos, pos + 4).getUint32(0); //4 bytes length
    pos += 4;

    //rate  // 32 bits / 65536
    infos.rate = (new DataView(data, pos, pos + 4).getUint32(0));

    return infos;
};

function readNCC(bytes, n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        res += String.fromCharCode(bytes[i]);
    }
    return res;
};

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides generic parsing for JSON response.
 *
 * @class OSH.DataReceiver.JSON
 * @augments OSH.DataReceiver.DataSource
 * @example
 * var androidPhoneGpsDataSource = new OSH.DataReceiver.JSON("android-GPS", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: "2015-02-16T07:58:00Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: replayFactor+"",
    syncMasterTime: true,
    bufferingTime: 1000,
    timeShift: -16000
  });
 */
OSH.DataReceiver.JSON = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp corresponds to the 'time' attribute of the JSON object.
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.JSON
   * @instance
   */
  parseTimeStamp: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    return new Date(JSON.parse(rec)['time']).getTime();
  },

  /**
   * Extract data from the message. The data are corresponding to the whole list of attributes of the JSON object
   * excepting the 'time' one.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @example
   * {
   *   location : {
   *    lat:43.61758626,
   *    lon: 1.42376557,
   *    alt:100
   *   }
   * }
   * @memberof OSH.DataReceiver.JSON
   * @instance
   */
  parseData: function(data){
    var rec = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));

    var result = {};

    for(var key in rec) {
        if(key !== 'time') {
            result[key] = rec[key];
        }
    }
    return result;
  },

    /**
     * Builds the full url.
     * @param {object} properties
     * @param {string} properties.protocol the connector protocol
     * @param {string} properties.endpointUrl the endpoint url
     * @param {string} properties.service the service
     * @param {string} properties.offeringID the offeringID
     * @param {string} properties.observedProperty the observed property
     * @param {string} properties.startTime the start time (ISO format)
     * @param {string} properties.endTime the end time (ISO format)
     * @param {number} properties.replaySpeed the replay factor
     * @param {number} properties.responseFormat the response format (e.g video/mp4)
     * @instance
     * @memberof OSH.DataReceiver.DataSource
     * @returns {string} the full url
     */
    buildUrl: function(properties) {
        var url = "";

        // adds protocol
        url += properties.protocol + "://";

        // adds endpoint url
        url += properties.endpointUrl+"?";

        // adds service
        url += "service="+properties.service+"&";

        // adds version
        url += "version=2.0&";

        // adds request
        url += "request=GetResult&";

        // adds offering
        url += "offering="+properties.offeringID+"&";

        // adds observedProperty
        url += "observedProperty="+properties.observedProperty+"&";

        // adds temporalFilter
        var startTime = properties.startTime;
        var endTime = properties.endTime;
        if (startTime !== "now" && this.timeShift != 0) {
            // HACK: don't do it for old Android dataset that is indexed differently
            if (properties.offeringID !== "urn:android:device:060693280a28e015-sos") {
                // apply time shift
                startTime = new Date(Date.parse(startTime) - this.timeShift).toISOString();
                endTime = new Date(Date.parse(endTime) - this.timeShift).toISOString();
            }
        }
        url += "temporalFilter=phenomenonTime,"+startTime+"/"+endTime+"&";

        if(properties.replaySpeed) {
            // adds replaySpeed
            url += "replaySpeed="+properties.replaySpeed;
        }

        // adds responseFormat (mandatory)
        url += "&responseFormat=application/json";

        return url;
    }
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This datasource provides parsing to chart data.
 * Data has to be under the format : ISODATE,X,Y,
 * @class
 * @augments OSH.DataReceiver.DataSource
 * @example
 *var chartDataSource = new OSH.DataReceiver.Chart("chart", {
      protocol: "ws",
      service: "SOS",
      endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
      offeringID: "urn:mysos:offering03",
      observedProperty: "http://sensorml.com/ont/swe/property/Weather",
      startTime: "now",
      endTime: "2055-01-01Z",
      syncMasterTime: false,
      bufferingTime: 1000
  });
 */
OSH.DataReceiver.Chart = OSH.DataReceiver.DataSource.extend({

    /**
     * Extracts timestamp from the data. The timestamp is the first token got from split(',')
     * @param {function} $super the parseTimeStamp super method
     * @param {string} data the data to parse
     * @returns {number} the extracted timestamp
     * @memberof OSH.DataReceiver.Chart
     * @instance
     */
    parseTimeStamp: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data));
        var tokens = rec.trim().split(",");
        var t = new Date(tokens[0]).getTime();
        return t;
    },

    /**
     * Extract data from the message. This split over ",".
     * @param {function} $super the parseData super method
     * @param {Object} data the data to parse
     * @returns {Array} the parsed data as an array of tokens
     * @memberof OSH.DataReceiver.Chart
     * @instance
     */
    parseData: function (data) {
        var rec = String.fromCharCode.apply(null, new Uint8Array(data));
        var tokens = rec.trim().split(",");
        //skip time
        tokens.shift();
        return tokens;
    }
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This class is responsible of handling datasources. It observes necessary events to manage datasources.
 * @class OSH.DataReceiver.DataReceiverController
 * @listens {@link OSH.EventManager.EVENT.CONNECT_DATASOURCE}
 * @listens {@link OSH.EventManager.EVENT.DISCONNECT_DATASOURCE}
 * @listens {@link OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME}
 * @example
 *
 * var datasource = new OSH.DataReceiver... // creates OSH.DataReceiver.<>
 *
 * // creates controller
 * var dataProviderController = new OSH.DataReceiver.DataReceiverController({
 *   replayFactor : replayFactor
 * });
 *
 * // adds datasource to controller
 * dataProviderController.addDataSource(weatherDataSource);
 *
 * // and/or adds entity to controller
 * var entity = {
 *       id : "entity-"+OSH.Utils.randomUUID(),
 *       name: "Some entity",
 *       dataSources: [datasource]
 * };
 *
 * dataProviderController.addEntity(entity);
 *
 */
OSH.DataReceiver.DataReceiverController = BaseClass.extend({
    initialize: function (options) {
        this.options = options;
        this.initBuffer();
        this.dataSourcesIdToDataSources = {};

        /*
        * @event {@link OSH.EventManager.EVENT.CONNECT_DATASOURCE}
        * @type {Object}
        * @property {Object} event - Is notified when a dataSource has to be connected
        * @property {Object} event.dataSourcesId - The datasource id
        */
        // observe CONNECT event and connect dataSources consequently
        OSH.EventManager.observe(OSH.EventManager.EVENT.CONNECT_DATASOURCE, function (event) {
            var eventDataSourcesIds = event.dataSourcesId;
            for (var i = 0; i < eventDataSourcesIds.length; i++) {
                var id = eventDataSourcesIds[i];
                if (id in this.dataSourcesIdToDataSources) {
                    // if sync to master to time, request data starting at current time
                    if (this.dataSourcesIdToDataSources[id].syncMasterTime) {
                        this.updateDataSourceTime(id, new Date(this.buffer.currentTime).toISOString());
                    }
                    this.dataSourcesIdToDataSources[id].connect();
                    this.buffer.startDataSource(id);
                }
            }
        }.bind(this));

        /*
         * @event {@link OSH.EventManager.EVENT.DISCONNECT_DATASOURCE}
         * @type {Object}
         * @property {Object} event - Is notified when a dataSource has to be disconnected
         * @property {Object} event.dataSourcesId - The datasource id
         */
        // observe DISCONNECT event and disconnect dataSources consequently
        OSH.EventManager.observe(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE, function (event) {
            var eventDataSourcesIds = event.dataSourcesId;
            for (var i = 0; i < eventDataSourcesIds.length; i++) {
                var id = eventDataSourcesIds[i];
                if (id in this.dataSourcesIdToDataSources) {
                    this.dataSourcesIdToDataSources[id].disconnect();
                    this.buffer.cancelDataSource(id);
                }
            }
        }.bind(this));


        /*
         * @event {@link OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME}
         * @type {Object}
         * @property {Object} event - Is notified when the datasource has to be updated
         * @property {Object} event.startTime - The corresponding new start time
         * @property {Object} event.endTime - The corresponding new end time
         */
        OSH.EventManager.observe(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME, function (event) {

            var dataSourcesToReconnect = [];

            // disconnect all synchronized datasources
            for (var id in this.dataSourcesIdToDataSources) {
                var dataSrc = this.dataSourcesIdToDataSources[id];
                if (dataSrc.syncMasterTime && dataSrc.connected) {
                    dataSrc.disconnect();
                    this.buffer.cancelDataSource(id);
                    dataSourcesToReconnect.push(id);
                }
            }

            // reset buffer current time
            this.buffer.currentTime = Date.parse(event.startTime);

            // reconnect all synchronized datasources with new time parameters
            for (var i = 0; i < dataSourcesToReconnect.length; i++) {
                var id = dataSourcesToReconnect[i];
                var dataSrc = this.dataSourcesIdToDataSources[id];
                this.updateDataSourceTime(id, event.startTime, event.endTime);
                dataSrc.connect();
                this.buffer.startDataSource(id);
            }

        }.bind(this));
    },

    /**
     * Updates the datasource time range.
     * @param id the datasource id
     * @param startTime the start time
     * @param endTime the end time
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    updateDataSourceTime: function (id, startTime, endTime) {
        // get current parameters
        var dataSource = this.dataSourcesIdToDataSources[id];
        var props = dataSource.properties;
        var options = dataSource.options;

        // update start/end time
        if (typeof startTime != "undefined") {
            props.startTime = startTime;
        }

        if (typeof endTime != "undefined") {
            props.endTime = endTime;
        }

        // reset parameters
        dataSource.initDataSource(props, options);
    },

    /**
     * Instantiates a new OSH.Buffer {@link OSH.Buffer}
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    initBuffer: function () {
        this.buffer = new OSH.Buffer(this.options);
    },

    /**
     * Adds a entity to the current list of datasources and pushes it into the buffer.
     * @see {@link OSH.Buffer}
     * @param {Object} dataSource the datasource to add
     * @param options @deprecated
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    addEntity: function (entity, options) {
        if (typeof (entity.dataSources) != "undefined") {
            for (var i = 0; i < entity.dataSources.length; i++) {
                this.addDataSource(entity.dataSources[i], options);
            }
        }
    },

    /**
     * Adds a dataSource to the current list of datasources and pushes it into the buffer.
     * @see {@link OSH.Buffer}
     * @param {Object} dataSource the datasource to add
     * @param options @deprecated
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    addDataSource: function (dataSource, options) {
        this.dataSourcesIdToDataSources[dataSource.id] = dataSource;
        this.buffer.addDataSource(dataSource.id, {
            name: dataSource.name,
            syncMasterTime: dataSource.syncMasterTime,
            bufferingTime: dataSource.bufferingTime,
            timeOut: dataSource.timeOut
        });

        //TODO: make frozen variables?
        dataSource.onData = function (data) {
            this.buffer.push({dataSourceId: dataSource.getId(), data: data});

        }.bind(this);
    },

    /**
     * Connects each connector
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    connectAll: function () {
        this.buffer.start();
        for (var id in this.dataSourcesIdToDataSources) {
            this.dataSourcesIdToDataSources[id].connect();
        }
    }
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2016 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoftware.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 */
OSH.DataSender.DataSink =  BaseClass.extend({
    initialize: function (name, properties, options) {
        if (properties.protocol == "http") {
            this.connector = new OSH.DataConnector.AjaxConnector(this.buildUrl(properties));
            this.connector.onError = this.onCatchError.bind(this);
            this.connector.onSuccess = this.onCatchSuccess.bind(this);
        }
        this.id = "DataSender-" + OSH.Utils.randomUUID();
        this.name = name;
        this.properties = properties;
    },

    /**
     * @param properties
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    sendRequest: function(properties) {
        this.connector.sendRequest(this.buildRequest(properties));
    },

    /**
     * @param properties
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    buildRequest:function(properties) {
        return "";
    },

    /**
     * @param properties
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    buildUrl: function(properties) {
        var url = "";

        // adds protocol
        url += properties.protocol + "://";

        // adds endpoint url
        url += properties.endpointUrl;

        return url;
    },

    /**
     * @param response
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    onCatchError:function(response) {
        this.onError(response);
    },

    /**
     * @param response
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    onCatchSuccess:function(response) {
        this.onSuccess(response);
    },

    /**
     * @param response
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    onError:function(response) {

    },

    /**
     * @param response
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    onSuccess:function(response) {

    },

    /**
     * The data connector default id.
     * @returns {string|*}
     * @memberof OSH.DataConnector.DataSink
     * @instance
     */
    getId: function() {
        return this.id;
    },

    /**
     * The name.
     * @returns {string}
     * @memberof OSH.DataConnector.DataSink
     * @instance
     */
    getName: function() {
        return this.name;
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @augments OSH.DataSender.DataSink
 */
OSH.DataSender.PtzTasking = OSH.DataSender.DataSink.extend({

    initialize: function(name, properties) {
        this._super(name, properties);

        OSH.EventManager.observe(OSH.EventManager.EVENT.PTZ_SEND_REQUEST+"-"+this.id, function (event) {
            this.connector.sendRequest(this.buildRequest(this.getCommandData(event.cmdData)));
        }.bind(this));
    },

    // to override by specific vendor dataSender
    getCommandData:function(values) {
        var cmdData = "";

        if(values.rtilt != null) {
            cmdData += "rtilt,"+values.rtilt+" ";
        }

        if(values.rpan != null) {
            cmdData += "rpan,"+values.rpan+" ";
        }

        if(values.rzoom != null) {
            cmdData += "rzoom,"+values.rzoom+" ";
        }
        return cmdData;
    },

    /**
     * Builds the request based on sps standard.
     * @returns {string} the sps request
     * @memberof OSH.DataReceiver.PtzTasking
     * @instance
     */
    buildRequest: function(cmdData) {
        var xmlSpsRequest = "<sps:Submit ";

        // adds service
        xmlSpsRequest += "service=\""+this.properties.service+"\" ";

        // adds version
        xmlSpsRequest += "version=\""+this.properties.version+"\" ";

        // adds ns
        xmlSpsRequest += "xmlns:sps=\"http://www.opengis.net/sps/2.0\" xmlns:swe=\"http://www.opengis.net/swe/2.0\"> ";

        // adds procedure
        xmlSpsRequest += "<sps:procedure>"+this.properties.offeringID+"</sps:procedure>";

        // adds taskingParameters
        xmlSpsRequest += "<sps:taskingParameters><sps:ParameterData>";

        // adds encoding
        xmlSpsRequest += "<sps:encoding><swe:TextEncoding blockSeparator=\" \"  collapseWhiteSpaces=\"true\" decimalSeparator=\".\" tokenSeparator=\",\"/></sps:encoding>";

        // adds values
        xmlSpsRequest += "<sps:values>"+cmdData+"</sps:values>";

        // adds endings
        xmlSpsRequest += "</sps:ParameterData></sps:taskingParameters></sps:Submit>";

        return xmlSpsRequest;
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @augments OSH.DataSender.DataSink
 * From describe tasking:
 * swe:item name="relMove">
 <swe:Text definition="http://sensorml.com/ont/swe/property/CameraRelativeMovementName">
 <swe:label>Camera Relative Movements</swe:label>
 <swe:constraint>
 <swe:AllowedTokens>
 <swe:value>Down</swe:value>
 <swe:value>Up</swe:value>
 <swe:value>Left</swe:value>
 <swe:value>Right</swe:value>
 <swe:value>TopLeft</swe:value>
 <swe:value>TopRight</swe:value>
 <swe:value>BottomLeft</swe:value>
 <swe:value>BottomRight</swe:value>
 </swe:AllowedTokens>
 </swe:constraint>
 </swe:Text>
 </swe:item>

 <swe:item name="preset">
 <swe:Text definition="http://sensorml.com/ont/swe/property/CameraPresetPositionName">
 <swe:label>Preset Camera Position</swe:label>
 <swe:constraint>
 <swe:AllowedTokens>
 <swe:value>Reset</swe:value>
 <swe:value>TopMost</swe:value>
 <swe:value>BottomMost</swe:value>
 <swe:value>LeftMost</swe:value>
 <swe:value>RightMost</swe:value>
 </swe:AllowedTokens>
 </swe:constraint>
 </swe:Text>
 </swe:item>
 */
OSH.DataSender.FoscamPtzTasking = OSH.DataSender.PtzTasking.extend({

    getCommandData: function (values) {
        var cmdData = "";

        if (values.preset !== null) {
            cmdData = "preset," + values.preset;
        }else if(values.rzoom !== null) {
            cmdData = "zoom,";
            if (values.rzoom < 0) {
                cmdData += "out";
            } else {
                cmdData += "in";
            }
        } else {
            if (values.rpan != null && values.rtilt != null) {
                cmdData += "relMove,";

                if (values.rtilt !== null) {
                    if (values.rtilt < 0) {
                        cmdData += "Bottom";
                    } else {
                        cmdData += "Top";
                    }
                }

                if (values.rpan < 0) {
                    cmdData += "Left";
                } else {
                    cmdData += "Right";
                }
            } else {
                if (values.rpan !== null) {
                    cmdData += "relMove,";
                    if (values.rpan < 0) {
                        cmdData += "Left";
                    } else {
                        cmdData += "Right";
                    }
                    cmdData += " "; //block separator
                }

                if (values.rtilt !== null) {
                    cmdData += "relMove,";
                    if (values.rtilt < 0) {
                        cmdData += "Down";
                    } else {
                        cmdData += "Up";
                    }
                }
            }
        }
        return cmdData;
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2016 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoftware.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @augments OSH.DataSender.DataSource
 */
OSH.DataSender.UavMapTasking = OSH.DataSender.DataSink.extend({

    initialize: function(name, properties) {

        this._super(name, properties);

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_TAKEOFF, function (event) {
            this.connector.sendRequest(this.buildTakeOffRequest());            
        }.bind(this));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_GOTO, function (event) {
            this.connector.sendRequest(this.buildGotoRequest({lat: event.geoLat, lon: event.geoLon}));
        }.bind(this));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_ORBIT, function (event) {
            this.connector.sendRequest(this.buildOrbitRequest({lat: event.geoLat, lon: event.geoLon, radius: 10}));
        }.bind(this));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_LOOKAT, function (event) {
            this.connector.sendRequest(this.buildLookAtRequest({lat: event.geoLat, lon: event.geoLon}));
        }.bind(this));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_LAND, function (event) {
            this.connector.sendRequest(this.buildLandRequest({lat: event.geoLat, lon: event.geoLon}));
        }.bind(this));
    },


    /**
     * Builds the take off SPS request.
     * @param {string} props
     * @returns {string} the take off sps request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @instance
     */
    buildTakeOffRequest: function(props) {
        return this.buildRequest("navCommands,TAKEOFF,10");
    },



    /**
     * Builds the got to SPS request.
     * @param {string} props
     * @returns {string} the goto SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @instance
     */
    buildGotoRequest: function(props) {
        return this.buildRequest("navCommands,GOTO_LLA,"+props.lat+","+props.lon+",0,0");
    },


    /**
     * Builds the orbit SPS request.
     * @returns {string} the orbit SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @param {string} props
     * @instance
     */
    buildOrbitRequest: function(props) {
        return this.buildRequest("navCommands,ORBIT,"+props.lat+","+props.lon+",0,"+props.radius);
    },


    /**
     * Builds the lookat SPS request.
     * @returns {string} the lookat SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @param {string} props
     * @instance
     */
    buildLookAtRequest: function(props) {
        return this.buildRequest("camCommands,MOUNT_TARGET,"+props.lat+","+props.lon+",0");
    },


    /**
     * Builds the land SPS request.
     * @returns {string} the land SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @param {string} props
     * @instance
     */
    buildLandRequest: function(props) {
        return this.buildRequest("navCommands,LAND,"+props.lat+","+props.lon);
    },


    /**
     * Builds the request based on sps standard.
     * @param {string} the command data
     * @returns {string} the sps request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @instance
     */
    buildRequest: function(cmdData) {
        var xmlSpsRequest = "<sps:Submit ";

        // adds service
        xmlSpsRequest += "service=\""+this.properties.service+"\" ";

        // adds version
        xmlSpsRequest += "version=\""+this.properties.version+"\" ";

        // adds ns
        xmlSpsRequest += "xmlns:sps=\"http://www.opengis.net/sps/2.0\" xmlns:swe=\"http://www.opengis.net/swe/2.0\"> ";

        // adds procedure
        xmlSpsRequest += "<sps:procedure>"+this.properties.offeringID+"</sps:procedure>";

        // adds taskingParameters
        xmlSpsRequest += "<sps:taskingParameters><sps:ParameterData>";

        // adds encoding
        xmlSpsRequest += "<sps:encoding><swe:TextEncoding blockSeparator=\" \"  collapseWhiteSpaces=\"true\" decimalSeparator=\".\" tokenSeparator=\",\"/></sps:encoding>";

        // adds values
        xmlSpsRequest += "<sps:values>"+cmdData+"</sps:values>";

        // adds endings
        xmlSpsRequest += "</sps:ParameterData></sps:taskingParameters></sps:Submit>";

        document.fire("osh:log", xmlSpsRequest);

        return xmlSpsRequest;
    }

    
});

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This class is responsible for sending request to server.
 * @class
 * @param {Object} options
 */
OSH.DataSender.DataSenderController = BaseClass.extend({
    initialize: function (options) {
        this.dataSources = {};
    },

    /**
     * Adds a datasource to the list of datasources to process
     * @param {Object} datasource the datasource to add
     * @instance
     * @memberof OSH.DataSender.DataSenderController
     */
    addDataSource: function(dataSource) {
        this.dataSources[dataSource.getId()] = dataSource;
    },

    /**
     * Sends request to the server
     * @param {string} dataSourceId the datasource id to process
     * @param {Object} properties the properties to use
     * @param {function} onSucess the onSucess function
     * @param {function} onError the onError function
     * @instance
     * @memberof OSH.DataSender.DataSenderController
     */
    sendRequest: function(dataSourceId,properties, onSuccess, onError) {
        if (dataSourceId in this.dataSources) {
            // may be optimized. It is redefined the callback for every requests
            if(typeof(onSuccess) != "undefined" && onSuccess != null) {
                this.dataSources[dataSourceId].onSuccess = function(response) {
                    onSuccess(response);
                }
            }

            if(typeof(onError) != "undefined" && onError != null) {
                this.dataSources[dataSourceId].onError = function(response) {
                    onError(response);
                }
            }

            this.dataSources[dataSourceId].sendRequest(properties);
        }
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This class creates a log view. It catches "osh:log" events and display them into a internal dialog.
 * This view creates a dialog view
 * @class
 * @deprecated
 */
OSH.Log = BaseClass.extend({
    initialize:function(){
        this.logDiv = document.createElement("TEXTAREA");
        this.logDiv.setAttribute("class", "osh-log popup-content");
        this.logDiv.setAttribute("wrap","off");
        this.first = true;
        // appends <div> tag to <body>
        document.observe("dom:loaded", function() {
            var dialog = new OSH.UI.DialogView({
                title: "Logging console"
            });
            /*dialog.appendContent(this.logDiv);
            dialog.setContentSize("300px","400px");

            this.logDiv.value = "[osh-log]> \n";*/
        }.bind(this));

        document.observe("osh:log", function(event) {
            if(this.first) {
                this.logDiv.value = "[osh-log]> " + event.memo + "\n";
                this.first = false;
            } else {
                this.logDiv.value += "[osh-log]> " + event.memo + "\n";
            }
        }.bind(this));
    }
});

//var log = new OSH.Log();
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc The abstract object to represent a view.
 * @class
 * @param {Object} parentElementDivId - The parent html element div id to attach/or create the view.
 * @param {string} viewItems - The list of view items
 * @param {string} options - The options
 * @abstract
 */
OSH.UI.View = BaseClass.extend({
    initialize: function (parentElementDivId, viewItems,options) {
        // list of stylers
        this.stylers = [];
        this.contextMenus = [];
        this.viewItems = [];
        this.names = {};
        this.stylerToObj = {};
        this.stylerIdToStyler = {};
        this.lastRec = {};
        this.selectedDataSources = [];
        this.dataSources = [];

        //this.divId = divId;
        this.id = "view-" + OSH.Utils.randomUUID();

        this.dataSourceId = -1;
        // sets dataSourceId
        if(typeof(options) != "undefined" && typeof(options.dataSourceId) != "undefined") {
            this.dataSourceId = options.dataSourceId;
        }

        if(typeof(options) != "undefined" && typeof(options.entityId) != "undefined") {
            this.entityId = options.entityId;
        }
        this.css = "";

        this.cssSelected = "";

        if(typeof(options) != "undefined" && typeof(options.css) != "undefined") {
            this.css = options.css;
        }

        if(typeof(options) != "undefined" && typeof(options.cssSelected) != "undefined") {
            this.cssSelected = options.cssSelected;
        }

        // inits the view before adding the viewItem
        this.init(parentElementDivId,viewItems,options);
    },

    /**
     * Inits the view component.
     * @param parentElement The parent html element object to attach/create the view
     * @param viewItems the list of items to add
     * @param options [TODO]
     * @memberof OSH.UI.View
     */
    init:function(parentElementDivId,viewItems,options) {
        this.elementDiv = document.createElement("div");
        this.elementDiv.setAttribute("id", this.id);
        this.elementDiv.setAttribute("class", this.css);
        this.divId = this.id;

        var div = document.getElementById(parentElementDivId);

        if (typeof(div) == "undefined" || div == null) {
            document.body.appendChild(this.elementDiv);
            this.hide();
            this.container = document.body;
        } else {
            div.appendChild(this.elementDiv);
            this.container = div;
        }

        this.beforeAddingItems(options);

        if (typeof (viewItems) != "undefined") {
            for (var i =0;i < viewItems.length;i++) {
                this.addViewItem(viewItems[i]);
            }
        }

        if(typeof (options) != "undefined") {
            if(typeof (options.show) != "undefined") {
                document.getElementById(this.divId).style.display = (options.show)? "block": "none";
            }
        }
        this.handleEvents();

        // observes the event associated to the dataSourceId
        if(typeof(options) != "undefined" && typeof(options.dataSourceId) != "undefined") {
            OSH.EventManager.observe(OSH.EventManager.EVENT.DATA+"-"+options.dataSourceId, function (event) {
                if (event.reset)
                    this.reset(); // on data stream reset
                else
                    this.setData(options.dataSourceId, event.data);
            }.bind(this));
        }

        var self = this;
        var observer = new MutationObserver( function( mutations ){
            mutations.forEach( function( mutation ){
                // Was it the style attribute that changed? (Maybe a classname or other attribute change could do this too? You might want to remove the attribute condition) Is display set to 'none'?
                if( mutation.attributeName === 'style') {
                    self.onResize();

                }
            });
        } );

        // Attach the mutation observer to blocker, and only when attribute values change
        observer.observe( this.elementDiv, { attributes: true } );
    },

    /**
     * @instance
     * @memberof OSH.UI.View
     */
    hide: function() {
        this.elementDiv.style.display = "none";
    },

    /**
     * @instance
     * @memberof OSH.UI.View
     */
    onResize:function() {
    },

    /**
     *
     * @param divId
     * @instance
     * @memberof OSH.UI.View
     */
    attachTo : function(divId) {
        if(typeof this.elementDiv.parentNode != "undefined") {
            // detach from its parent
            this.elementDiv.parentNode.removeChild(this.elementDiv);
        }
        document.getElementById(divId).appendChild(this.elementDiv);
        if(this.elementDiv.style.display == "none") {
            this.elementDiv.style.display = "block";
        }

        this.onResize();
    },

    /**
     *
     * @param options
     * @instance
     * @memberof OSH.UI.View
     */
    beforeAddingItems: function (options) {

    },

    /**
     *
     * @returns {string|*}
     * @instance
     * @memberof OSH.UI.View
     */
    getId: function () {
        return this.id;
    },

    /**
     *
     * @returns {string|*}
     * @instance
     * @memberof OSH.UI.View
     */
    getDivId: function () {
        return this.divId;
    },

    /**
     *
     * @param dataSourceId
     * @param data
     * @instance
     * @memberof OSH.UI.View
     */
    setData: function(dataSourceId,data) {},

    /**
     * Show the view by removing display:none style if any.
     * @param properties
     * @instance
     * @memberof OSH.UI.View
     */
    show: function(properties) {
    },

    /**
     *
     * @param properties
     * @instance
     * @memberof OSH.UI.View
     */
    shows: function(properties) {
    },

    /**
     * Add viewItem to the view
     * @param viewItem
     * @instance
     * @memberof OSH.UI.View
     */
    addViewItem: function (viewItem) {
        this.viewItems.push(viewItem);
        if (viewItem.hasOwnProperty("styler")) {
            var styler = viewItem.styler;
            this.stylers.push(styler);
            if (viewItem.hasOwnProperty("name")) {
                this.names[styler.getId()] = viewItem.name;
            }
            styler.init(this);
            styler.viewItem = viewItem;
            this.stylerIdToStyler[styler.id] = styler;
        }
        if (viewItem.hasOwnProperty("contextmenu")) {
            this.contextMenus.push(viewItem.contextmenu);
        }
        //for(var dataSourceId in styler.dataSourceToStylerMap) {
        var ds = styler.getDataSourcesIds();
        for(var i =0; i < ds.length;i++) {
            var dataSourceId = ds[i];
            // observes the data come in
            var self = this;
            (function(frozenDataSourceId) { // use a close here to no share the dataSourceId variable

                OSH.EventManager.observe(OSH.EventManager.EVENT.DATA + "-" + frozenDataSourceId, function (event) {
                    
                    // skip data reset events for now
                    if (event.reset)
                        return;
                    
                    // we check selected dataSource only when the selected entity is not set
                    var selected = false;
                    if (typeof self.selectedEntity != "undefined") {
                        selected = (viewItem.entityId == self.selectedEntity);
                    }
                    else {
                        selected = (self.selectedDataSources.indexOf(frozenDataSourceId) > -1);
                    }

                    //TODO: maybe done into the styler?
                    styler.setData(frozenDataSourceId, event.data, self, {
                        selected: selected
                    });
                    self.lastRec[frozenDataSourceId] = event.data;
                });

                OSH.EventManager.observe(OSH.EventManager.EVENT.SELECT_VIEW, function(event) {
                    // we check selected dataSource only when the selected entity is not set
                    var selected = false;
                    if (typeof event.entityId != "undefined") {
                        selected = (viewItem.entityId == event.entityId);
                    }
                    else {
                        selected = (event.dataSourcesIds.indexOf(frozenDataSourceId) > -1);
                    }

                    if(frozenDataSourceId in self.lastRec) {
                        styler.setData(frozenDataSourceId, self.lastRec[frozenDataSourceId], self, {
                            selected: selected
                        });
                    }
                });

            })(dataSourceId); //passing the variable to freeze, creating a new closure
        }
    },

    /**
     * @instance
     * @memberof OSH.UI.View
     */
    handleEvents: function() {
        // observes the selected event
        OSH.EventManager.observe(OSH.EventManager.EVENT.SELECT_VIEW,function(event){
            this.selectDataView(event.dataSourcesIds,event.entityId);
        }.bind(this));

        // observes the SHOW event
        OSH.EventManager.observe(OSH.EventManager.EVENT.SHOW_VIEW,function(event){
            this.show(event);
        }.bind(this));

        OSH.EventManager.observe(OSH.EventManager.EVENT.ADD_VIEW_ITEM,function(event){
            if(typeof event.viewId != "undefined" && event.viewId == this.id) {
                this.addViewItem(event.viewItem);
            }
        }.bind(this));

        OSH.EventManager.observe(OSH.EventManager.EVENT.RESIZE+"-"+this.divId,function(event){
            this.onResize();
        }.bind(this));
    },

    /**
     * Should be called after receiving osh:SELECT_VIEW event
     * @param $super
     * @param dataSourcesIds
     * @param entitiesIds
     * @instance
     * @memberof OSH.UI.View
     */
    selectDataView: function (dataSourcesIds,entityId) {
        if(typeof this.dataSources != "undefined") {
            this.selectedDataSources = dataSourcesIds;
            // set the selected entity even if it is undefined
            // this is handled by the setData function
            this.selectedEntity = entityId;
            for (var j = 0; j < this.dataSources.length; j++) {
                this.setData(this.dataSources[j], this.lastRec[this.dataSources[j]]);
            }
        }
    },

    /**
     *
     * @returns {Array}
     * @instance
     * @memberof OSH.UI.View
     */
    getDataSourcesId: function() {
        var res = [];
        if(this.dataSourceId != -1) {
            res.push(this.dataSourceId);
        }

        // check for stylers
        for(var i = 0; i < this.viewItems.length;i++) {
            var viewItem = this.viewItems[i];
            if (viewItem.hasOwnProperty("styler")) {
                var styler = viewItem.styler;
                res = res.concat(styler.getDataSourcesIds());
            }
        }

        return res;
    },

    /**
     * @instance
     * @memberof OSH.UI.View
     */
    reset: function() {
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc This class is an abstract class for ContextMenu.
 * @abstract
 * @class OSH.UI.ContextMenu
 * @listens {@link OSH.EventManager.EVENT.CONTEXT_MENU}
 * @param {Object} properties the properties object
 * @param {string} properties.id the context menu id
 */
OSH.UI.ContextMenu = BaseClass.extend({
	initialize : function(properties) {
		if(typeof  properties != "undefined" && typeof  properties.id != "undefined") {
			this.id = properties.id;
		} else {
			this.id = "contextMenu-" + OSH.Utils.randomUUID();
		}
		this.handleEvents();
	},

	/**
	 * Shows the context menu
	 * @memberof OSH.UI.ContextMenu
	 * @instance
	 */
	show:function() {},

	/**
	 * Hides the context menu
	 * @memberof OSH.UI.ContextMenu
	 * @instance
	 */
	hide:function() {},

	/**
	 * Inits events
	 * @memberof OSH.UI.ContextMenu
	 * @instance
	 */
	handleEvents:function() {
		/*
		 * @event {@link OSH.EventManager.EVENT.CONTEXT_MENU}
		 * @type {Object}
		 * @property {Object} event
		 * @property {string} action - show | hide
		 */
		OSH.EventManager.observe(OSH.EventManager.EVENT.CONTEXT_MENU+"-"+this.id,function(event) {
			if(event.action == "show") {
				this.show(event);
			} else if(event.action == "hide") {
				this.hide();
			}
		}.bind(this));
	}
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @class
 * @classdesc A css context menu allowing to create various context menu using only css.
 * @type {OSH.UI.ContextMenu}
 * @augments OSH.UI.ContextMenu
 */
OSH.UI.ContextMenu.CssMenu = OSH.UI.ContextMenu.extend({
    initialize:function(properties,type) {
        this._super(properties);

        this.items = [];
        if(typeof(type) != "undefined") {
            this.type = type;
        } else {
            this.type = "";
        }

        if(typeof(properties) != "undefined") {
            if(typeof (properties.items) != "undefined") {
                for(var i = 0;i < properties.items.length;i++) {
                    var elId = OSH.Utils.randomUUID();
                    var htmlVar = "<a  id=\""+elId+"\" ";
                    if(typeof (properties.items[i].css) != "undefined"){
                        htmlVar += "class=\""+properties.items[i].css+"\" ";
                    }
                    var name = "";
                    if(typeof (properties.items[i].name) != "undefined") {
                        name = properties.items[i].name;
                    }
                    htmlVar += "title=\""+name+"\"";
                    htmlVar += "><span id =\""+elId+"\"class=\""+this.type+"-menu-label\">"+name+"</span><\/a>";

                    //htmlVar += "<label for=\""+elId+"\" class=\""+this.type+"-menu-label\">"+name+"</label></div>";

                    var action = "";
                    if(typeof (properties.items[i].action) != "undefined") {
                        action = properties.items[i].action;
                    }
                    var viewId = "";
                    if(typeof (properties.items[i].viewId) != "undefined") {
                        viewId = properties.items[i].viewId;
                    }
                    this.items.push({
                        html : htmlVar,
                        id : elId,
                        action : action,
                        viewId : viewId
                    })
                }
            }
        }
    },
    /**
     *
     * @param $super
     * @param {Object} properties
     * @param {number} properties.offsetX - the x offset to shift the menu
     * @param {number} properties.offsetY - the y offset to shift the menu
     * @instance
     * @memberof OSH.UI.ContextMenu.CssMenu
     */
    show:function(properties) {
        this.removeElement();
        var closeId = OSH.Utils.randomUUID();
        var videoId = OSH.Utils.randomUUID();

        var htmlVar="";
        htmlVar += "<div class=\""+this.type+"-menu\">";
        htmlVar += "  <div class=\""+this.type+"-menu-circle\">";
        // adds items
        for(var i = 0; i < this.items.length; i++) {
            htmlVar += this.items[i].html;
        }
        htmlVar += "  <\/div>";
        htmlVar += "  <a id=\""+closeId+"\"class=\""+this.type+"-menu-button fa fa-times fa-2x\"><\/a>";
        htmlVar += "<\/div>";

        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("class",""+this.type+"-menu-container");
        this.rootTag.innerHTML = htmlVar;

        document.body.appendChild(this.rootTag);

        var items = document.querySelectorAll('.'+this.type+'-menu-circle a');

        for(var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
            items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        }

        document.getElementById(closeId).onclick = this.hide.bind(this);

        var offsetX = 0;
        var offsetY = 0;

        if(properties.offsetX) {
            offsetX = properties.offsetX;
        }

        if(properties.offsetY) {
            offsetY = properties.offsetY;
        }

        document.querySelector('.'+this.type+'-menu-circle').classList.toggle('open');

        if(typeof properties.x != "undefined") {
            this.rootTag.style.left = properties.x + offsetX;
        }
        if(typeof properties.y != "undefined") {
            this.rootTag.style.top = properties.y + offsetY;
        }

        // binds actions based on items
        this.bindEvents = {};
        for(var i = 0; i < this.items.length; i++) {
            var item =  this.items[i];
            this.bindEvents[item.id] = item.viewId;
            document.getElementById(item.id).onclick = function(event) {
                OSH.EventManager.fire(OSH.EventManager.EVENT.SHOW_VIEW, {
                    viewId: this.bindEvents[event.target.id]
                });
            }.bind(this);
        }

        // this causes preventing any closing event
        this.rootTag.onmousedown = function(event) {
            event.preventDefault();
            event.stopPropagation();
        }
    },

    /**
     * Hides the menu
     * @param $super
     * @instance
     * @memberof OSH.UI.ContextMenu.CssMenu
     */
    hide:function($super){
        document.querySelector('.'+this.type+'-menu-circle').classList.toggle('open');
        this.removeElement();
    },

    /**
     * @instance
     * @memberof OSH.UI.ContextMenu.CssMenu
     */
    removeElement: function() {
        if(typeof(this.rootTag) != "undefined" && this.rootTag != null && typeof(this.rootTag.parentNode) != "undefined") {
            this.rootTag.parentNode.removeChild(this.rootTag);
            this.rootTag = null;
        }
    },

    /**
     * @instance
     * @memberof OSH.UI.ContextMenu.CssMenu
     */
    getTransform: function(el) {
        var transform = el.style.transform;
        if(!transform || 0 === transform.length) {
            return "";
        }
        var regExp = /^\s*((\w+)\s*\(([^)]+)\))/;
        var matches = regExp.exec(transform);

        return matches[1];
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc A circular context menu
 * @class
 * @type {OSH.UI.ContextMenu.CssMenu}
 * @augments OSH.UI.ContextMenu.CssMenu
 * @example
 * var menuItems = [{
        name: "Item 1",
        viewId: viewId,
        css: "someCssClass"
   },{
        name: "Item 2",
        viewId: viewId2,
        css: "someCssClass"
   }];

  var contextCircularMenu = new OSH.UI.ContextMenu.CircularMenu({id : randomId,groupId: randomGroupId,items : menuItems});
 */
OSH.UI.ContextMenu.CircularMenu = OSH.UI.ContextMenu.CssMenu.extend({
    initialize:function(properties) {
        this._super(properties,"circular");
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc A stack context menu
 * @class
 * @type {OSH.UI.ContextMenu.CssMenu}
 * @augments OSH.UI.ContextMenu.CssMenu
 * @example
 * var menuItems = [{
        name: "Item 1",
        viewId: viewId,
        css: "someCssClass"
   },{
        name: "Item 2",
        viewId: viewId2,
        css: "someCssClass"
   }];

   var contextStackMenu = new OSH.UI.ContextMenu.StackMenu({id : randomId,groupId: randomGroupId,items : menuItems});
 */
OSH.UI.ContextMenu.StackMenu = OSH.UI.ContextMenu.CssMenu.extend({
    initialize:function(properties) {
        this._super(properties,"stack");
    },

    /**
     * Shows the context menu.
     * @param $super
     * @param properties
     * @instance
     * @memberof OSH.UI.ContextMenu.StackMenu
     */
    show:function(properties) {
        this.removeElement();
        var htmlVar="";
        htmlVar += "  <div class=\""+this.type+"-menu-circle\">";
        // adds items
        for(var i = 0; i < this.items.length; i++) {
            htmlVar += this.items[i].html;
        }
        htmlVar += "  <\/div>";

        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("class",""+this.type+"-menu-container");
        this.rootTag.innerHTML = htmlVar;

        if(typeof properties.div != "undefined") {
            properties.div.appendChild(this.rootTag);
        } else {
            document.body.appendChild(this.rootTag);
        }

        var offsetX = 0;
        var offsetY = 0;

        if(properties.offsetX) {
            offsetX = properties.offsetX;
        }

        if(properties.offsetY) {
            offsetY = properties.offsetY;
        }

        if(typeof properties.x != "undefined") {
            this.rootTag.style.left = properties.x + offsetX;
        }
        if(typeof properties.y != "undefined") {
            this.rootTag.style.top = properties.y + offsetY;
        }

        document.querySelector('.'+this.type+'-menu-circle').classList.toggle('open');

        // binds actions based on items
        this.bindEvents = {};
        for(var i = 0; i < this.items.length; i++) {
            var item =  this.items[i];
            this.bindEvents[item.id] = item.viewId;
            document.getElementById(item.id).onclick = function(event){
                OSH.EventManager.fire(OSH.EventManager.EVENT.SHOW_VIEW, {
                    viewId: this.bindEvents[event.target.id]
                });
            }.bind(this);
        }

        // this causes preventing any closing event
        this.rootTag.onmousedown = function(event) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class OSH.UI.Styler
 * @abstract
 */
OSH.UI.Styler = BaseClass.extend({
	initialize : function(jsonProperties) {
		this.properties = jsonProperties;
		this.id = "styler-" + OSH.Utils.randomUUID();

		this.dataSourceToStylerMap = {};

		this.initEvents();
	},

	/**
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	initEvents:function() {
		OSH.EventManager.observe(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME,function(event){
			this.clear();
		}.bind(this));
	},

	/**
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	clear: function() {

	},

	/**
	 * @param {string} dataSourceId the datasource id
	 * @param {Object} data the data
	 * @param {OSH.View} view the osh.view
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	setData : function(dataSourceId, data, view) {
	},

	/**
	 * Gets the styler id.
	 * @returns {string} the styler id
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	getId : function() {
		return this.id;
	},

	/**
	 * Selects the datasource contained into the list
	 * @param {Array} dataSourceIds the list of datasources
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	select : function(dataSourceIds) {
	},

	/**
	 * Adds a function
	 * @param {Array} dataSourceIds the list of datasources
	 * @param {function} fn the function to apply
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	addFn : function(dataSourceIds, fn) {
		for (var i = 0; i < dataSourceIds.length; i++) {
			var dataSourceId = dataSourceIds[i];
			if (typeof (this.dataSourceToStylerMap[dataSourceId]) == "undefined") {
				this.dataSourceToStylerMap[dataSourceId] = [];
			}
			this.dataSourceToStylerMap[dataSourceId].push(fn);
		}
	},

	/**
	 *
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @returns {boolean}
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	setData : function(dataSourceId, rec, view, options) {
		if (dataSourceId in this.dataSourceToStylerMap) {
			var fnArr = this.dataSourceToStylerMap[dataSourceId];
			for (var i = 0; i < fnArr.length; i++) {
				fnArr[i](rec.data, rec.timeStamp, options);
			}
			return true;
		} else {
			return false;
		}
	},

	/**
	 *
	 * @returns {Array}
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	getDataSourcesIds : function() {
		var res = [];
		for ( var i in this.dataSourceToStylerMap) {
			res.push(i);
		}
		return res;
	},

	/**
	 * @memberof OSH.UI.Styler
	 * @instance
	 */
	init: function() {}
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoft.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class OSH.UI.Styler.ImageDraping
 * @type {OSH.UI.Styler}
 * @augments OSH.UI.Styler
 */
OSH.UI.Styler.ImageDraping = OSH.UI.Styler.extend({
	initialize : function(properties) {
		this._super(properties);
		this.properties = properties;
		this.platformLocation = null;
		this.platformOrientation = null;
		this.gimbalOrientation = null;
		this.cameraModel = null;
		this.imageSrc = null;
		this.snapshotFunc = null;
		
		this.options = {};
		
		if (typeof(properties.platformLocation) != "undefined"){
			this.platformLocation = properties.platformLocation;
		} 
		
		if (typeof(properties.platformOrientation) != "undefined"){
			this.platformOrientation = properties.platformOrientation;
		} 
		
		if (typeof(properties.gimbalOrientation) != "undefined"){
			this.gimbalOrientation = properties.gimbalOrientation;
		} 
		
		if (typeof(properties.cameraModel) != "undefined"){
			this.cameraModel = properties.cameraModel;
		}
		
		if (typeof(properties.imageSrc) != "undefined"){
			this.imageSrc = properties.imageSrc;
		} 
		
		if (typeof(properties.platformLocationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.platformLocation = properties.platformLocationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.platformLocationFunc.dataSourceIds,fn);
		}
		
		if (typeof(properties.platformOrientationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.platformOrientation = properties.platformOrientationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.platformOrientationFunc.dataSourceIds,fn);
		}
		
		if (typeof(properties.gimbalOrientationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.gimbalOrientation = properties.gimbalOrientationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.gimbalOrientationFunc.dataSourceIds,fn);
		}
		
		if (typeof(properties.cameraModelFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.cameraModel = properties.cameraModelFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.cameraModelFunc.dataSourceIds,fn);
		}
		
		if (typeof(properties.snapshotFunc) != "undefined") {
			this.snapshotFunc = properties.snapshotFunc;
		}
	},

	/**
	 *
	 * @param $super
	 * @param view
	 * @memberof  OSH.UI.Styler.ImageDraping
	 * @instance
	 */
	init: function(view) {
		this._super(view);
	},

	/**
	 *
	 * @param $super
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @memberof  OSH.UI.Styler.ImageDraping
	 * @instance
	 */
	setData: function(dataSourceId,rec,view,options) {
		if (this._super(dataSourceId,rec,view,options)) {
			
			var enabled = true;
			var snapshot = false;
			if (this.snapshotFunc != null)
			    snapshot = this.snapshotFunc();
			
			if (typeof(view) != "undefined" && enabled &&
				this.platformLocation != null &&
				this.platformOrientation != null &&
				this.gimbalOrientation != null &&
				this.cameraModel != null &&
				this.imageSrc != null) {
				    view.updateDrapedImage(this,rec.timeStamp,options,snapshot);
			}
		}
	}

});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class OSH.UI.Styler.Curve
 * @type {OSH.UI.Style}
 * @augments OSH.UI.Styler
 */
OSH.UI.Styler.Curve = OSH.UI.Styler.extend({
	initialize : function(properties) {
		this._super(properties);
		this.xLabel = "";
		this.yLabel = "";
		this.color = "#000000";
		this.stroke = 1;
		this.x = 0;
		this.y = [];
		
		if(typeof(properties.stroke) != "undefined"){
			this.stroke = properties.stroke;
		} 
		
		if(typeof(properties.color) != "undefined"){
			this.color = properties.color;
		} 
		
		if(typeof(properties.x) != "undefined"){
			this.x = properties.x;
		} 
		
		if(typeof(properties.y) != "undefined"){
			this.y = properties.y;
		} 
		
		if(typeof(properties.strokeFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.stroke = properties.strokeFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.strokeFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.color = properties.colorFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.colorFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.valuesFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				var values = properties.valuesFunc.handler(rec,timeStamp,options);
				this.x = values.x;
				this.y = values.y;
			}.bind(this);
			this.addFn(properties.valuesFunc.dataSourceIds,fn);
		}
	},

	/**
	 * @param $super
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @instance
	 * @memberof OSH.UI.Styler.Curve
	 */
	setData: function(dataSourceId,rec,view,options) {
		if(this._super(dataSourceId,rec,view,options)) {
			//if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
			if(typeof(view) != "undefined") {
				view.updateCurve(this,rec.timeStamp,options);
			}
		}
	}
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoft.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class OSH.UI.Styler.Nexrad
 * @type {OSH.UI.Styler}
 * @augments OSH.UI.Styler
 */
OSH.UI.Styler.Nexrad = OSH.UI.Styler.extend({
	initialize : function(properties) {
		this._super(properties);
		this.properties = properties;
		this.location = null;
		this.radialData = null;
		
		this.options = {};
		
		if (typeof(properties.location) != "undefined"){
			this.location = properties.location;
		}  
		
		if (typeof(properties.radialData) != "undefined"){
			this.radialData = properties.radialData;
		} 
		
		if (typeof(properties.locationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.location = properties.locationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.locationFunc.dataSourceIds,fn);
		}
		
		if (typeof(properties.radialDataFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.radialData = properties.radialDataFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.radialDataFunc.dataSourceIds,fn);
		}
		
		this.reflectivityColorMap = [
			Cesium.Color.fromBytes(100, 100, 100),
			Cesium.Color.fromBytes(204, 255, 255),
			Cesium.Color.fromBytes(204, 153, 204),
			Cesium.Color.fromBytes(153, 102, 153),
			Cesium.Color.fromBytes(102,  51, 102),
			Cesium.Color.fromBytes(204, 204, 153),
			Cesium.Color.fromBytes(153, 153, 102),
			Cesium.Color.fromBytes(100, 100, 100),
			Cesium.Color.fromBytes(  4, 233, 231),
			Cesium.Color.fromBytes(  1, 159, 244),
			Cesium.Color.fromBytes(  3,   0, 244),
			Cesium.Color.fromBytes(  2, 253,   2),
			Cesium.Color.fromBytes(  1, 197,   1),
			Cesium.Color.fromBytes(  0, 142,   0),
			Cesium.Color.fromBytes(253, 248,   2),
			Cesium.Color.fromBytes(229, 188,   0),
			Cesium.Color.fromBytes(253, 149,   0),
			Cesium.Color.fromBytes(253,   0,   0),
			Cesium.Color.fromBytes(212,   0,   0),
			Cesium.Color.fromBytes(188,   0,   0),
			Cesium.Color.fromBytes(248,   0, 253),
			Cesium.Color.fromBytes(152,  84, 198),
			Cesium.Color.fromBytes(253, 253, 253)
		];
		
		this.pointCollection = new Cesium.PointPrimitiveCollection();
		this.radialCount = 0;
	},

	/**
	 *
	 * @param $super
	 * @param view
	 * @instance
	 * @memberof OSH.UI.Styler.Nexrad
	 */
	init: function(view) {
		this._super(view);
	},

	/**
	 *
	 * @param $super
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @instance
	 * @memberof OSH.UI.Styler.Nexrad
	 */
	setData: function(dataSourceId,rec,view,options) {
		if (this._super(dataSourceId,rec,view,options)) {
			if (typeof(view) != "undefined") {
				
				var DTR = Math.PI/180;
				
				// keep only first elevation
				if (rec.data.elevation > 0.7)
					return;
				
				// draw directly in Cesium view
				var radarLoc = Cesium.Cartesian3.fromDegrees(this.location.x, this.location.y, this.location.z);
				var quat = Cesium.Transforms.headingPitchRollQuaternion(radarLoc, (rec.data.azimuth-90)*DTR, rec.data.elevation*DTR, 0.0);
				var rotM = Cesium.Matrix3.fromQuaternion(quat);
				
				var points = new Cesium.PointPrimitiveCollection();
				var dist0 = rec.data.rangeToCenterOfFirstRefGate;
				var step = rec.data.refGateSize;
				for (var i=0; i<rec.data.reflectivity.length; i++) {
					
				   var val = rec.data.reflectivity[i];
				   
				   // skip points that are out of range
				   if (val < -32 || val > 94.5)
					  continue;
				   
				   var gatePos = new Cesium.Cartesian3(dist0 + i*step, 0, 0);
				   Cesium.Matrix3.multiplyByVector(rotM, gatePos, gatePos);
				   
				   // apply color map and add point to collection
				   this.pointCollection.add({
					  position : Cesium.Cartesian3.add(radarLoc, gatePos, gatePos),
					  color : this.getReflectivityColor(val),
					  pixelSize : 3
				   });
				}
				
				this.radialCount++;
				if (this.radialCount == 100)
			    {
					view.viewer.scene.primitives.add(this.pointCollection);
					this.pointCollection = new Cesium.PointPrimitiveCollection();
					this.radialCount = 0;
			    }
			}
		}
	},

	/**
	 *
	 * @param val
	 * @returns {*}
	 * @instance
	 * @memberof OSH.UI.Styler.Nexrad
	 */
	getReflectivityColor: function(val)
	{
		var index = Math.floor((val + 30) / 5) + 1;
	    return this.reflectivityColorMap[index];
	}

});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @class OSH.UI.Styler.Polyline
 * @classdesc
 * @type {OSH.UI.Styler}
 * @augments OSH.UI.Styler
 * @example
 * var polylineStyler = new OSH.UI.Styler.Polyline({
		locationFunc : {
			dataSourceIds : [datasource.getId()],
			handler : function(rec) {
				return {
					x : rec.lon,
					y : rec.lat,
					z : rec.alt
				};
			}
		},
		color : 'rgba(0,0,255,0.5)',
		weight : 10,
		opacity : .5,
		smoothFactor : 1,
		maxPoints : 200
	});
 */
OSH.UI.Styler.Polyline = OSH.UI.Styler.extend({
	initialize : function(properties) {
		this._super(properties);
		this.properties = properties;
		this.locations = [];
     	this.color = 'red';
		this.weight = 1;
		this.opacity = 1;
		this.smoothFactor = 1;
		this.maxPoints = 10;
		
		if(typeof(properties.color) != "undefined"){
			this.color = properties.color;
		} 
		
		if(typeof(properties.weight) != "undefined"){
			this.weight = properties.weight;
		} 
		
		if(typeof(properties.opacity) != "undefined"){
			this.opacity = properties.opacity;
		} 
		
		if(typeof(properties.smoothFactor) != "undefined"){
			this.smoothFactor = properties.smoothFactor;
		} 
		
		if(typeof(properties.maxPoints) != "undefined"){
			this.maxPoints = properties.maxPoints;
		} 
		
		if(typeof(properties.locationFunc) != "undefined") {
			var fn = function(rec) {
				var loc = properties.locationFunc.handler(rec);
				this.locations.push(loc);
				if(this.locations.length > this.maxPoints) {
					this.locations.shift();
				}
			}.bind(this);
			this.addFn(properties.locationFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec) {
				this.color = properties.colorFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.colorFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.weightFunc) != "undefined") {
			var fn = function(rec) {
				this.weight = properties.weightFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.weightFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.opacityFunc) != "undefined") {
			var fn = function(rec) {
				this.opacity = properties.opacityFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.opacityFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.smoothFactorFunc) != "undefined") {
			var fn = function(rec) {
				this.smoothFactor = properties.smoothFactorFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.smoothFactorFunc.dataSourceIds,fn);
		}
	},

	/**
	 *
	 * @param $super
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @instance
	 * @memberof OSH.UI.Styler.Polyline
	 */
	setData: function(dataSourceId,rec,view,options) {
		if(this._super(dataSourceId,rec,view,options)) {
			if(typeof(view) != "undefined" && typeof view.updatePolyline === 'function'){
				view.updatePolyline(this);
			}
		}
	},

	/**
	 *
	 * @param $super
	 * @instance
	 * @memberof OSH.UI.Styler.Polyline
	 */
	clear: function($super) {
		this.locations = [];
	}
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class OSH.UI.Styler.PointMarker
 * @type {OSH.UI.Styler}
 * @augments OSH.UI.Styler
 * @example
 * var pointMarker = new OSH.UI.Styler.PointMarker({
        location : {
            x : 1.42376557,
            y : 43.61758626,
            z : 100
        },
        locationFunc : {
            dataSourceIds : [androidPhoneGpsDataSource.getId()],
            handler : function(rec) {
                return {
                    x : rec.lon,
                    y : rec.lat,
                    z : rec.alt
                };
            }
        },
        orientationFunc : {
            dataSourceIds : [androidPhoneOrientationDataSource.getId()],
            handler : function(rec) {
                return {
                    heading : rec.heading
                };
            }
        },
        icon : 'images/cameralook.png',
        iconFunc : {
            dataSourceIds: [androidPhoneGpsDataSource.getId()],
            handler : function(rec,timeStamp,options) {
                if(options.selected) {
                    return 'images/cameralook-selected.png'
                } else {
                    return 'images/cameralook.png';
                };
            }
        }
    });
 */
OSH.UI.Styler.PointMarker = OSH.UI.Styler.extend({
	initialize : function(properties) {
		this._super(properties);
		this.properties = properties;
		this.location = null;
		this.orientation = {heading:0};
		this.icon = null;
		this.iconAnchor = [16,16];
		this.label = null;
		this.color = "#000000";
		
		this.options = {};
		
		if(typeof(properties.location) != "undefined"){
			this.location = properties.location;
		} 
		
		if(typeof(properties.orientation) != "undefined"){
			this.orientation = properties.orientation;
		} 
		
		if(typeof(properties.icon) != "undefined"){
			this.icon = properties.icon;
		}
		
		if(typeof(properties.iconAnchor) != "undefined"){
            this.iconAnchor = properties.iconAnchor;
        }
		
		if(typeof(properties.label) != "undefined"){
			this.label = properties.label;
		}
		
		if(typeof(properties.color) != "undefined"){
			this.color = properties.color;
		} 
		
		if(typeof(properties.locationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.location = properties.locationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.locationFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.orientationFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.orientation = properties.orientationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.orientationFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.iconFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.icon = properties.iconFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.iconFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.labelFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.label = properties.labelFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.labelFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.color = properties.colorFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.colorFunc.dataSourceIds,fn);
		}
	},

	/**
	 *
	 * @param $super
	 * @param view
	 * @memberof OSH.UI.Styler.PointMarker
	 * @instance
	 */
	init: function(view) {
		this._super(view);
		if(typeof(view) != "undefined" && this.location != null) {
			view.updateMarker(this,0,{});
		}
	},

	/**
	 *
	 * @param $super
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @memberof OSH.UI.Styler.PointMarker
	 * @instance
	 */
	setData: function(dataSourceId,rec,view,options) {
		if(this._super(dataSourceId,rec,view,options)) {
			if (typeof(view) != "undefined" && this.location != null) {
				view.updateMarker(this, rec.timeStamp, options);
			}
		}
	},

	/**
	 *
	 * @param $super
	 * @memberof OSH.UI.Styler.PointMarker
	 * @instance
	 */
	clear:function($super){
	}

});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class OSH.UI.Nvd3CurveChartView
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
// Chart View
var windSpeedChartView = new OSH.UI.Nvd3CurveChartView(chartDialog.popContentDiv.id, [{
    styler: new OSH.UI.Styler.Curve({
        valuesFunc: {
            dataSourceIds: [weatherDataSource.getId()],
            handler: function(rec, timeStamp) {
                return {
                    x: timeStamp,
                    y: parseFloat(rec[2])
                };
            }
        }
    })
}], {
    name: "WindSpeed chart",
    yLabel: 'Wind Speed (m/s)',
    xLabel: 'Time',
    css: "chart-view",
    cssSelected: "video-selected",
    maxPoints: 30
});
 */
OSH.UI.Nvd3CurveChartView = OSH.UI.View.extend({
	initialize : function(parentElementDivId,viewItems, options) {
		this._super(parentElementDivId,viewItems,options);

		this.entityId = options.entityId;
		var xLabel = 'Time';
		var yLabel = 'yLabel';
		var xTickFormat = null;

		var yTickFormat = d3.format('.02f');
		var useInteractiveGuideline = true;
		var showLegend = true;
		var showYAxis = true;
		var showXAxis = true;
		var transitionDuration = 1;
		var maxPoints = 999;

		if (typeof (options) != "undefined") {
			if (options.xLabel) {
				var xLabel = options.xLabel;
			}

			if (options.yLabel) {
				var yLabel = options.yLabel;
			}

			if (options.xTickFormat) {
				xTickFormat = options.xTickFormat;
			}

			if (options.yTickFormat) {
				yTickFormat = options.yTickFormat;
			}

			if (options.showLegend) {
				showLegend = options.showLegend;
			}

			if (options.showXAxis) {
				showXAxis = options.showXAxis;
			}

			if (options.showYAxis) {
				showYAxis = options.showYAxis;
			}

			if (options.useInteractiveGuideline) {
				useInteractiveGuideline = options.useInteractiveGuideline;
			}

			if (options.transitionDuration) {
				transitionDuration = options.transitionDuration;
			}
			if (options.maxPoints) {
				this.maxPoints = options.maxPoints;
			}
		}

		this.chart = nv.models.lineChart().margin({
			left : 75,
			right : 25
		}) //Adjust chart margins to give the x-axis some breathing room.
		.options({
			duration : 1, // This should be duration: 300
			useInteractiveGuideline : useInteractiveGuideline
		}) //We want nice looking tooltips and a guideline!
		.duration(1)
		//.transitionDuration(1) //how fast do you want the lines to transition?
		.showLegend(showLegend) //Show the legend, allowing users to turn on/off line series.
		.showYAxis(showYAxis) //Show the y-axis
		.showXAxis(showXAxis) //Show the x-axis
		// .forceY([27.31,28])
		;

		this.chart.xAxis //Chart x-axis settings
		.axisLabel(xLabel).tickFormat(function(d) {
			return d3.time.format.utc('%H:%M:%SZ')(new Date(d))
		});

		this.chart.yAxis //Chart y-axis settings
		.axisLabel(yLabel).tickFormat(d3.format('.02f'))
		.axisLabelDistance(15);

		this.css = document.getElementById(this.divId).className;

		if(typeof (options) != "undefined") {
			if (options.css) {
				this.css += " " + options.css;
			}

			if (options.cssSelected) {
				this.cssSelected = options.cssSelected;
			}
		}

		//create svg element
		var svg = document.createElementNS(d3.ns.prefix.svg, 'svg');

		this.div = document.getElementById(this.divId);
		this.div.appendChild(svg);

		this.div.style.width = this.width;
		this.div.style.height = this.height;
		
		this.svgChart = d3.select('#' + this.divId + ' svg'); //Select the <svg> element you want to render the chart in.

		var self =this;
		OSH.EventManager.observeDiv(this.divId,"click",function(event){
			OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
				dataSourcesIds: self.getDataSourcesId(),
				entityId : self.entityId
			});
		});

	},

	/**
	 *
	 * @param styler
	 * @param timestamp
	 * @param options
	 * @instance
	 * @memberof OSH.UI.Nvd3CurveChartView
	 */
	updateCurve : function(styler, timestamp, options) {
		if (typeof (this.data) === "undefined") {
			this.d3Data = [];	
			var name = options.name;

			this.data = {
				values : [],
				key : this.names[styler.getId()],
				interpolate : "cardinal",
				area : true,
			}

			this.data.values.push({
				y : styler.y,
				x : styler.x
			});
			
			this.svgChart
					.datum([this.data]) //Populate the <svg> element with chart data...
					.call(this.chart);

		} else {
			this.data.values.push({
				y : styler.y,
				x : styler.x
			});
		}

		this.chart.update();
		if (this.data.values.length > this.maxPoints) {
			this.data.values.shift();
		}
	},

	/**
	 *
	 * @param $super
	 * @param dataSourceIds
	 * @instance
	 * @memberof OSH.UI.Nvd3CurveChartView
	 */
	selectDataView: function(dataSourceIds) {
		var currentDataSources= this.getDataSourcesId();
		if(OSH.Utils.isArrayIntersect(dataSourceIds,currentDataSources)) {
			this.div.setAttribute("class",this.css+" "+this.cssSelected);
		} else {
			this.div.setAttribute("class",this.css);
		}
	},
	
	/**
     * @instance
     * @memberof OSH.UI.Nvd3CurveChartView
     */
    reset: function () {
        this.data.values = [];
        this.chart.update();
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class OSH.UI.DiscoveryView
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
var discoveryView = new OSH.UI.DiscoveryView("discovery-container",{
    services: ["http://sensiasoft.net:8181/"],
    views: [{
        name: 'Video dialog(H264)',
        type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_H264
    },{
        name: 'Video dialog(MJPEG)',
        type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_MJPEG
    },{
        name: 'Chart dialog',
        type : OSH.UI.DiscoveryView.Type.DIALOG_CHART
    }
    ]
});

//------ More complex example
 var discoveryView = new OSH.UI.DiscoveryView("",{
        services: ["http://sensiasoft.net:8181/"], // server list
        css: "discovery-view",
        dataReceiverController:dataProviderController, // add custom dataProviderController
        swapId: "main-container", // add a divId to swap data for inner dialog
        entities: [androidEntity], // add entities
        views: [{
            name: 'Leaflet 2D Map',
            viewId: leafletMainView.id,
            type : OSH.UI.DiscoveryView.Type.MARKER_GPS
        }, {
            name: 'Cesium 3D Globe',
            viewId: cesiumMainMapView.id,
            type : OSH.UI.DiscoveryView.Type.MARKER_GPS
        },{
            name: 'Video dialog(H264)',
            type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_H264
        },{
            name: 'Video dialog(MJPEG)',
            type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_MJPEG
        },{
            name: 'Chart dialog',
            type : OSH.UI.DiscoveryView.Type.DIALOG_CHART
        }
        ]
    });
 */
OSH.UI.DiscoveryView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, properties) {
        this._super(parentElementDivId,[],properties);

        this.dialogContainer = document.body.id;
        this.swapId = "";
        if(typeof properties !== "undefined") {
            if(typeof properties.dataReceiverController !== "undefined") {
                this.dataReceiverController = properties.dataReceiverController;
            } else {
                this.dataReceiverController = new OSH.DataReceiver.DataReceiverController({
                    replayFactor : 1
                });
                this.dataReceiverController.connectAll();
            }

            if(typeof properties.swapId !== "undefined") {
                this.swapId = properties.swapId;
            }

            if(typeof properties.dialogContainer !== "undefined") {
                this.dialogContainer = properties.dialogContainer;
            }
        }

        this.formTagId = "form-"+OSH.Utils.randomUUID();
        this.serviceSelectTagId = "service-"+OSH.Utils.randomUUID();
        this.offeringSelectTagId = "offering-"+OSH.Utils.randomUUID();
        this.observablePropertyTagId = "obsProperty-"+OSH.Utils.randomUUID();
        this.startTimeTagId = "startTime-"+OSH.Utils.randomUUID();
        this.endTimeTagId = "endTime-"+OSH.Utils.randomUUID();
        this.typeSelectTagId = "type-"+OSH.Utils.randomUUID();
        this.formButtonId = "submit-"+OSH.Utils.randomUUID();
        this.syncMasterTimeId = "syncMasterTime-"+OSH.Utils.randomUUID();
        this.entitiesSelectTagId = "entities-"+OSH.Utils.randomUUID();
        this.viewSelectTagId = "dialogSelect-"+OSH.Utils.randomUUID();

        // add template
        var discoveryForm = document.createElement("form");
        discoveryForm.setAttribute("action","#");
        discoveryForm.setAttribute("id",this.formTagId);
        discoveryForm.setAttribute("class",'discovery-form');

        document.getElementById(this.divId).appendChild(discoveryForm);

        var strVar="";
        strVar += "<ul>";
        strVar += "            <li>";
        strVar += "                <h2>Discovery<\/h2>";
        strVar += "                <span class=\"required_notification\">* Denotes Required Field<\/span>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>Service:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                     <select id=\""+this.serviceSelectTagId+"\" required pattern=\"^(?!Select a service$).*\">";
        strVar += "                         <option value=\"\" disabled selected>Select a service<\/option>";
        strVar += "                     <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>Offering:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                    <select id=\""+this.offeringSelectTagId+"\" required>";
        strVar += "                        <option value=\"\" disabled selected>Select an offering<\/option>";
        strVar += "                    <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>Observable Property:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                     <select id=\""+this.observablePropertyTagId+"\" required>";
        strVar += "                         <option value=\"\" disabled selected>Select a property<\/option>";
        strVar += "                     <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label for=\"startTime\">Start time:<\/label>";
        //strVar += "                <input type=\"text\" name=\"startTime\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\" required pattern=\"\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)\" />";
        strVar += "                <input id=\""+this.startTimeTagId+"\" type=\"text\" name=\"startTime\" class=\"input-text\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\" required/>";
        strVar += "                <span class=\"form_hint\">YYYY-MM-DDTHH:mm:ssZ<\/span>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label for=\"endTime\">End time:<\/label>";
        //strVar += "                <input type=\"text\" name=\"endTime\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\"  required pattern=\"\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)\" />";
        strVar += "                <input id=\""+this.endTimeTagId+"\" type=\"text\" name=\"endTime\" class=\"input-text\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\"  required/>";
        strVar += "                <span class=\"form_hint\">YYYY-MM-DDTHH:mm:ssZ<\/span>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label for=\"syncMasterTime\">Sync master time:<\/label>";
        strVar += "                <input id=\""+this.syncMasterTimeId+"\"  class=\"input-checkbox\" type=\"checkbox\" name=\syncMasterTime\" />";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>Type:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                    <select id=\""+this.typeSelectTagId+"\" required>";
        strVar += "                        <option value=\"\" disabled selected>Select a type<\/option>";
        strVar += "                    <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>Entities:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                    <select id=\""+this.entitiesSelectTagId+"\">";
        strVar += "                        <option value=\"\" selected>None<\/option>";
        strVar += "                    <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>View:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                    <select id=\""+this.viewSelectTagId+"\" required>";
        strVar += "                        <option value=\"\" disabled selected>Select a view<\/option>";
        strVar += "                    <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <button id=\""+this.formButtonId+"\" class=\"submit\" type=\"submit\">Add<\/button>";
        strVar += "            <\/li>";
        strVar += "        <\/ul>";

        discoveryForm.innerHTML = strVar;

        // fill service from urls
        if(typeof properties != "undefined") {
            // add services
            if(typeof properties.services != "undefined"){
                this.addValuesToSelect(this.serviceSelectTagId,properties.services);
            }

            // add entities
            if(typeof properties.entities != "undefined"){
                this.addObjectsToSelect(this.entitiesSelectTagId,properties.entities);
            }

            // add views
            if(typeof properties.views != "undefined"){
                this.views = properties.views;
            } else {
                this.views = [];
            }
        }

        // fill type
        for(var type in  OSH.UI.DiscoveryView.Type) {
            this.addValueToSelect(this.typeSelectTagId,OSH.UI.DiscoveryView.Type[type]);
        }

        // add listeners
        OSH.EventManager.observeDiv(this.serviceSelectTagId,"change",this.onSelectedService.bind(this));
        OSH.EventManager.observeDiv(this.offeringSelectTagId,"change",this.onSelectedOffering.bind(this));
        OSH.EventManager.observeDiv(this.typeSelectTagId,"change",this.onSelectedType.bind(this));
        OSH.EventManager.observeDiv(this.formTagId,"submit",this.onFormSubmit.bind(this));
    },

    /**
     *
     * @param event
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    onSelectedService : function(event) {
        var serverTag = document.getElementById(this.serviceSelectTagId);
        var option = serverTag.options[serverTag.selectedIndex];

        // connect to server and get the list of offering
        //var oshServer = new OSH.Server(option.value);

        this.removeAllFromSelect(this.offeringSelectTagId);
       /* var onSuccessGetCapabilities = function(event) {
            this.sensors = oshServer.sensors;
            // remove existing
            var startTimeInputTag = document.getElementById(this.startTimeTagId);
            var endTimeInputTag = document.getElementById(this.endTimeTagId);

            // add the new ones
            for(var i = 0;i < this.sensors.length;i++) {
                this.addValueToSelect(this.offeringSelectTagId,this.sensors[i].name,this.sensors[i],this.sensors[i]);
            }
        }.bind(this);

        var onErrorGetCapabilities = function(event) {
        };

        oshServer.getCapabilities(onSuccessGetCapabilities,onErrorGetCapabilities);*/

       //option.value
        this.oshServer = new OSH.Server({
            sos:'sos', // TODO: allow to customize that value
            sps:'sps', // TODO: allow to customize that value
            url: OSH.Utils.removeLastCharIfExist(option.value,"/"),
            baseUrl: 'sensorhub' // TODO: allow to customize that value
        });

        var onSuccessGetCapabilities = function(jsonObj) {
            var startTimeInputTag = document.getElementById(this.startTimeTagId);
            var endTimeInputTag = document.getElementById(this.endTimeTagId);

            var offering=null;

            for(var i=0;i < jsonObj.Capabilities.contents.offering.length;i++) {
                offering = jsonObj.Capabilities.contents.offering[i];
                this.addValueToSelect(this.offeringSelectTagId,offering.name,offering);
            }
        }.bind(this);

        var onErrorGetCapabilities = function(event) {
        };

        this.oshServer.getCapabilities(onSuccessGetCapabilities,onErrorGetCapabilities);
    },

    /**
     *
     * @param event
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    onSelectedOffering : function(event) {
        var e = document.getElementById(this.offeringSelectTagId);
        var option = e.options[e.selectedIndex];
        var offering = option.parent;
        this.removeAllFromSelect(this.observablePropertyTagId);

        var startTimeInputTag = document.getElementById(this.startTimeTagId);
        var endTimeInputTag = document.getElementById(this.endTimeTagId);

        // set times
        startTimeInputTag.value = offering.phenomenonTime.beginPosition;

        if(typeof offering.phenomenonTime.endPosition.indeterminatePosition !== "undefined") {
            var d = new Date();
            d.setUTCFullYear(2055);
            endTimeInputTag.value = d.toISOString();
        } else {
            endTimeInputTag.value = offering.phenomenonTime.endPosition;
        }

        // feed observable properties
        for(var i = 0; i  < offering.observableProperty.length;i++) {
            this.addValueToSelect(this.observablePropertyTagId,offering.observableProperty[i],offering);
        }
    },

    /**
     *
     * @param event
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    onSelectedType : function(event) {
        var typeTag = document.getElementById(this.typeSelectTagId);
        var tagValue = typeTag.value;
        this.removeAllFromSelect(this.viewSelectTagId);
        for(var i= 0;i  < this.views.length;i++) {
            var currentView = this.views[i];
            if(typeof currentView.type != "undefined" && currentView.type == tagValue){
                this.addValueToSelect(this.viewSelectTagId,currentView.name,undefined,currentView);
            }
        }
    },

    /**
     *
     * @param event
     * @returns {boolean}
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    onFormSubmit : function(event) {
        event.preventDefault();
        // service
        var serviceTag = document.getElementById(this.serviceSelectTagId)
        var serviceTagSelectedOption = serviceTag.options[serviceTag.selectedIndex];

        // offering
        var offeringTag = document.getElementById(this.offeringSelectTagId)
        var offeringTagSelectedOption = offeringTag.options[offeringTag.selectedIndex];

        // obs property
        var observablePropertyTag = document.getElementById(this.observablePropertyTagId);
        var observablePropertyTagSelectedOption = observablePropertyTag.options[observablePropertyTag.selectedIndex];

        // time
        var startTimeInputTag = document.getElementById(this.startTimeTagId);
        var endTimeInputTag = document.getElementById(this.endTimeTagId);

        // sync master time
        var syncMasterTimeTag = document.getElementById(this.syncMasterTimeId);

        // type & view
        var typeTag = document.getElementById(this.typeSelectTagId);
        var viewTag = document.getElementById(this.viewSelectTagId);
        var viewTagOption = viewTag.options[viewTag.selectedIndex];

        // entity
        var entityTag = document.getElementById(this.entitiesSelectTagId);
        var entityTagTagOption = entityTag.options[entityTag.selectedIndex];

        // get values
        var name=offeringTagSelectedOption.parent.name;
        var endPointUrl=serviceTagSelectedOption.value+"sensorhub/sos";
        var offeringID=offeringTagSelectedOption.parent.identifier;
        var obsProp=observablePropertyTagSelectedOption.value;
        var startTime=startTimeInputTag.value;
        var endTime=endTimeInputTag.value;
        var viewId = viewTagOption.object.viewId;
        var entityId = undefined;
        if(typeof entityTagTagOption.object != "undefined"){
            entityId = entityTagTagOption.object.id;
        }

        endPointUrl = endPointUrl.replace('http://', '');
        var syncMasterTime = syncMasterTimeTag.checked;


        switch(viewTagOption.object.type) {
            case OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_MJPEG:
            {
                this.createMJPEGVideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime,syncMasterTime,entityId);
                break;
            }
            case OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_H264:
            {
                this.createH264VideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime,syncMasterTime,entityId);
                break;
            }
            case OSH.UI.DiscoveryView.Type.MARKER_GPS:
            {
                this.createGPSMarker(name, endPointUrl, offeringID, obsProp, startTime, endTime,syncMasterTime,viewTagOption.object.viewId,entityId);
                break;
            }
            case OSH.UI.DiscoveryView.Type.DIALOG_CHART:
            {
                this.createChartDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime,syncMasterTime,entityId);
                break;
            }
            default : break;
        }
        return false;
    },

    /**
     *
     * @param tagId
     * @param objectsArr
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    addObjectsToSelect:function(tagId,objectsArr) {
        var selectTag = document.getElementById(tagId);
        for(var i=0;i < objectsArr.length;i++) {
            var object = objectsArr[i];
            var option = document.createElement("option");
            option.text = object.name;
            option.value = object.name;
            option.object = object;
            selectTag.add(option);
        }
    },

    /**
     *
     * @param tagId
     * @param valuesArr
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    addValuesToSelect:function(tagId,valuesArr) {
        var selectTag = document.getElementById(tagId);
        for(var i=0;i < valuesArr.length;i++) {
            var value = valuesArr[i];
            var option = document.createElement("option");
            option.text = value;
            option.value = value;
            selectTag.add(option);
        }
    },

    /**
     *
     * @param tagId
     * @param value
     * @param parent
     * @param object
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    addValueToSelect:function(tagId,value,parent,object) {
        var selectTag = document.getElementById(tagId);
        var option = document.createElement("option");
        option.text = value;
        option.value = value;
        option.parent = parent;

        if(typeof object != "undefined") {
            option.object = object;
        }

        if(typeof parent != "undefined") {
            option.parent = parent;
        }
        selectTag.add(option);
    },

    /**
     *
     * @param tagId
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    removeAllFromSelect:function(tagId) {
        var i;
        var selectTag = document.getElementById(tagId);
        for (i = selectTag.options.length - 1; i > 0; i--) {
            selectTag.remove(i);
        }
    },

    /**
     *
     * @param name
     * @param endPointUrl
     * @param offeringID
     * @param obsProp
     * @param startTime
     * @param endTime
     * @param syncMasterTime
     * @param viewId
     * @param entityId
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    createGPSMarker: function(name,endPointUrl,offeringID,obsProp,startTime,endTime,syncMasterTime,viewId,entityId) {
        var gpsDataSource = new OSH.DataReceiver.LatLonAlt(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            syncMasterTime: syncMasterTime,
            bufferingTime: 1000,
            timeShift: -16000
        });

        // create viewItem
        var pointMarker = new OSH.UI.Styler.PointMarker({
            locationFunc : {
                dataSourceIds : [gpsDataSource.id],
                handler : function(rec) {
                    return {
                        x : rec.lon,
                        y : rec.lat,
                        z : rec.alt
                    };
                }
            },
            icon : 'images/cameralook.png',
            iconFunc : {
                dataSourceIds: [gpsDataSource.getId()],
                handler : function(rec,timeStamp,options) {
                    if(options.selected) {
                        return 'images/cameralook-selected.png'
                    } else {
                        return 'images/cameralook.png';
                    };
                }
            }
        });

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(gpsDataSource);

        var viewItem = {
            styler :  pointMarker,
            name : name
        };

        if(typeof entityId !== "undefined") {
            viewItem['entityId'] = entityId;
        }

        OSH.EventManager.fire(OSH.EventManager.EVENT.ADD_VIEW_ITEM,{viewItem:viewItem,viewId:viewId});
        OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE,{dataSourcesId:[gpsDataSource.id]});
    },

    /**
     *
     * @param name
     * @param endPointUrl
     * @param offeringID
     * @param obsProp
     * @param startTime
     * @param endTime
     * @param syncMasterTime
     * @param entityId
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    createMJPEGVideoDialog:function(name,endPointUrl,offeringID,obsProp,startTime,endTime,syncMasterTime,entityId) {
        var videoDataSource = new OSH.DataReceiver.VideoMjpeg(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            syncMasterTime: syncMasterTime,
            bufferingTime: 1000
        });

        var dialog    =  new OSH.UI.DialogView(this.dialogContainer, {
            draggable: true,
            css: "dialog",
            name: name,
            show:true,
            dockable: false,
            closeable: true,
            connectionIds : [videoDataSource.id],
            swapId: this.swapId
        });

        var videoView = new OSH.UI.MjpegView(dialog.popContentDiv.id, {
            dataSourceId: videoDataSource.id,
            css: "video",
            cssSelected: "video-selected",
            name: "Android Video",
            entityId : entityId,
            keepRatio:true
        });

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(videoDataSource);

        // starts streaming
        OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE,{dataSourcesId:[videoDataSource.id]});
    },

    /**
     *
     * @param name
     * @param endPointUrl
     * @param offeringID
     * @param obsProp
     * @param startTime
     * @param endTime
     * @param syncMasterTime
     * @param entityId
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    createH264VideoDialog:function(name,endPointUrl,offeringID,obsProp,startTime,endTime,syncMasterTime,entityId) {
        var videoDataSource = new OSH.DataReceiver.VideoH264(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            syncMasterTime: syncMasterTime,
            bufferingTime: 1000
        });

        var dialog    =  new OSH.UI.DialogView(this.dialogContainer, {
            draggable: true,
            css: "dialog",
            name: name,
            show:true,
            dockable: false,
            closeable: true,
            connectionIds : [videoDataSource.id],
            swapId: this.swapId,
            keepRatio:true
        });

        var videoView = new OSH.UI.FFMPEGView(dialog.popContentDiv.id, {
            dataSourceId: videoDataSource.getId(),
            css: "video",
            cssSelected: "video-selected",
            name: "Android Video",
            entityId : entityId,
            useWorker:true,
            useWebWorkerTransferableData:true
        });

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(videoDataSource);

        // starts streaming
        OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE,{dataSourcesId:[videoDataSource.id]});
    },


    /**
     *
     * @param name
     * @param endPointUrl
     * @param offeringID
     * @param obsProp
     * @param startTime
     * @param endTime
     * @param syncMasterTime
     * @param entityId
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    createChartDialog:function(name,endPointUrl,offeringID,obsProp,startTime,endTime,syncMasterTime,entityId) {
        var chartDataSource = new OSH.DataReceiver.Chart(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            syncMasterTime: syncMasterTime,
            bufferingTime: 1000
        });

        var dialog    =  new OSH.UI.DialogView(this.dialogContainer, {
            draggable: true,
            css: "dialog",
            name: name,
            show:true,
            dockable: false,
            closeable: true,
            connectionIds : [chartDataSource.id],
            swapId: this.swapId
        });

        // Chart View
        var chartView = new OSH.UI.Nvd3CurveChartView(dialog.popContentDiv.id,
            [{
                styler: new OSH.UI.Styler.Curve({
                    valuesFunc: {
                        dataSourceIds: [chartDataSource.getId()],
                        handler: function (rec, timeStamp) {
                            return {
                                x: timeStamp,
                                y: parseFloat(rec[2])
                            };
                        }
                    }
                })
            }],
            {
                name: name,
                yLabel: '',
                xLabel: '',
                css:"chart-view",
                cssSelected: "video-selected",
                maxPoints:30
            }
        );

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(chartDataSource);

        // starts streaming
        OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE,{dataSourcesId:[chartDataSource.id]});
    }
});

/**
 * The different type of discovery.
 * @type {{MARKER_GPS: string, DIALOG_VIDEO_H264: string, DIALOG_VIDEO_MJPEG: string, DIALOG_CHART: string}}
 * @memberof OSH.UI.DiscoveryView
 * @instance
 */
OSH.UI.DiscoveryView.Type = {
    MARKER_GPS : "Marker(GPS)",
    DIALOG_VIDEO_H264 : "Video Dialog(H264)",
    DIALOG_VIDEO_MJPEG: "Video Dialog(MJPEG)",
    DIALOG_CHART : "Chart Dialog"
};
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @param {Object} parentElement The parent html element to attach the view
 * @param {Array} entityItems The entity items array
 * @param {Object} options the {@link OSH.View} options
 * @example
 var entityTreeView = new OSH.UI.EntityTreeView(entityTreeDialog.popContentDiv.id,
     [{
        entity : androidEntity,
        path: "Sensors/Toulouse",
        treeIcon : "images/android_icon.png",
        contextMenuId: stackContextMenuId
     }],
     {
         css: "tree-container"
     }
 );
 */
OSH.UI.EntityTreeView = OSH.UI.View.extend({
    initialize:function(parentElementDivId,entityItems,options) {
        this._super(parentElementDivId,[],options);

        this.entityItems = entityItems;
        this.initTree(options);
    },

    /**
     *
     * @param options
     * @instance
     * @memberof OSH.UI.EntityTreeView
     */
    initTree:function(options) {
        this.tree = createTree(this.divId,'white',null);

        // iterates over entities to create treeNode
        for(var i = 0;i < this.entityItems.length;i++) {
            var currentItem = this.entityItems[i];
            var entity = currentItem.entity;
            var path = currentItem.path;
            var treeIcon = currentItem.treeIcon;
            var contextMenuId = currentItem.contextMenuId;

            if(path.endsWith("/")) {
                path = path.substring(0,path.length-1);
            }
            
            // create intermediary folders or append to them as needed 
            var folder = path.split("/");
            var nbNodes = folder.length;
            var currentNode = this.tree;
            var pos = 0;
            while(nbNodes > 0) {
                var existingChildNode = null;
                
                // scan child nodes to see if folder already exists
                for (n=0; n<currentNode.childNodes.length; n++) {
                    var node = currentNode.childNodes[n];
                    if (node.text === folder[pos]) {
                        existingChildNode = node;
                        break;
                    }
                }
                
                // if folder already exists, just use it as parent in next iteration
                // otherwise create a new node to use as new parent
                if (existingChildNode == null) {
                    if (currentNode === this.tree)
                        currentNode = this.tree.createNode(folder[pos],false,'',this.tree,null,null);
                    else
                        currentNode = currentNode.createChildNode(folder[pos],false,'',null,null);    
                } else {
                    currentNode = existingChildNode;
                }
                
                pos++;
                nbNodes--;
            }
            
            var entityNode;
            if(currentNode === this.tree) {
                entityNode = this.tree.createNode(entity.name,false,treeIcon,this.tree,entity,contextMenuId);
            } else {
                entityNode = currentNode.createChildNode(entity.name,false,treeIcon,entity,contextMenuId);
            }
            currentItem.node = entityNode;
        }

        //Rendering the tree
        this.tree.drawTree();
    },

    /**
     *
     * @param dataSourcesIds
     * @param entityId
     * @instance
     * @memberof OSH.UI.EntityTreeView
     */
    selectDataView: function (dataSourcesIds, entityId) {
        
        // when an entity is selected we find the corresponding node in the tree
        // we expand all its ancestors and we mark it as selected
        if (typeof(entityId) != "undefined") {
            for(var i = 0;i < this.entityItems.length;i++) {
                var currentItem = this.entityItems[i];
                if (currentItem.entity.id === entityId) {
                    this.tree.selectNode(currentItem.node, false);
                    var node = currentItem.node.parent
                    while (node != this.tree) {
                        this.tree.expandNode(node);
                        node = node.parent;
                    }
                }
                    
            }
        }
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Sensia Software LLC. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>
 Author: Alex Robin <alex.robin@sensiasoft.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 var cesiumMapView = new OSH.UI.CesiumView("",
 [{
	styler :  pointMarker,
	contextMenuId: circularContextMenuId,
	name : "Android Phone GPS",
	entityId : androidEntity.id
 },
 {
    styler : new OSH.UI.Styler.Polyline({
        locationFunc : {
            dataSourceIds : [androidPhoneGpsDataSource.getId()],
            handler : function(rec) {
                return {
                    x : rec.lon,
                    y : rec.lat,
                    z : rec.alt
                };
            }
        },
        color : 'rgba(0,0,255,0.5)',
        weight : 10,
        opacity : .5,
        smoothFactor : 1,
        maxPoints : 200
    }),
    name : "Android Phone GPS Path",
    entityId : androidEntity.id
 }]
 );
 */
OSH.UI.CesiumView = OSH.UI.View.extend({
	
	initialize : function(parentElementDivId,viewItems, properties) {
		this._super(parentElementDivId,viewItems,properties);

		var cssClass = document.getElementById(this.divId).className;
		document.getElementById(this.divId).setAttribute("class", cssClass+" "+this.css);
		
		this.imageDrapingPrimitive = null;
		this.imageDrapingPrimitiveReady = false;		
		this.frameCount = 0;
		
		this.captureCanvas = document.createElement('canvas');
		this.captureCanvas.width = 640;
		this.captureCanvas.height = 480;
	},

	/**
	 *
	 * @param styler
	 * @param timeStamp
	 * @param options
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 */
	updateMarker : function(styler,timeStamp,options) {
		var markerId = 0;

		if (!(styler.getId() in this.stylerToObj)) {
			markerId = this.addMarker({
				lat : styler.location.y,
				lon : styler.location.x,
				alt : styler.location.z,
				orientation : styler.orientation,
				color : styler.color,
				icon : styler.icon,
				label : styler.label,
				timeStamp: timeStamp,
				selected: ((typeof(options.selected) != "undefined")? options.selected : false)
			});

			this.stylerToObj[styler.getId()] = markerId;
		} else {
			markerId = this.stylerToObj[styler.getId()];
		}

		this.updateMapMarker(markerId, {
			lat : styler.location.y,
			lon : styler.location.x,
			alt : styler.location.z,
			orientation : styler.orientation,
			color : styler.color,
			icon : styler.icon,
			timeStamp: timeStamp,
			selected:((typeof(options.selected) != "undefined")? options.selected : false)
		});
	},

	/**
	 *
	 * @param styler
	 * @param timeStamp
	 * @param options
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 *
	 */
    updateDrapedImage: function(styler,timeStamp,options,snapshot) {
		
    	var llaPos = styler.platformLocation;
    	var camPos = Cesium.Cartesian3.fromDegrees(llaPos.x, llaPos.y, llaPos.z);
    	
    	var DTR = Math.PI/180.;
    	var attitude = styler.platformOrientation;
    	var gimbal = styler.gimbalOrientation;
    	
    	///////////////////////////////////////////////////////////////////////////////////
    	// compute rotation matrix to transform lookrays from camera frame to ECEF frame //
    	///////////////////////////////////////////////////////////////////////////////////
    	var nedTransform = Cesium.Transforms.northEastDownToFixedFrame(camPos);
    	var camRot = new Cesium.Matrix3();
    	Cesium.Matrix4.getRotation(nedTransform, camRot);    	
    	var rotM = new Cesium.Matrix3();
    	
        // UAV heading, pitch, roll (given in NED frame)
    	var uavHeading = Cesium.Matrix3.fromRotationZ(attitude.heading*DTR, rotM);
    	Cesium.Matrix3.multiply(camRot, uavHeading, camRot);    	
        var uavPitch = Cesium.Matrix3.fromRotationY(attitude.pitch*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, uavPitch, camRot);
        var uavRoll = Cesium.Matrix3.fromRotationX(attitude.roll*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, uavRoll, camRot);
        
        // gimbal angles (on solo gimbal, order is yaw, roll, pitch!)
        var gimbalYaw = Cesium.Matrix3.fromRotationZ(gimbal.heading*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, gimbalYaw, camRot);
        var gimbalRoll = Cesium.Matrix3.fromRotationX(gimbal.roll*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, gimbalRoll, camRot);
        var gimbalPitch = Cesium.Matrix3.fromRotationY((90+gimbal.pitch)*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, gimbalPitch, camRot);
        
        // transform to camera frame
        var img2cam = Cesium.Matrix3.fromRotationZ(90*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, img2cam, camRot);

        ////////////////////////////////////////////////////////////////////////////////////
        
    	var camProj = styler.cameraModel.camProj;
    	var camDistR = styler.cameraModel.camDistR;
    	var camDistT = styler.cameraModel.camDistT;
    	
    	var imgSrc = styler.imageSrc;
    	
    	//if (this.frameCount%60 == 0)
    	{
	    	/*var newImageDrapingPrimitive = this.viewer.scene.primitives.add(new Cesium.ImageDrapingPrimitive({
	            imageSrc: videoElt,
	            camPos: camPos,
	            camRot: camRot,
	            camProj: camProj,
	            camDistR: camDistR,
	            camDistT: camDistT,
	            asynchronous : true
	        }));
	        
	        // remove previous primitive
            if (styler.snapshotFunc == null) {
                if (this.imageDrapingPrimitive != null) {
                    this.viewer.scene.primitives.remove(this.imageDrapingPrimitive);
                }
                this.imageDrapingPrimitive = newImageDrapingPrimitive;
            }*/
    	    
    	    // snapshot
            if (snapshot) {
                var ctx = this.captureCanvas.getContext('2d');
                ctx.drawImage(imgSrc, 0, 0, this.captureCanvas.width, this.captureCanvas.height);
                imgSrc = this.captureCanvas;                
            }
    	    
    	    var encCamPos = Cesium.EncodedCartesian3.fromCartesian(camPos);
    	    var appearance = new Cesium.MaterialAppearance({
                material : new Cesium.Material({
                    fabric : {
                        type : 'Image',
                        uniforms : {
                            image : imgSrc,
                            camPosHigh : encCamPos.high,
                            camPosLow : encCamPos.low,
                            camAtt: Cesium.Matrix3.toArray(Cesium.Matrix3.transpose(camRot, new Cesium.Matrix3())),
                            camProj: Cesium.Matrix3.toArray(camProj),
                            camDistR: camDistR,
                            camDistT: camDistT
                        }
                    }
                }),
                vertexShaderSource: Cesium._shaders.ImageDrapingVS,
                fragmentShaderSource: Cesium._shaders.ImageDrapingFS
            });
    	    
    	    /*appearance = new Cesium.MaterialAppearance({
                material : new Cesium.Material({
                    fabric : {
                        type: 'Color',
                        uniforms : {
                            color : new Cesium.Color(1.0, 0.0, 0.0, 0.5)
                        }
                    }
                })
            });*/
    	    
    	    if (this.imageDrapingPrimitive == null || snapshot) {    	        
    	        if (this.imageDrapingPrimitive == null)
    	            this.imageDrapingPrimitive = {};
    	        
    	        var promise = Cesium.sampleTerrain(this.viewer.terrainProvider, 11, [Cesium.Cartographic.fromDegrees(llaPos.x, llaPos.y)]);
    	        var that = this;
                Cesium.when(promise, function(updatedPositions) {
                    //console.log(updatedPositions[0]);
                    var newImageDrapingPrimitive = that.viewer.scene.primitives.add(new Cesium.Primitive({
                        geometryInstances: new Cesium.GeometryInstance({
                            geometry: new Cesium.RectangleGeometry({
                                rectangle: Cesium.Rectangle.fromDegrees(llaPos.x-0.1, llaPos.y-0.1, llaPos.x+0.1, llaPos.y+0.1),
                                height: updatedPositions[0].height-100,
                                extrudedHeight: llaPos.z-1
                            })
                        }), 
                        appearance: appearance
                    }));
                    
                    if (!snapshot)
                        that.imageDrapingPrimitive = newImageDrapingPrimitive;
                    
                    that.viewer.scene.primitives.raiseToTop(that.imageDrapingPrimitive);
                    that.imageDrapingPrimitiveReady = true;
                });                
    	        
    	    } else if (this.imageDrapingPrimitiveReady) {
    	        this.imageDrapingPrimitive.appearance = appearance;
    	    }
    	}
    	
    	this.frameCount++;
	},

	//---------- MAP SETUP --------------//
	/**
	 *
	 * @param $super
	 * @param options
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 */
	beforeAddingItems: function (options) {
		this.markers = {};
	    this.first = true;
	    
	    var imageryProviders = Cesium.createDefaultImageryProviderViewModels();
	    this.viewer = new Cesium.Viewer(this.divId, {
	    	baseLayerPicker: true,
	    	imageryProviderViewModels: imageryProviders,
	    	selectedImageryProviderViewModel: imageryProviders[6],
	    	timeline: false,
			homeButton: false,
			navigationInstructionsInitiallyVisible: false,
			navigationHelpButton: false,
			geocoder: true,
			fullscreenButton: false,
			showRenderLoopErrors: true,
			animation: false,
			targetFrameRate: 10,
        	scene3DOnly: true // for draw layer
	    });
	    
	    this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
	        url : '//assets.agi.com/stk-terrain/world'
	    });
	    
	    this.viewer.scene.copyGlobeDepth = true;
	    this.viewer.scene._environmentState.useGlobeDepthFramebuffer = true;
	    
	    var self = this;
	    Cesium.knockout.getObservable(this.viewer, '_selectedEntity').subscribe(function(entity) {
	        //change icon
	        if (Cesium.defined(entity)) {
	        	var dataSrcIds = [];
	        	var entityId;
		    	for (var stylerId in self.stylerToObj) {
		    		if(self.stylerToObj[stylerId] == entity._dsid) {
		    			for(var i=0;i < self.stylers.length;i++) {
			    			if(self.stylers[i].getId() == stylerId) {
			    				dataSrcIds = dataSrcIds.concat(self.stylers[i].getDataSourcesIds());
			    				entityId = self.stylers[i].viewItem.entityId;
				    			break;
			    			}
		    			}
		    		}
		    	}
		    	OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                    dataSourcesIds: dataSrcIds,
                    entityId : entityId
                });
	        }
	    }.bind(this));
	},

	/**
	 *
	 * @param properties
	 * @returns {string}
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 */
	addMarker : function(properties) {
		
		var imgIcon = 'images/cameralook.png';
		if(properties.icon != null) {
			imgIcon = properties.icon;
		}
		var isModel = imgIcon.endsWith(".glb");
		var name = properties.label;
		var geom;
		
		if (isModel)
		{
			geom = {
				name: name,
				position : Cesium.Cartesian3.fromDegrees(0, 0, 0),
				model : {
					uri: imgIcon,
					scale: 4,
					modelM: Cesium.Matrix4.IDENTITY.clone()
				}
			};
		}
		else
		{
			geom = {
				//name: properties.label,
				position : Cesium.Cartesian3.fromDegrees(0, 0, 0),
				billboard : {
					image : imgIcon,
					rotation : Cesium.Math.toRadians(0),
					horizontalOrigin : Cesium.HorizontalOrigin.CENTER
				}
			};
		}
		
		var entity = this.viewer.entities.add(geom);
		var id = "view-marker-"+OSH.Utils.randomUUID();
		entity._dsid = id;
		this.markers[id] = entity;
		
		return id;
	},

	/**
	 *
	 * @param id
	 * @param properties
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 */
	updateMapMarker: function(id, properties) {
		var lon = properties.lon;
        var lat = properties.lat;
        var alt = properties.alt;
        var orient = properties.orientation;
        var imgIcon = properties.icon;
        
        if (!isNaN(lon) && !isNaN(lat)) {
        	var marker =  this.markers[id];
        	
        	// get ground altitude if non specified
        	if (typeof(alt) == "undefined" || isNaN(alt))
        	{
	    		alt = this.getAltitude(lat, lon);
	    		if (alt > 1)
	    			alt += 0.3;
    		}

    		// update position
        	var pos = Cesium.Cartesian3.fromDegrees(lon, lat, alt);
    		marker.position = pos
    		    		
    		// update orientation
    		if (typeof(orient) != "undefined")
    	    {
    			var DTR = Math.PI/180.;
    			var heading = orient.heading;
	    		var pitch = 0.0;
	    		var roll = 0.0;
	    		var quat = Cesium.Transforms.headingPitchRollQuaternion(pos, new Cesium.HeadingPitchRoll(heading*DTR, /*roll*DTR*/0.0, pitch*DTR)); // inverse roll and pitch to go from NED to ENU
	    		marker.orientation = quat;
    	    }
    		
    		// update icon or models
    		//marker.billboard.image = imgIcon;
    		
    		// zoom map if first marker update
    		if (this.first) {
    			this.viewer.zoomTo(this.viewer.entities, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 2000));
    			this.first = false;
    		}
    		
    		if (properties.selected) {
    			 this.viewer.selectedEntity = marker;
    		}
        }
	},

	/**
	 *
	 * @param lat
	 * @param lon
	 * @returns {Number|undefined}
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 */
	getAltitude : function(lat, lon) {
		var position = Cesium.Cartesian3.fromDegrees(lon, lat, 0, this.viewer.scene.globe.ellipsoid, new Cesium.Cartesian3());
		var altitude = this.viewer.scene.globe.getHeight(Cesium.Ellipsoid.WGS84.cartesianToCartographic(position));

		if (altitude == 'undefined' || altitude <= 0)
			altitude = 0.1;
		return altitude;
	},
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 var leafletMapView = new OSH.UI.LeafletView("",
 [{
            styler :  pointMarker,
            contextMenuId: circularContextMenuId,
            name : "Android Phone GPS",
            entityId : androidEntity.id
        },
 {
     styler : new OSH.UI.Styler.Polyline({
         locationFunc : {
             dataSourceIds : [androidPhoneGpsDataSource.getId()],
             handler : function(rec) {
                 return {
                     x : rec.lon,
                     y : rec.lat,
                     z : rec.alt
                 };
             }
         },
         color : 'rgba(0,0,255,0.5)',
         weight : 10,
         opacity : .5,
         smoothFactor : 1,
         maxPoints : 200
     }),
     name : "Android Phone GPS Path",
     entityId : androidEntity.id
 }]
 );
 */
OSH.UI.LeafletView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, viewItems, options) {
        this._super(parentElementDivId, viewItems, options);

        var cssClass = document.getElementById(this.divId).className;
        document.getElementById(this.divId).setAttribute("class", cssClass+" "+this.css);
    },

    /**
     *
     * @param $super
     * @param options
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    beforeAddingItems: function (options) {
        // inits the map
        this.initMap(options);
        this.initEvents();
    },

    /**
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    initEvents: function () {
        // removes default right click
        document.getElementById(this.divId).oncontextmenu = function (e) {
            var evt = new Object({keyCode: 93});
            if (e.preventDefault != undefined)
                e.preventDefault();
            if (e.stopPropagation != undefined)
                e.stopPropagation();
        };
    },

    //---------- MAP SETUP --------------//
    /**
     *
     * @param options
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    initMap: function (options) {

        var initialView = {
            location: new L.LatLng(0, 0),
            zoom: 3
        };
        this.first = true;
        var defaultLayers = this.getDefaultLayers();

        var defaultLayer = defaultLayers[0].layer;

        var baseLayers = {};
        var overlays = {};

        baseLayers[defaultLayers[0].name] = defaultLayers[0].layer;
        overlays[defaultLayers[1].name] = defaultLayers[1].layer;

        if (typeof(options) != "undefined") {
            if (options.initialView) {
                initialView = {
                    location: new L.LatLng(options.initialView.lat, options.initialView.lon),
                    zoom: options.initialView.zoom
                }
            }
            // checks autoZoom
            if (!options.autoZoomOnFirstMarker) {
                this.first = false;
            }

            // checks overlayers
            if (options.overlayLayers) {
                overlays = options.overlayLayers;
            }

            // checks baseLayer
            if (options.baseLayers) {
                baseLayers = options.baseLayers;
            }

            // checks defaultLayer
            if (options.defaultLayer) {
                defaultLayer = options.defaultLayer;
            }
        }

        // sets layers to map
        this.map = new L.Map(this.divId, {
            fullscreenControl: true,
            layers: defaultLayer
        });

        L.control.layers(baseLayers, overlays).addTo(this.map);

        this.map.setView(initialView.location, initialView.zoom);
        //this.initLayers();
        this.markers = {};
        this.polylines = {};
    },

    /**
     *
     * @returns {{}}
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    getDefaultBaseLayers: function () {
        return {};
    },

    getDefaultLayers: function (options) {
        var maxZoom = 22;
        if (typeof(options) != "undefined" && options.maxZoom) {
            maxZoom = options.maxZoom;
        }
        // copyrights
        var mbAttr = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            mbUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

        var esriLink = '<a href="http://www.esri.com/">Esri</a>';
        var esriWholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

        // leaflet layers
        var esriLayer = L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: '&copy; ' + esriLink + ', ' + esriWholink,
                maxZoom: maxZoom,
                maxNativeZoom: 19
            });

        var streets = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr, maxZoom: maxZoom});

        return [{
            name: "OSM Streets",
            layer: streets
        }, {
            name: "Esri Satellite",
            layer: esriLayer
        }];
    },

    /**
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    initLayers: function () {
        // create the tile layer with correct attribution
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.tileLayer(osmUrl, {
            minZoom: 1,
            maxZoom: 22,
            attribution: osmAttrib
        });
        this.map.addLayer(osm);
    },

    //---------- FEATURES SETUP --------------//
    addMarker: function (properties) {
        //create marker
        var marker = null;
        if (properties.icon != null) {
            var markerIcon = L.icon({
                iconAnchor: properties.iconAnchor,
                iconUrl: properties.icon
            });

            marker = L.marker([properties.lat, properties.lon], {
                icon: markerIcon
            });
        } else {
            marker = L.marker([properties.lat, properties.lon]);
        }

        marker.bindPopup(properties.name);

        //TODO:for selected marker event
        //this.marker.on('click',this.onClick.bind(this));

        marker.addTo(this.map);
        marker.setRotationAngle(properties.orientation);

        var id = "view-marker-" + OSH.Utils.randomUUID();
        this.markers[id] = marker;

        if (this.first === true) {
          this.map.setView(new L.LatLng(properties.lat, properties.lon), 19);
          this.first = false;
        }
        var self = this;

        marker._icon.id = id;

        // adds onclick event
        marker.on('click', function () {
            var dataSourcesIds = [];
            var entityId;
            for (var stylerId in self.stylerToObj) {
                if (self.stylerToObj[stylerId] == id) {
                    var styler = self.stylerIdToStyler[stylerId];
                    OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
                        dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
                        entityId : styler.viewItem.entityId
                    });
                    break;
                }
            }
        });

        document.getElementById(id).oncontextmenu = function (e) {
            var evt = new Object({keyCode: 93});

            if (e.preventDefault != undefined)
                e.preventDefault();
            if (e.stopPropagation != undefined)
                e.stopPropagation();

            // gets the corresponding styler
            for(var stylerId in self.stylerToObj) {
                if(self.stylerToObj[stylerId] == id) {
                    OSH.EventManager.fire(OSH.EventManager.EVENT.CONTEXT_MENU+"-"+self.stylerIdToStyler[stylerId].viewItem.contextMenuId,{
                        //TODO: values have to be provided by properties
                        offsetX: -70,
                        offsetY: -70,
                        action : "show",
                        x:OSH.Utils.getXCursorPosition(),
                        y:OSH.Utils.getYCursorPosition(),
                        drawLineTo:id
                    });
                    break;
                }
            }


        }.bind(this);

        return id;
    },

    /**
     *
     * @param properties
     * @returns {string}
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    addPolyline: function (properties) {
        var polylinePoints = [];

        for (var i = 0; i < properties.locations.length; i++) {
            polylinePoints.push(new L.LatLng(properties.locations[i].y, properties.locations[i].x));
        }

        //create path
        var polyline = new L.Polyline(polylinePoints, {
            color: properties.color,
            weight: properties.weight,
            opacity: properties.opacity,
            smoothFactor: properties.smoothFactor
        }).addTo(this.map);

        var id = "view-polyline-" + OSH.Utils.randomUUID();
        this.polylines[id] = polyline;

        return id;
    },

    /**
     *
     * @param styler
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    updateMarker: function (styler) {
        var markerId = 0;
        if (!(styler.getId() in this.stylerToObj)) {
            // adds a new marker to the leaflet renderer
            markerId = this.addMarker({
                lat: styler.location.y,
                lon: styler.location.x,
                orientation: styler.orientation.heading,
                color: styler.color,
                icon: styler.icon,
                iconAnchor: styler.iconAnchor,
                name: this.names[styler.getId()]
            });
            this.stylerToObj[styler.getId()] = markerId;
        } else {
            markerId = this.stylerToObj[styler.getId()];
        }

        var marker = this.markers[markerId];
        // updates position
        var lon = styler.location.x;
        var lat = styler.location.y;

        if (!isNaN(lon) && !isNaN(lat)) {
            var newLatLng = new L.LatLng(lat, lon);
            marker.setLatLng(newLatLng);
        }


        // updates orientation
        if(typeof styler.orientation != "undefined") {
            marker.setRotationAngle(styler.orientation.heading);
        }

        if (styler.icon != null && marker._icon.iconUrl != styler.icon) {
            // updates icon
            var markerIcon = L.icon({
                iconAnchor: [16, 16],
                iconUrl: styler.icon
            });
            marker.setIcon(markerIcon);
        }
    },

    /**
     *
     * @param styler
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    updatePolyline: function (styler) {
        var polylineId = 0;

        if (!(styler.getId() in this.stylerToObj)) {
            // adds a new marker to the leaflet renderer
            polylineId = this.addPolyline({
                color: styler.color,
                weight: styler.weight,
                locations: styler.locations,
                maxPoints: styler.maxPoints,
                opacity: styler.opacity,
                smoothFactor: styler.smoothFactor
            });

            this.stylerToObj[styler.getId()] = polylineId;
        } else {
            polylineId = this.stylerToObj[styler.getId()];
        }

        if (polylineId in this.polylines) {
            var polyline = this.polylines[polylineId];

            // removes the layer
            this.map.removeLayer(polyline);

            var polylinePoints = [];
            for (var i = 0; i < styler.locations.length; i++) {
                polylinePoints.push(new L.LatLng(styler.locations[i].y, styler.locations[i].x));
            }

            //create path
            var polyline = new L.Polyline(polylinePoints, {
                color: styler.color,
                weight: styler.weight,
                opacity: styler.opacity,
                smoothFactor: styler.smoothFactor
            }).addTo(this.map);

            this.polylines[polylineId] = polyline;
        }
    },

    /**
     *
     * @param $super
     * @param parentElement
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    attachTo:function(parentElement) {
        this._super(parentElement);
        // Fix leaflet bug when resizing the div parent container
        this.map.invalidateSize();
    },

    /**
     *
     * @param $super
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    onResize:function($super) {
        this._super();
        this.map.invalidateSize();
    },
});

/***  little hack starts here ***/

L.Map = L.Map.extend({
    openPopup: function (popup) {
        this._popup = popup;
        return this.addLayer(popup).fire('popupopen', {
            popup: this._popup
        });
    }
});

// Defines rotated marker
(function () {
    // save these original methods before they are overwritten
    var proto_initIcon = L.Marker.prototype._initIcon;
    var proto_setPos = L.Marker.prototype._setPos;

    var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

    L.Marker.addInitHook(function () {
        var iconAnchor = this.options.icon.options.iconAnchor;
        if (iconAnchor) {
            iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
        }
        this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom';
        this.options.rotationAngle = this.options.rotationAngle || 0;
    });

    L.Marker.include({
        _initIcon: function () {
            proto_initIcon.call(this);
        },

        _setPos: function (pos) {
            proto_setPos.call(this, pos);

            if (this.options.rotationAngle) {
                this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin;

                if (oldIE) {
                    // for IE 9, use the 2D rotation
                    this._icon.style[L.DomUtil.TRANSFORM] = ' rotate(' + this.options.rotationAngle + 'deg)';
                } else {
                    // for modern browsers, prefer the 3D accelerated version
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
                }
            }
        },

        setRotationAngle: function (angle) {
            this.options.rotationAngle = angle;
            this.update();
            return this;
        },

        setRotationOrigin: function (origin) {
            this.options.rotationOrigin = origin;
            this.update();
            return this;
        }
    });
})();


/***  end of hack ***/

/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 */
OSH.UI.OpenLayerView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, viewItems, options) {
        this._super(parentElementDivId, viewItems, options);
        this.onResize();
    },

    /**
     *
     * @param $super
     * @param options
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    beforeAddingItems: function (options) {
        // inits the map
        this.initMap(options);

        //events will NOT automatically be added to the map, if one is provided by the user
        if(typeof(options) == "undefined" || !options.map)
            this.initEvents();
    },


    /**
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    initEvents: function () {
        // removes default right click
        document.getElementById(this.divId).oncontextmenu = function (e) {
            var evt = new Object({keyCode: 93});
            if (e.preventDefault != undefined)
                e.preventDefault();
            if (e.stopPropagation != undefined)
                e.stopPropagation();
        };

        var self = this;

        this.map.getViewport().addEventListener('contextmenu', function (e) {
            e.preventDefault();

            var feature = self.map.forEachFeatureAtPixel(self.map.getEventPixel(e),
                function (feature, layer) {
                    return feature;
                });
            if (feature) {
                var id = feature.ha;

                // gets the corresponding styler
                for(var stylerId in self.stylerToObj) {
                    if(self.stylerToObj[stylerId] == id) {
                        OSH.EventManager.fire(OSH.EventManager.EVENT.CONTEXT_MENU+"-"+self.stylerIdToStyler[stylerId].viewItem.contextMenuId,{
                            //TODO: values have to be provided by properties
                            offsetX: -70,
                            offsetY: -70,
                            action : "show",
                            x:OSH.Utils.getXCursorPosition(),
                            y:OSH.Utils.getYCursorPosition()
                        });
                        break;
                    }
                }
            }
        });

        this.map.on("click", function(e) {
            self.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                var id = feature.ha;
                var dataSourcesIds = [];
                var entityId;
                for (var stylerId in self.stylerToObj) {
                    if (self.stylerToObj[stylerId] == id) {
                        var styler = self.stylerIdToStyler[stylerId];
                        OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
                            dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
                            entityId : styler.viewItem.entityId
                        });
                        break;
                    }
                }
            });
        });
    },

    /**
     *
     * @param styler
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    updateMarker: function (styler) {
        var markerId = 0;

        if (!(styler.getId() in this.stylerToObj)) {
            // adds a new marker to the leaflet renderer
            markerId = this.addMarker({
                lat: styler.location.y,
                lon: styler.location.x,
                orientation: styler.orientation.heading,
                color: styler.color,
                icon: styler.icon,
                name: this.names[styler.getId()]
            });

            this.stylerToObj[styler.getId()] = markerId;
        } else {
            markerId = this.stylerToObj[styler.getId()];
        }

        var markerFeature = this.markers[markerId];
        // updates position
        var lon = styler.location.x;
        var lat = styler.location.y;

        if (!isNaN(lon) && !isNaN(lat)) {
            var coordinates = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:900913');
            markerFeature.getGeometry().setCoordinates(coordinates);
        }

        // updates orientation
        if (styler.icon != null) {
            // updates icon
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(({
                    opacity: 0.75,
                    src: styler.icon,
                    rotation: styler.orientation.heading * Math.PI / 180
                }))
            });
            markerFeature.setStyle(iconStyle);
        }
    },

    /**
     *
     * @param styler
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    updatePolyline: function (styler) {
        var polylineId = 0;

        if (!(styler.getId() in this.stylerToObj)) {
            // adds a new marker to the leaflet renderer
            polylineId = this.addPolyline({
                color: styler.color,
                weight: styler.weight,
                locations: styler.locations,
                maxPoints: styler.maxPoints,
                opacity: styler.opacity,
                smoothFactor: styler.smoothFactor,
                name: this.names[styler.getId()]
            });

            this.stylerToObj[styler.getId()] = polylineId;
        } else {
            polylineId = this.stylerToObj[styler.getId()];
        }

        //TODO: handle opacity, smoothFactor, color and weight
        if (polylineId in this.polylines) {
            var geometry = this.polylines[polylineId];

            var polylinePoints = [];
            for (var i = 0; i < styler.locations.length; i++) {
                polylinePoints.push(ol.proj.transform([styler.locations[i].x, styler.locations[i].y], 'EPSG:4326', 'EPSG:900913'))
            }

            geometry.setCoordinates(polylinePoints);
        }
    },

    //---------- MAP SETUP --------------//
    /**
     *
     * @param options
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    initMap: function (options) {

        var initialView = null;
        this.first = true;
        var overlays = [];
        var defaultLayer = null;
        this.markers = {};
        this.polylines = {};

        var baseLayers = this.getDefaultLayers();

        if (typeof(options) != "undefined") {
            var maxZoom = 19;

            //if the user passed in a map then use that one, don't make a new one
            if(options.map) {
                this.map = options.map;
                return;
            }

            if (options.maxZoom) {
                maxZoom = options.maxZoom;
            }
            if (options.initialView) {
                initialView = new ol.View({
                    center: ol.proj.transform([options.initialView.lon, options.initialView.lat], 'EPSG:4326', 'EPSG:900913'),
                    zoom: options.initialView.zoom,
                    maxZoom: maxZoom
                });
            }
            // checks autoZoom
            if (!options.autoZoomOnFirstMarker) {
                this.first = false;
            }

            // checks overlayers
            if (options.overlayLayers) {
                overlays = options.overlayLayers;
            }

            // checks baseLayer
            if (options.baseLayers) {
                baseLayers = options.baseLayers;
            }

            // checks defaultLayer
            if (options.defaultLayer) {
                defaultLayer = options.defaultLayer;
            }
        } else {
            // loads the default one
            initialView = new ol.View({
                center: ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:900913'),
                zoom: 11,
                maxZoom: maxZoom
            });
        }

        // sets layers to map
        //create map
        this.map = new ol.Map({
            target: this.divId,
            controls: ol.control.defaults({
                attributionOptions: ({
                    collapsible: false
                })
            }).extend([
                new ol.control.ZoomSlider(),
                new ol.control.Rotate(),
                new ol.control.ScaleLine(),
            ]),
            // interactions and controls are seperate entities in ol3
            // we extend the default navigation with a hover select interaction
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.Select({
                    condition: ol.events.condition.mouseMove
                })
            ]),
            layers: [
                new ol.layer.Group({
                    'title': 'Base maps',
                    layers: baseLayers
                }),
                new ol.layer.Group({
                    title: 'Overlays',
                    layers: overlays
                })
            ],
            view: initialView,

        });

        var layerSwitcher = new ol.control.LayerSwitcher({
            tipLabel: 'Layers' // Optional label for button
        });

        this.map.addControl(layerSwitcher);

        // inits onClick events
        var select_interaction = new ol.interaction.Select();

        var self = this;
        select_interaction.getFeatures().on("add", function (e) {
            var feature = e.element; //the feature selected
            var dataSourcesIds = [];
            var entityId;
            for (var stylerId in self.stylerToObj) {
                if (self.stylerToObj[stylerId] == feature.getId()) {
                    var styler = self.stylerIdToStyler[stylerId];
                    OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
                        dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
                        entityId : styler.viewItem.entityId
                    });
                    break;
                }
            }
        });

        this.map.addInteraction(select_interaction);
    },

    /**
     *
     * @returns {Object}
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    getDefaultBaseLayers: function () {
        return {};
    },


    /**
     *
     * @returns {Array}
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    getDefaultLayers: function () {
        var osm = new ol.layer.Tile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
        });
        return [osm];
    },

    /**
     *
     * @param properties
     * @returns {string}
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    addMarker: function (properties) {
        //create marker
        var marker = new ol.geom.Point(ol.proj.transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
        var markerFeature = new ol.Feature({
            geometry: marker,
            name: 'Marker' //TODO
        });

        if (properties.icon != null) {
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(({
                    opacity: 0.75,
                    src: properties.icon,
                    rotation: properties.orientation * Math.PI / 180
                }))
            });
            markerFeature.setStyle(iconStyle);
        }


        //TODO:for selected marker event
        //this.marker.on('click',this.onClick.bind(this));
        var vectorMarkerLayer =
            new ol.layer.Vector({
                title: properties.name,
                source: new ol.source.Vector({
                    features: [markerFeature]
                })
            });

        this.map.addLayer(vectorMarkerLayer);

        var id = "view-marker-" + OSH.Utils.randomUUID();
        markerFeature.setId(id);
        this.markers[id] = markerFeature;

        if (this.first) {
            this.first = false;
            this.map.getView().setCenter(ol.proj.transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
            this.map.getView().setZoom(19);
        }

        return id;
    },

    /**
     *
     * @param styler
     * @returns {string} the id of the newly created marker, or the id of the marker if it already exists from the current styler
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    createMarkerFromStyler: function (styler) {
        //This method is intended to create a marker object only for the OpenLayerView. It does not actually add it
        //to the view or map to give the user more control
        if (!(styler.getId() in this.stylerToObj)) {

            var properties = {
                lat: styler.location.y,
                lon: styler.location.x,
                orientation: styler.orientation.heading,
                color: styler.color,
                icon: styler.icon,
                name: this.names[styler.getId()]
            }

            //create marker
            var marker = new ol.geom.Point(ol.proj.transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
            var markerFeature = new ol.Feature({
                geometry: marker,
                name: 'Marker' //TODO
            });

            if (properties.icon != null) {
                var iconStyle = new ol.style.Style({
                    image: new ol.style.Icon({
                        opacity: 0.75,
                        src: properties.icon,
                        rotation: properties.orientation * Math.PI / 180
                    })
                });
                markerFeature.setStyle(iconStyle);
            }
            var id = "view-marker-" + OSH.Utils.randomUUID();
            markerFeature.setId(id);
            this.markers[id] = markerFeature;
            this.stylerToObj[styler.getId()] = id;
            return id;

        } else {
            return this.stylerToObj[styler.getId()];
        }
    },


    /**
     *
     * @param properties
     * @returns {string}
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    addPolyline: function (properties) {
        var polylinePoints = [];

        for (var i = 0; i < properties.locations.length; i++) {
            polylinePoints.push(ol.proj.transform([properties.locations[i].x, properties.locations[i].y], 'EPSG:4326', 'EPSG:900913'))
        }

        //create path
        var pathGeometry = new ol.geom.LineString(polylinePoints);
        var feature = new ol.Feature({
            geometry: pathGeometry,
            name: 'Line'
        });
        var source = new ol.source.Vector({
            features: [feature]
        });

        var vectorPathLayer = new ol.layer.Vector({
            title: properties.name,
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: properties.color
                }),
                stroke: new ol.style.Stroke({
                    color: properties.color,
                    width: properties.weight
                })
            })
        });

        this.map.addLayer(vectorPathLayer);
        var id = "view-polyline-" + OSH.Utils.randomUUID();
        this.polylines[id] = pathGeometry;

        return id;
    },

    /**
     *
     * @param $super
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    onResize:function($super) {
        this._super();
        this.map.updateSize();
    },
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 var dialogView new OSH.UI.DialogView(containerDivId, {
        draggable: false,
        css: "dialog",
        name: title,
        show:false,
        dockable: true,
        closeable: true,
        connectionIds : dataSources ,
        swapId: "main-container"
    });
 */
OSH.UI.DialogView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, options) {
        this._super(parentElementDivId,[],options);
        // creates HTML eflement
        this.dialogId = "dialog-" + OSH.Utils.randomUUID();
        this.pinDivId = "dialog-pin-" + OSH.Utils.randomUUID();
        var closeDivId = "dialog-close-" + OSH.Utils.randomUUID();
        this.connectDivId = "dialog-connect-" + OSH.Utils.randomUUID();
        this.name = "Untitled";

        var htmlVar = "";
        htmlVar += "<div>";

        this.dockable = false;
        this.closeable = false;
        this.connected = false;
        this.swapped = false;
        this.connectionIds = [];
        this.draggable = false;

        if(!isUndefined(options)){
            if( typeof (options.swapId) != "undefined" && options.swapId != "") {
                this.swapDivId = "dialog-exchange-" + OSH.Utils.randomUUID();
                htmlVar += "<a id=\"" + this.swapDivId + "\"class=\"pop-exchange fa fa-exchange\" title=\"swap\"><\/a>";
                this.divIdToSwap  = options.swapId;
            }

            if( typeof (options.connectionIds) != "undefined" && typeof options.connectionIds != "undefined" && options.connectionIds.length > 0) {
                // add connected icon to disconnect/connect datasource
                htmlVar += "<a id=\"" + this.connectDivId + "\"class=\"pop-connect\"><\/a>";
                this.connected = true;
                this.connectionIds = options.connectionIds;
            }

            if( typeof (options.dockable) != "undefined" && options.dockable) {
                htmlVar +=  "<a id=\""+this.pinDivId+"\"class=\"pop-pin\"><\/a>";
                this.dockable = options.dockable;
            }

            if(typeof (options.closeable) != "undefined" && options.closeable) {
                htmlVar += "<a id=\""+closeDivId+"\"class=\"pop-close\" title=\"close\">x<\/a>";
                this.closeable = options.closeable;
            }

            if(typeof (options.draggable) != "undefined" && options.draggable) {
                this.draggable = options.draggable;
            }

            if(typeof (options.name) != "undefined") {
                this.name = options.name;
            }

        }

        this.titleId = "dialog-title-"+OSH.Utils.randomUUID();
        htmlVar += "<h3 id=\""+this.titleId+"\">"+this.name+"<\/h3></div>";

        this.rootTag = document.getElementById(this.divId);
        this.rootTag.innerHTML = htmlVar;

        this.rootTag.setAttribute("class", "pop-over resizable");
        this.rootTag.setAttribute("draggable", this.draggable);

        this.keepRatio = false;

        if(!isUndefined(options)) {
            var css = this.rootTag.className;
            if (options.css) {
                css += " " + options.css;
            }
            if(options.keepRatio){
                css += " keep-ratio-w";
                this.keepRatio = true;
            }

            this.rootTag.setAttribute("class", css);
        }

        this.flexDiv = document.createElement("div");
        this.flexDiv.setAttribute("class","pop-inner");

        this.popContentDiv = document.createElement("div");
        this.popContentDiv.setAttribute("class","pop-content");
        this.popContentDiv.setAttribute("id","pop-content-id-"+OSH.Utils.randomUUID());

        if(!this.keepRatio) {
            OSH.Utils.addCss(this.popContentDiv,"no-keep-ratio");
        }

        this.flexDiv.appendChild(this.popContentDiv);
        // plugs it into the new draggable dialog
        this.rootTag.appendChild(this.flexDiv);

        if(typeof (options) != "undefined") {
            if(typeof (options.show) != "undefined" && !options.show) {
                this.rootTag.style.display = "none";
            } else {
                this.initialWidth = this.rootTag.offsetWidth;
            }
        }

        // adds listener
        this.rootTag.addEventListener('dragstart', this.drag_start.bind(this), false);
        document.addEventListener('dragover', this.drag_over.bind(this), false);
        document.addEventListener('drop', this.drop.bind(this), false);

        if(this.closeable) {
            document.getElementById(closeDivId).onclick = this.close.bind(this);
        }

        if(this.dockable) {
            document.getElementById(this.pinDivId).onclick = this.unpin.bind(this);
        }

        if(this.connectionIds.length > 0) {
            document.getElementById(this.connectDivId).onclick = this.connect.bind(this);
        }

        if(typeof  this.swapDivId != "undefined") {
            document.getElementById(this.swapDivId).onclick = this.swapClick.bind(this);
        }

        // calls super handleEvents
        this.handleEvents();

        var self = this;

        // observe events to update the dialog after disconnect/connect events handling
        OSH.EventManager.observe(OSH.EventManager.EVENT.CONNECT_DATASOURCE,function(event) {
            var dataSources = event.dataSourcesId;
            if(dataSources.length == self.connectionIds.length) {
                if(dataSources.filter(function(n) {
                        return self.connectionIds.indexOf(n) != -1;
                    }).length == self.connectionIds.length) {
                    document.getElementById(self.connectDivId).setAttribute("class", "pop-connect");
                    self.connected = true;
                }
            }
        });

        OSH.EventManager.observe(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE,function(event) {
            var dataSources = event.dataSourcesId;
            if(dataSources.length == self.connectionIds.length) {
                if(dataSources.filter(function(n) {
                        return self.connectionIds.indexOf(n) != -1;
                    }).length == self.connectionIds.length) {
                    document.getElementById(self.connectDivId).setAttribute("class", "pop-disconnect");
                    self.connected = false;
                }
            }
        });

        OSH.EventManager.observe("swap-restore",function(event) {
            if(self.swapped && event.exclude != self.id) {
                self.swap();
                self.swapped = false;
            }
        });

        var p = this.rootTag.parentNode;

        var testDiv = document.createElement("div");
        testDiv.setAttribute("class","outer-dialog");
        testDiv.appendChild(this.rootTag);

        p.appendChild(testDiv);
    },

    /**
     * Swap the current div with the div given as parameter
     * @instance
     * @memberof OSH.UI.DialogView
     */
    swapClick: function() {
        OSH.EventManager.fire("swap-restore",{exclude: this.id});
        this.swap();
    },

    /**
     * @instance
     * @memberof OSH.UI.DialogView
     */
    swap:function() {
        // swap the child of the popContentDiv with the child contained in the the containerDiv
        var containerDivToSwap = document.getElementById(this.divIdToSwap);
        if(containerDivToSwap != "undefined" && containerDivToSwap != null) {
            if(!this.swapped) {
                // get
                var popContent = this.popContentDiv.firstChild;
                this.contentViewId = popContent.id;
                var swapContainerContent = containerDivToSwap.firstChild;

                // remove
                containerDivToSwap.removeChild(swapContainerContent);
                this.popContentDiv.removeChild(popContent);

                // append
                containerDivToSwap.appendChild(popContent);
                this.popContentDiv.appendChild(swapContainerContent);
                this.swapped = true;

                // update title
                document.getElementById(this.titleId).innerText = "- Swapped -";

                // if keep ratio
                if(this.keepRatio) {
                    // remove css class from dialog
                    OSH.Utils.removeCss(this.rootTag,"keep-ratio-w");
                    // does not keep ratio for the new content
                    OSH.Utils.addCss(this.popContentDiv,"no-keep-ratio");
                    OSH.Utils.addCss(containerDivToSwap,"keep-ratio-h");
                }
            } else {
                // get
                var popContent = this.popContentDiv.firstChild;
                var swapContainerContent = document.getElementById(this.contentViewId);

                // remove
                containerDivToSwap.removeChild(swapContainerContent);
                this.popContentDiv.removeChild(popContent);

                // append
                containerDivToSwap.appendChild(popContent);
                this.popContentDiv.appendChild(swapContainerContent);

                // update title
                document.getElementById(this.titleId).innerText = this.name;
                this.swapped = false;

                // if keep ratio
                if(this.keepRatio) {
                    // remove css class from dialog
                    OSH.Utils.addCss(this.rootTag,"keep-ratio-w");
                    OSH.Utils.removeCss(this.popContentDiv,"no-keep-ratio");
                    OSH.Utils.removeCss(containerDivToSwap,"keep-ratio-h");
                }
            }

            // send resize event to the view
            var everyChild = document.getElementById(this.divIdToSwap).querySelectorAll("div");
            for (var i = 0; i<everyChild.length; i++) {
                var id = everyChild[i].id;
                if(id.startsWith("view-")) {
                    OSH.EventManager.fire(OSH.EventManager.EVENT.RESIZE+"-"+id);
                }
            }

            var everyChild = this.popContentDiv.querySelectorAll("div");
            for (var i = 0; i<everyChild.length; i++) {
                var id = everyChild[i].id;
                if(id.startsWith("view-")) {
                    OSH.EventManager.fire(OSH.EventManager.EVENT.RESIZE+"-"+id);
                }
            }
        }
    },

    /**
     *
     * @param $super
     * @param properties
     * @instance
     * @memberof OSH.UI.DialogView
     */
    show: function(properties) {
        if(properties.viewId.indexOf(this.getId()) > -1) {
            this.rootTag.style.display = "block";
            if(typeof(this.initialWidth) == "undefined" ) {
                this.initialWidth = this.rootTag.offsetWidth;
            }
        }
    },

    /**
     * @instance
     * @memberof OSH.UI.DialogView
     */
    connect: function() {
        if(!this.swapped) {
            if (!this.connected) {
                OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE, {dataSourcesId: this.connectionIds});
            } else {
                OSH.EventManager.fire(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE, {dataSourcesId: this.connectionIds});
            }
        }
    },

    /**
     * @instance
     * @memberof OSH.UI.DialogView
     */
    unpin: function() {
        if (!this.draggable) {
            var bodyRect = document.body.getBoundingClientRect(),
                elemRect = this.rootTag.getBoundingClientRect(),
                offsetTop = elemRect.top - bodyRect.top,
                offsetLeft = elemRect.left - bodyRect.left;

            this.rootTag.setAttribute("draggable", true);
            this.rootTag.parentNode.removeChild(this.rootTag);
            document.body.appendChild(this.rootTag);
            this.rootTag.style.top = offsetTop;
            this.rootTag.style.left = offsetLeft;
            this.rootTag.style.position = "absolute";
            this.draggable = true;

            document.getElementById(this.pinDivId).setAttribute("class", "pop-pin pop-pin-drag");
        } else {
            this.rootTag.style.top = 0;
            this.rootTag.style.left = 0 - (this.rootTag.offsetWidth - this.initialWidth);
            this.rootTag.style.position = "relative";
            this.rootTag.setAttribute("draggable", false);
            document.body.removeChild(this.rootTag);
            this.container.appendChild(this.rootTag);
            this.draggable = false;
            document.getElementById(this.pinDivId).setAttribute("class", "pop-pin");
        }
    },


    /**
     *
     * @param callback
     * @instance
     * @memberof OSH.UI.DialogView
     */
    onClose: function (callback) {
        this.onClose = callback;
    },

    /**
     * @instance
     * @memberof OSH.UI.DialogView
     */
    close: function () {
       // this.rootTag.parentNode.removeChild(this.rootTag);
        this.rootTag.style.display = "none";
        if (this.onClose) {
            this.onClose();
        }
    },

    /**
     *
     * @param event
     * @instance
     * @memberof OSH.UI.DialogView
     */
    drag_start: function (event) {
        event.stopPropagation();
        // Grab all computed styles of the dragged object
        var style = window.getComputedStyle(event.target, null);
        // dataTransfer sets data that is being dragged. In this case, the current X and Y values (ex. "1257,104")
        event.dataTransfer.effectAllowed = 'all';
        event.dataTransfer.setData("text-" + this.rootTag.id,
            (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));

    },

    /**
     *
     * @param event
     * @returns {boolean}
     * @instance
     * @memberof OSH.UI.DialogView
     */
    drag_over: function (event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    },

    /**
     *
     * @param event
     * @returns {boolean}
     * @instance
     * @memberof OSH.UI.DialogView
     */
    drop: function (event) {
        event.stopPropagation();
        // Set array of x and y values from the transfer data
        var offset = event.dataTransfer.getData("text-" + this.rootTag.id).split(',');
        this.rootTag.style.left = ((event.clientX + parseInt(offset[0], 10)) * 100) / window.innerWidth + "%";
        this.rootTag.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
        return false;
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc Display a dialog with multiple view attach to it.
 * @class
 * @type {OSH.UI.Dialog}
 * @augments OSH.UI.Dialog
 */
OSH.UI.MultiDialogView = OSH.UI.DialogView.extend({

    initialize:function(parentElementDivId, options) {
        this._super(parentElementDivId,options);
        // add extra part
        this.popExtraDiv = document.createElement("div");
        this.popExtraDiv.setAttribute("class","pop-extra");
        this.popExtraDiv.setAttribute("id","pop-extra-id-"+OSH.Utils.randomUUID());

        this.flexDiv.appendChild(this.popExtraDiv);
    },

    /**
     * Appends a new view to the existing dialog.
     * @param parentElement
     * @instance
     * @memberof OSH.UI.MultiDialogView
     */
    appendView:function(parentElement,properties) {
        //console.log(this.popContentDiv);
        //remove from parent
        var divToAdd = document.getElementById(parentElement);

        // check the visibility of the div
        if(divToAdd.style.display === "none") {
            divToAdd.style.display = "block";
        }


        var extraDiv = document.createElement("div");
        extraDiv.setAttribute("class","pop-extra-el");

        var i = document.createElement("i");
        i.setAttribute("class","fa fa-caret-right pop-extra-collapse fa-2x");

        i.onclick = function() {
            if(i.className.indexOf("fa-caret-down") == -1){
                i.className = "fa fa-caret-down pop-extra-show fa-2x";
            } else {
                i.className = "fa fa-caret-right pop-extra-collapse fa-2x";
            }
        };
        extraDiv.appendChild(i);
        extraDiv.appendChild(divToAdd);
        this.popExtraDiv.appendChild(extraDiv);

    },

    swap:function() {
        var currentSwapValue = this.swapped;
        this._super();

        // hide extra stuff
        if(!currentSwapValue) {
            this.popExtraDiv.style.display = "none";
        } else {
            this.popExtraDiv.style.display = "block";
        }
    },

    show: function(properties) {
        this._super(properties);
        //if(!isUndefinedOrNull(this.divToAdd) && this.divToAdd.style.display === "none") {
        //   this.divToAdd.style.display = "block";
        //  }
    }
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @class
 * @classdesc
 */
OSH.UI.Loading = BaseClass.extend({
    initialize: function () {
        var loadingDiv = document.createElement("div");
        loadingDiv.setAttribute("class",'loading-container');

        OSH.EventManager.observe(OSH.EventManager.EVENT.LOADING_START,function(event){
            var htmlVar="";
            htmlVar += "	<div class=\"loading-dot-container\">";
            htmlVar += "	<div class=\"loading-dot-section-1\"><span class=\"loading-label\">Buffering<\/span><\/div>";
            htmlVar += "	<div class=\"loading-dot-section-2\">";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	</div>";
            htmlVar += "	<\/div>";

            loadingDiv.innerHTML = htmlVar;
            document.body.appendChild(loadingDiv);
        });

        OSH.EventManager.observe(OSH.EventManager.EVENT.LOADING_STOP,function(event){
            document.body.removeChild(loadingDiv);
        });
    }
});

new OSH.UI.Loading();
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 var rangeSlider = new OSH.UI.RangeSlider("rangeSlider-container",{
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        refreshRate:1, // rate of data received
        dataSourcesId: [someDataSource.id],
 });
 */
OSH.UI.RangeSlider = OSH.UI.View.extend({
	initialize: function (parentElementDivId, options) {
		this._super(parentElementDivId, [], options);

		this.slider = document.createElement("div");
		var activateButtonDiv = document.createElement("div");
		var aTagActivateButton = document.createElement("a");
		activateButtonDiv.appendChild(aTagActivateButton);


		this.slider.setAttribute("class","osh-rangeslider-slider");
		activateButtonDiv.setAttribute("class","osh-rangeslider-control");

		var self = this;

		activateButtonDiv.addEventListener("click",function(event) {
			if(activateButtonDiv.className.indexOf("osh-rangeslider-control-select") > -1) {
				activateButtonDiv.setAttribute("class","osh-rangeslider-control");
				self.deactivate();
			} else {
				activateButtonDiv.setAttribute("class","osh-rangeslider-control-select");
				self.activate();
			}
		});
		document.getElementById(this.divId).appendChild(this.slider);
		document.getElementById(this.divId).appendChild(activateButtonDiv);

		var startTime = new Date().getTime();
		this.endTime = new Date("2055-01-01T00:00:00Z").getTime(); //01/01/2055
		this.slider.setAttribute('disabled', true);

		this.dataSourcesId = [];

		this.multi = false;
		// compute a refresh rate
		this.dataCount = 0;
		this.refreshRate = 10;

		if(typeof options != "undefined") {
			if(typeof options.startTime != "undefined") {
				startTime = new Date(options.startTime).getTime();
				//slider.removeAttribute('disabled');
			}

			if(typeof options.endTime != "undefined") {
				this.endTime = new Date(options.endTime).getTime();
			}

			if(typeof options.dataSourcesId != "undefined") {
				this.dataSourcesId = options.dataSourcesId;
			}
			if(typeof options.refreshRate != "undefined") {
				this.refreshRate = options.refreshRate;
			}

		}

		noUiSlider.create(this.slider, {
			start: [startTime,this.endTime]/*,timestamp("2015-02-16T08:09:00Z")]*/,
			range: {
				min: startTime,
				max: this.endTime
			},
			//step:  1000* 60* 60,
			format: wNumb({
				decimals: 0
			}),
			behaviour: 'drag',
			connect: true,
			tooltips: [
				wNumb({
					decimals: 1,
					edit:function( value ){
						var date = new Date(parseInt(value)).toISOString();
						return date.split("T")[1].split("Z")[0];
					}
				}),
				wNumb({
					decimals: 1,
					edit:function( value ){
						var date = new Date(parseInt(value)).toISOString();
						return date.split("T")[1].split("Z")[0];
					}
				})
			],
			pips: {
				mode: 'positions',
				values: [5,25,50,75],
				density: 1,
				//stepped: true,
				format: wNumb({
					edit:function( value ){
						return new Date(parseInt(value)).toISOString().replace(".000Z", "Z");
					}
				})
			}
		});

		//noUi-handle noUi-handle-lower
		// start->update->end
		this.slider.noUiSlider.on("slide", function (values, handle) {
			self.update = true;
		});

		// listen for DataSourceId
		OSH.EventManager.observe(OSH.EventManager.EVENT.CURRENT_MASTER_TIME, function (event) {
			var filterOk = true;

			if(self.dataSourcesId.length > 0) {
				if(self.dataSourcesId.indexOf(event.dataSourceId) < 0) {
					filterOk = false;
				}
            }

			if(filterOk && !self.lock && ((++self.dataCount)%self.refreshRate == 0)) {
				self.slider.noUiSlider.set([event.timeStamp]);
				self.dataCount = 0;
			}
		});
	},

	/**
	 * @instance
	 * @memberof OSH.UI.RangeSlider
	 */
	deactivate:function() {
		this.slider.setAttribute('disabled', true);
		this.lock = false;
		if(this.update) {
			var values = this.slider.noUiSlider.get();
			OSH.EventManager.fire(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME, {
				startTime: new Date(parseInt(values[0])).toISOString(),
				endTime: new Date(parseInt(values[1])).toISOString()
			});
		}
		this.update = false;
	},

	/**
	 * @instance
	 * @memberof OSH.UI.RangeSlider
	 */
	activate: function() {
		this.slider.removeAttribute('disabled');
		this.lock = true;
	}
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 *
 * @class
 * @classdesc
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 *
 */
var htmlTaskingComponent="";
htmlTaskingComponent += "<div class=\"ptz-zoom\">";
htmlTaskingComponent += "   <div class=\"ptz-zoom-in\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i></div>";
htmlTaskingComponent += "   <div class=\"ptz-zoom-bar\"></div>";
htmlTaskingComponent += "   <div class=\"ptz-zoom-out\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></div>";
htmlTaskingComponent += "<\/div>";
htmlTaskingComponent += "<div class=\"ptz\">";
htmlTaskingComponent += "   <div tag=\"0\" class='moveUp' name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"91\" class='moveTopLeft' name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"90\" class=\"moveTopRight\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"6\" class=\"moveLeft\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div cmd=\"ptzReset\" class=\"reset\" title=\"Center\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"4\" class=\"moveRight\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"93\" class=\"moveBottomLeft\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"92\" class=\"moveBottomRight\" name=\"\"><\/div>";
htmlTaskingComponent += "   <div tag=\"2\" class=\"moveDown\" name=\"\"><\/div>";
htmlTaskingComponent += "<\/div>";
htmlTaskingComponent += "<div class=\"ptz-right\">";
htmlTaskingComponent += "<ul>";
htmlTaskingComponent += "            <li>";
htmlTaskingComponent += "                <label>Presets:<\/label>";
htmlTaskingComponent += "                <div class=\"ptz-select-style\">";
htmlTaskingComponent += "                     <select class=\"ptz-presets\" required pattern=\"^(?!Select a Preset).*\">";
htmlTaskingComponent += "                         <option value=\"\" disabled selected>Select a Preset<\/option>";
htmlTaskingComponent += "                     <\/select>";
htmlTaskingComponent += "                <\/div>";
htmlTaskingComponent += "            <\/li>";
htmlTaskingComponent += "</ul>";
htmlTaskingComponent += "<\/div>";

OSH.UI.PtzTaskingView = OSH.UI.View.extend({
    initialize: function (divId, options) {
        this._super(divId,[],options);
        var width = "640";
        var height = "480";
        this.css = "tasking";

        this.cssSelected = "";

        if(typeof (options) !== "undefined") {
            if (options.width) {
                width = options.width;
            }

            if (options.height) {
                height = options.height;
            }

            if (options.css) {
                this.css += options.css;
            }

            if (options.cssSelected) {
                this.cssSelected = options.cssSelected;
            }

            if(options.dataSenderId) {
                this.dataSenderId = options.dataSenderId;
            }
        }

        // creates video tag element
        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("height", height);
        this.rootTag.setAttribute("width", width);
        this.rootTag.setAttribute("class", this.css);
        this.rootTag.setAttribute("id", "dataview-" + OSH.Utils.randomUUID());

        // appends <img> tag to <div>
        document.getElementById(this.divId).appendChild(this.rootTag);

        this.rootTag.innerHTML = htmlTaskingComponent;

        this.pan = 0;
        this.tilt = 0;
        this.zoom = 0;

        var increment = 5;

        this.observers = [];

        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveUp").onclick = function(){this.onTiltClick(increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveTopLeft").onclick = function(){this.onTiltPanClick(-1*increment,increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveTopRight").onclick =  function(){this.onTiltPanClick(increment,increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveRight").onclick =  function(){this.onPanClick(increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveLeft").onclick =  function(){this.onPanClick(-1*increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveDown").onclick =  function(){this.onTiltClick(-1*increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveBottomLeft").onclick = function(){this.onTiltPanClick(-1*increment,-1*increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz > .moveBottomRight").onclick =  function(){this.onTiltPanClick(increment,-1*increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz-zoom > .ptz-zoom-in").onclick =  function(){this.onZoomClick(increment)}.bind(this);
        document.querySelector('#'+this.rootTag.id+ " >  .ptz-zoom > .ptz-zoom-out").onclick =  function(){this.onZoomClick(-1*increment)}.bind(this);

        // add presets if any
        if(typeof (options) !== "undefined" && (options.presets)) {
            this.addPresets(options.presets);

            // add listeners
            document.querySelector('#'+this.rootTag.id+ "  .ptz-right  .ptz-select-style  .ptz-presets").onchange = this.onSelectedPresets.bind(this);
        }
    },

    /**
     *
     * @param presets array
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    addPresets:function(presetsArr) {
        var selectTag = document.querySelector('#'+this.rootTag.id+ "  .ptz-right  .ptz-select-style  .ptz-presets");
        for(var i in presetsArr) {
            var option = document.createElement("option");
            option.text = presetsArr[i];
            option.value = presetsArr[i];
            selectTag.add(option);
        }
    },

    /**
     *
     * @param event
     * @memberof OSH.UI.PtzTaskingView
     * @instance
     */
    onSelectedPresets : function(event) {
        var serverTag = document.querySelector('#'+this.rootTag.id+ "  .ptz-right  .ptz-select-style  .ptz-presets");
        var option = serverTag.options[serverTag.selectedIndex];
        this.onChange(null,null,null,option.value);
    },

    /**
     *
     * @param interval
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    removeInterval: function(interval) {
        if(this.timerIds.length > 0) {
            setTimeout(clearInterval(this.timerIds.pop()),interval+50);
        }
    },

    /**
     *
     * @param value
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    onTiltClick: function (value) {
        this.tilt += value;
        this.onChange(null,value,null,null);
    },

    /**
     *
     * @param tiltValue the titl value
     * @param panValue the panValue value
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    onTiltPanClick:function(tiltValue,panValue) {
        this.tilt += tiltValue;
        this.pan += panValue;

        this.onChange(tiltValue,panValue,null,null);
    },

    /**
     *
     * @param value
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    onPanClick: function(value) {
        this.pan += value;
        this.onChange(value,null,null,null);
    },

    /**
     *
     * @param value
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    onZoomClick: function(value) {
        this.zoom += value;
        this.onChange(null,null,value,null);
    },

    /**
     *
     * @param rpan
     * @param rtilt
     * @param rzoom
     * @instance
     * @memberof OSH.UI.PtzTaskingView
     */
    onChange: function(rpan, rtilt, rzoom,preset) {
        OSH.EventManager.fire(OSH.EventManager.EVENT.PTZ_SEND_REQUEST+"-"+this.dataSenderId,{
            cmdData : {rpan:rpan,rtilt:rtilt,rzoom:rzoom,preset:preset},
            onSuccess:function(event){console.log("Failed to send request: "+event);},
            onError:function(event){console.log("Request sent successfully: "+event);}
        });
    }
});


/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 var videoView = new OSH.UI.FFMPEGView("videoContainer-id", {
    dataSourceId: videoDataSource.id,
    css: "video",
    cssSelected: "video-selected",
    name: "Video",
    useWorker:true,
    useWebWorkerTransferableData: false // this is because you can speed up the data transfert between main script and web worker
                                            by using transferable data. Note that can cause problems if you data is attempted to use anywhere else.
                                            See the not below for more details(*).
});

 (*)The transferableData actually transfers the ownership of the object to or from the web worker.
 It's like passing by reference where a copy isn't made. The difference between it and the normal pass-by-reference
 is that the side that transferred the data can no longer access it. In that case, the use of the data must be UNIQUE, that means
 you cannot use the data for anything else (like another viewer).

 The non transferable data is a copy of the data to be made before being sent to the worker. That could be slow for a large amount of data.
 */
OSH.UI.FFMPEGView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, options) {
        this._super(parentElementDivId, [], options);

        this.fps = 0;
        var width = "640";
        var height = "480";

        this.nbFrames = 0;
        /*
         for 1920 x 1080 @ 25 fps = 7 MB/s
         1 frame = 0.28MB
         178 frames = 50MB
         */
        this.FLUSH_LIMIT  = 200;

        this.statistics = {
            videoStartTime: 0,
            videoPictureCounter: 0,
            windowStartTime: 0,
            windowPictureCounter: 0,
            fps: 0,
            fpsMin: 1000,
            fpsMax: -1000,
            fpsSinceStart: 0
        };

        this.useWorker = OSH.Utils.isWebWorker();
        this.resetCalled = true;
        this.useTransferableData = true;

        if (typeof options != "undefined") {
            if (options.width) {
                width = options.width;
            }

            if (options.height) {
                height = options.height;
            }

            this.useWorker = (typeof options.useWorker != "undefined") && (options.useWorker) && (OSH.Utils.isWebWorker());

            if(options.adjust) {
                var divElt = document.getElementById(this.divId);
                if(divElt.offsetWidth < width) {
                    width = divElt.offsetWidth;
                }
                if(divElt.offsetHeight < height) {
                    height = divElt.offsetHeight;
                }
            }

            if(options.useWebWorkerTransferableData) {
                this.useWebWorkerTransferableData = options.useWebWorkerTransferableData;
            }
        }


        // create webGL canvas
        this.yuvCanvas = new YUVCanvas({width: width, height: height, contextOptions: {preserveDrawingBuffer: true}});
        var domNode = document.getElementById(this.divId);
        domNode.appendChild(this.yuvCanvas.canvasElement);

        // add selection listener
        var self = this;
        OSH.EventManager.observeDiv(this.divId, "click", function (event) {
            OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                dataSourcesIds: [self.dataSourceId],
                entityId: self.entityId
            });
        });

        if (this.useWorker) {
            this.initFFMPEG_DECODER_WORKER();
        } else {
            this.initFFMEG_DECODER();
        }
    },

    /**
     *
     * @param dataSourceId
     * @param data
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    setData: function (dataSourceId, data) {
        var pktData = data.data;
        var pktSize = pktData.length;

        this.resetCalled = false;

        if (this.useWorker) {
            this.decodeWorker(pktSize, pktData);
        } else {
            var decodedFrame = this.decode(pktSize, pktData);
            this.displayFrame(decodedFrame);
            this.update = false;
        }
        //check for flush
        this.checkFlush();
    },


    checkFlush: function() {
        if(!this.useWorker && this.nbFrames >= this.FLUSH_LIMIT) {
            this.nbFrames = 0;
            _avcodec_flush_buffers(this.av_ctx);
        }
    },
    /**
     *
     * @param $super
     * @param dataSourceIds
     * @param entityId
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    selectDataView: function (dataSourceIds, entityId) {
        if (dataSourceIds.indexOf(this.dataSourceId) > -1 || (typeof this.entityId != "undefined") && this.entityId == entityId) {
            document.getElementById(this.divId).setAttribute("class", this.css + " " + this.cssSelected);
        } else {
            document.getElementById(this.divId).setAttribute("class", this.css);
        }
    },


    /**
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    reset: function () {
        _avcodec_flush_buffers(this.av_ctx);
        // clear canvas
        this.resetCalled = true;
        var nodata = new Uint8Array(1);
        this.yuvCanvas.drawNextOuptutPictureGL({
            yData: nodata,
            yDataPerRow: 1,
            yRowCnt: 1,
            uData: nodata,
            uDataPerRow: 1,
            uRowCnt: 1,
            vData: nodata,
            vDataPerRow: 1,
            vRowCnt: 1
        });
    },

    /**
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    updateStatistics: function () {
        var s = this.statistics;
        s.videoPictureCounter += 1;
        s.windowPictureCounter += 1;
        var now = Date.now();
        if (!s.videoStartTime) {
            s.videoStartTime = now;
        }
        var videoElapsedTime = now - s.videoStartTime;
        s.elapsed = videoElapsedTime / 1000;
        if (videoElapsedTime < 1000) {
            return;
        }

        if (!s.windowStartTime) {
            s.windowStartTime = now;
            return;
        } else if ((now - s.windowStartTime) > 1000) {
            var windowElapsedTime = now - s.windowStartTime;
            var fps = (s.windowPictureCounter / windowElapsedTime) * 1000;
            s.windowStartTime = now;
            s.windowPictureCounter = 0;

            if (fps < s.fpsMin) s.fpsMin = fps;
            if (fps > s.fpsMax) s.fpsMax = fps;
            s.fps = fps;
        }

        var fps = (s.videoPictureCounter / videoElapsedTime) * 1000;
        s.fpsSinceStart = fps;
    },

    /**
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    onAfterDecoded: function () {
    },

    //-- FFMPEG DECODING PART

    //-------------------------------------------------------//
    //---------- Web worker --------------------------------//
    //-----------------------------------------------------//

    /**
     * The worker code is located at the location js/workers/FFMPEGViewWorker.js.
     * This location cannot be changed. Be sure to have the right file at the right place.
     * @instance
     * @memberof OSH.UI.FFMPEGView
     * @param callback
     */
    initFFMPEG_DECODER_WORKER: function (callback) {
        this.worker = new Worker(window.OSH.BASE_WORKER_URL+'/osh-UI-FFMPEGViewWorker.js');

        var self = this;
        var decodedFrame;

        function release(decodedFrame) {
            self.worker.postMessage({
                data: decodedFrame,
                release:true
            }, [
                decodedFrame.y.buffer,
                decodedFrame.u.buffer,
                decodedFrame.v.buffer
            ]);
        }

        this.worker.onmessage = function (e) {
            if(e.data !== null) {
                decodedFrame = e.data.data;
                this.displayFrame(e.data.width,e.data.height,decodedFrame);

                release(decodedFrame);
            }
        }.bind(this);
        this.worker.onerror = function (e) {
          console.error(e);
        };
    },

    displayFrame:function(width,height,decodedFrame) {
        if (!this.resetCalled) {
            this.yuvCanvas.canvasElement.drawing = true;
            // adjust canvas size to fit to the decoded frame
            if(width != this.yuvCanvas.width) {
                this.yuvCanvas.canvasElement.width = width;
                this.yuvCanvas.width = width;
            }
            if(height != this.yuvCanvas.height) {
                this.yuvCanvas.canvasElement.height = height;
                this.yuvCanvas.height = height;
            }

            this.yuvCanvas.drawNextOuptutPictureGL({
                yData: decodedFrame.y,
                yDataPerRow: width,
                yRowCnt: height,
                uData: decodedFrame.u,
                uDataPerRow: width / 2,
                uRowCnt: height / 2,
                vData: decodedFrame.v,
                vDataPerRow: width / 2,
                vRowCnt: height / 2
            });
            this.yuvCanvas.canvasElement.drawing = false;

            this.updateStatistics();
            this.onAfterDecoded();
        }
    },

    /**
     *
     * @param pktSize
     * @param pktData
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    decodeWorker: function (pktSize, pktData) {
        // the transferableData actually transfer the ownership of the object to or from the web worker.
        // It's like passing by reference where a copy isn't made.
        // The difference between it and the normal pass-by-reference is that the side that transferred the data can no longer access it.

        if (this.useWebWorkerTransferableData) {
            this.worker.postMessage({data:pktData,release:false}, [pktData.buffer]);
        } else {
            // no transferable data
            // a copy of the data to be made before being sent to the worker. That could be slow for a large amount of data.

            var noTransferableObjData = {
                data: pktData,
                byteOffset: pktData.byteOffset,
                release:false
            };

            this.worker.postMessage(noTransferableObjData);
        }

    },

    //-------------------------------------------------------//
    //---------- No Web worker -----------------------------//
    //-----------------------------------------------------//

    /**
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    initFFMEG_DECODER: function () {
        // register all compiled codecs
        Module.ccall('avcodec_register_all');

        // find h264 decoder
        var codec = Module.ccall('avcodec_find_decoder_by_name', 'number', ['string'], ["h264"]);
        if (codec == 0)
        {
            console.error("Could not find H264 codec");
            return;
        }

        // init codec and conversion context
        this.av_ctx = _avcodec_alloc_context3(codec);

        // open codec
        var ret = _avcodec_open2(this.av_ctx, codec, 0);
        if (ret < 0)
        {
            console.error("Could not initialize codec");
            return;
        }

        // allocate packet
        this.av_pkt = Module._malloc(96);
        this.av_pktData = Module._malloc(1024*150);
        _av_init_packet(this.av_pkt);
        Module.setValue(this.av_pkt+24, this.av_pktData, '*');

        // allocate video frame
        this.av_frame = _avcodec_alloc_frame();
        if (!this.av_frame)
            alert("Could not allocate video frame");

        // init decode frame function
        this.got_frame = Module._malloc(4);
        this.maxPktSize = 1024 * 50;
    },

    /**
     *
     * @param pktSize
     * @param pktData
     * @returns {{frame_width: *, frame_height: *, frameYDataPtr: *, frameUDataPtr: *, frameVDataPtr: *, frameYData: Uint8Array, frameUData: Uint8Array, frameVData: Uint8Array}}
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    decode: function (pktSize, pktData) {
        if(!this.update) {
            this.update = true;
            if (pktSize > this.maxPktSize) {
                // dealloc old allocation
                Module._free(this.av_pktData);
                this.av_pktData = Module._malloc(pktSize);
                Module.setValue(this.av_pkt + 24, this.av_pktData, '*');
                this.maxPktSize = pktSize;
            }

            /*// prepare packet
             Module.setValue(this.av_pkt + 28, pktSize, 'i32');
             Module.writeArrayToMemory(pktData, this.av_pktData);

             // decode next frame
             var len = _avcodec_decode_video2(this.av_ctx, this.av_frame, this.got_frame, this.av_pkt);
             if (len < 0) {
             console.log("Error while decoding frame");
             return;
             }

             if (Module.getValue(this.got_frame, 'i8') == 0) {
             //console.log("No frame");
             return;
             }

             var decoded_frame = this.av_frame;
             var frame_width = Module.getValue(decoded_frame + 68, 'i32');
             var frame_height = Module.getValue(decoded_frame + 72, 'i32');
             //console.log("Decoded Frame, W=" + frame_width + ", H=" + frame_height);

             // copy Y channel to canvas
             var frameYDataPtr = Module.getValue(decoded_frame, '*');
             var frameUDataPtr = Module.getValue(decoded_frame + 4, '*');
             var frameVDataPtr = Module.getValue(decoded_frame + 8, '*');

             return {
             frame_width: frame_width,
             frame_height: frame_height,
             frameYDataPtr: frameYDataPtr,
             frameUDataPtr: frameUDataPtr,
             frameVDataPtr: frameVDataPtr,
             frameYData: new Uint8Array(Module.HEAPU8.buffer, frameYDataPtr, frame_width * frame_height),
             frameUData: new Uint8Array(Module.HEAPU8.buffer, frameUDataPtr, frame_width / 2 * frame_height / 2),
             frameVData: new Uint8Array(Module.HEAPU8.buffer, frameVDataPtr, frame_width / 2 * frame_height / 2)
             };*/
            var self = this;
            // prepare packet
            Module.setValue(self.av_pkt + 28, pktSize, 'i32');

            Module.writeArrayToMemory(pktData, self.av_pktData);

            // decode next frame
            var len = _avcodec_decode_video2(self.av_ctx, self.av_frame, self.got_frame, self.av_pkt);
            if (len < 0) {
                console.log("Error while decoding frame");
                return null;
            }

            if (Module.getValue(self.got_frame, 'i8') == 0) {
                //console.log("No frame");
                return null;
            }

            var decoded_frame = self.av_frame;
            var frame_width = Module.getValue(decoded_frame + 68, 'i32');
            var frame_height = Module.getValue(decoded_frame + 72, 'i32');
            //console.log("Decoded Frame, W=" + frame_width + ", H=" + frame_height);

            // copy Y channel to canvas
            var frameYDataPtr = Module.getValue(decoded_frame, '*');
            var frameUDataPtr = Module.getValue(decoded_frame + 4, '*');
            var frameVDataPtr = Module.getValue(decoded_frame + 8, '*');


            try {
                var arrY = new Uint8Array(Module.HEAPU8.buffer, frameYDataPtr, frame_width * frame_height);
                var arrU = new Uint8Array(Module.HEAPU8.buffer, frameUDataPtr, frame_width / 2 * frame_height / 2);
                var arrV = new Uint8Array(Module.HEAPU8.buffer, frameVDataPtr, frame_width / 2 * frame_height / 2);

                return {
                    frame_width: frame_width,
                    frame_height: frame_height,
                    frameYDataPtr: frameYDataPtr,
                    frameUDataPtr: frameUDataPtr,
                    frameVDataPtr: frameVDataPtr,
                    frameYData: arrY,
                    frameUData: arrU,
                    frameVData: arrV
                };
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    },
});
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
var videoView = new OSH.UI.MjpegView("containerId", {
    dataSourceId: datasource.id,
    entityId : entity.id,
    css: "video",
    cssSelected: "video-selected",
    name: "Video"
});
 */
OSH.UI.MjpegView = OSH.UI.View.extend({
  initialize: function(parentElementDivId,options) {
    this._super(parentElementDivId,[],options);

    // creates video tag element
    this.imgTag = document.createElement("img");
    this.imgTag.setAttribute("id", "dataview-"+OSH.Utils.randomUUID());

    // rotation option
    this.rotation = 0;
    if (typeof(options) != "undefined" && typeof(options.rotation) != "undefined") {
        this.rotation = options.rotation*Math.PI/180;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 640;
        this.canvas.height = 480;
        var ctx = this.canvas.getContext('2d');
        ctx.translate(0, 480) ;
        ctx.rotate(this.rotation);
        document.getElementById(this.divId).appendChild(this.canvas);
    } else {
        // appends <img> tag to <div>
        document.getElementById(this.divId).appendChild(this.imgTag);
    }

    // adds listener
    var self = this;
    OSH.EventManager.observeDiv(this.divId,"click",function(event){
      OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
        dataSourcesIds: [self.dataSourceId],
        entityId : self.entityId
      });
    });
  },

  /**
   *
   * @param $super
   * @param dataSourceId
   * @param data
   * @instance
   * @memberof OSH.UI.MjpegView
   */
  setData: function(dataSourceId,data) {
      var oldBlobURL = this.imgTag.src;
      this.imgTag.src = data.data;
      window.URL.revokeObjectURL(oldBlobURL);
  },

  /**
   *
   * @param $super
   * @param dataSourceIds
   * @param entityId
   * @instance
   * @memberof OSH.UI.MjpegView
   */
  selectDataView: function(dataSourceIds,entityId) {
    if(dataSourceIds.indexOf(this.dataSourceId) > -1 || (typeof this.entityId != "undefined") && this.entityId == entityId) {
      document.getElementById(this.divId).setAttribute("class",this.css+" "+this.cssSelected);
    } else {
      document.getElementById(this.divId).setAttribute("class",this.css);
    }
  },

  /**
   * @instance
   * @memberof OSH.UI.MjpegView
   */
  reset: function() {
      this.imgTag.src = "";
  }
});


/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 var videoView = new OSH.UI.Mp4View("videoContainer-id", {
    dataSourceId: videoDataSource.id,
    css: "video",
    cssSelected: "video-selected",
    name: "Video"
 });
 */
OSH.UI.Mp4View = OSH.UI.View.extend({
  initialize: function(parentElementDivId,options) {
    this._super(parentElementDivId,[],options);

    var width = "640";
    var height = "480";

    var width = "640";
    var height = "480";

    this.codecs = "avc1.64001E";
    //this.codecs="avc1.42401F";
    //this.codecs = 'avc1.42E01E';

      if(typeof options != "undefined" ) {
      if (options.css) {
        this.css = options.css;
      }

      //this.codecs="avc1.42401F";

      if (options.codecs) {
        this.codecs = options.codecs;
      }
    }

    // creates video tag element
    this.video = document.createElement("video");
    this.video.setAttribute("control", '');
    // appends <video> tag to <div>
    document.getElementById(this.divId).appendChild(this.video);

    // adds listener
    var self = this;
    OSH.EventManager.observeDiv(this.divId,"click",function(event){
      OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
        dataSourcesIds: [self.dataSourceId],
        entityId : self.entityId
      });
    });

    // creates MediaSource object
    this.mediaSource = new MediaSource();
    this.buffer = null;
    this.queue = [];

    this.video.src = window.URL.createObjectURL(this.mediaSource);

    this.mediaSource.addEventListener('sourceopen', function(e) {
      this.mediaSource.duration = 10000000;
      this.video.play();

        /**
         * avc1.42E01E: H.264 Constrained Baseline Profile Level 3
           avc1.4D401E: H.264 Main Profile Level 3
           avc1.64001E: H.264 High Profile Level 3
         */
      this.buffer = this.mediaSource.addSourceBuffer('	video/mp4; codecs="avc1.64001E"; profiles="isom,iso2,avc1,iso6,mp41"');

      var mediaSource = this.mediaSource;

      this.buffer.addEventListener('updatestart', function(e) {
        /*console.log('updatestart: ' + mediaSource.readyState);*/
        if(this.queue.length > 0 && !this.buffer.updating) {
          this.buffer.appendBuffer(this.queue.shift());
        }
      }.bind(this));
      this.buffer.addEventListener('error', function(e) { /*console.log('error: ' + mediaSource.readyState);*/ });
      this.buffer.addEventListener('abort', function(e) { /*console.log('abort: ' + mediaSource.readyState);*/ });

      this.buffer.addEventListener('updateend', function() { // Note: Have tried 'updateend'
        if(this.queue.length > 0) {
          this.buffer.appendBuffer(this.queue.shift());
        }
      }.bind(this));
    }.bind(this), false);

     var mediaSource = this.mediaSource;

    this.mediaSource.addEventListener('sourceopen', function(e) { /*console.log('sourceopen: ' + mediaSource.readyState);*/ });
    this.mediaSource.addEventListener('sourceended', function(e) { /*console.log('sourceended: ' + mediaSource.readyState);*/ });
    this.mediaSource.addEventListener('sourceclose', function(e) { /*console.log('sourceclose: ' + mediaSource.readyState);*/ });
    this.mediaSource.addEventListener('error', function(e) { /*console.log('error: ' + mediaSource.readyState);*/ });

    OSH.EventManager.observeDiv(this.divId, "click", function (event) {
        OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
            dataSourcesIds: [self.dataSourceId],
            entityId: self.entityId
        });
    });

  },

  /**
   *
   * @param dataSourceId
   * @param data
   * @instance
   * @memberof OSH.UI.Mp4View
   */
  setData: function(dataSourceId,data) {
      if (this.buffer.updating || this.queue.length > 0) {
        this.queue.push(data.data);
      } else {
        this.buffer.appendBuffer(data.data);
      }
      /*if(!this.buffer.updating) {
          this.buffer.appendBuffer(data.data);
      }*/
  },

  /**
   *
   * @param $super
   * @param dataSourceIds
   * @param entityId
   * @instance
   * @memberof OSH.UI.Mp4View
   */
  selectDataView: function(dataSourceIds, entityId) {
	  if(dataSourceIds.indexOf(this.dataSourceId) > -1 || (typeof this.entityId != "undefined") && this.entityId == entityId) {
		  document.getElementById(this.divId).setAttribute("class",this.css+" "+this.cssSelected);
	  } else {
          document.getElementById(this.divId).setAttribute("class",this.css);
	  }
  }
});