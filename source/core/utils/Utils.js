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
export const MAX_LONG = Math.pow(2, 53) + 1;

/**
 * Global helper method to test if a letiable or object attribute is defined
 */
export function isDefined(v) {
    return typeof (v) !== 'undefined' && v !== null;
}

/**
 Global helper method to test if a letiable or object attribute has a value,
 that is it is defined and non null
 */
export function hasValue(v) {
    return isDefined(v) && v !== null;
}

/**
 Global helper method to transform hex color into RGBA
 */
export function hex2rgb(hex){
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return [r, g, b];
}
/**
 Global helper method to test if a letiable or object attribute is of a particular type
 */
export function hasType(v, expectedType) {
    let hasVal = hasValue(v);
    return hasVal && typeof (v) === expectedType;
}

/**
 Global helper method to test if a letiable or object attribute is an object
 */
export function isObject(v, letName) {
    return hasType(v, 'object', letName);
}

/**
 Global helper method to test if a letiable or object attribute is an array
 */
export function isArray(v) {
    return isDefined(v) && Array.isArray(v);
}

/**
 Global helper method to test if a letiable or object attribute is a function
 */
export function isFunction(v, letName) {
    return hasType(v, 'function', letName);
}

/**
 Assert that a letiable or object attribute is defined
 **/
export function assertDefined(v, letName = 'letiable') {
    if (!isDefined(v)) {
        throw letName + " must be defined";
    }
    return v;
}

export function assertTrue(v, letName = 'letiable') {
    if (!isDefined(v) || !v) {
        throw letName;
    }
    return v;
}
/**
 Assert that a letiable or object attribute is defined and non-null
 **/
export function assertType(v, expectedType, letName = 'letiable') {
    assertDefined(v, letName);
    if (typeof (v) !== expectedType) {
        throw letName + " must be of type " + expectedType;
    }
    return v;
}

/**
 Assert that a letiable or object attribute is a string
 **/
export function assertBoolean(v, letName) {
    return assertType(v, 'boolean', letName);
}

/**
 Assert that a letiable or object attribute is a string
 **/
export function assertString(v, letName) {
    return assertType(v, 'string', letName);
}

/**
 Assert that a letiable or object attribute is a number
 **/
export function assertNumber(v, letName) {
    return assertType(v, 'number', letName);
}

/**
 Assert that a letiable or object attribute is a number
 **/
export function assertPositive(v, letName) {
    assertNumber(v, letName);
    if (v <= 0) {
        throw letName + " must be a positive number";
    }
}

/**
 Assert that a letiable or object attribute is an object
 **/
export function assertObject(v, letName) {
    return assertType(v, 'object', letName);
}

/**
 Assert that a letiable or object attribute is an object
 **/
export function assertArray(v, letName = 'letiable') {
    assertDefined(v, letName);
    if (!Array.isArray(v)) {
        throw letName + " must be an array";
    }
    return v;
}

/**
 Assert that a letiable or object attribute is a function
 **/
export function assertFunction(v, letName) {
    return assertType(v, 'function', letName);
}

/**
 Assert that a letiable or object attribute is defined and non-null
 **/
export function assertHasValue(v, letName = 'letiable') {
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
export function randomUUID() {
    return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * This function stamps/embeds a UUID into an object and returns the UUID generated for it
 * @return {String}
 */
export function stampUUID(obj) {
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
export function ParseBytes(buffer, offset, type) {
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
export function ReadData(struct, data, offsetBytes) {
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
export function GetResultObject(resultStructure) {
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
export function isOpera() {
    return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
}

/**
 *
 * @return {boolean}
 */
export function isFirefox() {
    return typeof InstallTrigger !== 'undefined';
}

/**
 *
 * @return {boolean}
 */
export function isSafari() {
    return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
}

/**
 *
 * @return {boolean}
 */
export function isChrome() {
    return !!window.chrome && !!window.chrome.webstore;
}

/**
 *
 * @return {*|boolean}
 */
export function isBlink() {
    return (isChrome || isOpera) && !!window.CSS;
}

/**
 *
 * @param a
 * @param b
 * @return {boolean}
 */
export function isArrayIntersect(a, b) {
    return a.filter(function (element) {
        return b.indexOf(element) > -1;
    }).length > 0;
}


/**
 *
 * @param o
 * @return {boolean}
 */
export function isElement(o) {
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
    );
}

/**
 *
 * @return {*}
 */
export function isWebWorker() {
    return isDefined(Worker);
}

/**
 *
 * @param div
 */
export function takeScreenShot(div) {
}

/**
 * Remove a css class from a the div given as argument.
 * @param div the div to remove the class from
 * @param css the css class to remove
 */
export function removeCss(div, css) {
    let divCss = div.className;
    css = divCss.replace(css, "");
    div.className = css;
}


/**
 * Add a css class to a the div given as argument.
 * @param div the div to add the class to
 * @param css the css class to add
 */
export function addCss(div, css) {
    div.setAttribute("class", div.className + " " + css);
}

/**
 * Removes the last character of a {string} object.
 * @param {string} value - The input {string}
 * @return {string} The value without the last character
 */
export function removeLastCharIfExist(value) {
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
export function  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Round off number to nearest 0.5
 * @param {Number} num - The number to round off
 * @return {number} The rounded number
 */
export function roundHalf(num) {
    return Math.round(num*2)/2;
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
export function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
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

    return function() {
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
};

export function throttle(func, wait, leading, trailing, context) {
    var ctx, args, result;
    var timeout = null;
    var previous = 0;
    var later = function() {
        previous = new Date;
        timeout = null;
        result = func.apply(ctx, args);
    };
    return function() {
        var now = new Date;
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
};

export function merge (target, source) {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) Object.assign(source[key], merge(target[key], source[key]))
    }

    // Join `target` and modified `source`
    Object.assign(target || {}, source)
    return target
};

export function rgbaToArray(str) {
    let startIdxValue = str.indexOf('(') + 1;
    let endIdxValue = str.indexOf(')');
    let values = str.substr(startIdxValue, endIdxValue-startIdxValue);
    return values.split(',').map(Number);
}
