"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDebugTableForUniforms = getDebugTableForUniforms;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = require("../utils");

function getDebugTableForUniforms() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$header = _ref.header,
      header = _ref$header === void 0 ? 'Uniforms' : _ref$header,
      program = _ref.program,
      uniforms = _ref.uniforms,
      _ref$undefinedOnly = _ref.undefinedOnly,
      undefinedOnly = _ref$undefinedOnly === void 0 ? false : _ref$undefinedOnly;

  (0, _utils.assert)(program);
  var SHADER_MODULE_UNIFORM_REGEXP = '.*_.*';
  var PROJECT_MODULE_UNIFORM_REGEXP = '.*Matrix';
  var uniformLocations = program._uniformSetters;
  var table = {};
  var uniformNames = Object.keys(uniformLocations).sort();
  var count = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = uniformNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _uniformName = _step.value;

      if (!_uniformName.match(SHADER_MODULE_UNIFORM_REGEXP) && !_uniformName.match(PROJECT_MODULE_UNIFORM_REGEXP)) {
        if (addUniformToTable({
          table: table,
          header: header,
          uniforms: uniforms,
          uniformName: _uniformName,
          undefinedOnly: undefinedOnly
        })) {
          count++;
        }
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
    for (var _iterator2 = uniformNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _uniformName2 = _step2.value;

      if (_uniformName2.match(PROJECT_MODULE_UNIFORM_REGEXP)) {
        if (addUniformToTable({
          table: table,
          header: header,
          uniforms: uniforms,
          uniformName: _uniformName2,
          undefinedOnly: undefinedOnly
        })) {
          count++;
        }
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

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = uniformNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _uniformName3 = _step3.value;

      if (!table[_uniformName3]) {
        if (addUniformToTable({
          table: table,
          header: header,
          uniforms: uniforms,
          uniformName: _uniformName3,
          undefinedOnly: undefinedOnly
        })) {
          count++;
        }
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var unusedCount = 0;
  var unusedTable = {};

  if (!undefinedOnly) {
    for (var uniformName in uniforms) {
      var uniform = uniforms[uniformName];

      if (!table[uniformName]) {
        unusedCount++;
        unusedTable[uniformName] = (0, _defineProperty2["default"])({
          Type: "NOT USED: ".concat(uniform)
        }, header, (0, _utils.formatValue)(uniform));
      }
    }
  }

  return {
    table: table,
    count: count,
    unusedTable: unusedTable,
    unusedCount: unusedCount
  };
}

function addUniformToTable(_ref2) {
  var table = _ref2.table,
      header = _ref2.header,
      uniforms = _ref2.uniforms,
      uniformName = _ref2.uniformName,
      undefinedOnly = _ref2.undefinedOnly;
  var value = uniforms[uniformName];
  var isDefined = isUniformDefined(value);

  if (!undefinedOnly || !isDefined) {
    var _table$uniformName;

    table[uniformName] = (_table$uniformName = {}, (0, _defineProperty2["default"])(_table$uniformName, header, isDefined ? (0, _utils.formatValue)(value) : 'N/A'), (0, _defineProperty2["default"])(_table$uniformName, 'Uniform Type', isDefined ? value : 'NOT PROVIDED'), _table$uniformName);
    return true;
  }

  return false;
}

function isUniformDefined(value) {
  return value !== undefined && value !== null;
}
//# sourceMappingURL=debug-uniforms.js.map