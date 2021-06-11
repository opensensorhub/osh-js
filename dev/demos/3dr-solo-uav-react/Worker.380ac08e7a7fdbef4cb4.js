/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/utils/Utils.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/** * @module Utils */

/** Maximum value of a long */
const MAX_LONG = Math.pow(2, 53) + 1;
/**
 * Global helper method to test if a letiable or object attribute is defined
 */

function isDefined(v) {
  return typeof v !== 'undefined' && v !== null;
}
/**
 Global helper method to test if a letiable or object attribute has a value,
 that is it is defined and non null
 */

function hasValue(v) {
  return isDefined(v) && v !== null;
}
/**
 Global helper method to transform hex color into RGBA
 */

function hex2rgb(hex) {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return [r, g, b];
}
/**
 Global helper method to test if a letiable or object attribute is of a particular type
 */

function hasType(v, expectedType) {
  let hasVal = hasValue(v);
  return hasVal && typeof v === expectedType;
}
/**
 Global helper method to test if a letiable or object attribute is an object
 */

function isObject(v, letName) {
  return hasType(v, 'object', letName);
}
/**
 Global helper method to test if a letiable or object attribute is an array
 */

function isArray(v) {
  return isDefined(v) && Array.isArray(v);
}
/**
 Global helper method to test if a letiable or object attribute is a function
 */

function isFunction(v, letName) {
  return hasType(v, 'function', letName);
}
/**
 Assert that a letiable or object attribute is defined
 **/

function assertDefined(v, letName = 'letiable') {
  if (!isDefined(v)) {
    throw letName + " must be defined";
  }

  return v;
}
function assertTrue(v, letName = 'letiable') {
  if (!isDefined(v) || !v) {
    throw letName;
  }

  return v;
}
/**
 Assert that a letiable or object attribute is defined and non-null
 **/

function assertType(v, expectedType, letName = 'letiable') {
  assertDefined(v, letName);

  if (typeof v !== expectedType) {
    throw letName + " must be of type " + expectedType;
  }

  return v;
}
/**
 Assert that a letiable or object attribute is a string
 **/

function assertBoolean(v, letName) {
  return assertType(v, 'boolean', letName);
}
/**
 Assert that a letiable or object attribute is a string
 **/

function assertString(v, letName) {
  return assertType(v, 'string', letName);
}
/**
 Assert that a letiable or object attribute is a number
 **/

function assertNumber(v, letName) {
  return assertType(v, 'number', letName);
}
/**
 Assert that a letiable or object attribute is a number
 **/

function assertPositive(v, letName) {
  assertNumber(v, letName);

  if (v <= 0) {
    throw letName + " must be a positive number";
  }
}
/**
 Assert that a letiable or object attribute is an object
 **/

function assertObject(v, letName) {
  return assertType(v, 'object', letName);
}
/**
 Assert that a letiable or object attribute is an object
 **/

function assertArray(v, letName = 'letiable') {
  assertDefined(v, letName);

  if (!Array.isArray(v)) {
    throw letName + " must be an array";
  }

  return v;
}
/**
 Assert that a letiable or object attribute is a function
 **/

function assertFunction(v, letName) {
  return assertType(v, 'function', letName);
}
/**
 Assert that a letiable or object attribute is defined and non-null
 **/

function assertHasValue(v, letName = 'letiable') {
  assertDefined(v, letName);

  if (!hasValue(v)) {
    throw letName + " must not be null";
  }

  return v;
}
/**
 *
 * @return {String}
 */

