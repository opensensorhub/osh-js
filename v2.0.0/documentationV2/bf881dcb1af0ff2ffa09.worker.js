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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
// CONCATENATED MODULE: ../source/osh/utils/Utils.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/ /** * @module Utils */ /** Maximum value of a long */var MAX_LONG=Math.pow(2,53)+1;/**
 * Global helper method to test if a letiable or object attribute is defined
 */function isDefined(v){return typeof v!=='undefined'&&v!==null;}/**
 Global helper method to test if a letiable or object attribute has a value,
 that is it is defined and non null
 */function hasValue(v){return isDefined(v)&&v!==null;}/**
 Global helper method to test if a letiable or object attribute is of a particular type
 */function hasType(v,expectedType){var hasVal=hasValue(v);return hasVal&&typeof v===expectedType;}/**
 Global helper method to test if a letiable or object attribute is an object
 */function isObject(v,letName){return hasType(v,'object',letName);}/**
 Global helper method to test if a letiable or object attribute is an array
 */function isArray(v){return isDefined(v)&&Array.isArray(v);}/**
 Global helper method to test if a letiable or object attribute is a function
 */function isFunction(v,letName){return hasType(v,'function',letName);}/**
 Assert that a letiable or object attribute is defined
 **/function assertDefined(v,letName){if(letName===void 0){letName='letiable';}if(!isDefined(v)){throw letName+" must be defined";}return v;}/**
 Assert that a letiable or object attribute is defined and non-null
 **/function assertType(v,expectedType,letName){if(letName===void 0){letName='letiable';}assertDefined(v,letName);if(typeof v!==expectedType){throw letName+" must be of type "+expectedType;}return v;}/**
 Assert that a letiable or object attribute is a string
 **/function assertBoolean(v,letName){return assertType(v,'boolean',letName);}/**
 Assert that a letiable or object attribute is a string
 **/function assertString(v,letName){return assertType(v,'string',letName);}/**
 Assert that a letiable or object attribute is a number
 **/function assertNumber(v,letName){return assertType(v,'number',letName);}/**
 Assert that a letiable or object attribute is a number
 **/function assertPositive(v,letName){assertNumber(v,letName);if(v<=0){throw letName+" must be a positive number";}}/**
 Assert that a letiable or object attribute is an object
 **/function assertObject(v,letName){return assertType(v,'object',letName);}/**
 Assert that a letiable or object attribute is an object
 **/function assertArray(v,letName){if(letName===void 0){letName='letiable';}assertDefined(v,letName);if(!Array.isArray(v)){throw letName+" must be an array";}return v;}/**
 Assert that a letiable or object attribute is a function
 **/function assertFunction(v,letName){return assertType(v,'function',letName);}/**
 Assert that a letiable or object attribute is defined and non-null
 **/function assertHasValue(v,letName){if(letName===void 0){letName='letiable';}assertDefined(v,letName);if(!hasValue(v)){throw letName+" must not be null";}return v;}/**
 *
 * @return {String}
 */function randomUUID(){return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c==='x'?r:r&0x3|0x8;return v.toString(16);});}/**
 * This function stamps/embeds a UUID into an object and returns the UUID generated for it
 * @return {String}
 */function stampUUID(obj){obj._osh_id=obj._osh_id||randomUUID();return obj._osh_id;}//buffer is an ArrayBuffer object, the offset if specified in bytes, and the type is a string
