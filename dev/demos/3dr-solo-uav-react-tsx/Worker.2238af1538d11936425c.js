/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ../../../source/core/Constants.js
const DATA_SYNCHRONIZER_TOPIC = 'data-synchronizer-';
const TIME_SYNCHRONIZER_TOPIC = 'data-synchronizer-time-';
const DATASOURCE_DATA_TOPIC = 'datasource-data-';
const DATASOURCE_TIME_TOPIC = 'datasource-time-';
const FFMPEG_VIEW_DECODE_TOPIC = 'ffmpeg-decode-';
const MAGIC_END_PACKET = 'magic-packet';
;// CONCATENATED MODULE: ../../../source/core/event/EventType.js
const EventType = {
  DATA: 'data',
  LAST_TIME: 'last-time',
  MASTER_TIME: 'master-time',
  STATUS: 'status',
  TIME_CHANGED: 'time-changed',
  CLOSED: 'closed'
};
;// CONCATENATED MODULE: ../../../source/core/utils/Utils.js
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
 * Capitalize the first letter of a given string
 * @param {String} str - the input string
 * @returns {String} the result
 */

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
function rgbaToArray(str) {
  let startIdxValue = str.indexOf('(') + 1;
  let endIdxValue = str.indexOf(')');
  let values = str.substr(startIdxValue, endIdxValue - startIdxValue);
  return values.split(',').map(Number);
}
;// CONCATENATED MODULE: ../../../source/core/connector/Status.js
/**
 * Enum for connection status.
 * @readonly
 * @enum {{name: string}}
 */
const Status = {
  CONNECTING: "connecting",
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  FETCH_STARTED: 'fetch-start',
  FETCH_ENDED: 'fetch-end',
  CLOSED: "closed",
  CLOSED_ERROR: "closed-error"
};
;// CONCATENATED MODULE: ../../../source/core/timesync/DataSynchronizerAlgo.js



class DataSynchronizerAlgo {
  constructor(dataSources, timerResolution = 5) {
    this.dataSourceMap = {};
    this.tsRun = undefined;
    this.timerResolution = timerResolution;
    this.interval = null;
    this.datasources = [];

    for (let ds of dataSources) {
      this.addDataSource(ds);
    }
  }

  removeDataSource(dataSourceId) {
    this.datasources = this.datasources.filter(elt => elt.id !== dataSourceId);
    delete this.dataSourceMap[dataSourceId];
  }

  push(dataSourceId, dataBlocks) {}

  getCurrentTimestamp() {
    return this.tsRun;
  }

  processData() {
    let tsRef = -1;
    let clockTimeRef = performance.now(); // get reference start timestamp
    // the reference start timestamp should the oldest one

    let currentDs;

    for (let currentDsId in this.dataSourceMap) {
      currentDs = this.dataSourceMap[currentDsId];

      if (currentDs.dataBuffer.length > 0) {
        tsRef = tsRef === -1 || currentDs.dataBuffer[0].data.timestamp < tsRef ? currentDs.dataBuffer[0].data.timestamp : tsRef;
      }
    }

    this.interval = setInterval(() => {
      // 1) return the oldest data if any
      while (this.computeNextData(tsRef, clockTimeRef));
    }, this.timerResolution);
    console.warn(`Started Algorithm ${this.constructor.name} with  tsRef=${new Date(tsRef).toISOString()}`);
  }
  /**
   * Compute the next data if any. We return only 1 value for this iteration. If there are multiple values to return,
   * we return only the oldest one.
   * @param tsRef - the timestamp of the first data
   * @param refClockTime - the absolute diff time really spent
   */


  computeNextData(tsRef, refClockTime) {
    throw Error('Should be overridden');
  }
  /**
   * Add dataSource to be synchronized
   * @param {Datasource} dataSource - the dataSource to synchronize
   */


  addDataSource(dataSource) {
    throw Error('Should be overridden');
  }

  checkVersion(datasource, dataBlock) {
    throw Error('Should be overridden');
  }

  onData(dataSourceId, dataBlock) {}

  checkStart() {}
  /**
   * Change the dataSource status
   * @param {Status} status - the new status
   * @param {String} dataSourceId - the corresponding dataSource id
   */


  setStatus(dataSourceId, status) {
    throw Error('Should be overridden');
  }

