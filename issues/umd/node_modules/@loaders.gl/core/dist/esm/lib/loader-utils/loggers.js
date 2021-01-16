import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
export var NullLog = function () {
  function NullLog() {
    _classCallCheck(this, NullLog);
  }

  _createClass(NullLog, [{
    key: "log",
    value: function log() {
      return function (_) {};
    }
  }, {
    key: "info",
    value: function info() {
      return function (_) {};
    }
  }, {
    key: "warn",
    value: function warn() {
      return function (_) {};
    }
  }, {
    key: "error",
    value: function error() {
      return function (_) {};
    }
  }]);

  return NullLog;
}();
export var ConsoleLog = function () {
  function ConsoleLog() {
    _classCallCheck(this, ConsoleLog);

    this.console = console;
  }

  _createClass(ConsoleLog, [{
    key: "log",
    value: function log() {
      var _this$console$log;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_this$console$log = this.console.log).bind.apply(_this$console$log, [this.console].concat(args));
    }
  }, {
    key: "info",
    value: function info() {
      var _this$console$info;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return (_this$console$info = this.console.info).bind.apply(_this$console$info, [this.console].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      var _this$console$warn;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return (_this$console$warn = this.console.warn).bind.apply(_this$console$warn, [this.console].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      var _this$console$error;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return (_this$console$error = this.console.error).bind.apply(_this$console$error, [this.console].concat(args));
    }
  }]);

  return ConsoleLog;
}();
//# sourceMappingURL=loggers.js.map