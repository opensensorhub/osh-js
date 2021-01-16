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

// CONCATENATED MODULE: ./source/osh/utils/Utils.js
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
    return typeof (v) !== 'undefined' && v !== null;
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
function hex2rgb(hex){
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return [r, g, b];
}
/**
 Global helper method to test if a letiable or object attribute is of a particular type
 */
function hasType(v, expectedType) {
    let hasVal = hasValue(v);
    return hasVal && typeof (v) === expectedType;
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
    if (typeof (v) !== expectedType) {
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
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
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
}

//buffer is an ArrayBuffer object, the offset if specified in bytes, and the type is a string
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
    let view = new DataView(buffer);

    //Note: There exist types not listed in the map below that have OGC definitions, but no appropriate
    //methods or corresponding types available for parsing in javascript. They are float128, float16, signedLong,
    //and unsignedLong
    let typeMap = {
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
}

//This function recursivley iterates over the resultStructure to fill in
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
    return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
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
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
    );
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
function takeScreenShot(div) {
}

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


// CONCATENATED MODULE: ./source/osh/dataconnector/Status.js
/**
 * Enum for connection status.
 * @readonly
 * @enum {{name: string}}
 */
const Status = {
    CONNECTED:  "connected",
    DISCONNECTED: "disconnected"
};

// CONCATENATED MODULE: ./source/osh/datasynchronizer/DataSynchronizerAlgo.js



class DataSynchronizerAlgo_DataSynchronizerAlgo {
    constructor(dataSources, replaySpeed = 1, intervalRate = 5) {
        this.dataSourceMap = {};
        this.bufferingTime = 1000;
        this.startBufferingTime = -1;
        this.tsRun = 0;
        this.replaySpeed = replaySpeed;
        this.intervalRate = intervalRate;
        let maxBufferingTime = -1;

        for (let ds of dataSources) {
            this.addDataSource(ds);
            maxBufferingTime = ds.bufferingTime > maxBufferingTime ? ds.bufferingTime : maxBufferingTime;
        }
        if (maxBufferingTime !== -1) {
            this.bufferingTime = maxBufferingTime;
        }
    }

    push(dataSourceId, data) {
        const ds = this.dataSourceMap[dataSourceId];
        if (ds.status === Status.DISCONNECTED) {
            return;
        }

        if (this.startBufferingTime === -1) {
            this.startBufferingTime = performance.now();
            // start iterating on data after bufferingTime
            setTimeout(() => this.processData(), this.bufferingTime);
        }

        let latency = 0;
        if (this.tsRun > 0) {
            latency = this.tsRun - data.timeStamp;
        }
        ds.latency = latency > ds.latency ? latency : (ds.latency + latency) / 2;
        ds.dataBuffer.push(data);
    }

    reset() {
        this.close();
        for (let currentDsId in this.dataSourceMap) {
            const currentDs = this.dataSourceMap[currentDsId];
            currentDs.dataBuffer = [];
        }
        this.startBufferingTime = -1;
    }

    processData() {
        let tsRef = -1;
        let clockTimeRef = performance.now();

        // get reference start timestamp
        // the reference start timestamp should the oldest one
        let currentDs;
        for (let currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.status === Status.DISCONNECTED) {
                continue;
            }
            if (currentDs.dataBuffer.length > 0) {
                tsRef = (tsRef === -1 || currentDs.dataBuffer[0].timeStamp < tsRef) ? currentDs.dataBuffer[0].timeStamp :
                    tsRef;
            }
        }