function randomUUID() {
  return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
/**
 * This function stamps/embeds a UUID into an object and returns the UUID generated for it
 * @return {String}
 */

function stampUUID(obj) {
  obj._osh_id = obj._osh_id || randomUUID();
  return obj._osh_id;
} //buffer is an ArrayBuffer object, the offset if specified in bytes, and the type is a string
//corresponding to an OGC data type.
//See http://def.seegrid.csiro.au/sissvoc/ogc-def/resource?uri=http://www.opengis.net/def/dataType/OGC/0/

/**
 *
 * @param buffer
 * @param offset
 * @param type
 * @return {*}
 */

function ParseBytes(buffer, offset, type) {
  let view = new DataView(buffer); //Note: There exist types not listed in the map below that have OGC definitions, but no appropriate
  //methods or corresponding types available for parsing in javascript. They are float128, float16, signedLong,
  //and unsignedLong

  let typeMap = {
    double: function (offset) {
      return {
        val: view.getFloat64(offset),
        bytes: 8
      };
    },
    float64: function (offset) {
      return {
        val: view.getFloat64(offset),
        bytes: 8
      };
    },
    float32: function (offset) {
      return {
        val: view.getFloat32(offset),
        bytes: 4
      };
    },
    signedByte: function (offset) {
      return {
        val: view.getInt8(offset),
        bytes: 1
      };
    },
    signedInt: function (offset) {
      return {
        val: view.getInt32(offset),
        bytes: 4
      };
    },
    signedShort: function (offset) {
      return {
        val: view.getInt16(offset),
        bytes: 2
      };
    },
    unsignedByte: function (offset) {
      return {
        val: view.getUint8(offset),
        bytes: 1
      };
    },
    unsignedInt: function (offset) {
      return {
        val: view.getUint32(offset),
        bytes: 4
      };
    },
    unsignedShort: function (offset) {
      return {
        val: view.getUint16(offset),
        bytes: 2
      };
    } //TODO: string-utf-8:

  };
  return typeMap[type](offset);
} //This function recursivley iterates over the resultStructure to fill in
//values read from data which should be an ArrayBuffer containing the payload from a websocket

/**
 *
 * @param struct
 * @param data
 * @param offsetBytes
 * @return {*}
 */

function ReadData(struct, data, offsetBytes) {
  let offset = offsetBytes;

  for (let i = 0; i < struct.fields.length; i++) {
    let currFieldStruct = struct.fields[i];

    if (isDefined(currFieldStruct.type) && currFieldStruct.type !== null) {
      let ret = ParseBytes(data, offset, currFieldStruct.type);
      currFieldStruct.val = ret.val;
      offset += ret.bytes;
    } else if (isDefined(currFieldStruct.count) && currFieldStruct.count !== null) {
      //check if count is a reference to another letiable
      if (isNaN(currFieldStruct.count)) {
        let id = currFieldStruct.count;
        let fieldName = struct.id2FieldMap[id];
        currFieldStruct.count = struct.findFieldByName(fieldName).val;
      }

      for (let c = 0; c < currFieldStruct.count; c++) {
        for (let j = 0; j < currFieldStruct.fields.length; j++) {
          let field = JSON.parse(JSON.stringify(currFieldStruct.fields[j]));
          offset = ReadData(field, data, offset);
          currFieldStruct.val.push(field);
        }
      }
    }
  }

  return offset;
}
/**
 *
 * @param resultStructure
 * @return {{}}
 */

function GetResultObject(resultStructure) {
  //TODO: handle cases for nested arrays / matrix data types
  let result = {};

  for (let i = 0; i < resultStructure.fields.length; i++) {
    if (isDefined(resultStructure.fields[i].count)) {
      result[resultStructure.fields[i].name] = [];

      for (let c = 0; c < resultStructure.fields[i].count; c++) {
        let item = {};

        for (let k = 0; k < resultStructure.fields[i].val[c].fields.length; k++) {
          item[resultStructure.fields[i].val[c].fields[k].name] = resultStructure.fields[i].val[c].fields[k].val;
        }

        result[resultStructure.fields[i].name].push(item);
      }
    } else {
      result[resultStructure.fields[i].name] = resultStructure.fields[i].val;
    }
  }

  return result;
}
/**
 *
 * @return {boolean}
 */

function isOpera() {
  return !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
}
/**
 *
 * @return {boolean}
 */

function isFirefox() {
  return typeof InstallTrigger !== 'undefined';
}
/**
 *
 * @return {boolean}
 */

function isSafari() {
  return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
}
/**
 *
 * @return {boolean}
 */

function isChrome() {
  return !!window.chrome && !!window.chrome.webstore;
}
/**
 *
 * @return {*|boolean}
 */

function isBlink() {
  return (isChrome || isOpera) && !!window.CSS;
}
/**
 *
 * @param a
 * @param b
 * @return {boolean}
 */

function isArrayIntersect(a, b) {
  return a.filter(function (element) {
    return b.indexOf(element) > -1;
  }).length > 0;
}
/**
 *
 * @param o
 * @return {boolean}
 */

function isElement(o) {
  return typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
  o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
}
/**
 *
 * @return {*}
 */

function isWebWorker() {
  return isDefined(Worker);
}
/**
 *
 * @param div
 */

function takeScreenShot(div) {}
/**
 * Remove a css class from a the div given as argument.
 * @param div the div to remove the class from
 * @param css the css class to remove
 */

function removeCss(div, css) {
  let divCss = div.className;
  css = divCss.replace(css, "");
  div.className = css;
}
/**
 * Add a css class to a the div given as argument.
 * @param div the div to add the class to
 * @param css the css class to add
 */

function addCss(div, css) {
  div.setAttribute("class", div.className + " " + css);
}
/**
 * Removes the last character of a {string} object.
 * @param {string} value - The input {string}
 * @return {string} The value without the last character
 */

function removeLastCharIfExist(value) {
  if (!isDefined(undefined) || value === null || value.length === 0 || !value.endsWith("/")) {
    return value;
  }

  return value.substring(0, value.length - 1);
}
/**
 * Round off number to nearest 0.5
 * @param {Number} num - The number to round off
 * @return {number} The rounded number
 */

function roundHalf(num) {
  return Math.round(num * 2) / 2;
}
/**
 * Returns a function that, as long as it continues to be invoked,
 * will not be executed. The function will only be executed when
 * it will stop being called for more than N milliseconds.
 * If the `immediate` parameter is true, then the function
 * will be executed at the first call instead of the last.
 * Parameters :
 * - func: the function to `debouncer`.
 * - wait: the number of milliseconds (N) to wait before
 * call func()
 * - immediate (optional): Call func() at the first invocation
 * instead of the last one (Default false)
 * - context (optional): the context in which to call func()
 * (this by default)
 */
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function () {
    var now = new Date().getTime(),
        last = now - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;

      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
;
function throttle(func, wait, leading, trailing, context) {
  var ctx, args, result;
  var timeout = null;
  var previous = 0;

  var later = function () {
    previous = new Date();
    timeout = null;
    result = func.apply(ctx, args);
  };

  return function () {
    var now = new Date();
    if (!previous && !leading) previous = now;
    var remaining = wait - (now - previous);
    ctx = context || this;
    args = arguments;

    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(ctx, args);
    } else if (!timeout && trailing) {
      // Sinon on s’endort pendant le temps restant
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}
;
function merge(target, source) {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) Object.assign(source[key], merge(target[key], source[key]));
  } // Join `target` and modified `source`


  Object.assign(target || {}, source);
  return target;
}
;
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/datasource/parsers/DataSourceParser.js


class DataSourceParser_DataSourceParser {
  /**
   * Builds the full url.
   * @protected
   * @param {Object} properties
   * @param {String} properties.protocol the protocol protocol
   * @param {String} properties.endpointUrl the endpoint url
   * @param {String} properties.service the service
   * @param {String} properties.offeringID the offeringID
   * @param {String} properties.observedProperty the observed property
   * @param {String} properties.startTime the start time (ISO format)
   * @param {String} properties.endTime the end time (ISO format)
   * @param {Number} properties.replaySpeed the replay factor
   * @param {Number} properties.responseFormat the response format (e.g video/mp4)
   * @param {Date} properties.lastTimeStamp - the last timestamp to start at this time (ISO String)
   * @param {Object} properties.customUrlParams - the encoding options
   * @param {Number} properties.customUrlParams.video_bitrate - define a custom bitrate (in b/s)
   * @param {Number} properties.customUrlParams.video_scale - define a custom scale, 0.0 < value < 1.0
   * @param {Number} properties.customUrlParams.video_width - define a custom width
   * @param {Number} properties.customUrlParams.video_height - define a custom height
   * @return {String} the full url
   */
  buildUrl(properties) {
    let url = ""; // adds protocol

    url += properties.protocol + "://"; // adds endpoint url

    url += properties.endpointUrl + "?"; // adds service

    url += "service=" + properties.service; // adds version

    url += "&version=2.0&"; // adds responseFormat (optional)

    if (properties.responseFormat) {
      url += "&responseFormat=" + properties.responseFormat;
    }

    if (isDefined(properties.customUrlParams) && Object.keys(properties.customUrlParams).length > 0) {
      url += '&';

      for (let key in properties.customUrlParams) {
        url += key + '=' + properties.customUrlParams[key] + '&';
      }

      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }
    }

    return url;
  }

}