  close() {
    if (isDefined(this.interval)) {
      clearInterval(this.interval);
      this.interval = undefined;
    }

    console.log("Data synchronizer terminated successfully");
    this.onClose();
  }

  onStart() {}

  onClose() {}

}

/* harmony default export */ var timesync_DataSynchronizerAlgo = (DataSynchronizerAlgo);
;// CONCATENATED MODULE: ../../../source/core/timesync/replay/DataSynchronizerAlgo.replay.js




class DataSynchronizerAlgoReplay extends timesync_DataSynchronizerAlgo {
  constructor(dataSources, replaySpeed = 1, startTimestamp, endTimestamp, timerResolution = 5, version) {
    super(dataSources, replaySpeed, timerResolution);
    this.replaySpeed = replaySpeed;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
    this.version = version;
  }

  push(dataSourceId, dataBlocks) {
    if (dataBlocks.length === 0) {
      return;
    }

    if (dataSourceId in this.dataSourceMap) {
      const ds = this.dataSourceMap[dataSourceId];
      const lastData = dataBlocks[dataBlocks.length - 1];

      if (!this.checkVersion(lastData)) {
        console.warn(`[DataSynchronizer] incompatible version ${lastData.version} ~ ${this.version}, skipping data`);
        return;
      }

      ds.dataBuffer.push(...dataBlocks);
    }
  }

  processData() {
    this.clockTimeRef = performance.now();
    this.interval = setInterval(() => {
      // 1) return the oldest data if any
      while (this.computeNextData(this.startTimestamp, this.clockTimeRef)) {
        this.checkEnd();
      }

      this.checkEnd();
    }, this.timerResolution);
    console.warn(`Started Replay Algorithm with tsRef=${new Date(this.startTimestamp).toISOString()}`);
  }
  /**
   * Compute the next data if any. We return only 1 value for this iteration. If there are multiple values to return,
   * we return only the oldest one.
   * @param tsRef - the timestamp of the first data
   * @param refClockTime - the absolute diff time really spent
   */


