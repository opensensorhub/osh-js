"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _VMain = _interopRequireDefault(require("../VMain/VMain"));

var _console = require("../../util/console");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Extensions

/* @vue/component */
var _default = _VMain.default.extend({
  name: 'v-main',
  created: function created() {
    (0, _console.deprecate)('v-content', 'v-main', this);
  }
});

exports.default = _default;
//# sourceMappingURL=VContent.js.map