/* harmony default export */ var parsers_DataSourceParser = (DataSourceParser_DataSourceParser);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/datasource/parsers/TimeSeriesParser.parser.js



class TimeSeriesParser_parser_TimeSeriesParserParser extends parsers_DataSourceParser {
  /**
   * Builds the full url.
   * @protected
   * @param {Object} properties
   * @param {String} properties.protocol the protocol protocol
   * @param {String} properties.endpointUrl the endpoint url
   * @param {String} properties.service the service
   * @param {String} properties.offeringID the offeringID
   * @param {String} properties.observedProperty the observed property
   * @param {String} properties.startTime the start time (ISO format)
   * @param {String} properties.endTime the end time (ISO format)
   * @param {Number} properties.replaySpeed the replay factor
   * @param {Number} properties.responseFormat the response format (e.g video/mp4)
   * @param {Date} properties.lastTimeStamp - the last timestamp to start at this time (ISO String)
   * @param {Object} properties.customUrlParams - the encoding options
   * @return {String} the full url
   */
  buildUrl(properties) {
    let url = super.buildUrl(properties); // adds request

    url += "&request=GetResult"; // adds offering

    url += "&offering=" + properties.offeringID; // adds observedProperty

    url += "&observedProperty=" + properties.observedProperty; // adds temporalFilter

    const stTime = isDefined(properties.lastTimeStamp) ? properties.lastTimeStamp : properties.startTime;
    this.lastStartTime = properties.startTime;
    let endTime = properties.endTime;
    url += "&temporalFilter=phenomenonTime," + stTime + "/" + endTime;

    if (properties.replaySpeed) {
      // adds replaySpeed
      url += "&replaySpeed=" + properties.replaySpeed;
    }

    return url;
  }

}