//corresponding to an OGC data type.
//See http://def.seegrid.csiro.au/sissvoc/ogc-def/resource?uri=http://www.opengis.net/def/dataType/OGC/0/
/**
 *
 * @param buffer
 * @param offset
 * @param type
 * @return {*}
 */function ParseBytes(buffer,offset,type){var view=new DataView(buffer);//Note: There exist types not listed in the map below that have OGC definitions, but no appropriate
//methods or corresponding types available for parsing in javascript. They are float128, float16, signedLong,
//and unsignedLong
var typeMap={double:function double(offset){return{val:view.getFloat64(offset),bytes:8};},float64:function float64(offset){return{val:view.getFloat64(offset),bytes:8};},float32:function float32(offset){return{val:view.getFloat32(offset),bytes:4};},signedByte:function signedByte(offset){return{val:view.getInt8(offset),bytes:1};},signedInt:function signedInt(offset){return{val:view.getInt32(offset),bytes:4};},signedShort:function signedShort(offset){return{val:view.getInt16(offset),bytes:2};},unsignedByte:function unsignedByte(offset){return{val:view.getUint8(offset),bytes:1};},unsignedInt:function unsignedInt(offset){return{val:view.getUint32(offset),bytes:4};},unsignedShort:function unsignedShort(offset){return{val:view.getUint16(offset),bytes:2};}//TODO: string-utf-8:
};return typeMap[type](offset);}//This function recursivley iterates over the resultStructure to fill in
//values read from data which should be an ArrayBuffer containing the payload from a websocket
/**
 *
 * @param struct
 * @param data
 * @param offsetBytes
 * @return {*}
 */function ReadData(struct,data,offsetBytes){var offset=offsetBytes;for(var i=0;i<struct.fields.length;i++){var currFieldStruct=struct.fields[i];if(isDefined(currFieldStruct.type)&&currFieldStruct.type!==null){var ret=ParseBytes(data,offset,currFieldStruct.type);currFieldStruct.val=ret.val;offset+=ret.bytes;}else if(isDefined(currFieldStruct.count)&&currFieldStruct.count!==null){//check if count is a reference to another letiable
if(isNaN(currFieldStruct.count)){var id=currFieldStruct.count;var fieldName=struct.id2FieldMap[id];currFieldStruct.count=struct.findFieldByName(fieldName).val;}for(var c=0;c<currFieldStruct.count;c++){for(var j=0;j<currFieldStruct.fields.length;j++){var field=JSON.parse(JSON.stringify(currFieldStruct.fields[j]));offset=ReadData(field,data,offset);currFieldStruct.val.push(field);}}}}return offset;}/**
 *
 * @param resultStructure
 * @return {{}}
 */function GetResultObject(resultStructure){//TODO: handle cases for nested arrays / matrix data types
var result={};for(var i=0;i<resultStructure.fields.length;i++){if(isDefined(resultStructure.fields[i].count)){result[resultStructure.fields[i].name]=[];for(var c=0;c<resultStructure.fields[i].count;c++){var item={};for(var k=0;k<resultStructure.fields[i].val[c].fields.length;k++){item[resultStructure.fields[i].val[c].fields[k].name]=resultStructure.fields[i].val[c].fields[k].val;}result[resultStructure.fields[i].name].push(item);}}else{result[resultStructure.fields[i].name]=resultStructure.fields[i].val;}}return result;}/**
 *
 * @return {boolean}
 */function isOpera(){return!!window.opr&&!!opr.addons||!!window.opera||navigator.userAgent.indexOf(' OPR/')>=0;}/**
 *
 * @return {boolean}
 */function isFirefox(){return typeof InstallTrigger!=='undefined';}/**
 *
 * @return {boolean}
 */function isSafari(){return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor')>0;}/**
 *
 * @return {boolean}
 */function isChrome(){return!!window.chrome&&!!window.chrome.webstore;}/**
 *
 * @return {*|boolean}
 */function isBlink(){return(isChrome||isOpera)&&!!window.CSS;}/**
 *
 * @param a
 * @param b
 * @return {boolean}
 */function isArrayIntersect(a,b){return a.filter(function(element){return b.indexOf(element)>-1;}).length>0;}/**
 *
 * @param o
 * @return {boolean}
 */function isElement(o){return typeof HTMLElement==="object"?o instanceof HTMLElement://DOM2
o&&typeof o==="object"&&o!==null&&o.nodeType===1&&typeof o.nodeName==="string";}/**
 *
 * @return {*}
 */function isWebWorker(){return isDefined(Worker);}/**
 *
 * @param div
 */function takeScreenShot(div){}/**
 * Remove a css class from a the div given as argument.
 * @param div the div to remove the class from
 * @param css the css class to remove
 */function removeCss(div,css){var divCss=div.className;css=divCss.replace(css,"");div.className=css;}/**
 * Add a css class to a the div given as argument.
 * @param div the div to add the class to
 * @param css the css class to add
 */function addCss(div,css){div.setAttribute("class",div.className+" "+css);}/**
 * Removes the last character of a {string} object.
 * @param {string} value - The input {string}
 * @return {string} The value without the last character
 */function removeLastCharIfExist(value){if(!isDefined(undefined)||value===null||value.length===0||!value.endsWith("/")){return value;}return value.substring(0,value.length-1);}
// CONCATENATED MODULE: ../source/osh/datareceiver/parsers/DataSourceParser.js
var DataSourceParser_DataSourceParser=/*#__PURE__*/function(){function DataSourceParser(){}var _proto=DataSourceParser.prototype;/**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.protocol the connector protocol
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
     * @param {Number} properties.customUrlParams.video_bitrate - define a custom bitrate (in b/s)
     * @param {Number} properties.customUrlParams.video_scale - define a custom scale, 0.0 < value < 1.0
     * @param {Number} properties.customUrlParams.video_width - define a custom width
     * @param {Number} properties.customUrlParams.video_height - define a custom height
     * @return {String} the full url
     */_proto.buildUrl=function buildUrl(properties){var url="";// adds protocol
url+=properties.protocol+"://";// adds endpoint url
url+=properties.endpointUrl+"?";// adds service
url+="service="+properties.service+"&";// adds version
url+="version=2.0&";// adds request
url+="request=GetResult&";// adds offering
url+="offering="+properties.offeringID+"&";// adds feature of interest urn
if(properties.foiURN&&properties.foiURN!==''){url+='featureOfInterest='+properties.foiURN+'&';}// adds observedProperty
url+="observedProperty="+properties.observedProperty+"&";// adds temporalFilter
var stTime=isDefined(properties.lastTimeStamp)?properties.lastTimeStamp:properties.startTime;this.lastStartTime=properties.startTime;var endTime=properties.endTime;url+="temporalFilter=phenomenonTime,"+stTime+"/"+endTime+"&";if(properties.replaySpeed){// adds replaySpeed
url+="replaySpeed="+properties.replaySpeed;}// adds responseFormat (optional)
if(properties.responseFormat){url+="&responseFormat="+properties.responseFormat;}if(isDefined(properties.customUrlParams)&&Object.keys(properties.customUrlParams).length>0){url+='&';for(var key in properties.customUrlParams){url+=key+'='+properties.customUrlParams[key]+'&';}if(url.endsWith('&')){url=url.slice(0,-1);}}return url;};return DataSourceParser;}();/* harmony default export */ var parsers_DataSourceParser = (DataSourceParser_DataSourceParser);
// CONCATENATED MODULE: ../source/osh/datareceiver/parsers/SweJson.parser.js
var SweJson_parser_SweJsonParser=/*#__PURE__*/function(_DataSourceParser){_inheritsLoose(SweJsonParser,_DataSourceParser);function SweJsonParser(){return _DataSourceParser.apply(this,arguments)||this;}var _proto=SweJsonParser.prototype;/**
     * Extracts timestamp from the message. The timestamp corresponds to the 'time' attribute of the JSON object.
     * @param {String} data - the data to parse
     * @return {Number} the extracted timestamp
     */_proto.parseTimeStamp=function parseTimeStamp(data){var rec=String.fromCharCode.apply(null,new Uint8Array(data));return new Date(JSON.parse(rec)['time']).getTime();}/**
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
     */;_proto.parseData=function parseData(data){var rec=JSON.parse(String.fromCharCode.apply(null,new Uint8Array(data)));var result={};for(var key in rec){if(key!=='time'){result[key]=rec[key];}}return result;};_proto.buildUrl=function buildUrl(properties){return _DataSourceParser.prototype.buildUrl.call(this,Object.assign({},properties,{responseFormat:'application/json'}));};return SweJsonParser;}(parsers_DataSourceParser);/* harmony default export */ var SweJson_parser = (SweJson_parser_SweJsonParser);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(0);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// CONCATENATED MODULE: ../source/osh/dataconnector/Status.js
/**
 * Enum for connection status.
 * @readonly
 * @enum {{name: string}}
 */var Status={CONNECTED:"connected",DISCONNECTED:"disconnected"};
// CONCATENATED MODULE: ../source/osh/dataconnector/DataConnector.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************//**
 * The DataConnector is the abstract class used to create different connectors.
 */var DataConnector_DataConnector=/*#__PURE__*/function(){/**
     * @param {String} url - The full url used to connect to the data stream
     */function DataConnector(url){this.url=url;this.id="DataConnector-"+randomUUID();this.reconnectTimeout=1000*60*2;//2 min
this.status=Status.DISCONNECTED;this.reconnectionInterval=-1;}var _proto=DataConnector.prototype;_proto.checkAndClearReconnection=function checkAndClearReconnection(){if(this.reconnectionInterval!==-1){clearInterval(this.reconnectionInterval);this.reconnectionInterval=-1;}};_proto.disconnect=function disconnect(){this.checkStatus(Status.DISCONNECTED);this.checkAndClearReconnection();}/**
     * Sets the url
     * @param url
     */;_proto.setUrl=function setUrl(url){this.url=url;}/**
     * The data connector default id.
     * @return {String}
     */;_proto.getId=function getId(){return this.id;}/**
     * The stream url.
     * @return {String}
     */;_proto.getUrl=function getUrl(){return this.url;}/**
     * Sets the reconnection timeout
     * @param {Number} timeout - delay in milliseconds before reconnecting dataSource
     */;_proto.setReconnectTimeout=function setReconnectTimeout(timeout){this.reconnectTimeout=timeout;};_proto.onReconnect=function onReconnect(){return true;};_proto.connect=function connect(){};_proto.forceReconnect=function forceReconnect(){this.disconnect();this.connect();}/**
     * Called when the connection STATUS changes
     * @param {Status} status - the new status
     */;_proto.onChangeStatus=function onChangeStatus(status){}/**
     * Check a change of the status and call the corresponding callbacks if necessary
     * @param {Status} status - the currentStatus
     */;_proto.checkStatus=function checkStatus(status){if(status!==this.status){this.onChangeStatus(status);this.status=status;}}/**
     * Called when the connector has been disconnected
     */;_proto.onDisconnect=function onDisconnect(){}/**
     * Called when the connector has been connected
     */;_proto.onConnect=function onConnect(){};return DataConnector;}();/* harmony default export */ var dataconnector_DataConnector = (DataConnector_DataConnector);
// CONCATENATED MODULE: ../source/osh/dataconnector/WebSocketConnector.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************//**
 * Defines the WebSocketConnector to connect to a remote server by creating a WebSocket channel.
 * @extends DataConnector
 * @example
 * import WebSocketConnector from 'osh/dataconnector/WebSocketConnector.js';
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
 */var WebSocketConnector_WebSocketConnector=/*#__PURE__*/function(_DataConnector){_inheritsLoose(WebSocketConnector,_DataConnector);/**
     *
     * @param properties -
     */function WebSocketConnector(properties){var _this;_this=_DataConnector.call(this,properties)||this;_this.interval=-1;_this.lastReceiveTime=0;return _this;}/**
     * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
     * the main thread.
     */var _proto=WebSocketConnector.prototype;_proto.connect=/*#__PURE__*/function(){var _connect=_asyncToGenerator(/*#__PURE__*/regenerator_default.a.mark(function _callee(){var _this2=this;return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!this.init){this.closed=false;this.init=true;//creates Web Socket
this.ws=new WebSocket(this.getUrl());this.ws.binaryType='arraybuffer';this.ws.onmessage=function(event){this.checkAndClearReconnection();this.checkStatus(Status.CONNECTED);this.lastReceiveTime=Date.now();//callback data on message received
if(event.data.byteLength>0){this.onMessage(event.data);}}.bind(this);// closes socket if any errors occur
this.ws.onerror=function(event){console.error('WebSocket stream error');this.checkStatus(Status.DISCONNECTED);this.init=false;this.lastReceiveTime=-1;this.createReconnection();}.bind(this);this.ws.onclose=function(event){_this2.checkStatus(Status.DISCONNECTED);console.warn('WebSocket stream closed: ',event.reason,event.code);_this2.init=false;if(event.code!==1000&&!_this2.closed){_this2.createReconnection();}};}case 1:case"end":return _context.stop();}}},_callee,this);}));function connect(){return _connect.apply(this,arguments);}return connect;}();_proto.createReconnection=function createReconnection(){if(this.reconnectionInterval===-1){this.onReconnect();this.reconnectionInterval=setInterval(function(){var delta=Date.now()-this.lastReceiveTime;// -1 means the WS went in error
if(this.lastReceiveTime===-1||delta>=this.reconnectTimeout){console.warn('trying to reconnect',this.url);this.connect();}}.bind(this),this.reconnectTimeout);}}/**
     * Disconnects and close the websocket.
     */;_proto.disconnect=function disconnect(){_DataConnector.prototype.disconnect.call(this);this.init=false;this.closed=true;if(this.ws!=null&&this.ws.readyState!==WebSocket.CLOSED){this.ws.close();}}/**
     * The onMessage method used by the websocket to callback the data
     * @param data the callback data
     * @event
     */;_proto.onMessage=function onMessage(data){};_proto.isConnected=function isConnected(){return this.ws!=null&&this.ws.readyState===WebSocket.OPEN;};return WebSocketConnector;}(dataconnector_DataConnector);/* harmony default export */ var dataconnector_WebSocketConnector = (WebSocketConnector_WebSocketConnector);
