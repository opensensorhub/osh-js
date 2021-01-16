"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "formatGLSLCompilerError", {
  enumerable: true,
  get: function get() {
    return _formatGlslError["default"];
  }
});
Object.defineProperty(exports, "parseGLSLCompilerError", {
  enumerable: true,
  get: function get() {
    return _formatGlslError.parseGLSLCompilerError;
  }
});
Object.defineProperty(exports, "getShaderName", {
  enumerable: true,
  get: function get() {
    return _getShaderName["default"];
  }
});
Object.defineProperty(exports, "getShaderVersion", {
  enumerable: true,
  get: function get() {
    return _getShaderVersion["default"];
  }
});
Object.defineProperty(exports, "getShaderTypeName", {
  enumerable: true,
  get: function get() {
    return _getShaderTypeName["default"];
  }
});

var _formatGlslError = _interopRequireWildcard(require("./format-glsl-error"));

var _getShaderName = _interopRequireDefault(require("./get-shader-name"));

var _getShaderVersion = _interopRequireDefault(require("./get-shader-version"));

var _getShaderTypeName = _interopRequireDefault(require("./get-shader-type-name"));
//# sourceMappingURL=index.js.map