/* harmony default export */ var TimeSeriesParser_parser = (TimeSeriesParser_parser_TimeSeriesParserParser);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/datasource/parsers/SosGetResultJson.parser.js


class SosGetResultJson_parser_SosGetResultJsonParser extends TimeSeriesParser_parser {
  /**
   * Extracts timestamp from the message. The timestamp corresponds to the 'time' attribute of the JSON object.
   * @param {String} data - the data to parse
   * @return {Number} the extracted timestamp
   */
  parseTimeStamp(data) {
    let rec = String.fromCharCode.apply(null, new Uint8Array(data));
    return new Date(JSON.parse(rec)['time']).getTime();
  }
  /**
   * Extract data from the message. The data are corresponding to the whole list of attributes of the JSON object
   * excepting the 'time' one.
   * @param {Object} data - the data to parse
   * @return {Object} the parsed data
   * @example
   * {
   *   location : {
   *    lat:43.61758626,
   *    lon: 1.42376557,
   *    alt:100
   *   }
   * }
   */


  parseData(data) {
    let rec = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));
    let result = {};

    for (let key in rec) {
      if (key !== 'time') {
        result[key] = rec[key];
      }
    }

    return result;
  }
  /**
   * Builds the full url.
   * @protected
   * @param {Object} properties
   * @param {String} properties.protocol the protocol protocol
   * @param {String} properties.endpointUrl the endpoint url
   * @param {String} properties.service the service
   * @param {String} properties.offeringID the offeringID
   * @param {String} properties.observedProperty the observed property
   * @param {String} properties.foiId the foiId
   * @param {String} properties.startTime the start time (ISO format)
   * @param {String} properties.endTime the end time (ISO format)
   * @param {Number} properties.replaySpeed the replay factor
   * @param {Number} properties.responseFormat the response format (e.g video/mp4)
   * @param {Date} properties.lastTimeStamp - the last timestamp to start at this time (ISO String)
   * @param {Object} properties.customUrlParams - the encoding options
   * @return {String} the full url
   */


  buildUrl(properties) {
    let url = super.buildUrl({ ...properties,
      responseFormat: 'application/json'
    }); // adds feature of interest urn

    if (properties.foiId && properties.of !== '') {
      url += '&featureOfInterest=' + properties.foiId;
    }

    return url;
  }

}

/* harmony default export */ var SosGetResultJson_parser = (SosGetResultJson_parser_SosGetResultJsonParser);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/protocol/Status.js
/**
 * Enum for connection status.
 * @readonly
 * @enum {{name: string}}
 */
const Status = {
  CONNECTING: "connecting",
  CONNECTED: "connected",
  DISCONNECTED: "disconnected"
};
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/protocol/DataConnector.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/


/**
 * The DataConnector is the abstract class used to create different connectors.
 */

class DataConnector_DataConnector {
  /**
   * @param {String} url - The full url used to connect to the data stream
   */
  constructor(url) {
    this.url = url;
    this.id = "DataConnector-" + randomUUID();
    this.reconnectTimeout = 1000 * 60 * 2; //2 min

    this.status = Status.DISCONNECTED;
    this.reconnectionInterval = -1;
  }

  checkAndClearReconnection() {
    if (this.reconnectionInterval !== -1) {
      clearInterval(this.reconnectionInterval);
      this.reconnectionInterval = -1;
    }
  }

  disconnect() {
    this.checkStatus(Status.DISCONNECTED);
    this.checkAndClearReconnection();
  }
  /**
   * Sets the url
   * @param url
   */


  setUrl(url) {
    this.url = url;
  }
  /**
   * The data protocol default id.
   * @return {String}
   */


  getId() {
    return this.id;
  }
  /**
   * The stream url.
   * @return {String}
   */


  getUrl() {
    return this.url;
  }
  /**
   * Sets the reconnection timeout
   * @param {Number} timeout - delay in milliseconds before reconnecting dataSource
   */


  setReconnectTimeout(timeout) {
    this.reconnectTimeout = timeout;
  }

  onReconnect() {
    return true;
  }

  connect() {}

  forceReconnect() {
    this.disconnect();
    this.connect();
  }
  /**
   * Called when the connection STATUS changes
   * @param {Status} status - the new status
   */


  onChangeStatus(status) {}
  /**
   * Check a change of the status and call the corresponding callbacks if necessary
   * @param {Status} status - the currentStatus
   */


  checkStatus(status) {
    if (status !== this.status) {
      this.onChangeStatus(status);
      this.status = status;
    }
  }
  /**
   * Called when the protocol has been disconnected
   */


