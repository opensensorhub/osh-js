var moduleExports = require('./index');

var _global = typeof window === 'undefined' ? global : window;

_global.loaders = _global.loaders || {};
module.exports = Object.assign(_global.loaders, moduleExports);
//# sourceMappingURL=bundle.js.map