// CONCATENATED MODULE: ../source/osh/dataconnector/Ajax.js
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************//**
 * Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @extends DataConnector
 * @example
 * import Ajax from 'osh/dataconnector/Ajax.js';
 *
 * let request = ...;
 * let connector = new Ajax(url);
 *
 * // handle onSuccess
 * connector.onSuccess = function(event) {
 *  // does something
 * }
 *
 * connector.onError = function(event) {
 *  // does something
 * }
 *
 * // send request
 * connector.sendRequest(request);
 *
 */var Ajax_Ajax=/*#__PURE__*/function(_DataConnector){_inheritsLoose(Ajax,_DataConnector);/**
     * Creates Ajax.
     * @param {String} url -
     * @param {Object} properties -
     * @param {String} properties.method -
     * @param {String} properties.responseType -
     */function Ajax(url,properties){var _this;_this=_DataConnector.call(this,url)||this;_this.method="POST";_this.responseType="arraybuffer";if(isDefined(properties)){if(properties.method){_this.method=properties.method;}if(properties.responseType){_this.responseType=properties.responseType;}}return _this;}/**
     * Sends the request to the defined server.
     * @param {String} request - The Http request
     * @param {String} extraUrl - get query parameters
     */var _proto=Ajax.prototype;_proto.sendRequest=function sendRequest(request,extraUrl){var self=this;var xmlhttp=new XMLHttpRequest();xmlhttp.withCredentials=true;xmlhttp.timeout=60000;if(request===null){if(isDefined(extraUrl)){xmlhttp.open("GET",this.getUrl()+"?"+extraUrl,true);}else{xmlhttp.open("GET",this.getUrl(),true);}xmlhttp.responseType=this.responseType;xmlhttp.onload=function(oEvent){if(xmlhttp.response){self.onMessage(xmlhttp.response);}};xmlhttp.ontimeout=function(e){console.log("Timeout");};xmlhttp.send(null);}else{xmlhttp.open("POST",this.getUrl(),true);xmlhttp.setRequestHeader('Content-Type','text/xml');xmlhttp.send(request);xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState<4){// while waiting response from server
}else if(xmlhttp.readyState===4){// 4 = Response from server has been completely loaded.
if(xmlhttp.status===200&&xmlhttp.status<300){// http status between 200 to 299 are all successful
self.onSuccess(xmlhttp.responseText);}else{self.onError("");}}};}}/**
     * This is the callback method in case of getting error connection.
     * @param event The error details
     * @event
     */;_proto.onError=function onError(event){}/**
     * This is the callback method in case of getting success connection.
     * @param event
     * @event
     */;_proto.onSuccess=function onSuccess(event){}/**
     * Sends the request
     * @private
     */;_proto.connect=function connect(){this.sendRequest(null);};return Ajax;}(dataconnector_DataConnector);/* harmony default export */ var dataconnector_Ajax = (Ajax_Ajax);