  onDisconnect() {}
  /**
   * Called when the protocol has been connected
   */


  onConnect() {}

}

/* harmony default export */ var protocol_DataConnector = (DataConnector_DataConnector);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/protocol/WebSocketConnector.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/



/**
 * Defines the WebSocketConnector to connect to a remote server by creating a WebSocket channel.
 * @extends DataConnector
 * @example
 * import WebSocketConnector from 'osh-js/dataconnector/WebSocketConnector.js';
 *
 * let url = ...;
 * let connector = new WebSocketConnector(url);
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

class WebSocketConnector_WebSocketConnector extends protocol_DataConnector {
  /**
   *
   * @param properties -
   */
  constructor(properties) {
    super(properties);
    this.interval = -1;
    this.lastReceiveTime = 0;
  }
  /**
   * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
   * the main thread.
   */


  async connect() {
    if (!this.init) {
      this.closed = false;
      this.init = true; //creates Web Socket

      this.ws = new WebSocket(this.getUrl());
      this.ws.binaryType = 'arraybuffer';
      this.checkStatus(Status.CONNECTING);
      console.warn('WebSocket stream connecting');

      this.ws.onopen = function (event) {
        this.checkAndClearReconnection();
        this.checkStatus(Status.CONNECTED);
        console.warn('WebSocket stream connected');
      }.bind(this);

      this.ws.onmessage = function (event) {
        this.lastReceiveTime = Date.now(); //callback data on message received

        if (event.data.byteLength > 0) {
          this.onMessage(event.data);
        }
      }.bind(this); // closes socket if any errors occur


      this.ws.onerror = function (event) {
        console.error('WebSocket stream error');
        this.checkStatus(Status.DISCONNECTED);
        this.init = false;
        this.lastReceiveTime = -1;
        this.createReconnection();
      }.bind(this);

      this.ws.onclose = event => {
        this.checkStatus(Status.DISCONNECTED);
        console.warn('WebSocket stream closed: ', event.reason, event.code);
        this.init = false;

        if (event.code !== 1000 && !this.closed) {
          this.createReconnection();
        }
      };
    }
  }

  createReconnection() {
    if (!this.closed && this.reconnectionInterval === -1 && this.onReconnect()) {
      this.reconnectionInterval = setInterval(function () {
        let delta = Date.now() - this.lastReceiveTime; // -1 means the WS went in error

        if (this.lastReceiveTime === -1 || delta >= this.reconnectTimeout) {
          console.warn('trying to reconnect', this.url);
          this.connect();
        }
      }.bind(this), this.reconnectTimeout);
    }
  }
  /**
   * Disconnects and close the websocket.
   */


  disconnect() {
    super.disconnect();
    this.init = false;
    this.closed = true;

    if (this.ws != null && this.ws.readyState !== WebSocket.CLOSED) {
      this.ws.close();
    }
  }
  /**
   * The onMessage method used by the websocket to callback the data
   * @param data the callback data
   * @event
   */


  onMessage(data) {}

  isConnected() {
    return this.ws != null && this.ws.readyState === WebSocket.OPEN;
  }

}

/* harmony default export */ var protocol_WebSocketConnector = (WebSocketConnector_WebSocketConnector);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/protocol/Ajax.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/



/**
 * Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @extends DataConnector
 * @example
 * import Ajax from 'core/protocol/Ajax.js';
 *
 * let request = ...;
 * let protocol = new Ajax(url);
 *
 * // handle onSuccess
 * protocol.onSuccess = function(event) {
 *  // does something
 * }
 *
 * protocol.onError = function(event) {
 *  // does something
 * }
 *
 * // send request
 * protocol.sendRequest(request);
 *
 */

class Ajax_Ajax extends protocol_DataConnector {
  /**
   * Creates Ajax.
   * @param {String} url -
   * @param {Object} properties -
   * @param {String} properties.method -
   * @param {String} properties.responseType -
   */
  constructor(url, properties) {
    super(url);
    this.method = "POST";
    this.responseType = "arraybuffer";

    if (isDefined(properties)) {
      if (properties.method) {
        this.method = properties.method;
      }

      if (properties.responseType) {
        this.responseType = properties.responseType;
      }
    }
  }
  /**
   * Sends the request to the defined server.
   * @param {String} request - The Http request
   * @param {String} extraUrl - get query parameters
   */


