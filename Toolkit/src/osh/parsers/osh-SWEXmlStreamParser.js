/**
 * Created by Alex Robin on 5/5/19.
 */

/**
 * @class Javascript binding for SWE requests
 * @classdesc
 *
 */
// name this function so it can be easily imported in webworkers
(OSH.SWEXmlStreamParserCreator = function() {

    OSH.SWEXmlStreamParser = function(xml) {
        this.originalXml = xml;
    };

    OSH.SWEXmlStreamParser.arrayNodeSet = new Set([
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

    OSH.SWEXmlStreamParser.numericalNodeSet = new Set([
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

    OSH.SWEXmlStreamParser.prototype.toJson = function() {
        "use strict";
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
        var arrayNodeSet = OSH.SWEXmlStreamParser.arrayNodeSet;
        var numericalNodeSet = OSH.SWEXmlStreamParser.numericalNodeSet;

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
                            while (pos !== -1 && !(S.charCodeAt(pos) === closeBracketCC && S.charCodeAt(pos - 1) == minusCC && S.charCodeAt(pos - 2) == minusCC && pos != -1)) {
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
                        node[childName] = child.value;
                    }
                    else {
                        // skip one level if child is an OGC property
                        if (isProperty) {
                            delete child.type;
                            for (var k in child) {
                                if (typeof(child[k]) === 'object' && k !== 'name') {
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
                return qname.substring(nsEnd+1);
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
    };
})();