// CONCATENATED MODULE: ../source/osh/dataconnector/TopicConnector.js
var TopicConnector_TopicConnector=/*#__PURE__*/function(_DataConnector){_inheritsLoose(TopicConnector,_DataConnector);/**
     *
     * @param properties -
     */function TopicConnector(properties){var _this;_this=_DataConnector.call(this,properties)||this;_this.lastReceiveTime=-1;_this.interval=-1;_this.broadcastChannel=null;return _this;}/**
     * Connect to the broadcastChannel.
     */var _proto=TopicConnector.prototype;_proto.connect=function connect(){var _this2=this;if(this.broadcastChannel===null){//creates broadcastChannel
this.broadcastChannel=new BroadcastChannel(this.getUrl());this.broadcastChannel.onmessage=function(event){_this2.lastReceiveTime=Date.now();//callback data on message received
_this2.onMessage(event.data.data);};// closes socket if any errors occur
this.broadcastChannel.onerror=function(event){console.error('BroadcastChannel stream error: '+event);_this2.broadcastChannel.close();_this2.init=false;_this2.lastReceiveTime=-1;};//init the reconnect handler
if(this.interval===-1){this.interval=setInterval(function(){var delta=Date.now()-this.lastReceiveTime;// -1 means the WS went in error
if(this.lastReceiveTime===-1||delta>=this.reconnectTimeout){console.warn("trying to reconnect after "+this.reconnectTimeout+" ..");this.reconnect();}}.bind(this),this.reconnectTimeout);}}}/**
     * Disconnects the websocket.
     */;_proto.disconnect=function disconnect(){this.fullDisconnect(true);}/**
     * Fully disconnect the websocket connection by sending a close message to the webWorker.
     * @param {Boolean} removeInterval  - force removing the interval
     */;_proto.fullDisconnect=function fullDisconnect(removeInterval){if(this.broadcastChannel!=null){this.broadcastChannel.close();this.broadcastChannel=null;}if(removeInterval){clearInterval(this.interval);}}/**
     * Try to reconnect if the connexion if closed
     */;_proto.reconnect=function reconnect(){this.onReconnect();if(this.init){this.fullDisconnect(false);}this.connect();}/**
     * The onMessage method used by the websocket to callback the data
     * @param data the callback data
     * @event
     */;_proto.onMessage=function onMessage(data){}/**
     * Closes the webSocket.
     */;_proto.close=function close(){this.disconnect();};return TopicConnector;}(dataconnector_DataConnector);/* harmony default export */ var dataconnector_TopicConnector = (TopicConnector_TopicConnector);