  sendRequest(request, extraUrl) {
    let self = this;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.withCredentials = true;
    xmlhttp.timeout = 60000;

    if (request === null) {
      if (isDefined(extraUrl)) {
        xmlhttp.open("GET", this.getUrl() + "?" + extraUrl, true);
      } else {
        xmlhttp.open("GET", this.getUrl(), true);
      }

      xmlhttp.responseType = this.responseType;

      xmlhttp.onload = oEvent => {
        if (xmlhttp.response) {
          self.onMessage(xmlhttp.response);
        }

        self.checkStatus(Status.DISCONNECTED);
      };

      xmlhttp.ontimeout = e => {
        console.log("Timeout");
        self.checkStatus(Status.DISCONNECTED);
      };

      self.checkStatus(Status.CONNECTED);
      xmlhttp.send(null);
    } else {
      xmlhttp.open("POST", this.getUrl(), true);
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.send(request);
      self.checkStatus(Status.CONNECTED);

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState < 4) {// while waiting response from server
        } else if (xmlhttp.readyState === 4) {
          // 4 = Response from server has been completely loaded.
          if (xmlhttp.status === 200 && xmlhttp.status < 300) {
            // http status between 200 to 299 are all successful
            self.onSuccess(xmlhttp.responseText);
          } else {
            self.onError("");
          }

          self.checkStatus(Status.DISCONNECTED);
        }
      };
    }
  }
  /**
   * This is the callback method in case of getting error connection.
   * @param event The error details
   * @event
   */


  onError(event) {}
  /**
   * This is the callback method in case of getting success connection.
   * @param event
   * @event
   */


  onSuccess(event) {}
  /**
   * Sends the request
   * @private
   */


  connect() {
    this.sendRequest(null);
  }

  isConnected() {
    return false;
  }

}

/* harmony default export */ var protocol_Ajax = (Ajax_Ajax);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/protocol/TopicConnector.js

/**
 * Defines the FileConnector to read a File content
 * @extends DataConnector
 * @example
 * import FileConnector from 'core/protocol/TopicConnector.js';
 *
 * let protocol = new TopicConnector(<topic_name>);
 *
 * // connect
 * protocol.connect();
 *
 * // disconnect
 * protocol.disconnect();
 *
 * // close
 * protocol.close();
 *
 */

class TopicConnector_TopicConnector extends protocol_DataConnector {
  /**
   *
   * @param properties -
   */
  constructor(properties) {
    super(properties);
    this.lastReceiveTime = -1;
    this.interval = -1;
    this.broadcastChannel = null;
  }
  /**
   * Connect to the broadcastChannel.
   */


  connect() {
    if (this.broadcastChannel === null) {
      //creates broadcastChannel
      this.broadcastChannel = new BroadcastChannel(this.getUrl());

      this.broadcastChannel.onmessage = event => {
        this.lastReceiveTime = Date.now(); //callback data on message received

        this.onMessage(event.data.data);
      }; // closes socket if any errors occur


      this.broadcastChannel.onerror = event => {
        console.error('BroadcastChannel stream error: ' + event);
        this.broadcastChannel.close();
        this.init = false;
        this.lastReceiveTime = -1;
        this.opened = false;
      };

      this.opened = true; //init the reconnect handler

      if (this.interval === -1) {
        this.interval = setInterval(function () {
          let delta = Date.now() - this.lastReceiveTime; // -1 means the WS went in error

          if (this.lastReceiveTime === -1 || delta >= this.reconnectTimeout) {
            console.warn(`trying to reconnect after ${this.reconnectTimeout} ..`);
            this.reconnect();
          }
        }.bind(this), this.reconnectTimeout);
      }
    }
  }
  /**
   * Disconnects the websocket.
   */


  disconnect() {
    this.fullDisconnect(true);
  }
  /**
   * Fully disconnect the websocket connection by sending a close message to the webWorker.
   * @param {Boolean} removeInterval  - force removing the interval
   */


  fullDisconnect(removeInterval) {
    if (this.broadcastChannel != null) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }

    if (removeInterval) {
      clearInterval(this.interval);
    }

    this.opened = false;
  }
  /**
   * Try to reconnect if the connexion if closed
   */


  reconnect() {
    this.onReconnect();

    if (this.init) {
      this.fullDisconnect(false);
    }

    this.connect();
  }
  /**
   * The onMessage method used by the websocket to callback the data
   * @param data the callback data
   * @event
   */


  onMessage(data) {}
  /**
   * Closes the webSocket.
   */


  close() {
    this.disconnect();
  }

  isConnected() {
    return this.broadcastChannel !== null && this.opened;
  }

}

/* harmony default export */ var protocol_TopicConnector = (TopicConnector_TopicConnector);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/event/EventType.js
const EventType = {
  DATA: 'data',
  STATUS: 'status'
};
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/protocol/FileConnector.js


/**
 * Defines the FileConnector to read a File content
 * @extends DataConnector
 * @example
 * import FileConnector from 'core/protocol/FileConnector.js';
 *
 * let paths = ['path1','path2]...];
 * let protocol = new FileConnector(paths);
 *
 * // connect
 * protocol.connect();
 *
 * // disconnect
 * protocol.disconnect();
 *
 * // close
 * protocol.close();
 *
 */

