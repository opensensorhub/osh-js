import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Stats } from '@probe.gl/stats';
var STAT_QUEUED_REQUESTS = 'Queued Requests';
var STAT_ACTIVE_REQUESTS = 'Active Requests';
var STAT_CANCELLED_REQUESTS = 'Cancelled Requests';
var STAT_QUEUED_REQUESTS_EVER = 'Queued Requests Ever';
var STAT_ACTIVE_REQUESTS_EVER = 'Active Requests Ever';
var DEFAULT_PROPS = {
  id: 'request-scheduler',
  throttleRequests: true,
  maxRequests: 6
};

var RequestScheduler = function () {
  function RequestScheduler() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, RequestScheduler);

    this.props = _objectSpread(_objectSpread({}, DEFAULT_PROPS), props);
    this.requestQueue = [];
    this.activeRequestCount = 0;
    this.requestMap = new Map();
    this.stats = new Stats({
      id: props.id
    });
    this.stats.get(STAT_QUEUED_REQUESTS);
    this.stats.get(STAT_ACTIVE_REQUESTS);
    this.stats.get(STAT_CANCELLED_REQUESTS);
    this.stats.get(STAT_QUEUED_REQUESTS_EVER);
    this.stats.get(STAT_ACTIVE_REQUESTS_EVER);
    this._deferredUpdate = null;
  }

  _createClass(RequestScheduler, [{
    key: "scheduleRequest",
    value: function scheduleRequest(handle) {
      var getPriority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return 0;
      };

      if (!this.props.throttleRequests) {
        return Promise.resolve({
          done: function done() {}
        });
      }

      if (this.requestMap.has(handle)) {
        return this.requestMap.get(handle);
      }

      var request = {
        handle: handle,
        getPriority: getPriority
      };
      var promise = new Promise(function (resolve) {
        request.resolve = resolve;
        return request;
      });
      this.requestQueue.push(request);
      this.requestMap.set(handle, promise);

      this._issueNewRequests();

      return promise;
    }
  }, {
    key: "_issueRequest",
    value: function _issueRequest(request) {
      var _this = this;

      var handle = request.handle,
          resolve = request.resolve;
      var isDone = false;

      var done = function done() {
        if (!isDone) {
          isDone = true;

          _this.requestMap["delete"](handle);

          _this.activeRequestCount--;

          _this._issueNewRequests();
        }
      };

      this.activeRequestCount++;
      return resolve ? resolve({
        done: done
      }) : Promise.resolve({
        done: done
      });
    }
  }, {
    key: "_issueNewRequests",
    value: function _issueNewRequests() {
      var _this2 = this;

      if (!this._deferredUpdate) {
        this._deferredUpdate = setTimeout(function () {
          return _this2._issueNewRequestsAsync();
        }, 0);
      }
    }
  }, {
    key: "_issueNewRequestsAsync",
    value: function _issueNewRequestsAsync() {
      this._deferredUpdate = null;
      var freeSlots = Math.max(this.props.maxRequests - this.activeRequestCount, 0);

      if (freeSlots === 0) {
        return;
      }

      this._updateAllRequests();

      for (var i = 0; i < freeSlots; ++i) {
        if (this.requestQueue.length > 0) {
          var request = this.requestQueue.shift();

          this._issueRequest(request);
        }
      }
    }
  }, {
    key: "_updateAllRequests",
    value: function _updateAllRequests() {
      var requestQueue = this.requestQueue;

      for (var i = 0; i < requestQueue.length; ++i) {
        var request = requestQueue[i];

        if (!this._updateRequest(request)) {
          requestQueue.splice(i, 1);
          this.requestMap["delete"](request.handle);
          i--;
        }
      }

      requestQueue.sort(function (a, b) {
        return a.priority - b.priority;
      });
    }
  }, {
    key: "_updateRequest",
    value: function _updateRequest(request) {
      request.priority = request.getPriority(request.handle);

      if (request.priority < 0) {
        request.resolve(null);
        return false;
      }

      return true;
    }
  }]);

  return RequestScheduler;
}();

export { RequestScheduler as default };
//# sourceMappingURL=request-scheduler.js.map