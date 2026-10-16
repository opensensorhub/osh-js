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

const entityMap = {
    lt: '<',
    gt: '>',
    amp: '&',
    quot: '"',
    apos: "'",
    Agrave: "À",
    Aacute: "Á",
    Acirc: "Â",
    Atilde: "Ã",
    Auml: "Ä",
    Aring: "Å",
    AElig: "Æ",
    Ccedil: "Ç",
    Egrave: "È",
    Eacute: "É",
    Ecirc: "Ê",
    Euml: "Ë",
    Igrave: "Ì",
    Iacute: "Í",
    Icirc: "Î",
    Iuml: "Ï",
    ETH: "Ð",
    Ntilde: "Ñ",
    Ograve: "Ò",
    Oacute: "Ó",
    Ocirc: "Ô",
    Otilde: "Õ",
    Ouml: "Ö",
    Oslash: "Ø",
    Ugrave: "Ù",
    Uacute: "Ú",
    Ucirc: "Û",
    Uuml: "Ü",
    Yacute: "Ý",
    THORN: "Þ",
    szlig: "ß",
    agrave: "à",
    aacute: "á",
    acirc: "â",
    atilde: "ã",
    auml: "ä",
    aring: "å",
    aelig: "æ",
    ccedil: "ç",
    egrave: "è",
    eacute: "é",
    ecirc: "ê",
    euml: "ë",
    igrave: "ì",
    iacute: "í",
    icirc: "î",
    iuml: "ï",
    eth: "ð",
    ntilde: "ñ",
    ograve: "ò",
    oacute: "ó",
    ocirc: "ô",
    otilde: "õ",
    ouml: "ö",
    oslash: "ø",
    ugrave: "ù",
    uacute: "ú",
    ucirc: "û",
    uuml: "ü",
    yacute: "ý",
    thorn: "þ",
    yuml: "ÿ",
    nbsp: " ",
    iexcl: "¡",
    cent: "¢",
    pound: "£",
    curren: "¤",
    yen: "¥",
    brvbar: "¦",
    sect: "§",
    uml: "¨",
    copy: "©",
    ordf: "ª",
    laquo: "«",
    not: "¬",
    shy: "­­",
    reg: "®",
    macr: "¯",
    deg: "°",
    plusmn: "±",
    sup2: "²",
    sup3: "³",
    acute: "´",
    micro: "µ",
    para: "¶",
    middot: "·",
    cedil: "¸",
    sup1: "¹",
    ordm: "º",
    raquo: "»",
    frac14: "¼",
    frac12: "½",
    frac34: "¾",
    iquest: "¿",
    times: "×",
    divide: "÷",
    forall: "∀",
    part: "∂",
    exist: "∃",
    empty: "∅",
    nabla: "∇",
    isin: "∈",
    notin: "∉",
    ni: "∋",
    prod: "∏",
    sum: "∑",
    minus: "−",
    lowast: "∗",
    radic: "√",
    prop: "∝",
    infin: "∞",
    ang: "∠",
    and: "∧",
    or: "∨",
    cap: "∩",
    cup: "∪",
    'int': "∫",
    there4: "∴",
    sim: "∼",
    cong: "≅",
    asymp: "≈",
    ne: "≠",
    equiv: "≡",
    le: "≤",
    ge: "≥",
    sub: "⊂",
    sup: "⊃",
    nsub: "⊄",
    sube: "⊆",
    supe: "⊇",
    oplus: "⊕",
    otimes: "⊗",
    perp: "⊥",
    sdot: "⋅",
    Alpha: "Α",
    Beta: "Β",
    Gamma: "Γ",
    Delta: "Δ",
    Epsilon: "Ε",
    Zeta: "Ζ",
    Eta: "Η",
    Theta: "Θ",
    Iota: "Ι",
    Kappa: "Κ",
    Lambda: "Λ",
    Mu: "Μ",
    Nu: "Ν",
    Xi: "Ξ",
    Omicron: "Ο",
    Pi: "Π",
    Rho: "Ρ",
    Sigma: "Σ",
    Tau: "Τ",
    Upsilon: "Υ",
    Phi: "Φ",
    Chi: "Χ",
    Psi: "Ψ",
    Omega: "Ω",
    alpha: "α",
    beta: "β",
    gamma: "γ",
    delta: "δ",
    epsilon: "ε",
    zeta: "ζ",
    eta: "η",
    theta: "θ",
    iota: "ι",
    kappa: "κ",
    lambda: "λ",
    mu: "μ",
    nu: "ν",
    xi: "ξ",
    omicron: "ο",
    pi: "π",
    rho: "ρ",
    sigmaf: "ς",
    sigma: "σ",
    tau: "τ",
    upsilon: "υ",
    phi: "φ",
    chi: "χ",
    psi: "ψ",
    omega: "ω",
    thetasym: "ϑ",
    upsih: "ϒ",
    piv: "ϖ",
    OElig: "Œ",
    oelig: "œ",
    Scaron: "Š",
    scaron: "š",
    Yuml: "Ÿ",
    fnof: "ƒ",
    circ: "ˆ",
    tilde: "˜",
    ensp: " ",
    emsp: " ",
    thinsp: " ",
    zwnj: "‌",
    zwj: "‍",
    lrm: "‎",
    rlm: "‏",
    ndash: "–",
    mdash: "—",
    lsquo: "‘",
    rsquo: "’",
    sbquo: "‚",
    ldquo: "“",
    rdquo: "”",
    bdquo: "„",
    dagger: "†",
    Dagger: "‡",
    bull: "•",
    hellip: "…",
    permil: "‰",
    prime: "′",
    Prime: "″",
    lsaquo: "‹",
    rsaquo: "›",
    oline: "‾",
    euro: "€",
    trade: "™",
    larr: "←",
    uarr: "↑",
    rarr: "→",
    darr: "↓",
    harr: "↔",
    crarr: "↵",
    lceil: "⌈",
    rceil: "⌉",
    lfloor: "⌊",
    rfloor: "⌋",
    loz: "◊",
    spades: "♠",
    clubs: "♣",
    hearts: "♥",
    diams: "♦"
};
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

        function fixedFromCharCode(code) {
            // String.prototype.fromCharCode does not supports
            // > 2 bytes unicode chars directly
            if (code > 0xffff) {
                code -= 0x10000;
                const surrogate1 = 0xd800 + (code >> 10)
                    , surrogate2 = 0xdc00 + (code & 0x3ff);

                return String.fromCharCode(surrogate1, surrogate2);
            } else {
                return String.fromCharCode(code);
            }
        }

        function entityReplacer(a){
            const k = a.slice(1,-1);
            if(k in entityMap){
                return entityMap[k];
            }else if(k.charAt(0) === '#'){
                return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
            }else{
                throw Error('entity not found:'+a);
                return a;
            }
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
                        node[name] = value.replace(/&#?\w+;/g,entityReplacer);
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
export default SWEXmlStreamParser;