class FileConnector_FileConnector extends protocol_DataConnector {
  /**
   * @param (string[]) paths - list of file paths
   */
  constructor(paths) {
    super(paths);
    this.opened = false;
  }
  /**
   * Start reading file content
   */


  async connect() {
    if (!this.opened) {
      this.opened = true;
      this.onChangeStatus(Status.CONNECTED);
      const urls = this.getUrl();

      for (let url of urls) {
        this.onMessage(await fetch(url));
      }

      this.onChangeStatus(Status.DISCONNECTED); // read is done

      this.opened = false;
    }
  }

  isConnected() {
    return this.opened;
  }

}

/* harmony default export */ var protocol_FileConnector = (FileConnector_FileConnector);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/datasource/workers/DataSourceHandler.js








class DataSourceHandler_DataSourceHandler {
  constructor(parser) {
    this.parser = parser;
    this.connector = null;
    this.reconnectTimeout = 1000 * 10; // 10 secs

    this.values = [];
    this.version = -Number.MAX_SAFE_INTEGER;
  }

  createConnector(propertiesStr, topic, dataSourceId) {
    this.dataSourceId = dataSourceId; // check for existing protocol

    if (this.connector !== null) {
      this.connector.disconnect();
      this.connector = null;
    }

    this.broadcastChannel = new BroadcastChannel(topic);
    const properties = JSON.parse(propertiesStr);

    if (isDefined(properties.timeShift)) {
      this.timeShift = properties.timeShift;
    }

    if (isDefined(properties.bufferingTime)) {
      this.bufferingTime = properties.bufferingTime;
    }

    if (isDefined(properties.timeOut)) {
      this.timeOut = properties.timeOut;
    }

    if (isDefined(properties.reconnectTimeout)) {
      this.reconnectTimeout = properties.reconnectTimeout;
    }

    if (properties.startTime === 'now') {
      this.batchSize = 1;
    } else {
      if (isDefined(properties.replaySpeed)) {
        if (!isDefined(properties.batchSize)) {
          this.batchSize = 1;
        }
      }

      if (isDefined(properties.batchSize)) {
        this.batchSize = properties.batchSize;
      }
    }

    this.properties = properties;
    this.createDataConnector(this.properties);
  }
  /**
   * @private
   */


  createDataConnector(properties) {
    const url = this.parser.buildUrl({ ...properties,
      timeShift: this.timeShift
    }); // checks if type is WebSocketConnector

    if (properties.protocol.startsWith('ws')) {
      this.connector = new protocol_WebSocketConnector(url);
    } else if (properties.protocol.startsWith('http')) {
      this.connector = new protocol_Ajax(url);
      this.connector.responseType = properties.responseType || 'arraybuffer';
    } else if (properties.protocol.startsWith('topic')) {
      this.connector = new protocol_TopicConnector(url);
    } else if (properties.protocol.startsWith('file')) {
      this.connector = new protocol_FileConnector(url, properties);
    }

    if (this.connector !== null) {
      // set the reconnectTimeout
      this.connector.setReconnectTimeout(this.reconnectTimeout); // connects the callback

      this.connector.onMessage = this.onMessage.bind(this); // bind change connection STATUS

      this.connector.onChangeStatus = this.onChangeStatus.bind(this);
    }
  }
  /**
   * Sets the current topic to listen
   * @param {String} topic - the topic to listen
   */


  setTopic(topic) {
    if (isDefined(this.broadcastChannel)) {
      this.broadcastChannel.close();
    }

    this.broadcastChannel = new BroadcastChannel(topic);
    this.topic = topic;
  }

  connect() {
    if (this.connector !== null) {
      this.connector.connect();
    }
  }

  disconnect() {
    if (this.connector !== null) {
      this.connector.disconnect();
    }
  }

