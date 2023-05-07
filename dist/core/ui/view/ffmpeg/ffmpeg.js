var OSH = (function () {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    if (typeof __filename !== 'undefined')
        _scriptDir = _scriptDir || __filename;
    return (function (OSH) {
        OSH = OSH || {};
        var d;
        d || (d = typeof OSH !== 'undefined' ? OSH : {});
        var aa, ba;
        d.ready = new Promise(function (a, b) { aa = a; ba = b; });
        var h = {}, q;
        for (q in d)
            d.hasOwnProperty(q) && (h[q] = d[q]);
        var ca = "./this.program", da = "object" === typeof window, t = "function" === typeof importScripts, ea = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node, x = "", ha, ia, ja, y, z;
        if (ea)
            x = t ? require("path").dirname(x) + "/" : __dirname + "/", ha = function (a, b) { var c = A(a); if (c)
                return b ? c : c.toString(); y || (y = require("fs")); z || (z = require("path")); a = z.normalize(a); return y.readFileSync(a, b ? null : "utf8"); }, ja = function (a) { a = ha(a, !0); a.buffer || (a = new Uint8Array(a)); assert(a.buffer); return a; }, ia = function (a, b, c) { var e = A(a); e && b(e); y || (y = require("fs")); z || (z = require("path")); a = z.normalize(a); y.readFile(a, function (f, g) { f ? c(f) : b(g.buffer); }); }, 1 < process.argv.length && (ca = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), process.on("uncaughtException", function (a) { throw a; }), process.on("unhandledRejection", B), d.inspect = function () { return "[Emscripten Module object]"; };
        else if (da || t)
            t ? x = self.location.href : "undefined" !== typeof document && document.currentScript && (x = document.currentScript.src), _scriptDir && (x = _scriptDir), 0 !== x.indexOf("blob:") ? x = x.substr(0, x.lastIndexOf("/") + 1) : x = "", ha = function (a) {
                try {
                    var b = new XMLHttpRequest;
                    b.open("GET", a, !1);
                    b.send(null);
                    return b.responseText;
                }
                catch (f) {
                    if (a = A(a)) {
                        b =
                            [];
                        for (var c = 0; c < a.length; c++) {
                            var e = a[c];
                            255 < e && (ka && assert(!1, "Character code " + e + " (" + String.fromCharCode(e) + ")  at offset " + c + " not in 0x00-0xFF."), e &= 255);
                            b.push(String.fromCharCode(e));
                        }
                        return b.join("");
                    }
                    throw f;
                }
            }, t && (ja = function (a) { try {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.responseType = "arraybuffer";
                b.send(null);
                return new Uint8Array(b.response);
            }
            catch (c) {
                if (a = A(a))
                    return a;
                throw c;
            } }), ia = function (a, b, c) {
                var e = new XMLHttpRequest;
                e.open("GET", a, !0);
                e.responseType = "arraybuffer";
                e.onload =
                    function () { if (200 == e.status || 0 == e.status && e.response)
                        b(e.response);
                    else {
                        var f = A(a);
                        f ? b(f.buffer) : c();
                    } };
                e.onerror = c;
                e.send(null);
            };
        var la = d.print || console.log.bind(console), D = d.printErr || console.warn.bind(console);
        for (q in h)
            h.hasOwnProperty(q) && (d[q] = h[q]);
        h = null;
        d.thisProgram && (ca = d.thisProgram);
        var ma;
        d.wasmBinary && (ma = d.wasmBinary);
        var noExitRuntime = d.noExitRuntime || !0;
        "object" !== typeof WebAssembly && B("no native wasm support detected");
        var na, oa = !1;
        function assert(a, b) { a || B("Assertion failed: " + b); }
        function pa(a) { var b = d["_" + a]; assert(b, "Cannot call unknown function " + a + ", make sure it is exported"); return b; }
        var qa = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
        function E(a, b, c) { var e = b + c; for (c = b; a[c] && !(c >= e);)
            ++c; if (16 < c - b && a.subarray && qa)
            return qa.decode(a.subarray(b, c)); for (e = ""; b < c;) {
            var f = a[b++];
            if (f & 128) {
                var g = a[b++] & 63;
                if (192 == (f & 224))
                    e += String.fromCharCode((f & 31) << 6 | g);
                else {
                    var k = a[b++] & 63;
                    f = 224 == (f & 240) ? (f & 15) << 12 | g << 6 | k : (f & 7) << 18 | g << 12 | k << 6 | a[b++] & 63;
                    65536 > f ? e += String.fromCharCode(f) : (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
                }
            }
            else
                e += String.fromCharCode(f);
        } return e; }
        function ra(a, b, c, e) { if (!(0 < e))
            return 0; var f = c; e = c + e - 1; for (var g = 0; g < a.length; ++g) {
            var k = a.charCodeAt(g);
            if (55296 <= k && 57343 >= k) {
                var l = a.charCodeAt(++g);
                k = 65536 + ((k & 1023) << 10) | l & 1023;
            }
            if (127 >= k) {
                if (c >= e)
                    break;
                b[c++] = k;
            }
            else {
                if (2047 >= k) {
                    if (c + 1 >= e)
                        break;
                    b[c++] = 192 | k >> 6;
                }
                else {
                    if (65535 >= k) {
                        if (c + 2 >= e)
                            break;
                        b[c++] = 224 | k >> 12;
                    }
                    else {
                        if (c + 3 >= e)
                            break;
                        b[c++] = 240 | k >> 18;
                        b[c++] = 128 | k >> 12 & 63;
                    }
                    b[c++] = 128 | k >> 6 & 63;
                }
                b[c++] = 128 | k & 63;
            }
        } b[c] = 0; return c - f; }
        function sa(a) { for (var b = 0, c = 0; c < a.length; ++c) {
            var e = a.charCodeAt(c);
            55296 <= e && 57343 >= e && (e = 65536 + ((e & 1023) << 10) | a.charCodeAt(++c) & 1023);
            127 >= e ? ++b : b = 2047 >= e ? b + 2 : 65535 >= e ? b + 3 : b + 4;
        } return b; }
        var ta = "undefined" !== typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;
        function ua(a, b) { var c = a >> 1; for (var e = c + b / 2; !(c >= e) && va[c];)
            ++c; c <<= 1; if (32 < c - a && ta)
            return ta.decode(G.subarray(a, c)); c = ""; for (e = 0; !(e >= b / 2); ++e) {
            var f = H[a + 2 * e >> 1];
            if (0 == f)
                break;
            c += String.fromCharCode(f);
        } return c; }
        function wa(a, b, c) { void 0 === c && (c = 2147483647); if (2 > c)
            return 0; c -= 2; var e = b; c = c < 2 * a.length ? c / 2 : a.length; for (var f = 0; f < c; ++f)
            H[b >> 1] = a.charCodeAt(f), b += 2; H[b >> 1] = 0; return b - e; }
        function xa(a) { return 2 * a.length; }
        function ya(a, b) { for (var c = 0, e = ""; !(c >= b / 4);) {
            var f = I[a + 4 * c >> 2];
            if (0 == f)
                break;
            ++c;
            65536 <= f ? (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023)) : e += String.fromCharCode(f);
        } return e; }
        function za(a, b, c) { void 0 === c && (c = 2147483647); if (4 > c)
            return 0; var e = b; c = e + c - 4; for (var f = 0; f < a.length; ++f) {
            var g = a.charCodeAt(f);
            if (55296 <= g && 57343 >= g) {
                var k = a.charCodeAt(++f);
                g = 65536 + ((g & 1023) << 10) | k & 1023;
            }
            I[b >> 2] = g;
            b += 4;
            if (b + 4 > c)
                break;
        } I[b >> 2] = 0; return b - e; }
        function Aa(a) { for (var b = 0, c = 0; c < a.length; ++c) {
            var e = a.charCodeAt(c);
            55296 <= e && 57343 >= e && ++c;
            b += 4;
        } return b; }
        function Ba(a, b) { J.set(a, b); }
        var Ca, J, G, H, va, I, K, Da, Ea, Fa, Ga = [], Ha = [], Ia = [];
        function Ja() { var a = d.preRun.shift(); Ga.unshift(a); }
        var L = 0, Ka = null, La = null;
        function Ma() { L++; d.monitorRunDependencies && d.monitorRunDependencies(L); }
        function Na() { L--; d.monitorRunDependencies && d.monitorRunDependencies(L); if (0 == L && (null !== Ka && (clearInterval(Ka), Ka = null), La)) {
            var a = La;
            La = null;
            a();
        } }
        d.preloadedImages = {};
        d.preloadedAudios = {};
        function B(a) { if (d.onAbort)
            d.onAbort(a); D(a); oa = !0; a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info."); ba(a); throw a; }
        var Oa = "data:application/octet-stream;base64,", M;
        if (!M.startsWith(Oa)) {
            var Pa = M;
            M = d.locateFile ? d.locateFile(Pa, x) : x + Pa;
        }
        function Qa() { var a = M; try {
            if (a == M && ma)
                return new Uint8Array(ma);
            var b = A(a);
            if (b)
                return b;
            if (ja)
                return ja(a);
            throw "both async and sync fetching of the wasm failed";
        }
        catch (c) {
            B(c);
        } }
        function Ra() { if (!ma && (da || t)) {
            if ("function" === typeof fetch && !M.startsWith("file://"))
                return fetch(M, { credentials: "same-origin" }).then(function (a) { if (!a.ok)
                    throw "failed to load wasm binary file at '" + M + "'"; return a.arrayBuffer(); }).catch(function () { return Qa(); });
            if (ia)
                return new Promise(function (a, b) { ia(M, function (c) { a(new Uint8Array(c)); }, b); });
        } return Promise.resolve().then(function () { return Qa(); }); }
        var N, O;
        function Sa(a) { for (; 0 < a.length;) {
            var b = a.shift();
            if ("function" == typeof b)
                b(d);
            else {
                var c = b.qc;
                "number" === typeof c ? void 0 === b.Na ? Fa.get(c)() : Fa.get(c)(b.Na) : c(void 0 === b.Na ? null : b.Na);
            }
        } }
        function Ta(a, b) { for (var c = 0, e = a.length - 1; 0 <= e; e--) {
            var f = a[e];
            "." === f ? a.splice(e, 1) : ".." === f ? (a.splice(e, 1), c++) : c && (a.splice(e, 1), c--);
        } if (b)
            for (; c; c--)
                a.unshift(".."); return a; }
        function Ua(a) { var b = "/" === a.charAt(0), c = "/" === a.substr(-1); (a = Ta(a.split("/").filter(function (e) { return !!e; }), !b).join("/")) || b || (a = "."); a && c && (a += "/"); return (b ? "/" : "") + a; }
        function Va(a) { var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1); a = b[0]; b = b[1]; if (!a && !b)
            return "."; b && (b = b.substr(0, b.length - 1)); return a + b; }
        function P(a) { if ("/" === a)
            return "/"; a = Ua(a); a = a.replace(/\/$/, ""); var b = a.lastIndexOf("/"); return -1 === b ? a : a.substr(b + 1); }
        function Q(a, b) { return Ua(a + "/" + b); }
        function Wa() { if ("object" === typeof crypto && "function" === typeof crypto.getRandomValues) {
            var a = new Uint8Array(1);
            return function () { crypto.getRandomValues(a); return a[0]; };
        } if (ea)
            try {
                var b = require("crypto");
                return function () { return b.randomBytes(1)[0]; };
            }
            catch (c) { } return function () { B("randomDevice"); }; }
        function R() { for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
            b = 0 <= c ? arguments[c] : S.cwd();
            if ("string" !== typeof b)
                throw new TypeError("Arguments to path.resolve must be strings");
            if (!b)
                return "";
            a = b + "/" + a;
            b = "/" === b.charAt(0);
        } a = Ta(a.split("/").filter(function (e) { return !!e; }), !b).join("/"); return (b ? "/" : "") + a || "."; }
        function Xa(a, b) { function c(k) { for (var l = 0; l < k.length && "" === k[l]; l++)
            ; for (var n = k.length - 1; 0 <= n && "" === k[n]; n--)
            ; return l > n ? [] : k.slice(l, n - l + 1); } a = R(a).substr(1); b = R(b).substr(1); a = c(a.split("/")); b = c(b.split("/")); for (var e = Math.min(a.length, b.length), f = e, g = 0; g < e; g++)
            if (a[g] !== b[g]) {
                f = g;
                break;
            } e = []; for (g = f; g < a.length; g++)
            e.push(".."); e = e.concat(b.slice(f)); return e.join("/"); }
        var Ya = [];
        function Za(a, b) { Ya[a] = { input: [], output: [], ua: b }; S.bb(a, $a); }
        var $a = { open: function (a) { var b = Ya[a.node.rdev]; if (!b)
                throw new S.V(43); a.tty = b; a.seekable = !1; }, close: function (a) { a.tty.ua.flush(a.tty); }, flush: function (a) { a.tty.ua.flush(a.tty); }, read: function (a, b, c, e) { if (!a.tty || !a.tty.ua.pb)
                throw new S.V(60); for (var f = 0, g = 0; g < e; g++) {
                try {
                    var k = a.tty.ua.pb(a.tty);
                }
                catch (l) {
                    throw new S.V(29);
                }
                if (void 0 === k && 0 === f)
                    throw new S.V(6);
                if (null === k || void 0 === k)
                    break;
                f++;
                b[c + g] = k;
            } f && (a.node.timestamp = Date.now()); return f; }, write: function (a, b, c, e) {
                if (!a.tty || !a.tty.ua.Za)
                    throw new S.V(60);
                try {
                    for (var f = 0; f < e; f++)
                        a.tty.ua.Za(a.tty, b[c + f]);
                }
                catch (g) {
                    throw new S.V(29);
                }
                e && (a.node.timestamp = Date.now());
                return f;
            } }, bb = { pb: function (a) {
                if (!a.input.length) {
                    var b = null;
                    if (ea) {
                        var c = Buffer.alloc(256), e = 0;
                        try {
                            e = y.readSync(process.stdin.fd, c, 0, 256, null);
                        }
                        catch (f) {
                            if (f.toString().includes("EOF"))
                                e = 0;
                            else
                                throw f;
                        }
                        0 < e ? b = c.slice(0, e).toString("utf-8") : b = null;
                    }
                    else
                        "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline &&
                            (b = readline(), null !== b && (b += "\n"));
                    if (!b)
                        return null;
                    a.input = ab(b);
                }
                return a.input.shift();
            }, Za: function (a, b) { null === b || 10 === b ? (la(E(a.output, 0)), a.output = []) : 0 != b && a.output.push(b); }, flush: function (a) { a.output && 0 < a.output.length && (la(E(a.output, 0)), a.output = []); } }, cb = { Za: function (a, b) { null === b || 10 === b ? (D(E(a.output, 0)), a.output = []) : 0 != b && a.output.push(b); }, flush: function (a) { a.output && 0 < a.output.length && (D(E(a.output, 0)), a.output = []); } }, T = { ka: null, aa: function () { return T.createNode(null, "/", 16895, 0); }, createNode: function (a, b, c, e) {
                if (S.Vb(c) || S.isFIFO(c))
                    throw new S.V(63);
                T.ka || (T.ka = { dir: { node: { ha: T.W.ha, ea: T.W.ea, lookup: T.W.lookup, ma: T.W.ma, rename: T.W.rename, unlink: T.W.unlink, rmdir: T.W.rmdir, readdir: T.W.readdir, symlink: T.W.symlink }, stream: { ia: T.Y.ia } }, file: { node: { ha: T.W.ha, ea: T.W.ea }, stream: { ia: T.Y.ia, read: T.Y.read, write: T.Y.write, wa: T.Y.wa, Ba: T.Y.Ba, Ea: T.Y.Ea } }, link: { node: { ha: T.W.ha, ea: T.W.ea, readlink: T.W.readlink }, stream: {} }, gb: { node: { ha: T.W.ha, ea: T.W.ea }, stream: S.Ib } });
                c = S.createNode(a, b, c, e);
                S.ba(c.mode) ? (c.W =
                    T.ka.dir.node, c.Y = T.ka.dir.stream, c.X = {}) : S.isFile(c.mode) ? (c.W = T.ka.file.node, c.Y = T.ka.file.stream, c.$ = 0, c.X = null) : S.ta(c.mode) ? (c.W = T.ka.link.node, c.Y = T.ka.link.stream) : S.Ga(c.mode) && (c.W = T.ka.gb.node, c.Y = T.ka.gb.stream);
                c.timestamp = Date.now();
                a && (a.X[b] = c, a.timestamp = c.timestamp);
                return c;
            }, rc: function (a) { return a.X ? a.X.subarray ? a.X.subarray(0, a.$) : new Uint8Array(a.X) : new Uint8Array(0); }, lb: function (a, b) {
                var c = a.X ? a.X.length : 0;
                c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)),
                    c = a.X, a.X = new Uint8Array(b), 0 < a.$ && a.X.set(c.subarray(0, a.$), 0));
            }, fc: function (a, b) { if (a.$ != b)
                if (0 == b)
                    a.X = null, a.$ = 0;
                else {
                    var c = a.X;
                    a.X = new Uint8Array(b);
                    c && a.X.set(c.subarray(0, Math.min(b, a.$)));
                    a.$ = b;
                } }, W: { ha: function (a) {
                    var b = {};
                    b.dev = S.Ga(a.mode) ? a.id : 1;
                    b.ino = a.id;
                    b.mode = a.mode;
                    b.nlink = 1;
                    b.uid = 0;
                    b.gid = 0;
                    b.rdev = a.rdev;
                    S.ba(a.mode) ? b.size = 4096 : S.isFile(a.mode) ? b.size = a.$ : S.ta(a.mode) ? b.size = a.link.length : b.size = 0;
                    b.atime = new Date(a.timestamp);
                    b.mtime = new Date(a.timestamp);
                    b.ctime = new Date(a.timestamp);
                    b.Gb = 4096;
                    b.blocks = Math.ceil(b.size / b.Gb);
                    return b;
                }, ea: function (a, b) { void 0 !== b.mode && (a.mode = b.mode); void 0 !== b.timestamp && (a.timestamp = b.timestamp); void 0 !== b.size && T.fc(a, b.size); }, lookup: function () { throw S.Qa[44]; }, ma: function (a, b, c, e) { return T.createNode(a, b, c, e); }, rename: function (a, b, c) { if (S.ba(a.mode)) {
                    try {
                        var e = S.la(b, c);
                    }
                    catch (g) { }
                    if (e)
                        for (var f in e.X)
                            throw new S.V(55);
                } delete a.parent.X[a.name]; a.parent.timestamp = Date.now(); a.name = c; b.X[c] = a; b.timestamp = a.parent.timestamp; a.parent = b; }, unlink: function (a, b) { delete a.X[b]; a.timestamp = Date.now(); }, rmdir: function (a, b) { var c = S.la(a, b), e; for (e in c.X)
                    throw new S.V(55); delete a.X[b]; a.timestamp = Date.now(); }, readdir: function (a) { var b = [".", ".."], c; for (c in a.X)
                    a.X.hasOwnProperty(c) && b.push(c); return b; }, symlink: function (a, b, c) { a = T.createNode(a, b, 41471, 0); a.link = c; return a; }, readlink: function (a) { if (!S.ta(a.mode))
                    throw new S.V(28); return a.link; } }, Y: { read: function (a, b, c, e, f) {
                    var g = a.node.X;
                    if (f >= a.node.$)
                        return 0;
                    a = Math.min(a.node.$ - f, e);
                    if (8 < a && g.subarray)
                        b.set(g.subarray(f, f + a), c);
                    else
                        for (e = 0; e < a; e++)
                            b[c + e] = g[f + e];
                    return a;
                }, write: function (a, b, c, e, f, g) { if (!e)
                    return 0; a = a.node; a.timestamp = Date.now(); if (b.subarray && (!a.X || a.X.subarray)) {
                    if (g)
                        return a.X = b.subarray(c, c + e), a.$ = e;
                    if (0 === a.$ && 0 === f)
                        return a.X = b.slice(c, c + e), a.$ = e;
                    if (f + e <= a.$)
                        return a.X.set(b.subarray(c, c + e), f), e;
                } T.lb(a, f + e); if (a.X.subarray && b.subarray)
                    a.X.set(b.subarray(c, c + e), f);
                else
                    for (g = 0; g < e; g++)
                        a.X[f + g] = b[c + g]; a.$ = Math.max(a.$, f + e); return e; }, ia: function (a, b, c) {
                    1 === c ? b += a.position : 2 === c && S.isFile(a.node.mode) &&
                        (b += a.node.$);
                    if (0 > b)
                        throw new S.V(28);
                    return b;
                }, wa: function (a, b, c) { T.lb(a.node, b + c); a.node.$ = Math.max(a.node.$, b + c); }, Ba: function (a, b, c, e, f, g) { if (0 !== b)
                    throw new S.V(28); if (!S.isFile(a.node.mode))
                    throw new S.V(43); a = a.node.X; if (g & 2 || a.buffer !== Ca) {
                    if (0 < e || e + c < a.length)
                        a.subarray ? a = a.subarray(e, e + c) : a = Array.prototype.slice.call(a, e, e + c);
                    e = !0;
                    c = 65536 * Math.ceil(c / 65536);
                    (g = db(65536, c)) ? (G.fill(0, g, g + c), c = g) : c = 0;
                    if (!c)
                        throw new S.V(48);
                    J.set(a, c);
                }
                else
                    e = !1, c = a.byteOffset; return { yc: c, kc: e }; }, Ea: function (a, b, c, e, f) { if (!S.isFile(a.node.mode))
                    throw new S.V(43); if (f & 2)
                    return 0; T.Y.write(a, b, 0, e, c, !1); return 0; } } };
        function eb(a, b, c) { var e = "al " + a; ia(a, function (f) { assert(f, 'Loading data file "' + a + '" failed (no arrayBuffer).'); b(new Uint8Array(f)); e && Na(); }, function () { if (c)
            c();
        else
            throw 'Loading data file "' + a + '" failed.'; }); e && Ma(); }
        var S = { root: null, Da: [], jb: {}, streams: [], $b: 1, ja: null, ib: "/", Ua: !1, tb: !0, da: {}, yb: { wb: { Bb: 1, Db: 2 } }, V: null, Qa: {}, Rb: null, Ka: 0, Z: function (a, b) {
                a = R(S.cwd(), a);
                b = b || {};
                if (!a)
                    return { path: "", node: null };
                var c = { Pa: !0, ab: 0 }, e;
                for (e in c)
                    void 0 === b[e] && (b[e] = c[e]);
                if (8 < b.ab)
                    throw new S.V(32);
                a = Ta(a.split("/").filter(function (k) { return !!k; }), !1);
                var f = S.root;
                c = "/";
                for (e = 0; e < a.length; e++) {
                    var g = e === a.length - 1;
                    if (g && b.parent)
                        break;
                    f = S.la(f, a[e]);
                    c = Q(c, a[e]);
                    S.pa(f) && (!g || g && b.Pa) && (f = f.Ca.root);
                    if (!g || b.ga)
                        for (g =
                            0; S.ta(f.mode);)
                            if (f = S.readlink(c), c = R(Va(c), f), f = S.Z(c, { ab: b.ab }).node, 40 < g++)
                                throw new S.V(32);
                }
                return { path: c, node: f };
            }, oa: function (a) { for (var b;;) {
                if (S.Ha(a))
                    return a = a.aa.vb, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
                b = b ? a.name + "/" + b : a.name;
                a = a.parent;
            } }, Ta: function (a, b) { for (var c = 0, e = 0; e < b.length; e++)
                c = (c << 5) - c + b.charCodeAt(e) | 0; return (a + c >>> 0) % S.ja.length; }, rb: function (a) { var b = S.Ta(a.parent.id, a.name); a.ra = S.ja[b]; S.ja[b] = a; }, sb: function (a) {
                var b = S.Ta(a.parent.id, a.name);
                if (S.ja[b] === a)
                    S.ja[b] = a.ra;
                else
                    for (b =
                        S.ja[b]; b;) {
                        if (b.ra === a) {
                            b.ra = a.ra;
                            break;
                        }
                        b = b.ra;
                    }
            }, la: function (a, b) { var c = S.Xb(a); if (c)
                throw new S.V(c, a); for (c = S.ja[S.Ta(a.id, b)]; c; c = c.ra) {
                var e = c.name;
                if (c.parent.id === a.id && e === b)
                    return c;
            } return S.lookup(a, b); }, createNode: function (a, b, c, e) { a = new S.zb(a, b, c, e); S.rb(a); return a; }, Oa: function (a) { S.sb(a); }, Ha: function (a) { return a === a.parent; }, pa: function (a) { return !!a.Ca; }, isFile: function (a) { return 32768 === (a & 61440); }, ba: function (a) { return 16384 === (a & 61440); }, ta: function (a) { return 40960 === (a & 61440); }, Ga: function (a) {
                return 8192 ===
                    (a & 61440);
            }, Vb: function (a) { return 24576 === (a & 61440); }, isFIFO: function (a) { return 4096 === (a & 61440); }, isSocket: function (a) { return 49152 === (a & 49152); }, Sb: { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }, Zb: function (a) { var b = S.Sb[a]; if ("undefined" === typeof b)
                throw Error("Unknown file open mode: " + a); return b; }, mb: function (a) { var b = ["r", "w", "rw"][a & 3]; a & 512 && (b += "w"); return b; }, sa: function (a, b) {
                if (S.tb)
                    return 0;
                if (!b.includes("r") || a.mode & 292) {
                    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73))
                        return 2;
                }
                else
                    return 2;
                return 0;
            }, Xb: function (a) { var b = S.sa(a, "x"); return b ? b : a.W.lookup ? 0 : 2; }, Ya: function (a, b) { try {
                return S.la(a, b), 20;
            }
            catch (c) { } return S.sa(a, "wx"); }, Ia: function (a, b, c) { try {
                var e = S.la(a, b);
            }
            catch (f) {
                return f.fa;
            } if (a = S.sa(a, "wx"))
                return a; if (c) {
                if (!S.ba(e.mode))
                    return 54;
                if (S.Ha(e) || S.oa(e) === S.cwd())
                    return 10;
            }
            else if (S.ba(e.mode))
                return 31; return 0; }, Yb: function (a, b) { return a ? S.ta(a.mode) ? 32 : S.ba(a.mode) && ("r" !== S.mb(b) || b & 512) ? 31 : S.sa(a, S.mb(b)) : 44; }, Ab: 4096, ac: function (a, b) {
                b = b || S.Ab;
                for (a = a || 0; a <= b; a++)
                    if (!S.streams[a])
                        return a;
                throw new S.V(33);
            }, ya: function (a) { return S.streams[a]; }, Pb: function (a, b, c) { S.La || (S.La = function () { }, S.La.prototype = { object: { get: function () { return this.node; }, set: function (g) { this.node = g; } } }); var e = new S.La, f; for (f in a)
                e[f] = a[f]; a = e; b = S.ac(b, c); a.fd = b; return S.streams[b] = a; }, Jb: function (a) { S.streams[a] = null; }, Ib: { open: function (a) { a.Y = S.Tb(a.node.rdev).Y; a.Y.open && a.Y.open(a); }, ia: function () { throw new S.V(70); } }, Xa: function (a) { return a >> 8; }, uc: function (a) { return a & 255; }, qa: function (a, b) { return a << 8 | b; }, bb: function (a, b) { S.jb[a] = { Y: b }; }, Tb: function (a) { return S.jb[a]; }, ob: function (a) { var b = []; for (a = [a]; a.length;) {
                var c = a.pop();
                b.push(c);
                a.push.apply(a, c.Da);
            } return b; }, xb: function (a, b) {
                function c(k) { S.Ka--; return b(k); }
                function e(k) { if (k) {
                    if (!e.Qb)
                        return e.Qb = !0, c(k);
                }
                else
                    ++g >= f.length && c(null); }
                "function" === typeof a && (b = a, a = !1);
                S.Ka++;
                1 < S.Ka && D("warning: " + S.Ka + " FS.syncfs operations in flight at once, probably just doing extra work");
                var f = S.ob(S.root.aa), g = 0;
                f.forEach(function (k) {
                    if (!k.type.xb)
                        return e(null);
                    k.type.xb(k, a, e);
                });
            }, aa: function (a, b, c) { var e = "/" === c, f = !c; if (e && S.root)
                throw new S.V(10); if (!e && !f) {
                var g = S.Z(c, { Pa: !1 });
                c = g.path;
                g = g.node;
                if (S.pa(g))
                    throw new S.V(10);
                if (!S.ba(g.mode))
                    throw new S.V(54);
            } b = { type: a, xc: b, vb: c, Da: [] }; a = a.aa(b); a.aa = b; b.root = a; e ? S.root = a : g && (g.Ca = b, g.aa && g.aa.Da.push(b)); return a; }, Bc: function (a) {
                a = S.Z(a, { Pa: !1 });
                if (!S.pa(a.node))
                    throw new S.V(28);
                a = a.node;
                var b = a.Ca, c = S.ob(b);
                Object.keys(S.ja).forEach(function (e) { for (e = S.ja[e]; e;) {
                    var f = e.ra;
                    c.includes(e.aa) && S.Oa(e);
                    e = f;
                } });
                a.Ca =
                    null;
                a.aa.Da.splice(a.aa.Da.indexOf(b), 1);
            }, lookup: function (a, b) { return a.W.lookup(a, b); }, ma: function (a, b, c) { var e = S.Z(a, { parent: !0 }).node; a = P(a); if (!a || "." === a || ".." === a)
                throw new S.V(28); var f = S.Ya(e, a); if (f)
                throw new S.V(f); if (!e.W.ma)
                throw new S.V(63); return e.W.ma(e, a, b, c); }, create: function (a, b) { return S.ma(a, (void 0 !== b ? b : 438) & 4095 | 32768, 0); }, mkdir: function (a, b) { return S.ma(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0); }, vc: function (a, b) {
                a = a.split("/");
                for (var c = "", e = 0; e < a.length; ++e)
                    if (a[e]) {
                        c += "/" + a[e];
                        try {
                            S.mkdir(c, b);
                        }
                        catch (f) {
                            if (20 != f.fa)
                                throw f;
                        }
                    }
            }, Ja: function (a, b, c) { "undefined" === typeof c && (c = b, b = 438); return S.ma(a, b | 8192, c); }, symlink: function (a, b) { if (!R(a))
                throw new S.V(44); var c = S.Z(b, { parent: !0 }).node; if (!c)
                throw new S.V(44); b = P(b); var e = S.Ya(c, b); if (e)
                throw new S.V(e); if (!c.W.symlink)
                throw new S.V(63); return c.W.symlink(c, b, a); }, rename: function (a, b) {
                var c = Va(a), e = Va(b), f = P(a), g = P(b);
                var k = S.Z(a, { parent: !0 });
                var l = k.node;
                k = S.Z(b, { parent: !0 });
                k = k.node;
                if (!l || !k)
                    throw new S.V(44);
                if (l.aa !== k.aa)
                    throw new S.V(75);
                var n = S.la(l, f);
                e = Xa(a, e);
                if ("." !== e.charAt(0))
                    throw new S.V(28);
                e = Xa(b, c);
                if ("." !== e.charAt(0))
                    throw new S.V(55);
                try {
                    var m = S.la(k, g);
                }
                catch (p) { }
                if (n !== m) {
                    c = S.ba(n.mode);
                    if (f = S.Ia(l, f, c))
                        throw new S.V(f);
                    if (f = m ? S.Ia(k, g, c) : S.Ya(k, g))
                        throw new S.V(f);
                    if (!l.W.rename)
                        throw new S.V(63);
                    if (S.pa(n) || m && S.pa(m))
                        throw new S.V(10);
                    if (k !== l && (f = S.sa(l, "w")))
                        throw new S.V(f);
                    try {
                        S.da.willMovePath && S.da.willMovePath(a, b);
                    }
                    catch (p) {
                        D("FS.trackingDelegate['willMovePath']('" + a + "', '" + b + "') threw an exception: " + p.message);
                    }
                    S.sb(n);
                    try {
                        l.W.rename(n, k, g);
                    }
                    catch (p) {
                        throw p;
                    }
                    finally {
                        S.rb(n);
                    }
                    try {
                        if (S.da.onMovePath)
                            S.da.onMovePath(a, b);
                    }
                    catch (p) {
                        D("FS.trackingDelegate['onMovePath']('" + a + "', '" + b + "') threw an exception: " + p.message);
                    }
                }
            }, rmdir: function (a) {
                var b = S.Z(a, { parent: !0 }).node, c = P(a), e = S.la(b, c), f = S.Ia(b, c, !0);
                if (f)
                    throw new S.V(f);
                if (!b.W.rmdir)
                    throw new S.V(63);
                if (S.pa(e))
                    throw new S.V(10);
                try {
                    S.da.willDeletePath && S.da.willDeletePath(a);
                }
                catch (g) {
                    D("FS.trackingDelegate['willDeletePath']('" + a + "') threw an exception: " + g.message);
                }
                b.W.rmdir(b, c);
                S.Oa(e);
                try {
                    if (S.da.onDeletePath)
                        S.da.onDeletePath(a);
                }
                catch (g) {
                    D("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + g.message);
                }
            }, readdir: function (a) { a = S.Z(a, { ga: !0 }).node; if (!a.W.readdir)
                throw new S.V(54); return a.W.readdir(a); }, unlink: function (a) {
                var b = S.Z(a, { parent: !0 }).node, c = P(a), e = S.la(b, c), f = S.Ia(b, c, !1);
                if (f)
                    throw new S.V(f);
                if (!b.W.unlink)
                    throw new S.V(63);
                if (S.pa(e))
                    throw new S.V(10);
                try {
                    S.da.willDeletePath && S.da.willDeletePath(a);
                }
                catch (g) {
                    D("FS.trackingDelegate['willDeletePath']('" +
                        a + "') threw an exception: " + g.message);
                }
                b.W.unlink(b, c);
                S.Oa(e);
                try {
                    if (S.da.onDeletePath)
                        S.da.onDeletePath(a);
                }
                catch (g) {
                    D("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + g.message);
                }
            }, readlink: function (a) { a = S.Z(a).node; if (!a)
                throw new S.V(44); if (!a.W.readlink)
                throw new S.V(28); return R(S.oa(a.parent), a.W.readlink(a)); }, stat: function (a, b) { a = S.Z(a, { ga: !b }).node; if (!a)
                throw new S.V(44); if (!a.W.ha)
                throw new S.V(63); return a.W.ha(a); }, lstat: function (a) { return S.stat(a, !0); }, chmod: function (a, b, c) { a = "string" === typeof a ? S.Z(a, { ga: !c }).node : a; if (!a.W.ea)
                throw new S.V(63); a.W.ea(a, { mode: b & 4095 | a.mode & -4096, timestamp: Date.now() }); }, lchmod: function (a, b) { S.chmod(a, b, !0); }, fchmod: function (a, b) { a = S.ya(a); if (!a)
                throw new S.V(8); S.chmod(a.node, b); }, chown: function (a, b, c, e) { a = "string" === typeof a ? S.Z(a, { ga: !e }).node : a; if (!a.W.ea)
                throw new S.V(63); a.W.ea(a, { timestamp: Date.now() }); }, lchown: function (a, b, c) { S.chown(a, b, c, !0); }, fchown: function (a, b, c) { a = S.ya(a); if (!a)
                throw new S.V(8); S.chown(a.node, b, c); }, truncate: function (a, b) { if (0 > b)
                throw new S.V(28); a = "string" === typeof a ? S.Z(a, { ga: !0 }).node : a; if (!a.W.ea)
                throw new S.V(63); if (S.ba(a.mode))
                throw new S.V(31); if (!S.isFile(a.mode))
                throw new S.V(28); var c = S.sa(a, "w"); if (c)
                throw new S.V(c); a.W.ea(a, { size: b, timestamp: Date.now() }); }, pc: function (a, b) { a = S.ya(a); if (!a)
                throw new S.V(8); if (0 === (a.flags & 2097155))
                throw new S.V(28); S.truncate(a.node, b); }, Cc: function (a, b, c) { a = S.Z(a, { ga: !0 }).node; a.W.ea(a, { timestamp: Math.max(b, c) }); }, open: function (a, b, c, e, f) {
                if ("" === a)
                    throw new S.V(44);
                b = "string" === typeof b ? S.Zb(b) : b;
                c = b & 64 ? ("undefined" === typeof c ? 438 : c) & 4095 | 32768 : 0;
                if ("object" === typeof a)
                    var g = a;
                else {
                    a = Ua(a);
                    try {
                        g = S.Z(a, { ga: !(b & 131072) }).node;
                    }
                    catch (l) { }
                }
                var k = !1;
                if (b & 64)
                    if (g) {
                        if (b & 128)
                            throw new S.V(20);
                    }
                    else
                        g = S.ma(a, c, 0), k = !0;
                if (!g)
                    throw new S.V(44);
                S.Ga(g.mode) && (b &= -513);
                if (b & 65536 && !S.ba(g.mode))
                    throw new S.V(54);
                if (!k && (c = S.Yb(g, b)))
                    throw new S.V(c);
                b & 512 && S.truncate(g, 0);
                b &= -131713;
                e = S.Pb({ node: g, path: S.oa(g), flags: b, seekable: !0, position: 0, Y: g.Y, jc: [], error: !1 }, e, f);
                e.Y.open &&
                    e.Y.open(e);
                !d.logReadFiles || b & 1 || (S.$a || (S.$a = {}), a in S.$a || (S.$a[a] = 1, D("FS.trackingDelegate error on read file: " + a)));
                try {
                    S.da.onOpenFile && (f = 0, 1 !== (b & 2097155) && (f |= S.yb.wb.Bb), 0 !== (b & 2097155) && (f |= S.yb.wb.Db), S.da.onOpenFile(a, f));
                }
                catch (l) {
                    D("FS.trackingDelegate['onOpenFile']('" + a + "', flags) threw an exception: " + l.message);
                }
                return e;
            }, close: function (a) { if (S.Aa(a))
                throw new S.V(8); a.Sa && (a.Sa = null); try {
                a.Y.close && a.Y.close(a);
            }
            catch (b) {
                throw b;
            }
            finally {
                S.Jb(a.fd);
            } a.fd = null; }, Aa: function (a) {
                return null ===
                    a.fd;
            }, ia: function (a, b, c) { if (S.Aa(a))
                throw new S.V(8); if (!a.seekable || !a.Y.ia)
                throw new S.V(70); if (0 != c && 1 != c && 2 != c)
                throw new S.V(28); a.position = a.Y.ia(a, b, c); a.jc = []; return a.position; }, read: function (a, b, c, e, f) {
                if (0 > e || 0 > f)
                    throw new S.V(28);
                if (S.Aa(a))
                    throw new S.V(8);
                if (1 === (a.flags & 2097155))
                    throw new S.V(8);
                if (S.ba(a.node.mode))
                    throw new S.V(31);
                if (!a.Y.read)
                    throw new S.V(28);
                var g = "undefined" !== typeof f;
                if (!g)
                    f = a.position;
                else if (!a.seekable)
                    throw new S.V(70);
                b = a.Y.read(a, b, c, e, f);
                g || (a.position +=
                    b);
                return b;
            }, write: function (a, b, c, e, f, g) {
                if (0 > e || 0 > f)
                    throw new S.V(28);
                if (S.Aa(a))
                    throw new S.V(8);
                if (0 === (a.flags & 2097155))
                    throw new S.V(8);
                if (S.ba(a.node.mode))
                    throw new S.V(31);
                if (!a.Y.write)
                    throw new S.V(28);
                a.seekable && a.flags & 1024 && S.ia(a, 0, 2);
                var k = "undefined" !== typeof f;
                if (!k)
                    f = a.position;
                else if (!a.seekable)
                    throw new S.V(70);
                b = a.Y.write(a, b, c, e, f, g);
                k || (a.position += b);
                try {
                    if (a.path && S.da.onWriteToFile)
                        S.da.onWriteToFile(a.path);
                }
                catch (l) {
                    D("FS.trackingDelegate['onWriteToFile']('" + a.path + "') threw an exception: " +
                        l.message);
                }
                return b;
            }, wa: function (a, b, c) { if (S.Aa(a))
                throw new S.V(8); if (0 > b || 0 >= c)
                throw new S.V(28); if (0 === (a.flags & 2097155))
                throw new S.V(8); if (!S.isFile(a.node.mode) && !S.ba(a.node.mode))
                throw new S.V(43); if (!a.Y.wa)
                throw new S.V(138); a.Y.wa(a, b, c); }, Ba: function (a, b, c, e, f, g) { if (0 !== (f & 2) && 0 === (g & 2) && 2 !== (a.flags & 2097155))
                throw new S.V(2); if (1 === (a.flags & 2097155))
                throw new S.V(2); if (!a.Y.Ba)
                throw new S.V(43); return a.Y.Ba(a, b, c, e, f, g); }, Ea: function (a, b, c, e, f) { return a && a.Y.Ea ? a.Y.Ea(a, b, c, e, f) : 0; }, wc: function () { return 0; },
            ub: function (a, b, c) { if (!a.Y.ub)
                throw new S.V(59); return a.Y.ub(a, b, c); }, readFile: function (a, b) { b = b || {}; b.flags = b.flags || 0; b.encoding = b.encoding || "binary"; if ("utf8" !== b.encoding && "binary" !== b.encoding)
                throw Error('Invalid encoding type "' + b.encoding + '"'); var c, e = S.open(a, b.flags); a = S.stat(a).size; var f = new Uint8Array(a); S.read(e, f, 0, a, 0); "utf8" === b.encoding ? c = E(f, 0) : "binary" === b.encoding && (c = f); S.close(e); return c; }, writeFile: function (a, b, c) {
                c = c || {};
                c.flags = c.flags || 577;
                a = S.open(a, c.flags, c.mode);
                if ("string" ===
                    typeof b) {
                    var e = new Uint8Array(sa(b) + 1);
                    b = ra(b, e, 0, e.length);
                    S.write(a, e, 0, b, void 0, c.Hb);
                }
                else if (ArrayBuffer.isView(b))
                    S.write(a, b, 0, b.byteLength, void 0, c.Hb);
                else
                    throw Error("Unsupported data type");
                S.close(a);
            }, cwd: function () { return S.ib; }, chdir: function (a) { a = S.Z(a, { ga: !0 }); if (null === a.node)
                throw new S.V(44); if (!S.ba(a.node.mode))
                throw new S.V(54); var b = S.sa(a.node, "x"); if (b)
                throw new S.V(b); S.ib = a.path; }, Lb: function () { S.mkdir("/tmp"); S.mkdir("/home"); S.mkdir("/home/web_user"); }, Kb: function () {
                S.mkdir("/dev");
                S.bb(S.qa(1, 3), { read: function () { return 0; }, write: function (b, c, e, f) { return f; } });
                S.Ja("/dev/null", S.qa(1, 3));
                Za(S.qa(5, 0), bb);
                Za(S.qa(6, 0), cb);
                S.Ja("/dev/tty", S.qa(5, 0));
                S.Ja("/dev/tty1", S.qa(6, 0));
                var a = Wa();
                S.na("/dev", "random", a);
                S.na("/dev", "urandom", a);
                S.mkdir("/dev/shm");
                S.mkdir("/dev/shm/tmp");
            }, Nb: function () {
                S.mkdir("/proc");
                var a = S.mkdir("/proc/self");
                S.mkdir("/proc/self/fd");
                S.aa({ aa: function () {
                        var b = S.createNode(a, "fd", 16895, 73);
                        b.W = { lookup: function (c, e) {
                                var f = S.ya(+e);
                                if (!f)
                                    throw new S.V(8);
                                c = { parent: null, aa: { vb: "fake" }, W: { readlink: function () { return f.path; } } };
                                return c.parent = c;
                            } };
                        return b;
                    } }, {}, "/proc/self/fd");
            }, Ob: function () { d.stdin ? S.na("/dev", "stdin", d.stdin) : S.symlink("/dev/tty", "/dev/stdin"); d.stdout ? S.na("/dev", "stdout", null, d.stdout) : S.symlink("/dev/tty", "/dev/stdout"); d.stderr ? S.na("/dev", "stderr", null, d.stderr) : S.symlink("/dev/tty1", "/dev/stderr"); S.open("/dev/stdin", 0); S.open("/dev/stdout", 1); S.open("/dev/stderr", 1); }, kb: function () {
                S.V || (S.V = function (a, b) {
                    this.node = b;
                    this.hc =
                        function (c) { this.fa = c; };
                    this.hc(a);
                    this.message = "FS error";
                }, S.V.prototype = Error(), S.V.prototype.constructor = S.V, [44].forEach(function (a) { S.Qa[a] = new S.V(a); S.Qa[a].stack = "<generic error, no stack>"; }));
            }, ic: function () { S.kb(); S.ja = Array(4096); S.aa(T, {}, "/"); S.Lb(); S.Kb(); S.Nb(); S.Rb = { MEMFS: T }; }, za: function (a, b, c) { S.za.Ua = !0; S.kb(); d.stdin = a || d.stdin; d.stdout = b || d.stdout; d.stderr = c || d.stderr; S.Ob(); }, zc: function () { S.za.Ua = !1; var a = d._fflush; a && a(0); for (a = 0; a < S.streams.length; a++) {
                var b = S.streams[a];
                b && S.close(b);
            } },
            Ra: function (a, b) { var c = 0; a && (c |= 365); b && (c |= 146); return c; }, oc: function (a, b) { a = S.Ma(a, b); return a.exists ? a.object : null; }, Ma: function (a, b) { try {
                var c = S.Z(a, { ga: !b });
                a = c.path;
            }
            catch (f) { } var e = { Ha: !1, exists: !1, error: 0, name: null, path: null, object: null, bc: !1, dc: null, cc: null }; try {
                c = S.Z(a, { parent: !0 }), e.bc = !0, e.dc = c.path, e.cc = c.node, e.name = P(a), c = S.Z(a, { ga: !b }), e.exists = !0, e.path = c.path, e.object = c.node, e.name = c.node.name, e.Ha = "/" === c.path;
            }
            catch (f) {
                e.error = f.fa;
            } return e; }, mc: function (a, b) {
                a = "string" === typeof a ?
                    a : S.oa(a);
                for (b = b.split("/").reverse(); b.length;) {
                    var c = b.pop();
                    if (c) {
                        var e = Q(a, c);
                        try {
                            S.mkdir(e);
                        }
                        catch (f) { }
                        a = e;
                    }
                }
                return e;
            }, Mb: function (a, b, c, e, f) { a = Q("string" === typeof a ? a : S.oa(a), b); return S.create(a, S.Ra(e, f)); }, hb: function (a, b, c, e, f, g) { a = b ? Q("string" === typeof a ? a : S.oa(a), b) : a; e = S.Ra(e, f); f = S.create(a, e); if (c) {
                if ("string" === typeof c) {
                    a = Array(c.length);
                    b = 0;
                    for (var k = c.length; b < k; ++b)
                        a[b] = c.charCodeAt(b);
                    c = a;
                }
                S.chmod(f, e | 146);
                a = S.open(f, 577);
                S.write(a, c, 0, c.length, 0, g);
                S.close(a);
                S.chmod(f, e);
            } return f; },
            na: function (a, b, c, e) {
                a = Q("string" === typeof a ? a : S.oa(a), b);
                b = S.Ra(!!c, !!e);
                S.na.Xa || (S.na.Xa = 64);
                var f = S.qa(S.na.Xa++, 0);
                S.bb(f, { open: function (g) { g.seekable = !1; }, close: function () { e && e.buffer && e.buffer.length && e(10); }, read: function (g, k, l, n) { for (var m = 0, p = 0; p < n; p++) {
                        try {
                            var r = c();
                        }
                        catch (u) {
                            throw new S.V(29);
                        }
                        if (void 0 === r && 0 === m)
                            throw new S.V(6);
                        if (null === r || void 0 === r)
                            break;
                        m++;
                        k[l + p] = r;
                    } m && (g.node.timestamp = Date.now()); return m; }, write: function (g, k, l, n) {
                        for (var m = 0; m < n; m++)
                            try {
                                e(k[l + m]);
                            }
                            catch (p) {
                                throw new S.V(29);
                            }
                        n && (g.node.timestamp = Date.now());
                        return m;
                    } });
                return S.Ja(a, b, f);
            }, nb: function (a) {
                if (a.Va || a.Wb || a.link || a.X)
                    return !0;
                if ("undefined" !== typeof XMLHttpRequest)
                    throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
                if (ha)
                    try {
                        a.X = ab(ha(a.url)), a.$ = a.X.length;
                    }
                    catch (b) {
                        throw new S.V(29);
                    }
                else
                    throw Error("Cannot load without read() or XMLHttpRequest.");
            }, lc: function (a, b, c, e, f) {
                function g() { this.Wa = !1; this.Fa = []; }
                g.prototype.get = function (m) { if (!(m > this.length - 1 || 0 > m)) {
                    var p = m % this.chunkSize;
                    return this.qb(m / this.chunkSize | 0)[p];
                } };
                g.prototype.Cb = function (m) { this.qb = m; };
                g.prototype.fb = function () {
                    var m = new XMLHttpRequest;
                    m.open("HEAD", c, !1);
                    m.send(null);
                    if (!(200 <= m.status && 300 > m.status || 304 === m.status))
                        throw Error("Couldn't load " + c + ". Status: " + m.status);
                    var p = Number(m.getResponseHeader("Content-length")), r, u = (r = m.getResponseHeader("Accept-Ranges")) &&
                        "bytes" === r;
                    m = (r = m.getResponseHeader("Content-Encoding")) && "gzip" === r;
                    var w = 1048576;
                    u || (w = p);
                    var v = this;
                    v.Cb(function (F) {
                        var fa = F * w, X = (F + 1) * w - 1;
                        X = Math.min(X, p - 1);
                        if ("undefined" === typeof v.Fa[F]) {
                            var Fb = v.Fa;
                            if (fa > X)
                                throw Error("invalid range (" + fa + ", " + X + ") or no bytes requested!");
                            if (X > p - 1)
                                throw Error("only " + p + " bytes available! programmer error!");
                            var C = new XMLHttpRequest;
                            C.open("GET", c, !1);
                            p !== w && C.setRequestHeader("Range", "bytes=" + fa + "-" + X);
                            "undefined" != typeof Uint8Array && (C.responseType = "arraybuffer");
                            C.overrideMimeType && C.overrideMimeType("text/plain; charset=x-user-defined");
                            C.send(null);
                            if (!(200 <= C.status && 300 > C.status || 304 === C.status))
                                throw Error("Couldn't load " + c + ". Status: " + C.status);
                            fa = void 0 !== C.response ? new Uint8Array(C.response || []) : ab(C.responseText || "");
                            Fb[F] = fa;
                        }
                        if ("undefined" === typeof v.Fa[F])
                            throw Error("doXHR failed!");
                        return v.Fa[F];
                    });
                    if (m || !p)
                        w = p = 1, w = p = this.qb(0).length, la("LazyFiles on gzip forces download of the whole file when length is accessed");
                    this.Fb = p;
                    this.Eb = w;
                    this.Wa =
                        !0;
                };
                if ("undefined" !== typeof XMLHttpRequest) {
                    if (!t)
                        throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                    var k = new g;
                    Object.defineProperties(k, { length: { get: function () { this.Wa || this.fb(); return this.Fb; } }, chunkSize: { get: function () { this.Wa || this.fb(); return this.Eb; } } });
                    k = { Va: !1, X: k };
                }
                else
                    k = { Va: !1, url: c };
                var l = S.Mb(a, b, k, e, f);
                k.X ? l.X = k.X : k.url && (l.X = null, l.url = k.url);
                Object.defineProperties(l, { $: { get: function () { return this.X.length; } } });
                var n = {};
                Object.keys(l.Y).forEach(function (m) { var p = l.Y[m]; n[m] = function () { S.nb(l); return p.apply(null, arguments); }; });
                n.read = function (m, p, r, u, w) { S.nb(l); m = m.node.X; if (w >= m.length)
                    return 0; u = Math.min(m.length - w, u); if (m.slice)
                    for (var v = 0; v < u; v++)
                        p[r + v] = m[w + v];
                else
                    for (v = 0; v < u; v++)
                        p[r + v] = m.get(w + v); return u; };
                l.Y = n;
                return l;
            }, nc: function (a, b, c, e, f, g, k, l, n, m) {
                function p(u) {
                    function w(F) { m && m(); l || S.hb(a, b, F, e, f, n); g && g(); Na(); }
                    var v = !1;
                    d.preloadPlugins.forEach(function (F) {
                        !v && F.canHandle(r) && (F.handle(u, r, w, function () { k && k(); Na(); }), v = !0);
                    });
                    v || w(u);
                }
                fb.za();
                var r = b ? R(Q(a, b)) : a;
                Ma();
                "string" == typeof c ? eb(c, function (u) { p(u); }, k) : p(c);
            }, indexedDB: function () { return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB; }, cb: function () { return "EM_FS_" + window.location.pathname; }, eb: 20, va: "FILE_DATA", Ac: function (a, b, c) {
                b = b || function () { };
                c = c || function () { };
                var e = S.indexedDB();
                try {
                    var f = e.open(S.cb(), S.eb);
                }
                catch (g) {
                    return c(g);
                }
                f.onupgradeneeded = function () { la("creating db"); f.result.createObjectStore(S.va); };
                f.onsuccess = function () { var g = f.result.transaction([S.va], "readwrite"), k = g.objectStore(S.va), l = 0, n = 0, m = a.length; a.forEach(function (p) { p = k.put(S.Ma(p).object.X, p); p.onsuccess = function () { l++; l + n == m && (0 == n ? b() : c()); }; p.onerror = function () { n++; l + n == m && (0 == n ? b() : c()); }; }); g.onerror = c; };
                f.onerror = c;
            }, tc: function (a, b, c) {
                b = b || function () { };
                c = c || function () { };
                var e = S.indexedDB();
                try {
                    var f = e.open(S.cb(), S.eb);
                }
                catch (g) {
                    return c(g);
                }
                f.onupgradeneeded = c;
                f.onsuccess = function () {
                    var g = f.result;
                    try {
                        var k = g.transaction([S.va], "readonly");
                    }
                    catch (r) {
                        c(r);
                        return;
                    }
                    var l = k.objectStore(S.va), n = 0, m = 0, p = a.length;
                    a.forEach(function (r) { var u = l.get(r); u.onsuccess = function () { S.Ma(r).exists && S.unlink(r); S.hb(Va(r), P(r), u.result, !0, !0, !0); n++; n + m == p && (0 == m ? b() : c()); }; u.onerror = function () { m++; n + m == p && (0 == m ? b() : c()); }; });
                    k.onerror = c;
                };
                f.onerror = c;
            } }, gb = void 0;
        function hb() { gb += 4; return I[gb - 4 >> 2]; }
        function U(a) { a = S.ya(a); if (!a)
            throw new S.V(8); return a; }
        function ib(a) { switch (a) {
            case 1: return 0;
            case 2: return 1;
            case 4: return 2;
            case 8: return 3;
            default: throw new TypeError("Unknown type size: " + a);
        } }
        var jb = void 0;
        function V(a) { for (var b = ""; G[a];)
            b += jb[G[a++]]; return b; }
        var kb = {}, lb = {}, mb = {};
        function nb(a, b) { if (void 0 === a)
            a = "_unknown";
        else {
            a = a.replace(/[^a-zA-Z0-9_]/g, "$");
            var c = a.charCodeAt(0);
            a = 48 <= c && 57 >= c ? "_" + a : a;
        } return (new Function("body", "return function " + a + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'))(b); }
        function ob(a) { var b = Error, c = nb(a, function (e) { this.name = a; this.message = e; e = Error(e).stack; void 0 !== e && (this.stack = this.toString() + "\n" + e.replace(/^Error(:[^\n]*)?\n/, "")); }); c.prototype = Object.create(b.prototype); c.prototype.constructor = c; c.prototype.toString = function () { return void 0 === this.message ? this.name : this.name + ": " + this.message; }; return c; }
        var pb = void 0;
        function qb(a) { throw new pb(a); }
        function W(a, b, c) { c = c || {}; if (!("argPackAdvance" in b))
            throw new TypeError("registerType registeredInstance requires argPackAdvance"); var e = b.name; a || qb('type "' + e + '" must have a positive integer typeid pointer'); if (lb.hasOwnProperty(a)) {
            if (c.Ub)
                return;
            qb("Cannot register type '" + e + "' twice");
        } lb[a] = b; delete mb[a]; kb.hasOwnProperty(a) && (b = kb[a], delete kb[a], b.forEach(function (f) { f(); })); }
        var rb = [], Y = [{}, { value: void 0 }, { value: null }, { value: !0 }, { value: !1 }];
        function sb(a) { switch (a) {
            case void 0: return 1;
            case null: return 2;
            case !0: return 3;
            case !1: return 4;
            default:
                var b = rb.length ? rb.pop() : Y.length;
                Y[b] = { ec: 1, value: a };
                return b;
        } }
        function tb(a) { return this.fromWireType(K[a >> 2]); }
        function ub(a) { if (null === a)
            return "null"; var b = typeof a; return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a; }
        function vb(a, b) { switch (b) {
            case 2: return function (c) { return this.fromWireType(Da[c >> 2]); };
            case 3: return function (c) { return this.fromWireType(Ea[c >> 3]); };
            default: throw new TypeError("Unknown float type: " + a);
        } }
        function wb(a, b, c) { switch (b) {
            case 0: return c ? function (e) { return J[e]; } : function (e) { return G[e]; };
            case 1: return c ? function (e) { return H[e >> 1]; } : function (e) { return va[e >> 1]; };
            case 2: return c ? function (e) { return I[e >> 2]; } : function (e) { return K[e >> 2]; };
            default: throw new TypeError("Unknown integer type: " + a);
        } }
        function xb() { void 0 === xb.start && (xb.start = Date.now()); return 1E3 * (Date.now() - xb.start) | 0; }
        var yb = {};
        function zb() { if (!Ab) {
            var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: ca || "./this.program" }, b;
            for (b in yb)
                void 0 === yb[b] ? delete a[b] : a[b] = yb[b];
            var c = [];
            for (b in a)
                c.push(b + "=" + a[b]);
            Ab = c;
        } return Ab; }
        var Ab;
        function Bb(a, b, c, e) { a || (a = this); this.parent = a; this.aa = a.aa; this.Ca = null; this.id = S.$b++; this.name = b; this.mode = c; this.W = {}; this.Y = {}; this.rdev = e; }
        Object.defineProperties(Bb.prototype, { read: { get: function () { return 365 === (this.mode & 365); }, set: function (a) { a ? this.mode |= 365 : this.mode &= -366; } }, write: { get: function () { return 146 === (this.mode & 146); }, set: function (a) { a ? this.mode |= 146 : this.mode &= -147; } }, Wb: { get: function () { return S.ba(this.mode); } }, Va: { get: function () { return S.Ga(this.mode); } } });
        S.zb = Bb;
        S.ic();
        for (var fb, Cb = Array(256), Db = 0; 256 > Db; ++Db)
            Cb[Db] = String.fromCharCode(Db);
        jb = Cb;
        pb = d.BindingError = ob("BindingError");
        d.InternalError = ob("InternalError");
        d.count_emval_handles = function () { for (var a = 0, b = 5; b < Y.length; ++b)
            void 0 !== Y[b] && ++a; return a; };
        d.get_first_emval = function () { for (var a = 5; a < Y.length; ++a)
            if (void 0 !== Y[a])
                return Y[a]; return null; };
        var ka = !1;
        function ab(a) { var b = Array(sa(a) + 1); a = ra(a, b, 0, b.length); b.length = a; return b; }
        var Eb = "function" === typeof atob ? atob : function (a) {
            var b = "", c = 0;
            a = a.replace(/[^A-Za-z0-9\+\/=]/g, "");
            do {
                var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));
                var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));
                var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));
                var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));
                e = e << 2 | f >> 4;
                f = (f & 15) << 4 | g >> 2;
                var l = (g & 3) << 6 | k;
                b += String.fromCharCode(e);
                64 !== g && (b += String.fromCharCode(f));
                64 !== k && (b += String.fromCharCode(l));
            } while (c < a.length);
            return b;
        };
        function A(a) { if (a.startsWith(Oa)) {
            a = a.slice(Oa.length);
            if ("boolean" === typeof ea && ea) {
                var b = Buffer.from(a, "base64");
                b = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
            }
            else
                try {
                    var c = Eb(a), e = new Uint8Array(c.length);
                    for (a = 0; a < c.length; ++a)
                        e[a] = c.charCodeAt(a);
                    b = e;
                }
                catch (f) {
                    throw Error("Converting base64 string to bytes failed.");
                }
            return b;
        } }
        var Ib = { p: function (a, b, c) { gb = c; try {
                var e = U(a);
                switch (b) {
                    case 0:
                        var f = hb();
                        return 0 > f ? -28 : S.open(e.path, e.flags, 0, f).fd;
                    case 1:
                    case 2: return 0;
                    case 3: return e.flags;
                    case 4: return f = hb(), e.flags |= f, 0;
                    case 12: return f = hb(), H[f + 0 >> 1] = 2, 0;
                    case 13:
                    case 14: return 0;
                    case 16:
                    case 8: return -28;
                    case 9: return I[Gb() >> 2] = 28, -1;
                    default: return -28;
                }
            }
            catch (g) {
                return "undefined" !== typeof S && g instanceof S.V || B(g), -g.fa;
            } }, q: function (a, b, c) {
                gb = c;
                try {
                    var e = a ? E(G, a, void 0) : "", f = c ? hb() : 0;
                    return S.open(e, b, f).fd;
                }
                catch (g) {
                    return "undefined" !==
                        typeof S && g instanceof S.V || B(g), -g.fa;
                }
            }, l: function () { }, w: function (a, b, c, e, f) { var g = ib(c); b = V(b); W(a, { name: b, fromWireType: function (k) { return !!k; }, toWireType: function (k, l) { return l ? e : f; }, argPackAdvance: 8, readValueFromPointer: function (k) { if (1 === c)
                    var l = J;
                else if (2 === c)
                    l = H;
                else if (4 === c)
                    l = I;
                else
                    throw new TypeError("Unknown boolean type size: " + b); return this.fromWireType(l[k >> g]); }, xa: null }); }, j: function (a, b) {
                b = V(b);
                W(a, { name: b, fromWireType: function (c) {
                        var e = Y[c].value;
                        4 < c && 0 === --Y[c].ec && (Y[c] = void 0,
                            rb.push(c));
                        return e;
                    }, toWireType: function (c, e) { return sb(e); }, argPackAdvance: 8, readValueFromPointer: tb, xa: null });
            }, e: function (a, b, c) { c = ib(c); b = V(b); W(a, { name: b, fromWireType: function (e) { return e; }, toWireType: function (e, f) { if ("number" !== typeof f && "boolean" !== typeof f)
                    throw new TypeError('Cannot convert "' + ub(f) + '" to ' + this.name); return f; }, argPackAdvance: 8, readValueFromPointer: vb(b, c), xa: null }); }, c: function (a, b, c, e, f) {
                function g(m) { return m; }
                b = V(b);
                -1 === f && (f = 4294967295);
                var k = ib(c);
                if (0 === e) {
                    var l = 32 - 8 *
                        c;
                    g = function (m) { return m << l >>> l; };
                }
                var n = b.includes("unsigned");
                W(a, { name: b, fromWireType: g, toWireType: function (m, p) { if ("number" !== typeof p && "boolean" !== typeof p)
                        throw new TypeError('Cannot convert "' + ub(p) + '" to ' + this.name); if (p < e || p > f)
                        throw new TypeError('Passing a number "' + ub(p) + '" from JS side to C/C++ side to an argument of type "' + b + '", which is outside the valid range [' + e + ", " + f + "]!"); return n ? p >>> 0 : p | 0; }, argPackAdvance: 8, readValueFromPointer: wb(b, k, 0 !== e), xa: null });
            }, b: function (a, b, c) {
                function e(g) {
                    g >>=
                        2;
                    var k = K;
                    return new f(Ca, k[g + 1], k[g]);
                }
                var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
                c = V(c);
                W(a, { name: c, fromWireType: e, argPackAdvance: 8, readValueFromPointer: e }, { Ub: !0 });
            }, f: function (a, b) {
                b = V(b);
                var c = "std::string" === b;
                W(a, { name: b, fromWireType: function (e) {
                        var f = K[e >> 2];
                        if (c)
                            for (var g = e + 4, k = 0; k <= f; ++k) {
                                var l = e + 4 + k;
                                if (k == f || 0 == G[l]) {
                                    g = g ? E(G, g, l - g) : "";
                                    if (void 0 === n)
                                        var n = g;
                                    else
                                        n += String.fromCharCode(0), n += g;
                                    g = l + 1;
                                }
                            }
                        else {
                            n = Array(f);
                            for (k = 0; k < f; ++k)
                                n[k] =
                                    String.fromCharCode(G[e + 4 + k]);
                            n = n.join("");
                        }
                        Z(e);
                        return n;
                    }, toWireType: function (e, f) {
                        f instanceof ArrayBuffer && (f = new Uint8Array(f));
                        var g = "string" === typeof f;
                        g || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array || qb("Cannot pass non-string to std::string");
                        var k = (c && g ? function () { return sa(f); } : function () { return f.length; })(), l = Hb(4 + k + 1);
                        K[l >> 2] = k;
                        if (c && g)
                            ra(f, G, l + 4, k + 1);
                        else if (g)
                            for (g = 0; g < k; ++g) {
                                var n = f.charCodeAt(g);
                                255 < n && (Z(l), qb("String has UTF-16 code units that do not fit in 8 bits"));
                                G[l + 4 + g] = n;
                            }
                        else
                            for (g = 0; g < k; ++g)
                                G[l + 4 + g] = f[g];
                        null !== e && e.push(Z, l);
                        return l;
                    }, argPackAdvance: 8, readValueFromPointer: tb, xa: function (e) { Z(e); } });
            }, d: function (a, b, c) {
                c = V(c);
                if (2 === b) {
                    var e = ua;
                    var f = wa;
                    var g = xa;
                    var k = function () { return va; };
                    var l = 1;
                }
                else
                    4 === b && (e = ya, f = za, g = Aa, k = function () { return K; }, l = 2);
                W(a, { name: c, fromWireType: function (n) { for (var m = K[n >> 2], p = k(), r, u = n + 4, w = 0; w <= m; ++w) {
                        var v = n + 4 + w * b;
                        if (w == m || 0 == p[v >> l])
                            u = e(u, v - u), void 0 === r ? r = u : (r += String.fromCharCode(0), r += u), u = v + b;
                    } Z(n); return r; }, toWireType: function (n, m) { "string" !== typeof m && qb("Cannot pass non-string to C++ string type " + c); var p = g(m), r = Hb(4 + p + b); K[r >> 2] = p >> l; f(m, r + 4, p + b); null !== n && n.push(Z, r); return r; }, argPackAdvance: 8, readValueFromPointer: tb, xa: function (n) { Z(n); } });
            }, x: function (a, b) { b = V(b); W(a, { sc: !0, name: b, argPackAdvance: 0, fromWireType: function () { }, toWireType: function () { } }); }, a: function () { B(); }, n: xb, v: function (a, b, c) { G.copyWithin(a, b, b + c); }, i: function () { B("OOM"); }, s: function (a, b) {
                var c = 0;
                zb().forEach(function (e, f) {
                    var g = b + c;
                    f = I[a + 4 * f >> 2] = g;
                    for (g =
                        0; g < e.length; ++g)
                        J[f++ >> 0] = e.charCodeAt(g);
                    J[f >> 0] = 0;
                    c += e.length + 1;
                });
                return 0;
            }, t: function (a, b) { var c = zb(); I[a >> 2] = c.length; var e = 0; c.forEach(function (f) { e += f.length + 1; }); I[b >> 2] = e; return 0; }, h: function (a) { try {
                var b = U(a);
                S.close(b);
                return 0;
            }
            catch (c) {
                return "undefined" !== typeof S && c instanceof S.V || B(c), c.fa;
            } }, u: function (a, b) { try {
                var c = U(a);
                J[b >> 0] = c.tty ? 2 : S.ba(c.mode) ? 3 : S.ta(c.mode) ? 7 : 4;
                return 0;
            }
            catch (e) {
                return "undefined" !== typeof S && e instanceof S.V || B(e), e.fa;
            } }, o: function (a, b, c, e) {
                try {
                    a: {
                        for (var f = U(a), g = a = 0; g < c; g++) {
                            var k = I[b + (8 * g + 4) >> 2], l = S.read(f, J, I[b + 8 * g >> 2], k, void 0);
                            if (0 > l) {
                                var n = -1;
                                break a;
                            }
                            a += l;
                            if (l < k)
                                break;
                        }
                        n = a;
                    }
                    I[e >> 2] = n;
                    return 0;
                }
                catch (m) {
                    return "undefined" !== typeof S && m instanceof S.V || B(m), m.fa;
                }
            }, k: function (a, b, c, e, f) {
                try {
                    var g = U(a);
                    a = 4294967296 * c + (b >>> 0);
                    if (-9007199254740992 >= a || 9007199254740992 <= a)
                        return -61;
                    S.ia(g, a, e);
                    O = [g.position >>> 0, (N = g.position, 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
                    I[f >> 2] =
                        O[0];
                    I[f + 4 >> 2] = O[1];
                    g.Sa && 0 === a && 0 === e && (g.Sa = null);
                    return 0;
                }
                catch (k) {
                    return "undefined" !== typeof S && k instanceof S.V || B(k), k.fa;
                }
            }, g: function (a, b, c, e) { try {
                a: {
                    for (var f = U(a), g = a = 0; g < c; g++) {
                        var k = S.write(f, J, I[b + 8 * g >> 2], I[b + (8 * g + 4) >> 2], void 0);
                        if (0 > k) {
                            var l = -1;
                            break a;
                        }
                        a += k;
                    }
                    l = a;
                }
                I[e >> 2] = l;
                return 0;
            }
            catch (n) {
                return "undefined" !== typeof S && n instanceof S.V || B(n), n.fa;
            } }, r: function (a) { var b = Date.now(); I[a >> 2] = b / 1E3 | 0; I[a + 4 >> 2] = b % 1E3 * 1E3 | 0; return 0; }, m: function () { } };
        (function () {
            function a(f) { d.asm = f.exports; na = d.asm.y; Ca = f = na.buffer; d.HEAP8 = J = new Int8Array(f); d.HEAP16 = H = new Int16Array(f); d.HEAP32 = I = new Int32Array(f); d.HEAPU8 = G = new Uint8Array(f); d.HEAPU16 = va = new Uint16Array(f); d.HEAPU32 = K = new Uint32Array(f); d.HEAPF32 = Da = new Float32Array(f); d.HEAPF64 = Ea = new Float64Array(f); Fa = d.asm.N; Ha.unshift(d.asm.z); Na(); }
            function b(f) { a(f.instance); }
            function c(f) {
                return Ra().then(function (g) { return WebAssembly.instantiate(g, e); }).then(function (g) { return g; }).then(f, function (g) {
                    D("failed to asynchronously prepare wasm: " +
                        g);
                    B(g);
                });
            }
            var e = { a: Ib };
            Ma();
            if (d.instantiateWasm)
                try {
                    return d.instantiateWasm(e, a);
                }
                catch (f) {
                    return D("Module.instantiateWasm callback failed with error: " + f), !1;
                }
            (function () {
                return ma || "function" !== typeof WebAssembly.instantiateStreaming || M.startsWith(Oa) || M.startsWith("file://") || "function" !== typeof fetch ? c(b) : fetch(M, { credentials: "same-origin" }).then(function (f) {
                    return WebAssembly.instantiateStreaming(f, e).then(b, function (g) {
                        D("wasm streaming compile failed: " + g);
                        D("falling back to ArrayBuffer instantiation");
                        return c(b);
                    });
                });
            })().catch(ba);
            return {};
        })();
        d.___wasm_call_ctors = function () { return (d.___wasm_call_ctors = d.asm.z).apply(null, arguments); };
        d._av_get_default_channel_layout = function () { return (d._av_get_default_channel_layout = d.asm.A).apply(null, arguments); };
        d._av_frame_alloc = function () { return (d._av_frame_alloc = d.asm.B).apply(null, arguments); };
        d._avcodec_register_all = function () { return (d._avcodec_register_all = d.asm.C).apply(null, arguments); };
        d._avcodec_find_decoder_by_name = function () { return (d._avcodec_find_decoder_by_name = d.asm.D).apply(null, arguments); };
        d._avcodec_open2 = function () { return (d._avcodec_open2 = d.asm.E).apply(null, arguments); };
        d._avcodec_flush_buffers = function () { return (d._avcodec_flush_buffers = d.asm.F).apply(null, arguments); };
        d._av_init_packet = function () { return (d._av_init_packet = d.asm.G).apply(null, arguments); };
        d._av_packet_from_data = function () { return (d._av_packet_from_data = d.asm.H).apply(null, arguments); };
        d._avcodec_decode_video2 = function () { return (d._avcodec_decode_video2 = d.asm.I).apply(null, arguments); };
        d._avcodec_decode_audio4 = function () { return (d._avcodec_decode_audio4 = d.asm.J).apply(null, arguments); };
        d._avcodec_alloc_context3 = function () { return (d._avcodec_alloc_context3 = d.asm.K).apply(null, arguments); };
        d.___getTypeName = function () { return (d.___getTypeName = d.asm.L).apply(null, arguments); };
        d.___embind_register_native_and_builtin_types = function () { return (d.___embind_register_native_and_builtin_types = d.asm.M).apply(null, arguments); };
        var Hb = d._malloc = function () { return (Hb = d._malloc = d.asm.O).apply(null, arguments); }, Gb = d.___errno_location = function () { return (Gb = d.___errno_location = d.asm.P).apply(null, arguments); }, Jb = d.stackSave = function () { return (Jb = d.stackSave = d.asm.Q).apply(null, arguments); }, Kb = d.stackRestore = function () { return (Kb = d.stackRestore = d.asm.R).apply(null, arguments); }, Lb = d.stackAlloc = function () { return (Lb = d.stackAlloc = d.asm.S).apply(null, arguments); }, Z = d._free = function () { return (Z = d._free = d.asm.T).apply(null, arguments); }, db = d._memalign =
            function () { return (db = d._memalign = d.asm.U).apply(null, arguments); };
        d._ff_h264_cabac_tables = 141908;
        d.ccall = function (a, b, c, e) { var f = { string: function (m) { var p = 0; if (null !== m && void 0 !== m && 0 !== m) {
                var r = (m.length << 2) + 1;
                p = Lb(r);
                ra(m, G, p, r);
            } return p; }, array: function (m) { var p = Lb(m.length); Ba(m, p); return p; } }; a = pa(a); var g = [], k = 0; if (e)
            for (var l = 0; l < e.length; l++) {
                var n = f[c[l]];
                n ? (0 === k && (k = Jb()), g[l] = n(e[l])) : g[l] = e[l];
            } c = a.apply(null, g); return c = function (m) { 0 !== k && Kb(k); return "string" === b ? m ? E(G, m, void 0) : "" : "boolean" === b ? !!m : m; }(c); };
        d.setValue = function (a, b, c) { c = c || "i8"; "*" === c.charAt(c.length - 1) && (c = "i32"); switch (c) {
            case "i1":
                J[a >> 0] = b;
                break;
            case "i8":
                J[a >> 0] = b;
                break;
            case "i16":
                H[a >> 1] = b;
                break;
            case "i32":
                I[a >> 2] = b;
                break;
            case "i64":
                O = [b >>> 0, (N = b, 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
                I[a >> 2] = O[0];
                I[a + 4 >> 2] = O[1];
                break;
            case "float":
                Da[a >> 2] = b;
                break;
            case "double":
                Ea[a >> 3] = b;
                break;
            default: B("invalid type for setValue: " + c);
        } };
        d.getValue = function (a, b) { b = b || "i8"; "*" === b.charAt(b.length - 1) && (b = "i32"); switch (b) {
            case "i1": return J[a >> 0];
            case "i8": return J[a >> 0];
            case "i16": return H[a >> 1];
            case "i32": return I[a >> 2];
            case "i64": return I[a >> 2];
            case "float": return Da[a >> 2];
            case "double": return Ea[a >> 3];
            default: B("invalid type for getValue: " + b);
        } return null; };
        d.writeArrayToMemory = Ba;
        d.FS = S;
        var Mb;
        La = function Nb() { Mb || Ob(); Mb || (La = Nb); };
        function Ob() {
            function a() { if (!Mb && (Mb = !0, d.calledRun = !0, !oa)) {
                d.noFSInit || S.za.Ua || S.za();
                S.tb = !1;
                Sa(Ha);
                aa(d);
                if (d.onRuntimeInitialized)
                    d.onRuntimeInitialized();
                if (d.postRun)
                    for ("function" == typeof d.postRun && (d.postRun = [d.postRun]); d.postRun.length;) {
                        var b = d.postRun.shift();
                        Ia.unshift(b);
                    }
                Sa(Ia);
            } }
            if (!(0 < L)) {
                if (d.preRun)
                    for ("function" == typeof d.preRun && (d.preRun = [d.preRun]); d.preRun.length;)
                        Ja();
                Sa(Ga);
                0 < L || (d.setStatus ? (d.setStatus("Running..."), setTimeout(function () {
                    setTimeout(function () { d.setStatus(""); }, 1);
                    a();
                }, 1)) : a());
            }
        }
        d.run = Ob;
        if (d.preInit)
            for ("function" == typeof d.preInit && (d.preInit = [d.preInit]); 0 < d.preInit.length;)
                d.preInit.pop()();
        Ob();
        return OSH.ready;
    });
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = OSH;
else if (typeof define === 'function' && define['amd'])
    define([], function () { return OSH; });
else if (typeof exports === 'object')
    exports["OSH"] = OSH;
//# sourceMappingURL=ffmpeg.js.map