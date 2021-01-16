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

// CONCATENATED MODULE: ./source/osh/parsers/SWEXmlStreamParser.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoft.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * Javascript binding for SWE requests
 *
 */
class SWEXmlStreamParser {
    /**
     *
     * @param {String} xml -
     */
    constructor(xml='undefined') {
        this.originalXml = xml;
    }

    /**
     * Sets the xml file to parse.
     * @param {String} xml -
     */
    setXml(xml) {
        this.originalXml = xml;
    }

    /**
     * @private
     * @return {Set<string>}
     */
    static get arrayNodeSet() {
        return new Set([
            'featureMember',
            'offering',
            'observableProperty',
            'field',
            'coordinate',
            'item',
            'quality',
            'member',
            'interval',
            'AllowedValues/value'
        ]);
    }

    /**
     * @private
     * @return {Set<string>}
     */
    static get numericalNodeSet() {
        return new Set([
            'nilValue',
            'paddingBytes-after',
            'paddingBytes-before',
            'byteLength',
            'significantBits',
            'bitLength',
            'Time/value',
            'Quantity/value',
            'Count/value'
        ]);
    }

    /**
     * Gets the result of the parsing as Json object.
     * @return {Object} The JSON result
     */
    toJson() {
        var options = {};
        var S = this.originalXml;
        var pos = options.pos || 0;

        var openBracket = "<";
        var openBracketCC = "<".charCodeAt(0);
        var closeBracket = ">";
        var closeBracketCC = ">".charCodeAt(0);
        var minus = "-";
        var minusCC = "-".charCodeAt(0);
        var slash = "/";
        var slashCC = "/".charCodeAt(0);
        var exclamation = '!';
        var exclamationCC = '!'.charCodeAt(0);
        var singleQuote = "'";
        var singleQuoteCC = "'".charCodeAt(0);
        var doubleQuote = '"';
        var doubleQuoteCC = '"'.charCodeAt(0);
        var arrayNodeSet = SWEXmlStreamParser.arrayNodeSet;
        var numericalNodeSet = SWEXmlStreamParser.numericalNodeSet;

        function isArray(name) {
            return arrayNodeSet.has(name);
        }

        /**
         * parsing a list of entries
         */
        function parseChildren(node) {
            while (S[pos]) {
                if (S.charCodeAt(pos) == openBracketCC) {
                    if (S.charCodeAt(pos + 1) === slashCC) {
                        pos = S.indexOf(closeBracket, pos);
                        if (pos + 1) pos += 1
                        return;
                    } else if (S.charCodeAt(pos + 1) === exclamationCC) {
                        if (S.charCodeAt(pos + 2) == minusCC) {
                            //comment support
                            while (pos !== -1 && !(S.charCodeAt(pos) === closeBracketCC
                              && S.charCodeAt(pos - 1) == minusCC && S.charCodeAt(pos - 2) == minusCC && pos != -1)) {
                                pos = S.indexOf(closeBracket, pos + 1);
                            }
                            if (pos === -1) {
                                pos = S.length
                            }
                        } else {
                            // doctypesupport
                            pos += 2;
                            while (S.charCodeAt(pos) !== closeBracketCC && S[pos]) {
                                pos++;
                            }
                        }
                        pos++;
                        continue;
                    }
                    var child = parseNode();
                    var childName = child.type;
                    if (childName === 'type') // don't override special 'type' attribute!
                        continue;
                    var isProperty = childName.charAt(0) == childName.charAt(0).toLowerCase();//Object.keys(child).length == 2;
                    if (isProperty && child.hasOwnProperty('value')) {
                        if (isArray(childName)) {
                            if (!node.hasOwnProperty(childName))
                                node[childName] = [];
                            node[childName].push(child.value);
                        } else {
                            node[childName] = child.value;
                        }
                    } else {
                        // skip one level if child is an OGC property
                        if (isProperty) {
                            delete child.type;
                            for (var k in child) {
                                if (typeof (child[k]) === 'object' && k !== 'name') {
                                    Object.assign(child, child[k]);
                                    delete child[k];
                                }
                            }
                        }
                        if (isArray(childName)) {
                            if (!node.hasOwnProperty(childName))
                                node[childName] = [];
                            node[childName].push(child);
                        } else {
                            node[childName] = child;
                        }
                    }
                } else {
                    var text = parseText();
                    if (text.trim().length > 0) {
                        if (numericalNodeSet.has(node.type))
                            node.value = parseFloat(text);
                        else
                            node.value = text;
                    }
                    pos++;
                }
            }
        }

        /**
         *    returns the text outside of texts until the first '<'
         */
        function parseText() {
            var start = pos;
            pos = S.indexOf(openBracket, pos) - 1;
            if (pos === -2)
                pos = S.length;
            return S.slice(start, pos + 1);
        }

        /**
         *    returns text until the first nonAlphebetic letter
         */
        var nameSpacer = '\n\t>/= ';

        function parseName() {
            var start = pos;
            while (nameSpacer.indexOf(S[pos]) === -1 && S[pos]) {
                pos++;
            }
            return S.slice(start, pos);
        }

        function getLocalName(qname) {
            var nsEnd = qname.indexOf(':');
            if (nsEnd > 0)
                return qname.substring(nsEnd + 1);
            else
                return qname;
        }

        function parseNode() {
            var node = {};
            pos++;
            node.type = getLocalName(parseName());

            // parsing attributes
            while (S.charCodeAt(pos) !== closeBracketCC && S[pos]) {
                var c = S.charCodeAt(pos);
                if ((c > 64 && c < 91) || (c > 96 && c < 123)) {
                    //if('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(S[pos])!==-1 ){
                    var qname = parseName();
                    var name = getLocalName(qname);
                    // search beginning of the string
                    var code = S.charCodeAt(pos);
                    while (code && code !== singleQuoteCC && code !== doubleQuoteCC && !((code > 64 && code < 91) || (code > 96 && code < 123)) && code !== closeBracketCC) {
                        pos++;
                        code = S.charCodeAt(pos);
                    }
                    if (code === singleQuoteCC || code === doubleQuoteCC) {
                        var value = parseString();
                        if (pos === -1) {
                            return node;
                        }
                    } else {
                        value = null;
                        pos--;
                    }
                    if (!qname.startsWith('xmlns:'))
                        node[name] = value;
                }
                pos++;

            }

            // optional parsing of children
            if (S.charCodeAt(pos - 1) !== slashCC) {
                pos++;
                parseChildren(node);
            } else {
                pos++;
            }
            return node;
        }

        /**
         *    is parsing a string, that starts with a char and with the same usually  ' or "
         */

        function parseString() {
            var startChar = S[pos];
            var startpos = ++pos;
            pos = S.indexOf(startChar, startpos)
            return S.slice(startpos, pos);
        }

        var out = parseNode();
        out.pos = pos;
        return out;
    }
}
/* harmony default export */ var parsers_SWEXmlStreamParser = (SWEXmlStreamParser);

// CONCATENATED MODULE: ./source/osh/server/GetRequest.worker.js


self.onmessage = (e) => {
    const json = e.data.json;
    const req = e.data.request;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if(json) {
                    try {
                        const jsonResp = JSON.parse(xhr.responseText);
                        self.postMessage(jsonResp);
                    }catch(exception) {
                        console.error('Cannot parse Json: \n',xhr.responseText);
                        self.postMessage({error: true, msg: 'Cannot parse Json'});
                    }
                } else {
                    let sweXmlParser = new parsers_SWEXmlStreamParser(xhr.responseText);
                    sweXmlParser.setXml(xhr.responseText);
                    let respObj = sweXmlParser.toJson();
                    self.postMessage(respObj);
                }
            } else {
                self.postMessage({error: true, msg: xhr.responseText});
            }
        }
    };
    xhr.withCredentials = true;
    xhr.open('GET', req, true);
    xhr.send();
};


/***/ })
/******/ ]);