  async onMessage(event) {
    const data = await Promise.resolve(this.parser.parseData(event)); // check if data is array

    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        this.values.push({
          data: data[i],
          version: this.version
        });

        if (isDefined(this.batchSize) && this.values.length >= this.batchSize) {
          this.flush();
        }
      }
    } else {
      this.values.push({
        data: data,
        version: this.version
      });
    } // because parseData is ASYNC, the protocol can finish before the parsing method. In that case, we have to flushALl data


    if (!this.isConnected()) {
      this.flushAll();
    } else if (isDefined(this.batchSize) && this.values.length !== 0 && this.values.length >= this.batchSize) {
      this.flush();
    }
  }
  /**
   * Send a change status event into the broadcast channel
   * @param {Status} status - the new status
   */


  onChangeStatus(status) {
    if (status === Status.DISCONNECTED) {
      this.flushAll();
    }

    this.broadcastChannel.postMessage({
      type: EventType.STATUS,
      status: status,
      dataSourceId: this.dataSourceId
    });
  }

  updateProperties(properties) {
    this.disconnect();
    this.createDataConnector({ ...this.properties,
      ...properties
    });
    this.version++;
    this.connect();
  }

  flushAll() {
    while (this.values.length > 0) {
      this.flush();
    }
  }

  flush() {
    let nbElements = this.values.length;

    if (isDefined(this.batchSize) && this.values.length > this.batchSize) {
      nbElements = this.batchSize;
    }

    this.broadcastChannel.postMessage({
      dataSourceId: this.dataSourceId,
      type: EventType.DATA,
      values: this.values.splice(0, nbElements)
    });
  }

  isConnected() {
    return this.connector === null ? false : this.connector.isConnected();
  }

  handleMessage(message, worker) {
    if (message.message === 'init') {
      this.createConnector(message.properties, message.topic, message.id);
    } else if (message.message === 'connect') {
      this.connect();
    } else if (message.message === 'disconnect') {
      this.disconnect();
    } else if (message.message === 'topic') {
      this.setTopic(message.topic);
    } else if (message.message === 'update-url') {
      this.updateProperties(message.data);
    } else if (message.message === 'is-connected') {
      worker.postMessage({
        message: 'is-connected',
        data: this.isConnected()
      });
    }
  }

}

/* harmony default export */ var workers_DataSourceHandler = (DataSourceHandler_DataSourceHandler);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/datasource/workers/TimeSeriesDataSourceHandler.js



class TimeSeriesDataSourceHandler_TimeSeriesDataSourceHandler extends workers_DataSourceHandler {
  constructor(parser) {
    super(parser);
    this.lastTimeStamp = null;
    this.lastStartTime = 'now';
    this.timeShift = 0;
    this.timeBroadcastChannel = null;
  }
  /**
   * @private
   */


  createDataConnector(properties) {
    super.createDataConnector({ ...properties,
      timeShift: this.timeShift
    });
    const lastStartTimeCst = this.parser.lastStartTime;

    this.connector.onReconnect = () => {
      // if not real time, preserve last timestamp to reconnect at the last time received
      // for that, we update the URL with the new last time received
      if (lastStartTimeCst !== 'now') {
        this.connector.setUrl(this.parser.buildUrl({ ...properties,
          lastTimeStamp: isDefined(this.lastTimeStamp) ? new Date(this.lastTimeStamp).toISOString() : properties.startTime
        }));
      }

      return true;
    };
  }

  async onMessage(event) {
    const timeStamp = await Promise.resolve(this.parser.parseTimeStamp(event) + this.timeShift);
    const data = await Promise.resolve(this.parser.parseData(event)); // check if data is array

    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        this.values.push({
          data: data[i],
          timeStamp: timeStamp,
          version: this.version
        });
      }
    } else {
      this.values.push({
        data: data,
        timeStamp: timeStamp,
        version: this.version
      });
    }

    this.lastTimeStamp = timeStamp;

    if (this.parser.lastStartTime === 'now' || isDefined(this.batchSize) && this.values.length >= this.batchSize) {
      this.flush();

      if (this.timeBroadcastChannel !== null) {
        this.timeBroadcastChannel.postMessage({
          timestamp: this.lastTimeStamp
        });
      }
    }
  }

  getLastTimeStamp() {
    return this.lastTimeStamp;
  }

  updateProperties(properties) {
    this.disconnect();
    let lastTimestamp = new Date(this.lastTimeStamp).toISOString();

    if (properties.hasOwnProperty('startTime')) {
      lastTimestamp = properties.startTime;
    } else if (this.properties.startTime === 'now') {
      //handle RealTime
      lastTimestamp = 'now';
    }

    this.version++;
    this.createDataConnector({ ...this.properties,
      ...properties,
      lastTimeStamp: lastTimestamp
    });

    if (isDefined(properties) && isDefined(properties.reconnect) && properties.reconnect) {
      this.connect();
    }
  }

  handleMessage(message, worker) {
    super.handleMessage(message, worker);

    if (message.message === 'last-timestamp') {
      const lastTimeStamp = this.getLastTimeStamp();
      worker.postMessage({
        message: 'last-timestamp',
        data: lastTimeStamp
      });
    } else if (message.message === 'topic') {
      this.setTimeTopic(message.timeTopic);
      super.setTopic(message.topic);
    }
  }

  setTimeTopic(timeTopic) {
    if (this.timeBroadcastChannel !== null) {
      this.timeBroadcastChannel.close();
    }

    this.timeBroadcastChannel = new BroadcastChannel(timeTopic);
  }

}

/* harmony default export */ var workers_TimeSeriesDataSourceHandler = (TimeSeriesDataSourceHandler_TimeSeriesDataSourceHandler);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/datasource/workers/SosGetResultJson.worker.js



const dataSourceHandler = new workers_TimeSeriesDataSourceHandler(new SosGetResultJson_parser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}




/***/ })
/******/ ]);