import _typeof from "@babel/runtime/helpers/esm/typeof";
var globals = {
  self: typeof self !== 'undefined' && self,
  window: typeof window !== 'undefined' && window,
  global: typeof global !== 'undefined' && global,
  document: typeof document !== 'undefined' && document
};
var self_ = globals.self || globals.window || globals.global;
var window_ = globals.window || globals.self || globals.global;
var global_ = globals.global || globals.self || globals.window;
var document_ = globals.document || {};
export { self_ as self, window_ as window, global_ as global, document_ as document };
export var isBrowser = (typeof process === "undefined" ? "undefined" : _typeof(process)) !== 'object' || String(process) !== '[object process]' || process.browser;
export var isWorker = typeof importScripts === 'function';
var matches = typeof process !== 'undefined' && process.version && process.version.match(/v([0-9]*)/);
export var nodeVersion = matches && parseFloat(matches[1]) || 0;
//# sourceMappingURL=globals.js.map