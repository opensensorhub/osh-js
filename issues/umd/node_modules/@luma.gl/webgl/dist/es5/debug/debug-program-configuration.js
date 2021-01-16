"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDebugTableForProgramConfiguration = getDebugTableForProgramConfiguration;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _attributeUtils = require("../webgl-utils/attribute-utils");

function getDebugTableForProgramConfiguration(config) {
  var table = {};
  var header = "Accessors for ".concat(config.id);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = config.attributeInfos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var attributeInfo = _step.value;

      if (attributeInfo) {
        var glslDeclaration = getGLSLDeclaration(attributeInfo);
        table["in ".concat(glslDeclaration)] = (0, _defineProperty2["default"])({}, header, JSON.stringify(attributeInfo.accessor));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = config.varyingInfos[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var varyingInfo = _step2.value;

      if (varyingInfo) {
        var _glslDeclaration = getGLSLDeclaration(varyingInfo);

        table["out ".concat(_glslDeclaration)] = (0, _defineProperty2["default"])({}, header, JSON.stringify(varyingInfo.accessor));
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return table;
}

function getGLSLDeclaration(attributeInfo) {
  var _attributeInfo$access = attributeInfo.accessor,
      type = _attributeInfo$access.type,
      size = _attributeInfo$access.size;
  var typeAndName = (0, _attributeUtils.getCompositeGLType)(type, size);

  if (typeAndName) {
    return "".concat(typeAndName.name, " ").concat(attributeInfo.name);
  }

  return attributeInfo.name;
}
//# sourceMappingURL=debug-program-configuration.js.map