// CONCATENATED MODULE: ../source/osh/event/EventType.js
var EventType={DATA:'data',STATUS:'status'};
// CONCATENATED MODULE: ../source/osh/datareceiver/workers/DataSourceHandler.js
var DataSourceHandler_DataSourceHandler=/*#__PURE__*/function(){function DataSourceHandler(parser){this.parser=parser;this.connector=null;this.lastTimeStamp=null;this.lastStartTime='now';this.timeShift=0;this.reconnectTimeout=1000*10;// 10 secs
this.values=[];}var _proto=DataSourceHandler.prototype;_proto.createConnector=function createConnector(propertiesStr,topic,dataSourceId){this.dataSourceId=dataSourceId;// check for existing connector
if(this.connector!==null){this.connector.disconnect();this.connector=null;}this.broadcastChannel=new BroadcastChannel(topic);var properties=JSON.parse(propertiesStr);if(isDefined(properties.fetch)){this.fetch=properties.fetch;}if(isDefined(properties.timeShift)){this.timeShift=properties.timeShift;}if(isDefined(properties.bufferingTime)){this.bufferingTime=properties.bufferingTime;}if(isDefined(properties.timeOut)){this.timeOut=properties.timeOut;}if(isDefined(properties.reconnectTimeout)){this.reconnectTimeout=properties.reconnectTimeout;}if(properties.startTime==='now'){this.batchSize=1;}else{if(isDefined(properties.replaySpeed)){if(!isDefined(properties.batchSize)){this.batchSize=1;}}if(isDefined(properties.batchSize)){this.batchSize=properties.batchSize;}}this.properties=properties;this.createDataConnector(this.properties);}/**
     * @private
     */;_proto.createDataConnector=function createDataConnector(properties){var _this=this;var url=this.parser.buildUrl(Object.assign({},properties,{timeShift:this.timeShift}));// checks if type is WebSocketConnector
if(properties.protocol.startsWith('ws')){this.connector=new dataconnector_WebSocketConnector(url);// connects the callback
this.connector.onMessage=this.onMessage.bind(this);// set the reconnectTimeout
this.connector.setReconnectTimeout(this.reconnectTimeout);}else if(properties.protocol.startsWith('http')){this.connector=new dataconnector_Ajax(url);this.connector.responseType='arraybuffer';// connects the callback
this.connector.onMessage=this.onMessage.bind(this);// set the reconnectTimeout
this.connector.setReconnectTimeout(this.reconnectTimeout);}else if(properties.protocol.startsWith('topic')){this.connector=new dataconnector_TopicConnector(url);// connects the callback
this.connector.onMessage=this.onMessage.bind(this);// set the reconnectTimeout
this.connector.setReconnectTimeout(this.reconnectTimeout);}var lastStartTimeCst=this.parser.lastStartTime;var lastProperties=properties;if(this.connector!==null){// bind change connection STATUS
this.connector.onChangeStatus=this.onChangeStatus.bind(this);this.connector.onReconnect=function(){// if not real time, preserve last timestamp to reconnect at the last time received
// for that, we update the URL with the new last time received
if(lastStartTimeCst!=='now'){_this.connector.setUrl(_this.parser.buildUrl(Object.assign({},properties,{lastTimeStamp:new Date(_this.lastTimeStamp).toISOString()})));}return true;};}}/**
     * Sets the current topic to listen
     * @param {String} topic - the topic to listen
     */;_proto.setTopic=function setTopic(topic){if(this.broadcastChannel!==null){this.broadcastChannel.close();}this.broadcastChannel=new BroadcastChannel(topic);this.topic=topic;};_proto.connect=function connect(){if(this.connector!==null){this.connector.connect();}};_proto.disconnect=function disconnect(){if(this.connector!==null){this.connector.disconnect();}this.connector=null;};_proto.onMessage=function onMessage(event){var timeStamp=this.parser.parseTimeStamp(event)+this.timeShift;var data=this.parser.parseData(event);this.values.push({data:data,timeStamp:timeStamp});this.lastTimeStamp=timeStamp;if(isDefined(this.batchSize)&&this.values.length>=this.batchSize){this.flush();}}/**
     * Send a change status event into the broadcast channel
     * @param {Status} status - the new status
     */;_proto.onChangeStatus=function onChangeStatus(status){if(status===Status.DISCONNECTED){this.flush();}this.broadcastChannel.postMessage({type:EventType.STATUS,status:status,dataSourceId:this.dataSourceId});};_proto.getLastTimeStamp=function getLastTimeStamp(){return this.lastTimeStamp;};_proto.updateUrl=function updateUrl(properties){this.disconnect();var lastTimestamp=new Date(this.lastTimeStamp).toISOString();if(properties.hasOwnProperty('startTime')){lastTimestamp=properties.startTime;}else if(this.properties.startTime==='now'){//handle RealTime
lastTimestamp='now';}this.createDataConnector(Object.assign({},this.properties,properties,{lastTimeStamp:lastTimestamp}));this.connect();};_proto.flush=function flush(){this.broadcastChannel.postMessage({dataSourceId:this.dataSourceId,type:EventType.DATA,values:this.values.splice(0,this.values.length)});};_proto.handleMessage=function handleMessage(message,worker){if(message.message==='init'){this.createConnector(message.properties,message.topic,message.id);}else if(message.message==='connect'){this.connect();}else if(message.message==='disconnect'){this.disconnect();}else if(message.message==='topic'){this.setTopic(message.topic);}else if(message.message==='last-timestamp'){var lastTimeStamp=this.getLastTimeStamp();worker.postMessage({message:'last-timestamp',data:lastTimeStamp});}else if(message.message==='update-url'){this.updateUrl(message.data);}else if(message.message==='is-connected'){worker.postMessage({message:'is-connected',data:this.connector===null?false:this.connector.isConnected()});}};return DataSourceHandler;}();/* harmony default export */ var workers_DataSourceHandler = (DataSourceHandler_DataSourceHandler);
// CONCATENATED MODULE: ../source/osh/datareceiver/workers/SweJson.worker.js



const dataSourceHandler = new workers_DataSourceHandler(new SweJson_parser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}




/***/ })
/******/ ]);