  computeNextData(tsRef, refClockTime) {
    try {
      let currentDs;
      let currentDsToShift = null;
      const dClock = (performance.now() - refClockTime) * this.replaySpeed;
      let tsRun = tsRef + dClock;
      let computeNext = false; // compute next data to return

      for (let currentDsId in this.dataSourceMap) {
        currentDs = this.dataSourceMap[currentDsId];

        if (currentDs.skip) {
          // if datasource is in current range
          if (tsRun > currentDs.minTimestamp && tsRun < currentDs.maxTimestamp) {
            currentDs.skip = false;
          }
        } // skip DatSource if out of time range


        if (currentDs.skip) continue;

        if (currentDs.dataBuffer.length > 0) {
          const dTs = currentDs.dataBuffer[0].data.timestamp - tsRef; // we use an intermediate object to store the data to shift because we want to return the oldest one
          // only

          if (dTs <= dClock) {
            // no other one to compare
            if (currentDsToShift === null) {
              currentDsToShift = currentDs;
            } else {
              // take the oldest data
              currentDsToShift = currentDsToShift.dataBuffer[0].data.timestamp < currentDs.dataBuffer[0].data.timestamp ? currentDsToShift : currentDs;
            }
          }
        }
      } // finally pop the data from DS queue


      if (currentDsToShift !== null) {
        if (currentDsToShift.id in this.dataSourceMap) {
          this.onData(currentDsToShift.id, currentDsToShift.dataBuffer.shift());
        }

        computeNext = true;
      }

      this.tsRun = tsRun;
      return computeNext;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
  /**
   * Add dataSource to be synchronized
   * @param {Datasource} dataSource - the dataSource to synchronize
   */


  addDataSource(dataSource) {
    this.dataSourceMap[dataSource.id] = {
      dataBuffer: [],
      id: dataSource.id,
      name: dataSource.name || dataSource.id,
      status: Status.DISCONNECTED,
      //MEANING Enabled, 0 = Disabled
      minTimestamp: dataSource.minTimestamp,
      maxTimestamp: dataSource.maxTimestamp,
      skip: false
    };

    if (dataSource.maxTimestamp < this.getCurrentTimestamp() || dataSource.minTimestamp > this.getCurrentTimestamp()) {
      this.dataSourceMap[dataSource.id].skip = true;
      console.warn(`Skipping new added dataSource ${dataSource.id} because timeRange of the dataSource is not intersecting the synchronizer one`);
    }

    this.datasources.push(dataSource);
  }

  checkVersion(dataBlock) {
    return dataBlock.version === this.version;
  }
  /**
   * Change the dataSource status
   * @param {Status} status - the new status
   * @param {String} dataSourceId - the corresponding dataSource id
   */


  setStatus(dataSourceId, status) {
    if (dataSourceId in this.dataSourceMap) {
      this.dataSourceMap[dataSourceId].status = status;
      console.warn(status + ' DataSource ' + dataSourceId + ' from the synchronizer ');
    }

    this.checkStart();
  }

  checkStart() {
    if (!isDefined(this.interval)) {
      let nbSkip = 0;
      let nbFetch = 0;
      let totalDataSources = Object.keys(this.dataSourceMap).length;

      if (totalDataSources === 0) {
        return;
      }

      let dataSource;

      for (let dataSourceID in this.dataSourceMap) {
        dataSource = this.dataSourceMap[dataSourceID];
        dataSource.skip = this.startTimestamp < dataSource.minTimestamp || this.startTimestamp > dataSource.maxTimestamp;

        if (dataSource.status === Status.FETCH_STARTED) {
          nbFetch++;
        } else if (dataSource.skip) {
          nbSkip++;
        }
      }

      console.warn(`[Synchronizer] Fetched ${nbFetch}/${totalDataSources} datasources`);
      console.warn(`[Synchronizer] Skipped ${nbSkip}/${totalDataSources} datasources`);

      if (nbFetch + nbSkip === totalDataSources) {
        console.warn('Starting Replay Algorithm...');
        this.processData();
        this.onStart();
      }
    }
  }

  checkEnd() {
    if (this.getCurrentTimestamp() > this.endTimestamp) {
      this.onEnd();
      this.reset();
    }
  }

  reset() {
    console.log('reset synchronizer algo');
    this.close();

    for (let currentDsId in this.dataSourceMap) {
      this.resetDataSource(currentDsId);
    }

    this.tsRun = undefined;
  }

  resetDataSource(datasourceId) {
    const currentDs = this.dataSourceMap[datasourceId];
    currentDs.dataBuffer = [];
    currentDs.status = Status.DISCONNECTED;
    currentDs.version = undefined;
    currentDs.skip = false;
  }

  removeDataSource(dataSourceId) {
    super.removeDataSource(dataSourceId); // looking for next start Timestamp

    let currentTimestamp = this.getCurrentTimestamp();
    let min, ds;

    for (let dsKey in this.dataSourceMap) {
      ds = this.dataSourceMap[dsKey];

      if (currentTimestamp >= ds.minTimestamp && currentTimestamp <= ds.maxTimestamp) {
        // continue because this datasource is in the current range
        return;
      } else {
        // otherwise
        // looking for next range and reset algo
        if (!min) {
          min = ds.minTimestamp;
        } else if (ds.minTimestamp < min) {
          min = ds.minTimestamp;
        }
      }
    }
  }

  setEndTimestamp(maxTimestamp) {
    this.endTimestamp = maxTimestamp;
  }

  setTimeRange(startTimestamp, endTimestamp, replaySped) {
    this.replaySpeed = replaySped;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
    this.clockTimeRef = performance.now();
    this.reset();
    this.checkStart();
  }

  onEnd() {}

  onStart() {}

}

/* harmony default export */ var DataSynchronizerAlgo_replay = (DataSynchronizerAlgoReplay);
;// CONCATENATED MODULE: ../../../source/core/timesync/replay/DataSynchronizer.replay.worker.js





const bcChannels = {};
let dataSynchronizerAlgo;

let init = false;
let dataSourceBroadCastChannel = null;
let lastData = undefined;
const dataSources = {};
let timeBroadcastChannel = null;
let topicTime;
let topicData;
let replaySpeed;
let masterTimeInterval = undefined;
let cTime;
let cId;
let lastTime = -1;
let version = -1;
let promise;
let masterTimeRefreshRate;
let startTimestamp;
let endTimestamp;
let timerResolution;

self.onmessage = async (event) => {
    if(isDefined(promise)) {
        await promise;
    }
    promise = handleMessage(event);
}

async function handleMessage(event) {
    return new Promise(async (resolve, reject) => {
        try {
            let sendResponse = true;
            let data = undefined;
            if (event.data.message === 'init') {
                replaySpeed = event.data.replaySpeed;
                startTimestamp = event.data.startTimestamp;
                endTimestamp = event.data.endTimestamp;
                version = event.data.version;
                timerResolution = event.data.timerResolution;

                dataSynchronizerAlgo = new DataSynchronizerAlgo_replay(
                    event.data.dataSources,
                    replaySpeed,
                    startTimestamp,
                    endTimestamp,
                    event.data.timerResolution,
                    version
                );
                dataSynchronizerAlgo.onClose = onClose;
                dataSynchronizerAlgo.onData = onData;
                init = true;
                addDataSources(event.data.dataSources);
                topicData = event.data.topics.data;
                topicTime = event.data.topics.time;
                initBroadcastChannel(topicData, topicTime);
                masterTimeRefreshRate = event.data.masterTimeRefreshRate;
            } else if (event.data.message === 'add' && event.data.dataSources) {
                console.log('Add datasource to synchronizer..')
                addDataSources(event.data.dataSources);
            } else if (event.data.message === 'connect') {
                startMasterTimeInterval(masterTimeRefreshRate);
                dataSynchronizerAlgo.checkStart();
                version = event.data.version;
            } else if(event.data.message === 'is-connected') {
                data = {
                    message: 'is-connected',
                    data: isDefined(masterTimeInterval) && isDefined(dataSynchronizerAlgo) && isDefined(dataSynchronizerAlgo.interval)
                };
            } else if (event.data.message === 'remove' && event.data.dataSourceIds) {
                console.log('Remove datasource from synchronizer..')
                await removeDataSources(event.data.dataSourceIds);
                if(dataSynchronizerAlgo instanceof DataSynchronizerAlgo_replay) {
                    dataSynchronizerAlgo.endTimestamp = event.data.endTimestamp;
                }
            } else if (event.data.message === 'current-time') {
                data = {
                    message: 'current-time',
                    data: dataSynchronizerAlgo.getCurrentTimestamp()
                };
            } else if (event.data.message === 'reset') {
                DataSynchronizer_replay_worker_reset();
            } else if (event.data.message === 'replay-speed') {
                if (dataSynchronizerAlgo !== null) {
                    DataSynchronizer_replay_worker_reset();
                    dataSynchronizerAlgo.replaySpeed = event.data.replaySpeed;
                }
            }  else if (event.data.message === 'set-max-time') {
                dataSynchronizerAlgo.setEndTimestamp(event.data.maxTimestamp);
            } else if (event.data.message === 'time-range') {
                setTimeRange(
                    event.data.startTimestamp,
                    event.data.endTimestamp,
                    event.data.mode,
                    event.data.replaySpeed,
                    event.data.version,
                    event.data.dataSources
                )
            } else if (event.data.message === 'data') {
                checkMasterTime();
                if (dataSynchronizerAlgo !== null) {
                    dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.data);
                }
            } else {
                // skip response
                sendResponse = false;
            }
            if (sendResponse) {
                self.postMessage({
                    message: event.data.message,
                    data: data,
                    messageId: event.data.messageId
                });
            }
            resolve();
        } catch (ex) {
            reject(ex);
        }
    });
}
function setTimeRange(startTimestamp, endTimestamp, mode, replaySpeed, newVersion, dsArray) {
    DataSynchronizer_replay_worker_reset();
    version = newVersion;

    dataSynchronizerAlgo = new DataSynchronizerAlgo_replay(
        dsArray,
        replaySpeed,
        startTimestamp,
        endTimestamp,
        timerResolution,
        version
    );
    dataSynchronizerAlgo.onEnd = onEnd;
    dataSynchronizerAlgo.onStart = onStart;
    dataSynchronizerAlgo.onClose = onClose;
    dataSynchronizerAlgo.onData = onData;
}
function DataSynchronizer_replay_worker_reset() {
    clearInterval(masterTimeInterval);
    masterTimeInterval = undefined;
    if(dataSynchronizerAlgo !== null) {
        dataSynchronizerAlgo.reset();
    }
    timeBroadcastChannel.postMessage({
        type: EventType.TIME_CHANGED
    });
    timeBroadcastChannel.postMessage({
        type: EventType.CLOSED
    });
}
function initBroadcastChannel(dataTopic, timeTopic) {
    console.log('listen on topic ',dataTopic)

    dataSourceBroadCastChannel = new BroadcastChannel(dataTopic);
    dataSourceBroadCastChannel.onmessage = async (event) => {
        checkMasterTime();
        if(event.data.type === EventType.DATA) {
            // console.log(new Date(event.data.values[0].data.timestamp).toISOString(), event.data.values[0].version);
            dataSynchronizerAlgo.push(event.data.dataSourceId,event.data.values);
        } else if(event.data.type === EventType.STATUS) {
            const dataSourceId = event.data.dataSourceId;
            dataSynchronizerAlgo.setStatus(dataSourceId, event.data.status);
            // bubble the message
            if(dataSourceId in bcChannels) {
                console.log(dataSources[dataSourceId].name + ": status=" + event.data.status);
                bcChannels[dataSourceId].postMessage(event.data);
            }
        }
    }

    timeBroadcastChannel = new BroadcastChannel(timeTopic);

}

/**
 *
 * @param dataSources
 */
function addDataSources(dataSources) {
    for(let dataSource of dataSources) {
        addDataSource(dataSource);
    }
}

function addDataSource(dataSource) {
    dataSynchronizerAlgo.addDataSource(dataSource);
    // create a BC to push back the synchronized data into the DATA Stream.
    bcChannels[dataSource.id] = new BroadcastChannel(DATASOURCE_DATA_TOPIC + dataSource.id);

    if(!(dataSource.id in dataSources)) {
        dataSources[dataSource.id] = dataSource;
    }
}

/**
 *
 * @param dataSourceIds
 */
async function removeDataSources(dataSourceIds) {
    for(let dataSourceId of dataSourceIds) {
        await removeDataSource(dataSourceId);
    }
}

async function removeDataSource(dataSourceId) {
    await dataSynchronizerAlgo.removeDataSource(dataSourceId);
    // create a BC to push back the synchronized data into the DATA Stream.
    console.log('deleting BC for datasource '+dataSourceId);
    delete bcChannels[dataSourceId];
    delete dataSources[dataSourceId];
}

function checkMasterTime() {
    if(!isDefined(masterTimeInterval)) {
        startMasterTimeInterval(masterTimeRefreshRate);
    }
}
async function onEnd() {
    const masterTime = dataSynchronizerAlgo.getCurrentTimestamp();
    clearInterval(masterTimeInterval);
    masterTimeInterval = undefined;
    // end at this time
    timeBroadcastChannel.postMessage({
        timestamp: masterTime,
        type: EventType.MASTER_TIME
    });
}

async function onStart() {
    checkMasterTime();
}

function onClose() {
    timeBroadcastChannel.postMessage({
        type: EventType.CLOSED
    });
}

async function onData(dataSourceId, dataBlock) {
    if(dataBlock.version !== version) {
        console.error('version are different:',dataBlock.version,version);
        return;
    }
    lastData = {
        dataSourceId: dataSourceId,
        dataBlock: dataBlock,
    };
    bcChannels[dataSourceId].postMessage({
            values: [dataBlock],
            dataSourceId:dataSourceId,
            type: EventType.DATA
        }
    );
}
self.onclose = function() {
    dataSynchronizerAlgo.close();
    console.log("Data Synchronizer has been terminated successfully");
}

let masterTime;
function startMasterTimeInterval(masterTimeRefreshRate) {
    if (!isDefined(masterTimeInterval)) {
        masterTimeInterval = setInterval(() => {
            masterTime = dataSynchronizerAlgo.getCurrentTimestamp();
            if (isDefined(masterTime)) {
                timeBroadcastChannel.postMessage({
                    timestamp: masterTime,
                    type: EventType.MASTER_TIME
                });
            }

            if(isDefined(lastData)) {
                cTime = lastData.dataBlock.data.timestamp;
                cId = lastData.dataSourceId;

                if ((cTime !== -1 && lastTime === -1) || (lastTime !== -1 && cTime !== lastTime)) { // does not send the same data twice
                    timeBroadcastChannel.postMessage({
                        timestamp: cTime,
                        dataSourceId: cId,
                        type: EventType.LAST_TIME
                    });
                }
                lastTime = cTime;
            }
        }, masterTimeRefreshRate);
    }
}

/******/ })()
;