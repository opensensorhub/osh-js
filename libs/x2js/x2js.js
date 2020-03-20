/*
 Copyright 2011-2013 Abdulla Abdurakhmanov
 Original sources are available at https://code.google.com/p/x2js/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

export default class X2JS {
    constructor(config) {
        this.VERSION = "1.2.0";

        this.config = config || {};
        this.initConfigDefaults();
        this.initRequiredPolyfills();
    }

    initConfigDefaults() {
        if (this.config.escapeMode === undefined) {
            this.config.escapeMode = true;
        }

        this.config.attributePrefix = this.config.attributePrefix || "";
        this.config.arrayAccessForm = this.config.arrayAccessForm || "none";
        this.config.emptyNodeForm = this.config.emptyNodeForm || "text";

        if (this.config.enableToStringFunc === undefined) {
            this.config.enableToStringFunc = true;
        }
        this.config.arrayAccessFormPaths = this.config.arrayAccessFormPaths || [];

        this.config.numericalAccessFormPaths = this.config.numericalAccessFormPaths || [];

        if (this.config.skipEmptyTextNodesForObj === undefined) {
            this.config.skipEmptyTextNodesForObj = true;
        }
        if (this.config.stripWhitespaces === undefined) {
            this.config.stripWhitespaces = true;
        }
        this.config.datetimeAccessFormPaths = this.config.datetimeAccessFormPaths || [];

        if (this.config.useDoubleQuotes === undefined) {
            this.config.useDoubleQuotes = false;
        }

        this.config.xmlElementsFilter = this.config.xmlElementsFilter || [];
        this.config.jsonPropertiesFilter = this.config.jsonPropertiesFilter || [];

        if (this.config.keepCData === undefined) {
            this.config.keepCData = false;
        }

        if (this.config.prefix === undefined) {
            this.config.prefix = true;
        }

        if (this.config.removeAttrPrefix === undefined) {
            this.config.removeAttrPrefix = false;
        }

        if (this.config.xmlns === undefined) {
            this.config.xmlns = true;
        }

        if (this.config.skip === undefined) {
            this.config.skip = [];
        }
    }

    static get DOMNodeTypes() {
        return {
            ELEMENT_NODE: 1,
            TEXT_NODE: 3,
            CDATA_SECTION_NODE: 4,
            COMMENT_NODE: 8,
            DOCUMENT_NODE: 9
        };
    }

    initRequiredPolyfills() {
    }

    getNodeLocalName(node) {
        let nodeLocalName = node.localName;
        if (nodeLocalName === null) { // Yeah, this is IE!!
            nodeLocalName = node.baseName;
        }
        if (nodeLocalName === null || nodeLocalName === "") { // =="" is IE too
            nodeLocalName = node.nodeName;
        }
        return nodeLocalName;
    }

    getNodePrefix(node) {
        return node.prefix;
    }

    escapeXmlChars(str) {
        if (typeof (str) === "string") {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        } else {
            return str;
        }
    }

    unescapeXmlChars(str) {
        return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
    }

    checkInStdFiltersArrayForm(stdFiltersArrayForm, obj, name, path) {
        let idx = 0;
        for (; idx < stdFiltersArrayForm.length; idx++) {
            let filterPath = stdFiltersArrayForm[idx];
            if (typeof filterPath === "string") {
                if (filterPath === path) {
                    break;
                }
            } else if (filterPath instanceof RegExp) {
                if (filterPath.test(path)) {
                    break;
                }
            } else if (typeof filterPath === "function") {
                if (filterPath(obj, name, path)) {
                    break;
                }
            }
        }
        return idx !== stdFiltersArrayForm.length;
    }

    toArrayAccessForm(obj, childName, path) {
        switch (this.config.arrayAccessForm) {
            case "property":
                if (!(obj[childName] instanceof Array))
                    obj[childName + "_asArray"] = [obj[childName]];
                else
                    obj[childName + "_asArray"] = obj[childName];
                break;
            /*case "none":
             break;*/
        }

        if (!(obj[childName] instanceof Array) && this.config.arrayAccessFormPaths.length > 0) {
            if (this.checkInStdFiltersArrayForm(this.config.arrayAccessFormPaths, obj, childName, path)) {
                obj[childName] = [obj[childName]];
            }
        }
    }

    checkAsNumericalValue(value, path) {
        let displayAsNum = false;

        for (let i = 0; i < this.config.numericalAccessFormPaths.length; i++) {
            if ((this.config.numericalAccessFormPaths[i] instanceof RegExp &&
                this.config.numericalAccessFormPaths[i].test(path)) || (this.config.numericalAccessFormPaths[i] == value)) {
                displayAsNum = true;
                break;
            }
        }

        return displayAsNum;
    }

    fromXmlDateTime(prop) {
        // Implementation based up on http://stackoverflow.com/questions/8178598/xml-datetime-to-javascript-date-object
        // Improved to support full spec and optional parts
        let bits = prop.split(/[-T:+Z]/g);

        let d = new Date(bits[0], bits[1] - 1, bits[2]);
        let secondBits = bits[5].split("\.");
        d.setHours(bits[3], bits[4], secondBits[0]);
        if (secondBits.length > 1)
            d.setMilliseconds(secondBits[1]);

        // Get supplied time zone offset in minutes
        if (bits[6] && bits[7]) {
            let offsetMinutes = bits[6] * 60 + Number(bits[7]);
            let sign = /\d\d-\d\d:\d\d$/.test(prop) ? '-' : '+';

            // Apply the sign
            offsetMinutes = 0 + (sign == '-' ? -1 * offsetMinutes : offsetMinutes);

            // Apply offset and local timezone
            d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset())
        } else if (prop.indexOf("Z", prop.length - 1) !== -1) {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));
        }

        // d is now a local time equivalent to the supplied time
        return d;
    }

    checkFromXmlDateTimePaths(value, childName, fullPath) {
        if (this.config.datetimeAccessFormPaths.length > 0) {
            let path = fullPath.split("\.#")[0];
            if (this.checkInStdFiltersArrayForm(this.config.datetimeAccessFormPaths, value, childName, path)) {
                return this.fromXmlDateTime(value);
            } else {
                return value;
            }
        } else {
            return value;
        }
    }

    checkXmlElementsFilter(obj, childType, childName, childPath) {
        if (childType === DOMNodeTypes.ELEMENT_NODE && this.config.xmlElementsFilter.length > 0) {
            return this.checkInStdFiltersArrayForm(this.config.xmlElementsFilter, obj, childName, childPath);
        } else {
            return true;
        }
    }

    parseDOMChildren(node, path, pos, parentResult) {
        if (node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
            let result = new Object;
            let nodeChildren = node.childNodes;
            // Alternative for firstElementChild which is not supported in some environments
            for (let cidx = 0; cidx < nodeChildren.length; cidx++) {
                let child = nodeChildren.item(cidx);
                if (child.nodeType === DOMNodeTypes.ELEMENT_NODE) {
                    let childName = this.getNodeLocalName(child);
                    result[childName] = this.parseDOMChildren(child, childName, 0);
                }
            }
            return result;
        } else if (node.nodeType === DOMNodeTypes.ELEMENT_NODE) {
            let result = null;
            if (typeof parentResult != "undefined" && parentResult != null) {
                result = parentResult;
            } else {
                result = new Object;
                result.__cnt = 0;
            }


            let nodeChildren = node.childNodes;

            // Attributes
            for (let aidx = 0; aidx < node.attributes.length; aidx++) {
                let attr = node.attributes.item(aidx); // [aidx];
                if (!this.config.xmlns && attr.prefix == "xmlns") {
                    continue;
                }
                result.__cnt++;
                if (this.config.removeAttrPrefix && typeof attr.localName != "undefined") {
                    result[this.config.attributePrefix + attr.localName] = attr.value;
                } else {
                    result[this.config.attributePrefix + attr.name] = attr.value;
                }
            }

            let i = 0;

            if (typeof pos != "undefined") {
                i = pos;
            }
            // Children nodes
            for (let cidx = i; cidx < nodeChildren.length; cidx++) {
                let child = nodeChildren.item(cidx); // nodeChildren[cidx];
                let childName = this.getNodeLocalName(child);

                if (this.config.skip && this.config.skip.indexOf(childName) > -1) {
                    continue; // skip element
                }
                // check if the element has to be inlined

                if ((childName.length > 0 && (childName.isFirstCharUpper()))) {
                    result['type'] = childName;
                    this.parseDOMChildren(child, path, 0, result);

                } else if (child.nodeType != DOMNodeTypes.COMMENT_NODE) {
                    let childPath = path + "." + childName;

                    if (this.checkXmlElementsFilter(result, child.nodeType, childName, childPath)) {
                        result.__cnt++;
                        if (result[childName] == null) {
                            result[childName] = this.parseDOMChildren(child, childPath, 0);
                            this.toArrayAccessForm(result, childName, childPath);
                        } else {
                            if (result[childName] != null) {
                                if (!(result[childName] instanceof Array)) {
                                    result[childName] = [result[childName]];
                                    this.toArrayAccessForm(result, childName, childPath);
                                }
                            }
                            (result[childName])[result[childName].length] = this.parseDOMChildren(child, childPath, 0);
                        }
                    }
                }
            }

            // Node namespace prefix
            let nodePrefix = this.getNodePrefix(node);
            if (nodePrefix != null && nodePrefix != "" && this.config.prefix) {
                result.__cnt++;
                result.__prefix = nodePrefix;
            }

            if (result["#text"] != null) {
                result.value = result["#text"];
                if (result.value instanceof Array) {
                    result.value = result.value.join("\n");
                }
                //if(this.config.escapeMode)
                //	result.value = unescapeXmlChars(result.value);
                if (this.config.stripWhitespaces)
                    result.value = result.value.trim();
                delete result["#text"];
                if (this.config.arrayAccessForm == "property")
                    delete result["#text_asArray"];
                result.value = this.checkFromXmlDateTimePaths(result.value, childName, path + "." + childName);
                if (result.value.length == 0) {
                    delete result.value;
                }

                if (this.checkAsNumericalValue(this.getNodeLocalName(node), path)) {
                    result.value = parseFloat(result.value);
                }
            }
            if (result["#cdata-section"] != null) {
                result.__cdata = result["#cdata-section"];
                delete result["#cdata-section"];
                if (this.config.arrayAccessForm == "property")
                    delete result["#cdata-section_asArray"];
            }

            if (result.__cnt == 0 && this.config.emptyNodeForm == "text") {
                result = '';
            } else if (result.__cnt == 1 && result.value != null) {
                result = result.value;
            } else if (result.__cnt == 1 && result.__cdata != null && !this.config.keepCData) {
                result = result.__cdata;
            } else if (result.__cnt > 1 && result.value != null && this.config.skipEmptyTextNodesForObj) {
                if ((this.config.stripWhitespaces && result.value == "") || (result.value.trim() == "")) {
                    delete result.value;
                }
            }
            delete result.__cnt;

            if (this.config.enableToStringFunc && (result.value != null || result.__cdata != null)) {
                result.toString = function () {
                    return (this.value != null ? this.value : '') + (this.__cdata != null ? this.__cdata : '');
                };
            }

            return result;
        } else if (node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
            return node.nodeValue;
        }
    }

    startTag(jsonObj, element, attrList, closed) {
        let resultStr = "<" + ((jsonObj != null && jsonObj.__prefix != null) ? (jsonObj.__prefix + ":") : "") + element;
        if (attrList != null) {
            for (let aidx = 0; aidx < attrList.length; aidx++) {
                let attrName = attrList[aidx];
                let attrVal = jsonObj[attrName];
                if (this.config.escapeMode)
                    attrVal = this.escapeXmlChars(attrVal);
                resultStr += " " + attrName.substr(this.config.attributePrefix.length) + "=";
                if (this.config.useDoubleQuotes)
                    resultStr += '"' + attrVal + '"';
                else
                    resultStr += "'" + attrVal + "'";
            }
        }
        if (!closed)
            resultStr += ">";
        else
            resultStr += "/>";
        return resultStr;
    }

    endTag(jsonObj, elementName) {
        return "</" + (jsonObj.__prefix != null ? (jsonObj.__prefix + ":") : "") + elementName + ">";
    }

    endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    jsonXmlSpecialElem(jsonObj, jsonObjField) {
        if ((this.config.arrayAccessForm == "property" && endsWith(jsonObjField.toString(), ("_asArray")))
            || jsonObjField.toString().indexOf(this.config.attributePrefix) == 0
            || jsonObjField.toString().indexOf("__") == 0
            || (jsonObj[jsonObjField] instanceof Function))
            return true;
        else
            return false;
    }

    jsonXmlElemCount(jsonObj) {
        let elementsCnt = 0;
        if (jsonObj instanceof Object) {
            for (let it in jsonObj) {
                if (this.jsonXmlSpecialElem(jsonObj, it))
                    continue;
                elementsCnt++;
            }
        }
        return elementsCnt;
    }

    checkJsonObjPropertiesFilter(jsonObj, propertyName, jsonObjPath) {
        return this.config.jsonPropertiesFilter.length == 0
            || jsonObjPath == ""
            || this.checkInStdFiltersArrayForm(this.config.jsonPropertiesFilter, jsonObj, propertyName, jsonObjPath);
    }

    parseJSONAttributes(jsonObj) {
        let attrList = [];
        if (jsonObj instanceof Object) {
            for (let ait in jsonObj) {
                if (ait.toString().indexOf("__") == -1 && ait.toString().indexOf(this.config.attributePrefix) == 0) {
                    attrList.push(ait);
                }
            }
        }
        return attrList;
    }

    parseJSONTextAttrs(jsonTxtObj) {
        let result = "";

        if (jsonTxtObj.__cdata != null) {
            result += "<![CDATA[" + jsonTxtObj.__cdata + "]]>";
        }

        if (jsonTxtObj.value != null) {
            if (this.config.escapeMode)
                result += this.escapeXmlChars(jsonTxtObj.value);
            else
                result += jsonTxtObj.value;
        }
        return result;
    }

    parseJSONTextObject(jsonTxtObj) {
        let result = "";

        if (jsonTxtObj instanceof Object) {
            result += this.parseJSONTextAttrs(jsonTxtObj);
        } else if (jsonTxtObj != null) {
            if (this.config.escapeMode)
                result += this.escapeXmlChars(jsonTxtObj);
            else
                result += jsonTxtObj;
        }

        return result;
    }

    getJsonPropertyPath(jsonObjPath, jsonPropName) {
        if (jsonObjPath === "") {
            return jsonPropName;
        } else
            return jsonObjPath + "." + jsonPropName;
    }

    parseJSONArray(jsonArrRoot, jsonArrObj, attrList, jsonObjPath) {
        let result = "";
        if (jsonArrRoot.length == 0) {
            result += this.startTag(jsonArrRoot, jsonArrObj, attrList, true);
        } else {
            for (let arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
                result += this.startTag(jsonArrRoot[arIdx], jsonArrObj, this.parseJSONAttributes(jsonArrRoot[arIdx]), false);
                result += this.parseJSONObject(jsonArrRoot[arIdx], this.getJsonPropertyPath(jsonObjPath, jsonArrObj));
                result += this.endTag(jsonArrRoot[arIdx], jsonArrObj);
            }
        }
        return result;
    }

    parseJSONObject(jsonObj, jsonObjPath) {
        let result = "";

        let elementsCnt = this.jsonXmlElemCount(jsonObj);

        if (elementsCnt > 0) {
            for (let it in jsonObj) {

                if (this.jsonXmlSpecialElem(jsonObj, it) || (jsonObjPath != "" && !this.checkJsonObjPropertiesFilter(jsonObj, it, this.getJsonPropertyPath(jsonObjPath, it))))
                    continue;

                let subObj = jsonObj[it];

                let attrList = this.parseJSONAttributes(subObj)

                if (subObj == null || subObj == undefined) {
                    result += this.startTag(subObj, it, attrList, true);
                } else if (subObj instanceof Object) {

                    if (subObj instanceof Array) {
                        result += this.parseJSONArray(subObj, it, attrList, jsonObjPath);
                    } else if (subObj instanceof Date) {
                        result += this.startTag(subObj, it, attrList, false);
                        result += subObj.toISOString();
                        result += this.endTag(subObj, it);
                    } else {
                        let subObjElementsCnt = this.jsonXmlElemCount(subObj);
                        if (subObjElementsCnt > 0 || subObj.value != null || subObj.__cdata != null) {
                            result += this.startTag(subObj, it, attrList, false);
                            result += this.parseJSONObject(subObj, this.getJsonPropertyPath(jsonObjPath, it));
                            result += this.endTag(subObj, it);
                        } else {
                            result += this.startTag(subObj, it, attrList, true);
                        }
                    }
                } else {
                    result += this.startTag(subObj, it, attrList, false);
                    result += this.parseJSONTextObject(subObj);
                    result += this.endTag(subObj, it);
                }
            }
        }
        result += this.parseJSONTextObject(jsonObj);

        return result;
    }

    parseXmlString(xmlDocStr) {
        let isIEParser = window.ActiveXObject || "ActiveXObject" in window;
        if (xmlDocStr === undefined) {
            return null;
        }
        let xmlDoc;
        if (window.DOMParser) {
            let parser = new window.DOMParser();
            let parsererrorNS = null;
            // IE9+ now is here
            if (!isIEParser) {
                try {
                    parsererrorNS = parser.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI;
                } catch (err) {
                    parsererrorNS = null;
                }
            }
            try {
                xmlDoc = parser.parseFromString(xmlDocStr, "text/xml");
                if (parsererrorNS != null && xmlDoc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0) {
                    //throw new Error('Error parsing XML: '+xmlDocStr);
                    xmlDoc = null;
                }
            } catch (err) {
                xmlDoc = null;
            }
        } else {
            // IE :(
            if (xmlDocStr.indexOf("<?") == 0) {
                xmlDocStr = xmlDocStr.substr(xmlDocStr.indexOf("?>") + 2);
            }
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlDocStr);
        }
        return xmlDoc;
    }

    asArray(prop) {
        if (prop === undefined || prop == null)
            return [];
        else if (prop instanceof Array)
            return prop;
        else
            return [prop];
    }

    toXmlDateTime(dt) {
        if (dt instanceof Date)
            return dt.toISOString();
        else if (typeof (dt) === 'number')
            return new Date(dt).toISOString();
        else
            return null;
    }

    asDateTime(prop) {
        if (typeof (prop) == "string") {
            return this.fromXmlDateTime(prop);
        } else
            return prop;
    }

    xml2json(xmlDoc) {
        return this.parseDOMChildren(xmlDoc);
    }

    xml_str2json(xmlDocStr) {
        let xmlDoc = parseXmlString(xmlDocStr);
        if (xmlDoc != null)
            return this.xml2json(xmlDoc);
        else
            return null;
    };

    json2xml_str(jsonObj) {
        return this.parseJSONObject(jsonObj, "");
    }

    json2xml(jsonObj) {
        let xmlDocStr = json2xml_str(jsonObj);
        return parseXmlString(xmlDocStr);
    }

    getVersion = function () {
        return this.VERSION;
    }
}

String.prototype.isFirstCharUpper = function () {
    "use strict";

    let str = this, re = new RegExp('[^A-Z]');
    return !str.charAt(0).match(re);

};
