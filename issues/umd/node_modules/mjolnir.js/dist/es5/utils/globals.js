"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passiveSupported = exports.document = exports.global = exports.window = exports.userAgent = void 0;
var userAgent = typeof navigator !== 'undefined' && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
exports.userAgent = userAgent;
var window_ = typeof window !== 'undefined' ? window : global;
exports.window = window_;
var global_ = typeof global !== 'undefined' ? global : window;
exports.global = global_;
var document_ = typeof document !== 'undefined' ? document : {};
exports.document = document_;
var passiveSupported = false;
exports.passiveSupported = passiveSupported;

try {
  var options = {
    get passive() {
      exports.passiveSupported = passiveSupported = true;
      return true;
    }

  };
  window_.addEventListener('test', options, options);
  window_.removeEventListener('test', options, options);
} catch (err) {}
//# sourceMappingURL=globals.js.map