        this.interval = setInterval(() => {
            // 1) return the oldest data if any
            while (this.computeNextData(tsRef, clockTimeRef)) ;

        }, this.intervalRate);
    }

    /**
     * Compute the next data if any. We return only 1 value for this iteration. If there are multiple values to return,
     * we return only the oldest one.
     * @param tsRef - the timestamp of the first data
     * @param refClockTime - the absolute diff time really spent
     */
    computeNextData(tsRef, refClockTime) {
        let currentDs;
        let currentDsToShift = null;

        // compute max latency
        let maxLatency = 0;
        let minLatency = 0;
        for (let currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.status === Status.DISCONNECTED) {
                continue;
            }
            if (currentDs.latency > 0) {
                let latency = Math.min(currentDs.latency, currentDs.timeOut);
                maxLatency = (latency > maxLatency) ? latency : maxLatency;
                minLatency = (currentDs.latency < minLatency) ? currentDs.latency : minLatency;
            }
        }

        const dClock = performance.now() - refClockTime;
        this.tsRun = tsRef + dClock;

        // compute next data to return
        for (let currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.status === Status.DISCONNECTED) {
                continue;
            }
            if (currentDs.dataBuffer.length > 0) {
                const dTs = currentDs.dataBuffer[0].timeStamp - tsRef;
                const dClockAdj = dClock - maxLatency;
                // we use an intermediate object to store the data to shift because we want to return the oldest one
                // only
                if (dTs <= dClockAdj * this.replaySpeed) {
                    // no other one to compare
                    if (currentDsToShift === null) {
                        currentDsToShift = currentDs;
                    } else {
                        // take the oldest data
                        currentDsToShift = (currentDsToShift.dataBuffer[0].timeStamp < currentDs.dataBuffer[0].timeStamp) ?
                            currentDsToShift : currentDs;
                    }
                }
            }
        }

        // finally pop the data from DS queue
        if (currentDsToShift !== null) {
            let rec = currentDsToShift.dataBuffer.shift();

            // add latency flag to data record before we dispatch it
            // this is relative latency in millis compared to the DS with the lowest latency
            // so it is accurate even if local device time is not set properly
            rec['@latency'] = currentDs.latency - minLatency;

            this.onData(currentDsToShift.id, rec);
            return true;
        }
        return false;
    }

    /**
     * Add dataSource to be synchronized
     * @param {DataSource} dataSource - the dataSource to synchronize
     */
    addDataSource(dataSource) {
        this.dataSourceMap[dataSource.id] = {
            bufferingTime: dataSource.bufferingTime,
            timeOut: dataSource.timeOut || 0,
            dataBuffer: [],
            startBufferingTime: -1,
            id: dataSource.id,
            timedOut: false,
            name: dataSource.name || dataSource.id,
            latency: 0,
            status: Status.DISCONNECTED //MEANING Enabled, 0 = Disabled
        };
    }

    onData(dataSourceId, data) {
    }

    /**
     * Change the dataSource status
     * @param {Status} status - the new status
     * @param {String} dataSourceId - the corresponding dataSource id
     */
    setStatus(dataSourceId, status) {
        if (dataSourceId in this.dataSourceMap) {
            this.dataSourceMap[dataSourceId].status = status;
            if (status === Status.DISCONNECTED) {
                // reset latency and buffer
                this.dataSourceMap[dataSourceId].latency = 0;
                this.dataSourceMap[dataSourceId].dataBuffer = [];
            }

            console.warn(status+' DataSource ' + dataSourceId + ' from the synchronizer ');
        }
    }

    close() {
        if (isDefined(this.interval)) {
            clearInterval(this.interval);
            console.log("Data synchronizer terminated successfully");
        }
    }
}

/* harmony default export */ var datasynchronizer_DataSynchronizerAlgo = (DataSynchronizerAlgo_DataSynchronizerAlgo);

// CONCATENATED MODULE: ./source/osh/Constants.js
const DATA_SYNCHRONIZER_TOPIC = 'data-synchronizer-';
const DATASOURCE_DATA_TOPIC = 'datasource-data-';
const FFMPEG_VIEW_DECODE_TOPIC = 'ffmpeg-decode-';

// CONCATENATED MODULE: ./source/osh/event/EventType.js
const EventType = {
    DATA: 'data',
    STATUS: 'status'
};

// CONCATENATED MODULE: ./source/osh/datasynchronizer/DataSynchronizer.worker.js




const bcChannels = {};
let dataSynchronizerAlgo;

let init = false;
let dataSourceBroadCastChannel = null;
self.currentTime = -1;

const dataSources = {};

self.onmessage = (event) => {
    if(event.data.message === 'init') {
        dataSynchronizerAlgo = new datasynchronizer_DataSynchronizerAlgo(
            event.data.dataSources,
            event.data.replaySpeed,
            event.data.intervalRate
        );
        dataSynchronizerAlgo.onData = onData;
        init = true;
        addDataSources(event.data.dataSources);
        initBroadcastChannel(event.data.topic);
    } else if(event.data.message === 'add' && event.data.dataSources) {
        addDataSources(event.data.dataSources);
    } else if(event.data.message === 'current-time') {
        self.postMessage({
            message: 'current-time',
            data: self.currentTime
        });
    }  else if(event.data.message === 'reset') {
        if(dataSynchronizerAlgo !== null) {
            dataSynchronizerAlgo.reset();
        }
    } else if(event.data.message === 'data') {
        if(dataSynchronizerAlgo !== null) {
            dataSynchronizerAlgo.push(event.data.dataSourceId, {
                data: event.data.data,
                timeStamp: event.data.timeStamp
            });
        }
    }
}

function initBroadcastChannel(topic) {
    dataSourceBroadCastChannel = new BroadcastChannel(topic);
    dataSourceBroadCastChannel.onmessage = (event) => {
        if(event.data.type === EventType.DATA) {
            for(let i=0; i < event.data.values.length;i++) {
                dataSynchronizerAlgo.push(event.data.dataSourceId, {
                    ...event.data.values[i]
                });
            }
        } else if(event.data.type === EventType.STATUS) {
            const dataSourceId = event.data.dataSourceId;
            dataSynchronizerAlgo.setStatus(dataSourceId, event.data.status);
            // bubble the message
            bcChannels[dataSourceId].postMessage(event.data);
        }
    }
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

function onData(dataSourceId, data) {
    self.currentTime = data.timeStamp;
    bcChannels[dataSourceId].postMessage({
            values: [data],
            dataSourceId,
            type: EventType.DATA
        }
    );
}


self.onclose = function() {
    dataSynchronizerAlgo.close();
    console.log("Data Synchronizer has been terminated successfully");
}


/***/ })
/******/ ]);