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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;!function (e) {
  if (true) module.exports = e();else {}
}(function () {
  return function () {
    return function e(t, r, n) {
      function i(s, a) {
        if (!r[s]) {
          if (!t[s]) {
            var l = "function" == typeof require && require;
            if (!a && __webpack_require__(2)) return require(s, !0);
            if (o) return o(s, !0);
            var u = new Error("Cannot find module '" + s + "'");
            throw u.code = "MODULE_NOT_FOUND", u;
          }

          var c = r[s] = {
            exports: {}
          };
          t[s][0].call(c.exports, function (e) {
            return i(t[s][1][e] || e);
          }, c, c.exports, e, t, r, n);
        }

        return r[s].exports;
      }

      for (var o = "function" == typeof require && require, s = 0; s < n.length; s++) i(n[s]);

      return i;
    };
  }()({
    1: [function (e, t, r) {
      (function (r, n) {
        (function () {
          "use strict";

          const i = e("events").EventEmitter,
                o = e("./store"),
                s = e("./topic-alias-recv"),
                a = e("./topic-alias-send"),
                l = e("mqtt-packet"),
                u = e("./default-message-id-provider"),
                c = e("readable-stream").Writable,
                h = e("inherits"),
                f = e("reinterval"),
                p = e("rfdc/default"),
                d = e("./validations"),
                g = e("xtend"),
                y = e("debug")("mqttjs:client"),
                b = r ? r.nextTick : function (e) {
            setTimeout(e, 0);
          },
                m = n.setImmediate || function (e) {
            b(e);
          },
                v = {
            keepalive: 60,
            reschedulePings: !0,
            protocolId: "MQTT",
            protocolVersion: 4,
            reconnectPeriod: 1e3,
            connectTimeout: 3e4,
            clean: !0,
            resubscribe: !0
          },
                w = ["ECONNREFUSED", "EADDRINUSE", "ECONNRESET", "ENOTFOUND"],
                _ = {
            0: "",
            1: "Unacceptable protocol version",
            2: "Identifier rejected",
            3: "Server unavailable",
            4: "Bad username or password",
            5: "Not authorized",
            16: "No matching subscribers",
            17: "No subscription existed",
            128: "Unspecified error",
            129: "Malformed Packet",
            130: "Protocol Error",
            131: "Implementation specific error",
            132: "Unsupported Protocol Version",
            133: "Client Identifier not valid",
            134: "Bad User Name or Password",
            135: "Not authorized",
            136: "Server unavailable",
            137: "Server busy",
            138: "Banned",
            139: "Server shutting down",
            140: "Bad authentication method",
            141: "Keep Alive timeout",
            142: "Session taken over",
            143: "Topic Filter invalid",
            144: "Topic Name invalid",
            145: "Packet identifier in use",
            146: "Packet Identifier not found",
            147: "Receive Maximum exceeded",
            148: "Topic Alias invalid",
            149: "Packet too large",
            150: "Message rate too high",
            151: "Quota exceeded",
            152: "Administrative action",
            153: "Payload format invalid",
            154: "Retain not supported",
            155: "QoS not supported",
            156: "Use another server",
            157: "Server moved",
            158: "Shared Subscriptions not supported",
            159: "Connection rate exceeded",
            160: "Maximum connect time",
            161: "Subscription Identifiers not supported",
            162: "Wildcard Subscriptions not supported"
          };

          function k(e, t) {
            let r;
            t.properties && (r = t.properties.topicAlias);
            let n = t.topic.toString();

            if (0 === n.length) {
              if (void 0 === r) return new Error("Unregistered Topic Alias");
              if (void 0 === (n = e.topicAliasSend.getTopicByAlias(r))) return new Error("Unregistered Topic Alias");
              t.topic = n;
            }

            r && delete t.properties.topicAlias;
          }

          function S(e, t, r) {
            y("sendPacket :: packet: %O", t), y("sendPacket :: emitting `packetsend`"), e.emit("packetsend", t), y("sendPacket :: writing to stream");
            const n = l.writeToStream(t, e.stream, e.options);
            y("sendPacket :: writeToStream result %s", n), !n && r ? (y("sendPacket :: handle events on `drain` once through callback."), e.stream.once("drain", r)) : r && (y("sendPacket :: invoking cb"), r());
          }

          function E(e, t, r, n) {
            y("storeAndSend :: store packet with cmd %s to outgoingStore", t.cmd);
            let i,
                o = t;
            if ("publish" === o.cmd && (o = p(t), i = k(e, o))) return r && r(i);
            e.outgoingStore.put(o, function (i) {
              if (i) return r && r(i);
              n(), S(e, t, r);
            });
          }

          function C(e) {
            y("nop ::", e);
          }

          function T(e, t) {
            let r;
            const n = this;
            if (!(this instanceof T)) return new T(e, t);

            for (r in this.options = t || {}, v) void 0 === this.options[r] ? this.options[r] = v[r] : this.options[r] = t[r];

            y("MqttClient :: options.protocol", t.protocol), y("MqttClient :: options.protocolVersion", t.protocolVersion), y("MqttClient :: options.username", t.username), y("MqttClient :: options.keepalive", t.keepalive), y("MqttClient :: options.reconnectPeriod", t.reconnectPeriod), y("MqttClient :: options.rejectUnauthorized", t.rejectUnauthorized), y("MqttClient :: options.topicAliasMaximum", t.topicAliasMaximum), this.options.clientId = "string" == typeof t.clientId ? t.clientId : "mqttjs_" + Math.random().toString(16).substr(2, 8), y("MqttClient :: clientId", this.options.clientId), this.options.customHandleAcks = 5 === t.protocolVersion && t.customHandleAcks ? t.customHandleAcks : function () {
              arguments[3](0);
            }, this.streamBuilder = e, this.messageIdProvider = void 0 === this.options.messageIdProvider ? new u() : this.options.messageIdProvider, this.outgoingStore = t.outgoingStore || new o(), this.incomingStore = t.incomingStore || new o(), this.queueQoSZero = void 0 === t.queueQoSZero || t.queueQoSZero, this._resubscribeTopics = {}, this.messageIdToTopic = {}, this.pingTimer = null, this.connected = !1, this.disconnecting = !1, this.queue = [], this.connackTimer = null, this.reconnectTimer = null, this._storeProcessing = !1, this._packetIdsDuringStoreProcessing = {}, this._storeProcessingQueue = [], this.outgoing = {}, this._firstConnection = !0, t.topicAliasMaximum > 0 && (t.topicAliasMaximum > 65535 ? y("MqttClient :: options.topicAliasMaximum is out of range") : this.topicAliasRecv = new s(t.topicAliasMaximum)), this.on("connect", function () {
              const e = this.queue;
              y("connect :: sending queued packets"), function t() {
                const r = e.shift();
                y("deliver :: entry %o", r);
                let i = null;
                if (!r) return void n._resubscribe();
                i = r.packet, y("deliver :: call _sendPacket for %o", i);
                let o = !0;
                i.messageId && 0 !== i.messageId && (n.messageIdProvider.register(i.messageId) || (o = !1)), o ? n._sendPacket(i, function (e) {
                  r.cb && r.cb(e), t();
                }) : (y("messageId: %d has already used. The message is skipped and removed.", i.messageId), t());
              }();
            }), this.on("close", function () {
              y("close :: connected set to `false`"), this.connected = !1, y("close :: clearing connackTimer"), clearTimeout(this.connackTimer), y("close :: clearing ping timer"), null !== n.pingTimer && (n.pingTimer.clear(), n.pingTimer = null), this.topicAliasRecv && this.topicAliasRecv.clear(), y("close :: calling _setupReconnect"), this._setupReconnect();
            }), i.call(this), y("MqttClient :: setting up stream"), this._setupStream();
          }

          h(T, i), T.prototype._setupStream = function () {
            const e = this,
                  t = new c(),
                  r = l.parser(this.options);
            let n = null;
            const i = [];

            function o() {
              if (i.length) b(s);else {
                const e = n;
                n = null, e();
              }
            }

            function s() {
              y("work :: getting next packet in queue");
              const t = i.shift();
              if (t) y("work :: packet pulled from queue"), e._handlePacket(t, o);else {
                y("work :: no packets in queue");
                const e = n;
                n = null, y("work :: done flag is %s", !!e), e && e();
              }
            }

            y("_setupStream :: calling method to clear reconnect"), this._clearReconnect(), y("_setupStream :: using streamBuilder provided to client to create stream"), this.stream = this.streamBuilder(this), r.on("packet", function (e) {
              y("parser :: on packet push to packets array."), i.push(e);
            }), t._write = function (e, t, i) {
              n = i, y("writable stream :: parsing buffer"), r.parse(e), s();
            }, y("_setupStream :: pipe stream to writable stream"), this.stream.pipe(t), this.stream.on("error", function (t) {
              y("streamErrorHandler :: error", t.message), w.includes(t.code) ? (y("streamErrorHandler :: emitting error"), e.emit("error", t)) : C(t);
            }), this.stream.on("close", function () {
              var t;
              y("(%s)stream :: on close", e.options.clientId), (t = e.outgoing) && (y("flushVolatile :: deleting volatile messages from the queue and setting their callbacks as error function"), Object.keys(t).forEach(function (e) {
                t[e].volatile && "function" == typeof t[e].cb && (t[e].cb(new Error("Connection closed")), delete t[e]);
              })), y("stream: emit close to MqttClient"), e.emit("close");
            }), y("_setupStream: sending packet `connect`");
            const a = Object.create(this.options);

            if (a.cmd = "connect", this.topicAliasRecv && (a.properties || (a.properties = {}), this.topicAliasRecv && (a.properties.topicAliasMaximum = this.topicAliasRecv.max)), S(this, a), r.on("error", this.emit.bind(this, "error")), this.options.properties) {
              if (!this.options.properties.authenticationMethod && this.options.properties.authenticationData) return e.end(() => this.emit("error", new Error("Packet has no Authentication Method"))), this;

              if (this.options.properties.authenticationMethod && this.options.authPacket && "object" == typeof this.options.authPacket) {
                S(this, g({
                  cmd: "auth",
                  reasonCode: 0
                }, this.options.authPacket));
              }
            }

            this.stream.setMaxListeners(1e3), clearTimeout(this.connackTimer), this.connackTimer = setTimeout(function () {
              y("!!connectTimeout hit!! Calling _cleanUp with force `true`"), e._cleanUp(!0);
            }, this.options.connectTimeout);
          }, T.prototype._handlePacket = function (e, t) {
            const r = this.options;
            if (5 === r.protocolVersion && r.properties && r.properties.maximumPacketSize && r.properties.maximumPacketSize < e.length) return this.emit("error", new Error("exceeding packets size " + e.cmd)), this.end({
              reasonCode: 149,
              properties: {
                reasonString: "Maximum packet size was exceeded"
              }
            }), this;

            switch (y("_handlePacket :: emitting packetreceive"), this.emit("packetreceive", e), e.cmd) {
              case "publish":
                this._handlePublish(e, t);

                break;

              case "puback":
              case "pubrec":
              case "pubcomp":
              case "suback":
              case "unsuback":
                this._handleAck(e), t();
                break;

              case "pubrel":
                this._handlePubrel(e, t);

                break;

              case "connack":
                this._handleConnack(e), t();
                break;

              case "auth":
                this._handleAuth(e), t();
                break;

              case "pingresp":
                this._handlePingresp(e), t();
                break;

              case "disconnect":
                this._handleDisconnect(e), t();
            }
          }, T.prototype._checkDisconnecting = function (e) {
            return this.disconnecting && (e ? e(new Error("client disconnecting")) : this.emit("error", new Error("client disconnecting"))), this.disconnecting;
          }, T.prototype.publish = function (e, t, r, n) {
            y("publish :: message `%s` to topic `%s`", t, e);
            const i = this.options;
            "function" == typeof r && (n = r, r = null);
            if (r = g({
              qos: 0,
              retain: !1,
              dup: !1
            }, r), this._checkDisconnecting(n)) return this;

            const o = this,
                  s = function () {
              let s = 0;
              if ((1 === r.qos || 2 === r.qos) && null === (s = o._nextId())) return y("No messageId left"), !1;
              const a = {
                cmd: "publish",
                topic: e,
                payload: t,
                qos: r.qos,
                retain: r.retain,
                messageId: s,
                dup: r.dup
              };

              switch (5 === i.protocolVersion && (a.properties = r.properties), y("publish :: qos", r.qos), r.qos) {
                case 1:
                case 2:
                  o.outgoing[a.messageId] = {
                    volatile: !1,
                    cb: n || C
                  }, y("MqttClient:publish: packet cmd: %s", a.cmd), o._sendPacket(a, void 0, r.cbStorePut);
                  break;

                default:
                  y("MqttClient:publish: packet cmd: %s", a.cmd), o._sendPacket(a, n, r.cbStorePut);
              }

              return !0;
            };

            return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !s()) && this._storeProcessingQueue.push({
              invoke: s,
              cbStorePut: r.cbStorePut,
              callback: n
            }), this;
          }, T.prototype.subscribe = function () {
            const e = this,
                  t = new Array(arguments.length);

            for (let e = 0; e < arguments.length; e++) t[e] = arguments[e];

            const r = [];
            let n = t.shift();
            const i = n.resubscribe;
            let o = t.pop() || C,
                s = t.pop();
            const a = this.options.protocolVersion;
            delete n.resubscribe, "string" == typeof n && (n = [n]), "function" != typeof o && (s = o, o = C);
            const l = d.validateTopics(n);
            if (null !== l) return m(o, new Error("Invalid topic " + l)), this;
            if (this._checkDisconnecting(o)) return y("subscribe: discconecting true"), this;
            const u = {
              qos: 0
            };
            if (5 === a && (u.nl = !1, u.rap = !1, u.rh = 0), s = g(u, s), Array.isArray(n) ? n.forEach(function (t) {
              if (y("subscribe: array topic %s", t), !Object.prototype.hasOwnProperty.call(e._resubscribeTopics, t) || e._resubscribeTopics[t].qos < s.qos || i) {
                const e = {
                  topic: t,
                  qos: s.qos
                };
                5 === a && (e.nl = s.nl, e.rap = s.rap, e.rh = s.rh, e.properties = s.properties), y("subscribe: pushing topic `%s` and qos `%s` to subs list", e.topic, e.qos), r.push(e);
              }
            }) : Object.keys(n).forEach(function (t) {
              if (y("subscribe: object topic %s", t), !Object.prototype.hasOwnProperty.call(e._resubscribeTopics, t) || e._resubscribeTopics[t].qos < n[t].qos || i) {
                const e = {
                  topic: t,
                  qos: n[t].qos
                };
                5 === a && (e.nl = n[t].nl, e.rap = n[t].rap, e.rh = n[t].rh, e.properties = s.properties), y("subscribe: pushing `%s` to subs list", e), r.push(e);
              }
            }), !r.length) return o(null, []), this;

            const c = function () {
              const t = e._nextId();

              if (null === t) return y("No messageId left"), !1;
              const n = {
                cmd: "subscribe",
                subscriptions: r,
                qos: 1,
                retain: !1,
                dup: !1,
                messageId: t
              };

              if (s.properties && (n.properties = s.properties), e.options.resubscribe) {
                y("subscribe :: resubscribe true");
                const t = [];
                r.forEach(function (r) {
                  if (e.options.reconnectPeriod > 0) {
                    const n = {
                      qos: r.qos
                    };
                    5 === a && (n.nl = r.nl || !1, n.rap = r.rap || !1, n.rh = r.rh || 0, n.properties = r.properties), e._resubscribeTopics[r.topic] = n, t.push(r.topic);
                  }
                }), e.messageIdToTopic[n.messageId] = t;
              }

              return e.outgoing[n.messageId] = {
                volatile: !0,
                cb: function (e, t) {
                  if (!e) {
                    const e = t.granted;

                    for (let t = 0; t < e.length; t += 1) r[t].qos = e[t];
                  }

                  o(e, r);
                }
              }, y("subscribe :: call _sendPacket"), e._sendPacket(n), !0;
            };

            return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !c()) && this._storeProcessingQueue.push({
              invoke: c,
              callback: o
            }), this;
          }, T.prototype.unsubscribe = function () {
            const e = this,
                  t = new Array(arguments.length);

            for (let e = 0; e < arguments.length; e++) t[e] = arguments[e];

            let r = t.shift(),
                n = t.pop() || C,
                i = t.pop();
            "string" == typeof r && (r = [r]), "function" != typeof n && (i = n, n = C);
            const o = d.validateTopics(r);
            if (null !== o) return m(n, new Error("Invalid topic " + o)), this;
            if (e._checkDisconnecting(n)) return this;

            const s = function () {
              const t = e._nextId();

              if (null === t) return y("No messageId left"), !1;
              const o = {
                cmd: "unsubscribe",
                qos: 1,
                messageId: t
              };
              return "string" == typeof r ? o.unsubscriptions = [r] : Array.isArray(r) && (o.unsubscriptions = r), e.options.resubscribe && o.unsubscriptions.forEach(function (t) {
                delete e._resubscribeTopics[t];
              }), "object" == typeof i && i.properties && (o.properties = i.properties), e.outgoing[o.messageId] = {
                volatile: !0,
                cb: n
              }, y("unsubscribe: call _sendPacket"), e._sendPacket(o), !0;
            };

            return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !s()) && this._storeProcessingQueue.push({
              invoke: s,
              callback: n
            }), this;
          }, T.prototype.end = function (e, t, r) {
            const n = this;

            function i() {
              y("end :: (%s) :: finish :: calling _cleanUp with force %s", n.options.clientId, e), n._cleanUp(e, () => {
                y("end :: finish :: calling process.nextTick on closeStores"), b(function () {
                  y("end :: closeStores: closing incoming and outgoing stores"), n.disconnected = !0, n.incomingStore.close(function (e) {
                    n.outgoingStore.close(function (t) {
                      if (y("end :: closeStores: emitting end"), n.emit("end"), r) {
                        const n = e || t;
                        y("end :: closeStores: invoking callback with args"), r(n);
                      }
                    });
                  }), n._deferredReconnect && n._deferredReconnect();
                }.bind(n));
              }, t);
            }

            return y("end :: (%s)", this.options.clientId), null != e && "boolean" == typeof e || (r = t || C, t = e, e = !1, "object" != typeof t && (r = t, t = null, "function" != typeof r && (r = C))), "object" != typeof t && (r = t, t = null), y("end :: cb? %s", !!r), r = r || C, this.disconnecting ? (r(), this) : (this._clearReconnect(), this.disconnecting = !0, !e && Object.keys(this.outgoing).length > 0 ? (y("end :: (%s) :: calling finish in 10ms once outgoing is empty", n.options.clientId), this.once("outgoingEmpty", setTimeout.bind(null, i, 10))) : (y("end :: (%s) :: immediately calling finish", n.options.clientId), i()), this);
          }, T.prototype.removeOutgoingMessage = function (e) {
            const t = this.outgoing[e] ? this.outgoing[e].cb : null;
            return delete this.outgoing[e], this.outgoingStore.del({
              messageId: e
            }, function () {
              t(new Error("Message removed"));
            }), this;
          }, T.prototype.reconnect = function (e) {
            y("client reconnect");

            const t = this,
                  r = function () {
              e ? (t.options.incomingStore = e.incomingStore, t.options.outgoingStore = e.outgoingStore) : (t.options.incomingStore = null, t.options.outgoingStore = null), t.incomingStore = t.options.incomingStore || new o(), t.outgoingStore = t.options.outgoingStore || new o(), t.disconnecting = !1, t.disconnected = !1, t._deferredReconnect = null, t._reconnect();
            };

            return this.disconnecting && !this.disconnected ? this._deferredReconnect = r : r(), this;
          }, T.prototype._reconnect = function () {
            y("_reconnect: emitting reconnect to client"), this.emit("reconnect"), this.connected ? (this.end(() => {
              this._setupStream();
            }), y("client already connected. disconnecting first.")) : (y("_reconnect: calling _setupStream"), this._setupStream());
          }, T.prototype._setupReconnect = function () {
            const e = this;
            !e.disconnecting && !e.reconnectTimer && e.options.reconnectPeriod > 0 ? (this.reconnecting || (y("_setupReconnect :: emit `offline` state"), this.emit("offline"), y("_setupReconnect :: set `reconnecting` to `true`"), this.reconnecting = !0), y("_setupReconnect :: setting reconnectTimer for %d ms", e.options.reconnectPeriod), e.reconnectTimer = setInterval(function () {
              y("reconnectTimer :: reconnect triggered!"), e._reconnect();
            }, e.options.reconnectPeriod)) : y("_setupReconnect :: doing nothing...");
          }, T.prototype._clearReconnect = function () {
            y("_clearReconnect : clearing reconnect timer"), this.reconnectTimer && (clearInterval(this.reconnectTimer), this.reconnectTimer = null);
          }, T.prototype._cleanUp = function (e, t) {
            const r = arguments[2];
            if (t && (y("_cleanUp :: done callback provided for on stream close"), this.stream.on("close", t)), y("_cleanUp :: forced? %s", e), e) 0 === this.options.reconnectPeriod && this.options.clean && (n = this.outgoing) && (y("flush: queue exists? %b", !!n), Object.keys(n).forEach(function (e) {
              "function" == typeof n[e].cb && (n[e].cb(new Error("Connection closed")), delete n[e]);
            })), y("_cleanUp :: (%s) :: destroying stream", this.options.clientId), this.stream.destroy();else {
              const e = g({
                cmd: "disconnect"
              }, r);
              y("_cleanUp :: (%s) :: call _sendPacket with disconnect packet", this.options.clientId), this._sendPacket(e, m.bind(null, this.stream.end.bind(this.stream)));
            }
            var n;
            this.disconnecting || (y("_cleanUp :: client not disconnecting. Clearing and resetting reconnect."), this._clearReconnect(), this._setupReconnect()), null !== this.pingTimer && (y("_cleanUp :: clearing pingTimer"), this.pingTimer.clear(), this.pingTimer = null), t && !this.connected && (y("_cleanUp :: (%s) :: removing stream `done` callback `close` listener", this.options.clientId), this.stream.removeListener("close", t), t());
          }, T.prototype._sendPacket = function (e, t, r) {
            y("_sendPacket :: (%s) ::  start", this.options.clientId), r = r || C, t = t || C;

            const n = function (e, t) {
              if (5 === e.options.protocolVersion && "publish" === t.cmd) {
                let r;
                t.properties && (r = t.properties.topicAlias);
                const n = t.topic.toString();
                if (e.topicAliasSend) {
                  if (r) {
                    if (0 !== n.length && (y("applyTopicAlias :: register topic: %s - alias: %d", n, r), !e.topicAliasSend.put(n, r))) return y("applyTopicAlias :: error out of range. topic: %s - alias: %d", n, r), new Error("Sending Topic Alias out of range");
                  } else 0 !== n.length && (e.options.autoAssignTopicAlias ? (r = e.topicAliasSend.getAliasByTopic(n)) ? (t.topic = "", t.properties = { ...t.properties,
                    topicAlias: r
                  }, y("applyTopicAlias :: auto assign(use) topic: %s - alias: %d", n, r)) : (r = e.topicAliasSend.getLruAlias(), e.topicAliasSend.put(n, r), t.properties = { ...t.properties,
                    topicAlias: r
                  }, y("applyTopicAlias :: auto assign topic: %s - alias: %d", n, r)) : e.options.autoUseTopicAlias && (r = e.topicAliasSend.getAliasByTopic(n)) && (t.topic = "", t.properties = { ...t.properties,
                    topicAlias: r
                  }, y("applyTopicAlias :: auto use topic: %s - alias: %d", n, r)));
                } else if (r) return y("applyTopicAlias :: error out of range. topic: %s - alias: %d", n, r), new Error("Sending Topic Alias out of range");
              }
            }(this, e);

            if (n) t(n);else {
              if (!this.connected) return "auth" === e.cmd ? (this._shiftPingInterval(), void S(this, e, t)) : (y("_sendPacket :: client not connected. Storing packet offline."), void this._storePacket(e, t, r));

              switch (this._shiftPingInterval(), e.cmd) {
                case "publish":
                  break;

                case "pubrel":
                  return void E(this, e, t, r);

                default:
                  return void S(this, e, t);
              }

              switch (e.qos) {
                case 2:
                case 1:
                  E(this, e, t, r);
                  break;

                case 0:
                default:
                  S(this, e, t);
              }

              y("_sendPacket :: (%s) ::  end", this.options.clientId);
            }
          }, T.prototype._storePacket = function (e, t, r) {
            y("_storePacket :: packet: %o", e), y("_storePacket :: cb? %s", !!t), r = r || C;
            let n = e;

            if ("publish" === n.cmd) {
              const r = k(this, n = p(e));
              if (r) return t && t(r);
            }

            0 === (n.qos || 0) && this.queueQoSZero || "publish" !== n.cmd ? this.queue.push({
              packet: n,
              cb: t
            }) : n.qos > 0 ? (t = this.outgoing[n.messageId] ? this.outgoing[n.messageId].cb : null, this.outgoingStore.put(n, function (e) {
              if (e) return t && t(e);
              r();
            })) : t && t(new Error("No connection to broker"));
          }, T.prototype._setupPingTimer = function () {
            y("_setupPingTimer :: keepalive %d (seconds)", this.options.keepalive);
            const e = this;
            !this.pingTimer && this.options.keepalive && (this.pingResp = !0, this.pingTimer = f(function () {
              e._checkPing();
            }, 1e3 * this.options.keepalive));
          }, T.prototype._shiftPingInterval = function () {
            this.pingTimer && this.options.keepalive && this.options.reschedulePings && this.pingTimer.reschedule(1e3 * this.options.keepalive);
          }, T.prototype._checkPing = function () {
            y("_checkPing :: checking ping..."), this.pingResp ? (y("_checkPing :: ping response received. Clearing flag and sending `pingreq`"), this.pingResp = !1, this._sendPacket({
              cmd: "pingreq"
            })) : (y("_checkPing :: calling _cleanUp with force true"), this._cleanUp(!0));
          }, T.prototype._handlePingresp = function () {
            this.pingResp = !0;
          }, T.prototype._handleConnack = function (e) {
            y("_handleConnack");
            const t = this.options,
                  r = 5 === t.protocolVersion ? e.reasonCode : e.returnCode;

            if (clearTimeout(this.connackTimer), delete this.topicAliasSend, e.properties) {
              if (e.properties.topicAliasMaximum) {
                if (e.properties.topicAliasMaximum > 65535) return void this.emit("error", new Error("topicAliasMaximum from broker is out of range"));
                e.properties.topicAliasMaximum > 0 && (this.topicAliasSend = new a(e.properties.topicAliasMaximum));
              }

              e.properties.serverKeepAlive && t.keepalive && (t.keepalive = e.properties.serverKeepAlive, this._shiftPingInterval()), e.properties.maximumPacketSize && (t.properties || (t.properties = {}), t.properties.maximumPacketSize = e.properties.maximumPacketSize);
            }

            if (0 === r) this.reconnecting = !1, this._onConnect(e);else if (r > 0) {
              const e = new Error("Connection refused: " + _[r]);
              e.code = r, this.emit("error", e);
            }
          }, T.prototype._handleAuth = function (e) {
            const t = this.options.protocolVersion,
                  r = 5 === t ? e.reasonCode : e.returnCode;

            if (5 !== t) {
              const e = new Error("Protocol error: Auth packets are only supported in MQTT 5. Your version:" + t);
              return e.code = r, void this.emit("error", e);
            }

            const n = this;
            this.handleAuth(e, function (e, t) {
              if (e) n.emit("error", e);else if (24 === r) n.reconnecting = !1, n._sendPacket(t);else {
                const t = new Error("Connection refused: " + _[r]);
                e.code = r, n.emit("error", t);
              }
            });
          }, T.prototype.handleAuth = function (e, t) {
            t();
          }, T.prototype._handlePublish = function (e, t) {
            y("_handlePublish: packet %o", e), t = void 0 !== t ? t : C;
            let r = e.topic.toString();
            const n = e.payload,
                  i = e.qos,
                  o = e.messageId,
                  s = this,
                  a = this.options,
                  l = [0, 16, 128, 131, 135, 144, 145, 151, 153];

            if (5 === this.options.protocolVersion) {
              let t;
              if (e.properties && (t = e.properties.topicAlias), void 0 !== t) if (0 === r.length) {
                if (!(t > 0 && t <= 65535)) return y("_handlePublish :: topic alias out of range. alias: %d", t), void this.emit("error", new Error("Received Topic Alias is out of range"));
                {
                  const e = this.topicAliasRecv.getTopicByAlias(t);
                  if (!e) return y("_handlePublish :: unregistered topic alias. alias: %d", t), void this.emit("error", new Error("Received unregistered Topic Alias"));
                  y("_handlePublish :: topic complemented by alias. topic: %s - alias: %d", r = e, t);
                }
              } else {
                if (!this.topicAliasRecv.put(r, t)) return y("_handlePublish :: topic alias out of range. alias: %d", t), void this.emit("error", new Error("Received Topic Alias is out of range"));
                y("_handlePublish :: registered topic: %s - alias: %d", r, t);
              }
            }

            switch (y("_handlePublish: qos %d", i), i) {
              case 2:
                a.customHandleAcks(r, n, e, function (r, n) {
                  return r instanceof Error || (n = r, r = null), r ? s.emit("error", r) : -1 === l.indexOf(n) ? s.emit("error", new Error("Wrong reason code for pubrec")) : void (n ? s._sendPacket({
                    cmd: "pubrec",
                    messageId: o,
                    reasonCode: n
                  }, t) : s.incomingStore.put(e, function () {
                    s._sendPacket({
                      cmd: "pubrec",
                      messageId: o
                    }, t);
                  }));
                });
                break;

              case 1:
                a.customHandleAcks(r, n, e, function (i, a) {
                  return i instanceof Error || (a = i, i = null), i ? s.emit("error", i) : -1 === l.indexOf(a) ? s.emit("error", new Error("Wrong reason code for puback")) : (a || s.emit("message", r, n, e), void s.handleMessage(e, function (e) {
                    if (e) return t && t(e);

                    s._sendPacket({
                      cmd: "puback",
                      messageId: o,
                      reasonCode: a
                    }, t);
                  }));
                });
                break;

              case 0:
                this.emit("message", r, n, e), this.handleMessage(e, t);
                break;

              default:
                y("_handlePublish: unknown QoS. Doing nothing.");
            }
          }, T.prototype.handleMessage = function (e, t) {
            t();
          }, T.prototype._handleAck = function (e) {
            const t = e.messageId,
                  r = e.cmd;
            let n = null;
            const i = this.outgoing[t] ? this.outgoing[t].cb : null,
                  o = this;
            let s;

            if (i) {
              switch (y("_handleAck :: packet type", r), r) {
                case "pubcomp":
                case "puback":
                  {
                    const r = e.reasonCode;
                    r && r > 0 && 16 !== r && ((s = new Error("Publish error: " + _[r])).code = r, i(s, e)), delete this.outgoing[t], this.outgoingStore.del(e, i), this.messageIdProvider.deallocate(t), this._invokeStoreProcessingQueue();
                    break;
                  }

                case "pubrec":
                  {
                    n = {
                      cmd: "pubrel",
                      qos: 2,
                      messageId: t
                    };
                    const r = e.reasonCode;
                    r && r > 0 && 16 !== r ? ((s = new Error("Publish error: " + _[r])).code = r, i(s, e)) : this._sendPacket(n);
                    break;
                  }

                case "suback":
                  delete this.outgoing[t], this.messageIdProvider.deallocate(t);

                  for (let r = 0; r < e.granted.length; r++) if (0 != (128 & e.granted[r])) {
                    const e = this.messageIdToTopic[t];
                    e && e.forEach(function (e) {
                      delete o._resubscribeTopics[e];
                    });
                  }

                  this._invokeStoreProcessingQueue(), i(null, e);
                  break;

                case "unsuback":
                  delete this.outgoing[t], this.messageIdProvider.deallocate(t), this._invokeStoreProcessingQueue(), i(null);
                  break;

                default:
                  o.emit("error", new Error("unrecognized packet type"));
              }

              this.disconnecting && 0 === Object.keys(this.outgoing).length && this.emit("outgoingEmpty");
            } else y("_handleAck :: Server sent an ack in error. Ignoring.");
          }, T.prototype._handlePubrel = function (e, t) {
            y("handling pubrel packet"), t = void 0 !== t ? t : C;
            const r = this,
                  n = {
              cmd: "pubcomp",
              messageId: e.messageId
            };
            r.incomingStore.get(e, function (e, i) {
              e ? r._sendPacket(n, t) : (r.emit("message", i.topic, i.payload, i), r.handleMessage(i, function (e) {
                if (e) return t(e);
                r.incomingStore.del(i, C), r._sendPacket(n, t);
              }));
            });
          }, T.prototype._handleDisconnect = function (e) {
            this.emit("disconnect", e);
          }, T.prototype._nextId = function () {
            return this.messageIdProvider.allocate();
          }, T.prototype.getLastMessageId = function () {
            return this.messageIdProvider.getLastAllocated();
          }, T.prototype._resubscribe = function () {
            y("_resubscribe");
            const e = Object.keys(this._resubscribeTopics);
            if (!this._firstConnection && (this.options.clean || 5 === this.options.protocolVersion && !this.connackPacket.sessionPresent) && e.length > 0) if (this.options.resubscribe) {
              if (5 === this.options.protocolVersion) {
                y("_resubscribe: protocolVersion 5");

                for (let t = 0; t < e.length; t++) {
                  const r = {};
                  r[e[t]] = this._resubscribeTopics[e[t]], r.resubscribe = !0, this.subscribe(r, {
                    properties: r[e[t]].properties
                  });
                }
              } else this._resubscribeTopics.resubscribe = !0, this.subscribe(this._resubscribeTopics);
            } else this._resubscribeTopics = {};
            this._firstConnection = !1;
          }, T.prototype._onConnect = function (e) {
            if (this.disconnected) return void this.emit("connect", e);
            const t = this;
            this.connackPacket = e, this.messageIdProvider.clear(), this._setupPingTimer(), this.connected = !0, function r() {
              let n = t.outgoingStore.createStream();

              function i() {
                t._storeProcessing = !1, t._packetIdsDuringStoreProcessing = {};
              }

              function o() {
                n.destroy(), n = null, t._flushStoreProcessingQueue(), i();
              }

              t.once("close", o), n.on("error", function (e) {
                i(), t._flushStoreProcessingQueue(), t.removeListener("close", o), t.emit("error", e);
              }), n.on("end", function () {
                let n = !0;

                for (const e in t._packetIdsDuringStoreProcessing) if (!t._packetIdsDuringStoreProcessing[e]) {
                  n = !1;
                  break;
                }

                n ? (i(), t.removeListener("close", o), t._invokeAllStoreProcessingQueue(), t.emit("connect", e)) : r();
              }), function e() {
                if (!n) return;
                t._storeProcessing = !0;
                const r = n.read(1);
                let i;
                r ? t._packetIdsDuringStoreProcessing[r.messageId] ? e() : t.disconnecting || t.reconnectTimer ? n.destroy && n.destroy() : (i = t.outgoing[r.messageId] ? t.outgoing[r.messageId].cb : null, t.outgoing[r.messageId] = {
                  volatile: !1,
                  cb: function (t, r) {
                    i && i(t, r), e();
                  }
                }, t._packetIdsDuringStoreProcessing[r.messageId] = !0, t.messageIdProvider.register(r.messageId) ? t._sendPacket(r) : y("messageId: %d has already used.", r.messageId)) : n.once("readable", e);
              }();
            }();
          }, T.prototype._invokeStoreProcessingQueue = function () {
            if (this._storeProcessingQueue.length > 0) {
              const e = this._storeProcessingQueue[0];
              if (e && e.invoke()) return this._storeProcessingQueue.shift(), !0;
            }

            return !1;
          }, T.prototype._invokeAllStoreProcessingQueue = function () {
            for (; this._invokeStoreProcessingQueue(););
          }, T.prototype._flushStoreProcessingQueue = function () {
            for (const e of this._storeProcessingQueue) e.cbStorePut && e.cbStorePut(new Error("Connection closed")), e.callback && e.callback(new Error("Connection closed"));

            this._storeProcessingQueue.splice(0);
          }, t.exports = T;
        }).call(this);
      }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "./default-message-id-provider": 7,
      "./store": 8,
      "./topic-alias-recv": 9,
      "./topic-alias-send": 10,
      "./validations": 11,
      _process: 50,
      debug: 18,
      events: 22,
      inherits: 24,
      "mqtt-packet": 40,
      "readable-stream": 69,
      reinterval: 70,
      "rfdc/default": 71,
      xtend: 81
    }],
    2: [function (e, t, r) {
      (function (r) {
        (function () {
          "use strict";

          const n = e("readable-stream").Transform,
                i = e("duplexify");
          let o,
              s,
              a,
              l = !1;

          t.exports = function (e, t) {
            if (t.hostname = t.hostname || t.host, !t.hostname) throw new Error("Could not determine host. Specify host manually.");
            const u = "MQIsdp" === t.protocolId && 3 === t.protocolVersion ? "mqttv3.1" : "mqtt";
            !function (e) {
              e.hostname || (e.hostname = "localhost"), e.path || (e.path = "/"), e.wsOptions || (e.wsOptions = {});
            }(t);

            const c = function (e, t) {
              const r = "alis" === e.protocol ? "wss" : "ws";
              let n = r + "://" + e.hostname + e.path;
              return e.port && 80 !== e.port && 443 !== e.port && (n = r + "://" + e.hostname + ":" + e.port + e.path), "function" == typeof e.transformWsUrl && (n = e.transformWsUrl(n, e, t)), n;
            }(t, e);

            return (o = t.my).connectSocket({
              url: c,
              protocols: u
            }), s = function () {
              const e = new n();
              return e._write = function (e, t, r) {
                o.sendSocketMessage({
                  data: e.buffer,
                  success: function () {
                    r();
                  },
                  fail: function () {
                    r(new Error());
                  }
                });
              }, e._flush = function (e) {
                o.closeSocket({
                  success: function () {
                    e();
                  }
                });
              }, e;
            }(), a = i.obj(), l || (l = !0, o.onSocketOpen(function () {
              a.setReadable(s), a.setWritable(s), a.emit("connect");
            }), o.onSocketMessage(function (e) {
              if ("string" == typeof e.data) {
                const t = r.from(e.data, "base64");
                s.push(t);
              } else {
                const t = new FileReader();
                t.addEventListener("load", function () {
                  let e = t.result;
                  e = e instanceof ArrayBuffer ? r.from(e) : r.from(e, "utf8"), s.push(e);
                }), t.readAsArrayBuffer(e.data);
              }
            }), o.onSocketClose(function () {
              a.end(), a.destroy();
            }), o.onSocketError(function (e) {
              a.destroy(e);
            })), a;
          };
        }).call(this);
      }).call(this, e("buffer").Buffer);
    }, {
      buffer: 17,
      duplexify: 20,
      "readable-stream": 69
    }],
    3: [function (e, t, r) {
      "use strict";

      const n = e("net"),
            i = e("debug")("mqttjs:tcp");

      t.exports = function (e, t) {
        t.port = t.port || 1883, t.hostname = t.hostname || t.host || "localhost";
        const r = t.port,
              o = t.hostname;
        return i("port %d and host %s", r, o), n.createConnection(r, o);
      };
    }, {
      debug: 18,
      net: 16
    }],
    4: [function (e, t, r) {
      "use strict";

      const n = e("tls"),
            i = e("net"),
            o = e("debug")("mqttjs:tls");

      t.exports = function (e, t) {
        t.port = t.port || 8883, t.host = t.hostname || t.host || "localhost", 0 === i.isIP(t.host) && (t.servername = t.host), t.rejectUnauthorized = !1 !== t.rejectUnauthorized, delete t.path, o("port %d host %s rejectUnauthorized %b", t.port, t.host, t.rejectUnauthorized);
        const r = n.connect(t);

        function s(n) {
          t.rejectUnauthorized && e.emit("error", n), r.end();
        }

        return r.on("secureConnect", function () {
          t.rejectUnauthorized && !r.authorized ? r.emit("error", new Error("TLS not authorized")) : r.removeListener("error", s);
        }), r.on("error", s), r;
      };
    }, {
      debug: 18,
      net: 16,
      tls: 16
    }],
    5: [function (e, t, r) {
      (function (r, n) {
        (function () {
          "use strict";

          const i = e("ws"),
                o = e("debug")("mqttjs:ws"),
                s = e("duplexify"),
                a = e("readable-stream").Transform,
                l = ["rejectUnauthorized", "ca", "cert", "key", "pfx", "passphrase"],
                u = void 0 !== r && "browser" === r.title || "function" == typeof __webpack_require__;

          function c(e, t) {
            let r = e.protocol + "://" + e.hostname + ":" + e.port + e.path;
            return "function" == typeof e.transformWsUrl && (r = e.transformWsUrl(r, e, t)), r;
          }

          function h(e) {
            const t = e;
            return e.hostname || (t.hostname = "localhost"), e.port || ("wss" === e.protocol ? t.port = 443 : t.port = 80), e.path || (t.path = "/"), e.wsOptions || (t.wsOptions = {}), u || "wss" !== e.protocol || l.forEach(function (r) {
              Object.prototype.hasOwnProperty.call(e, r) && !Object.prototype.hasOwnProperty.call(e.wsOptions, r) && (t.wsOptions[r] = e[r]);
            }), t;
          }

          t.exports = u ? function (e, t) {
            let r;
            o("browserStreamBuilder");

            const i = function (e) {
              const t = h(e);

              if (t.hostname || (t.hostname = t.host), !t.hostname) {
                if ("undefined" == typeof document) throw new Error("Could not determine host. Specify host manually.");
                const e = new URL(document.URL);
                t.hostname = e.hostname, t.port || (t.port = e.port);
              }

              return void 0 === t.objectMode && (t.objectMode = !(!0 === t.binary || void 0 === t.binary)), t;
            }(t).browserBufferSize || 524288,
                  l = t.browserBufferTimeout || 1e3,
                  u = !t.objectMode,
                  f = function (e, t) {
              const r = "MQIsdp" === t.protocolId && 3 === t.protocolVersion ? "mqttv3.1" : "mqtt",
                    n = c(t, e),
                    i = new WebSocket(n, [r]);
              return i.binaryType = "arraybuffer", i;
            }(e, t),
                  p = function (e, t, r) {
              const n = new a({
                objectModeMode: e.objectMode
              });
              return n._write = t, n._flush = r, n;
            }(t, function e(t, r, o) {
              f.bufferedAmount > i && setTimeout(e, l, t, r, o), u && "string" == typeof t && (t = n.from(t, "utf8"));

              try {
                f.send(t);
              } catch (e) {
                return o(e);
              }

              o();
            }, function (e) {
              f.close(), e();
            });

            t.objectMode || (p._writev = v), p.on("close", () => {
              f.close();
            });
            const d = void 0 !== f.addEventListener;

            function g() {
              r.setReadable(p), r.setWritable(p), r.emit("connect");
            }

            function y() {
              r.end(), r.destroy();
            }

            function b(e) {
              r.destroy(e);
            }

            function m(e) {
              let t = e.data;
              t = t instanceof ArrayBuffer ? n.from(t) : n.from(t, "utf8"), p.push(t);
            }

            function v(e, t) {
              const r = new Array(e.length);

              for (let t = 0; t < e.length; t++) "string" == typeof e[t].chunk ? r[t] = n.from(e[t], "utf8") : r[t] = e[t].chunk;

              this._write(n.concat(r), "binary", t);
            }

            return f.readyState === f.OPEN ? r = p : (r = r = s(void 0, void 0, t), t.objectMode || (r._writev = v), d ? f.addEventListener("open", g) : f.onopen = g), r.socket = f, d ? (f.addEventListener("close", y), f.addEventListener("error", b), f.addEventListener("message", m)) : (f.onclose = y, f.onerror = b, f.onmessage = m), r;
          } : function (e, t) {
            o("streamBuilder");

            const r = h(t),
                  n = c(r, e),
                  s = function (e, t, r) {
              o("createWebSocket"), o("protocol: " + r.protocolId + " " + r.protocolVersion);
              const n = "MQIsdp" === r.protocolId && 3 === r.protocolVersion ? "mqttv3.1" : "mqtt";
              return o("creating new Websocket for url: " + t + " and protocol: " + n), new i(t, [n], r.wsOptions);
            }(0, n, r),
                  a = i.createWebSocketStream(s, r.wsOptions);

            return a.url = n, s.on("close", () => {
              a.destroy();
            }), a;
          };
        }).call(this);
      }).call(this, e("_process"), e("buffer").Buffer);
    }, {
      _process: 50,
      buffer: 17,
      debug: 18,
      duplexify: 20,
      "readable-stream": 69,
      ws: 80
    }],
    6: [function (e, t, r) {
      (function (r) {
        (function () {
          "use strict";

          const n = e("readable-stream").Transform,
                i = e("duplexify");
          let o, s, a;

          t.exports = function (e, t) {
            if (t.hostname = t.hostname || t.host, !t.hostname) throw new Error("Could not determine host. Specify host manually.");
            const l = "MQIsdp" === t.protocolId && 3 === t.protocolVersion ? "mqttv3.1" : "mqtt";
            !function (e) {
              e.hostname || (e.hostname = "localhost"), e.path || (e.path = "/"), e.wsOptions || (e.wsOptions = {});
            }(t);

            const u = function (e, t) {
              const r = "wxs" === e.protocol ? "wss" : "ws";
              let n = r + "://" + e.hostname + e.path;
              return e.port && 80 !== e.port && 443 !== e.port && (n = r + "://" + e.hostname + ":" + e.port + e.path), "function" == typeof e.transformWsUrl && (n = e.transformWsUrl(n, e, t)), n;
            }(t, e);

            o = wx.connectSocket({
              url: u,
              protocols: [l]
            }), s = function () {
              const e = new n();
              return e._write = function (e, t, r) {
                o.send({
                  data: e.buffer,
                  success: function () {
                    r();
                  },
                  fail: function (e) {
                    r(new Error(e));
                  }
                });
              }, e._flush = function (e) {
                o.close({
                  success: function () {
                    e();
                  }
                });
              }, e;
            }(), (a = i.obj())._destroy = function (e, t) {
              o.close({
                success: function () {
                  t && t(e);
                }
              });
            };
            const c = a.destroy;
            return a.destroy = function () {
              a.destroy = c;
              const e = this;
              setTimeout(function () {
                o.close({
                  fail: function () {
                    e._destroy(new Error());
                  }
                });
              }, 0);
            }.bind(a), o.onOpen(function () {
              a.setReadable(s), a.setWritable(s), a.emit("connect");
            }), o.onMessage(function (e) {
              let t = e.data;
              t = t instanceof ArrayBuffer ? r.from(t) : r.from(t, "utf8"), s.push(t);
            }), o.onClose(function () {
              a.end(), a.destroy();
            }), o.onError(function (e) {
              a.destroy(new Error(e.errMsg));
            }), a;
          };
        }).call(this);
      }).call(this, e("buffer").Buffer);
    }, {
      buffer: 17,
      duplexify: 20,
      "readable-stream": 69
    }],
    7: [function (e, t, r) {
      "use strict";

      function n() {
        if (!(this instanceof n)) return new n();
        this.nextId = Math.max(1, Math.floor(65535 * Math.random()));
      }

      n.prototype.allocate = function () {
        const e = this.nextId++;
        return 65536 === this.nextId && (this.nextId = 1), e;
      }, n.prototype.getLastAllocated = function () {
        return 1 === this.nextId ? 65535 : this.nextId - 1;
      }, n.prototype.register = function (e) {
        return !0;
      }, n.prototype.deallocate = function (e) {}, n.prototype.clear = function () {}, t.exports = n;
    }, {}],
    8: [function (e, t, r) {
      "use strict";

      const n = e("xtend"),
            i = e("readable-stream").Readable,
            o = {
        objectMode: !0
      },
            s = {
        clean: !0
      };

      function a(e) {
        if (!(this instanceof a)) return new a(e);
        this.options = e || {}, this.options = n(s, e), this._inflights = new Map();
      }

      a.prototype.put = function (e, t) {
        return this._inflights.set(e.messageId, e), t && t(), this;
      }, a.prototype.createStream = function () {
        const e = new i(o),
              t = [];
        let r = !1,
            n = 0;
        return this._inflights.forEach(function (e, r) {
          t.push(e);
        }), e._read = function () {
          !r && n < t.length ? this.push(t[n++]) : this.push(null);
        }, e.destroy = function () {
          if (r) return;
          const e = this;
          r = !0, setTimeout(function () {
            e.emit("close");
          }, 0);
        }, e;
      }, a.prototype.del = function (e, t) {
        return (e = this._inflights.get(e.messageId)) ? (this._inflights.delete(e.messageId), t(null, e)) : t && t(new Error("missing packet")), this;
      }, a.prototype.get = function (e, t) {
        return (e = this._inflights.get(e.messageId)) ? t(null, e) : t && t(new Error("missing packet")), this;
      }, a.prototype.close = function (e) {
        this.options.clean && (this._inflights = null), e && e();
      }, t.exports = a;
    }, {
      "readable-stream": 69,
      xtend: 81
    }],
    9: [function (e, t, r) {
      "use strict";

      function n(e) {
        if (!(this instanceof n)) return new n(e);
        this.aliasToTopic = {}, this.max = e;
      }

      n.prototype.put = function (e, t) {
        return !(0 === t || t > this.max) && (this.aliasToTopic[t] = e, this.length = Object.keys(this.aliasToTopic).length, !0);
      }, n.prototype.getTopicByAlias = function (e) {
        return this.aliasToTopic[e];
      }, n.prototype.clear = function () {
        this.aliasToTopic = {};
      }, t.exports = n;
    }, {}],
    10: [function (e, t, r) {
      "use strict";

      const n = e("lru-cache"),
            i = e("number-allocator").NumberAllocator;

      function o(e) {
        if (!(this instanceof o)) return new o(e);
        e > 0 && (this.aliasToTopic = new n({
          max: e
        }), this.topicToAlias = {}, this.numberAllocator = new i(1, e), this.max = e, this.length = 0);
      }

      o.prototype.put = function (e, t) {
        if (0 === t || t > this.max) return !1;
        const r = this.aliasToTopic.get(t);
        return r && delete this.topicToAlias[r], this.aliasToTopic.set(t, e), this.topicToAlias[e] = t, this.numberAllocator.use(t), this.length = this.aliasToTopic.length, !0;
      }, o.prototype.getTopicByAlias = function (e) {
        return this.aliasToTopic.get(e);
      }, o.prototype.getAliasByTopic = function (e) {
        const t = this.topicToAlias[e];
        return void 0 !== t && this.aliasToTopic.get(t), t;
      }, o.prototype.clear = function () {
        this.aliasToTopic.reset(), this.topicToAlias = {}, this.numberAllocator.clear(), this.length = 0;
      }, o.prototype.getLruAlias = function () {
        const e = this.numberAllocator.firstVacant();
        return e || this.aliasToTopic.keys()[this.aliasToTopic.length - 1];
      }, t.exports = o;
    }, {
      "lru-cache": 37,
      "number-allocator": 46
    }],
    11: [function (e, t, r) {
      "use strict";

      function n(e) {
        const t = e.split("/");

        for (let e = 0; e < t.length; e++) if ("+" !== t[e]) {
          if ("#" === t[e]) return e === t.length - 1;
          if (-1 !== t[e].indexOf("+") || -1 !== t[e].indexOf("#")) return !1;
        }

        return !0;
      }

      t.exports = {
        validateTopics: function (e) {
          if (0 === e.length) return "empty_topic_list";

          for (let t = 0; t < e.length; t++) if (!n(e[t])) return e[t];

          return null;
        }
      };
    }, {}],
    12: [function (e, t, r) {
      (function (r) {
        (function () {
          "use strict";

          const n = e("../client"),
                i = e("../store"),
                o = e("url"),
                s = e("xtend"),
                a = e("debug")("mqttjs"),
                l = {};

          function u(e, t) {
            if (a("connecting to an MQTT broker..."), "object" != typeof e || t || (t = e, e = null), t = t || {}, e) {
              const r = o.parse(e, !0);
              if (null != r.port && (r.port = Number(r.port)), null === (t = s(r, t)).protocol) throw new Error("Missing protocol");
              t.protocol = t.protocol.replace(/:$/, "");
            }

            if (function (e) {
              let t;
              e.auth && ((t = e.auth.match(/^(.+):(.+)$/)) ? (e.username = t[1], e.password = t[2]) : e.username = e.auth);
            }(t), t.query && "string" == typeof t.query.clientId && (t.clientId = t.query.clientId), t.cert && t.key) {
              if (!t.protocol) throw new Error("Missing secure protocol key");
              if (-1 === ["mqtts", "wss", "wxs", "alis"].indexOf(t.protocol)) switch (t.protocol) {
                case "mqtt":
                  t.protocol = "mqtts";
                  break;

                case "ws":
                  t.protocol = "wss";
                  break;

                case "wx":
                  t.protocol = "wxs";
                  break;

                case "ali":
                  t.protocol = "alis";
                  break;

                default:
                  throw new Error('Unknown protocol for secure connection: "' + t.protocol + '"!');
              }
            }

            if (!l[t.protocol]) {
              const e = -1 !== ["mqtts", "wss"].indexOf(t.protocol);
              t.protocol = ["mqtt", "mqtts", "ws", "wss", "wx", "wxs", "ali", "alis"].filter(function (t, r) {
                return (!e || r % 2 != 0) && "function" == typeof l[t];
              })[0];
            }

            if (!1 === t.clean && !t.clientId) throw new Error("Missing clientId for unclean clients");
            t.protocol && (t.defaultProtocol = t.protocol);
            const r = new n(function (e) {
              return t.servers && (e._reconnectCount && e._reconnectCount !== t.servers.length || (e._reconnectCount = 0), t.host = t.servers[e._reconnectCount].host, t.port = t.servers[e._reconnectCount].port, t.protocol = t.servers[e._reconnectCount].protocol ? t.servers[e._reconnectCount].protocol : t.defaultProtocol, t.hostname = t.host, e._reconnectCount++), a("calling streambuilder for", t.protocol), l[t.protocol](e, t);
            }, t);
            return r.on("error", function () {}), r;
          }

          void 0 !== r && "browser" !== r.title || "function" != typeof __webpack_require__ ? (l.mqtt = e("./tcp"), l.tcp = e("./tcp"), l.ssl = e("./tls"), l.tls = e("./tls"), l.mqtts = e("./tls")) : (l.wx = e("./wx"), l.wxs = e("./wx"), l.ali = e("./ali"), l.alis = e("./ali")), l.ws = e("./ws"), l.wss = e("./ws"), t.exports = u, t.exports.connect = u, t.exports.MqttClient = n, t.exports.Store = i;
        }).call(this);
      }).call(this, e("_process"));
    }, {
      "../client": 1,
      "../store": 8,
      "./ali": 2,
      "./tcp": 3,
      "./tls": 4,
      "./ws": 5,
      "./wx": 6,
      _process: 50,
      debug: 18,
      url: 76,
      xtend: 81
    }],
    13: [function (e, t, r) {
      "use strict";

      r.byteLength = function (e) {
        var t = u(e),
            r = t[0],
            n = t[1];
        return 3 * (r + n) / 4 - n;
      }, r.toByteArray = function (e) {
        var t,
            r,
            n = u(e),
            s = n[0],
            a = n[1],
            l = new o(function (e, t, r) {
          return 3 * (t + r) / 4 - r;
        }(0, s, a)),
            c = 0,
            h = a > 0 ? s - 4 : s;

        for (r = 0; r < h; r += 4) t = i[e.charCodeAt(r)] << 18 | i[e.charCodeAt(r + 1)] << 12 | i[e.charCodeAt(r + 2)] << 6 | i[e.charCodeAt(r + 3)], l[c++] = t >> 16 & 255, l[c++] = t >> 8 & 255, l[c++] = 255 & t;

        2 === a && (t = i[e.charCodeAt(r)] << 2 | i[e.charCodeAt(r + 1)] >> 4, l[c++] = 255 & t);
        1 === a && (t = i[e.charCodeAt(r)] << 10 | i[e.charCodeAt(r + 1)] << 4 | i[e.charCodeAt(r + 2)] >> 2, l[c++] = t >> 8 & 255, l[c++] = 255 & t);
        return l;
      }, r.fromByteArray = function (e) {
        for (var t, r = e.length, i = r % 3, o = [], s = 0, a = r - i; s < a; s += 16383) o.push(c(e, s, s + 16383 > a ? a : s + 16383));

        1 === i ? (t = e[r - 1], o.push(n[t >> 2] + n[t << 4 & 63] + "==")) : 2 === i && (t = (e[r - 2] << 8) + e[r - 1], o.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "="));
        return o.join("");
      };

      for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, l = s.length; a < l; ++a) n[a] = s[a], i[s.charCodeAt(a)] = a;

      function u(e) {
        var t = e.length;
        if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var r = e.indexOf("=");
        return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4];
      }

      function c(e, t, r) {
        for (var i, o, s = [], a = t; a < r; a += 3) i = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), s.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);

        return s.join("");
      }

      i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
    }, {}],
    14: [function (e, t, r) {
      "use strict";

      const {
        Buffer: n
      } = e("buffer"),
            i = Symbol.for("BufferList");

      function o(e) {
        if (!(this instanceof o)) return new o(e);

        o._init.call(this, e);
      }

      o._init = function (e) {
        Object.defineProperty(this, i, {
          value: !0
        }), this._bufs = [], this.length = 0, e && this.append(e);
      }, o.prototype._new = function (e) {
        return new o(e);
      }, o.prototype._offset = function (e) {
        if (0 === e) return [0, 0];
        let t = 0;

        for (let r = 0; r < this._bufs.length; r++) {
          const n = t + this._bufs[r].length;
          if (e < n || r === this._bufs.length - 1) return [r, e - t];
          t = n;
        }
      }, o.prototype._reverseOffset = function (e) {
        const t = e[0];
        let r = e[1];

        for (let e = 0; e < t; e++) r += this._bufs[e].length;

        return r;
      }, o.prototype.get = function (e) {
        if (e > this.length || e < 0) return;

        const t = this._offset(e);

        return this._bufs[t[0]][t[1]];
      }, o.prototype.slice = function (e, t) {
        return "number" == typeof e && e < 0 && (e += this.length), "number" == typeof t && t < 0 && (t += this.length), this.copy(null, 0, e, t);
      }, o.prototype.copy = function (e, t, r, i) {
        if (("number" != typeof r || r < 0) && (r = 0), ("number" != typeof i || i > this.length) && (i = this.length), r >= this.length) return e || n.alloc(0);
        if (i <= 0) return e || n.alloc(0);

        const o = !!e,
              s = this._offset(r),
              a = i - r;

        let l = a,
            u = o && t || 0,
            c = s[1];

        if (0 === r && i === this.length) {
          if (!o) return 1 === this._bufs.length ? this._bufs[0] : n.concat(this._bufs, this.length);

          for (let t = 0; t < this._bufs.length; t++) this._bufs[t].copy(e, u), u += this._bufs[t].length;

          return e;
        }

        if (l <= this._bufs[s[0]].length - c) return o ? this._bufs[s[0]].copy(e, t, c, c + l) : this._bufs[s[0]].slice(c, c + l);
        o || (e = n.allocUnsafe(a));

        for (let t = s[0]; t < this._bufs.length; t++) {
          const r = this._bufs[t].length - c;

          if (!(l > r)) {
            this._bufs[t].copy(e, u, c, c + l), u += r;
            break;
          }

          this._bufs[t].copy(e, u, c), u += r, l -= r, c && (c = 0);
        }

        return e.length > u ? e.slice(0, u) : e;
      }, o.prototype.shallowSlice = function (e, t) {
        if (e = e || 0, t = "number" != typeof t ? this.length : t, e < 0 && (e += this.length), t < 0 && (t += this.length), e === t) return this._new();

        const r = this._offset(e),
              n = this._offset(t),
              i = this._bufs.slice(r[0], n[0] + 1);

        return 0 === n[1] ? i.pop() : i[i.length - 1] = i[i.length - 1].slice(0, n[1]), 0 !== r[1] && (i[0] = i[0].slice(r[1])), this._new(i);
      }, o.prototype.toString = function (e, t, r) {
        return this.slice(t, r).toString(e);
      }, o.prototype.consume = function (e) {
        if (e = Math.trunc(e), Number.isNaN(e) || e <= 0) return this;

        for (; this._bufs.length;) {
          if (!(e >= this._bufs[0].length)) {
            this._bufs[0] = this._bufs[0].slice(e), this.length -= e;
            break;
          }

          e -= this._bufs[0].length, this.length -= this._bufs[0].length, this._bufs.shift();
        }

        return this;
      }, o.prototype.duplicate = function () {
        const e = this._new();

        for (let t = 0; t < this._bufs.length; t++) e.append(this._bufs[t]);

        return e;
      }, o.prototype.append = function (e) {
        if (null == e) return this;
        if (e.buffer) this._appendBuffer(n.from(e.buffer, e.byteOffset, e.byteLength));else if (Array.isArray(e)) for (let t = 0; t < e.length; t++) this.append(e[t]);else if (this._isBufferList(e)) for (let t = 0; t < e._bufs.length; t++) this.append(e._bufs[t]);else "number" == typeof e && (e = e.toString()), this._appendBuffer(n.from(e));
        return this;
      }, o.prototype._appendBuffer = function (e) {
        this._bufs.push(e), this.length += e.length;
      }, o.prototype.indexOf = function (e, t, r) {
        if (void 0 === r && "string" == typeof t && (r = t, t = void 0), "function" == typeof e || Array.isArray(e)) throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
        if ("number" == typeof e ? e = n.from([e]) : "string" == typeof e ? e = n.from(e, r) : this._isBufferList(e) ? e = e.slice() : Array.isArray(e.buffer) ? e = n.from(e.buffer, e.byteOffset, e.byteLength) : n.isBuffer(e) || (e = n.from(e)), t = Number(t || 0), isNaN(t) && (t = 0), t < 0 && (t = this.length + t), t < 0 && (t = 0), 0 === e.length) return t > this.length ? this.length : t;

        const i = this._offset(t);

        let o = i[0],
            s = i[1];

        for (; o < this._bufs.length; o++) {
          const t = this._bufs[o];

          for (; s < t.length;) {
            if (t.length - s >= e.length) {
              const r = t.indexOf(e, s);
              if (-1 !== r) return this._reverseOffset([o, r]);
              s = t.length - e.length + 1;
            } else {
              const t = this._reverseOffset([o, s]);

              if (this._match(t, e)) return t;
              s++;
            }
          }

          s = 0;
        }

        return -1;
      }, o.prototype._match = function (e, t) {
        if (this.length - e < t.length) return !1;

        for (let r = 0; r < t.length; r++) if (this.get(e + r) !== t[r]) return !1;

        return !0;
      }, function () {
        const e = {
          readDoubleBE: 8,
          readDoubleLE: 8,
          readFloatBE: 4,
          readFloatLE: 4,
          readInt32BE: 4,
          readInt32LE: 4,
          readUInt32BE: 4,
          readUInt32LE: 4,
          readInt16BE: 2,
          readInt16LE: 2,
          readUInt16BE: 2,
          readUInt16LE: 2,
          readInt8: 1,
          readUInt8: 1,
          readIntBE: null,
          readIntLE: null,
          readUIntBE: null,
          readUIntLE: null
        };

        for (const t in e) !function (t) {
          o.prototype[t] = null === e[t] ? function (e, r) {
            return this.slice(e, e + r)[t](0, r);
          } : function (r = 0) {
            return this.slice(r, r + e[t])[t](0);
          };
        }(t);
      }(), o.prototype._isBufferList = function (e) {
        return e instanceof o || o.isBufferList(e);
      }, o.isBufferList = function (e) {
        return null != e && e[i];
      }, t.exports = o;
    }, {
      buffer: 17
    }],
    15: [function (e, t, r) {
      "use strict";

      const n = e("readable-stream").Duplex,
            i = e("inherits"),
            o = e("./BufferList");

      function s(e) {
        if (!(this instanceof s)) return new s(e);

        if ("function" == typeof e) {
          this._callback = e;

          const t = function (e) {
            this._callback && (this._callback(e), this._callback = null);
          }.bind(this);

          this.on("pipe", function (e) {
            e.on("error", t);
          }), this.on("unpipe", function (e) {
            e.removeListener("error", t);
          }), e = null;
        }

        o._init.call(this, e), n.call(this);
      }

      i(s, n), Object.assign(s.prototype, o.prototype), s.prototype._new = function (e) {
        return new s(e);
      }, s.prototype._write = function (e, t, r) {
        this._appendBuffer(e), "function" == typeof r && r();
      }, s.prototype._read = function (e) {
        if (!this.length) return this.push(null);
        e = Math.min(e, this.length), this.push(this.slice(0, e)), this.consume(e);
      }, s.prototype.end = function (e) {
        n.prototype.end.call(this, e), this._callback && (this._callback(null, this.slice()), this._callback = null);
      }, s.prototype._destroy = function (e, t) {
        this._bufs.length = 0, this.length = 0, t(e);
      }, s.prototype._isBufferList = function (e) {
        return e instanceof s || e instanceof o || s.isBufferList(e);
      }, s.isBufferList = o.isBufferList, t.exports = s, t.exports.BufferListStream = s, t.exports.BufferList = o;
    }, {
      "./BufferList": 14,
      inherits: 24,
      "readable-stream": 69
    }],
    16: [function (e, t, r) {}, {}],
    17: [function (e, t, r) {
      (function (t) {
        (function () {
          "use strict";

          var t = e("base64-js"),
              n = e("ieee754");
          r.Buffer = s, r.SlowBuffer = function (e) {
            +e != e && (e = 0);
            return s.alloc(+e);
          }, r.INSPECT_MAX_BYTES = 50;
          var i = 2147483647;

          function o(e) {
            if (e > i) throw new RangeError('The value "' + e + '" is invalid for option "size"');
            var t = new Uint8Array(e);
            return t.__proto__ = s.prototype, t;
          }

          function s(e, t, r) {
            if ("number" == typeof e) {
              if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
              return u(e);
            }

            return a(e, t, r);
          }

          function a(e, t, r) {
            if ("string" == typeof e) return function (e, t) {
              "string" == typeof t && "" !== t || (t = "utf8");
              if (!s.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
              var r = 0 | f(e, t),
                  n = o(r),
                  i = n.write(e, t);
              i !== r && (n = n.slice(0, i));
              return n;
            }(e, t);
            if (ArrayBuffer.isView(e)) return c(e);
            if (null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
            if (q(e, ArrayBuffer) || e && q(e.buffer, ArrayBuffer)) return function (e, t, r) {
              if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
              if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
              var n;
              n = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r);
              return n.__proto__ = s.prototype, n;
            }(e, t, r);
            if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
            var n = e.valueOf && e.valueOf();
            if (null != n && n !== e) return s.from(n, t, r);

            var i = function (e) {
              if (s.isBuffer(e)) {
                var t = 0 | h(e.length),
                    r = o(t);
                return 0 === r.length ? r : (e.copy(r, 0, 0, t), r);
              }

              if (void 0 !== e.length) return "number" != typeof e.length || D(e.length) ? o(0) : c(e);
              if ("Buffer" === e.type && Array.isArray(e.data)) return c(e.data);
            }(e);

            if (i) return i;
            if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return s.from(e[Symbol.toPrimitive]("string"), t, r);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
          }

          function l(e) {
            if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
            if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"');
          }

          function u(e) {
            return l(e), o(e < 0 ? 0 : 0 | h(e));
          }

          function c(e) {
            for (var t = e.length < 0 ? 0 : 0 | h(e.length), r = o(t), n = 0; n < t; n += 1) r[n] = 255 & e[n];

            return r;
          }

          function h(e) {
            if (e >= i) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
            return 0 | e;
          }

          function f(e, t) {
            if (s.isBuffer(e)) return e.length;
            if (ArrayBuffer.isView(e) || q(e, ArrayBuffer)) return e.byteLength;
            if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
            var r = e.length,
                n = arguments.length > 2 && !0 === arguments[2];
            if (!n && 0 === r) return 0;

            for (var i = !1;;) switch (t) {
              case "ascii":
              case "latin1":
              case "binary":
                return r;

              case "utf8":
              case "utf-8":
                return L(e).length;

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * r;

              case "hex":
                return r >>> 1;

              case "base64":
                return j(e).length;

              default:
                if (i) return n ? -1 : L(e).length;
                t = ("" + t).toLowerCase(), i = !0;
            }
          }

          function p(e, t, r) {
            var n = e[t];
            e[t] = e[r], e[r] = n;
          }

          function d(e, t, r, n, i) {
            if (0 === e.length) return -1;

            if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), D(r = +r) && (r = i ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
              if (i) return -1;
              r = e.length - 1;
            } else if (r < 0) {
              if (!i) return -1;
              r = 0;
            }

            if ("string" == typeof t && (t = s.from(t, n)), s.isBuffer(t)) return 0 === t.length ? -1 : g(e, t, r, n, i);
            if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : g(e, [t], r, n, i);
            throw new TypeError("val must be string, number or Buffer");
          }

          function g(e, t, r, n, i) {
            var o,
                s = 1,
                a = e.length,
                l = t.length;

            if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
              if (e.length < 2 || t.length < 2) return -1;
              s = 2, a /= 2, l /= 2, r /= 2;
            }

            function u(e, t) {
              return 1 === s ? e[t] : e.readUInt16BE(t * s);
            }

            if (i) {
              var c = -1;

              for (o = r; o < a; o++) if (u(e, o) === u(t, -1 === c ? 0 : o - c)) {
                if (-1 === c && (c = o), o - c + 1 === l) return c * s;
              } else -1 !== c && (o -= o - c), c = -1;
            } else for (r + l > a && (r = a - l), o = r; o >= 0; o--) {
              for (var h = !0, f = 0; f < l; f++) if (u(e, o + f) !== u(t, f)) {
                h = !1;
                break;
              }

              if (h) return o;
            }

            return -1;
          }

          function y(e, t, r, n) {
            r = Number(r) || 0;
            var i = e.length - r;
            n ? (n = Number(n)) > i && (n = i) : n = i;
            var o = t.length;
            n > o / 2 && (n = o / 2);

            for (var s = 0; s < n; ++s) {
              var a = parseInt(t.substr(2 * s, 2), 16);
              if (D(a)) return s;
              e[r + s] = a;
            }

            return s;
          }

          function b(e, t, r, n) {
            return U(L(t, e.length - r), e, r, n);
          }

          function m(e, t, r, n) {
            return U(function (e) {
              for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));

              return t;
            }(t), e, r, n);
          }

          function v(e, t, r, n) {
            return m(e, t, r, n);
          }

          function w(e, t, r, n) {
            return U(j(t), e, r, n);
          }

          function _(e, t, r, n) {
            return U(function (e, t) {
              for (var r, n, i, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) r = e.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);

              return o;
            }(t, e.length - r), e, r, n);
          }

          function k(e, r, n) {
            return 0 === r && n === e.length ? t.fromByteArray(e) : t.fromByteArray(e.slice(r, n));
          }

          function S(e, t, r) {
            r = Math.min(e.length, r);

            for (var n = [], i = t; i < r;) {
              var o,
                  s,
                  a,
                  l,
                  u = e[i],
                  c = null,
                  h = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
              if (i + h <= r) switch (h) {
                case 1:
                  u < 128 && (c = u);
                  break;

                case 2:
                  128 == (192 & (o = e[i + 1])) && (l = (31 & u) << 6 | 63 & o) > 127 && (c = l);
                  break;

                case 3:
                  o = e[i + 1], s = e[i + 2], 128 == (192 & o) && 128 == (192 & s) && (l = (15 & u) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (l < 55296 || l > 57343) && (c = l);
                  break;

                case 4:
                  o = e[i + 1], s = e[i + 2], a = e[i + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (l = (15 & u) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && l < 1114112 && (c = l);
              }
              null === c ? (c = 65533, h = 1) : c > 65535 && (c -= 65536, n.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), n.push(c), i += h;
            }

            return function (e) {
              var t = e.length;
              if (t <= E) return String.fromCharCode.apply(String, e);
              var r = "",
                  n = 0;

              for (; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += E));

              return r;
            }(n);
          }

          r.kMaxLength = i, s.TYPED_ARRAY_SUPPORT = function () {
            try {
              var e = new Uint8Array(1);
              return e.__proto__ = {
                __proto__: Uint8Array.prototype,
                foo: function () {
                  return 42;
                }
              }, 42 === e.foo();
            } catch (e) {
              return !1;
            }
          }(), s.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(s.prototype, "parent", {
            enumerable: !0,
            get: function () {
              if (s.isBuffer(this)) return this.buffer;
            }
          }), Object.defineProperty(s.prototype, "offset", {
            enumerable: !0,
            get: function () {
              if (s.isBuffer(this)) return this.byteOffset;
            }
          }), "undefined" != typeof Symbol && null != Symbol.species && s[Symbol.species] === s && Object.defineProperty(s, Symbol.species, {
            value: null,
            configurable: !0,
            enumerable: !1,
            writable: !1
          }), s.poolSize = 8192, s.from = function (e, t, r) {
            return a(e, t, r);
          }, s.prototype.__proto__ = Uint8Array.prototype, s.__proto__ = Uint8Array, s.alloc = function (e, t, r) {
            return function (e, t, r) {
              return l(e), e <= 0 ? o(e) : void 0 !== t ? "string" == typeof r ? o(e).fill(t, r) : o(e).fill(t) : o(e);
            }(e, t, r);
          }, s.allocUnsafe = function (e) {
            return u(e);
          }, s.allocUnsafeSlow = function (e) {
            return u(e);
          }, s.isBuffer = function (e) {
            return null != e && !0 === e._isBuffer && e !== s.prototype;
          }, s.compare = function (e, t) {
            if (q(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)), q(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)), !s.isBuffer(e) || !s.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (e === t) return 0;

            for (var r = e.length, n = t.length, i = 0, o = Math.min(r, n); i < o; ++i) if (e[i] !== t[i]) {
              r = e[i], n = t[i];
              break;
            }

            return r < n ? -1 : n < r ? 1 : 0;
          }, s.isEncoding = function (e) {
            switch (String(e).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return !0;

              default:
                return !1;
            }
          }, s.concat = function (e, t) {
            if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e.length) return s.alloc(0);
            var r;
            if (void 0 === t) for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
            var n = s.allocUnsafe(t),
                i = 0;

            for (r = 0; r < e.length; ++r) {
              var o = e[r];
              if (q(o, Uint8Array) && (o = s.from(o)), !s.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
              o.copy(n, i), i += o.length;
            }

            return n;
          }, s.byteLength = f, s.prototype._isBuffer = !0, s.prototype.swap16 = function () {
            var e = this.length;
            if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");

            for (var t = 0; t < e; t += 2) p(this, t, t + 1);

            return this;
          }, s.prototype.swap32 = function () {
            var e = this.length;
            if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");

            for (var t = 0; t < e; t += 4) p(this, t, t + 3), p(this, t + 1, t + 2);

            return this;
          }, s.prototype.swap64 = function () {
            var e = this.length;
            if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");

            for (var t = 0; t < e; t += 8) p(this, t, t + 7), p(this, t + 1, t + 6), p(this, t + 2, t + 5), p(this, t + 3, t + 4);

            return this;
          }, s.prototype.toString = function () {
            var e = this.length;
            return 0 === e ? "" : 0 === arguments.length ? S(this, 0, e) : function (e, t, r) {
              var n = !1;
              if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
              if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
              if ((r >>>= 0) <= (t >>>= 0)) return "";

              for (e || (e = "utf8");;) switch (e) {
                case "hex":
                  return x(this, t, r);

                case "utf8":
                case "utf-8":
                  return S(this, t, r);

                case "ascii":
                  return C(this, t, r);

                case "latin1":
                case "binary":
                  return T(this, t, r);

                case "base64":
                  return k(this, t, r);

                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return A(this, t, r);

                default:
                  if (n) throw new TypeError("Unknown encoding: " + e);
                  e = (e + "").toLowerCase(), n = !0;
              }
            }.apply(this, arguments);
          }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function (e) {
            if (!s.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === s.compare(this, e);
          }, s.prototype.inspect = function () {
            var e = "",
                t = r.INSPECT_MAX_BYTES;
            return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">";
          }, s.prototype.compare = function (e, t, r, n, i) {
            if (q(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)), !s.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
            if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), t < 0 || r > e.length || n < 0 || i > this.length) throw new RangeError("out of range index");
            if (n >= i && t >= r) return 0;
            if (n >= i) return -1;
            if (t >= r) return 1;
            if (t >>>= 0, r >>>= 0, n >>>= 0, i >>>= 0, this === e) return 0;

            for (var o = i - n, a = r - t, l = Math.min(o, a), u = this.slice(n, i), c = e.slice(t, r), h = 0; h < l; ++h) if (u[h] !== c[h]) {
              o = u[h], a = c[h];
              break;
            }

            return o < a ? -1 : a < o ? 1 : 0;
          }, s.prototype.includes = function (e, t, r) {
            return -1 !== this.indexOf(e, t, r);
          }, s.prototype.indexOf = function (e, t, r) {
            return d(this, e, t, r, !0);
          }, s.prototype.lastIndexOf = function (e, t, r) {
            return d(this, e, t, r, !1);
          }, s.prototype.write = function (e, t, r, n) {
            if (void 0 === t) n = "utf8", r = this.length, t = 0;else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;else {
              if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
              t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
            }
            var i = this.length - t;
            if ((void 0 === r || r > i) && (r = i), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");

            for (var o = !1;;) switch (n) {
              case "hex":
                return y(this, e, t, r);

              case "utf8":
              case "utf-8":
                return b(this, e, t, r);

              case "ascii":
                return m(this, e, t, r);

              case "latin1":
              case "binary":
                return v(this, e, t, r);

              case "base64":
                return w(this, e, t, r);

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return _(this, e, t, r);

              default:
                if (o) throw new TypeError("Unknown encoding: " + n);
                n = ("" + n).toLowerCase(), o = !0;
            }
          }, s.prototype.toJSON = function () {
            return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0)
            };
          };
          var E = 4096;

          function C(e, t, r) {
            var n = "";
            r = Math.min(e.length, r);

            for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);

            return n;
          }

          function T(e, t, r) {
            var n = "";
            r = Math.min(e.length, r);

            for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);

            return n;
          }

          function x(e, t, r) {
            var n = e.length;
            (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);

            for (var i = "", o = t; o < r; ++o) i += N(e[o]);

            return i;
          }

          function A(e, t, r) {
            for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);

            return i;
          }

          function I(e, t, r) {
            if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
            if (e + t > r) throw new RangeError("Trying to access beyond buffer length");
          }

          function P(e, t, r, n, i, o) {
            if (!s.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > i || t < o) throw new RangeError('"value" argument is out of bounds');
            if (r + n > e.length) throw new RangeError("Index out of range");
          }

          function O(e, t, r, n, i, o) {
            if (r + n > e.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("Index out of range");
          }

          function B(e, t, r, i, o) {
            return t = +t, r >>>= 0, o || O(e, 0, r, 4), n.write(e, t, r, i, 23, 4), r + 4;
          }

          function R(e, t, r, i, o) {
            return t = +t, r >>>= 0, o || O(e, 0, r, 8), n.write(e, t, r, i, 52, 8), r + 8;
          }

          s.prototype.slice = function (e, t) {
            var r = this.length;
            e = ~~e, t = void 0 === t ? r : ~~t, e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e);
            var n = this.subarray(e, t);
            return n.__proto__ = s.prototype, n;
          }, s.prototype.readUIntLE = function (e, t, r) {
            e >>>= 0, t >>>= 0, r || I(e, t, this.length);

            for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;

            return n;
          }, s.prototype.readUIntBE = function (e, t, r) {
            e >>>= 0, t >>>= 0, r || I(e, t, this.length);

            for (var n = this[e + --t], i = 1; t > 0 && (i *= 256);) n += this[e + --t] * i;

            return n;
          }, s.prototype.readUInt8 = function (e, t) {
            return e >>>= 0, t || I(e, 1, this.length), this[e];
          }, s.prototype.readUInt16LE = function (e, t) {
            return e >>>= 0, t || I(e, 2, this.length), this[e] | this[e + 1] << 8;
          }, s.prototype.readUInt16BE = function (e, t) {
            return e >>>= 0, t || I(e, 2, this.length), this[e] << 8 | this[e + 1];
          }, s.prototype.readUInt32LE = function (e, t) {
            return e >>>= 0, t || I(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
          }, s.prototype.readUInt32BE = function (e, t) {
            return e >>>= 0, t || I(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
          }, s.prototype.readIntLE = function (e, t, r) {
            e >>>= 0, t >>>= 0, r || I(e, t, this.length);

            for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;

            return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n;
          }, s.prototype.readIntBE = function (e, t, r) {
            e >>>= 0, t >>>= 0, r || I(e, t, this.length);

            for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256);) o += this[e + --n] * i;

            return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o;
          }, s.prototype.readInt8 = function (e, t) {
            return e >>>= 0, t || I(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
          }, s.prototype.readInt16LE = function (e, t) {
            e >>>= 0, t || I(e, 2, this.length);
            var r = this[e] | this[e + 1] << 8;
            return 32768 & r ? 4294901760 | r : r;
          }, s.prototype.readInt16BE = function (e, t) {
            e >>>= 0, t || I(e, 2, this.length);
            var r = this[e + 1] | this[e] << 8;
            return 32768 & r ? 4294901760 | r : r;
          }, s.prototype.readInt32LE = function (e, t) {
            return e >>>= 0, t || I(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
          }, s.prototype.readInt32BE = function (e, t) {
            return e >>>= 0, t || I(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
          }, s.prototype.readFloatLE = function (e, t) {
            return e >>>= 0, t || I(e, 4, this.length), n.read(this, e, !0, 23, 4);
          }, s.prototype.readFloatBE = function (e, t) {
            return e >>>= 0, t || I(e, 4, this.length), n.read(this, e, !1, 23, 4);
          }, s.prototype.readDoubleLE = function (e, t) {
            return e >>>= 0, t || I(e, 8, this.length), n.read(this, e, !0, 52, 8);
          }, s.prototype.readDoubleBE = function (e, t) {
            return e >>>= 0, t || I(e, 8, this.length), n.read(this, e, !1, 52, 8);
          }, s.prototype.writeUIntLE = function (e, t, r, n) {
            (e = +e, t >>>= 0, r >>>= 0, n) || P(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            var i = 1,
                o = 0;

            for (this[t] = 255 & e; ++o < r && (i *= 256);) this[t + o] = e / i & 255;

            return t + r;
          }, s.prototype.writeUIntBE = function (e, t, r, n) {
            (e = +e, t >>>= 0, r >>>= 0, n) || P(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            var i = r - 1,
                o = 1;

            for (this[t + i] = 255 & e; --i >= 0 && (o *= 256);) this[t + i] = e / o & 255;

            return t + r;
          }, s.prototype.writeUInt8 = function (e, t, r) {
            return e = +e, t >>>= 0, r || P(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1;
          }, s.prototype.writeUInt16LE = function (e, t, r) {
            return e = +e, t >>>= 0, r || P(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2;
          }, s.prototype.writeUInt16BE = function (e, t, r) {
            return e = +e, t >>>= 0, r || P(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2;
          }, s.prototype.writeUInt32LE = function (e, t, r) {
            return e = +e, t >>>= 0, r || P(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4;
          }, s.prototype.writeUInt32BE = function (e, t, r) {
            return e = +e, t >>>= 0, r || P(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4;
          }, s.prototype.writeIntLE = function (e, t, r, n) {
            if (e = +e, t >>>= 0, !n) {
              var i = Math.pow(2, 8 * r - 1);
              P(this, e, t, r, i - 1, -i);
            }

            var o = 0,
                s = 1,
                a = 0;

            for (this[t] = 255 & e; ++o < r && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;

            return t + r;
          }, s.prototype.writeIntBE = function (e, t, r, n) {
            if (e = +e, t >>>= 0, !n) {
              var i = Math.pow(2, 8 * r - 1);
              P(this, e, t, r, i - 1, -i);
            }

            var o = r - 1,
                s = 1,
                a = 0;

            for (this[t + o] = 255 & e; --o >= 0 && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;

            return t + r;
          }, s.prototype.writeInt8 = function (e, t, r) {
            return e = +e, t >>>= 0, r || P(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
          }, s.prototype.writeInt16LE = function (e, t, r) {
            return e = +e, t >>>= 0, r || P(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2;
          }, s.prototype.writeInt16BE = function (e, t, r) {
            return e = +e, t >>>= 0, r || P(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2;
          }, s.prototype.writeInt32LE = function (e, t, r) {
            return e = +e, t >>>= 0, r || P(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
          }, s.prototype.writeInt32BE = function (e, t, r) {
            return e = +e, t >>>= 0, r || P(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4;
          }, s.prototype.writeFloatLE = function (e, t, r) {
            return B(this, e, t, !0, r);
          }, s.prototype.writeFloatBE = function (e, t, r) {
            return B(this, e, t, !1, r);
          }, s.prototype.writeDoubleLE = function (e, t, r) {
            return R(this, e, t, !0, r);
          }, s.prototype.writeDoubleBE = function (e, t, r) {
            return R(this, e, t, !1, r);
          }, s.prototype.copy = function (e, t, r, n) {
            if (!s.isBuffer(e)) throw new TypeError("argument should be a Buffer");
            if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < r && (n = r), n === r) return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (t < 0) throw new RangeError("targetStart out of bounds");
            if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
            var i = n - r;
            if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(t, r, n);else if (this === e && r < t && t < n) for (var o = i - 1; o >= 0; --o) e[o + t] = this[o + r];else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
            return i;
          }, s.prototype.fill = function (e, t, r, n) {
            if ("string" == typeof e) {
              if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
              if ("string" == typeof n && !s.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);

              if (1 === e.length) {
                var i = e.charCodeAt(0);
                ("utf8" === n && i < 128 || "latin1" === n) && (e = i);
              }
            } else "number" == typeof e && (e &= 255);

            if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
            if (r <= t) return this;
            var o;
            if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e) for (o = t; o < r; ++o) this[o] = e;else {
              var a = s.isBuffer(e) ? e : s.from(e, n),
                  l = a.length;
              if (0 === l) throw new TypeError('The value "' + e + '" is invalid for argument "value"');

              for (o = 0; o < r - t; ++o) this[o + t] = a[o % l];
            }
            return this;
          };
          var M = /[^+/0-9A-Za-z-_]/g;

          function N(e) {
            return e < 16 ? "0" + e.toString(16) : e.toString(16);
          }

          function L(e, t) {
            var r;
            t = t || 1 / 0;

            for (var n = e.length, i = null, o = [], s = 0; s < n; ++s) {
              if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
                if (!i) {
                  if (r > 56319) {
                    (t -= 3) > -1 && o.push(239, 191, 189);
                    continue;
                  }

                  if (s + 1 === n) {
                    (t -= 3) > -1 && o.push(239, 191, 189);
                    continue;
                  }

                  i = r;
                  continue;
                }

                if (r < 56320) {
                  (t -= 3) > -1 && o.push(239, 191, 189), i = r;
                  continue;
                }

                r = 65536 + (i - 55296 << 10 | r - 56320);
              } else i && (t -= 3) > -1 && o.push(239, 191, 189);

              if (i = null, r < 128) {
                if ((t -= 1) < 0) break;
                o.push(r);
              } else if (r < 2048) {
                if ((t -= 2) < 0) break;
                o.push(r >> 6 | 192, 63 & r | 128);
              } else if (r < 65536) {
                if ((t -= 3) < 0) break;
                o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
              } else {
                if (!(r < 1114112)) throw new Error("Invalid code point");
                if ((t -= 4) < 0) break;
                o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
              }
            }

            return o;
          }

          function j(e) {
            return t.toByteArray(function (e) {
              if ((e = (e = e.split("=")[0]).trim().replace(M, "")).length < 2) return "";

              for (; e.length % 4 != 0;) e += "=";

              return e;
            }(e));
          }

          function U(e, t, r, n) {
            for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];

            return i;
          }

          function q(e, t) {
            return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name;
          }

          function D(e) {
            return e != e;
          }
        }).call(this);
      }).call(this, e("buffer").Buffer);
    }, {
      "base64-js": 13,
      buffer: 17,
      ieee754: 23
    }],
    18: [function (e, t, r) {
      (function (n) {
        (function () {
          r.formatArgs = function (e) {
            if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
            const r = "color: " + this.color;
            e.splice(1, 0, r, "color: inherit");
            let n = 0,
                i = 0;
            e[0].replace(/%[a-zA-Z%]/g, e => {
              "%%" !== e && "%c" === e && (i = ++n);
            }), e.splice(i, 0, r);
          }, r.save = function (e) {
            try {
              e ? r.storage.setItem("debug", e) : r.storage.removeItem("debug");
            } catch (e) {}
          }, r.load = function () {
            let e;

            try {
              e = r.storage.getItem("debug");
            } catch (e) {}

            !e && void 0 !== n && "env" in n && (e = n.env.DEBUG);
            return e;
          }, r.useColors = function () {
            if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
            if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
            return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
          }, r.storage = function () {
            try {
              return localStorage;
            } catch (e) {}
          }(), r.destroy = (() => {
            let e = !1;
            return () => {
              e || (e = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
            };
          })(), r.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], r.log = console.debug || console.log || (() => {}), t.exports = e("./common")(r);
          const {
            formatters: i
          } = t.exports;

          i.j = function (e) {
            try {
              return JSON.stringify(e);
            } catch (e) {
              return "[UnexpectedJSONParseError]: " + e.message;
            }
          };
        }).call(this);
      }).call(this, e("_process"));
    }, {
      "./common": 19,
      _process: 50
    }],
    19: [function (e, t, r) {
      t.exports = function (t) {
        function r(e) {
          let t,
              i,
              o,
              s = null;

          function a(...e) {
            if (!a.enabled) return;
            const n = a,
                  i = Number(new Date()),
                  o = i - (t || i);
            n.diff = o, n.prev = t, n.curr = i, t = i, e[0] = r.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
            let s = 0;
            e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, i) => {
              if ("%%" === t) return "%";
              s++;
              const o = r.formatters[i];

              if ("function" == typeof o) {
                const r = e[s];
                t = o.call(n, r), e.splice(s, 1), s--;
              }

              return t;
            }), r.formatArgs.call(n, e), (n.log || r.log).apply(n, e);
          }

          return a.namespace = e, a.useColors = r.useColors(), a.color = r.selectColor(e), a.extend = n, a.destroy = r.destroy, Object.defineProperty(a, "enabled", {
            enumerable: !0,
            configurable: !1,
            get: () => null !== s ? s : (i !== r.namespaces && (i = r.namespaces, o = r.enabled(e)), o),
            set: e => {
              s = e;
            }
          }), "function" == typeof r.init && r.init(a), a;
        }

        function n(e, t) {
          const n = r(this.namespace + (void 0 === t ? ":" : t) + e);
          return n.log = this.log, n;
        }

        function i(e) {
          return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*");
        }

        return r.debug = r, r.default = r, r.coerce = function (e) {
          return e instanceof Error ? e.stack || e.message : e;
        }, r.disable = function () {
          const e = [...r.names.map(i), ...r.skips.map(i).map(e => "-" + e)].join(",");
          return r.enable(""), e;
        }, r.enable = function (e) {
          let t;
          r.save(e), r.namespaces = e, r.names = [], r.skips = [];
          const n = ("string" == typeof e ? e : "").split(/[\s,]+/),
                i = n.length;

          for (t = 0; t < i; t++) n[t] && ("-" === (e = n[t].replace(/\*/g, ".*?"))[0] ? r.skips.push(new RegExp("^" + e.substr(1) + "$")) : r.names.push(new RegExp("^" + e + "$")));
        }, r.enabled = function (e) {
          if ("*" === e[e.length - 1]) return !0;
          let t, n;

          for (t = 0, n = r.skips.length; t < n; t++) if (r.skips[t].test(e)) return !1;

          for (t = 0, n = r.names.length; t < n; t++) if (r.names[t].test(e)) return !0;

          return !1;
        }, r.humanize = e("ms"), r.destroy = function () {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }, Object.keys(t).forEach(e => {
          r[e] = t[e];
        }), r.names = [], r.skips = [], r.formatters = {}, r.selectColor = function (e) {
          let t = 0;

          for (let r = 0; r < e.length; r++) t = (t << 5) - t + e.charCodeAt(r), t |= 0;

          return r.colors[Math.abs(t) % r.colors.length];
        }, r.enable(r.load()), r;
      };
    }, {
      ms: 45
    }],
    20: [function (e, t, r) {
      (function (r, n) {
        (function () {
          var i = e("readable-stream"),
              o = e("end-of-stream"),
              s = e("inherits"),
              a = e("stream-shift"),
              l = n.from && n.from !== Uint8Array.from ? n.from([0]) : new n([0]),
              u = function (e, t) {
            e._corked ? e.once("uncork", t) : t();
          },
              c = function (e, t) {
            return function (r) {
              r ? function (e, t) {
                e._autoDestroy && e.destroy(t);
              }(e, "premature close" === r.message ? null : r) : t && !e._ended && e.end();
            };
          },
              h = function () {},
              f = function (e, t, r) {
            if (!(this instanceof f)) return new f(e, t, r);
            i.Duplex.call(this, r), this._writable = null, this._readable = null, this._readable2 = null, this._autoDestroy = !r || !1 !== r.autoDestroy, this._forwardDestroy = !r || !1 !== r.destroy, this._forwardEnd = !r || !1 !== r.end, this._corked = 1, this._ondrain = null, this._drained = !1, this._forwarding = !1, this._unwrite = null, this._unread = null, this._ended = !1, this.destroyed = !1, e && this.setWritable(e), t && this.setReadable(t);
          };

          s(f, i.Duplex), f.obj = function (e, t, r) {
            return r || (r = {}), r.objectMode = !0, r.highWaterMark = 16, new f(e, t, r);
          }, f.prototype.cork = function () {
            1 == ++this._corked && this.emit("cork");
          }, f.prototype.uncork = function () {
            this._corked && 0 == --this._corked && this.emit("uncork");
          }, f.prototype.setWritable = function (e) {
            if (this._unwrite && this._unwrite(), this.destroyed) e && e.destroy && e.destroy();else if (null !== e && !1 !== e) {
              var t = this,
                  n = o(e, {
                writable: !0,
                readable: !1
              }, c(this, this._forwardEnd)),
                  i = function () {
                var e = t._ondrain;
                t._ondrain = null, e && e();
              };

              this._unwrite && r.nextTick(i), this._writable = e, this._writable.on("drain", i), this._unwrite = function () {
                t._writable.removeListener("drain", i), n();
              }, this.uncork();
            } else this.end();
          }, f.prototype.setReadable = function (e) {
            if (this._unread && this._unread(), this.destroyed) e && e.destroy && e.destroy();else {
              if (null === e || !1 === e) return this.push(null), void this.resume();

              var t,
                  r = this,
                  n = o(e, {
                writable: !1,
                readable: !0
              }, c(this)),
                  s = function () {
                r._forward();
              },
                  a = function () {
                r.push(null);
              };

              this._drained = !0, this._readable = e, this._readable2 = e._readableState ? e : (t = e, new i.Readable({
                objectMode: !0,
                highWaterMark: 16
              }).wrap(t)), this._readable2.on("readable", s), this._readable2.on("end", a), this._unread = function () {
                r._readable2.removeListener("readable", s), r._readable2.removeListener("end", a), n();
              }, this._forward();
            }
          }, f.prototype._read = function () {
            this._drained = !0, this._forward();
          }, f.prototype._forward = function () {
            if (!this._forwarding && this._readable2 && this._drained) {
              var e;

              for (this._forwarding = !0; this._drained && null !== (e = a(this._readable2));) this.destroyed || (this._drained = this.push(e));

              this._forwarding = !1;
            }
          }, f.prototype.destroy = function (e, t) {
            if (t || (t = h), this.destroyed) return t(null);
            this.destroyed = !0;
            var n = this;
            r.nextTick(function () {
              n._destroy(e), t(null);
            });
          }, f.prototype._destroy = function (e) {
            if (e) {
              var t = this._ondrain;
              this._ondrain = null, t ? t(e) : this.emit("error", e);
            }

            this._forwardDestroy && (this._readable && this._readable.destroy && this._readable.destroy(), this._writable && this._writable.destroy && this._writable.destroy()), this.emit("close");
          }, f.prototype._write = function (e, t, r) {
            if (!this.destroyed) return this._corked ? u(this, this._write.bind(this, e, t, r)) : e === l ? this._finish(r) : this._writable ? void (!1 === this._writable.write(e) ? this._ondrain = r : this.destroyed || r()) : r();
          }, f.prototype._finish = function (e) {
            var t = this;
            this.emit("preend"), u(this, function () {
              var r, n;
              r = t._forwardEnd && t._writable, n = function () {
                !1 === t._writableState.prefinished && (t._writableState.prefinished = !0), t.emit("prefinish"), u(t, e);
              }, r ? r._writableState && r._writableState.finished ? n() : r._writableState ? r.end(n) : (r.end(), n()) : n();
            });
          }, f.prototype.end = function (e, t, r) {
            return "function" == typeof e ? this.end(null, null, e) : "function" == typeof t ? this.end(e, null, t) : (this._ended = !0, e && this.write(e), this._writableState.ending || this._writableState.destroyed || this.write(l), i.Writable.prototype.end.call(this, r));
          }, t.exports = f;
        }).call(this);
      }).call(this, e("_process"), e("buffer").Buffer);
    }, {
      _process: 50,
      buffer: 17,
      "end-of-stream": 21,
      inherits: 24,
      "readable-stream": 69,
      "stream-shift": 74
    }],
    21: [function (e, t, r) {
      (function (r) {
        (function () {
          var n = e("once"),
              i = function () {},
              o = function (e, t, s) {
            if ("function" == typeof t) return o(e, null, t);
            t || (t = {}), s = n(s || i);

            var a = e._writableState,
                l = e._readableState,
                u = t.readable || !1 !== t.readable && e.readable,
                c = t.writable || !1 !== t.writable && e.writable,
                h = !1,
                f = function () {
              e.writable || p();
            },
                p = function () {
              c = !1, u || s.call(e);
            },
                d = function () {
              u = !1, c || s.call(e);
            },
                g = function (t) {
              s.call(e, t ? new Error("exited with error code: " + t) : null);
            },
                y = function (t) {
              s.call(e, t);
            },
                b = function () {
              r.nextTick(m);
            },
                m = function () {
              if (!h) return (!u || l && l.ended && !l.destroyed) && (!c || a && a.ended && !a.destroyed) ? void 0 : s.call(e, new Error("premature close"));
            },
                v = function () {
              e.req.on("finish", p);
            };

            return !function (e) {
              return e.setHeader && "function" == typeof e.abort;
            }(e) ? c && !a && (e.on("end", f), e.on("close", f)) : (e.on("complete", p), e.on("abort", b), e.req ? v() : e.on("request", v)), function (e) {
              return e.stdio && Array.isArray(e.stdio) && 3 === e.stdio.length;
            }(e) && e.on("exit", g), e.on("end", d), e.on("finish", p), !1 !== t.error && e.on("error", y), e.on("close", b), function () {
              h = !0, e.removeListener("complete", p), e.removeListener("abort", b), e.removeListener("request", v), e.req && e.req.removeListener("finish", p), e.removeListener("end", f), e.removeListener("close", f), e.removeListener("finish", p), e.removeListener("exit", g), e.removeListener("end", d), e.removeListener("error", y), e.removeListener("close", b);
            };
          };

          t.exports = o;
        }).call(this);
      }).call(this, e("_process"));
    }, {
      _process: 50,
      once: 48
    }],
    22: [function (e, t, r) {
      var n = Object.create || function (e) {
        var t = function () {};

        return t.prototype = e, new t();
      },
          i = Object.keys || function (e) {
        var t = [];

        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.push(r);

        return r;
      },
          o = Function.prototype.bind || function (e) {
        var t = this;
        return function () {
          return t.apply(e, arguments);
        };
      };

      function s() {
        this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = n(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
      }

      t.exports = s, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._maxListeners = void 0;
      var a,
          l = 10;

      try {
        var u = {};
        Object.defineProperty && Object.defineProperty(u, "x", {
          value: 0
        }), a = 0 === u.x;
      } catch (e) {
        a = !1;
      }

      function c(e) {
        return void 0 === e._maxListeners ? s.defaultMaxListeners : e._maxListeners;
      }

      function h(e, t, r, i) {
        var o, s, a;
        if ("function" != typeof r) throw new TypeError('"listener" argument must be a function');

        if ((s = e._events) ? (s.newListener && (e.emit("newListener", t, r.listener ? r.listener : r), s = e._events), a = s[t]) : (s = e._events = n(null), e._eventsCount = 0), a) {
          if ("function" == typeof a ? a = s[t] = i ? [r, a] : [a, r] : i ? a.unshift(r) : a.push(r), !a.warned && (o = c(e)) && o > 0 && a.length > o) {
            a.warned = !0;
            var l = new Error("Possible EventEmitter memory leak detected. " + a.length + ' "' + String(t) + '" listeners added. Use emitter.setMaxListeners() to increase limit.');
            l.name = "MaxListenersExceededWarning", l.emitter = e, l.type = t, l.count = a.length, "object" == typeof console && console.warn && console.warn("%s: %s", l.name, l.message);
          }
        } else a = s[t] = r, ++e._eventsCount;

        return e;
      }

      function f() {
        if (!this.fired) switch (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length) {
          case 0:
            return this.listener.call(this.target);

          case 1:
            return this.listener.call(this.target, arguments[0]);

          case 2:
            return this.listener.call(this.target, arguments[0], arguments[1]);

          case 3:
            return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);

          default:
            for (var e = new Array(arguments.length), t = 0; t < e.length; ++t) e[t] = arguments[t];

            this.listener.apply(this.target, e);
        }
      }

      function p(e, t, r) {
        var n = {
          fired: !1,
          wrapFn: void 0,
          target: e,
          type: t,
          listener: r
        },
            i = o.call(f, n);
        return i.listener = r, n.wrapFn = i, i;
      }

      function d(e, t, r) {
        var n = e._events;
        if (!n) return [];
        var i = n[t];
        return i ? "function" == typeof i ? r ? [i.listener || i] : [i] : r ? function (e) {
          for (var t = new Array(e.length), r = 0; r < t.length; ++r) t[r] = e[r].listener || e[r];

          return t;
        }(i) : y(i, i.length) : [];
      }

      function g(e) {
        var t = this._events;

        if (t) {
          var r = t[e];
          if ("function" == typeof r) return 1;
          if (r) return r.length;
        }

        return 0;
      }

      function y(e, t) {
        for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];

        return r;
      }

      a ? Object.defineProperty(s, "defaultMaxListeners", {
        enumerable: !0,
        get: function () {
          return l;
        },
        set: function (e) {
          if ("number" != typeof e || e < 0 || e != e) throw new TypeError('"defaultMaxListeners" must be a positive number');
          l = e;
        }
      }) : s.defaultMaxListeners = l, s.prototype.setMaxListeners = function (e) {
        if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');
        return this._maxListeners = e, this;
      }, s.prototype.getMaxListeners = function () {
        return c(this);
      }, s.prototype.emit = function (e) {
        var t,
            r,
            n,
            i,
            o,
            s,
            a = "error" === e;
        if (s = this._events) a = a && null == s.error;else if (!a) return !1;

        if (a) {
          if (arguments.length > 1 && (t = arguments[1]), t instanceof Error) throw t;
          var l = new Error('Unhandled "error" event. (' + t + ")");
          throw l.context = t, l;
        }

        if (!(r = s[e])) return !1;
        var u = "function" == typeof r;

        switch (n = arguments.length) {
          case 1:
            !function (e, t, r) {
              if (t) e.call(r);else for (var n = e.length, i = y(e, n), o = 0; o < n; ++o) i[o].call(r);
            }(r, u, this);
            break;

          case 2:
            !function (e, t, r, n) {
              if (t) e.call(r, n);else for (var i = e.length, o = y(e, i), s = 0; s < i; ++s) o[s].call(r, n);
            }(r, u, this, arguments[1]);
            break;

          case 3:
            !function (e, t, r, n, i) {
              if (t) e.call(r, n, i);else for (var o = e.length, s = y(e, o), a = 0; a < o; ++a) s[a].call(r, n, i);
            }(r, u, this, arguments[1], arguments[2]);
            break;

          case 4:
            !function (e, t, r, n, i, o) {
              if (t) e.call(r, n, i, o);else for (var s = e.length, a = y(e, s), l = 0; l < s; ++l) a[l].call(r, n, i, o);
            }(r, u, this, arguments[1], arguments[2], arguments[3]);
            break;

          default:
            for (i = new Array(n - 1), o = 1; o < n; o++) i[o - 1] = arguments[o];

            !function (e, t, r, n) {
              if (t) e.apply(r, n);else for (var i = e.length, o = y(e, i), s = 0; s < i; ++s) o[s].apply(r, n);
            }(r, u, this, i);
        }

        return !0;
      }, s.prototype.addListener = function (e, t) {
        return h(this, e, t, !1);
      }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function (e, t) {
        return h(this, e, t, !0);
      }, s.prototype.once = function (e, t) {
        if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
        return this.on(e, p(this, e, t)), this;
      }, s.prototype.prependOnceListener = function (e, t) {
        if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
        return this.prependListener(e, p(this, e, t)), this;
      }, s.prototype.removeListener = function (e, t) {
        var r, i, o, s, a;
        if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
        if (!(i = this._events)) return this;
        if (!(r = i[e])) return this;
        if (r === t || r.listener === t) 0 == --this._eventsCount ? this._events = n(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, r.listener || t));else if ("function" != typeof r) {
          for (o = -1, s = r.length - 1; s >= 0; s--) if (r[s] === t || r[s].listener === t) {
            a = r[s].listener, o = s;
            break;
          }

          if (o < 0) return this;
          0 === o ? r.shift() : function (e, t) {
            for (var r = t, n = r + 1, i = e.length; n < i; r += 1, n += 1) e[r] = e[n];

            e.pop();
          }(r, o), 1 === r.length && (i[e] = r[0]), i.removeListener && this.emit("removeListener", e, a || t);
        }
        return this;
      }, s.prototype.removeAllListeners = function (e) {
        var t, r, o;
        if (!(r = this._events)) return this;
        if (!r.removeListener) return 0 === arguments.length ? (this._events = n(null), this._eventsCount = 0) : r[e] && (0 == --this._eventsCount ? this._events = n(null) : delete r[e]), this;

        if (0 === arguments.length) {
          var s,
              a = i(r);

          for (o = 0; o < a.length; ++o) "removeListener" !== (s = a[o]) && this.removeAllListeners(s);

          return this.removeAllListeners("removeListener"), this._events = n(null), this._eventsCount = 0, this;
        }

        if ("function" == typeof (t = r[e])) this.removeListener(e, t);else if (t) for (o = t.length - 1; o >= 0; o--) this.removeListener(e, t[o]);
        return this;
      }, s.prototype.listeners = function (e) {
        return d(this, e, !0);
      }, s.prototype.rawListeners = function (e) {
        return d(this, e, !1);
      }, s.listenerCount = function (e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : g.call(e, t);
      }, s.prototype.listenerCount = g, s.prototype.eventNames = function () {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
      };
    }, {}],
    23: [function (e, t, r) {
      r.read = function (e, t, r, n, i) {
        var o,
            s,
            a = 8 * i - n - 1,
            l = (1 << a) - 1,
            u = l >> 1,
            c = -7,
            h = r ? i - 1 : 0,
            f = r ? -1 : 1,
            p = e[t + h];

        for (h += f, o = p & (1 << -c) - 1, p >>= -c, c += a; c > 0; o = 256 * o + e[t + h], h += f, c -= 8);

        for (s = o & (1 << -c) - 1, o >>= -c, c += n; c > 0; s = 256 * s + e[t + h], h += f, c -= 8);

        if (0 === o) o = 1 - u;else {
          if (o === l) return s ? NaN : 1 / 0 * (p ? -1 : 1);
          s += Math.pow(2, n), o -= u;
        }
        return (p ? -1 : 1) * s * Math.pow(2, o - n);
      }, r.write = function (e, t, r, n, i, o) {
        var s,
            a,
            l,
            u = 8 * o - i - 1,
            c = (1 << u) - 1,
            h = c >> 1,
            f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = n ? 0 : o - 1,
            d = n ? 1 : -1,
            g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;

        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = c) : (s = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), (t += s + h >= 1 ? f / l : f * Math.pow(2, 1 - h)) * l >= 2 && (s++, l /= 2), s + h >= c ? (a = 0, s = c) : s + h >= 1 ? (a = (t * l - 1) * Math.pow(2, i), s += h) : (a = t * Math.pow(2, h - 1) * Math.pow(2, i), s = 0)); i >= 8; e[r + p] = 255 & a, p += d, a /= 256, i -= 8);

        for (s = s << i | a, u += i; u > 0; e[r + p] = 255 & s, p += d, s /= 256, u -= 8);

        e[r + p - d] |= 128 * g;
      };
    }, {}],
    24: [function (e, t, r) {
      "function" == typeof Object.create ? t.exports = function (e, t) {
        t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }));
      } : t.exports = function (e, t) {
        if (t) {
          e.super_ = t;

          var r = function () {};

          r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e;
        }
      };
    }, {}],
    25: [function (e, t, r) {
      "use strict";

      Object.defineProperty(r, "__esModule", {
        value: !0
      });

      var n = function () {
        function e(e, t) {
          this.color = !0, this.key = void 0, this.value = void 0, this.parent = void 0, this.brother = void 0, this.leftChild = void 0, this.rightChild = void 0, this.key = e, this.value = t;
        }

        return e.prototype.rotateLeft = function () {
          var e = this.parent,
              t = this.brother,
              r = this.leftChild,
              n = this.rightChild;
          if (!n) throw new Error("unknown error");
          var i = n.leftChild,
              o = n.rightChild;
          return e && (e.leftChild === this ? e.leftChild = n : e.rightChild === this && (e.rightChild = n)), n.parent = e, n.brother = t, n.leftChild = this, n.rightChild = o, t && (t.brother = n), this.parent = n, this.brother = o, this.leftChild = r, this.rightChild = i, o && (o.parent = n, o.brother = this), r && (r.parent = this, r.brother = i), i && (i.parent = this, i.brother = r), n;
        }, e.prototype.rotateRight = function () {
          var e = this.parent,
              t = this.brother,
              r = this.leftChild;
          if (!r) throw new Error("unknown error");
          var n = this.rightChild,
              i = r.leftChild,
              o = r.rightChild;
          return e && (e.leftChild === this ? e.leftChild = r : e.rightChild === this && (e.rightChild = r)), r.parent = e, r.brother = t, r.leftChild = i, r.rightChild = this, t && (t.brother = r), i && (i.parent = r, i.brother = this), this.parent = r, this.brother = i, this.leftChild = o, this.rightChild = n, o && (o.parent = this, o.brother = n), n && (n.parent = this, n.brother = o), r;
        }, e.prototype.remove = function () {
          if (this.leftChild || this.rightChild) throw new Error("can only remove leaf node");
          this.parent && (this === this.parent.leftChild ? this.parent.leftChild = void 0 : this === this.parent.rightChild && (this.parent.rightChild = void 0)), this.brother && (this.brother.brother = void 0), this.key = void 0, this.value = void 0, this.parent = void 0, this.brother = void 0;
        }, e.TreeNodeColorType = {
          red: !0,
          black: !1
        }, e;
      }();

      Object.freeze(n), r.default = n;
    }, {}],
    26: [function (e, t, r) {
      "use strict";

      var n = this && this.__generator || function (e, t) {
        var r,
            n,
            i,
            o,
            s = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this;
        }), o;

        function a(o) {
          return function (a) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");

              for (; s;) try {
                if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;

                switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;

                  case 4:
                    return s.label++, {
                      value: o[1],
                      done: !1
                    };

                  case 5:
                    s.label++, n = o[1], o = [0];
                    continue;

                  case 7:
                    o = s.ops.pop(), s.trys.pop();
                    continue;

                  default:
                    if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      s = 0;
                      continue;
                    }

                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      s.label = o[1];
                      break;
                    }

                    if (6 === o[0] && s.label < i[1]) {
                      s.label = i[1], i = o;
                      break;
                    }

                    if (i && s.label < i[2]) {
                      s.label = i[2], s.ops.push(o);
                      break;
                    }

                    i[2] && s.ops.pop(), s.trys.pop();
                    continue;
                }

                o = t.call(e, s);
              } catch (e) {
                o = [6, e], n = 0;
              } finally {
                r = i = 0;
              }

              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([o, a]);
          };
        }
      };

      function i(e) {
        var t = this;
        void 0 === e && (e = []);
        var r = [],
            o = 0,
            s = 0,
            a = 0,
            l = 0,
            u = 0,
            c = 0;
        this.size = function () {
          return c;
        }, this.empty = function () {
          return 0 === c;
        }, this.clear = function () {
          o = a = s = l = u = c = 0, f.call(this, i.bucketSize), c = 0;
        }, this.front = function () {
          return r[o][s];
        }, this.back = function () {
          return r[a][l];
        }, this.forEach = function (e) {
          if (!this.empty()) {
            var t = 0;

            if (o !== a) {
              for (u = s; u < i.bucketSize; ++u) e(r[o][u], t++);

              for (u = o + 1; u < a; ++u) for (var n = 0; n < i.bucketSize; ++n) e(r[u][n], t++);

              for (u = 0; u <= l; ++u) e(r[a][u], t++);
            } else for (var u = s; u <= l; ++u) e(r[o][u], t++);
          }
        };

        var h = function (e) {
          var t = o * i.bucketSize + s,
              r = t + e,
              n = a * i.bucketSize + l;
          if (r < t || r > n) throw new Error("pos should more than 0 and less than queue's size");
          return {
            curNodeBucketIndex: Math.floor(r / i.bucketSize),
            curNodePointerIndex: r % i.bucketSize
          };
        };

        this.getElementByPos = function (e) {
          var t = h(e),
              n = t.curNodeBucketIndex,
              i = t.curNodePointerIndex;
          return r[n][i];
        }, this.eraseElementByPos = function (e) {
          var t = this;
          if (e < 0 || e > c) throw new Error("pos should more than 0 and less than queue's size");
          if (0 === e) this.popFront();else if (e === this.size()) this.popBack();else {
            for (var r = [], n = e + 1; n < c; ++n) r.push(this.getElementByPos(n));

            this.cut(e), this.popBack(), r.forEach(function (e) {
              return t.pushBack(e);
            });
          }
        }, this.eraseElementByValue = function (e) {
          if (!this.empty()) {
            var t = [];
            this.forEach(function (r) {
              r !== e && t.push(r);
            });

            for (var r = t.length, n = 0; n < r; ++n) this.setElementByPos(n, t[n]);

            this.cut(r - 1);
          }
        };

        var f = function (e) {
          for (var t = [], n = e * i.sigma, h = Math.max(Math.ceil(n / i.bucketSize), 2), f = 0; f < h; ++f) t.push(new Array(i.bucketSize));

          var p = Math.ceil(e / i.bucketSize),
              d = Math.floor(h / 2) - Math.floor(p / 2),
              g = d,
              y = 0;
          if (this.size()) for (f = 0; f < p; ++f) {
            for (var b = 0; b < i.bucketSize; ++b) if (t[d + f][b] = this.front(), this.popFront(), this.empty()) {
              g = d + f, y = b;
              break;
            }

            if (this.empty()) break;
          }
          r = t, o = d, s = 0, a = g, l = y, u = h, c = e;
        };

        this.pushBack = function (e) {
          this.empty() || (a === u - 1 && l === i.bucketSize - 1 && f.call(this, this.size()), l < i.bucketSize - 1 ? ++l : a < u - 1 && (++a, l = 0)), ++c, r[a][l] = e;
        }, this.popBack = function () {
          this.empty() || (1 !== this.size() && (l > 0 ? --l : o < a && (--a, l = i.bucketSize - 1)), c > 0 && --c);
        }, this.setElementByPos = function (e, t) {
          var n = h(e),
              i = n.curNodeBucketIndex,
              o = n.curNodePointerIndex;
          r[i][o] = t;
        }, this.insert = function (e, t, r) {
          var n = this;
          if (void 0 === r && (r = 1), 0 === e) for (; r--;) this.pushFront(t);else if (e === this.size()) for (; r--;) this.pushBack(t);else {
            for (var i = [], o = e; o < c; ++o) i.push(this.getElementByPos(o));

            this.cut(e - 1);

            for (o = 0; o < r; ++o) this.pushBack(t);

            i.forEach(function (e) {
              return n.pushBack(e);
            });
          }
        }, this.find = function (e) {
          if (o === a) {
            for (var t = s; t <= l; ++t) if (r[o][t] === e) return !0;

            return !1;
          }

          for (t = s; t < i.bucketSize; ++t) if (r[o][t] === e) return !0;

          for (t = o + 1; t < a; ++t) for (var n = 0; n < i.bucketSize; ++n) if (r[t][n] === e) return !0;

          for (t = 0; t <= l; ++t) if (r[a][t] === e) return !0;

          return !1;
        }, this.reverse = function () {
          for (var e = 0, t = c - 1; e < t;) {
            var r = this.getElementByPos(e);
            this.setElementByPos(e, this.getElementByPos(t)), this.setElementByPos(t, r), ++e, --t;
          }
        }, this.unique = function () {
          if (!this.empty()) {
            var e = [],
                t = this.front();
            this.forEach(function (r, n) {
              0 !== n && r === t || (e.push(r), t = r);
            });

            for (var r = 0; r < c; ++r) this.setElementByPos(r, e[r]);

            this.cut(e.length - 1);
          }
        }, this.sort = function (e) {
          var t = [];
          this.forEach(function (e) {
            t.push(e);
          }), t.sort(e);

          for (var r = 0; r < c; ++r) this.setElementByPos(r, t[r]);
        }, this.pushFront = function (e) {
          this.empty() || (0 === o && 0 === s && f.call(this, this.size()), s > 0 ? --s : o > 0 && (--o, s = i.bucketSize - 1)), ++c, r[o][s] = e;
        }, this.popFront = function () {
          this.empty() || (1 !== this.size() && (s < i.bucketSize - 1 ? ++s : o < a && (++o, s = 0)), c > 0 && --c);
        }, this.shrinkToFit = function () {
          var e = this,
              t = [];
          this.forEach(function (e) {
            t.push(e);
          });
          var n = t.length;
          r = [];

          for (var o = Math.ceil(n / i.bucketSize), s = 0; s < o; ++s) r.push(new Array(i.bucketSize));

          this.clear(), t.forEach(function (t) {
            return e.pushBack(t);
          });
        }, this.cut = function (e) {
          if (e < 0) this.clear();else {
            var t = h(e),
                r = t.curNodeBucketIndex,
                n = t.curNodePointerIndex;
            a = r, l = n, c = e + 1;
          }
        }, this[Symbol.iterator] = function () {
          return function () {
            var e, t;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  if (0 === c) return [2];
                  if (o !== a) return [3, 5];
                  t = s, n.label = 1;

                case 1:
                  return t <= l ? [4, r[o][t]] : [3, 4];

                case 2:
                  n.sent(), n.label = 3;

                case 3:
                  return ++t, [3, 1];

                case 4:
                  return [2];

                case 5:
                  t = s, n.label = 6;

                case 6:
                  return t < i.bucketSize ? [4, r[o][t]] : [3, 9];

                case 7:
                  n.sent(), n.label = 8;

                case 8:
                  return ++t, [3, 6];

                case 9:
                  t = o + 1, n.label = 10;

                case 10:
                  if (!(t < a)) return [3, 15];
                  e = 0, n.label = 11;

                case 11:
                  return e < i.bucketSize ? [4, r[t][e]] : [3, 14];

                case 12:
                  n.sent(), n.label = 13;

                case 13:
                  return ++e, [3, 11];

                case 14:
                  return ++t, [3, 10];

                case 15:
                  t = 0, n.label = 16;

                case 16:
                  return t <= l ? [4, r[a][t]] : [3, 19];

                case 17:
                  n.sent(), n.label = 18;

                case 18:
                  return ++t, [3, 16];

                case 19:
                  return [2];
              }
            });
          }();
        }, function () {
          var n = i.bucketSize;
          e.size ? n = e.size() : e.length && (n = e.length);
          var s = n * i.sigma;
          u = Math.ceil(s / i.bucketSize), u = Math.max(u, 3);

          for (var l = 0; l < u; ++l) r.push(new Array(i.bucketSize));

          var c = Math.ceil(n / i.bucketSize);
          o = Math.floor(u / 2) - Math.floor(c / 2), a = o, e.forEach(function (e) {
            return t.pushBack(e);
          });
        }(), Object.freeze(this);
      }

      Object.defineProperty(r, "__esModule", {
        value: !0
      }), i.sigma = 3, i.bucketSize = 5e3, Object.freeze(i), r.default = i;
    }, {}],
    27: [function (e, t, r) {
      "use strict";

      var n = this && this.__generator || function (e, t) {
        var r,
            n,
            i,
            o,
            s = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this;
        }), o;

        function a(o) {
          return function (a) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");

              for (; s;) try {
                if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;

                switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;

                  case 4:
                    return s.label++, {
                      value: o[1],
                      done: !1
                    };

                  case 5:
                    s.label++, n = o[1], o = [0];
                    continue;

                  case 7:
                    o = s.ops.pop(), s.trys.pop();
                    continue;

                  default:
                    if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      s = 0;
                      continue;
                    }

                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      s.label = o[1];
                      break;
                    }

                    if (6 === o[0] && s.label < i[1]) {
                      s.label = i[1], i = o;
                      break;
                    }

                    if (i && s.label < i[2]) {
                      s.label = i[2], s.ops.push(o);
                      break;
                    }

                    i[2] && s.ops.pop(), s.trys.pop();
                    continue;
                }

                o = t.call(e, s);
              } catch (e) {
                o = [6, e], n = 0;
              } finally {
                r = i = 0;
              }

              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([o, a]);
          };
        }
      },
          i = this && this.__values || function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0;
        if (r) return r.call(e);
        if (e && "number" == typeof e.length) return {
          next: function () {
            return e && n >= e.length && (e = void 0), {
              value: e && e[n++],
              done: !e
            };
          }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };

      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var o = e("../LinkList/LinkList"),
          s = e("../Map/Map");

      function a(e, t, r) {
        var l = this;
        if (void 0 === e && (e = []), void 0 === t && (t = a.initSize), r = r || function (e) {
          var t,
              r,
              n = 0,
              o = "";
          if ("number" == typeof e) n = ((n = Math.floor(e)) << 5) - n, n &= n;else {
            o = "string" != typeof e ? JSON.stringify(e) : e;

            try {
              for (var s = i(o), a = s.next(); !a.done; a = s.next()) {
                n = (n << 5) - n + a.value.charCodeAt(0), n &= n;
              }
            } catch (e) {
              t = {
                error: e
              };
            } finally {
              try {
                a && !a.done && (r = s.return) && r.call(s);
              } finally {
                if (t) throw t.error;
              }
            }
          }
          return n ^= n >>> 16;
        }, 0 != (t & t - 1)) throw new Error("initBucketNum must be 2 to the power of n");
        var u = 0,
            c = [],
            h = Math.max(a.initSize, Math.min(a.maxSize, t));
        this.size = function () {
          return u;
        }, this.empty = function () {
          return 0 === u;
        }, this.clear = function () {
          u = 0, h = t, c = [];
        }, this.forEach = function (e) {
          var t = 0;
          c.forEach(function (r) {
            r.forEach(function (r) {
              e(r, t++);
            });
          });
        };
        this.setElement = function (e, t) {
          var n, l;
          if (null === e || void 0 === e) throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");

          if (null !== t && void 0 !== t) {
            var f = r(e) & h - 1;

            if (c[f]) {
              var p = c[f].size();

              if (c[f] instanceof o.default) {
                try {
                  for (var d = i(c[f]), g = d.next(); !g.done; g = d.next()) {
                    var y = g.value;
                    if (y.key === e) return void (y.value = t);
                  }
                } catch (e) {
                  n = {
                    error: e
                  };
                } finally {
                  try {
                    g && !g.done && (l = d.return) && l.call(d);
                  } finally {
                    if (n) throw n.error;
                  }
                }

                c[f].pushBack({
                  key: e,
                  value: t
                }), c[f].size() >= a.treeifyThreshold && (c[f] = new s.default(c[f]));
              } else c[f].setElement(e, t);

              var b = c[f].size();
              u += b - p;
            } else ++u, c[f] = new o.default([{
              key: e,
              value: t
            }]);

            u > h * a.sigma && function (e) {
              if (!(e >= a.maxSize)) {
                h = 2 * e;
                var t = [];
                c.forEach(function (n, i) {
                  if (!n.empty()) {
                    if (n instanceof o.default && 1 === n.size()) {
                      var l = n.front(),
                          u = l.key,
                          f = l.value;
                      t[r(u) & h - 1] = new o.default([{
                        key: u,
                        value: f
                      }]);
                    } else if (n instanceof s.default) {
                      var p = new o.default(),
                          d = new o.default();
                      n.forEach(function (t) {
                        0 == (r(t.key) & e) ? p.pushBack(t) : d.pushBack(t);
                      }), p.size() > a.untreeifyThreshold ? t[i] = new s.default(p) : p.size() && (t[i] = p), d.size() > a.untreeifyThreshold ? t[i + e] = new s.default(d) : d.size() && (t[i + e] = d);
                    } else {
                      var g = new o.default(),
                          y = new o.default();
                      n.forEach(function (t) {
                        0 == (r(t.key) & e) ? g.pushBack(t) : y.pushBack(t);
                      }), g.size() && (t[i] = g), y.size() && (t[i + e] = y);
                    }

                    c[i].clear();
                  }
                }), c = t;
              }
            }.call(this, h);
          } else this.eraseElementByKey(e);
        }, this.getElementByKey = function (e) {
          var t,
              n,
              o = r(e) & h - 1;

          if (c[o]) {
            if (c[o] instanceof s.default) return c[o].getElementByKey(e);

            try {
              for (var a = i(c[o]), l = a.next(); !l.done; l = a.next()) {
                var u = l.value;
                if (u.key === e) return u.value;
              }
            } catch (e) {
              t = {
                error: e
              };
            } finally {
              try {
                l && !l.done && (n = a.return) && n.call(a);
              } finally {
                if (t) throw t.error;
              }
            }
          }
        }, this.eraseElementByKey = function (e) {
          var t,
              n,
              l = r(e) & h - 1;

          if (c[l]) {
            var f = c[l].size();
            if (c[l] instanceof s.default) c[l].eraseElementByKey(e), c[l].size() <= a.untreeifyThreshold && (c[l] = new o.default(c[l]));else {
              var p = -1;

              try {
                for (var d = i(c[l]), g = d.next(); !g.done; g = d.next()) {
                  if (++p, g.value.key === e) {
                    c[l].eraseElementByPos(p);
                    break;
                  }
                }
              } catch (e) {
                t = {
                  error: e
                };
              } finally {
                try {
                  g && !g.done && (n = d.return) && n.call(d);
                } finally {
                  if (t) throw t.error;
                }
              }
            }
            var y = c[l].size();
            u += y - f;
          }
        }, this.find = function (e) {
          var t,
              n,
              o = r(e) & h - 1;
          if (!c[o]) return !1;
          if (c[o] instanceof s.default) return c[o].find(e);

          try {
            for (var a = i(c[o]), l = a.next(); !l.done; l = a.next()) {
              if (l.value.key === e) return !0;
            }
          } catch (e) {
            t = {
              error: e
            };
          } finally {
            try {
              l && !l.done && (n = a.return) && n.call(a);
            } finally {
              if (t) throw t.error;
            }
          }

          return !1;
        }, this[Symbol.iterator] = function () {
          return function () {
            var e, t, r, o, s, a;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  e = 0, n.label = 1;

                case 1:
                  if (!(e < h)) return [3, 10];

                  for (; e < h && !c[e];) ++e;

                  if (e >= h) return [3, 10];
                  n.label = 2;

                case 2:
                  n.trys.push([2, 7, 8, 9]), s = void 0, t = i(c[e]), r = t.next(), n.label = 3;

                case 3:
                  return r.done ? [3, 6] : [4, r.value];

                case 4:
                  n.sent(), n.label = 5;

                case 5:
                  return r = t.next(), [3, 3];

                case 6:
                  return [3, 9];

                case 7:
                  return o = n.sent(), s = {
                    error: o
                  }, [3, 9];

                case 8:
                  try {
                    r && !r.done && (a = t.return) && a.call(t);
                  } finally {
                    if (s) throw s.error;
                  }

                  return [7];

                case 9:
                  return ++e, [3, 1];

                case 10:
                  return [2];
              }
            });
          }();
        }, e.forEach(function (e) {
          var t = e.key,
              r = e.value;
          return l.setElement(t, r);
        }), Object.freeze(this);
      }

      a.initSize = 16, a.maxSize = 1 << 30, a.sigma = .75, a.treeifyThreshold = 8, a.untreeifyThreshold = 6, a.minTreeifySize = 64, Object.freeze(a), r.default = a;
    }, {
      "../LinkList/LinkList": 29,
      "../Map/Map": 30
    }],
    28: [function (e, t, r) {
      "use strict";

      var n = this && this.__generator || function (e, t) {
        var r,
            n,
            i,
            o,
            s = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this;
        }), o;

        function a(o) {
          return function (a) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");

              for (; s;) try {
                if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;

                switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;

                  case 4:
                    return s.label++, {
                      value: o[1],
                      done: !1
                    };

                  case 5:
                    s.label++, n = o[1], o = [0];
                    continue;

                  case 7:
                    o = s.ops.pop(), s.trys.pop();
                    continue;

                  default:
                    if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      s = 0;
                      continue;
                    }

                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      s.label = o[1];
                      break;
                    }

                    if (6 === o[0] && s.label < i[1]) {
                      s.label = i[1], i = o;
                      break;
                    }

                    if (i && s.label < i[2]) {
                      s.label = i[2], s.ops.push(o);
                      break;
                    }

                    i[2] && s.ops.pop(), s.trys.pop();
                    continue;
                }

                o = t.call(e, s);
              } catch (e) {
                o = [6, e], n = 0;
              } finally {
                r = i = 0;
              }

              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([o, a]);
          };
        }
      },
          i = this && this.__values || function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0;
        if (r) return r.call(e);
        if (e && "number" == typeof e.length) return {
          next: function () {
            return e && n >= e.length && (e = void 0), {
              value: e && e[n++],
              done: !e
            };
          }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };

      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var o = e("../Set/Set"),
          s = e("../LinkList/LinkList");

      function a(e, t, r) {
        var l = this;
        if (void 0 === e && (e = []), void 0 === t && (t = a.initSize), r = r || function (e) {
          var t = 0,
              r = "";
          if ("number" == typeof e) t = ((t = Math.floor(e)) << 5) - t, t &= t;else {
            r = "string" != typeof e ? JSON.stringify(e) : e;

            for (var n = 0; n < r.length; n++) {
              t = (t << 5) - t + r.charCodeAt(n), t &= t;
            }
          }
          return t ^= t >>> 16;
        }, 0 != (t & t - 1)) throw new Error("initBucketNum must be 2 to the power of n");
        var u = 0,
            c = [],
            h = Math.max(a.initSize, Math.min(a.maxSize, t));
        this.size = function () {
          return u;
        }, this.empty = function () {
          return 0 === u;
        }, this.clear = function () {
          u = 0, h = t, c = [];
        }, this.forEach = function (e) {
          var t = 0;
          c.forEach(function (r) {
            r.forEach(function (r) {
              e(r, t++);
            });
          });
        };
        this.insert = function (e) {
          if (null === e || void 0 === e) throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
          var t = r(e) & h - 1;

          if (c[t]) {
            var n = c[t].size();

            if (c[t] instanceof s.default) {
              if (c[t].find(e)) return;
              c[t].pushBack(e), c[t].size() >= a.treeifyThreshold && (c[t] = new o.default(c[t]));
            } else c[t].insert(e);

            var i = c[t].size();
            u += i - n;
          } else c[t] = new s.default([e]), ++u;

          u > h * a.sigma && function (e) {
            if (!(e >= a.maxSize)) {
              h = 2 * e;
              var t = [];
              c.forEach(function (n, i) {
                if (!n.empty()) {
                  if (n instanceof s.default && 1 === n.size()) {
                    var l = n.front();
                    if (void 0 === l) throw new Error("unknown error");
                    t[r(l) & h - 1] = new s.default([l]);
                  } else if (n instanceof o.default) {
                    var u = new s.default(),
                        f = new s.default();
                    n.forEach(function (t) {
                      0 == (r(t) & e) ? u.pushBack(t) : f.pushBack(t);
                    }), u.size() > a.untreeifyThreshold ? t[i] = new o.default(u) : u.size() && (t[i] = u), f.size() > a.untreeifyThreshold ? t[i + e] = new o.default(f) : f.size() && (t[i + e] = f);
                  } else {
                    var p = new s.default(),
                        d = new s.default();
                    n.forEach(function (t) {
                      0 == (r(t) & e) ? p.pushBack(t) : d.pushBack(t);
                    }), p.size() && (t[i] = p), d.size() && (t[i + e] = d);
                  }

                  c[i].clear();
                }
              }), c = t;
            }
          }.call(this, h);
        }, this.eraseElementByValue = function (e) {
          var t = r(e) & h - 1;

          if (c[t]) {
            var n = c[t].size();
            c[t].eraseElementByValue(e), c[t] instanceof o.default && c[t].size() <= a.untreeifyThreshold && (c[t] = new s.default(c[t]));
            var i = c[t].size();
            u += i - n;
          }
        }, this.find = function (e) {
          var t = r(e) & h - 1;
          return !!c[t] && c[t].find(e);
        }, this[Symbol.iterator] = function () {
          return function () {
            var e, t, r, o, s, a;
            return n(this, function (n) {
              switch (n.label) {
                case 0:
                  e = 0, n.label = 1;

                case 1:
                  if (!(e < h)) return [3, 10];

                  for (; e < h && !c[e];) ++e;

                  if (e >= h) return [3, 10];
                  n.label = 2;

                case 2:
                  n.trys.push([2, 7, 8, 9]), s = void 0, t = i(c[e]), r = t.next(), n.label = 3;

                case 3:
                  return r.done ? [3, 6] : [4, r.value];

                case 4:
                  n.sent(), n.label = 5;

                case 5:
                  return r = t.next(), [3, 3];

                case 6:
                  return [3, 9];

                case 7:
                  return o = n.sent(), s = {
                    error: o
                  }, [3, 9];

                case 8:
                  try {
                    r && !r.done && (a = t.return) && a.call(t);
                  } finally {
                    if (s) throw s.error;
                  }

                  return [7];

                case 9:
                  return ++e, [3, 1];

                case 10:
                  return [2];
              }
            });
          }();
        }, e.forEach(function (e) {
          return l.insert(e);
        }), Object.freeze(this);
      }

      a.initSize = 16, a.maxSize = 1 << 30, a.sigma = .75, a.treeifyThreshold = 8, a.untreeifyThreshold = 6, a.minTreeifySize = 64, Object.freeze(a), r.default = a;
    }, {
      "../LinkList/LinkList": 29,
      "../Set/Set": 33
    }],
    29: [function (e, t, r) {
      "use strict";

      var n = this && this.__generator || function (e, t) {
        var r,
            n,
            i,
            o,
            s = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this;
        }), o;

        function a(o) {
          return function (a) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");

              for (; s;) try {
                if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;

                switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;

                  case 4:
                    return s.label++, {
                      value: o[1],
                      done: !1
                    };

                  case 5:
                    s.label++, n = o[1], o = [0];
                    continue;

                  case 7:
                    o = s.ops.pop(), s.trys.pop();
                    continue;

                  default:
                    if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      s = 0;
                      continue;
                    }

                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      s.label = o[1];
                      break;
                    }

                    if (6 === o[0] && s.label < i[1]) {
                      s.label = i[1], i = o;
                      break;
                    }

                    if (i && s.label < i[2]) {
                      s.label = i[2], s.ops.push(o);
                      break;
                    }

                    i[2] && s.ops.pop(), s.trys.pop();
                    continue;
                }

                o = t.call(e, s);
              } catch (e) {
                o = [6, e], n = 0;
              } finally {
                r = i = 0;
              }

              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([o, a]);
          };
        }
      };

      Object.defineProperty(r, "__esModule", {
        value: !0
      });

      var i = function () {
        return function (e) {
          this.value = void 0, this.pre = void 0, this.next = void 0, this.value = e;
        };
      }();

      function o(e) {
        var t = this;
        void 0 === e && (e = []);
        var r = 0,
            o = void 0,
            s = void 0;
        this.size = function () {
          return r;
        }, this.empty = function () {
          return 0 === r;
        }, this.clear = function () {
          o = s = void 0, r = 0;
        }, this.front = function () {
          return null === o || void 0 === o ? void 0 : o.value;
        }, this.back = function () {
          return null === s || void 0 === s ? void 0 : s.value;
        }, this.forEach = function (e) {
          for (var t = o, r = 0; t;) {
            if (void 0 === t.value) throw new Error("unknown error");
            e(t.value, r++), t = t.next;
          }
        }, this.getElementByPos = function (e) {
          if (e < 0 || e >= r) throw new Error("pos must more then 0 and less then the list length");

          for (var t = o; e-- && t;) t = t.next;

          if (!t || void 0 === t.value) throw new Error("unknown error");
          return t.value;
        }, this.eraseElementByPos = function (e) {
          if (e < 0 || e >= r) throw new Error("erase pos must more then 0 and less then the list length");
          if (0 === e) this.popFront();else if (e === r - 1) this.popBack();else {
            for (var t = o; e--;) {
              if (!(null === t || void 0 === t ? void 0 : t.next)) throw new Error("unknown error");
              t = t.next;
            }

            if (!t || !t.pre || !t.next) throw new Error("unknown error");
            var n = t.pre,
                i = t.next;
            i.pre = n, n.next = i, r > 0 && --r;
          }
        }, this.eraseElementByValue = function (e) {
          for (; o && o.value === e;) this.popFront();

          for (; s && s.value === e;) this.popBack();

          if (o) for (var t = o; t;) {
            if (t.value === e) {
              var n = t.pre,
                  i = t.next;
              i && (i.pre = n), n && (n.next = i), r > 0 && --r;
            }

            t = t.next;
          }
        }, this.pushBack = function (e) {
          if (null === e || void 0 === e) throw new Error("you can't push null or undefined here");
          ++r;
          var t = new i(e);
          s ? (s.next = t, t.pre = s, s = t) : o = s = t;
        }, this.popBack = function () {
          s && (r > 0 && --r, s && (o === s ? o = s = void 0 : (s = s.pre) && (s.next = void 0)));
        }, this.setElementByPos = function (e, t) {
          if (null === t || void 0 === t) throw new Error("you can't set null or undefined here");
          if (e < 0 || e >= r) throw new Error("pos must more then 0 and less then the list length");

          for (var n = o; e--;) {
            if (!n) throw new Error("unknown error");
            n = n.next;
          }

          n && (n.value = t);
        }, this.insert = function (e, t, n) {
          if (void 0 === n && (n = 1), null === t || void 0 === t) throw new Error("you can't insert null or undefined here");
          if (e < 0 || e > r) throw new Error("insert pos must more then 0 and less then or equal to the list length");
          if (n < 0) throw new Error("insert size must more than 0");
          if (0 === e) for (; n--;) this.pushFront(t);else if (e === r) for (; n--;) this.pushBack(t);else {
            for (var s = o, a = 1; a < e; ++a) {
              if (!(null === s || void 0 === s ? void 0 : s.next)) throw new Error("unknown error");
              s = null === s || void 0 === s ? void 0 : s.next;
            }

            if (!s) throw new Error("unknown error");
            var l = s.next;

            for (r += n; n--;) s.next = new i(t), s.next.pre = s, s = s.next;

            s.next = l, l && (l.pre = s);
          }
        }, this.find = function (e) {
          for (var t = o; t;) {
            if (t.value === e) return !0;
            t = t.next;
          }

          return !1;
        }, this.reverse = function () {
          for (var e = o, t = s, n = 0; e && t && 2 * n < r;) {
            var i = e.value;
            e.value = t.value, t.value = i, e = e.next, t = t.pre, ++n;
          }
        }, this.unique = function () {
          for (var e = o; e;) {
            for (var t = e; t && t.next && t.value === t.next.value;) t = t.next, r > 0 && --r;

            e.next = t.next, e.next && (e.next.pre = e), e = e.next;
          }
        }, this.sort = function (e) {
          var t = [];
          this.forEach(function (e) {
            t.push(e);
          }), t.sort(e);
          var r = o;
          t.forEach(function (e) {
            r && (r.value = e, r = r.next);
          });
        }, this.pushFront = function (e) {
          if (null === e || void 0 === e) throw new Error("you can't push null or undefined here");
          ++r;
          var t = new i(e);
          o ? (t.next = o, o.pre = t, o = t) : o = s = t;
        }, this.popFront = function () {
          o && (r > 0 && --r, o && (o === s ? o = s = void 0 : (o = o.next) && (o.pre = void 0)));
        }, this.merge = function (e) {
          var t = this,
              n = o;
          e.forEach(function (e) {
            for (; n && void 0 !== n.value && n.value <= e;) n = n.next;

            if (void 0 === n) t.pushBack(e), n = s;else if (n === o) t.pushFront(e), n = o;else {
              ++r;
              var a = n.pre;
              a && (a.next = new i(e), a.next.pre = a, a.next.next = n, n && (n.pre = a.next));
            }
          });
        }, this[Symbol.iterator] = function () {
          return function () {
            var e;
            return n(this, function (t) {
              switch (t.label) {
                case 0:
                  e = o, t.label = 1;

                case 1:
                  if (void 0 === e) return [3, 3];
                  if (!e.value) throw new Error("unknown error");
                  return [4, e.value];

                case 2:
                  return t.sent(), e = e.next, [3, 1];

                case 3:
                  return [2];
              }
            });
          }();
        }, e.forEach(function (e) {
          return t.pushBack(e);
        }), Object.freeze(this);
      }

      Object.freeze(o), r.default = o;
    }, {}],
    30: [function (e, t, r) {
      "use strict";

      var n = this && this.__generator || function (e, t) {
        var r,
            n,
            i,
            o,
            s = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this;
        }), o;

        function a(o) {
          return function (a) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");

              for (; s;) try {
                if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;

                switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;

                  case 4:
                    return s.label++, {
                      value: o[1],
                      done: !1
                    };

                  case 5:
                    s.label++, n = o[1], o = [0];
                    continue;

                  case 7:
                    o = s.ops.pop(), s.trys.pop();
                    continue;

                  default:
                    if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      s = 0;
                      continue;
                    }

                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      s.label = o[1];
                      break;
                    }

                    if (6 === o[0] && s.label < i[1]) {
                      s.label = i[1], i = o;
                      break;
                    }

                    if (i && s.label < i[2]) {
                      s.label = i[2], s.ops.push(o);
                      break;
                    }

                    i[2] && s.ops.pop(), s.trys.pop();
                    continue;
                }

                o = t.call(e, s);
              } catch (e) {
                o = [6, e], n = 0;
              } finally {
                r = i = 0;
              }

              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([o, a]);
          };
        }
      },
          i = this && this.__values || function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0;
        if (r) return r.call(e);
        if (e && "number" == typeof e.length) return {
          next: function () {
            return e && n >= e.length && (e = void 0), {
              value: e && e[n++],
              done: !e
            };
          }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };

      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var o = e("../Base/TreeNode");

      function s(e, t) {
        var r = this;
        void 0 === e && (e = []), t = t || function (e, t) {
          return e < t ? -1 : e > t ? 1 : 0;
        };
        var s = 0,
            a = new o.default();
        a.color = o.default.TreeNodeColorType.black, this.size = function () {
          return s;
        }, this.empty = function () {
          return 0 === s;
        }, this.clear = function () {
          s = 0, a.key = a.value = void 0, a.leftChild = a.rightChild = a.brother = void 0;
        };

        var l = function (e) {
          if (!e || void 0 === e.key) throw new Error("unknown error");
          return e.leftChild ? l(e.leftChild) : e;
        },
            u = function (e) {
          if (!e || void 0 === e.key) throw new Error("unknown error");
          return e.rightChild ? u(e.rightChild) : e;
        };

        this.front = function () {
          if (!this.empty()) {
            var e = l(a);
            if (void 0 === e.key || void 0 === e.value) throw new Error("unknown error");
            return {
              key: e.key,
              value: e.value
            };
          }
        }, this.back = function () {
          if (!this.empty()) {
            var e = u(a);
            if (void 0 === e.key || void 0 === e.value) throw new Error("unknown error");
            return {
              key: e.key,
              value: e.value
            };
          }
        }, this.forEach = function (e) {
          var t,
              r,
              n = 0;

          try {
            for (var o = i(this), s = o.next(); !s.done; s = o.next()) {
              e(s.value, n++);
            }
          } catch (e) {
            t = {
              error: e
            };
          } finally {
            try {
              s && !s.done && (r = o.return) && r.call(o);
            } finally {
              if (t) throw t.error;
            }
          }
        }, this.getElementByPos = function (e) {
          var t, r;
          if (e < 0 || e >= this.size()) throw new Error("pos must more than 0 and less than set's size");
          var n = 0;

          try {
            for (var o = i(this), s = o.next(); !s.done; s = o.next()) {
              var a = s.value;
              if (n === e) return a;
              ++n;
            }
          } catch (e) {
            t = {
              error: e
            };
          } finally {
            try {
              s && !s.done && (r = o.return) && r.call(o);
            } finally {
              if (t) throw t.error;
            }
          }

          throw new Error("unknown Error");
        };

        var c = function (e, r) {
          if (e && void 0 !== e.key && void 0 !== e.value) {
            var n = t(e.key, r);
            return 0 === n ? {
              key: e.key,
              value: e.value
            } : n < 0 ? c(e.rightChild, r) : c(e.leftChild, r) || {
              key: e.key,
              value: e.value
            };
          }
        };

        this.lowerBound = function (e) {
          return c(a, e);
        };

        var h = function (e, r) {
          if (e && void 0 !== e.key && void 0 !== e.value) return t(e.key, r) <= 0 ? h(e.rightChild, r) : h(e.leftChild, r) || {
            key: e.key,
            value: e.value
          };
        };

        this.upperBound = function (e) {
          return h(a, e);
        };

        var f = function (e, r) {
          if (e && void 0 !== e.key && void 0 !== e.value) {
            var n = t(e.key, r);
            return 0 === n ? {
              key: e.key,
              value: e.value
            } : n > 0 ? f(e.leftChild, r) : f(e.rightChild, r) || {
              key: e.key,
              value: e.value
            };
          }
        };

        this.reverseLowerBound = function (e) {
          return f(a, e);
        };

        var p = function (e, r) {
          if (e && void 0 !== e.key && void 0 !== e.value) return t(e.key, r) >= 0 ? p(e.leftChild, r) : p(e.rightChild, r) || {
            key: e.key,
            value: e.value
          };
        };

        this.reverseUpperBound = function (e) {
          return p(a, e);
        };

        var d = function (e) {
          var t = e.parent;

          if (!t) {
            if (e === a) return;
            throw new Error("unknown error");
          }

          if (e.color !== o.default.TreeNodeColorType.red) {
            var r = e.brother;
            if (!r) throw new Error("unknown error");

            if (e === t.leftChild) {
              if (r.color === o.default.TreeNodeColorType.red) {
                r.color = o.default.TreeNodeColorType.black, t.color = o.default.TreeNodeColorType.red;
                var n = t.rotateLeft();
                a === t && (a = n), d(e);
              } else if (r.color === o.default.TreeNodeColorType.black) if (r.rightChild && r.rightChild.color === o.default.TreeNodeColorType.red) {
                r.color = t.color, t.color = o.default.TreeNodeColorType.black, r.rightChild && (r.rightChild.color = o.default.TreeNodeColorType.black);
                n = t.rotateLeft();
                a === t && (a = n), e.color = o.default.TreeNodeColorType.black;
              } else if (r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || !r.leftChild || r.leftChild.color !== o.default.TreeNodeColorType.red) r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || (r.color = o.default.TreeNodeColorType.red, d(t));else {
                r.color = o.default.TreeNodeColorType.red, r.leftChild && (r.leftChild.color = o.default.TreeNodeColorType.black);
                n = r.rotateRight();
                a === r && (a = n), d(e);
              }
            } else if (e === t.rightChild) if (r.color === o.default.TreeNodeColorType.red) {
              r.color = o.default.TreeNodeColorType.black, t.color = o.default.TreeNodeColorType.red;
              n = t.rotateRight();
              a === t && (a = n), d(e);
            } else if (r.color === o.default.TreeNodeColorType.black) if (r.leftChild && r.leftChild.color === o.default.TreeNodeColorType.red) {
              r.color = t.color, t.color = o.default.TreeNodeColorType.black, r.leftChild && (r.leftChild.color = o.default.TreeNodeColorType.black);
              n = t.rotateRight();
              a === t && (a = n), e.color = o.default.TreeNodeColorType.black;
            } else if (r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || !r.rightChild || r.rightChild.color !== o.default.TreeNodeColorType.red) r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || (r.color = o.default.TreeNodeColorType.red, d(t));else {
              r.color = o.default.TreeNodeColorType.red, r.rightChild && (r.rightChild.color = o.default.TreeNodeColorType.black);
              n = r.rotateLeft();
              a === r && (a = n), d(e);
            }
          } else e.color = o.default.TreeNodeColorType.black;
        },
            g = function (e) {
          for (var t = e; t.leftChild || t.rightChild;) {
            if (t.rightChild) {
              t = l(t.rightChild);
              var r = e.key;
              e.key = t.key, t.key = r;
              var n = e.value;
              e.value = t.value, t.value = n, e = t;
            }

            if (t.leftChild) {
              t = u(t.leftChild);
              r = e.key;
              e.key = t.key, t.key = r;
              n = e.value;
              e.value = t.value, t.value = n, e = t;
            }
          }

          d(t), t && t.remove(), --s, a.color = o.default.TreeNodeColorType.black;
        },
            y = function (e, t) {
          return !(!e || void 0 === e.key) && (!!y(e.leftChild, t) || !!t(e) || y(e.rightChild, t));
        };

        this.eraseElementByPos = function (e) {
          if (e < 0 || e >= s) throw new Error("pos must more than 0 and less than set's size");
          var t = 0;
          y(a, function (r) {
            return e === t ? (g(r), !0) : (++t, !1);
          });
        }, this.eraseElementByKey = function (e) {
          if (!this.empty()) {
            var r = v(a, e);
            void 0 !== r && void 0 !== r.key && 0 === t(r.key, e) && g(r);
          }
        };

        var b = function (e, r) {
          if (!e || void 0 === e.key) throw new Error("unknown error");
          var n = t(r, e.key);
          return n < 0 ? e.leftChild ? b(e.leftChild, r) : (e.leftChild = new o.default(), e.leftChild.parent = e, e.leftChild.brother = e.rightChild, e.rightChild && (e.rightChild.brother = e.leftChild), e.leftChild) : n > 0 ? e.rightChild ? b(e.rightChild, r) : (e.rightChild = new o.default(), e.rightChild.parent = e, e.rightChild.brother = e.leftChild, e.leftChild && (e.leftChild.brother = e.rightChild), e.rightChild) : e;
        },
            m = function (e) {
          var t = e.parent;

          if (!t) {
            if (e === a) return;
            throw new Error("unknown error");
          }

          if (t.color !== o.default.TreeNodeColorType.black && t.color === o.default.TreeNodeColorType.red) {
            var r = t.brother,
                n = t.parent;
            if (!n) throw new Error("unknown error");
            if (r && r.color === o.default.TreeNodeColorType.red) r.color = t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red, m(n);else if (!r || r.color === o.default.TreeNodeColorType.black) if (t === n.leftChild) {
              if (e === t.leftChild) {
                t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red;
                var i = n.rotateRight();
                n === a && (a = i);
              } else if (e === t.rightChild) {
                i = t.rotateLeft();
                n === a && (a = i), m(t);
              }
            } else if (t === n.rightChild) if (e === t.leftChild) {
              i = t.rotateRight();
              n === a && (a = i), m(t);
            } else if (e === t.rightChild) {
              t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red;
              i = n.rotateLeft();
              n === a && (a = i);
            }
          }
        };

        this.setElement = function (e, r) {
          if (null === e || void 0 === e) throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");

          if (null !== r && void 0 !== r) {
            if (this.empty()) return ++s, a.key = e, a.value = r, void (a.color = o.default.TreeNodeColorType.black);
            var n = b(a, e);
            void 0 === n.key || 0 !== t(n.key, e) ? (++s, n.key = e, n.value = r, m(n), a.color = o.default.TreeNodeColorType.black) : n.value = r;
          } else this.eraseElementByKey(e);
        };

        var v = function (e, r) {
          if (e && void 0 !== e.key) {
            var n = t(r, e.key);
            return n < 0 ? v(e.leftChild, r) : n > 0 ? v(e.rightChild, r) : e;
          }
        };

        this.find = function (e) {
          return !!v(a, e);
        }, this.getElementByKey = function (e) {
          var t = v(a, e);
          if (void 0 === (null === t || void 0 === t ? void 0 : t.key) || void 0 === (null === t || void 0 === t ? void 0 : t.value)) throw new Error("unknown error");
          return t.value;
        }, this.union = function (e) {
          var t = this;
          e.forEach(function (e) {
            var r = e.key,
                n = e.value;
            return t.setElement(r, n);
          });
        }, this.getHeight = function () {
          if (this.empty()) return 0;

          var e = function (t) {
            return t ? Math.max(e(t.leftChild), e(t.rightChild)) + 1 : 1;
          };

          return e(a);
        };

        var w = function (e) {
          return n(this, function (t) {
            switch (t.label) {
              case 0:
                return e && void 0 !== e.key && void 0 !== e.value ? [5, i(w(e.leftChild))] : [2];

              case 1:
                return t.sent(), [4, {
                  key: e.key,
                  value: e.value
                }];

              case 2:
                return t.sent(), [5, i(w(e.rightChild))];

              case 3:
                return t.sent(), [2];
            }
          });
        };

        this[Symbol.iterator] = function () {
          return w(a);
        }, e.forEach(function (e) {
          var t = e.key,
              n = e.value;
          return r.setElement(t, n);
        }), Object.freeze(this);
      }

      Object.freeze(s), r.default = s;
    }, {
      "../Base/TreeNode": 25
    }],
    31: [function (e, t, r) {
      "use strict";

      function n(e, t) {
        void 0 === e && (e = []), t = t || function (e, t) {
          return e > t ? -1 : e < t ? 1 : 0;
        };
        var r = [];
        e.forEach(function (e) {
          return r.push(e);
        });

        var n = r.length,
            i = function (e, t) {
          if (e < 0 || e >= n) throw new Error("unknown error");
          if (t < 0 || t >= n) throw new Error("unknown error");
          var i = r[e];
          r[e] = r[t], r[t] = i;
        },
            o = function (e) {
          if (e < 0 || e >= n) throw new Error("unknown error");
          var o = 2 * e + 1,
              s = 2 * e + 2;
          o < n && t(r[e], r[o]) > 0 && i(e, o), s < n && t(r[e], r[s]) > 0 && i(e, s);
        };

        !function () {
          for (var e = Math.floor((n - 1) / 2); e >= 0; --e) for (var o = e, s = 2 * o + 1; s < n;) {
            var a = s + 1,
                l = s;
            if (a < n && t(r[s], r[a]) > 0 && (l = a), t(r[o], r[l]) <= 0) break;
            i(o, l), s = 2 * (o = l) + 1;
          }
        }(), this.size = function () {
          return n;
        }, this.empty = function () {
          return 0 === n;
        }, this.clear = function () {
          n = 0, r.length = 0;
        }, this.push = function (e) {
          if (r.push(e), 1 !== ++n) for (var i = n - 1; i > 0;) {
            var s = Math.floor((i - 1) / 2);
            if (t(r[s], e) <= 0) break;
            o(s), i = s;
          }
        }, this.pop = function () {
          if (!this.empty()) if (1 !== this.size()) {
            var e = r[n - 1];
            --n;

            for (var i = 0; i < this.size();) {
              var o = 2 * i + 1,
                  s = 2 * i + 2;
              if (o >= this.size()) break;
              var a = o;
              if (s < this.size() && t(r[o], r[s]) > 0 && (a = s), t(r[a], e) >= 0) break;
              r[i] = r[a], i = a;
            }

            r[i] = e;
          } else --n;
        }, this.top = function () {
          return r[0];
        }, Object.freeze(this);
      }

      Object.defineProperty(r, "__esModule", {
        value: !0
      }), Object.freeze(n), r.default = n;
    }, {}],
    32: [function (e, t, r) {
      "use strict";

      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var n = e("../LinkList/LinkList");

      function i(e) {
        void 0 === e && (e = []);
        var t = new n.default(e);
        this.size = function () {
          return t.size();
        }, this.empty = function () {
          return t.empty();
        }, this.clear = function () {
          t.clear();
        }, this.push = function (e) {
          t.pushBack(e);
        }, this.pop = function () {
          t.popFront();
        }, this.front = function () {
          return t.front();
        }, Object.freeze(this);
      }

      Object.freeze(i), r.default = i;
    }, {
      "../LinkList/LinkList": 29
    }],
    33: [function (e, t, r) {
      "use strict";

      var n = this && this.__generator || function (e, t) {
        var r,
            n,
            i,
            o,
            s = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this;
        }), o;

        function a(o) {
          return function (a) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");

              for (; s;) try {
                if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;

                switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;

                  case 4:
                    return s.label++, {
                      value: o[1],
                      done: !1
                    };

                  case 5:
                    s.label++, n = o[1], o = [0];
                    continue;

                  case 7:
                    o = s.ops.pop(), s.trys.pop();
                    continue;

                  default:
                    if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      s = 0;
                      continue;
                    }

                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      s.label = o[1];
                      break;
                    }

                    if (6 === o[0] && s.label < i[1]) {
                      s.label = i[1], i = o;
                      break;
                    }

                    if (i && s.label < i[2]) {
                      s.label = i[2], s.ops.push(o);
                      break;
                    }

                    i[2] && s.ops.pop(), s.trys.pop();
                    continue;
                }

                o = t.call(e, s);
              } catch (e) {
                o = [6, e], n = 0;
              } finally {
                r = i = 0;
              }

              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([o, a]);
          };
        }
      },
          i = this && this.__values || function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0;
        if (r) return r.call(e);
        if (e && "number" == typeof e.length) return {
          next: function () {
            return e && n >= e.length && (e = void 0), {
              value: e && e[n++],
              done: !e
            };
          }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };

      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var o = e("../Base/TreeNode");

      function s(e, t) {
        var r = this;
        void 0 === e && (e = []), t = t || function (e, t) {
          return e < t ? -1 : e > t ? 1 : 0;
        };
        var s = 0,
            a = new o.default();
        a.color = o.default.TreeNodeColorType.black, this.size = function () {
          return s;
        }, this.empty = function () {
          return 0 === s;
        }, this.clear = function () {
          s = 0, a.key = void 0, a.leftChild = a.rightChild = a.brother = a.parent = void 0, a.color = o.default.TreeNodeColorType.black;
        };

        var l = function (e) {
          if (!e || void 0 === e.key) throw new Error("unknown error");
          return e.leftChild ? l(e.leftChild) : e;
        },
            u = function (e) {
          if (!e || void 0 === e.key) throw new Error("unknown error");
          return e.rightChild ? u(e.rightChild) : e;
        };

        this.front = function () {
          if (!this.empty()) return l(a).key;
        }, this.back = function () {
          if (!this.empty()) return u(a).key;
        }, this.forEach = function (e) {
          var t,
              r,
              n = 0;

          try {
            for (var o = i(this), s = o.next(); !s.done; s = o.next()) {
              e(s.value, n++);
            }
          } catch (e) {
            t = {
              error: e
            };
          } finally {
            try {
              s && !s.done && (r = o.return) && r.call(o);
            } finally {
              if (t) throw t.error;
            }
          }
        }, this.getElementByPos = function (e) {
          var t, r;
          if (e < 0 || e >= this.size()) throw new Error("pos must more than 0 and less than set's size");
          var n = 0;

          try {
            for (var o = i(this), s = o.next(); !s.done; s = o.next()) {
              var a = s.value;
              if (n === e) return a;
              ++n;
            }
          } catch (e) {
            t = {
              error: e
            };
          } finally {
            try {
              s && !s.done && (r = o.return) && r.call(o);
            } finally {
              if (t) throw t.error;
            }
          }

          throw new Error("unknown error");
        };

        var c = function (e) {
          var t = e.parent;

          if (!t) {
            if (e === a) return;
            throw new Error("unknown error");
          }

          if (e.color !== o.default.TreeNodeColorType.red) {
            var r = e.brother;
            if (!r) throw new Error("unknown error");

            if (e === t.leftChild) {
              if (r.color === o.default.TreeNodeColorType.red) {
                r.color = o.default.TreeNodeColorType.black, t.color = o.default.TreeNodeColorType.red;
                var n = t.rotateLeft();
                a === t && (a = n), c(e);
              } else if (r.color === o.default.TreeNodeColorType.black) if (r.rightChild && r.rightChild.color === o.default.TreeNodeColorType.red) {
                r.color = t.color, t.color = o.default.TreeNodeColorType.black, r.rightChild && (r.rightChild.color = o.default.TreeNodeColorType.black);
                n = t.rotateLeft();
                a === t && (a = n), e.color = o.default.TreeNodeColorType.black;
              } else if (r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || !r.leftChild || r.leftChild.color !== o.default.TreeNodeColorType.red) r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || (r.color = o.default.TreeNodeColorType.red, c(t));else {
                r.color = o.default.TreeNodeColorType.red, r.leftChild && (r.leftChild.color = o.default.TreeNodeColorType.black);
                n = r.rotateRight();
                a === r && (a = n), c(e);
              }
            } else if (e === t.rightChild) if (r.color === o.default.TreeNodeColorType.red) {
              r.color = o.default.TreeNodeColorType.black, t.color = o.default.TreeNodeColorType.red;
              n = t.rotateRight();
              a === t && (a = n), c(e);
            } else if (r.color === o.default.TreeNodeColorType.black) if (r.leftChild && r.leftChild.color === o.default.TreeNodeColorType.red) {
              r.color = t.color, t.color = o.default.TreeNodeColorType.black, r.leftChild && (r.leftChild.color = o.default.TreeNodeColorType.black);
              n = t.rotateRight();
              a === t && (a = n), e.color = o.default.TreeNodeColorType.black;
            } else if (r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || !r.rightChild || r.rightChild.color !== o.default.TreeNodeColorType.red) r.leftChild && r.leftChild.color !== o.default.TreeNodeColorType.black || r.rightChild && r.rightChild.color !== o.default.TreeNodeColorType.black || (r.color = o.default.TreeNodeColorType.red, c(t));else {
              r.color = o.default.TreeNodeColorType.red, r.rightChild && (r.rightChild.color = o.default.TreeNodeColorType.black);
              n = r.rotateLeft();
              a === r && (a = n), c(e);
            }
          } else e.color = o.default.TreeNodeColorType.black;
        },
            h = function (e) {
          for (var t = e; t.leftChild || t.rightChild;) {
            if (t.rightChild) {
              t = l(t.rightChild);
              var r = e.key;
              e.key = t.key, t.key = r, e = t;
            }

            if (t.leftChild) {
              t = u(t.leftChild);
              r = e.key;
              e.key = t.key, t.key = r, e = t;
            }
          }

          c(t), t && t.remove(), --s, a.color = o.default.TreeNodeColorType.black;
        },
            f = function (e, t) {
          return !(!e || void 0 === e.key) && (!!f(e.leftChild, t) || !!t(e) || f(e.rightChild, t));
        };

        this.eraseElementByPos = function (e) {
          if (e < 0 || e >= s) throw new Error("pos must more than 0 and less than set's size");
          var t = 0;
          f(a, function (r) {
            return e === t ? (h(r), !0) : (++t, !1);
          });
        }, this.eraseElementByValue = function (e) {
          if (!this.empty()) {
            var r = g(a, e);
            void 0 !== r && void 0 !== r.key && 0 === t(r.key, e) && h(r);
          }
        };

        var p = function (e, r) {
          if (!e || void 0 === e.key) throw new Error("unknown error");
          var n = t(r, e.key);
          return n < 0 ? e.leftChild ? p(e.leftChild, r) : (e.leftChild = new o.default(), e.leftChild.parent = e, e.leftChild.brother = e.rightChild, e.rightChild && (e.rightChild.brother = e.leftChild), e.leftChild) : n > 0 ? e.rightChild ? p(e.rightChild, r) : (e.rightChild = new o.default(), e.rightChild.parent = e, e.rightChild.brother = e.leftChild, e.leftChild && (e.leftChild.brother = e.rightChild), e.rightChild) : e;
        },
            d = function (e) {
          var t = e.parent;

          if (!t) {
            if (e === a) return;
            throw new Error("unknown error");
          }

          if (t.color !== o.default.TreeNodeColorType.black && t.color === o.default.TreeNodeColorType.red) {
            var r = t.brother,
                n = t.parent;
            if (!n) throw new Error("unknown error");
            if (r && r.color === o.default.TreeNodeColorType.red) r.color = t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red, d(n);else if (!r || r.color === o.default.TreeNodeColorType.black) if (t === n.leftChild) {
              if (e === t.leftChild) {
                t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red;
                var i = n.rotateRight();
                n === a && (a = i);
              } else if (e === t.rightChild) {
                i = t.rotateLeft();
                n === a && (a = i), d(t);
              }
            } else if (t === n.rightChild) if (e === t.leftChild) {
              i = t.rotateRight();
              n === a && (a = i), d(t);
            } else if (e === t.rightChild) {
              t.color = o.default.TreeNodeColorType.black, n.color = o.default.TreeNodeColorType.red;
              i = n.rotateLeft();
              n === a && (a = i);
            }
          }
        };

        this.insert = function (e) {
          if (null === e || void 0 === e) throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
          if (this.empty()) return ++s, a.key = e, void (a.color = o.default.TreeNodeColorType.black);
          var r = p(a, e);
          void 0 !== r.key && 0 === t(r.key, e) || (++s, r.key = e, d(r), a.color = o.default.TreeNodeColorType.black);
        };

        var g = function (e, r) {
          if (e && void 0 !== e.key) {
            var n = t(r, e.key);
            return n < 0 ? g(e.leftChild, r) : n > 0 ? g(e.rightChild, r) : e;
          }
        };

        this.find = function (e) {
          var r = g(a, e);
          return void 0 !== r && void 0 !== r.key && 0 === t(r.key, e);
        };

        var y = function (e, r) {
          if (e && void 0 !== e.key) {
            var n = t(e.key, r);
            return 0 === n ? e.key : n < 0 ? y(e.rightChild, r) : y(e.leftChild, r) || e.key;
          }
        };

        this.lowerBound = function (e) {
          return y(a, e);
        };

        var b = function (e, r) {
          if (e && void 0 !== e.key) return t(e.key, r) <= 0 ? b(e.rightChild, r) : b(e.leftChild, r) || e.key;
        };

        this.upperBound = function (e) {
          return b(a, e);
        };

        var m = function (e, r) {
          if (e && void 0 !== e.key) {
            var n = t(e.key, r);
            return 0 === n ? e.key : n > 0 ? m(e.leftChild, r) : m(e.rightChild, r) || e.key;
          }
        };

        this.reverseLowerBound = function (e) {
          return m(a, e);
        };

        var v = function (e, r) {
          if (e && void 0 !== e.key) return t(e.key, r) >= 0 ? v(e.leftChild, r) : v(e.rightChild, r) || e.key;
        };

        this.reverseUpperBound = function (e) {
          return v(a, e);
        }, this.union = function (e) {
          var t = this;
          e.forEach(function (e) {
            return t.insert(e);
          });
        }, this.getHeight = function () {
          if (this.empty()) return 0;

          var e = function (t) {
            return t ? Math.max(e(t.leftChild), e(t.rightChild)) + 1 : 1;
          };

          return e(a);
        };

        var w = function (e) {
          return n(this, function (t) {
            switch (t.label) {
              case 0:
                return e && void 0 !== e.key ? [5, i(w(e.leftChild))] : [2];

              case 1:
                return t.sent(), [4, e.key];

              case 2:
                return t.sent(), [5, i(w(e.rightChild))];

              case 3:
                return t.sent(), [2];
            }
          });
        };

        this[Symbol.iterator] = function () {
          return w(a);
        }, e.forEach(function (e) {
          return r.insert(e);
        }), Object.freeze(this);
      }

      Object.freeze(s), r.default = s;
    }, {
      "../Base/TreeNode": 25
    }],
    34: [function (e, t, r) {
      "use strict";

      function n(e) {
        var t = this;
        void 0 === e && (e = []);
        var r = 0,
            n = [];
        this.size = function () {
          return r;
        }, this.empty = function () {
          return 0 === r;
        }, this.clear = function () {
          r = 0, n.length = 0;
        }, this.push = function (e) {
          n.push(e), ++r;
        }, this.pop = function () {
          n.pop(), r > 0 && --r;
        }, this.top = function () {
          return n[r - 1];
        }, e.forEach(function (e) {
          return t.push(e);
        }), Object.freeze(this);
      }

      Object.defineProperty(r, "__esModule", {
        value: !0
      }), Object.freeze(n), r.default = n;
    }, {}],
    35: [function (e, t, r) {
      "use strict";

      var n = this && this.__generator || function (e, t) {
        var r,
            n,
            i,
            o,
            s = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
          return this;
        }), o;

        function a(o) {
          return function (a) {
            return function (o) {
              if (r) throw new TypeError("Generator is already executing.");

              for (; s;) try {
                if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;

                switch (n = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                  case 0:
                  case 1:
                    i = o;
                    break;

                  case 4:
                    return s.label++, {
                      value: o[1],
                      done: !1
                    };

                  case 5:
                    s.label++, n = o[1], o = [0];
                    continue;

                  case 7:
                    o = s.ops.pop(), s.trys.pop();
                    continue;

                  default:
                    if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                      s = 0;
                      continue;
                    }

                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                      s.label = o[1];
                      break;
                    }

                    if (6 === o[0] && s.label < i[1]) {
                      s.label = i[1], i = o;
                      break;
                    }

                    if (i && s.label < i[2]) {
                      s.label = i[2], s.ops.push(o);
                      break;
                    }

                    i[2] && s.ops.pop(), s.trys.pop();
                    continue;
                }

                o = t.call(e, s);
              } catch (e) {
                o = [6, e], n = 0;
              } finally {
                r = i = 0;
              }

              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([o, a]);
          };
        }
      },
          i = this && this.__read || function (e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n,
            i,
            o = r.call(e),
            s = [];

        try {
          for (; (void 0 === t || t-- > 0) && !(n = o.next()).done;) s.push(n.value);
        } catch (e) {
          i = {
            error: e
          };
        } finally {
          try {
            n && !n.done && (r = o.return) && r.call(o);
          } finally {
            if (i) throw i.error;
          }
        }

        return s;
      },
          o = this && this.__spreadArray || function (e, t, r) {
        if (r || 2 === arguments.length) for (var n, i = 0, o = t.length; i < o; i++) !n && i in t || (n || (n = Array.prototype.slice.call(t, 0, i)), n[i] = t[i]);
        return e.concat(n || Array.prototype.slice.call(t));
      },
          s = this && this.__values || function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0;
        if (r) return r.call(e);
        if (e && "number" == typeof e.length) return {
          next: function () {
            return e && n >= e.length && (e = void 0), {
              value: e && e[n++],
              done: !e
            };
          }
        };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };

      function a(e) {
        var t = this;
        void 0 === e && (e = []);
        var r = 0,
            a = [];
        this.size = function () {
          return r;
        }, this.empty = function () {
          return 0 === r;
        }, this.clear = function () {
          r = 0, a.length = 0;
        }, this.front = function () {
          if (!this.empty()) return a[0];
        }, this.back = function () {
          if (!this.empty()) return a[r - 1];
        }, this.forEach = function (e) {
          a.forEach(e);
        }, this.getElementByPos = function (e) {
          if (e < 0 || e >= r) throw new Error("pos must more than 0 and less than vector's size");
          return a[e];
        }, this.eraseElementByPos = function (e) {
          if (e < 0 || e >= r) throw new Error("pos must more than 0 and less than vector's size");

          for (var t = e; t < r - 1; ++t) a[t] = a[t + 1];

          this.popBack();
        }, this.eraseElementByValue = function (e) {
          var t = [];
          this.forEach(function (r) {
            r !== e && t.push(r);
          }), t.forEach(function (e, t) {
            a[t] = e;
          });

          for (var n = t.length; r > n;) this.popBack();
        }, this.pushBack = function (e) {
          a.push(e), ++r;
        }, this.popBack = function () {
          a.pop(), r > 0 && --r;
        }, this.setElementByPos = function (e, t) {
          if (e < 0 || e >= r) throw new Error("pos must more than 0 and less than vector's size");
          a[e] = t;
        }, this.insert = function (e, t, n) {
          if (void 0 === n && (n = 1), e < 0 || e > r) throw new Error("pos must more than 0 and less than or equal to vector's size");
          a.splice.apply(a, o([e, 0], i(new Array(n).fill(t)), !1)), r += n;
        }, this.find = function (e) {
          return a.includes(e);
        }, this.reverse = function () {
          a.reverse();
        }, this.unique = function () {
          var e,
              t = [];
          this.forEach(function (r, n) {
            0 !== n && r === e || (t.push(r), e = r);
          }), t.forEach(function (e, t) {
            a[t] = e;
          });

          for (var n = t.length; r > n;) this.popBack();
        }, this.sort = function (e) {
          a.sort(e);
        }, this[Symbol.iterator] = function () {
          return function () {
            return n(this, function (e) {
              switch (e.label) {
                case 0:
                  return [5, s(a)];

                case 1:
                  return [2, e.sent()];
              }
            });
          }();
        }, e.forEach(function (e) {
          return t.pushBack(e);
        }), Object.freeze(this);
      }

      Object.defineProperty(r, "__esModule", {
        value: !0
      }), Object.freeze(a), r.default = a;
    }, {}],
    36: [function (e, t, r) {
      "use strict";

      Object.defineProperty(r, "__esModule", {
        value: !0
      }), r.HashMap = r.HashSet = r.Map = r.Set = r.PriorityQueue = r.Deque = r.LinkList = r.Queue = r.Stack = r.Vector = void 0;
      var n = e("./Vector/Vector");
      r.Vector = n.default;
      var i = e("./Stack/Stack");
      r.Stack = i.default;
      var o = e("./Queue/Queue");
      r.Queue = o.default;
      var s = e("./LinkList/LinkList");
      r.LinkList = s.default;
      var a = e("./Deque/Deque");
      r.Deque = a.default;
      var l = e("./PriorityQueue/PriorityQueue");
      r.PriorityQueue = l.default;
      var u = e("./Set/Set");
      r.Set = u.default;
      var c = e("./Map/Map");
      r.Map = c.default;
      var h = e("./HashSet/HashSet");
      r.HashSet = h.default;
      var f = e("./HashMap/HashMap");
      r.HashMap = f.default;
    }, {
      "./Deque/Deque": 26,
      "./HashMap/HashMap": 27,
      "./HashSet/HashSet": 28,
      "./LinkList/LinkList": 29,
      "./Map/Map": 30,
      "./PriorityQueue/PriorityQueue": 31,
      "./Queue/Queue": 32,
      "./Set/Set": 33,
      "./Stack/Stack": 34,
      "./Vector/Vector": 35
    }],
    37: [function (e, t, r) {
      "use strict";

      const n = e("yallist"),
            i = Symbol("max"),
            o = Symbol("length"),
            s = Symbol("lengthCalculator"),
            a = Symbol("allowStale"),
            l = Symbol("maxAge"),
            u = Symbol("dispose"),
            c = Symbol("noDisposeOnSet"),
            h = Symbol("lruList"),
            f = Symbol("cache"),
            p = Symbol("updateAgeOnGet"),
            d = () => 1;

      const g = (e, t, r) => {
        const n = e[f].get(t);

        if (n) {
          const t = n.value;

          if (y(e, t)) {
            if (m(e, n), !e[a]) return;
          } else r && (e[p] && (n.value.now = Date.now()), e[h].unshiftNode(n));

          return t.value;
        }
      },
            y = (e, t) => {
        if (!t || !t.maxAge && !e[l]) return !1;
        const r = Date.now() - t.now;
        return t.maxAge ? r > t.maxAge : e[l] && r > e[l];
      },
            b = e => {
        if (e[o] > e[i]) for (let t = e[h].tail; e[o] > e[i] && null !== t;) {
          const r = t.prev;
          m(e, t), t = r;
        }
      },
            m = (e, t) => {
        if (t) {
          const r = t.value;
          e[u] && e[u](r.key, r.value), e[o] -= r.length, e[f].delete(r.key), e[h].removeNode(t);
        }
      };

      class v {
        constructor(e, t, r, n, i) {
          this.key = e, this.value = t, this.length = r, this.now = n, this.maxAge = i || 0;
        }

      }

      const w = (e, t, r, n) => {
        let i = r.value;
        y(e, i) && (m(e, r), e[a] || (i = void 0)), i && t.call(n, i.value, i.key, e);
      };

      t.exports = class {
        constructor(e) {
          if ("number" == typeof e && (e = {
            max: e
          }), e || (e = {}), e.max && ("number" != typeof e.max || e.max < 0)) throw new TypeError("max must be a non-negative number");
          this[i] = e.max || 1 / 0;
          const t = e.length || d;
          if (this[s] = "function" != typeof t ? d : t, this[a] = e.stale || !1, e.maxAge && "number" != typeof e.maxAge) throw new TypeError("maxAge must be a number");
          this[l] = e.maxAge || 0, this[u] = e.dispose, this[c] = e.noDisposeOnSet || !1, this[p] = e.updateAgeOnGet || !1, this.reset();
        }

        set max(e) {
          if ("number" != typeof e || e < 0) throw new TypeError("max must be a non-negative number");
          this[i] = e || 1 / 0, b(this);
        }

        get max() {
          return this[i];
        }

        set allowStale(e) {
          this[a] = !!e;
        }

        get allowStale() {
          return this[a];
        }

        set maxAge(e) {
          if ("number" != typeof e) throw new TypeError("maxAge must be a non-negative number");
          this[l] = e, b(this);
        }

        get maxAge() {
          return this[l];
        }

        set lengthCalculator(e) {
          "function" != typeof e && (e = d), e !== this[s] && (this[s] = e, this[o] = 0, this[h].forEach(e => {
            e.length = this[s](e.value, e.key), this[o] += e.length;
          })), b(this);
        }

        get lengthCalculator() {
          return this[s];
        }

        get length() {
          return this[o];
        }

        get itemCount() {
          return this[h].length;
        }

        rforEach(e, t) {
          t = t || this;

          for (let r = this[h].tail; null !== r;) {
            const n = r.prev;
            w(this, e, r, t), r = n;
          }
        }

        forEach(e, t) {
          t = t || this;

          for (let r = this[h].head; null !== r;) {
            const n = r.next;
            w(this, e, r, t), r = n;
          }
        }

        keys() {
          return this[h].toArray().map(e => e.key);
        }

        values() {
          return this[h].toArray().map(e => e.value);
        }

        reset() {
          this[u] && this[h] && this[h].length && this[h].forEach(e => this[u](e.key, e.value)), this[f] = new Map(), this[h] = new n(), this[o] = 0;
        }

        dump() {
          return this[h].map(e => !y(this, e) && {
            k: e.key,
            v: e.value,
            e: e.now + (e.maxAge || 0)
          }).toArray().filter(e => e);
        }

        dumpLru() {
          return this[h];
        }

        set(e, t, r) {
          if ((r = r || this[l]) && "number" != typeof r) throw new TypeError("maxAge must be a number");
          const n = r ? Date.now() : 0,
                a = this[s](t, e);

          if (this[f].has(e)) {
            if (a > this[i]) return m(this, this[f].get(e)), !1;
            const s = this[f].get(e).value;
            return this[u] && (this[c] || this[u](e, s.value)), s.now = n, s.maxAge = r, s.value = t, this[o] += a - s.length, s.length = a, this.get(e), b(this), !0;
          }

          const p = new v(e, t, a, n, r);
          return p.length > this[i] ? (this[u] && this[u](e, t), !1) : (this[o] += p.length, this[h].unshift(p), this[f].set(e, this[h].head), b(this), !0);
        }

        has(e) {
          if (!this[f].has(e)) return !1;
          const t = this[f].get(e).value;
          return !y(this, t);
        }

        get(e) {
          return g(this, e, !0);
        }

        peek(e) {
          return g(this, e, !1);
        }

        pop() {
          const e = this[h].tail;
          return e ? (m(this, e), e.value) : null;
        }

        del(e) {
          m(this, this[f].get(e));
        }

        load(e) {
          this.reset();
          const t = Date.now();

          for (let r = e.length - 1; r >= 0; r--) {
            const n = e[r],
                  i = n.e || 0;
            if (0 === i) this.set(n.k, n.v);else {
              const e = i - t;
              e > 0 && this.set(n.k, n.v, e);
            }
          }
        }

        prune() {
          this[f].forEach((e, t) => g(this, t, !1));
        }

      };
    }, {
      yallist: 83
    }],
    38: [function (e, t, r) {
      (function (e) {
        (function () {
          const r = t.exports;
          r.types = {
            0: "reserved",
            1: "connect",
            2: "connack",
            3: "publish",
            4: "puback",
            5: "pubrec",
            6: "pubrel",
            7: "pubcomp",
            8: "subscribe",
            9: "suback",
            10: "unsubscribe",
            11: "unsuback",
            12: "pingreq",
            13: "pingresp",
            14: "disconnect",
            15: "auth"
          }, r.codes = {};

          for (const e in r.types) {
            const t = r.types[e];
            r.codes[t] = e;
          }

          r.CMD_SHIFT = 4, r.CMD_MASK = 240, r.DUP_MASK = 8, r.QOS_MASK = 3, r.QOS_SHIFT = 1, r.RETAIN_MASK = 1, r.VARBYTEINT_MASK = 127, r.VARBYTEINT_FIN_MASK = 128, r.VARBYTEINT_MAX = 268435455, r.SESSIONPRESENT_MASK = 1, r.SESSIONPRESENT_HEADER = e.from([r.SESSIONPRESENT_MASK]), r.CONNACK_HEADER = e.from([r.codes.connack << r.CMD_SHIFT]), r.USERNAME_MASK = 128, r.PASSWORD_MASK = 64, r.WILL_RETAIN_MASK = 32, r.WILL_QOS_MASK = 24, r.WILL_QOS_SHIFT = 3, r.WILL_FLAG_MASK = 4, r.CLEAN_SESSION_MASK = 2, r.CONNECT_HEADER = e.from([r.codes.connect << r.CMD_SHIFT]), r.properties = {
            sessionExpiryInterval: 17,
            willDelayInterval: 24,
            receiveMaximum: 33,
            maximumPacketSize: 39,
            topicAliasMaximum: 34,
            requestResponseInformation: 25,
            requestProblemInformation: 23,
            userProperties: 38,
            authenticationMethod: 21,
            authenticationData: 22,
            payloadFormatIndicator: 1,
            messageExpiryInterval: 2,
            contentType: 3,
            responseTopic: 8,
            correlationData: 9,
            maximumQoS: 36,
            retainAvailable: 37,
            assignedClientIdentifier: 18,
            reasonString: 31,
            wildcardSubscriptionAvailable: 40,
            subscriptionIdentifiersAvailable: 41,
            sharedSubscriptionAvailable: 42,
            serverKeepAlive: 19,
            responseInformation: 26,
            serverReference: 28,
            topicAlias: 35,
            subscriptionIdentifier: 11
          }, r.propertiesCodes = {};

          for (const e in r.properties) {
            const t = r.properties[e];
            r.propertiesCodes[t] = e;
          }

          function n(t) {
            return [0, 1, 2].map(n => [0, 1].map(i => [0, 1].map(o => {
              const s = e.alloc(1);
              return s.writeUInt8(r.codes[t] << r.CMD_SHIFT | (i ? r.DUP_MASK : 0) | n << r.QOS_SHIFT | o, 0, !0), s;
            })));
          }

          r.propertiesTypes = {
            sessionExpiryInterval: "int32",
            willDelayInterval: "int32",
            receiveMaximum: "int16",
            maximumPacketSize: "int32",
            topicAliasMaximum: "int16",
            requestResponseInformation: "byte",
            requestProblemInformation: "byte",
            userProperties: "pair",
            authenticationMethod: "string",
            authenticationData: "binary",
            payloadFormatIndicator: "byte",
            messageExpiryInterval: "int32",
            contentType: "string",
            responseTopic: "string",
            correlationData: "binary",
            maximumQoS: "int8",
            retainAvailable: "byte",
            assignedClientIdentifier: "string",
            reasonString: "string",
            wildcardSubscriptionAvailable: "byte",
            subscriptionIdentifiersAvailable: "byte",
            sharedSubscriptionAvailable: "byte",
            serverKeepAlive: "int16",
            responseInformation: "string",
            serverReference: "string",
            topicAlias: "int16",
            subscriptionIdentifier: "var"
          }, r.PUBLISH_HEADER = n("publish"), r.SUBSCRIBE_HEADER = n("subscribe"), r.SUBSCRIBE_OPTIONS_QOS_MASK = 3, r.SUBSCRIBE_OPTIONS_NL_MASK = 1, r.SUBSCRIBE_OPTIONS_NL_SHIFT = 2, r.SUBSCRIBE_OPTIONS_RAP_MASK = 1, r.SUBSCRIBE_OPTIONS_RAP_SHIFT = 3, r.SUBSCRIBE_OPTIONS_RH_MASK = 3, r.SUBSCRIBE_OPTIONS_RH_SHIFT = 4, r.SUBSCRIBE_OPTIONS_RH = [0, 16, 32], r.SUBSCRIBE_OPTIONS_NL = 4, r.SUBSCRIBE_OPTIONS_RAP = 8, r.SUBSCRIBE_OPTIONS_QOS = [0, 1, 2], r.UNSUBSCRIBE_HEADER = n("unsubscribe"), r.ACKS = {
            unsuback: n("unsuback"),
            puback: n("puback"),
            pubcomp: n("pubcomp"),
            pubrel: n("pubrel"),
            pubrec: n("pubrec")
          }, r.SUBACK_HEADER = e.from([r.codes.suback << r.CMD_SHIFT]), r.VERSION3 = e.from([3]), r.VERSION4 = e.from([4]), r.VERSION5 = e.from([5]), r.VERSION131 = e.from([131]), r.VERSION132 = e.from([132]), r.QOS = [0, 1, 2].map(t => e.from([t])), r.EMPTY = {
            pingreq: e.from([r.codes.pingreq << 4, 0]),
            pingresp: e.from([r.codes.pingresp << 4, 0]),
            disconnect: e.from([r.codes.disconnect << 4, 0])
          };
        }).call(this);
      }).call(this, e("buffer").Buffer);
    }, {
      buffer: 17
    }],
    39: [function (e, t, r) {
      (function (r) {
        (function () {
          const n = e("./writeToStream"),
                i = e("events");

          class o extends i {
            constructor() {
              super(), this._array = new Array(20), this._i = 0;
            }

            write(e) {
              return this._array[this._i++] = e, !0;
            }

            concat() {
              let e = 0;
              const t = new Array(this._array.length),
                    n = this._array;
              let i,
                  o = 0;

              for (i = 0; i < n.length && void 0 !== n[i]; i++) "string" != typeof n[i] ? t[i] = n[i].length : t[i] = r.byteLength(n[i]), e += t[i];

              const s = r.allocUnsafe(e);

              for (i = 0; i < n.length && void 0 !== n[i]; i++) "string" != typeof n[i] ? (n[i].copy(s, o), o += t[i]) : (s.write(n[i], o), o += t[i]);

              return s;
            }

          }

          t.exports = function (e, t) {
            const r = new o();
            return n(e, r, t), r.concat();
          };
        }).call(this);
      }).call(this, e("buffer").Buffer);
    }, {
      "./writeToStream": 44,
      buffer: 17,
      events: 22
    }],
    40: [function (e, t, r) {
      r.parser = e("./parser").parser, r.generate = e("./generate"), r.writeToStream = e("./writeToStream");
    }, {
      "./generate": 39,
      "./parser": 43,
      "./writeToStream": 44
    }],
    41: [function (e, t, r) {
      (function (e) {
        (function () {
          const r = 65536,
                n = {},
                i = e.isBuffer(e.from([1, 2]).subarray(0, 1));

          function o(t) {
            const r = e.allocUnsafe(2);
            return r.writeUInt8(t >> 8, 0), r.writeUInt8(255 & t, 1), r;
          }

          t.exports = {
            cache: n,
            generateCache: function () {
              for (let e = 0; e < r; e++) n[e] = o(e);
            },
            generateNumber: o,
            genBufVariableByteInt: function (t) {
              let r = 0,
                  n = 0;
              const o = e.allocUnsafe(4);

              do {
                r = t % 128 | 0, (t = t / 128 | 0) > 0 && (r |= 128), o.writeUInt8(r, n++);
              } while (t > 0 && n < 4);

              return t > 0 && (n = 0), i ? o.subarray(0, n) : o.slice(0, n);
            },
            generate4ByteBuffer: function (t) {
              const r = e.allocUnsafe(4);
              return r.writeUInt32BE(t, 0), r;
            }
          };
        }).call(this);
      }).call(this, e("buffer").Buffer);
    }, {
      buffer: 17
    }],
    42: [function (e, t, r) {
      t.exports = class {
        constructor() {
          this.cmd = null, this.retain = !1, this.qos = 0, this.dup = !1, this.length = -1, this.topic = null, this.payload = null;
        }

      };
    }, {}],
    43: [function (e, t, r) {
      const n = e("bl"),
            i = e("events"),
            o = e("./packet"),
            s = e("./constants"),
            a = e("debug")("mqtt-packet:parser");

      class l extends i {
        constructor() {
          super(), this.parser = this.constructor.parser;
        }

        static parser(e) {
          return this instanceof l ? (this.settings = e || {}, this._states = ["_parseHeader", "_parseLength", "_parsePayload", "_newPacket"], this._resetState(), this) : new l().parser(e);
        }

        _resetState() {
          a("_resetState: resetting packet, error, _list, and _stateCounter"), this.packet = new o(), this.error = null, this._list = n(), this._stateCounter = 0;
        }

        parse(e) {
          for (this.error && this._resetState(), this._list.append(e), a("parse: current state: %s", this._states[this._stateCounter]); (-1 !== this.packet.length || this._list.length > 0) && this[this._states[this._stateCounter]]() && !this.error;) this._stateCounter++, a("parse: state complete. _stateCounter is now: %d", this._stateCounter), a("parse: packet.length: %d, buffer list length: %d", this.packet.length, this._list.length), this._stateCounter >= this._states.length && (this._stateCounter = 0);

          return a("parse: exited while loop. packet: %d, buffer list length: %d", this.packet.length, this._list.length), this._list.length;
        }

        _parseHeader() {
          const e = this._list.readUInt8(0);

          return this.packet.cmd = s.types[e >> s.CMD_SHIFT], this.packet.retain = 0 != (e & s.RETAIN_MASK), this.packet.qos = e >> s.QOS_SHIFT & s.QOS_MASK, this.packet.dup = 0 != (e & s.DUP_MASK), a("_parseHeader: packet: %o", this.packet), this._list.consume(1), !0;
        }

        _parseLength() {
          const e = this._parseVarByteNum(!0);

          return e && (this.packet.length = e.value, this._list.consume(e.bytes)), a("_parseLength %d", e.value), !!e;
        }

        _parsePayload() {
          a("_parsePayload: payload %O", this._list);
          let e = !1;

          if (0 === this.packet.length || this._list.length >= this.packet.length) {
            switch (this._pos = 0, this.packet.cmd) {
              case "connect":
                this._parseConnect();

                break;

              case "connack":
                this._parseConnack();

                break;

              case "publish":
                this._parsePublish();

                break;

              case "puback":
              case "pubrec":
              case "pubrel":
              case "pubcomp":
                this._parseConfirmation();

                break;

              case "subscribe":
                this._parseSubscribe();

                break;

              case "suback":
                this._parseSuback();

                break;

              case "unsubscribe":
                this._parseUnsubscribe();

                break;

              case "unsuback":
                this._parseUnsuback();

                break;

              case "pingreq":
              case "pingresp":
                break;

              case "disconnect":
                this._parseDisconnect();

                break;

              case "auth":
                this._parseAuth();

                break;

              default:
                this._emitError(new Error("Not supported"));

            }

            e = !0;
          }

          return a("_parsePayload complete result: %s", e), e;
        }

        _parseConnect() {
          let e, t, r, n;
          a("_parseConnect");

          const i = {},
                o = this.packet,
                l = this._parseString();

          if (null === l) return this._emitError(new Error("Cannot parse protocolId"));
          if ("MQTT" !== l && "MQIsdp" !== l) return this._emitError(new Error("Invalid protocolId"));
          if (o.protocolId = l, this._pos >= this._list.length) return this._emitError(new Error("Packet too short"));
          if (o.protocolVersion = this._list.readUInt8(this._pos), o.protocolVersion >= 128 && (o.bridgeMode = !0, o.protocolVersion = o.protocolVersion - 128), 3 !== o.protocolVersion && 4 !== o.protocolVersion && 5 !== o.protocolVersion) return this._emitError(new Error("Invalid protocol version"));
          if (this._pos++, this._pos >= this._list.length) return this._emitError(new Error("Packet too short"));
          if (i.username = this._list.readUInt8(this._pos) & s.USERNAME_MASK, i.password = this._list.readUInt8(this._pos) & s.PASSWORD_MASK, i.will = this._list.readUInt8(this._pos) & s.WILL_FLAG_MASK, i.will && (o.will = {}, o.will.retain = 0 != (this._list.readUInt8(this._pos) & s.WILL_RETAIN_MASK), o.will.qos = (this._list.readUInt8(this._pos) & s.WILL_QOS_MASK) >> s.WILL_QOS_SHIFT), o.clean = 0 != (this._list.readUInt8(this._pos) & s.CLEAN_SESSION_MASK), this._pos++, o.keepalive = this._parseNum(), -1 === o.keepalive) return this._emitError(new Error("Packet too short"));

          if (5 === o.protocolVersion) {
            const e = this._parseProperties();

            Object.getOwnPropertyNames(e).length && (o.properties = e);
          }

          const u = this._parseString();

          if (null === u) return this._emitError(new Error("Packet too short"));

          if (o.clientId = u, a("_parseConnect: packet.clientId: %s", o.clientId), i.will) {
            if (5 === o.protocolVersion) {
              const e = this._parseProperties();

              Object.getOwnPropertyNames(e).length && (o.will.properties = e);
            }

            if (null === (e = this._parseString())) return this._emitError(new Error("Cannot parse will topic"));
            if (o.will.topic = e, a("_parseConnect: packet.will.topic: %s", o.will.topic), null === (t = this._parseBuffer())) return this._emitError(new Error("Cannot parse will payload"));
            o.will.payload = t, a("_parseConnect: packet.will.paylaod: %s", o.will.payload);
          }

          if (i.username) {
            if (null === (n = this._parseString())) return this._emitError(new Error("Cannot parse username"));
            o.username = n, a("_parseConnect: packet.username: %s", o.username);
          }

          if (i.password) {
            if (null === (r = this._parseBuffer())) return this._emitError(new Error("Cannot parse password"));
            o.password = r;
          }

          return this.settings = o, a("_parseConnect: complete"), o;
        }

        _parseConnack() {
          a("_parseConnack");
          const e = this.packet;
          if (this._list.length < 1) return null;
          if (e.sessionPresent = !!(this._list.readUInt8(this._pos++) & s.SESSIONPRESENT_MASK), 5 === this.settings.protocolVersion) this._list.length >= 2 ? e.reasonCode = this._list.readUInt8(this._pos++) : e.reasonCode = 0;else {
            if (this._list.length < 2) return null;
            e.returnCode = this._list.readUInt8(this._pos++);
          }
          if (-1 === e.returnCode || -1 === e.reasonCode) return this._emitError(new Error("Cannot parse return code"));

          if (5 === this.settings.protocolVersion) {
            const t = this._parseProperties();

            Object.getOwnPropertyNames(t).length && (e.properties = t);
          }

          a("_parseConnack: complete");
        }

        _parsePublish() {
          a("_parsePublish");
          const e = this.packet;
          if (e.topic = this._parseString(), null === e.topic) return this._emitError(new Error("Cannot parse topic"));

          if (!(e.qos > 0) || this._parseMessageId()) {
            if (5 === this.settings.protocolVersion) {
              const t = this._parseProperties();

              Object.getOwnPropertyNames(t).length && (e.properties = t);
            }

            e.payload = this._list.slice(this._pos, e.length), a("_parsePublish: payload from buffer list: %o", e.payload);
          }
        }

        _parseSubscribe() {
          a("_parseSubscribe");
          const e = this.packet;
          let t, r, n, i, o, l, u;
          if (1 !== e.qos) return this._emitError(new Error("Wrong subscribe header"));

          if (e.subscriptions = [], this._parseMessageId()) {
            if (5 === this.settings.protocolVersion) {
              const t = this._parseProperties();

              Object.getOwnPropertyNames(t).length && (e.properties = t);
            }

            for (; this._pos < e.length;) {
              if (null === (t = this._parseString())) return this._emitError(new Error("Cannot parse topic"));
              if (this._pos >= e.length) return this._emitError(new Error("Malformed Subscribe Payload"));
              n = (r = this._parseByte()) & s.SUBSCRIBE_OPTIONS_QOS_MASK, l = 0 != (r >> s.SUBSCRIBE_OPTIONS_NL_SHIFT & s.SUBSCRIBE_OPTIONS_NL_MASK), o = 0 != (r >> s.SUBSCRIBE_OPTIONS_RAP_SHIFT & s.SUBSCRIBE_OPTIONS_RAP_MASK), i = r >> s.SUBSCRIBE_OPTIONS_RH_SHIFT & s.SUBSCRIBE_OPTIONS_RH_MASK, u = {
                topic: t,
                qos: n
              }, 5 === this.settings.protocolVersion ? (u.nl = l, u.rap = o, u.rh = i) : this.settings.bridgeMode && (u.rh = 0, u.rap = !0, u.nl = !0), a("_parseSubscribe: push subscription `%s` to subscription", u), e.subscriptions.push(u);
            }
          }
        }

        _parseSuback() {
          a("_parseSuback");
          const e = this.packet;

          if (this.packet.granted = [], this._parseMessageId()) {
            if (5 === this.settings.protocolVersion) {
              const t = this._parseProperties();

              Object.getOwnPropertyNames(t).length && (e.properties = t);
            }

            for (; this._pos < this.packet.length;) this.packet.granted.push(this._list.readUInt8(this._pos++));
          }
        }

        _parseUnsubscribe() {
          a("_parseUnsubscribe");
          const e = this.packet;

          if (e.unsubscriptions = [], this._parseMessageId()) {
            if (5 === this.settings.protocolVersion) {
              const t = this._parseProperties();

              Object.getOwnPropertyNames(t).length && (e.properties = t);
            }

            for (; this._pos < e.length;) {
              const t = this._parseString();

              if (null === t) return this._emitError(new Error("Cannot parse topic"));
              a("_parseUnsubscribe: push topic `%s` to unsubscriptions", t), e.unsubscriptions.push(t);
            }
          }
        }

        _parseUnsuback() {
          a("_parseUnsuback");
          const e = this.packet;
          if (!this._parseMessageId()) return this._emitError(new Error("Cannot parse messageId"));

          if (5 === this.settings.protocolVersion) {
            const t = this._parseProperties();

            for (Object.getOwnPropertyNames(t).length && (e.properties = t), e.granted = []; this._pos < this.packet.length;) this.packet.granted.push(this._list.readUInt8(this._pos++));
          }
        }

        _parseConfirmation() {
          a("_parseConfirmation: packet.cmd: `%s`", this.packet.cmd);
          const e = this.packet;

          if (this._parseMessageId(), 5 === this.settings.protocolVersion && (e.length > 2 ? (e.reasonCode = this._parseByte(), a("_parseConfirmation: packet.reasonCode `%d`", e.reasonCode)) : e.reasonCode = 0, e.length > 3)) {
            const t = this._parseProperties();

            Object.getOwnPropertyNames(t).length && (e.properties = t);
          }

          return !0;
        }

        _parseDisconnect() {
          const e = this.packet;

          if (a("_parseDisconnect"), 5 === this.settings.protocolVersion) {
            this._list.length > 0 ? e.reasonCode = this._parseByte() : e.reasonCode = 0;

            const t = this._parseProperties();

            Object.getOwnPropertyNames(t).length && (e.properties = t);
          }

          return a("_parseDisconnect result: true"), !0;
        }

        _parseAuth() {
          a("_parseAuth");
          const e = this.packet;
          if (5 !== this.settings.protocolVersion) return this._emitError(new Error("Not supported auth packet for this version MQTT"));
          e.reasonCode = this._parseByte();

          const t = this._parseProperties();

          return Object.getOwnPropertyNames(t).length && (e.properties = t), a("_parseAuth: result: true"), !0;
        }

        _parseMessageId() {
          const e = this.packet;
          return e.messageId = this._parseNum(), null === e.messageId ? (this._emitError(new Error("Cannot parse messageId")), !1) : (a("_parseMessageId: packet.messageId %d", e.messageId), !0);
        }

        _parseString(e) {
          const t = this._parseNum(),
                r = t + this._pos;

          if (-1 === t || r > this._list.length || r > this.packet.length) return null;

          const n = this._list.toString("utf8", this._pos, r);

          return this._pos += t, a("_parseString: result: %s", n), n;
        }

        _parseStringPair() {
          return a("_parseStringPair"), {
            name: this._parseString(),
            value: this._parseString()
          };
        }

        _parseBuffer() {
          const e = this._parseNum(),
                t = e + this._pos;

          if (-1 === e || t > this._list.length || t > this.packet.length) return null;

          const r = this._list.slice(this._pos, t);

          return this._pos += e, a("_parseBuffer: result: %o", r), r;
        }

        _parseNum() {
          if (this._list.length - this._pos < 2) return -1;

          const e = this._list.readUInt16BE(this._pos);

          return this._pos += 2, a("_parseNum: result: %s", e), e;
        }

        _parse4ByteNum() {
          if (this._list.length - this._pos < 4) return -1;

          const e = this._list.readUInt32BE(this._pos);

          return this._pos += 4, a("_parse4ByteNum: result: %s", e), e;
        }

        _parseVarByteNum(e) {
          a("_parseVarByteNum");
          let t,
              r = 0,
              n = 1,
              i = 0,
              o = !1;
          const l = this._pos ? this._pos : 0;

          for (; r < 4 && l + r < this._list.length;) {
            if (i += n * ((t = this._list.readUInt8(l + r++)) & s.VARBYTEINT_MASK), n *= 128, 0 == (t & s.VARBYTEINT_FIN_MASK)) {
              o = !0;
              break;
            }

            if (this._list.length <= r) break;
          }

          return !o && 4 === r && this._list.length >= r && this._emitError(new Error("Invalid variable byte integer")), l && (this._pos += r), a("_parseVarByteNum: result: %o", o = !!o && (e ? {
            bytes: r,
            value: i
          } : i)), o;
        }

        _parseByte() {
          let e;
          return this._pos < this._list.length && (e = this._list.readUInt8(this._pos), this._pos++), a("_parseByte: result: %o", e), e;
        }

        _parseByType(e) {
          switch (a("_parseByType: type: %s", e), e) {
            case "byte":
              return 0 !== this._parseByte();

            case "int8":
              return this._parseByte();

            case "int16":
              return this._parseNum();

            case "int32":
              return this._parse4ByteNum();

            case "var":
              return this._parseVarByteNum();

            case "string":
              return this._parseString();

            case "pair":
              return this._parseStringPair();

            case "binary":
              return this._parseBuffer();
          }
        }

        _parseProperties() {
          a("_parseProperties");

          const e = this._parseVarByteNum(),
                t = this._pos + e,
                r = {};

          for (; this._pos < t;) {
            const e = this._parseByte();

            if (!e) return this._emitError(new Error("Cannot parse property code type")), !1;
            const t = s.propertiesCodes[e];
            if (!t) return this._emitError(new Error("Unknown property")), !1;
            if ("userProperties" !== t) r[t] ? Array.isArray(r[t]) ? r[t].push(this._parseByType(s.propertiesTypes[t])) : (r[t] = [r[t]], r[t].push(this._parseByType(s.propertiesTypes[t]))) : r[t] = this._parseByType(s.propertiesTypes[t]);else {
              r[t] || (r[t] = Object.create(null));

              const e = this._parseByType(s.propertiesTypes[t]);

              if (r[t][e.name]) {
                if (Array.isArray(r[t][e.name])) r[t][e.name].push(e.value);else {
                  const n = r[t][e.name];
                  r[t][e.name] = [n], r[t][e.name].push(e.value);
                }
              } else r[t][e.name] = e.value;
            }
          }

          return r;
        }

        _newPacket() {
          return a("_newPacket"), this.packet && (this._list.consume(this.packet.length), a("_newPacket: parser emit packet: packet.cmd: %s, packet.payload: %s, packet.length: %d", this.packet.cmd, this.packet.payload, this.packet.length), this.emit("packet", this.packet)), a("_newPacket: new packet"), this.packet = new o(), this._pos = 0, !0;
        }

        _emitError(e) {
          a("_emitError"), this.error = e, this.emit("error", e);
        }

      }

      t.exports = l;
    }, {
      "./constants": 38,
      "./packet": 42,
      bl: 15,
      debug: 18,
      events: 22
    }],
    44: [function (e, t, r) {
      (function (r) {
        (function () {
          const n = e("./constants"),
                i = r.allocUnsafe(0),
                o = r.from([0]),
                s = e("./numbers"),
                a = e("process-nextick-args").nextTick,
                l = e("debug")("mqtt-packet:writeToStream"),
                u = s.cache,
                c = s.generateNumber,
                h = s.generateCache,
                f = s.genBufVariableByteInt,
                p = s.generate4ByteBuffer;
          let d = k,
              g = !0;

          function y(e, t, s) {
            switch (l("generate called"), t.cork && (t.cork(), a(b, t)), g && (g = !1, h()), l("generate: packet.cmd: %s", e.cmd), e.cmd) {
              case "connect":
                return function (e, t, i) {
                  const o = e || {},
                        s = o.protocolId || "MQTT";
                  let a = o.protocolVersion || 4;
                  const l = o.will;
                  let u = o.clean;
                  const c = o.keepalive || 0,
                        h = o.clientId || "",
                        f = o.username,
                        p = o.password,
                        g = o.properties;
                  void 0 === u && (u = !0);
                  let y = 0;
                  if (!s || "string" != typeof s && !r.isBuffer(s)) return t.emit("error", new Error("Invalid protocolId")), !1;
                  y += s.length + 2;
                  if (3 !== a && 4 !== a && 5 !== a) return t.emit("error", new Error("Invalid protocol version")), !1;
                  y += 1;
                  if (("string" == typeof h || r.isBuffer(h)) && (h || a >= 4) && (h || u)) y += r.byteLength(h) + 2;else {
                    if (a < 4) return t.emit("error", new Error("clientId must be supplied before 3.1.1")), !1;
                    if (1 * u == 0) return t.emit("error", new Error("clientId must be given if cleanSession set to 0")), !1;
                  }
                  if ("number" != typeof c || c < 0 || c > 65535 || c % 1 != 0) return t.emit("error", new Error("Invalid keepalive")), !1;
                  y += 2;

                  if (y += 1, 5 === a) {
                    var b = C(t, g);
                    if (!b) return !1;
                    y += b.length;
                  }

                  if (l) {
                    if ("object" != typeof l) return t.emit("error", new Error("Invalid will")), !1;
                    if (!l.topic || "string" != typeof l.topic) return t.emit("error", new Error("Invalid will topic")), !1;

                    if (y += r.byteLength(l.topic) + 2, y += 2, l.payload) {
                      if (!(l.payload.length >= 0)) return t.emit("error", new Error("Invalid will payload")), !1;
                      "string" == typeof l.payload ? y += r.byteLength(l.payload) : y += l.payload.length;
                    }

                    var m = {};

                    if (5 === a) {
                      if (!(m = C(t, l.properties))) return !1;
                      y += m.length;
                    }
                  }

                  let _ = !1;

                  if (null != f) {
                    if (!P(f)) return t.emit("error", new Error("Invalid username")), !1;
                    _ = !0, y += r.byteLength(f) + 2;
                  }

                  if (null != p) {
                    if (!_) return t.emit("error", new Error("Username is required to use password")), !1;
                    if (!P(p)) return t.emit("error", new Error("Invalid password")), !1;
                    y += I(p) + 2;
                  }

                  t.write(n.CONNECT_HEADER), v(t, y), E(t, s), o.bridgeMode && (a += 128);
                  t.write(131 === a ? n.VERSION131 : 132 === a ? n.VERSION132 : 4 === a ? n.VERSION4 : 5 === a ? n.VERSION5 : n.VERSION3);
                  let k = 0;
                  k |= null != f ? n.USERNAME_MASK : 0, k |= null != p ? n.PASSWORD_MASK : 0, k |= l && l.retain ? n.WILL_RETAIN_MASK : 0, k |= l && l.qos ? l.qos << n.WILL_QOS_SHIFT : 0, k |= l ? n.WILL_FLAG_MASK : 0, k |= u ? n.CLEAN_SESSION_MASK : 0, t.write(r.from([k])), d(t, c), 5 === a && b.write();
                  E(t, h), l && (5 === a && m.write(), w(t, l.topic), E(t, l.payload));
                  null != f && E(t, f);
                  null != p && E(t, p);
                  return !0;
                }(e, t);

              case "connack":
                return function (e, t, i) {
                  const s = i ? i.protocolVersion : 4,
                        a = e || {},
                        l = 5 === s ? a.reasonCode : a.returnCode,
                        u = a.properties;
                  let c = 2;
                  if ("number" != typeof l) return t.emit("error", new Error("Invalid return code")), !1;
                  let h = null;

                  if (5 === s) {
                    if (!(h = C(t, u))) return !1;
                    c += h.length;
                  }

                  t.write(n.CONNACK_HEADER), v(t, c), t.write(a.sessionPresent ? n.SESSIONPRESENT_HEADER : o), t.write(r.from([l])), null != h && h.write();
                  return !0;
                }(e, t, s);

              case "publish":
                return function (e, t, o) {
                  l("publish: packet: %o", e);
                  const s = o ? o.protocolVersion : 4,
                        a = e || {},
                        u = a.qos || 0,
                        c = a.retain ? n.RETAIN_MASK : 0,
                        h = a.topic,
                        f = a.payload || i,
                        p = a.messageId,
                        g = a.properties;
                  let y = 0;
                  if ("string" == typeof h) y += r.byteLength(h) + 2;else {
                    if (!r.isBuffer(h)) return t.emit("error", new Error("Invalid topic")), !1;
                    y += h.length + 2;
                  }
                  r.isBuffer(f) ? y += f.length : y += r.byteLength(f);
                  if (u && "number" != typeof p) return t.emit("error", new Error("Invalid messageId")), !1;
                  u && (y += 2);
                  let b = null;

                  if (5 === s) {
                    if (!(b = C(t, g))) return !1;
                    y += b.length;
                  }

                  t.write(n.PUBLISH_HEADER[u][a.dup ? 1 : 0][c ? 1 : 0]), v(t, y), d(t, I(h)), t.write(h), u > 0 && d(t, p);
                  null != b && b.write();
                  return l("publish: payload: %o", f), t.write(f);
                }(e, t, s);

              case "puback":
              case "pubrec":
              case "pubrel":
              case "pubcomp":
                return function (e, t, i) {
                  const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.cmd || "puback",
                        l = s.messageId,
                        u = s.dup && "pubrel" === a ? n.DUP_MASK : 0;
                  let c = 0;
                  const h = s.reasonCode,
                        f = s.properties;
                  let p = 5 === o ? 3 : 2;
                  "pubrel" === a && (c = 1);
                  if ("number" != typeof l) return t.emit("error", new Error("Invalid messageId")), !1;
                  let g = null;

                  if (5 === o && "object" == typeof f) {
                    if (!(g = T(t, f, i, p))) return !1;
                    p += g.length;
                  }

                  t.write(n.ACKS[a][c][u][0]), v(t, p), d(t, l), 5 === o && t.write(r.from([h]));
                  null !== g && g.write();
                  return !0;
                }(e, t, s);

              case "subscribe":
                return function (e, t, i) {
                  l("subscribe: packet: ");
                  const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.dup ? n.DUP_MASK : 0,
                        u = s.messageId,
                        c = s.subscriptions,
                        h = s.properties;
                  let f = 0;
                  if ("number" != typeof u) return t.emit("error", new Error("Invalid messageId")), !1;
                  f += 2;
                  let p = null;

                  if (5 === o) {
                    if (!(p = C(t, h))) return !1;
                    f += p.length;
                  }

                  if ("object" != typeof c || !c.length) return t.emit("error", new Error("Invalid subscriptions")), !1;

                  for (let e = 0; e < c.length; e += 1) {
                    const n = c[e].topic,
                          i = c[e].qos;
                    if ("string" != typeof n) return t.emit("error", new Error("Invalid subscriptions - invalid topic")), !1;
                    if ("number" != typeof i) return t.emit("error", new Error("Invalid subscriptions - invalid qos")), !1;

                    if (5 === o) {
                      const r = c[e].nl || !1;
                      if ("boolean" != typeof r) return t.emit("error", new Error("Invalid subscriptions - invalid No Local")), !1;
                      const n = c[e].rap || !1;
                      if ("boolean" != typeof n) return t.emit("error", new Error("Invalid subscriptions - invalid Retain as Published")), !1;
                      const i = c[e].rh || 0;
                      if ("number" != typeof i || i > 2) return t.emit("error", new Error("Invalid subscriptions - invalid Retain Handling")), !1;
                    }

                    f += r.byteLength(n) + 2 + 1;
                  }

                  l("subscribe: writing to stream: %o", n.SUBSCRIBE_HEADER), t.write(n.SUBSCRIBE_HEADER[1][a ? 1 : 0][0]), v(t, f), d(t, u), null !== p && p.write();
                  let g = !0;

                  for (const e of c) {
                    const i = e.topic,
                          s = e.qos,
                          a = +e.nl,
                          l = +e.rap,
                          u = e.rh;
                    let c;
                    w(t, i), c = n.SUBSCRIBE_OPTIONS_QOS[s], 5 === o && (c |= a ? n.SUBSCRIBE_OPTIONS_NL : 0, c |= l ? n.SUBSCRIBE_OPTIONS_RAP : 0, c |= u ? n.SUBSCRIBE_OPTIONS_RH[u] : 0), g = t.write(r.from([c]));
                  }

                  return g;
                }(e, t, s);

              case "suback":
                return function (e, t, i) {
                  const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.messageId,
                        l = s.granted,
                        u = s.properties;
                  let c = 0;
                  if ("number" != typeof a) return t.emit("error", new Error("Invalid messageId")), !1;
                  c += 2;
                  if ("object" != typeof l || !l.length) return t.emit("error", new Error("Invalid qos vector")), !1;

                  for (let e = 0; e < l.length; e += 1) {
                    if ("number" != typeof l[e]) return t.emit("error", new Error("Invalid qos vector")), !1;
                    c += 1;
                  }

                  let h = null;

                  if (5 === o) {
                    if (!(h = T(t, u, i, c))) return !1;
                    c += h.length;
                  }

                  t.write(n.SUBACK_HEADER), v(t, c), d(t, a), null !== h && h.write();
                  return t.write(r.from(l));
                }(e, t, s);

              case "unsubscribe":
                return function (e, t, i) {
                  const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.messageId,
                        l = s.dup ? n.DUP_MASK : 0,
                        u = s.unsubscriptions,
                        c = s.properties;
                  let h = 0;
                  if ("number" != typeof a) return t.emit("error", new Error("Invalid messageId")), !1;
                  h += 2;
                  if ("object" != typeof u || !u.length) return t.emit("error", new Error("Invalid unsubscriptions")), !1;

                  for (let e = 0; e < u.length; e += 1) {
                    if ("string" != typeof u[e]) return t.emit("error", new Error("Invalid unsubscriptions")), !1;
                    h += r.byteLength(u[e]) + 2;
                  }

                  let f = null;

                  if (5 === o) {
                    if (!(f = C(t, c))) return !1;
                    h += f.length;
                  }

                  t.write(n.UNSUBSCRIBE_HEADER[1][l ? 1 : 0][0]), v(t, h), d(t, a), null !== f && f.write();
                  let p = !0;

                  for (let e = 0; e < u.length; e++) p = w(t, u[e]);

                  return p;
                }(e, t, s);

              case "unsuback":
                return function (e, t, i) {
                  const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.messageId,
                        l = s.dup ? n.DUP_MASK : 0,
                        u = s.granted,
                        c = s.properties,
                        h = s.cmd;
                  let f = 2;
                  if ("number" != typeof a) return t.emit("error", new Error("Invalid messageId")), !1;

                  if (5 === o) {
                    if ("object" != typeof u || !u.length) return t.emit("error", new Error("Invalid qos vector")), !1;

                    for (let e = 0; e < u.length; e += 1) {
                      if ("number" != typeof u[e]) return t.emit("error", new Error("Invalid qos vector")), !1;
                      f += 1;
                    }
                  }

                  let p = null;

                  if (5 === o) {
                    if (!(p = T(t, c, i, f))) return !1;
                    f += p.length;
                  }

                  t.write(n.ACKS[h][0][l][0]), v(t, f), d(t, a), null !== p && p.write();
                  5 === o && t.write(r.from(u));
                  return !0;
                }(e, t, s);

              case "pingreq":
              case "pingresp":
                return function (e, t, r) {
                  return t.write(n.EMPTY[e.cmd]);
                }(e, t);

              case "disconnect":
                return function (e, t, i) {
                  const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.reasonCode,
                        l = s.properties;
                  let u = 5 === o ? 1 : 0,
                      c = null;

                  if (5 === o) {
                    if (!(c = T(t, l, i, u))) return !1;
                    u += c.length;
                  }

                  t.write(r.from([n.codes.disconnect << 4])), v(t, u), 5 === o && t.write(r.from([a]));
                  null !== c && c.write();
                  return !0;
                }(e, t, s);

              case "auth":
                return function (e, t, i) {
                  const o = i ? i.protocolVersion : 4,
                        s = e || {},
                        a = s.reasonCode,
                        l = s.properties;
                  let u = 5 === o ? 1 : 0;
                  5 !== o && t.emit("error", new Error("Invalid mqtt version for auth packet"));
                  const c = T(t, l, i, u);
                  if (!c) return !1;
                  u += c.length, t.write(r.from([n.codes.auth << 4])), v(t, u), t.write(r.from([a])), null !== c && c.write();
                  return !0;
                }(e, t, s);

              default:
                return t.emit("error", new Error("Unknown command")), !1;
            }
          }

          function b(e) {
            e.uncork();
          }

          Object.defineProperty(y, "cacheNumbers", {
            get: () => d === k,

            set(e) {
              e ? (u && 0 !== Object.keys(u).length || (g = !0), d = k) : (g = !1, d = S);
            }

          });
          const m = {};

          function v(e, t) {
            if (t > n.VARBYTEINT_MAX) return e.emit("error", new Error(`Invalid variable byte integer: ${t}`)), !1;
            let r = m[t];
            return r || (r = f(t), t < 16384 && (m[t] = r)), l("writeVarByteInt: writing to stream: %o", r), e.write(r);
          }

          function w(e, t) {
            const n = r.byteLength(t);
            return d(e, n), l("writeString: %s", t), e.write(t, "utf8");
          }

          function _(e, t, r) {
            w(e, t), w(e, r);
          }

          function k(e, t) {
            return l("writeNumberCached: number: %d", t), l("writeNumberCached: %o", u[t]), e.write(u[t]);
          }

          function S(e, t) {
            const r = c(t);
            return l("writeNumberGenerated: %o", r), e.write(r);
          }

          function E(e, t) {
            "string" == typeof t ? w(e, t) : t ? (d(e, t.length), e.write(t)) : d(e, 0);
          }

          function C(e, t) {
            if ("object" != typeof t || null != t.length) return {
              length: 1,

              write() {
                A(e, {}, 0);
              }

            };
            let i = 0;

            function o(t, i) {
              let o = 0;

              switch (n.propertiesTypes[t]) {
                case "byte":
                  if ("boolean" != typeof i) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                  o += 2;
                  break;

                case "int8":
                  if ("number" != typeof i || i < 0 || i > 255) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                  o += 2;
                  break;

                case "binary":
                  if (i && null === i) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                  o += 1 + r.byteLength(i) + 2;
                  break;

                case "int16":
                  if ("number" != typeof i || i < 0 || i > 65535) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                  o += 3;
                  break;

                case "int32":
                  if ("number" != typeof i || i < 0 || i > 4294967295) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                  o += 5;
                  break;

                case "var":
                  if ("number" != typeof i || i < 0 || i > 268435455) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                  o += 1 + r.byteLength(f(i));
                  break;

                case "string":
                  if ("string" != typeof i) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                  o += 3 + r.byteLength(i.toString());
                  break;

                case "pair":
                  if ("object" != typeof i) return e.emit("error", new Error(`Invalid ${t}: ${i}`)), !1;
                  o += Object.getOwnPropertyNames(i).reduce((e, t) => {
                    const n = i[t];
                    return Array.isArray(n) ? e += n.reduce((e, n) => e += 3 + r.byteLength(t.toString()) + 2 + r.byteLength(n.toString()), 0) : e += 3 + r.byteLength(t.toString()) + 2 + r.byteLength(i[t].toString()), e;
                  }, 0);
                  break;

                default:
                  return e.emit("error", new Error(`Invalid property ${t}: ${i}`)), !1;
              }

              return o;
            }

            if (t) for (const e in t) {
              let r = 0,
                  n = 0;
              const s = t[e];
              if (Array.isArray(s)) for (let t = 0; t < s.length; t++) {
                if (!(n = o(e, s[t]))) return !1;
                r += n;
              } else {
                if (!(n = o(e, s))) return !1;
                r = n;
              }
              if (!r) return !1;
              i += r;
            }
            return {
              length: r.byteLength(f(i)) + i,

              write() {
                A(e, t, i);
              }

            };
          }

          function T(e, t, r, n) {
            const i = ["reasonString", "userProperties"],
                  o = r && r.properties && r.properties.maximumPacketSize ? r.properties.maximumPacketSize : 0;
            let s = C(e, t);
            if (o) for (; n + s.length > o;) {
              const r = i.shift();
              if (!r || !t[r]) return !1;
              delete t[r], s = C(e, t);
            }
            return s;
          }

          function x(e, t, i) {
            switch (n.propertiesTypes[t]) {
              case "byte":
                e.write(r.from([n.properties[t]])), e.write(r.from([+i]));
                break;

              case "int8":
                e.write(r.from([n.properties[t]])), e.write(r.from([i]));
                break;

              case "binary":
                e.write(r.from([n.properties[t]])), E(e, i);
                break;

              case "int16":
                e.write(r.from([n.properties[t]])), d(e, i);
                break;

              case "int32":
                e.write(r.from([n.properties[t]])), function (e, t) {
                  const r = p(t);
                  l("write4ByteNumber: %o", r), e.write(r);
                }(e, i);
                break;

              case "var":
                e.write(r.from([n.properties[t]])), v(e, i);
                break;

              case "string":
                e.write(r.from([n.properties[t]])), w(e, i);
                break;

              case "pair":
                Object.getOwnPropertyNames(i).forEach(o => {
                  const s = i[o];
                  Array.isArray(s) ? s.forEach(i => {
                    e.write(r.from([n.properties[t]])), _(e, o.toString(), i.toString());
                  }) : (e.write(r.from([n.properties[t]])), _(e, o.toString(), s.toString()));
                });
                break;

              default:
                return e.emit("error", new Error(`Invalid property ${t} value: ${i}`)), !1;
            }
          }

          function A(e, t, r) {
            v(e, r);

            for (const r in t) if (Object.prototype.hasOwnProperty.call(t, r) && null !== t[r]) {
              const n = t[r];
              if (Array.isArray(n)) for (let t = 0; t < n.length; t++) x(e, r, n[t]);else x(e, r, n);
            }
          }

          function I(e) {
            return e ? e instanceof r ? e.length : r.byteLength(e) : 0;
          }

          function P(e) {
            return "string" == typeof e || e instanceof r;
          }

          t.exports = y;
        }).call(this);
      }).call(this, e("buffer").Buffer);
    }, {
      "./constants": 38,
      "./numbers": 41,
      buffer: 17,
      debug: 18,
      "process-nextick-args": 49
    }],
    45: [function (e, t, r) {
      var n = 1e3,
          i = 60 * n,
          o = 60 * i,
          s = 24 * o,
          a = 7 * s,
          l = 365.25 * s;

      function u(e, t, r, n) {
        var i = t >= 1.5 * r;
        return Math.round(e / r) + " " + n + (i ? "s" : "");
      }

      t.exports = function (e, t) {
        t = t || {};
        var r = typeof e;
        if ("string" === r && e.length > 0) return function (e) {
          if ((e = String(e)).length > 100) return;
          var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
          if (!t) return;
          var r = parseFloat(t[1]);

          switch ((t[2] || "ms").toLowerCase()) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return r * l;

            case "weeks":
            case "week":
            case "w":
              return r * a;

            case "days":
            case "day":
            case "d":
              return r * s;

            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return r * o;

            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return r * i;

            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return r * n;

            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return r;

            default:
              return;
          }
        }(e);
        if ("number" === r && isFinite(e)) return t.long ? function (e) {
          var t = Math.abs(e);
          if (t >= s) return u(e, t, s, "day");
          if (t >= o) return u(e, t, o, "hour");
          if (t >= i) return u(e, t, i, "minute");
          if (t >= n) return u(e, t, n, "second");
          return e + " ms";
        }(e) : function (e) {
          var t = Math.abs(e);
          if (t >= s) return Math.round(e / s) + "d";
          if (t >= o) return Math.round(e / o) + "h";
          if (t >= i) return Math.round(e / i) + "m";
          if (t >= n) return Math.round(e / n) + "s";
          return e + "ms";
        }(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
      };
    }, {}],
    46: [function (e, t, r) {
      const n = e("./lib/number-allocator.js");
      t.exports.NumberAllocator = n;
    }, {
      "./lib/number-allocator.js": 47
    }],
    47: [function (e, t, r) {
      "use strict";

      const n = e("js-sdsl").Set,
            i = e("debug")("number-allocator:trace"),
            o = e("debug")("number-allocator:error");

      function s(e, t) {
        this.low = e, this.high = t;
      }

      function a(e, t) {
        if (!(this instanceof a)) return new a(e, t);
        this.min = e, this.max = t, this.ss = new n([], (e, t) => e.compare(t)), i("Create"), this.clear();
      }

      s.prototype.equals = function (e) {
        return this.low === e.low && this.high === e.high;
      }, s.prototype.compare = function (e) {
        return this.low < e.low && this.high < e.low ? -1 : e.low < this.low && e.high < this.low ? 1 : 0;
      }, a.prototype.firstVacant = function () {
        return 0 === this.ss.size() ? null : this.ss.front().low;
      }, a.prototype.alloc = function () {
        if (0 === this.ss.size()) return i("alloc():empty"), null;
        const e = this.ss.front(),
              t = e.low;
        return t + 1 <= e.high ? ++e.low : this.ss.eraseElementByPos(0), i("alloc():" + t), t;
      }, a.prototype.use = function (e) {
        const t = new s(e, e),
              r = this.ss.lowerBound(t);

        if (r) {
          if (r.equals(t)) return this.ss.eraseElementByValue(r), i("use():" + e), !0;
          if (r.low > e) return !1;
          if (r.low === e) return ++r.low, i("use():" + e), !0;
          if (r.high === e) return --r.high, i("use():" + e), !0;
          const n = r.low;
          return r.low = e + 1, this.ss.insert(new s(n, e - 1)), i("use():" + e), !0;
        }

        return i("use():failed"), !1;
      }, a.prototype.free = function (e) {
        if (e < this.min || e > this.max) return void o("free():" + e + " is out of range");
        const t = new s(e, e),
              r = this.ss.lowerBound(t);

        if (r) {
          if (r.low <= e && e <= r.high) return void o("free():" + e + " has already been vacant");
          if (r === this.ss.front()) e + 1 === r.low ? --r.low : this.ss.insert(t);else {
            const n = this.ss.reverseLowerBound(t);
            n.high + 1 === e ? e + 1 === r.low ? (this.ss.eraseElementByValue(n), r.low = n.low) : n.high = e : e + 1 === r.low ? r.low = e : this.ss.insert(t);
          }
        } else {
          if (r === this.ss.front()) return void this.ss.insert(t);
          const n = this.ss.reverseLowerBound(t);
          n.high + 1 === e ? n.high = e : this.ss.insert(t);
        }

        i("free():" + e);
      }, a.prototype.clear = function () {
        i("clear()"), this.ss.clear(), this.ss.insert(new s(this.min, this.max));
      }, a.prototype.intervalCount = function () {
        return this.ss.size();
      }, a.prototype.dump = function () {
        console.log("length:" + this.ss.size());

        for (const e of this.ss) console.log(e);
      }, t.exports = a;
    }, {
      debug: 18,
      "js-sdsl": 36
    }],
    48: [function (e, t, r) {
      var n = e("wrappy");

      function i(e) {
        var t = function () {
          return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments));
        };

        return t.called = !1, t;
      }

      function o(e) {
        var t = function () {
          if (t.called) throw new Error(t.onceError);
          return t.called = !0, t.value = e.apply(this, arguments);
        },
            r = e.name || "Function wrapped with `once`";

        return t.onceError = r + " shouldn't be called more than once", t.called = !1, t;
      }

      t.exports = n(i), t.exports.strict = n(o), i.proto = i(function () {
        Object.defineProperty(Function.prototype, "once", {
          value: function () {
            return i(this);
          },
          configurable: !0
        }), Object.defineProperty(Function.prototype, "onceStrict", {
          value: function () {
            return o(this);
          },
          configurable: !0
        });
      });
    }, {
      wrappy: 79
    }],
    49: [function (e, t, r) {
      (function (e) {
        (function () {
          "use strict";

          void 0 === e || !e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? t.exports = {
            nextTick: function (t, r, n, i) {
              if ("function" != typeof t) throw new TypeError('"callback" argument must be a function');
              var o,
                  s,
                  a = arguments.length;

              switch (a) {
                case 0:
                case 1:
                  return e.nextTick(t);

                case 2:
                  return e.nextTick(function () {
                    t.call(null, r);
                  });

                case 3:
                  return e.nextTick(function () {
                    t.call(null, r, n);
                  });

                case 4:
                  return e.nextTick(function () {
                    t.call(null, r, n, i);
                  });

                default:
                  for (o = new Array(a - 1), s = 0; s < o.length;) o[s++] = arguments[s];

                  return e.nextTick(function () {
                    t.apply(null, o);
                  });
              }
            }
          } : t.exports = e;
        }).call(this);
      }).call(this, e("_process"));
    }, {
      _process: 50
    }],
    50: [function (e, t, r) {
      var n,
          i,
          o = t.exports = {};

      function s() {
        throw new Error("setTimeout has not been defined");
      }

      function a() {
        throw new Error("clearTimeout has not been defined");
      }

      function l(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === s || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);

        try {
          return n(e, 0);
        } catch (t) {
          try {
            return n.call(null, e, 0);
          } catch (t) {
            return n.call(this, e, 0);
          }
        }
      }

      !function () {
        try {
          n = "function" == typeof setTimeout ? setTimeout : s;
        } catch (e) {
          n = s;
        }

        try {
          i = "function" == typeof clearTimeout ? clearTimeout : a;
        } catch (e) {
          i = a;
        }
      }();
      var u,
          c = [],
          h = !1,
          f = -1;

      function p() {
        h && u && (h = !1, u.length ? c = u.concat(c) : f = -1, c.length && d());
      }

      function d() {
        if (!h) {
          var e = l(p);
          h = !0;

          for (var t = c.length; t;) {
            for (u = c, c = []; ++f < t;) u && u[f].run();

            f = -1, t = c.length;
          }

          u = null, h = !1, function (e) {
            if (i === clearTimeout) return clearTimeout(e);
            if ((i === a || !i) && clearTimeout) return i = clearTimeout, clearTimeout(e);

            try {
              i(e);
            } catch (t) {
              try {
                return i.call(null, e);
              } catch (t) {
                return i.call(this, e);
              }
            }
          }(e);
        }
      }

      function g(e, t) {
        this.fun = e, this.array = t;
      }

      function y() {}

      o.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        c.push(new g(e, t)), 1 !== c.length || h || l(d);
      }, g.prototype.run = function () {
        this.fun.apply(null, this.array);
      }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function (e) {
        return [];
      }, o.binding = function (e) {
        throw new Error("process.binding is not supported");
      }, o.cwd = function () {
        return "/";
      }, o.chdir = function (e) {
        throw new Error("process.chdir is not supported");
      }, o.umask = function () {
        return 0;
      };
    }, {}],
    51: [function (e, t, r) {
      (function (e) {
        (function () {
          !function (n) {
            var i = "object" == typeof r && r && !r.nodeType && r,
                o = "object" == typeof t && t && !t.nodeType && t,
                s = "object" == typeof e && e;
            s.global !== s && s.window !== s && s.self !== s || (n = s);
            var a,
                l,
                u = 2147483647,
                c = 36,
                h = 1,
                f = 26,
                p = 38,
                d = 700,
                g = 72,
                y = 128,
                b = "-",
                m = /^xn--/,
                v = /[^\x20-\x7E]/,
                w = /[\x2E\u3002\uFF0E\uFF61]/g,
                _ = {
              overflow: "Overflow: input needs wider integers to process",
              "not-basic": "Illegal input >= 0x80 (not a basic code point)",
              "invalid-input": "Invalid input"
            },
                k = c - h,
                S = Math.floor,
                E = String.fromCharCode;

            function C(e) {
              throw new RangeError(_[e]);
            }

            function T(e, t) {
              for (var r = e.length, n = []; r--;) n[r] = t(e[r]);

              return n;
            }

            function x(e, t) {
              var r = e.split("@"),
                  n = "";
              return r.length > 1 && (n = r[0] + "@", e = r[1]), n + T((e = e.replace(w, ".")).split("."), t).join(".");
            }

            function A(e) {
              for (var t, r, n = [], i = 0, o = e.length; i < o;) (t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < o ? 56320 == (64512 & (r = e.charCodeAt(i++))) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), i--) : n.push(t);

              return n;
            }

            function I(e) {
              return T(e, function (e) {
                var t = "";
                return e > 65535 && (t += E((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += E(e);
              }).join("");
            }

            function P(e, t) {
              return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
            }

            function O(e, t, r) {
              var n = 0;

              for (e = r ? S(e / d) : e >> 1, e += S(e / t); e > k * f >> 1; n += c) e = S(e / k);

              return S(n + (k + 1) * e / (e + p));
            }

            function B(e) {
              var t,
                  r,
                  n,
                  i,
                  o,
                  s,
                  a,
                  l,
                  p,
                  d,
                  m,
                  v = [],
                  w = e.length,
                  _ = 0,
                  k = y,
                  E = g;

              for ((r = e.lastIndexOf(b)) < 0 && (r = 0), n = 0; n < r; ++n) e.charCodeAt(n) >= 128 && C("not-basic"), v.push(e.charCodeAt(n));

              for (i = r > 0 ? r + 1 : 0; i < w;) {
                for (o = _, s = 1, a = c; i >= w && C("invalid-input"), ((l = (m = e.charCodeAt(i++)) - 48 < 10 ? m - 22 : m - 65 < 26 ? m - 65 : m - 97 < 26 ? m - 97 : c) >= c || l > S((u - _) / s)) && C("overflow"), _ += l * s, !(l < (p = a <= E ? h : a >= E + f ? f : a - E)); a += c) s > S(u / (d = c - p)) && C("overflow"), s *= d;

                E = O(_ - o, t = v.length + 1, 0 == o), S(_ / t) > u - k && C("overflow"), k += S(_ / t), _ %= t, v.splice(_++, 0, k);
              }

              return I(v);
            }

            function R(e) {
              var t,
                  r,
                  n,
                  i,
                  o,
                  s,
                  a,
                  l,
                  p,
                  d,
                  m,
                  v,
                  w,
                  _,
                  k,
                  T = [];

              for (v = (e = A(e)).length, t = y, r = 0, o = g, s = 0; s < v; ++s) (m = e[s]) < 128 && T.push(E(m));

              for (n = i = T.length, i && T.push(b); n < v;) {
                for (a = u, s = 0; s < v; ++s) (m = e[s]) >= t && m < a && (a = m);

                for (a - t > S((u - r) / (w = n + 1)) && C("overflow"), r += (a - t) * w, t = a, s = 0; s < v; ++s) if ((m = e[s]) < t && ++r > u && C("overflow"), m == t) {
                  for (l = r, p = c; !(l < (d = p <= o ? h : p >= o + f ? f : p - o)); p += c) k = l - d, _ = c - d, T.push(E(P(d + k % _, 0))), l = S(k / _);

                  T.push(E(P(l, 0))), o = O(r, w, n == i), r = 0, ++n;
                }

                ++r, ++t;
              }

              return T.join("");
            }

            if (a = {
              version: "1.4.1",
              ucs2: {
                decode: A,
                encode: I
              },
              decode: B,
              encode: R,
              toASCII: function (e) {
                return x(e, function (e) {
                  return v.test(e) ? "xn--" + R(e) : e;
                });
              },
              toUnicode: function (e) {
                return x(e, function (e) {
                  return m.test(e) ? B(e.slice(4).toLowerCase()) : e;
                });
              }
            }, i && o) {
              if (t.exports == i) o.exports = a;else for (l in a) a.hasOwnProperty(l) && (i[l] = a[l]);
            } else n.punycode = a;
          }(this);
        }).call(this);
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    52: [function (e, t, r) {
      "use strict";

      function n(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }

      t.exports = function (e, t, r, o) {
        t = t || "&", r = r || "=";
        var s = {};
        if ("string" != typeof e || 0 === e.length) return s;
        var a = /\+/g;
        e = e.split(t);
        var l = 1e3;
        o && "number" == typeof o.maxKeys && (l = o.maxKeys);
        var u = e.length;
        l > 0 && u > l && (u = l);

        for (var c = 0; c < u; ++c) {
          var h,
              f,
              p,
              d,
              g = e[c].replace(a, "%20"),
              y = g.indexOf(r);
          y >= 0 ? (h = g.substr(0, y), f = g.substr(y + 1)) : (h = g, f = ""), p = decodeURIComponent(h), d = decodeURIComponent(f), n(s, p) ? i(s[p]) ? s[p].push(d) : s[p] = [s[p], d] : s[p] = d;
        }

        return s;
      };

      var i = Array.isArray || function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      };
    }, {}],
    53: [function (e, t, r) {
      "use strict";

      var n = function (e) {
        switch (typeof e) {
          case "string":
            return e;

          case "boolean":
            return e ? "true" : "false";

          case "number":
            return isFinite(e) ? e : "";

          default:
            return "";
        }
      };

      t.exports = function (e, t, r, a) {
        return t = t || "&", r = r || "=", null === e && (e = void 0), "object" == typeof e ? o(s(e), function (s) {
          var a = encodeURIComponent(n(s)) + r;
          return i(e[s]) ? o(e[s], function (e) {
            return a + encodeURIComponent(n(e));
          }).join(t) : a + encodeURIComponent(n(e[s]));
        }).join(t) : a ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(e)) : "";
      };

      var i = Array.isArray || function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      };

      function o(e, t) {
        if (e.map) return e.map(t);

        for (var r = [], n = 0; n < e.length; n++) r.push(t(e[n], n));

        return r;
      }

      var s = Object.keys || function (e) {
        var t = [];

        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.push(r);

        return t;
      };
    }, {}],
    54: [function (e, t, r) {
      "use strict";

      r.decode = r.parse = e("./decode"), r.encode = r.stringify = e("./encode");
    }, {
      "./decode": 52,
      "./encode": 53
    }],
    55: [function (e, t, r) {
      "use strict";

      var n = {};

      function i(e, t, r) {
        r || (r = Error);

        var i = function (e) {
          var r, n;

          function i(r, n, i) {
            return e.call(this, function (e, r, n) {
              return "string" == typeof t ? t : t(e, r, n);
            }(r, n, i)) || this;
          }

          return n = e, (r = i).prototype = Object.create(n.prototype), r.prototype.constructor = r, r.__proto__ = n, i;
        }(r);

        i.prototype.name = r.name, i.prototype.code = e, n[e] = i;
      }

      function o(e, t) {
        if (Array.isArray(e)) {
          var r = e.length;
          return e = e.map(function (e) {
            return String(e);
          }), r > 2 ? "one of ".concat(t, " ").concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1] : 2 === r ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0]);
        }

        return "of ".concat(t, " ").concat(String(e));
      }

      i("ERR_INVALID_OPT_VALUE", function (e, t) {
        return 'The value "' + t + '" is invalid for option "' + e + '"';
      }, TypeError), i("ERR_INVALID_ARG_TYPE", function (e, t, r) {
        var n, i, s, a;
        if ("string" == typeof t && (i = "not ", t.substr(!s || s < 0 ? 0 : +s, i.length) === i) ? (n = "must not be", t = t.replace(/^not /, "")) : n = "must be", function (e, t, r) {
          return (void 0 === r || r > e.length) && (r = e.length), e.substring(r - t.length, r) === t;
        }(e, " argument")) a = "The ".concat(e, " ").concat(n, " ").concat(o(t, "type"));else {
          var l = function (e, t, r) {
            return "number" != typeof r && (r = 0), !(r + t.length > e.length) && -1 !== e.indexOf(t, r);
          }(e, ".") ? "property" : "argument";
          a = 'The "'.concat(e, '" ').concat(l, " ").concat(n, " ").concat(o(t, "type"));
        }
        return a += ". Received type ".concat(typeof r);
      }, TypeError), i("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), i("ERR_METHOD_NOT_IMPLEMENTED", function (e) {
        return "The " + e + " method is not implemented";
      }), i("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), i("ERR_STREAM_DESTROYED", function (e) {
        return "Cannot call " + e + " after a stream was destroyed";
      }), i("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), i("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), i("ERR_STREAM_WRITE_AFTER_END", "write after end"), i("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), i("ERR_UNKNOWN_ENCODING", function (e) {
        return "Unknown encoding: " + e;
      }, TypeError), i("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = n;
    }, {}],
    56: [function (e, t, r) {
      (function (r) {
        (function () {
          "use strict";

          var n = Object.keys || function (e) {
            var t = [];

            for (var r in e) t.push(r);

            return t;
          };

          t.exports = u;
          var i = e("./_stream_readable"),
              o = e("./_stream_writable");
          e("inherits")(u, i);

          for (var s = n(o.prototype), a = 0; a < s.length; a++) {
            var l = s[a];
            u.prototype[l] || (u.prototype[l] = o.prototype[l]);
          }

          function u(e) {
            if (!(this instanceof u)) return new u(e);
            i.call(this, e), o.call(this, e), this.allowHalfOpen = !0, e && (!1 === e.readable && (this.readable = !1), !1 === e.writable && (this.writable = !1), !1 === e.allowHalfOpen && (this.allowHalfOpen = !1, this.once("end", c)));
          }

          function c() {
            this._writableState.ended || r.nextTick(h, this);
          }

          function h(e) {
            e.end();
          }

          Object.defineProperty(u.prototype, "writableHighWaterMark", {
            enumerable: !1,
            get: function () {
              return this._writableState.highWaterMark;
            }
          }), Object.defineProperty(u.prototype, "writableBuffer", {
            enumerable: !1,
            get: function () {
              return this._writableState && this._writableState.getBuffer();
            }
          }), Object.defineProperty(u.prototype, "writableLength", {
            enumerable: !1,
            get: function () {
              return this._writableState.length;
            }
          }), Object.defineProperty(u.prototype, "destroyed", {
            enumerable: !1,
            get: function () {
              return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed;
            },
            set: function (e) {
              void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e);
            }
          });
        }).call(this);
      }).call(this, e("_process"));
    }, {
      "./_stream_readable": 58,
      "./_stream_writable": 60,
      _process: 50,
      inherits: 24
    }],
    57: [function (e, t, r) {
      "use strict";

      t.exports = i;
      var n = e("./_stream_transform");

      function i(e) {
        if (!(this instanceof i)) return new i(e);
        n.call(this, e);
      }

      e("inherits")(i, n), i.prototype._transform = function (e, t, r) {
        r(null, e);
      };
    }, {
      "./_stream_transform": 59,
      inherits: 24
    }],
    58: [function (e, t, r) {
      (function (r, n) {
        (function () {
          "use strict";

          var i;
          t.exports = C, C.ReadableState = E;
          e("events").EventEmitter;

          var o = function (e, t) {
            return e.listeners(t).length;
          },
              s = e("./internal/streams/stream"),
              a = e("buffer").Buffer,
              l = n.Uint8Array || function () {};

          var u,
              c = e("util");
          u = c && c.debuglog ? c.debuglog("stream") : function () {};
          var h,
              f,
              p,
              d = e("./internal/streams/buffer_list"),
              g = e("./internal/streams/destroy"),
              y = e("./internal/streams/state").getHighWaterMark,
              b = e("../errors").codes,
              m = b.ERR_INVALID_ARG_TYPE,
              v = b.ERR_STREAM_PUSH_AFTER_EOF,
              w = b.ERR_METHOD_NOT_IMPLEMENTED,
              _ = b.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
          e("inherits")(C, s);
          var k = g.errorOrDestroy,
              S = ["error", "close", "destroy", "pause", "resume"];

          function E(t, r, n) {
            i = i || e("./_stream_duplex"), t = t || {}, "boolean" != typeof n && (n = r instanceof i), this.objectMode = !!t.objectMode, n && (this.objectMode = this.objectMode || !!t.readableObjectMode), this.highWaterMark = y(this, t, "readableHighWaterMark", n), this.buffer = new d(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = !1 !== t.emitClose, this.autoDestroy = !!t.autoDestroy, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (h || (h = e("string_decoder/").StringDecoder), this.decoder = new h(t.encoding), this.encoding = t.encoding);
          }

          function C(t) {
            if (i = i || e("./_stream_duplex"), !(this instanceof C)) return new C(t);
            var r = this instanceof i;
            this._readableState = new E(t, this, r), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), s.call(this);
          }

          function T(e, t, r, n, i) {
            u("readableAddChunk", t);
            var o,
                s = e._readableState;
            if (null === t) s.reading = !1, function (e, t) {
              if (u("onEofChunk"), t.ended) return;

              if (t.decoder) {
                var r = t.decoder.end();
                r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length);
              }

              t.ended = !0, t.sync ? P(e) : (t.needReadable = !1, t.emittedReadable || (t.emittedReadable = !0, O(e)));
            }(e, s);else if (i || (o = function (e, t) {
              var r;
              n = t, a.isBuffer(n) || n instanceof l || "string" == typeof t || void 0 === t || e.objectMode || (r = new m("chunk", ["string", "Buffer", "Uint8Array"], t));
              var n;
              return r;
            }(s, t)), o) k(e, o);else if (s.objectMode || t && t.length > 0) {
              if ("string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === a.prototype || (t = function (e) {
                return a.from(e);
              }(t)), n) s.endEmitted ? k(e, new _()) : x(e, s, t, !0);else if (s.ended) k(e, new v());else {
                if (s.destroyed) return !1;
                s.reading = !1, s.decoder && !r ? (t = s.decoder.write(t), s.objectMode || 0 !== t.length ? x(e, s, t, !1) : B(e, s)) : x(e, s, t, !1);
              }
            } else n || (s.reading = !1, B(e, s));
            return !s.ended && (s.length < s.highWaterMark || 0 === s.length);
          }

          function x(e, t, r, n) {
            t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0, e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length, n ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && P(e)), B(e, t);
          }

          Object.defineProperty(C.prototype, "destroyed", {
            enumerable: !1,
            get: function () {
              return void 0 !== this._readableState && this._readableState.destroyed;
            },
            set: function (e) {
              this._readableState && (this._readableState.destroyed = e);
            }
          }), C.prototype.destroy = g.destroy, C.prototype._undestroy = g.undestroy, C.prototype._destroy = function (e, t) {
            t(e);
          }, C.prototype.push = function (e, t) {
            var r,
                n = this._readableState;
            return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = a.from(e, t), t = ""), r = !0), T(this, e, t, !1, r);
          }, C.prototype.unshift = function (e) {
            return T(this, e, null, !0, !1);
          }, C.prototype.isPaused = function () {
            return !1 === this._readableState.flowing;
          }, C.prototype.setEncoding = function (t) {
            h || (h = e("string_decoder/").StringDecoder);
            var r = new h(t);
            this._readableState.decoder = r, this._readableState.encoding = this._readableState.decoder.encoding;

            for (var n = this._readableState.buffer.head, i = ""; null !== n;) i += r.write(n.data), n = n.next;

            return this._readableState.buffer.clear(), "" !== i && this._readableState.buffer.push(i), this._readableState.length = i.length, this;
          };
          var A = 1073741824;

          function I(e, t) {
            return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function (e) {
              return e >= A ? e = A : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e;
            }(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0));
          }

          function P(e) {
            var t = e._readableState;
            u("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (u("emitReadable", t.flowing), t.emittedReadable = !0, r.nextTick(O, e));
          }

          function O(e) {
            var t = e._readableState;
            u("emitReadable_", t.destroyed, t.length, t.ended), t.destroyed || !t.length && !t.ended || (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, j(e);
          }

          function B(e, t) {
            t.readingMore || (t.readingMore = !0, r.nextTick(R, e, t));
          }

          function R(e, t) {
            for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length);) {
              var r = t.length;
              if (u("maybeReadMore read 0"), e.read(0), r === t.length) break;
            }

            t.readingMore = !1;
          }

          function M(e) {
            var t = e._readableState;
            t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume();
          }

          function N(e) {
            u("readable nexttick read 0"), e.read(0);
          }

          function L(e, t) {
            u("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), j(e), t.flowing && !t.reading && e.read(0);
          }

          function j(e) {
            var t = e._readableState;

            for (u("flow", t.flowing); t.flowing && null !== e.read(););
          }

          function U(e, t) {
            return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : r = t.buffer.consume(e, t.decoder), r);
            var r;
          }

          function q(e) {
            var t = e._readableState;
            u("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, r.nextTick(D, t, e));
          }

          function D(e, t) {
            if (u("endReadableNT", e.endEmitted, e.length), !e.endEmitted && 0 === e.length && (e.endEmitted = !0, t.readable = !1, t.emit("end"), e.autoDestroy)) {
              var r = t._writableState;
              (!r || r.autoDestroy && r.finished) && t.destroy();
            }
          }

          function z(e, t) {
            for (var r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;

            return -1;
          }

          C.prototype.read = function (e) {
            u("read", e), e = parseInt(e, 10);
            var t = this._readableState,
                r = e;
            if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended)) return u("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? q(this) : P(this), null;
            if (0 === (e = I(e, t)) && t.ended) return 0 === t.length && q(this), null;
            var n,
                i = t.needReadable;
            return u("need readable", i), (0 === t.length || t.length - e < t.highWaterMark) && u("length less than watermark", i = !0), t.ended || t.reading ? u("reading or ended", i = !1) : i && (u("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = I(r, t))), null === (n = e > 0 ? U(e, t) : null) ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.awaitDrain = 0), 0 === t.length && (t.ended || (t.needReadable = !0), r !== e && t.ended && q(this)), null !== n && this.emit("data", n), n;
          }, C.prototype._read = function (e) {
            k(this, new w("_read()"));
          }, C.prototype.pipe = function (e, t) {
            var n = this,
                i = this._readableState;

            switch (i.pipesCount) {
              case 0:
                i.pipes = e;
                break;

              case 1:
                i.pipes = [i.pipes, e];
                break;

              default:
                i.pipes.push(e);
            }

            i.pipesCount += 1, u("pipe count=%d opts=%j", i.pipesCount, t);
            var s = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? l : y;

            function a(t, r) {
              u("onunpipe"), t === n && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0, u("cleanup"), e.removeListener("close", d), e.removeListener("finish", g), e.removeListener("drain", c), e.removeListener("error", p), e.removeListener("unpipe", a), n.removeListener("end", l), n.removeListener("end", y), n.removeListener("data", f), h = !0, !i.awaitDrain || e._writableState && !e._writableState.needDrain || c());
            }

            function l() {
              u("onend"), e.end();
            }

            i.endEmitted ? r.nextTick(s) : n.once("end", s), e.on("unpipe", a);

            var c = function (e) {
              return function () {
                var t = e._readableState;
                u("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && o(e, "data") && (t.flowing = !0, j(e));
              };
            }(n);

            e.on("drain", c);
            var h = !1;

            function f(t) {
              u("ondata");
              var r = e.write(t);
              u("dest.write", r), !1 === r && ((1 === i.pipesCount && i.pipes === e || i.pipesCount > 1 && -1 !== z(i.pipes, e)) && !h && (u("false write response, pause", i.awaitDrain), i.awaitDrain++), n.pause());
            }

            function p(t) {
              u("onerror", t), y(), e.removeListener("error", p), 0 === o(e, "error") && k(e, t);
            }

            function d() {
              e.removeListener("finish", g), y();
            }

            function g() {
              u("onfinish"), e.removeListener("close", d), y();
            }

            function y() {
              u("unpipe"), n.unpipe(e);
            }

            return n.on("data", f), function (e, t, r) {
              if ("function" == typeof e.prependListener) return e.prependListener(t, r);
              e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r);
            }(e, "error", p), e.once("close", d), e.once("finish", g), e.emit("pipe", n), i.flowing || (u("pipe resume"), n.resume()), e;
          }, C.prototype.unpipe = function (e) {
            var t = this._readableState,
                r = {
              hasUnpiped: !1
            };
            if (0 === t.pipesCount) return this;
            if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, r), this);

            if (!e) {
              var n = t.pipes,
                  i = t.pipesCount;
              t.pipes = null, t.pipesCount = 0, t.flowing = !1;

              for (var o = 0; o < i; o++) n[o].emit("unpipe", this, {
                hasUnpiped: !1
              });

              return this;
            }

            var s = z(t.pipes, e);
            return -1 === s ? this : (t.pipes.splice(s, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, r), this);
          }, C.prototype.on = function (e, t) {
            var n = s.prototype.on.call(this, e, t),
                i = this._readableState;
            return "data" === e ? (i.readableListening = this.listenerCount("readable") > 0, !1 !== i.flowing && this.resume()) : "readable" === e && (i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, u("on readable", i.length, i.reading), i.length ? P(this) : i.reading || r.nextTick(N, this))), n;
          }, C.prototype.addListener = C.prototype.on, C.prototype.removeListener = function (e, t) {
            var n = s.prototype.removeListener.call(this, e, t);
            return "readable" === e && r.nextTick(M, this), n;
          }, C.prototype.removeAllListeners = function (e) {
            var t = s.prototype.removeAllListeners.apply(this, arguments);
            return "readable" !== e && void 0 !== e || r.nextTick(M, this), t;
          }, C.prototype.resume = function () {
            var e = this._readableState;
            return e.flowing || (u("resume"), e.flowing = !e.readableListening, function (e, t) {
              t.resumeScheduled || (t.resumeScheduled = !0, r.nextTick(L, e, t));
            }(this, e)), e.paused = !1, this;
          }, C.prototype.pause = function () {
            return u("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (u("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
          }, C.prototype.wrap = function (e) {
            var t = this,
                r = this._readableState,
                n = !1;

            for (var i in e.on("end", function () {
              if (u("wrapped end"), r.decoder && !r.ended) {
                var e = r.decoder.end();
                e && e.length && t.push(e);
              }

              t.push(null);
            }), e.on("data", function (i) {
              (u("wrapped data"), r.decoder && (i = r.decoder.write(i)), !r.objectMode || null !== i && void 0 !== i) && (r.objectMode || i && i.length) && (t.push(i) || (n = !0, e.pause()));
            }), e) void 0 === this[i] && "function" == typeof e[i] && (this[i] = function (t) {
              return function () {
                return e[t].apply(e, arguments);
              };
            }(i));

            for (var o = 0; o < S.length; o++) e.on(S[o], this.emit.bind(this, S[o]));

            return this._read = function (t) {
              u("wrapped _read", t), n && (n = !1, e.resume());
            }, this;
          }, "function" == typeof Symbol && (C.prototype[Symbol.asyncIterator] = function () {
            return void 0 === f && (f = e("./internal/streams/async_iterator")), f(this);
          }), Object.defineProperty(C.prototype, "readableHighWaterMark", {
            enumerable: !1,
            get: function () {
              return this._readableState.highWaterMark;
            }
          }), Object.defineProperty(C.prototype, "readableBuffer", {
            enumerable: !1,
            get: function () {
              return this._readableState && this._readableState.buffer;
            }
          }), Object.defineProperty(C.prototype, "readableFlowing", {
            enumerable: !1,
            get: function () {
              return this._readableState.flowing;
            },
            set: function (e) {
              this._readableState && (this._readableState.flowing = e);
            }
          }), C._fromList = U, Object.defineProperty(C.prototype, "readableLength", {
            enumerable: !1,
            get: function () {
              return this._readableState.length;
            }
          }), "function" == typeof Symbol && (C.from = function (t, r) {
            return void 0 === p && (p = e("./internal/streams/from")), p(C, t, r);
          });
        }).call(this);
      }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "../errors": 55,
      "./_stream_duplex": 56,
      "./internal/streams/async_iterator": 61,
      "./internal/streams/buffer_list": 62,
      "./internal/streams/destroy": 63,
      "./internal/streams/from": 65,
      "./internal/streams/state": 67,
      "./internal/streams/stream": 68,
      _process: 50,
      buffer: 17,
      events: 22,
      inherits: 24,
      "string_decoder/": 75,
      util: 16
    }],
    59: [function (e, t, r) {
      "use strict";

      t.exports = u;
      var n = e("../errors").codes,
          i = n.ERR_METHOD_NOT_IMPLEMENTED,
          o = n.ERR_MULTIPLE_CALLBACK,
          s = n.ERR_TRANSFORM_ALREADY_TRANSFORMING,
          a = n.ERR_TRANSFORM_WITH_LENGTH_0,
          l = e("./_stream_duplex");

      function u(e) {
        if (!(this instanceof u)) return new u(e);
        l.call(this, e), this._transformState = {
          afterTransform: function (e, t) {
            var r = this._transformState;
            r.transforming = !1;
            var n = r.writecb;
            if (null === n) return this.emit("error", new o());
            r.writechunk = null, r.writecb = null, null != t && this.push(t), n(e);
            var i = this._readableState;
            i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
          }.bind(this),
          needTransform: !1,
          transforming: !1,
          writecb: null,
          writechunk: null,
          writeencoding: null
        }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", c);
      }

      function c() {
        var e = this;
        "function" != typeof this._flush || this._readableState.destroyed ? h(this, null, null) : this._flush(function (t, r) {
          h(e, t, r);
        });
      }

      function h(e, t, r) {
        if (t) return e.emit("error", t);
        if (null != r && e.push(r), e._writableState.length) throw new a();
        if (e._transformState.transforming) throw new s();
        return e.push(null);
      }

      e("inherits")(u, l), u.prototype.push = function (e, t) {
        return this._transformState.needTransform = !1, l.prototype.push.call(this, e, t);
      }, u.prototype._transform = function (e, t, r) {
        r(new i("_transform()"));
      }, u.prototype._write = function (e, t, r) {
        var n = this._transformState;

        if (n.writecb = r, n.writechunk = e, n.writeencoding = t, !n.transforming) {
          var i = this._readableState;
          (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
        }
      }, u.prototype._read = function (e) {
        var t = this._transformState;
        null === t.writechunk || t.transforming ? t.needTransform = !0 : (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform));
      }, u.prototype._destroy = function (e, t) {
        l.prototype._destroy.call(this, e, function (e) {
          t(e);
        });
      };
    }, {
      "../errors": 55,
      "./_stream_duplex": 56,
      inherits: 24
    }],
    60: [function (e, t, r) {
      (function (r, n) {
        (function () {
          "use strict";

          function i(e) {
            var t = this;
            this.next = null, this.entry = null, this.finish = function () {
              !function (e, t, r) {
                var n = e.entry;
                e.entry = null;

                for (; n;) {
                  var i = n.callback;
                  t.pendingcb--, i(r), n = n.next;
                }

                t.corkedRequestsFree.next = e;
              }(t, e);
            };
          }

          var o;
          t.exports = C, C.WritableState = E;

          var s = {
            deprecate: e("util-deprecate")
          },
              a = e("./internal/streams/stream"),
              l = e("buffer").Buffer,
              u = n.Uint8Array || function () {};

          var c,
              h = e("./internal/streams/destroy"),
              f = e("./internal/streams/state").getHighWaterMark,
              p = e("../errors").codes,
              d = p.ERR_INVALID_ARG_TYPE,
              g = p.ERR_METHOD_NOT_IMPLEMENTED,
              y = p.ERR_MULTIPLE_CALLBACK,
              b = p.ERR_STREAM_CANNOT_PIPE,
              m = p.ERR_STREAM_DESTROYED,
              v = p.ERR_STREAM_NULL_VALUES,
              w = p.ERR_STREAM_WRITE_AFTER_END,
              _ = p.ERR_UNKNOWN_ENCODING,
              k = h.errorOrDestroy;

          function S() {}

          function E(t, n, s) {
            o = o || e("./_stream_duplex"), t = t || {}, "boolean" != typeof s && (s = n instanceof o), this.objectMode = !!t.objectMode, s && (this.objectMode = this.objectMode || !!t.writableObjectMode), this.highWaterMark = f(this, t, "writableHighWaterMark", s), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
            var a = !1 === t.decodeStrings;
            this.decodeStrings = !a, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
              !function (e, t) {
                var n = e._writableState,
                    i = n.sync,
                    o = n.writecb;
                if ("function" != typeof o) throw new y();
                if (function (e) {
                  e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0;
                }(n), t) !function (e, t, n, i, o) {
                  --t.pendingcb, n ? (r.nextTick(o, i), r.nextTick(O, e, t), e._writableState.errorEmitted = !0, k(e, i)) : (o(i), e._writableState.errorEmitted = !0, k(e, i), O(e, t));
                }(e, n, i, t, o);else {
                  var s = I(n) || e.destroyed;
                  s || n.corked || n.bufferProcessing || !n.bufferedRequest || A(e, n), i ? r.nextTick(x, e, n, s, o) : x(e, n, s, o);
                }
              }(n, e);
            }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !1 !== t.emitClose, this.autoDestroy = !!t.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new i(this);
          }

          function C(t) {
            var r = this instanceof (o = o || e("./_stream_duplex"));
            if (!r && !c.call(C, this)) return new C(t);
            this._writableState = new E(t, this, r), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), a.call(this);
          }

          function T(e, t, r, n, i, o, s) {
            t.writelen = n, t.writecb = s, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new m("write")) : r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite), t.sync = !1;
          }

          function x(e, t, r, n) {
            r || function (e, t) {
              0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"));
            }(e, t), t.pendingcb--, n(), O(e, t);
          }

          function A(e, t) {
            t.bufferProcessing = !0;
            var r = t.bufferedRequest;

            if (e._writev && r && r.next) {
              var n = t.bufferedRequestCount,
                  o = new Array(n),
                  s = t.corkedRequestsFree;
              s.entry = r;

              for (var a = 0, l = !0; r;) o[a] = r, r.isBuf || (l = !1), r = r.next, a += 1;

              o.allBuffers = l, T(e, t, !0, t.length, o, "", s.finish), t.pendingcb++, t.lastBufferedRequest = null, s.next ? (t.corkedRequestsFree = s.next, s.next = null) : t.corkedRequestsFree = new i(t), t.bufferedRequestCount = 0;
            } else {
              for (; r;) {
                var u = r.chunk,
                    c = r.encoding,
                    h = r.callback;
                if (T(e, t, !1, t.objectMode ? 1 : u.length, u, c, h), r = r.next, t.bufferedRequestCount--, t.writing) break;
              }

              null === r && (t.lastBufferedRequest = null);
            }

            t.bufferedRequest = r, t.bufferProcessing = !1;
          }

          function I(e) {
            return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing;
          }

          function P(e, t) {
            e._final(function (r) {
              t.pendingcb--, r && k(e, r), t.prefinished = !0, e.emit("prefinish"), O(e, t);
            });
          }

          function O(e, t) {
            var n = I(t);

            if (n && (function (e, t) {
              t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0, e.emit("prefinish")) : (t.pendingcb++, t.finalCalled = !0, r.nextTick(P, e, t)));
            }(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"), t.autoDestroy))) {
              var i = e._readableState;
              (!i || i.autoDestroy && i.endEmitted) && e.destroy();
            }

            return n;
          }

          e("inherits")(C, a), E.prototype.getBuffer = function () {
            for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;

            return t;
          }, function () {
            try {
              Object.defineProperty(E.prototype, "buffer", {
                get: s.deprecate(function () {
                  return this.getBuffer();
                }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
              });
            } catch (e) {}
          }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (c = Function.prototype[Symbol.hasInstance], Object.defineProperty(C, Symbol.hasInstance, {
            value: function (e) {
              return !!c.call(this, e) || this === C && e && e._writableState instanceof E;
            }
          })) : c = function (e) {
            return e instanceof this;
          }, C.prototype.pipe = function () {
            k(this, new b());
          }, C.prototype.write = function (e, t, n) {
            var i,
                o = this._writableState,
                s = !1,
                a = !o.objectMode && (i = e, l.isBuffer(i) || i instanceof u);
            return a && !l.isBuffer(e) && (e = function (e) {
              return l.from(e);
            }(e)), "function" == typeof t && (n = t, t = null), a ? t = "buffer" : t || (t = o.defaultEncoding), "function" != typeof n && (n = S), o.ending ? function (e, t) {
              var n = new w();
              k(e, n), r.nextTick(t, n);
            }(this, n) : (a || function (e, t, n, i) {
              var o;
              return null === n ? o = new v() : "string" == typeof n || t.objectMode || (o = new d("chunk", ["string", "Buffer"], n)), !o || (k(e, o), r.nextTick(i, o), !1);
            }(this, o, e, n)) && (o.pendingcb++, s = function (e, t, r, n, i, o) {
              if (!r) {
                var s = function (e, t, r) {
                  e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = l.from(t, r));
                  return t;
                }(t, n, i);

                n !== s && (r = !0, i = "buffer", n = s);
              }

              var a = t.objectMode ? 1 : n.length;
              t.length += a;
              var u = t.length < t.highWaterMark;
              u || (t.needDrain = !0);

              if (t.writing || t.corked) {
                var c = t.lastBufferedRequest;
                t.lastBufferedRequest = {
                  chunk: n,
                  encoding: i,
                  isBuf: r,
                  callback: o,
                  next: null
                }, c ? c.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1;
              } else T(e, t, !1, a, n, i, o);

              return u;
            }(this, o, a, e, t, n)), s;
          }, C.prototype.cork = function () {
            this._writableState.corked++;
          }, C.prototype.uncork = function () {
            var e = this._writableState;
            e.corked && (e.corked--, e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || A(this, e));
          }, C.prototype.setDefaultEncoding = function (e) {
            if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new _(e);
            return this._writableState.defaultEncoding = e, this;
          }, Object.defineProperty(C.prototype, "writableBuffer", {
            enumerable: !1,
            get: function () {
              return this._writableState && this._writableState.getBuffer();
            }
          }), Object.defineProperty(C.prototype, "writableHighWaterMark", {
            enumerable: !1,
            get: function () {
              return this._writableState.highWaterMark;
            }
          }), C.prototype._write = function (e, t, r) {
            r(new g("_write()"));
          }, C.prototype._writev = null, C.prototype.end = function (e, t, n) {
            var i = this._writableState;
            return "function" == typeof e ? (n = e, e = null, t = null) : "function" == typeof t && (n = t, t = null), null !== e && void 0 !== e && this.write(e, t), i.corked && (i.corked = 1, this.uncork()), i.ending || function (e, t, n) {
              t.ending = !0, O(e, t), n && (t.finished ? r.nextTick(n) : e.once("finish", n));
              t.ended = !0, e.writable = !1;
            }(this, i, n), this;
          }, Object.defineProperty(C.prototype, "writableLength", {
            enumerable: !1,
            get: function () {
              return this._writableState.length;
            }
          }), Object.defineProperty(C.prototype, "destroyed", {
            enumerable: !1,
            get: function () {
              return void 0 !== this._writableState && this._writableState.destroyed;
            },
            set: function (e) {
              this._writableState && (this._writableState.destroyed = e);
            }
          }), C.prototype.destroy = h.destroy, C.prototype._undestroy = h.undestroy, C.prototype._destroy = function (e, t) {
            t(e);
          };
        }).call(this);
      }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "../errors": 55,
      "./_stream_duplex": 56,
      "./internal/streams/destroy": 63,
      "./internal/streams/state": 67,
      "./internal/streams/stream": 68,
      _process: 50,
      buffer: 17,
      inherits: 24,
      "util-deprecate": 78
    }],
    61: [function (e, t, r) {
      (function (r) {
        (function () {
          "use strict";

          var n;

          function i(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }) : e[t] = r, e;
          }

          var o = e("./end-of-stream"),
              s = Symbol("lastResolve"),
              a = Symbol("lastReject"),
              l = Symbol("error"),
              u = Symbol("ended"),
              c = Symbol("lastPromise"),
              h = Symbol("handlePromise"),
              f = Symbol("stream");

          function p(e, t) {
            return {
              value: e,
              done: t
            };
          }

          function d(e) {
            var t = e[s];

            if (null !== t) {
              var r = e[f].read();
              null !== r && (e[c] = null, e[s] = null, e[a] = null, t(p(r, !1)));
            }
          }

          var g = Object.getPrototypeOf(function () {}),
              y = Object.setPrototypeOf((i(n = {
            get stream() {
              return this[f];
            },

            next: function () {
              var e = this,
                  t = this[l];
              if (null !== t) return Promise.reject(t);
              if (this[u]) return Promise.resolve(p(void 0, !0));
              if (this[f].destroyed) return new Promise(function (t, n) {
                r.nextTick(function () {
                  e[l] ? n(e[l]) : t(p(void 0, !0));
                });
              });
              var n,
                  i = this[c];
              if (i) n = new Promise(function (e, t) {
                return function (r, n) {
                  e.then(function () {
                    t[u] ? r(p(void 0, !0)) : t[h](r, n);
                  }, n);
                };
              }(i, this));else {
                var o = this[f].read();
                if (null !== o) return Promise.resolve(p(o, !1));
                n = new Promise(this[h]);
              }
              return this[c] = n, n;
            }
          }, Symbol.asyncIterator, function () {
            return this;
          }), i(n, "return", function () {
            var e = this;
            return new Promise(function (t, r) {
              e[f].destroy(null, function (e) {
                e ? r(e) : t(p(void 0, !0));
              });
            });
          }), n), g);

          t.exports = function (e) {
            var t,
                n = Object.create(y, (i(t = {}, f, {
              value: e,
              writable: !0
            }), i(t, s, {
              value: null,
              writable: !0
            }), i(t, a, {
              value: null,
              writable: !0
            }), i(t, l, {
              value: null,
              writable: !0
            }), i(t, u, {
              value: e._readableState.endEmitted,
              writable: !0
            }), i(t, h, {
              value: function (e, t) {
                var r = n[f].read();
                r ? (n[c] = null, n[s] = null, n[a] = null, e(p(r, !1))) : (n[s] = e, n[a] = t);
              },
              writable: !0
            }), t));
            return n[c] = null, o(e, function (e) {
              if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                var t = n[a];
                return null !== t && (n[c] = null, n[s] = null, n[a] = null, t(e)), void (n[l] = e);
              }

              var r = n[s];
              null !== r && (n[c] = null, n[s] = null, n[a] = null, r(p(void 0, !0))), n[u] = !0;
            }), e.on("readable", function (e) {
              r.nextTick(d, e);
            }.bind(null, n)), n;
          };
        }).call(this);
      }).call(this, e("_process"));
    }, {
      "./end-of-stream": 64,
      _process: 50
    }],
    62: [function (e, t, r) {
      "use strict";

      function n(e, t) {
        var r = Object.keys(e);

        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t && (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })), r.push.apply(r, n);
        }

        return r;
      }

      function i(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[t] = r, e;
      }

      function o(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }

      var s = e("buffer").Buffer,
          a = e("util").inspect,
          l = a && a.custom || "inspect";

      t.exports = function () {
        function e() {
          !function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, e), this.head = null, this.tail = null, this.length = 0;
        }

        var t, r, u;
        return t = e, (r = [{
          key: "push",
          value: function (e) {
            var t = {
              data: e,
              next: null
            };
            this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length;
          }
        }, {
          key: "unshift",
          value: function (e) {
            var t = {
              data: e,
              next: this.head
            };
            0 === this.length && (this.tail = t), this.head = t, ++this.length;
          }
        }, {
          key: "shift",
          value: function () {
            if (0 !== this.length) {
              var e = this.head.data;
              return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e;
            }
          }
        }, {
          key: "clear",
          value: function () {
            this.head = this.tail = null, this.length = 0;
          }
        }, {
          key: "join",
          value: function (e) {
            if (0 === this.length) return "";

            for (var t = this.head, r = "" + t.data; t = t.next;) r += e + t.data;

            return r;
          }
        }, {
          key: "concat",
          value: function (e) {
            if (0 === this.length) return s.alloc(0);

            for (var t, r, n, i = s.allocUnsafe(e >>> 0), o = this.head, a = 0; o;) t = o.data, r = i, n = a, s.prototype.copy.call(t, r, n), a += o.data.length, o = o.next;

            return i;
          }
        }, {
          key: "consume",
          value: function (e, t) {
            var r;
            return e < this.head.data.length ? (r = this.head.data.slice(0, e), this.head.data = this.head.data.slice(e)) : r = e === this.head.data.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e), r;
          }
        }, {
          key: "first",
          value: function () {
            return this.head.data;
          }
        }, {
          key: "_getString",
          value: function (e) {
            var t = this.head,
                r = 1,
                n = t.data;

            for (e -= n.length; t = t.next;) {
              var i = t.data,
                  o = e > i.length ? i.length : e;

              if (o === i.length ? n += i : n += i.slice(0, e), 0 === (e -= o)) {
                o === i.length ? (++r, t.next ? this.head = t.next : this.head = this.tail = null) : (this.head = t, t.data = i.slice(o));
                break;
              }

              ++r;
            }

            return this.length -= r, n;
          }
        }, {
          key: "_getBuffer",
          value: function (e) {
            var t = s.allocUnsafe(e),
                r = this.head,
                n = 1;

            for (r.data.copy(t), e -= r.data.length; r = r.next;) {
              var i = r.data,
                  o = e > i.length ? i.length : e;

              if (i.copy(t, t.length - e, 0, o), 0 === (e -= o)) {
                o === i.length ? (++n, r.next ? this.head = r.next : this.head = this.tail = null) : (this.head = r, r.data = i.slice(o));
                break;
              }

              ++n;
            }

            return this.length -= n, t;
          }
        }, {
          key: l,
          value: function (e, t) {
            return a(this, function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? n(Object(r), !0).forEach(function (t) {
                  i(e, t, r[t]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
              }

              return e;
            }({}, t, {
              depth: 0,
              customInspect: !1
            }));
          }
        }]) && o(t.prototype, r), u && o(t, u), e;
      }();
    }, {
      buffer: 17,
      util: 16
    }],
    63: [function (e, t, r) {
      (function (e) {
        (function () {
          "use strict";

          function r(e, t) {
            i(e, t), n(e);
          }

          function n(e) {
            e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close");
          }

          function i(e, t) {
            e.emit("error", t);
          }

          t.exports = {
            destroy: function (t, o) {
              var s = this,
                  a = this._readableState && this._readableState.destroyed,
                  l = this._writableState && this._writableState.destroyed;
              return a || l ? (o ? o(t) : t && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, e.nextTick(i, this, t)) : e.nextTick(i, this, t)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function (t) {
                !o && t ? s._writableState ? s._writableState.errorEmitted ? e.nextTick(n, s) : (s._writableState.errorEmitted = !0, e.nextTick(r, s, t)) : e.nextTick(r, s, t) : o ? (e.nextTick(n, s), o(t)) : e.nextTick(n, s);
              }), this);
            },
            undestroy: function () {
              this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
            },
            errorOrDestroy: function (e, t) {
              var r = e._readableState,
                  n = e._writableState;
              r && r.autoDestroy || n && n.autoDestroy ? e.destroy(t) : e.emit("error", t);
            }
          };
        }).call(this);
      }).call(this, e("_process"));
    }, {
      _process: 50
    }],
    64: [function (e, t, r) {
      "use strict";

      var n = e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;

      function i() {}

      t.exports = function e(t, r, o) {
        if ("function" == typeof r) return e(t, null, r);
        r || (r = {}), o = function (e) {
          var t = !1;
          return function () {
            if (!t) {
              t = !0;

              for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i];

              e.apply(this, n);
            }
          };
        }(o || i);

        var s = r.readable || !1 !== r.readable && t.readable,
            a = r.writable || !1 !== r.writable && t.writable,
            l = function () {
          t.writable || c();
        },
            u = t._writableState && t._writableState.finished,
            c = function () {
          a = !1, u = !0, s || o.call(t);
        },
            h = t._readableState && t._readableState.endEmitted,
            f = function () {
          s = !1, h = !0, a || o.call(t);
        },
            p = function (e) {
          o.call(t, e);
        },
            d = function () {
          var e;
          return s && !h ? (t._readableState && t._readableState.ended || (e = new n()), o.call(t, e)) : a && !u ? (t._writableState && t._writableState.ended || (e = new n()), o.call(t, e)) : void 0;
        },
            g = function () {
          t.req.on("finish", c);
        };

        return function (e) {
          return e.setHeader && "function" == typeof e.abort;
        }(t) ? (t.on("complete", c), t.on("abort", d), t.req ? g() : t.on("request", g)) : a && !t._writableState && (t.on("end", l), t.on("close", l)), t.on("end", f), t.on("finish", c), !1 !== r.error && t.on("error", p), t.on("close", d), function () {
          t.removeListener("complete", c), t.removeListener("abort", d), t.removeListener("request", g), t.req && t.req.removeListener("finish", c), t.removeListener("end", l), t.removeListener("close", l), t.removeListener("finish", c), t.removeListener("end", f), t.removeListener("error", p), t.removeListener("close", d);
        };
      };
    }, {
      "../../../errors": 55
    }],
    65: [function (e, t, r) {
      t.exports = function () {
        throw new Error("Readable.from is not available in the browser");
      };
    }, {}],
    66: [function (e, t, r) {
      "use strict";

      var n;
      var i = e("../../../errors").codes,
          o = i.ERR_MISSING_ARGS,
          s = i.ERR_STREAM_DESTROYED;

      function a(e) {
        if (e) throw e;
      }

      function l(e) {
        e();
      }

      function u(e, t) {
        return e.pipe(t);
      }

      t.exports = function () {
        for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];

        var c,
            h = function (e) {
          return e.length ? "function" != typeof e[e.length - 1] ? a : e.pop() : a;
        }(r);

        if (Array.isArray(r[0]) && (r = r[0]), r.length < 2) throw new o("streams");
        var f = r.map(function (t, i) {
          var o = i < r.length - 1;
          return function (t, r, i, o) {
            o = function (e) {
              var t = !1;
              return function () {
                t || (t = !0, e.apply(void 0, arguments));
              };
            }(o);

            var a = !1;
            t.on("close", function () {
              a = !0;
            }), void 0 === n && (n = e("./end-of-stream")), n(t, {
              readable: r,
              writable: i
            }, function (e) {
              if (e) return o(e);
              a = !0, o();
            });
            var l = !1;
            return function (e) {
              if (!a && !l) return l = !0, function (e) {
                return e.setHeader && "function" == typeof e.abort;
              }(t) ? t.abort() : "function" == typeof t.destroy ? t.destroy() : void o(e || new s("pipe"));
            };
          }(t, o, i > 0, function (e) {
            c || (c = e), e && f.forEach(l), o || (f.forEach(l), h(c));
          });
        });
        return r.reduce(u);
      };
    }, {
      "../../../errors": 55,
      "./end-of-stream": 64
    }],
    67: [function (e, t, r) {
      "use strict";

      var n = e("../../../errors").codes.ERR_INVALID_OPT_VALUE;
      t.exports = {
        getHighWaterMark: function (e, t, r, i) {
          var o = function (e, t, r) {
            return null != e.highWaterMark ? e.highWaterMark : t ? e[r] : null;
          }(t, i, r);

          if (null != o) {
            if (!isFinite(o) || Math.floor(o) !== o || o < 0) throw new n(i ? r : "highWaterMark", o);
            return Math.floor(o);
          }

          return e.objectMode ? 16 : 16384;
        }
      };
    }, {
      "../../../errors": 55
    }],
    68: [function (e, t, r) {
      t.exports = e("events").EventEmitter;
    }, {
      events: 22
    }],
    69: [function (e, t, r) {
      (r = t.exports = e("./lib/_stream_readable.js")).Stream = r, r.Readable = r, r.Writable = e("./lib/_stream_writable.js"), r.Duplex = e("./lib/_stream_duplex.js"), r.Transform = e("./lib/_stream_transform.js"), r.PassThrough = e("./lib/_stream_passthrough.js"), r.finished = e("./lib/internal/streams/end-of-stream.js"), r.pipeline = e("./lib/internal/streams/pipeline.js");
    }, {
      "./lib/_stream_duplex.js": 56,
      "./lib/_stream_passthrough.js": 57,
      "./lib/_stream_readable.js": 58,
      "./lib/_stream_transform.js": 59,
      "./lib/_stream_writable.js": 60,
      "./lib/internal/streams/end-of-stream.js": 64,
      "./lib/internal/streams/pipeline.js": 66
    }],
    70: [function (e, t, r) {
      "use strict";

      t.exports = function () {
        if ("function" != typeof arguments[0]) throw new Error("callback needed");
        if ("number" != typeof arguments[1]) throw new Error("interval needed");
        var e;

        if (arguments.length > 0) {
          e = new Array(arguments.length - 2);

          for (var t = 0; t < e.length; t++) e[t] = arguments[t + 2];
        }

        return new function (e, t, r) {
          var n = this;
          this._callback = e, this._args = r, this._interval = setInterval(e, t, this._args), this.reschedule = function (e) {
            e || (e = n._interval), n._interval && clearInterval(n._interval), n._interval = setInterval(n._callback, e, n._args);
          }, this.clear = function () {
            n._interval && (clearInterval(n._interval), n._interval = void 0);
          }, this.destroy = function () {
            n._interval && clearInterval(n._interval), n._callback = void 0, n._interval = void 0, n._args = void 0;
          };
        }(arguments[0], arguments[1], e);
      };
    }, {}],
    71: [function (e, t, r) {
      "use strict";

      t.exports = e("./index.js")();
    }, {
      "./index.js": 72
    }],
    72: [function (e, t, r) {
      (function (e) {
        (function () {
          "use strict";

          function r(t) {
            return t instanceof e ? e.from(t) : new t.constructor(t.buffer.slice(), t.byteOffset, t.length);
          }

          t.exports = function (e) {
            return (e = e || {}).circles ? function (e) {
              var t = [],
                  n = [];
              return e.proto ? function e(o) {
                if ("object" != typeof o || null === o) return o;
                if (o instanceof Date) return new Date(o);
                if (Array.isArray(o)) return i(o, e);
                if (o instanceof Map) return new Map(i(Array.from(o), e));
                if (o instanceof Set) return new Set(i(Array.from(o), e));
                var s = {};

                for (var a in t.push(o), n.push(s), o) {
                  var l = o[a];
                  if ("object" != typeof l || null === l) s[a] = l;else if (l instanceof Date) s[a] = new Date(l);else if (l instanceof Map) s[a] = new Map(i(Array.from(l), e));else if (l instanceof Set) s[a] = new Set(i(Array.from(l), e));else if (ArrayBuffer.isView(l)) s[a] = r(l);else {
                    var u = t.indexOf(l);
                    s[a] = -1 !== u ? n[u] : e(l);
                  }
                }

                return t.pop(), n.pop(), s;
              } : function e(o) {
                if ("object" != typeof o || null === o) return o;
                if (o instanceof Date) return new Date(o);
                if (Array.isArray(o)) return i(o, e);
                if (o instanceof Map) return new Map(i(Array.from(o), e));
                if (o instanceof Set) return new Set(i(Array.from(o), e));
                var s = {};

                for (var a in t.push(o), n.push(s), o) if (!1 !== Object.hasOwnProperty.call(o, a)) {
                  var l = o[a];
                  if ("object" != typeof l || null === l) s[a] = l;else if (l instanceof Date) s[a] = new Date(l);else if (l instanceof Map) s[a] = new Map(i(Array.from(l), e));else if (l instanceof Set) s[a] = new Set(i(Array.from(l), e));else if (ArrayBuffer.isView(l)) s[a] = r(l);else {
                    var u = t.indexOf(l);
                    s[a] = -1 !== u ? n[u] : e(l);
                  }
                }

                return t.pop(), n.pop(), s;
              };

              function i(e, i) {
                for (var o = Object.keys(e), s = new Array(o.length), a = 0; a < o.length; a++) {
                  var l = o[a],
                      u = e[l];
                  if ("object" != typeof u || null === u) s[l] = u;else if (u instanceof Date) s[l] = new Date(u);else if (ArrayBuffer.isView(u)) s[l] = r(u);else {
                    var c = t.indexOf(u);
                    s[l] = -1 !== c ? n[c] : i(u);
                  }
                }

                return s;
              }
            }(e) : e.proto ? function e(n) {
              if ("object" != typeof n || null === n) return n;
              if (n instanceof Date) return new Date(n);
              if (Array.isArray(n)) return t(n, e);
              if (n instanceof Map) return new Map(t(Array.from(n), e));
              if (n instanceof Set) return new Set(t(Array.from(n), e));
              var i = {};

              for (var o in n) {
                var s = n[o];
                "object" != typeof s || null === s ? i[o] = s : s instanceof Date ? i[o] = new Date(s) : s instanceof Map ? i[o] = new Map(t(Array.from(s), e)) : s instanceof Set ? i[o] = new Set(t(Array.from(s), e)) : ArrayBuffer.isView(s) ? i[o] = r(s) : i[o] = e(s);
              }

              return i;
            } : function e(n) {
              if ("object" != typeof n || null === n) return n;
              if (n instanceof Date) return new Date(n);
              if (Array.isArray(n)) return t(n, e);
              if (n instanceof Map) return new Map(t(Array.from(n), e));
              if (n instanceof Set) return new Set(t(Array.from(n), e));
              var i = {};

              for (var o in n) if (!1 !== Object.hasOwnProperty.call(n, o)) {
                var s = n[o];
                "object" != typeof s || null === s ? i[o] = s : s instanceof Date ? i[o] = new Date(s) : s instanceof Map ? i[o] = new Map(t(Array.from(s), e)) : s instanceof Set ? i[o] = new Set(t(Array.from(s), e)) : ArrayBuffer.isView(s) ? i[o] = r(s) : i[o] = e(s);
              }

              return i;
            };

            function t(e, t) {
              for (var n = Object.keys(e), i = new Array(n.length), o = 0; o < n.length; o++) {
                var s = n[o],
                    a = e[s];
                "object" != typeof a || null === a ? i[s] = a : a instanceof Date ? i[s] = new Date(a) : ArrayBuffer.isView(a) ? i[s] = r(a) : i[s] = t(a);
              }

              return i;
            }
          };
        }).call(this);
      }).call(this, e("buffer").Buffer);
    }, {
      buffer: 17
    }],
    73: [function (e, t, r) {
      var n = e("buffer"),
          i = n.Buffer;

      function o(e, t) {
        for (var r in e) t[r] = e[r];
      }

      function s(e, t, r) {
        return i(e, t, r);
      }

      i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = n : (o(n, r), r.Buffer = s), s.prototype = Object.create(i.prototype), o(i, s), s.from = function (e, t, r) {
        if ("number" == typeof e) throw new TypeError("Argument must not be a number");
        return i(e, t, r);
      }, s.alloc = function (e, t, r) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        var n = i(e);
        return void 0 !== t ? "string" == typeof r ? n.fill(t, r) : n.fill(t) : n.fill(0), n;
      }, s.allocUnsafe = function (e) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        return i(e);
      }, s.allocUnsafeSlow = function (e) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        return n.SlowBuffer(e);
      };
    }, {
      buffer: 17
    }],
    74: [function (e, t, r) {
      t.exports = function (e) {
        var t = e._readableState;
        return t ? t.objectMode || "number" == typeof e._duplexState ? e.read() : e.read((r = t, r.buffer.length ? r.buffer.head ? r.buffer.head.data.length : r.buffer[0].length : r.length)) : null;
        var r;
      };
    }, {}],
    75: [function (e, t, r) {
      "use strict";

      var n = e("safe-buffer").Buffer,
          i = n.isEncoding || function (e) {
        switch ((e = "" + e) && e.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return !0;

          default:
            return !1;
        }
      };

      function o(e) {
        var t;

        switch (this.encoding = function (e) {
          var t = function (e) {
            if (!e) return "utf8";

            for (var t;;) switch (e) {
              case "utf8":
              case "utf-8":
                return "utf8";

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return "utf16le";

              case "latin1":
              case "binary":
                return "latin1";

              case "base64":
              case "ascii":
              case "hex":
                return e;

              default:
                if (t) return;
                e = ("" + e).toLowerCase(), t = !0;
            }
          }(e);

          if ("string" != typeof t && (n.isEncoding === i || !i(e))) throw new Error("Unknown encoding: " + e);
          return t || e;
        }(e), this.encoding) {
          case "utf16le":
            this.text = l, this.end = u, t = 4;
            break;

          case "utf8":
            this.fillLast = a, t = 4;
            break;

          case "base64":
            this.text = c, this.end = h, t = 3;
            break;

          default:
            return this.write = f, void (this.end = p);
        }

        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n.allocUnsafe(t);
      }

      function s(e) {
        return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2;
      }

      function a(e) {
        var t = this.lastTotal - this.lastNeed,
            r = function (e, t, r) {
          if (128 != (192 & t[0])) return e.lastNeed = 0, "�";

          if (e.lastNeed > 1 && t.length > 1) {
            if (128 != (192 & t[1])) return e.lastNeed = 1, "�";
            if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2])) return e.lastNeed = 2, "�";
          }
        }(this, e);

        return void 0 !== r ? r : this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, t, 0, e.length), void (this.lastNeed -= e.length));
      }

      function l(e, t) {
        if ((e.length - t) % 2 == 0) {
          var r = e.toString("utf16le", t);

          if (r) {
            var n = r.charCodeAt(r.length - 1);
            if (n >= 55296 && n <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], r.slice(0, -1);
          }

          return r;
        }

        return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1);
      }

      function u(e) {
        var t = e && e.length ? this.write(e) : "";

        if (this.lastNeed) {
          var r = this.lastTotal - this.lastNeed;
          return t + this.lastChar.toString("utf16le", 0, r);
        }

        return t;
      }

      function c(e, t) {
        var r = (e.length - t) % 3;
        return 0 === r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r));
      }

      function h(e) {
        var t = e && e.length ? this.write(e) : "";
        return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
      }

      function f(e) {
        return e.toString(this.encoding);
      }

      function p(e) {
        return e && e.length ? this.write(e) : "";
      }

      r.StringDecoder = o, o.prototype.write = function (e) {
        if (0 === e.length) return "";
        var t, r;

        if (this.lastNeed) {
          if (void 0 === (t = this.fillLast(e))) return "";
          r = this.lastNeed, this.lastNeed = 0;
        } else r = 0;

        return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || "";
      }, o.prototype.end = function (e) {
        var t = e && e.length ? this.write(e) : "";
        return this.lastNeed ? t + "�" : t;
      }, o.prototype.text = function (e, t) {
        var r = function (e, t, r) {
          var n = t.length - 1;
          if (n < r) return 0;
          var i = s(t[n]);
          if (i >= 0) return i > 0 && (e.lastNeed = i - 1), i;
          if (--n < r || -2 === i) return 0;
          if ((i = s(t[n])) >= 0) return i > 0 && (e.lastNeed = i - 2), i;
          if (--n < r || -2 === i) return 0;
          if ((i = s(t[n])) >= 0) return i > 0 && (2 === i ? i = 0 : e.lastNeed = i - 3), i;
          return 0;
        }(this, e, t);

        if (!this.lastNeed) return e.toString("utf8", t);
        this.lastTotal = r;
        var n = e.length - (r - this.lastNeed);
        return e.copy(this.lastChar, 0, n), e.toString("utf8", t, n);
      }, o.prototype.fillLast = function (e) {
        if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length;
      };
    }, {
      "safe-buffer": 73
    }],
    76: [function (e, t, r) {
      "use strict";

      var n = e("punycode"),
          i = e("./util");

      function o() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
      }

      r.parse = v, r.resolve = function (e, t) {
        return v(e, !1, !0).resolve(t);
      }, r.resolveObject = function (e, t) {
        return e ? v(e, !1, !0).resolveObject(t) : t;
      }, r.format = function (e) {
        i.isString(e) && (e = v(e));
        return e instanceof o ? e.format() : o.prototype.format.call(e);
      }, r.Url = o;
      var s = /^([a-z0-9.+-]+:)/i,
          a = /:[0-9]*$/,
          l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
          u = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
          c = ["'"].concat(u),
          h = ["%", "/", "?", ";", "#"].concat(c),
          f = ["/", "?", "#"],
          p = /^[+a-z0-9A-Z_-]{0,63}$/,
          d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          g = {
        javascript: !0,
        "javascript:": !0
      },
          y = {
        javascript: !0,
        "javascript:": !0
      },
          b = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
      },
          m = e("querystring");

      function v(e, t, r) {
        if (e && i.isObject(e) && e instanceof o) return e;
        var n = new o();
        return n.parse(e, t, r), n;
      }

      o.prototype.parse = function (e, t, r) {
        if (!i.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
        var o = e.indexOf("?"),
            a = -1 !== o && o < e.indexOf("#") ? "?" : "#",
            u = e.split(a);
        u[0] = u[0].replace(/\\/g, "/");
        var v = e = u.join(a);

        if (v = v.trim(), !r && 1 === e.split("#").length) {
          var w = l.exec(v);
          if (w) return this.path = v, this.href = v, this.pathname = w[1], w[2] ? (this.search = w[2], this.query = t ? m.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this;
        }

        var _ = s.exec(v);

        if (_) {
          var k = (_ = _[0]).toLowerCase();

          this.protocol = k, v = v.substr(_.length);
        }

        if (r || _ || v.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var S = "//" === v.substr(0, 2);
          !S || _ && y[_] || (v = v.substr(2), this.slashes = !0);
        }

        if (!y[_] && (S || _ && !b[_])) {
          for (var E, C, T = -1, x = 0; x < f.length; x++) {
            -1 !== (A = v.indexOf(f[x])) && (-1 === T || A < T) && (T = A);
          }

          -1 !== (C = -1 === T ? v.lastIndexOf("@") : v.lastIndexOf("@", T)) && (E = v.slice(0, C), v = v.slice(C + 1), this.auth = decodeURIComponent(E)), T = -1;

          for (x = 0; x < h.length; x++) {
            var A;
            -1 !== (A = v.indexOf(h[x])) && (-1 === T || A < T) && (T = A);
          }

          -1 === T && (T = v.length), this.host = v.slice(0, T), v = v.slice(T), this.parseHost(), this.hostname = this.hostname || "";
          var I = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
          if (!I) for (var P = this.hostname.split(/\./), O = (x = 0, P.length); x < O; x++) {
            var B = P[x];

            if (B && !B.match(p)) {
              for (var R = "", M = 0, N = B.length; M < N; M++) B.charCodeAt(M) > 127 ? R += "x" : R += B[M];

              if (!R.match(p)) {
                var L = P.slice(0, x),
                    j = P.slice(x + 1),
                    U = B.match(d);
                U && (L.push(U[1]), j.unshift(U[2])), j.length && (v = "/" + j.join(".") + v), this.hostname = L.join(".");
                break;
              }
            }
          }
          this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), I || (this.hostname = n.toASCII(this.hostname));
          var q = this.port ? ":" + this.port : "",
              D = this.hostname || "";
          this.host = D + q, this.href += this.host, I && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== v[0] && (v = "/" + v));
        }

        if (!g[k]) for (x = 0, O = c.length; x < O; x++) {
          var z = c[x];

          if (-1 !== v.indexOf(z)) {
            var F = encodeURIComponent(z);
            F === z && (F = escape(z)), v = v.split(z).join(F);
          }
        }
        var V = v.indexOf("#");
        -1 !== V && (this.hash = v.substr(V), v = v.slice(0, V));
        var H = v.indexOf("?");

        if (-1 !== H ? (this.search = v.substr(H), this.query = v.substr(H + 1), t && (this.query = m.parse(this.query)), v = v.slice(0, H)) : t && (this.search = "", this.query = {}), v && (this.pathname = v), b[k] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
          q = this.pathname || "";
          var W = this.search || "";
          this.path = q + W;
        }

        return this.href = this.format(), this;
      }, o.prototype.format = function () {
        var e = this.auth || "";
        e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");
        var t = this.protocol || "",
            r = this.pathname || "",
            n = this.hash || "",
            o = !1,
            s = "";
        this.host ? o = e + this.host : this.hostname && (o = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (o += ":" + this.port)), this.query && i.isObject(this.query) && Object.keys(this.query).length && (s = m.stringify(this.query));
        var a = this.search || s && "?" + s || "";
        return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || b[t]) && !1 !== o ? (o = "//" + (o || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : o || (o = ""), n && "#" !== n.charAt(0) && (n = "#" + n), a && "?" !== a.charAt(0) && (a = "?" + a), t + o + (r = r.replace(/[?#]/g, function (e) {
          return encodeURIComponent(e);
        })) + (a = a.replace("#", "%23")) + n;
      }, o.prototype.resolve = function (e) {
        return this.resolveObject(v(e, !1, !0)).format();
      }, o.prototype.resolveObject = function (e) {
        if (i.isString(e)) {
          var t = new o();
          t.parse(e, !1, !0), e = t;
        }

        for (var r = new o(), n = Object.keys(this), s = 0; s < n.length; s++) {
          var a = n[s];
          r[a] = this[a];
        }

        if (r.hash = e.hash, "" === e.href) return r.href = r.format(), r;

        if (e.slashes && !e.protocol) {
          for (var l = Object.keys(e), u = 0; u < l.length; u++) {
            var c = l[u];
            "protocol" !== c && (r[c] = e[c]);
          }

          return b[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
        }

        if (e.protocol && e.protocol !== r.protocol) {
          if (!b[e.protocol]) {
            for (var h = Object.keys(e), f = 0; f < h.length; f++) {
              var p = h[f];
              r[p] = e[p];
            }

            return r.href = r.format(), r;
          }

          if (r.protocol = e.protocol, e.host || y[e.protocol]) r.pathname = e.pathname;else {
            for (var d = (e.pathname || "").split("/"); d.length && !(e.host = d.shift()););

            e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), r.pathname = d.join("/");
          }

          if (r.search = e.search, r.query = e.query, r.host = e.host || "", r.auth = e.auth, r.hostname = e.hostname || e.host, r.port = e.port, r.pathname || r.search) {
            var g = r.pathname || "",
                m = r.search || "";
            r.path = g + m;
          }

          return r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
        }

        var v = r.pathname && "/" === r.pathname.charAt(0),
            w = e.host || e.pathname && "/" === e.pathname.charAt(0),
            _ = w || v || r.host && e.pathname,
            k = _,
            S = r.pathname && r.pathname.split("/") || [],
            E = (d = e.pathname && e.pathname.split("/") || [], r.protocol && !b[r.protocol]);

        if (E && (r.hostname = "", r.port = null, r.host && ("" === S[0] ? S[0] = r.host : S.unshift(r.host)), r.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === d[0] ? d[0] = e.host : d.unshift(e.host)), e.host = null), _ = _ && ("" === d[0] || "" === S[0])), w) r.host = e.host || "" === e.host ? e.host : r.host, r.hostname = e.hostname || "" === e.hostname ? e.hostname : r.hostname, r.search = e.search, r.query = e.query, S = d;else if (d.length) S || (S = []), S.pop(), S = S.concat(d), r.search = e.search, r.query = e.query;else if (!i.isNullOrUndefined(e.search)) {
          if (E) r.hostname = r.host = S.shift(), (I = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = I.shift(), r.host = r.hostname = I.shift());
          return r.search = e.search, r.query = e.query, i.isNull(r.pathname) && i.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
        }
        if (!S.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;

        for (var C = S.slice(-1)[0], T = (r.host || e.host || S.length > 1) && ("." === C || ".." === C) || "" === C, x = 0, A = S.length; A >= 0; A--) "." === (C = S[A]) ? S.splice(A, 1) : ".." === C ? (S.splice(A, 1), x++) : x && (S.splice(A, 1), x--);

        if (!_ && !k) for (; x--; x) S.unshift("..");
        !_ || "" === S[0] || S[0] && "/" === S[0].charAt(0) || S.unshift(""), T && "/" !== S.join("/").substr(-1) && S.push("");
        var I,
            P = "" === S[0] || S[0] && "/" === S[0].charAt(0);
        E && (r.hostname = r.host = P ? "" : S.length ? S.shift() : "", (I = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = I.shift(), r.host = r.hostname = I.shift()));
        return (_ = _ || r.host && S.length) && !P && S.unshift(""), S.length ? r.pathname = S.join("/") : (r.pathname = null, r.path = null), i.isNull(r.pathname) && i.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = e.auth || r.auth, r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
      }, o.prototype.parseHost = function () {
        var e = this.host,
            t = a.exec(e);
        t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
      };
    }, {
      "./util": 77,
      punycode: 51,
      querystring: 54
    }],
    77: [function (e, t, r) {
      "use strict";

      t.exports = {
        isString: function (e) {
          return "string" == typeof e;
        },
        isObject: function (e) {
          return "object" == typeof e && null !== e;
        },
        isNull: function (e) {
          return null === e;
        },
        isNullOrUndefined: function (e) {
          return null == e;
        }
      };
    }, {}],
    78: [function (e, t, r) {
      (function (e) {
        (function () {
          function r(t) {
            try {
              if (!e.localStorage) return !1;
            } catch (e) {
              return !1;
            }

            var r = e.localStorage[t];
            return null != r && "true" === String(r).toLowerCase();
          }

          t.exports = function (e, t) {
            if (r("noDeprecation")) return e;
            var n = !1;
            return function () {
              if (!n) {
                if (r("throwDeprecation")) throw new Error(t);
                r("traceDeprecation") ? console.trace(t) : console.warn(t), n = !0;
              }

              return e.apply(this, arguments);
            };
          };
        }).call(this);
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    79: [function (e, t, r) {
      t.exports = function e(t, r) {
        if (t && r) return e(t)(r);
        if ("function" != typeof t) throw new TypeError("need wrapper function");
        Object.keys(t).forEach(function (e) {
          n[e] = t[e];
        });
        return n;

        function n() {
          for (var e = new Array(arguments.length), r = 0; r < e.length; r++) e[r] = arguments[r];

          var n = t.apply(this, e),
              i = e[e.length - 1];
          return "function" == typeof n && n !== i && Object.keys(i).forEach(function (e) {
            n[e] = i[e];
          }), n;
        }
      };
    }, {}],
    80: [function (e, t, r) {
      "use strict";

      t.exports = function () {
        throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
      };
    }, {}],
    81: [function (e, t, r) {
      t.exports = function () {
        for (var e = {}, t = 0; t < arguments.length; t++) {
          var r = arguments[t];

          for (var i in r) n.call(r, i) && (e[i] = r[i]);
        }

        return e;
      };

      var n = Object.prototype.hasOwnProperty;
    }, {}],
    82: [function (e, t, r) {
      "use strict";

      t.exports = function (e) {
        e.prototype[Symbol.iterator] = function* () {
          for (let e = this.head; e; e = e.next) yield e.value;
        };
      };
    }, {}],
    83: [function (e, t, r) {
      "use strict";

      function n(e) {
        var t = this;
        if (t instanceof n || (t = new n()), t.tail = null, t.head = null, t.length = 0, e && "function" == typeof e.forEach) e.forEach(function (e) {
          t.push(e);
        });else if (arguments.length > 0) for (var r = 0, i = arguments.length; r < i; r++) t.push(arguments[r]);
        return t;
      }

      function i(e, t, r) {
        var n = t === e.head ? new a(r, null, t, e) : new a(r, t, t.next, e);
        return null === n.next && (e.tail = n), null === n.prev && (e.head = n), e.length++, n;
      }

      function o(e, t) {
        e.tail = new a(t, e.tail, null, e), e.head || (e.head = e.tail), e.length++;
      }

      function s(e, t) {
        e.head = new a(t, null, e.head, e), e.tail || (e.tail = e.head), e.length++;
      }

      function a(e, t, r, n) {
        if (!(this instanceof a)) return new a(e, t, r, n);
        this.list = n, this.value = e, t ? (t.next = this, this.prev = t) : this.prev = null, r ? (r.prev = this, this.next = r) : this.next = null;
      }

      t.exports = n, n.Node = a, n.create = n, n.prototype.removeNode = function (e) {
        if (e.list !== this) throw new Error("removing node which does not belong to this list");
        var t = e.next,
            r = e.prev;
        return t && (t.prev = r), r && (r.next = t), e === this.head && (this.head = t), e === this.tail && (this.tail = r), e.list.length--, e.next = null, e.prev = null, e.list = null, t;
      }, n.prototype.unshiftNode = function (e) {
        if (e !== this.head) {
          e.list && e.list.removeNode(e);
          var t = this.head;
          e.list = this, e.next = t, t && (t.prev = e), this.head = e, this.tail || (this.tail = e), this.length++;
        }
      }, n.prototype.pushNode = function (e) {
        if (e !== this.tail) {
          e.list && e.list.removeNode(e);
          var t = this.tail;
          e.list = this, e.prev = t, t && (t.next = e), this.tail = e, this.head || (this.head = e), this.length++;
        }
      }, n.prototype.push = function () {
        for (var e = 0, t = arguments.length; e < t; e++) o(this, arguments[e]);

        return this.length;
      }, n.prototype.unshift = function () {
        for (var e = 0, t = arguments.length; e < t; e++) s(this, arguments[e]);

        return this.length;
      }, n.prototype.pop = function () {
        if (this.tail) {
          var e = this.tail.value;
          return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, this.length--, e;
        }
      }, n.prototype.shift = function () {
        if (this.head) {
          var e = this.head.value;
          return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, this.length--, e;
        }
      }, n.prototype.forEach = function (e, t) {
        t = t || this;

        for (var r = this.head, n = 0; null !== r; n++) e.call(t, r.value, n, this), r = r.next;
      }, n.prototype.forEachReverse = function (e, t) {
        t = t || this;

        for (var r = this.tail, n = this.length - 1; null !== r; n--) e.call(t, r.value, n, this), r = r.prev;
      }, n.prototype.get = function (e) {
        for (var t = 0, r = this.head; null !== r && t < e; t++) r = r.next;

        if (t === e && null !== r) return r.value;
      }, n.prototype.getReverse = function (e) {
        for (var t = 0, r = this.tail; null !== r && t < e; t++) r = r.prev;

        if (t === e && null !== r) return r.value;
      }, n.prototype.map = function (e, t) {
        t = t || this;

        for (var r = new n(), i = this.head; null !== i;) r.push(e.call(t, i.value, this)), i = i.next;

        return r;
      }, n.prototype.mapReverse = function (e, t) {
        t = t || this;

        for (var r = new n(), i = this.tail; null !== i;) r.push(e.call(t, i.value, this)), i = i.prev;

        return r;
      }, n.prototype.reduce = function (e, t) {
        var r,
            n = this.head;
        if (arguments.length > 1) r = t;else {
          if (!this.head) throw new TypeError("Reduce of empty list with no initial value");
          n = this.head.next, r = this.head.value;
        }

        for (var i = 0; null !== n; i++) r = e(r, n.value, i), n = n.next;

        return r;
      }, n.prototype.reduceReverse = function (e, t) {
        var r,
            n = this.tail;
        if (arguments.length > 1) r = t;else {
          if (!this.tail) throw new TypeError("Reduce of empty list with no initial value");
          n = this.tail.prev, r = this.tail.value;
        }

        for (var i = this.length - 1; null !== n; i--) r = e(r, n.value, i), n = n.prev;

        return r;
      }, n.prototype.toArray = function () {
        for (var e = new Array(this.length), t = 0, r = this.head; null !== r; t++) e[t] = r.value, r = r.next;

        return e;
      }, n.prototype.toArrayReverse = function () {
        for (var e = new Array(this.length), t = 0, r = this.tail; null !== r; t++) e[t] = r.value, r = r.prev;

        return e;
      }, n.prototype.slice = function (e, t) {
        (t = t || this.length) < 0 && (t += this.length), (e = e || 0) < 0 && (e += this.length);
        var r = new n();
        if (t < e || t < 0) return r;
        e < 0 && (e = 0), t > this.length && (t = this.length);

        for (var i = 0, o = this.head; null !== o && i < e; i++) o = o.next;

        for (; null !== o && i < t; i++, o = o.next) r.push(o.value);

        return r;
      }, n.prototype.sliceReverse = function (e, t) {
        (t = t || this.length) < 0 && (t += this.length), (e = e || 0) < 0 && (e += this.length);
        var r = new n();
        if (t < e || t < 0) return r;
        e < 0 && (e = 0), t > this.length && (t = this.length);

        for (var i = this.length, o = this.tail; null !== o && i > t; i--) o = o.prev;

        for (; null !== o && i > e; i--, o = o.prev) r.push(o.value);

        return r;
      }, n.prototype.splice = function (e, t, ...r) {
        e > this.length && (e = this.length - 1), e < 0 && (e = this.length + e);

        for (var n = 0, o = this.head; null !== o && n < e; n++) o = o.next;

        var s = [];

        for (n = 0; o && n < t; n++) s.push(o.value), o = this.removeNode(o);

        null === o && (o = this.tail), o !== this.head && o !== this.tail && (o = o.prev);

        for (n = 0; n < r.length; n++) o = i(this, o, r[n]);

        return s;
      }, n.prototype.reverse = function () {
        for (var e = this.head, t = this.tail, r = e; null !== r; r = r.prev) {
          var n = r.prev;
          r.prev = r.next, r.next = n;
        }

        return this.head = t, this.tail = e, this;
      };

      try {
        e("./iterator.js")(n);
      } catch (e) {}
    }, {
      "./iterator.js": 82
    }]
  }, {}, [12])(12);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 2;

/***/ }),
/* 3 */
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
function rgbaToArray(str) {
  let startIdxValue = str.indexOf('(') + 1;
  let endIdxValue = str.indexOf(')');
  let values = str.substr(startIdxValue, endIdxValue - startIdxValue);
  return values.split(',').map(Number);
}
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
   * @param {Number} properties.responseFormat the response format (e.g video/mp4)
   * @param {Object} properties.customUrlParams - the encoding options
   * @param {Number} properties.customUrlParams.video_bitrate - define a custom bitrate (in b/s)
   * @param {Number} properties.customUrlParams.video_scale - define a custom scale, 0.0 < value < 1.0
   * @param {Number} properties.customUrlParams.video_width - define a custom width
   * @param {Number} properties.customUrlParams.video_height - define a custom height
   * @return {String} the full url
   */
  buildUrl(properties) {
    let url = ""; // adds protocol
    // url += properties.protocol + "://";
    // adds endpoint url
    // url += properties.endpointUrl + "?";
    // adds service

    url = "service=" + properties.service; // adds version

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
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/datasource/parsers/Video.parser.js


class Video_parser_VideoParser extends TimeSeriesParser_parser {
  /**
   * Extracts timestamp from the message. The timestamp corresponds to the 'time' attribute of the JSON object.
   * @param {String} data - the data to parse
   * @return {Number} the extracted timestamp
   */
  parseTimeStamp(data) {
    return new DataView(data).getFloat64(0, false) * 1000;
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
    return {
      // H264 NAL unit starts at offset 12 after 8-bytes time stamp and 4-bytes frame length
      frameData: new Uint8Array(data, 12, data.byteLength - 12),
      roll: 0
    };
  }
  /**
   * Builds the full url.
   * @protected
   * @param {Object} properties
   * @return {String} the full url
   */


  buildUrl(properties) {
    return super.buildUrl(properties);
  }

}

/* harmony default export */ var Video_parser = (Video_parser_VideoParser);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/datasource/sos/parser/SosGetResultVideo.parser.js


class SosGetResultVideo_parser_SosGetResultVideoParser extends Video_parser {
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
   * @param {String} properties.foiId the foiId
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
    let url = super.buildUrl(properties); // adds feature of interest urn

    if (properties.foiId && properties.of !== '') {
      url += '&featureOfInterest=' + properties.foiId;
    }

    return url;
  }

}

/* harmony default export */ var SosGetResultVideo_parser = (SosGetResultVideo_parser_SosGetResultVideoParser);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/protocol/Status.js
/**
 * Enum for connection status.
 * @readonly
 * @enum {{name: string}}
 */
const Status = {
  CONNECTING: "connecting",
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  CLOSED_ERROR: "closed-error"
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
  constructor(url, properties) {
    this.url = url;
    this.properties = properties;
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
   * @param url -
   * @param {Object} properties -
   */
  constructor(url, properties) {
    super(url, properties);
    this.interval = -1;
    this.lastReceiveTime = 0;
  }
  /**
   * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
   * the main thread.
   */


  doRequest(extraUrl = '', queryString = undefined) {
    if (!this.init) {
      let fullUrl = this.getUrl() + extraUrl;

      if (isDefined(queryString)) {
        fullUrl += '?' + queryString;
      }

      this.closed = false;
      this.init = true; //creates Web Socket

      this.ws = new WebSocket(fullUrl);
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
        this.checkStatus(Status.CLOSED_ERROR);
        this.init = false;
        this.lastReceiveTime = -1;
        this.createReconnection();
      }.bind(this);

      this.ws.onclose = event => {
        console.warn('WebSocket stream closed: ', event.reason, event.code);

        if (event.code !== 1000 && !this.closed) {
          this.checkStatus(Status.CLOSED_ERROR);
          this.createReconnection();
        } else {
          this.checkStatus(Status.DISCONNECTED);
        }
      };

      if (this.reconnectionInterval !== -1) {
        clearInterval(this.reconnectionInterval);
        this.reconnectionInterval = -1;
      }
    }
  }

  connect() {
    this.doRequest();
  }

  createReconnection() {
    if (!this.closed && this.reconnectionInterval === -1 && this.onReconnect()) {
      this.reconnectionInterval = setInterval(function () {
        let delta = Date.now() - this.lastReceiveTime; // -1 means the WS went in error

        if (this.lastReceiveTime === -1 || delta >= this.reconnectTimeout) {
          console.warn('trying to reconnect', this.url);
          this.init = false;
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
  TIME: 'time',
  STATUS: 'status',
  TIME_CHANGED: 'time-changed'
};
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/protocol/HttpConnector.js
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

class HttpConnector_HttpConnector extends protocol_DataConnector {
  /**
   * Creates Ajax.
   * @param {String} url -
   * @param {Object} properties -
   * @param {String} properties.method -
   * @param {String} properties.headers -
   */
  constructor(url, properties) {
    super(url, properties);
    this.method = "POST";

    if (isDefined(properties)) {
      if (properties.method) {
        this.method = properties.method;
      }

      if (properties.headers) {
        this.headers = properties.headers;
      }
    }
  }
  /**
   * Sends the request to the defined server.
   * @param {String} extraUrl - extra url to append to the url
   * @param {String} queryString - get query parameters
   */


  async doRequest(extraUrl = '', queryString = undefined, responseType = undefined) {
    let fullUrl = this.getUrl() + extraUrl;

    if (isDefined(queryString)) {
      fullUrl += '?' + queryString;
    } // default


    const promiseResponse = fetch(fullUrl, {
      method: this.method,
      headers: this.headers
    }).then(function (response) {
      // if(responseTypeVar === 'application/json') {
      //     return response.json();
      // } else if(responseTypeVar === 'plain/text'){
      //     return response.text();
      // } else {
      return response.arrayBuffer(); // }
    });
    const response = await promiseResponse;
    this.onMessage(response);
    return response;
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


  onMessage(event) {}

  disconnect() {}
  /**
   * Sends the request
   * @private
   */


  connect() {
    return this.doRequest();
  }

  isConnected() {
    return false;
  }

}

/* harmony default export */ var protocol_HttpConnector = (HttpConnector_HttpConnector);
// EXTERNAL MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/libs/mqtt/mqtt.min.js
var mqtt_min = __webpack_require__(0);
var mqtt_min_default = /*#__PURE__*/__webpack_require__.n(mqtt_min);

// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/sweapi/Filter.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/


class Filter_SensorWebApiFilter {
  constructor(props) {
    this.props = props;
  }
  /**
   *
   * @param {string[]} [parameters=[]] list of parameters to include
   * @return {string}
   */


  toQueryString(parameters = []) {
    let queryString = '';
    let separator = '';

    for (let queryParameter in this.props) {
      if ((parameters.length === 0 || parameters.includes(queryParameter)) && isDefined(this.props[queryParameter])) {
        if (Array.isArray(this.props[queryParameter])) {
          queryString += separator + queryParameter + '=' + encodeURIComponent(this.props[queryParameter].join());
        } else {
          queryString += separator + queryParameter + '=' + encodeURIComponent(this.props[queryParameter]);
        }

        separator = '&';
      }
    }

    return queryString;
  }

}

/* harmony default export */ var Filter = (Filter_SensorWebApiFilter);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/sweapi/observation/ObservationFilter.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/


class ObservationFilter_ObservationFilter extends Filter {
  /**
   *
   * @param {Object} properties - object properties
   * @param {any} [properties.phenomenonTime='now'] - time range <00:00:00T00:00:00Z/00:00:00T00:00:00Z> | 'now' | 'latest'
   * @param {any} [properties.resultTime='now'] - time range <00:00:00T00:00:00Z/00:00:00T00:00:00Z> | 'latest'
   * @param {string[]} [properties.featureOfInterest=undefined] - Comma separated list of feature of interest IDs to get observations for
   * @param {string[]} [properties.select=undefined] - Comma separated list of properties to include or exclude from results (use "!" prefix to exclude)
   * @param {number[]} [properties.bbox=undefined] - BBOX to filter resources on their location
   * @param {string} [properties.location=undefined] - WKT geometry and operator to filter resources on their location or geometry
   * @param {string} [properties.format='application/json'] - Mime type designating the format to use to encode the response.
   * @param {string} [properties.replaySpeed=undefined] - Mime type designating the format to use to encode the response.
   */
  constructor(properties) {
    super({
      phenomenonTime: undefined,
      resultTime: undefined,
      featureOfInterest: undefined,
      select: undefined,
      bbox: undefined,
      location: undefined,
      format: 'application/json',
      replaySpeed: undefined,
      ...properties // merge defined properties

    });
  }

}

/* harmony default export */ var observation_ObservationFilter = (ObservationFilter_ObservationFilter);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/mqtt/MqttProvider.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/



let mqttCallbacks = {};

class MqttProvider_MqttProvider {
  /**
   * Build the MqttProvider.
   * @param {Object} properties - the object properties
   * @param {String} properties.endpoint - the mqtt endpoint[:port]
   * @param {String} properties.clientId - the clientId
   * @param {Object} properties.options - the MQTT.js property options as defined  [mqtt.Client(streamBuilder, options)]{@link https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options}
   * Note that the credentials are passed in the object options as for the mqtt.js client.
   */
  constructor(properties) {
    this.properties = properties;

    if (!isDefined(properties)) {
      throw Error('endpoint and clientId are mandatory properties');
    }

    if (!isDefined(properties.endpoint)) {
      throw Error('endpoint is a mandatory property');
    }

    if (!isDefined(properties.clientId)) {
      throw Error('clientId is a mandatory property');
    }

    let options = {
      reconnectPeriod: 30,
      connectTimeout: 30 * 1000,
      wsOptions: {
        binaryType: 'arraybuffer'
      }
    }; // merge generic options

    if (isDefined(this.properties.options)) {
      options = { ...options,
        ...this.properties.options
      };
    }

    this.options = options;
    this.endpoint = properties.endpoint + '/mqtt';
    this.clientId = properties.clientId;
    this.client = null;
  }

  subscribeToObservations(dataStreamId, format, callback) {
    const obsFilter = new observation_ObservationFilter();
    this.subscribeToObservationsByObsFilter([dataStreamId], obsFilter, callback);
  }
  /**
   * Generic model
   * mqttCallback: {
   *     'topic0': [callback]
   * }
   */

  /**
   *
   * @param {String[]} [dataStreamIds=[]] - list of datastream ids
   * @param {ObservationFilter} observationFilter - the observation filter object
   * @param callback
   */


  subscribeToObservationsByObsFilter(dataStreamIds = [], observationFilter, callback) {
    if (!isDefined(this.client)) {
      throw Error('You must connect the client before subscribing any topic');
    } // waiting for the client gets connected


    let interval;
    interval = setInterval(() => {
      if (this.client.connected) {
        try {
          // subscribe
          for (let dataStreamId of dataStreamIds) {
            // store callback for this topic
            if (!(dataStreamId in mqttCallbacks)) {
              mqttCallbacks[dataStreamId] = [];
            }

            mqttCallbacks[dataStreamId].push(callback);
            this.client.subscribe(dataStreamId, function (err) {
              if (err) {
                callback(err);
              } else {
                console.warn(`Subscribed to ${dataStreamId}`);
              }
            });
          }
        } catch (exception) {
          console.error(exception);
        } finally {
          clearInterval(interval);
        }
      }
    }, 100);
  }
  /**
   * Check to unsuscribe to any topic listened by this dsId
   * If the topic is only subscribed by the dsId, unsubscribe from broken
   * Otherwise, remove from the list of subscribe topic/dsId
   * @param dataStreamId
   */


  unsubscribeDs(dataStreamId) {
    console.log(`remove dataStream: ${dataStreamId}`);
    delete mqttCallbacks[dataStreamId];
  }

  connect() {
    if (!isDefined(this.client)) {
      // connects to the broker specified by the given url and options and returns a Client.
      this.client = mqtt_min_default.a.connect(this.endpoint, { ...this.options
      });
      const that = this;
      this.client.on('connect', function (e) {
        console.info(`Mqqt client is connected to ${that.endpoint}`);
      });
      this.client.on('message', this.onMessage.bind(this));
    }
  }

  async onMessage(topic, message) {
    if (topic in mqttCallbacks) {
      // callback for the corresponding topic
      for (let callbackFn of mqttCallbacks[topic]) {
        // callback to all subscription registered
        callbackFn(new Uint8Array(message).buffer);
      }
    }
  }

  disconnect() {
    if (isDefined(this.client)) {
      throw Error('The client has not been created yet');
    } // close the client


    this.client.end();
    mqttCallbacks = {};
    this.client = null;
  }

  isConnected() {
    return isDefined(this.client) && this.client.connected;
  }

}

/* harmony default export */ var mqtt_MqttProvider = (MqttProvider_MqttProvider);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/protocol/MqttConnector.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/




/**
 * Defines the MqttConnector to connect to a remote server by creating a Mqtt channel.
 * @extends DataConnector
 * @example
 * import MqttConnector from 'osh-js/dataconnector/MqttConnector.js';
 *
 * let url = ...;
 * let connector = new MqttConnector(url);
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
// TODO: Useless in WebWorker since the WebWorker has its own context.

const mqttProviders = {};

class MqttConnector_MqttConnector extends protocol_DataConnector {
  /**
   *
   * @param properties -
   */
  constructor(url, properties) {
    super(url, { ...properties
    });
    this.interval = -1;
  }
  /**
   * Connect to the Mqtt broker.
   */


  doRequest(topic = '', queryString = undefined) {
    if (!this.init) {
      let fullUrl = this.getUrl();
      let options = {
        reconnectPeriod: this.reconnectTimeout,
        connectTimeout: 30 * 1000
      };

      if (isDefined(this.properties.options)) {
        options = { ...options,
          ...this.properties.options
        };
      } // only 1 provider by URL


      if (!(fullUrl in mqttProviders)) {
        mqttProviders[fullUrl] = new mqtt_MqttProvider({
          endpoint: fullUrl,
          clientId: randomUUID(),
          options: options
        });
        mqttProviders[fullUrl].connect();
      }

      mqttProviders[fullUrl].subscribeToObservations(topic, 'application/json', this.onMessage);
      this.url = fullUrl;
    }
  }
  /**
   * Disconnects and close the mqtt client.
   */


  disconnect() {
    // does not call super to avoid reconnection logic and use the one of the mqtt.js lib
    this.checkStatus(Status.DISCONNECTED);
    this.init = false;
    this.closed = true;

    if (isDefined(mqttProviders[this.url])) {
      // unsubscribe topic
      // find the client
      const client = mqttProviders[this.url];
      client.unsubscribeDs(this.properties.topic);
    }

    console.warn(`Disconnected from ${this.getUrl()}`);
  }

  connect() {
    this.doRequest(this.properties.topic || '');
  }
  /**
   * The onMessage method used by the mqtt client to callback the data
   * @param data the callback data
   * @event
   */


  onMessage(data) {}

  isConnected() {
    return isDefined(mqttProviders[this.url]) && mqttProviders[this.url].isConnected();
  }

}

/* harmony default export */ var protocol_MqttConnector = (MqttConnector_MqttConnector);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/datasource/handler/DataSourceHandler.js








class DataSourceHandler_DataSourceHandler {
  constructor(parser, worker) {
    this.parser = parser;
    this.connector = null;
    this.reconnectTimeout = 1000 * 10; // 10 secs

    this.values = [];
    this.version = -Number.MAX_SAFE_INTEGER;
    this.id = randomUUID();
    this.initialized = false;
  }

  init(propertiesStr, topic, dataSourceId) {
    this.dataSourceId = dataSourceId; // check for existing protocol

    if (this.connector !== null) {
      this.connector.disconnect();
      this.connector = null;
    }

    this.setTopic(topic);
    const properties = propertiesStr;
    this.handleProperties(properties);
    this.createDataConnector(this.properties);
    this.initialized = true;
  }

  handleProperties(properties) {
    if (isDefined(properties.bufferingTime)) {
      this.bufferingTime = properties.bufferingTime;
    }

    if (isDefined(properties.timeOut)) {
      this.timeOut = properties.timeOut;
    }

    if (isDefined(properties.reconnectTimeout)) {
      this.reconnectTimeout = properties.reconnectTimeout;
    }

    this.properties = properties;
  }
  /**
   * @protected
   */


  async createDataConnector(properties, connector = undefined) {
    this.updatedProperties = properties;
    const tls = properties.tls ? 's' : '';
    const url = properties.protocol + tls + '://' + properties.endpointUrl;

    if (!isDefined(connector)) {
      // checks if type is WebSocketConnector
      if (properties.protocol.startsWith('ws')) {
        // for wss
        this.connector = new protocol_WebSocketConnector(url);
      } else if (properties.protocol.startsWith('http')) {
        //for https
        this.connector = new protocol_HttpConnector(url, {
          responseType: properties.responseType || 'arraybuffer',
          method: 'GET'
        });
      } else if (properties.protocol === 'topic') {
        this.connector = new protocol_TopicConnector(url);
      } else if (properties.protocol === 'mqtt') {
        const tls = properties.tls ? 's' : '';
        const url = properties.protocol + tls + '://' + properties.endpointUrl;
        this.connector = new protocol_MqttConnector(url, properties);
      }
    } else {
      this.connector = connector;
    }

    await this.setUpConnector(properties);
  }

  async setUpConnector(properties) {
    if (this.connector !== null) {
      // set the reconnectTimeout
      this.connector.setReconnectTimeout(this.reconnectTimeout); // connects the callback

      this.connector.onMessage = this.onMessage.bind(this); // bind change connection STATUS

      this.connector.onChangeStatus = this.onChangeStatus.bind(this);
      await this.updateAferCreatingConnector(properties);
    }
  }

  async updateAferCreatingConnector(properties) {}
  /**
   * Sets the current topic to listen
   * @param {String} topic - the topic to listen
   */


  setTopic(topic) {
    if (this.topic === topic) {
      return;
    }

    if (isDefined(this.broadcastChannel)) {
      console.warn(`Replace old topic ${this.topic} by ${topic}`);
      this.broadcastChannel.close();
    }

    this.broadcastChannel = new BroadcastChannel(topic);
    this.topic = topic;
  }

  connect() {
    if (this.connector !== null) {
      this.connector.doRequest('', this.parser.buildUrl(this.updatedProperties));
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
    } // console.log('push message on ',this.broadcastChannel)


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
    let data = undefined;

    if (message.message === 'init') {
      if (!this.initialized) {
        this.init(message.properties, message.topic, message.id);
      }

      data = this.initialized;
    } else if (message.message === 'connect') {
      this.connect();
    } else if (message.message === 'disconnect') {
      this.disconnect();
    } else if (message.message === 'topic') {
      this.setTopic(message.topic);
    } else if (message.message === 'update-url') {
      this.updateProperties(message.data);
    } else if (message.message === 'is-connected') {
      data = this.isConnected();
    } else if (message.message === 'is-init') {
      data = this.initialized;
    } else {
      // skip response
      return;
    }

    worker.postMessage({
      message: message.message,
      data: data,
      messageId: message.messageId
    });
  }

}

/* harmony default export */ var handler_DataSourceHandler = (DataSourceHandler_DataSourceHandler);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/datasource/handler/TimeSeriesDataSourceHandler.js




class TimeSeriesDataSourceHandler_TimeSeriesDataSourceHandler extends handler_DataSourceHandler {
  constructor(parser) {
    super(parser);
    this.lastTimeStamp = null;
    this.lastStartTime = 'now';
    this.timeShift = 0;
    this.timeBroadcastChannel = null;
  }
  /**
   * @protected
   */


  async createDataConnector(properties, connector) {
    super.createDataConnector({ ...properties,
      timeShift: this.timeShift
    }, connector);
    const lastStartTimeCst = this.parser && this.parser.lastStartTime || properties.startTime;

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

  handleProperties(properties) {
    super.handleProperties(properties);

    if (isDefined(properties.timeShift)) {
      this.timeShift = properties.timeShift;
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
          timestamp: this.lastTimeStamp,
          type: EventType.TIME
        });
      }
    }
  }

  getLastTimeStamp() {
    return this.lastTimeStamp;
  }

  async updateProperties(properties) {
    try {
      this.disconnect();
      this.timeBroadcastChannel.postMessage({
        dataSourceId: this.dataSourceId,
        type: EventType.TIME_CHANGED
      });
      let lastTimestamp = new Date(this.lastTimeStamp).toISOString();

      if (properties.hasOwnProperty('startTime')) {
        lastTimestamp = properties.startTime;
      } else if (this.properties.startTime === 'now') {
        //handle RealTime
        lastTimestamp = 'now';
      }

      this.version++;
      await this.createDataConnector({ ...this.properties,
        ...properties,
        lastTimeStamp: lastTimestamp
      });

      if (isDefined(properties) && isDefined(properties.reconnect) && properties.reconnect) {
        this.connect();
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  handleMessage(message, worker) {
    super.handleMessage(message, worker);
    let data = undefined;

    if (message.message === 'last-timestamp') {
      data = this.getLastTimeStamp();
    } else if (message.message === 'topic') {
      this.setTimeTopic(message.timeTopic);
    } else {
      // skip response
      return;
    }

    worker.postMessage({
      message: message.message,
      data: data,
      messageId: message.messageId
    });
  }

  setTimeTopic(timeTopic) {
    if (this.timeTopic === timeTopic) {
      return;
    }

    if (this.timeBroadcastChannel !== null) {
      console.warn(`Replace old topic ${this.timeTopic} by ${timeTopic}`);
      this.timeBroadcastChannel.close();
    }

    this.timeBroadcastChannel = new BroadcastChannel(timeTopic);
    this.timeTopic = timeTopic;
  }

}

/* harmony default export */ var handler_TimeSeriesDataSourceHandler = (TimeSeriesDataSourceHandler_TimeSeriesDataSourceHandler);
// CONCATENATED MODULE: /home/nevro/Progs/progs-local/git-repo/OSH/osh-js/source/core/datasource/sos/worker/SosGetResultVideo.worker.js



const dataSourceHandler = new handler_TimeSeriesDataSourceHandler(new SosGetResultVideo_parser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};




/***/ })
/******/ ]);