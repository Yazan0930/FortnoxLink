import {
  invariant
} from "./chunk-KDZ7CXOI.js";
import {
  require_jsx_runtime
} from "./chunk-T6PWRRVS.js";
import {
  require_react_dom
} from "./chunk-CCMZAS57.js";
import {
  require_react
} from "./chunk-E55NSNTN.js";
import {
  __commonJS,
  __toESM
} from "./chunk-4MBMRILA.js";

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    (function() {
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      function useSyncExternalStore$2(subscribe2, getSnapshot) {
        didWarnOld18Alpha || void 0 === React16.startTransition || (didWarnOld18Alpha = true, console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
          var cachedValue = getSnapshot();
          objectIs(value, cachedValue) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        }
        cachedValue = useState5({
          inst: { value, getSnapshot }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect5(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe2, value, getSnapshot]
        );
        useEffect6(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe2(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe2]
        );
        useDebugValue(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe2, getSnapshot) {
        return getSnapshot();
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React16 = require_react(), objectIs = "function" === typeof Object.is ? Object.is : is, useState5 = React16.useState, useEffect6 = React16.useEffect, useLayoutEffect5 = React16.useLayoutEffect, useDebugValue = React16.useDebugValue, didWarnOld18Alpha = false, didWarnUncachedGetSnapshot = false, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
      exports.useSyncExternalStore = void 0 !== React16.useSyncExternalStore ? React16.useSyncExternalStore : shim;
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    (function() {
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React16 = require_react(), shim = require_shim(), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore2 = shim.useSyncExternalStore, useRef5 = React16.useRef, useEffect6 = React16.useEffect, useMemo3 = React16.useMemo, useDebugValue = React16.useDebugValue;
      exports.useSyncExternalStoreWithSelector = function(subscribe2, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef5(null);
        if (null === instRef.current) {
          var inst = { hasValue: false, value: null };
          instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo3(
          function() {
            function memoizedSelector(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                nextSnapshot = selector(nextSnapshot);
                if (void 0 !== isEqual && inst.hasValue) {
                  var currentSelection = inst.value;
                  if (isEqual(currentSelection, nextSnapshot))
                    return memoizedSelection = currentSelection;
                }
                return memoizedSelection = nextSnapshot;
              }
              currentSelection = memoizedSelection;
              if (objectIs(memoizedSnapshot, nextSnapshot))
                return currentSelection;
              var nextSelection = selector(nextSnapshot);
              if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
                return memoizedSnapshot = nextSnapshot, currentSelection;
              memoizedSnapshot = nextSnapshot;
              return memoizedSelection = nextSelection;
            }
            var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
              function() {
                return memoizedSelector(getSnapshot());
              },
              null === maybeGetServerSnapshot ? void 0 : function() {
                return memoizedSelector(maybeGetServerSnapshot());
              }
            ];
          },
          [getSnapshot, getServerSnapshot, selector, isEqual]
        );
        var value = useSyncExternalStore2(subscribe2, instRef[0], instRef[1]);
        useEffect6(
          function() {
            inst.hasValue = true;
            inst.value = value;
          },
          [value]
        );
        useDebugValue(value);
        return value;
      };
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// node_modules/jsesc/jsesc.js
var require_jsesc = __commonJS({
  "node_modules/jsesc/jsesc.js"(exports, module) {
    "use strict";
    var object = {};
    var hasOwnProperty = object.hasOwnProperty;
    var forOwn = (object2, callback) => {
      for (const key in object2) {
        if (hasOwnProperty.call(object2, key)) {
          callback(key, object2[key]);
        }
      }
    };
    var extend = (destination, source) => {
      if (!source) {
        return destination;
      }
      forOwn(source, (key, value) => {
        destination[key] = value;
      });
      return destination;
    };
    var forEach = (array, callback) => {
      const length = array.length;
      let index = -1;
      while (++index < length) {
        callback(array[index]);
      }
    };
    var fourHexEscape = (hex) => {
      return "\\u" + ("0000" + hex).slice(-4);
    };
    var hexadecimal = (code, lowercase) => {
      let hexadecimal2 = code.toString(16);
      if (lowercase) return hexadecimal2;
      return hexadecimal2.toUpperCase();
    };
    var toString = object.toString;
    var isArray = Array.isArray;
    var isBuffer = (value) => {
      return typeof Buffer === "function" && Buffer.isBuffer(value);
    };
    var isObject = (value) => {
      return toString.call(value) == "[object Object]";
    };
    var isString = (value) => {
      return typeof value == "string" || toString.call(value) == "[object String]";
    };
    var isNumber = (value) => {
      return typeof value == "number" || toString.call(value) == "[object Number]";
    };
    var isBigInt = (value) => {
      return typeof value == "bigint";
    };
    var isFunction2 = (value) => {
      return typeof value == "function";
    };
    var isMap = (value) => {
      return toString.call(value) == "[object Map]";
    };
    var isSet = (value) => {
      return toString.call(value) == "[object Set]";
    };
    var singleEscapes = {
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t"
      // `\v` is omitted intentionally, because in IE < 9, '\v' == 'v'.
      // '\v': '\\x0B'
    };
    var regexSingleEscape = /[\\\b\f\n\r\t]/;
    var regexDigit = /[0-9]/;
    var regexWhitespace = /[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
    var escapeEverythingRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g;
    var escapeNonAsciiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^ !#-&\(-\[\]-_a-~]/g;
    var jsesc2 = (argument, options) => {
      const increaseIndentation = () => {
        oldIndent = indent;
        ++options.indentLevel;
        indent = options.indent.repeat(options.indentLevel);
      };
      const defaults = {
        "escapeEverything": false,
        "minimal": false,
        "isScriptContext": false,
        "quotes": "single",
        "wrap": false,
        "es6": false,
        "json": false,
        "compact": true,
        "lowercaseHex": false,
        "numbers": "decimal",
        "indent": "	",
        "indentLevel": 0,
        "__inline1__": false,
        "__inline2__": false
      };
      const json = options && options.json;
      if (json) {
        defaults.quotes = "double";
        defaults.wrap = true;
      }
      options = extend(defaults, options);
      if (options.quotes != "single" && options.quotes != "double" && options.quotes != "backtick") {
        options.quotes = "single";
      }
      const quote = options.quotes == "double" ? '"' : options.quotes == "backtick" ? "`" : "'";
      const compact = options.compact;
      const lowercaseHex = options.lowercaseHex;
      let indent = options.indent.repeat(options.indentLevel);
      let oldIndent = "";
      const inline1 = options.__inline1__;
      const inline2 = options.__inline2__;
      const newLine = compact ? "" : "\n";
      let result;
      let isEmpty = true;
      const useBinNumbers = options.numbers == "binary";
      const useOctNumbers = options.numbers == "octal";
      const useDecNumbers = options.numbers == "decimal";
      const useHexNumbers = options.numbers == "hexadecimal";
      if (json && argument && isFunction2(argument.toJSON)) {
        argument = argument.toJSON();
      }
      if (!isString(argument)) {
        if (isMap(argument)) {
          if (argument.size == 0) {
            return "new Map()";
          }
          if (!compact) {
            options.__inline1__ = true;
            options.__inline2__ = false;
          }
          return "new Map(" + jsesc2(Array.from(argument), options) + ")";
        }
        if (isSet(argument)) {
          if (argument.size == 0) {
            return "new Set()";
          }
          return "new Set(" + jsesc2(Array.from(argument), options) + ")";
        }
        if (isBuffer(argument)) {
          if (argument.length == 0) {
            return "Buffer.from([])";
          }
          return "Buffer.from(" + jsesc2(Array.from(argument), options) + ")";
        }
        if (isArray(argument)) {
          result = [];
          options.wrap = true;
          if (inline1) {
            options.__inline1__ = false;
            options.__inline2__ = true;
          }
          if (!inline2) {
            increaseIndentation();
          }
          forEach(argument, (value) => {
            isEmpty = false;
            if (inline2) {
              options.__inline2__ = false;
            }
            result.push(
              (compact || inline2 ? "" : indent) + jsesc2(value, options)
            );
          });
          if (isEmpty) {
            return "[]";
          }
          if (inline2) {
            return "[" + result.join(", ") + "]";
          }
          return "[" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "]";
        } else if (isNumber(argument) || isBigInt(argument)) {
          if (json) {
            return JSON.stringify(Number(argument));
          }
          let result2;
          if (useDecNumbers) {
            result2 = String(argument);
          } else if (useHexNumbers) {
            let hexadecimal2 = argument.toString(16);
            if (!lowercaseHex) {
              hexadecimal2 = hexadecimal2.toUpperCase();
            }
            result2 = "0x" + hexadecimal2;
          } else if (useBinNumbers) {
            result2 = "0b" + argument.toString(2);
          } else if (useOctNumbers) {
            result2 = "0o" + argument.toString(8);
          }
          if (isBigInt(argument)) {
            return result2 + "n";
          }
          return result2;
        } else if (isBigInt(argument)) {
          if (json) {
            return JSON.stringify(Number(argument));
          }
          return argument + "n";
        } else if (!isObject(argument)) {
          if (json) {
            return JSON.stringify(argument) || "null";
          }
          return String(argument);
        } else {
          result = [];
          options.wrap = true;
          increaseIndentation();
          forOwn(argument, (key, value) => {
            isEmpty = false;
            result.push(
              (compact ? "" : indent) + jsesc2(key, options) + ":" + (compact ? "" : " ") + jsesc2(value, options)
            );
          });
          if (isEmpty) {
            return "{}";
          }
          return "{" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "}";
        }
      }
      const regex = options.escapeEverything ? escapeEverythingRegex : escapeNonAsciiRegex;
      result = argument.replace(regex, (char, pair, lone, quoteChar, index, string) => {
        if (pair) {
          if (options.minimal) return pair;
          const first = pair.charCodeAt(0);
          const second = pair.charCodeAt(1);
          if (options.es6) {
            const codePoint = (first - 55296) * 1024 + second - 56320 + 65536;
            const hex2 = hexadecimal(codePoint, lowercaseHex);
            return "\\u{" + hex2 + "}";
          }
          return fourHexEscape(hexadecimal(first, lowercaseHex)) + fourHexEscape(hexadecimal(second, lowercaseHex));
        }
        if (lone) {
          return fourHexEscape(hexadecimal(lone.charCodeAt(0), lowercaseHex));
        }
        if (char == "\0" && !json && !regexDigit.test(string.charAt(index + 1))) {
          return "\\0";
        }
        if (quoteChar) {
          if (quoteChar == quote || options.escapeEverything) {
            return "\\" + quoteChar;
          }
          return quoteChar;
        }
        if (regexSingleEscape.test(char)) {
          return singleEscapes[char];
        }
        if (options.minimal && !regexWhitespace.test(char)) {
          return char;
        }
        const hex = hexadecimal(char.charCodeAt(0), lowercaseHex);
        if (json || hex.length > 2) {
          return fourHexEscape(hex);
        }
        return "\\x" + ("00" + hex).slice(-2);
      });
      if (quote == "`") {
        result = result.replace(/\$\{/g, "\\${");
      }
      if (options.isScriptContext) {
        result = result.replace(/<\/(script|style)/gi, "<\\/$1").replace(/<!--/g, json ? "\\u003C!--" : "\\x3C!--");
      }
      if (options.wrap) {
        result = quote + result + quote;
      }
      return result;
    };
    jsesc2.version = "3.0.2";
    module.exports = jsesc2;
  }
});

// node_modules/@tanstack/history/dist/esm/index.js
var popStateEvent = "popstate";
var beforeUnloadEvent = "beforeunload";
function createHistory(opts) {
  let location = opts.getLocation();
  const subscribers = /* @__PURE__ */ new Set();
  const notify = (action) => {
    location = opts.getLocation();
    subscribers.forEach((subscriber) => subscriber({ location, action }));
  };
  const _notifyRollback = () => {
    location = opts.getLocation();
    subscribers.forEach(
      (subscriber) => subscriber({ location, action: { type: "ROLLBACK" } })
    );
  };
  const tryNavigation = async ({
    task,
    navigateOpts,
    ...actionInfo
  }) => {
    var _a, _b;
    const ignoreBlocker = (navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false;
    if (ignoreBlocker) {
      task();
      return;
    }
    const blockers = ((_a = opts.getBlockers) == null ? void 0 : _a.call(opts)) ?? [];
    const isPushOrReplace = actionInfo.type === "PUSH" || actionInfo.type === "REPLACE";
    if (typeof document !== "undefined" && blockers.length && isPushOrReplace) {
      for (const blocker of blockers) {
        const nextLocation = parseHref(actionInfo.path, actionInfo.state);
        const isBlocked = await blocker.blockerFn({
          currentLocation: location,
          nextLocation,
          action: actionInfo.type
        });
        if (isBlocked) {
          (_b = opts.onBlocked) == null ? void 0 : _b.call(opts, _notifyRollback);
          return;
        }
      }
    }
    task();
  };
  return {
    get location() {
      return location;
    },
    get length() {
      return opts.getLength();
    },
    subscribers,
    subscribe: (cb) => {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    push: (path, state, navigateOpts) => {
      state = assignKey(state);
      tryNavigation({
        task: () => {
          opts.pushState(path, state);
          notify({ type: "PUSH" });
        },
        navigateOpts,
        type: "PUSH",
        path,
        state
      });
    },
    replace: (path, state, navigateOpts) => {
      state = assignKey(state);
      tryNavigation({
        task: () => {
          opts.replaceState(path, state);
          notify({ type: "REPLACE" });
        },
        navigateOpts,
        type: "REPLACE",
        path,
        state
      });
    },
    go: (index, navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.go(index);
          notify({ type: "GO", index });
        },
        navigateOpts,
        type: "GO"
      });
    },
    back: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.back((navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false);
          notify({ type: "BACK" });
        },
        navigateOpts,
        type: "BACK"
      });
    },
    forward: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.forward((navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false);
          notify({ type: "FORWARD" });
        },
        navigateOpts,
        type: "FORWARD"
      });
    },
    createHref: (str) => opts.createHref(str),
    block: (blocker) => {
      var _a;
      if (!opts.setBlockers) return () => {
      };
      const blockers = ((_a = opts.getBlockers) == null ? void 0 : _a.call(opts)) ?? [];
      opts.setBlockers([...blockers, blocker]);
      return () => {
        var _a2, _b;
        const blockers2 = ((_a2 = opts.getBlockers) == null ? void 0 : _a2.call(opts)) ?? [];
        (_b = opts.setBlockers) == null ? void 0 : _b.call(opts, blockers2.filter((b) => b !== blocker));
      };
    },
    flush: () => {
      var _a;
      return (_a = opts.flush) == null ? void 0 : _a.call(opts);
    },
    destroy: () => {
      var _a;
      return (_a = opts.destroy) == null ? void 0 : _a.call(opts);
    },
    notify
  };
}
function assignKey(state) {
  if (!state) {
    state = {};
  }
  return {
    ...state,
    key: createRandomKey()
  };
}
function createBrowserHistory(opts) {
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  const originalPushState = win.history.pushState;
  const originalReplaceState = win.history.replaceState;
  let blockers = [];
  const _getBlockers = () => blockers;
  const _setBlockers = (newBlockers) => blockers = newBlockers;
  const createHref = (opts == null ? void 0 : opts.createHref) ?? ((path) => path);
  const parseLocation = (opts == null ? void 0 : opts.parseLocation) ?? (() => parseHref(
    `${win.location.pathname}${win.location.search}${win.location.hash}`,
    win.history.state
  ));
  let currentLocation = parseLocation();
  let rollbackLocation;
  let ignoreNextPop = false;
  let skipBlockerNextPop = false;
  let ignoreNextBeforeUnload = false;
  const getLocation = () => currentLocation;
  let next;
  let scheduled;
  const flush = () => {
    if (!next) {
      return;
    }
    history._ignoreSubscribers = true;
    (next.isPush ? win.history.pushState : win.history.replaceState)(
      next.state,
      "",
      next.href
    );
    history._ignoreSubscribers = false;
    next = void 0;
    scheduled = void 0;
    rollbackLocation = void 0;
  };
  const queueHistoryAction = (type, destHref, state) => {
    const href = createHref(destHref);
    if (!scheduled) {
      rollbackLocation = currentLocation;
    }
    currentLocation = parseHref(destHref, state);
    next = {
      href,
      state,
      isPush: (next == null ? void 0 : next.isPush) || type === "push"
    };
    if (!scheduled) {
      scheduled = Promise.resolve().then(() => flush());
    }
  };
  const onPushPop = () => {
    currentLocation = parseLocation();
    history.notify({ type: "POP" });
  };
  const onPushPopEvent = async () => {
    if (ignoreNextPop) {
      ignoreNextPop = false;
      return;
    }
    if (skipBlockerNextPop) {
      skipBlockerNextPop = false;
    } else {
      const blockers2 = _getBlockers();
      if (typeof document !== "undefined" && blockers2.length) {
        for (const blocker of blockers2) {
          const nextLocation = parseLocation();
          const isBlocked = await blocker.blockerFn({
            currentLocation,
            nextLocation,
            action: "POP"
          });
          if (isBlocked) {
            ignoreNextPop = true;
            win.history.go(1);
            history.notify({ type: "POP" });
            return;
          }
        }
      }
    }
    currentLocation = parseLocation();
    history.notify({ type: "POP" });
  };
  const onBeforeUnload = (e) => {
    if (ignoreNextBeforeUnload) {
      ignoreNextBeforeUnload = false;
      return;
    }
    let shouldBlock = false;
    const blockers2 = _getBlockers();
    if (typeof document !== "undefined" && blockers2.length) {
      for (const blocker of blockers2) {
        const shouldHaveBeforeUnload = blocker.enableBeforeUnload ?? true;
        if (shouldHaveBeforeUnload === true) {
          shouldBlock = true;
          break;
        }
        if (typeof shouldHaveBeforeUnload === "function" && shouldHaveBeforeUnload() === true) {
          shouldBlock = true;
          break;
        }
      }
    }
    if (shouldBlock) {
      e.preventDefault();
      return e.returnValue = "";
    }
    return;
  };
  const history = createHistory({
    getLocation,
    getLength: () => win.history.length,
    pushState: (href, state) => queueHistoryAction("push", href, state),
    replaceState: (href, state) => queueHistoryAction("replace", href, state),
    back: (ignoreBlocker) => {
      if (ignoreBlocker) skipBlockerNextPop = true;
      ignoreNextBeforeUnload = true;
      return win.history.back();
    },
    forward: (ignoreBlocker) => {
      if (ignoreBlocker) skipBlockerNextPop = true;
      ignoreNextBeforeUnload = true;
      win.history.forward();
    },
    go: (n) => win.history.go(n),
    createHref: (href) => createHref(href),
    flush,
    destroy: () => {
      win.history.pushState = originalPushState;
      win.history.replaceState = originalReplaceState;
      win.removeEventListener(beforeUnloadEvent, onBeforeUnload, {
        capture: true
      });
      win.removeEventListener(popStateEvent, onPushPopEvent);
    },
    onBlocked: (onUpdate) => {
      if (rollbackLocation && currentLocation !== rollbackLocation) {
        currentLocation = rollbackLocation;
        onUpdate();
      }
    },
    getBlockers: _getBlockers,
    setBlockers: _setBlockers
  });
  win.addEventListener(beforeUnloadEvent, onBeforeUnload, { capture: true });
  win.addEventListener(popStateEvent, onPushPopEvent);
  win.history.pushState = function(...args) {
    const res = originalPushState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop();
    return res;
  };
  win.history.replaceState = function(...args) {
    const res = originalReplaceState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop();
    return res;
  };
  return history;
}
function createHashHistory(opts) {
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  return createBrowserHistory({
    window: win,
    parseLocation: () => {
      const hashHref = win.location.hash.split("#").slice(1).join("#") ?? "/";
      return parseHref(hashHref, win.history.state);
    },
    createHref: (href) => `${win.location.pathname}${win.location.search}#${href}`
  });
}
function createMemoryHistory(opts = {
  initialEntries: ["/"]
}) {
  const entries = opts.initialEntries;
  let index = opts.initialIndex ?? entries.length - 1;
  const states = entries.map(() => ({}));
  const getLocation = () => parseHref(entries[index], states[index]);
  return createHistory({
    getLocation,
    getLength: () => entries.length,
    pushState: (path, state) => {
      if (index < entries.length - 1) {
        entries.splice(index + 1);
        states.splice(index + 1);
      }
      states.push(state);
      entries.push(path);
      index = Math.max(entries.length - 1, 0);
    },
    replaceState: (path, state) => {
      states[index] = state;
      entries[index] = path;
    },
    back: () => {
      index = Math.max(index - 1, 0);
    },
    forward: () => {
      index = Math.min(index + 1, entries.length - 1);
    },
    go: (n) => {
      index = Math.min(Math.max(index + n, 0), entries.length - 1);
    },
    createHref: (path) => path
  });
}
function parseHref(href, state) {
  const hashIndex = href.indexOf("#");
  const searchIndex = href.indexOf("?");
  return {
    href,
    pathname: href.substring(
      0,
      hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : href.length
    ),
    hash: hashIndex > -1 ? href.substring(hashIndex) : "",
    search: searchIndex > -1 ? href.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
    state: state || {}
  };
}
function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}

// node_modules/tiny-warning/dist/tiny-warning.esm.js
var isProduction = false;
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }
    var text = "Warning: " + message;
    if (typeof console !== "undefined") {
      console.warn(text);
    }
    try {
      throw Error(text);
    } catch (x) {
    }
  }
}
var tiny_warning_esm_default = warning;

// node_modules/@tanstack/react-router/dist/esm/awaited.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var React5 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-router/dist/esm/useRouter.js
var React2 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-router/dist/esm/routerContext.js
var React = __toESM(require_react(), 1);
var routerContext = React.createContext(null);
function getRouterContext() {
  if (typeof document === "undefined") {
    return routerContext;
  }
  if (window.__TSR_ROUTER_CONTEXT__) {
    return window.__TSR_ROUTER_CONTEXT__;
  }
  window.__TSR_ROUTER_CONTEXT__ = routerContext;
  return routerContext;
}

// node_modules/@tanstack/react-router/dist/esm/useRouter.js
function useRouter(opts) {
  const value = React2.useContext(getRouterContext());
  tiny_warning_esm_default(
    !(((opts == null ? void 0 : opts.warn) ?? true) && !value),
    "useRouter must be used inside a <RouterProvider> component!"
  );
  return value;
}

// node_modules/@tanstack/react-store/dist/esm/index.js
var import_with_selector = __toESM(require_with_selector());

// node_modules/@tanstack/store/dist/esm/index.js
var Store = class {
  constructor(initialState, options) {
    this.listeners = /* @__PURE__ */ new Set();
    this._batching = false;
    this._flushing = 0;
    this.subscribe = (listener) => {
      var _a, _b;
      this.listeners.add(listener);
      const unsub = (_b = (_a = this.options) == null ? void 0 : _a.onSubscribe) == null ? void 0 : _b.call(_a, listener, this);
      return () => {
        this.listeners.delete(listener);
        unsub == null ? void 0 : unsub();
      };
    };
    this.setState = (updater) => {
      var _a, _b, _c;
      const previous = this.state;
      this.state = ((_a = this.options) == null ? void 0 : _a.updateFn) ? this.options.updateFn(previous)(updater) : updater(previous);
      (_c = (_b = this.options) == null ? void 0 : _b.onUpdate) == null ? void 0 : _c.call(_b);
      this._flush();
    };
    this._flush = () => {
      if (this._batching) return;
      const flushId = ++this._flushing;
      this.listeners.forEach((listener) => {
        if (this._flushing !== flushId) return;
        listener();
      });
    };
    this.batch = (cb) => {
      if (this._batching) return cb();
      this._batching = true;
      cb();
      this._batching = false;
      this._flush();
    };
    this.state = initialState;
    this.options = options;
  }
};

// node_modules/@tanstack/react-store/dist/esm/index.js
function useStore(store, selector = (d) => d) {
  const slice = (0, import_with_selector.useSyncExternalStoreWithSelector)(
    store.subscribe,
    () => store.state,
    () => store.state,
    selector,
    shallow
  );
  return slice;
}
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false;
    for (const [k, v] of objA) {
      if (!objB.has(k) || !Object.is(v, objB.get(k))) return false;
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false;
    for (const v of objA) {
      if (!objB.has(v)) return false;
    }
    return true;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

// node_modules/@tanstack/react-router/dist/esm/root.js
var rootRouteId = "__root__";

// node_modules/@tanstack/react-router/dist/esm/qss.js
function encode(obj, pfx) {
  let k, i, tmp, str = "";
  for (k in obj) {
    if ((tmp = obj[k]) !== void 0) {
      if (Array.isArray(tmp)) {
        for (i = 0; i < tmp.length; i++) {
          str && (str += "&");
          str += encodeURIComponent(k) + "=" + encodeURIComponent(tmp[i]);
        }
      } else {
        str && (str += "&");
        str += encodeURIComponent(k) + "=" + encodeURIComponent(tmp);
      }
    }
  }
  return (pfx || "") + str;
}
function toValue(mix) {
  if (!mix) return "";
  const str = decodeURIComponent(mix);
  if (str === "false") return false;
  if (str === "true") return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str, pfx) {
  let tmp, k;
  const out = {}, arr = (pfx ? str.substr(pfx.length) : str).split("&");
  while (tmp = arr.shift()) {
    const equalIndex = tmp.indexOf("=");
    if (equalIndex !== -1) {
      k = tmp.slice(0, equalIndex);
      k = decodeURIComponent(k);
      const value = tmp.slice(equalIndex + 1);
      if (out[k] !== void 0) {
        out[k] = [].concat(out[k], toValue(value));
      } else {
        out[k] = toValue(value);
      }
    } else {
      k = tmp;
      k = decodeURIComponent(k);
      out[k] = "";
    }
  }
  return out;
}

// node_modules/@tanstack/react-router/dist/esm/searchParams.js
var defaultParseSearch = parseSearchWith(JSON.parse);
var defaultStringifySearch = stringifySearchWith(
  JSON.stringify,
  JSON.parse
);
function parseSearchWith(parser) {
  return (searchStr) => {
    if (searchStr.substring(0, 1) === "?") {
      searchStr = searchStr.substring(1);
    }
    const query = decode(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") {
        try {
          query[key] = parser(value);
        } catch (err) {
        }
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  function stringifyValue(val) {
    if (typeof val === "object" && val !== null) {
      try {
        return stringify(val);
      } catch (err) {
      }
    } else if (typeof val === "string" && typeof parser === "function") {
      try {
        parser(val);
        return stringify(val);
      } catch (err) {
      }
    }
    return val;
  }
  return (search) => {
    search = { ...search };
    Object.keys(search).forEach((key) => {
      const val = search[key];
      if (typeof val === "undefined" || val === void 0) {
        delete search[key];
      } else {
        search[key] = stringifyValue(val);
      }
    });
    const searchStr = encode(search).toString();
    return searchStr ? `?${searchStr}` : "";
  };
}

// node_modules/@tanstack/react-router/dist/esm/utils.js
var React3 = __toESM(require_react(), 1);
function last(arr) {
  return arr[arr.length - 1];
}
function isFunction(d) {
  return typeof d === "function";
}
function functionalUpdate(updater, previous) {
  if (isFunction(updater)) {
    return updater(previous);
  }
  return updater;
}
function pick(parent, keys) {
  return keys.reduce((obj, key) => {
    obj[key] = parent[key];
    return obj;
  }, {});
}
function replaceEqualDeep(prev, _next) {
  if (prev === _next) {
    return prev;
  }
  const next = _next;
  const array = isPlainArray(prev) && isPlainArray(next);
  if (array || isPlainObject(prev) && isPlainObject(next)) {
    const prevItems = array ? prev : Object.keys(prev);
    const prevSize = prevItems.length;
    const nextItems = array ? next : Object.keys(next);
    const nextSize = nextItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < nextSize; i++) {
      const key = array ? i : nextItems[i];
      if ((!array && prevItems.includes(key) || array) && prev[key] === void 0 && next[key] === void 0) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(prev[key], next[key]);
        if (copy[key] === prev[key] && prev[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return prevSize === nextSize && equalItems === prevSize ? prev : copy;
  }
  return next;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function getObjectKeys(obj, ignoreUndefined) {
  let keys = Object.keys(obj);
  if (ignoreUndefined) {
    keys = keys.filter((key) => obj[key] !== void 0);
  }
  return keys;
}
function deepEqual(a, b, opts) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const ignoreUndefined = (opts == null ? void 0 : opts.ignoreUndefined) ?? true;
    const aKeys = getObjectKeys(a, ignoreUndefined);
    const bKeys = getObjectKeys(b, ignoreUndefined);
    if (!(opts == null ? void 0 : opts.partial) && aKeys.length !== bKeys.length) {
      return false;
    }
    return bKeys.every((key) => deepEqual(a[key], b[key], opts));
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return !a.some((item, index) => !deepEqual(item, b[index], opts));
  }
  return false;
}
function useStableCallback(fn) {
  const fnRef = React3.useRef(fn);
  fnRef.current = fn;
  const ref = React3.useRef((...args) => fnRef.current(...args));
  return ref.current;
}
function shallow2(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (const item of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, item) || !Object.is(objA[item], objB[item])) {
      return false;
    }
  }
  return true;
}
var useLayoutEffect2 = typeof window !== "undefined" ? React3.useLayoutEffect : React3.useEffect;
function escapeJSON(jsonString) {
  return jsonString.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
}
function createControlledPromise(onResolve) {
  let resolveLoadPromise;
  let rejectLoadPromise;
  const controlledPromise = new Promise((resolve, reject) => {
    resolveLoadPromise = resolve;
    rejectLoadPromise = reject;
  });
  controlledPromise.status = "pending";
  controlledPromise.resolve = (value) => {
    controlledPromise.status = "resolved";
    controlledPromise.value = value;
    resolveLoadPromise(value);
    onResolve == null ? void 0 : onResolve(value);
  };
  controlledPromise.reject = (e) => {
    controlledPromise.status = "rejected";
    rejectLoadPromise(e);
  };
  return controlledPromise;
}
function usePrevious(value) {
  const ref = React3.useRef({
    value,
    prev: null
  });
  const current = ref.current.value;
  if (value !== current) {
    ref.current = {
      value,
      prev: current
    };
  }
  return ref.current.prev;
}
function useIntersectionObserver(ref, callback, intersectionObserverOptions = {}, options = {}) {
  const isIntersectionObserverAvailable = React3.useRef(
    typeof IntersectionObserver === "function"
  );
  const observerRef = React3.useRef(null);
  React3.useEffect(() => {
    if (!ref.current || !isIntersectionObserverAvailable.current || options.disabled) {
      return;
    }
    observerRef.current = new IntersectionObserver(([entry]) => {
      callback(entry);
    }, intersectionObserverOptions);
    observerRef.current.observe(ref.current);
    return () => {
      var _a;
      (_a = observerRef.current) == null ? void 0 : _a.disconnect();
    };
  }, [callback, intersectionObserverOptions, options.disabled, ref]);
  return observerRef.current;
}
function useForwardedRef(ref) {
  const innerRef = React3.useRef(null);
  React3.useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });
  return innerRef;
}

// node_modules/@tanstack/react-router/dist/esm/path.js
function joinPaths(paths) {
  return cleanPath(
    paths.filter((val) => {
      return val !== void 0;
    }).join("/")
  );
}
function cleanPath(path) {
  return path.replace(/\/{2,}/g, "/");
}
function trimPathLeft(path) {
  return path === "/" ? path : path.replace(/^\/{1,}/, "");
}
function trimPathRight(path) {
  return path === "/" ? path : path.replace(/\/{1,}$/, "");
}
function trimPath(path) {
  return trimPathRight(trimPathLeft(path));
}
function removeTrailingSlash(value, basepath) {
  if (value.endsWith("/") && value !== "/" && value !== `${basepath}/`) {
    return value.slice(0, -1);
  }
  return value;
}
function exactPathTest(pathName1, pathName2, basepath) {
  return removeTrailingSlash(pathName1, basepath) === removeTrailingSlash(pathName2, basepath);
}
function resolvePath({
  basepath,
  base,
  to,
  trailingSlash = "never",
  caseSensitive
}) {
  var _a, _b;
  base = removeBasepath(basepath, base, caseSensitive);
  to = removeBasepath(basepath, to, caseSensitive);
  let baseSegments = parsePathname(base);
  const toSegments = parsePathname(to);
  if (baseSegments.length > 1 && ((_a = last(baseSegments)) == null ? void 0 : _a.value) === "/") {
    baseSegments.pop();
  }
  toSegments.forEach((toSegment, index) => {
    if (toSegment.value === "/") {
      if (!index) {
        baseSegments = [toSegment];
      } else if (index === toSegments.length - 1) {
        baseSegments.push(toSegment);
      } else ;
    } else if (toSegment.value === "..") {
      baseSegments.pop();
    } else if (toSegment.value === ".") ;
    else {
      baseSegments.push(toSegment);
    }
  });
  if (baseSegments.length > 1) {
    if (((_b = last(baseSegments)) == null ? void 0 : _b.value) === "/") {
      if (trailingSlash === "never") {
        baseSegments.pop();
      }
    } else if (trailingSlash === "always") {
      baseSegments.push({ type: "pathname", value: "/" });
    }
  }
  const joined = joinPaths([basepath, ...baseSegments.map((d) => d.value)]);
  return cleanPath(joined);
}
function parsePathname(pathname) {
  if (!pathname) {
    return [];
  }
  pathname = cleanPath(pathname);
  const segments = [];
  if (pathname.slice(0, 1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: "pathname",
      value: "/"
    });
  }
  if (!pathname) {
    return segments;
  }
  const split = pathname.split("/").filter(Boolean);
  segments.push(
    ...split.map((part) => {
      if (part === "$" || part === "*") {
        return {
          type: "wildcard",
          value: part
        };
      }
      if (part.charAt(0) === "$") {
        return {
          type: "param",
          value: part
        };
      }
      return {
        type: "pathname",
        value: decodeURI(part)
      };
    })
  );
  if (pathname.slice(-1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: "pathname",
      value: "/"
    });
  }
  return segments;
}
function interpolatePath({
  path,
  params,
  leaveWildcards,
  leaveParams,
  decodeCharMap
}) {
  const interpolatedPathSegments = parsePathname(path);
  const encodedParams = {};
  for (const [key, value] of Object.entries(params)) {
    const isValueString = typeof value === "string";
    if (["*", "_splat"].includes(key)) {
      encodedParams[key] = isValueString ? encodeURI(value) : value;
    } else {
      encodedParams[key] = isValueString ? encodePathParam(value, decodeCharMap) : value;
    }
  }
  return joinPaths(
    interpolatedPathSegments.map((segment) => {
      if (segment.type === "wildcard") {
        const value = encodedParams._splat;
        if (leaveWildcards) return `${segment.value}${value ?? ""}`;
        return value;
      }
      if (segment.type === "param") {
        if (leaveParams) {
          const value = encodedParams[segment.value];
          return `${segment.value}${value ?? ""}`;
        }
        return encodedParams[segment.value.substring(1)] ?? "undefined";
      }
      return segment.value;
    })
  );
}
function encodePathParam(value, decodeCharMap) {
  let encoded = encodeURIComponent(value);
  if (decodeCharMap) {
    for (const [encodedChar, char] of decodeCharMap) {
      encoded = encoded.replaceAll(encodedChar, char);
    }
  }
  return encoded;
}
function matchPathname(basepath, currentPathname, matchLocation) {
  const pathParams = matchByPath(basepath, currentPathname, matchLocation);
  if (matchLocation.to && !pathParams) {
    return;
  }
  return pathParams ?? {};
}
function removeBasepath(basepath, pathname, caseSensitive = false) {
  const normalizedBasepath = caseSensitive ? basepath : basepath.toLowerCase();
  const normalizedPathname = caseSensitive ? pathname : pathname.toLowerCase();
  switch (true) {
    // default behaviour is to serve app from the root - pathname
    // left untouched
    case normalizedBasepath === "/":
      return pathname;
    // shortcut for removing the basepath if it matches the pathname
    case normalizedPathname === normalizedBasepath:
      return "";
    // in case pathname is shorter than basepath - there is
    // nothing to remove
    case pathname.length < basepath.length:
      return pathname;
    // avoid matching partial segments - strict equality handled
    // earlier, otherwise, basepath separated from pathname with
    // separator, therefore lack of separator means partial
    // segment match (`/app` should not match `/application`)
    case normalizedPathname[normalizedBasepath.length] !== "/":
      return pathname;
    // remove the basepath from the pathname if it starts with it
    case normalizedPathname.startsWith(normalizedBasepath):
      return pathname.slice(basepath.length);
    // otherwise, return the pathname as is
    default:
      return pathname;
  }
}
function matchByPath(basepath, from, matchLocation) {
  if (basepath !== "/" && !from.startsWith(basepath)) {
    return void 0;
  }
  from = removeBasepath(basepath, from, matchLocation.caseSensitive);
  const to = removeBasepath(
    basepath,
    `${matchLocation.to ?? "$"}`,
    matchLocation.caseSensitive
  );
  const baseSegments = parsePathname(from);
  const routeSegments = parsePathname(to);
  if (!from.startsWith("/")) {
    baseSegments.unshift({
      type: "pathname",
      value: "/"
    });
  }
  if (!to.startsWith("/")) {
    routeSegments.unshift({
      type: "pathname",
      value: "/"
    });
  }
  const params = {};
  const isMatch2 = (() => {
    for (let i = 0; i < Math.max(baseSegments.length, routeSegments.length); i++) {
      const baseSegment = baseSegments[i];
      const routeSegment = routeSegments[i];
      const isLastBaseSegment = i >= baseSegments.length - 1;
      const isLastRouteSegment = i >= routeSegments.length - 1;
      if (routeSegment) {
        if (routeSegment.type === "wildcard") {
          const _splat = decodeURI(
            joinPaths(baseSegments.slice(i).map((d) => d.value))
          );
          params["*"] = _splat;
          params["_splat"] = _splat;
          return true;
        }
        if (routeSegment.type === "pathname") {
          if (routeSegment.value === "/" && !(baseSegment == null ? void 0 : baseSegment.value)) {
            return true;
          }
          if (baseSegment) {
            if (matchLocation.caseSensitive) {
              if (routeSegment.value !== baseSegment.value) {
                return false;
              }
            } else if (routeSegment.value.toLowerCase() !== baseSegment.value.toLowerCase()) {
              return false;
            }
          }
        }
        if (!baseSegment) {
          return false;
        }
        if (routeSegment.type === "param") {
          if (baseSegment.value === "/") {
            return false;
          }
          if (baseSegment.value.charAt(0) !== "$") {
            params[routeSegment.value.substring(1)] = decodeURIComponent(
              baseSegment.value
            );
          }
        }
      }
      if (!isLastBaseSegment && isLastRouteSegment) {
        params["**"] = joinPaths(baseSegments.slice(i + 1).map((d) => d.value));
        return !!matchLocation.fuzzy && (routeSegment == null ? void 0 : routeSegment.value) !== "/";
      }
    }
    return true;
  })();
  return isMatch2 ? params : void 0;
}

// node_modules/@tanstack/react-router/dist/esm/redirects.js
function redirect(opts) {
  opts.isRedirect = true;
  opts.statusCode = opts.statusCode || opts.code || 307;
  opts.headers = opts.headers || {};
  if (!opts.reloadDocument) {
    opts.reloadDocument = false;
    try {
      new URL(`${opts.href}`);
      opts.reloadDocument = true;
    } catch {
    }
  }
  if (opts.throw) {
    throw opts;
  }
  return opts;
}
function isRedirect(obj) {
  return !!(obj == null ? void 0 : obj.isRedirect);
}
function isResolvedRedirect(obj) {
  return !!(obj == null ? void 0 : obj.isRedirect) && obj.href;
}

// node_modules/@tanstack/react-router/dist/esm/not-found.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);

// node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var React4 = __toESM(require_react(), 1);
function CatchBoundary(props) {
  const errorComponent = props.errorComponent ?? ErrorComponent;
  return (0, import_jsx_runtime.jsx)(
    CatchBoundaryImpl,
    {
      getResetKey: props.getResetKey,
      onCatch: props.onCatch,
      children: ({ error, reset }) => {
        if (error) {
          return React4.createElement(errorComponent, {
            error,
            reset
          });
        }
        return props.children;
      }
    }
  );
}
var CatchBoundaryImpl = class extends React4.Component {
  constructor() {
    super(...arguments);
    this.state = { error: null };
  }
  static getDerivedStateFromProps(props) {
    return { resetKey: props.getResetKey() };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.error && prevState.resetKey !== this.state.resetKey) {
      this.reset();
    }
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onCatch) {
      this.props.onCatch(error, errorInfo);
    }
  }
  render() {
    return this.props.children({
      error: this.state.resetKey !== this.props.getResetKey() ? null : this.state.error,
      reset: () => {
        this.reset();
      }
    });
  }
};
function ErrorComponent({ error }) {
  const [show, setShow] = React4.useState(true);
  return (0, import_jsx_runtime.jsxs)("div", { style: { padding: ".5rem", maxWidth: "100%" }, children: [
    (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: ".5rem" }, children: [
      (0, import_jsx_runtime.jsx)("strong", { style: { fontSize: "1rem" }, children: "Something went wrong!" }),
      (0, import_jsx_runtime.jsx)(
        "button",
        {
          style: {
            appearance: "none",
            fontSize: ".6em",
            border: "1px solid currentColor",
            padding: ".1rem .2rem",
            fontWeight: "bold",
            borderRadius: ".25rem"
          },
          onClick: () => setShow((d) => !d),
          children: show ? "Hide Error" : "Show Error"
        }
      )
    ] }),
    (0, import_jsx_runtime.jsx)("div", { style: { height: ".25rem" } }),
    show ? (0, import_jsx_runtime.jsx)("div", { children: (0, import_jsx_runtime.jsx)(
      "pre",
      {
        style: {
          fontSize: ".7em",
          border: "1px solid red",
          borderRadius: ".25rem",
          padding: ".3rem",
          color: "red",
          overflow: "auto"
        },
        children: error.message ? (0, import_jsx_runtime.jsx)("code", { children: error.message }) : null
      }
    ) }) : null
  ] });
}

// node_modules/@tanstack/react-router/dist/esm/useRouterState.js
var import_react = __toESM(require_react(), 1);
function useRouterState(opts) {
  const contextRouter = useRouter({
    warn: (opts == null ? void 0 : opts.router) === void 0
  });
  const router = (opts == null ? void 0 : opts.router) || contextRouter;
  const previousResult = (0, import_react.useRef)();
  return useStore(router.__store, (state) => {
    if (opts == null ? void 0 : opts.select) {
      if (opts.structuralSharing ?? router.options.defaultStructuralSharing) {
        const newSlice = replaceEqualDeep(
          previousResult.current,
          opts.select(state)
        );
        previousResult.current = newSlice;
        return newSlice;
      }
      return opts.select(state);
    }
    return state;
  });
}

// node_modules/@tanstack/react-router/dist/esm/not-found.js
function notFound(options = {}) {
  options.isNotFound = true;
  if (options.throw) throw options;
  return options;
}
function isNotFound(obj) {
  return !!(obj == null ? void 0 : obj.isNotFound);
}
function CatchNotFound(props) {
  const resetKey = useRouterState({
    select: (s) => `not-found-${s.location.pathname}-${s.status}`
  });
  return (0, import_jsx_runtime2.jsx)(
    CatchBoundary,
    {
      getResetKey: () => resetKey,
      onCatch: (error, errorInfo) => {
        var _a;
        if (isNotFound(error)) {
          (_a = props.onCatch) == null ? void 0 : _a.call(props, error, errorInfo);
        } else {
          throw error;
        }
      },
      errorComponent: ({ error }) => {
        var _a;
        if (isNotFound(error)) {
          return (_a = props.fallback) == null ? void 0 : _a.call(props, error);
        } else {
          throw error;
        }
      },
      children: props.children
    }
  );
}
function DefaultGlobalNotFound() {
  return (0, import_jsx_runtime2.jsx)("p", { children: "Not Found" });
}

// node_modules/@tanstack/react-router/dist/esm/transformer.js
var defaultTransformer = {
  stringify: (value) => JSON.stringify(value, function replacer(key, value2) {
    const keyVal = this[key];
    const transformer = transformers.find((t) => t.stringifyCondition(keyVal));
    if (transformer) {
      return transformer.stringify(keyVal);
    }
    return value2;
  }),
  parse: (value) => JSON.parse(value, function parser(key, value2) {
    const keyVal = this[key];
    const transformer = transformers.find((t) => t.parseCondition(keyVal));
    if (transformer) {
      return transformer.parse(keyVal);
    }
    return value2;
  })
};
var transformers = [
  {
    // Dates
    stringifyCondition: (value) => value instanceof Date,
    stringify: (value) => ({ $date: value.toISOString() }),
    parseCondition: (value) => isPlainObject(value) && value.$date,
    parse: (value) => new Date(value.$date)
  },
  {
    // undefined
    stringifyCondition: (value) => value === void 0,
    stringify: () => ({ $undefined: "" }),
    parseCondition: (value) => isPlainObject(value) && value.$undefined === "",
    parse: () => void 0
  }
];

// node_modules/@tanstack/react-router/dist/esm/router.js
var componentTypes = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent"
];
function routeNeedsPreload(route) {
  var _a;
  for (const componentType of componentTypes) {
    if ((_a = route.options[componentType]) == null ? void 0 : _a.preload) {
      return true;
    }
  }
  return false;
}
function validateSearch(validateSearch2, input) {
  if (validateSearch2 == null) return {};
  if ("~standard" in validateSearch2) {
    const result = validateSearch2["~standard"].validate(input);
    if (result instanceof Promise)
      throw new SearchParamError("Async validation not supported");
    if (result.issues)
      throw new SearchParamError(JSON.stringify(result.issues, void 0, 2));
    return result.value;
  }
  if ("parse" in validateSearch2) {
    return validateSearch2.parse(input);
  }
  if (typeof validateSearch2 === "function") {
    return validateSearch2(input);
  }
  return {};
}
function createRouter(options) {
  return new Router(options);
}
var Router = class {
  /**
   * @deprecated Use the `createRouter` function instead
   */
  constructor(options) {
    this.tempLocationKey = `${Math.round(
      Math.random() * 1e7
    )}`;
    this.resetNextScroll = true;
    this.shouldViewTransition = void 0;
    this.isViewTransitionTypesSupported = void 0;
    this.subscribers = /* @__PURE__ */ new Set();
    this.startReactTransition = (fn) => fn();
    this.update = (newOptions) => {
      var _a;
      if (newOptions.notFoundRoute) {
        console.warn(
          "The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/guide/not-found-errors#migrating-from-notfoundroute for more info."
        );
      }
      const previousOptions = this.options;
      this.options = {
        ...this.options,
        ...newOptions
      };
      this.isServer = this.options.isServer ?? typeof document === "undefined";
      this.pathParamsDecodeCharMap = this.options.pathParamsAllowedCharacters ? new Map(
        this.options.pathParamsAllowedCharacters.map((char) => [
          encodeURIComponent(char),
          char
        ])
      ) : void 0;
      if (!this.basepath || newOptions.basepath && newOptions.basepath !== previousOptions.basepath) {
        if (newOptions.basepath === void 0 || newOptions.basepath === "" || newOptions.basepath === "/") {
          this.basepath = "/";
        } else {
          this.basepath = `/${trimPath(newOptions.basepath)}`;
        }
      }
      if (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        !this.history || this.options.history && this.options.history !== this.history
      ) {
        this.history = this.options.history ?? (this.isServer ? createMemoryHistory({
          initialEntries: [this.basepath || "/"]
        }) : createBrowserHistory());
        this.latestLocation = this.parseLocation();
      }
      if (this.options.routeTree !== this.routeTree) {
        this.routeTree = this.options.routeTree;
        this.buildRouteTree();
      }
      if (!this.__store) {
        this.__store = new Store(getInitialRouterState(this.latestLocation), {
          onUpdate: () => {
            this.__store.state = {
              ...this.state,
              cachedMatches: this.state.cachedMatches.filter(
                (d) => !["redirected"].includes(d.status)
              )
            };
          }
        });
      }
      if (typeof window !== "undefined" && "CSS" in window && // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      typeof ((_a = window.CSS) == null ? void 0 : _a.supports) === "function") {
        this.isViewTransitionTypesSupported = window.CSS.supports(
          "selector(:active-view-transition-type(a)"
        );
      }
    };
    this.buildRouteTree = () => {
      this.routesById = {};
      this.routesByPath = {};
      const notFoundRoute = this.options.notFoundRoute;
      if (notFoundRoute) {
        notFoundRoute.init({
          originalIndex: 99999999999,
          defaultSsr: this.options.defaultSsr
        });
        this.routesById[notFoundRoute.id] = notFoundRoute;
      }
      const recurseRoutes = (childRoutes) => {
        childRoutes.forEach((childRoute, i) => {
          childRoute.init({
            originalIndex: i,
            defaultSsr: this.options.defaultSsr
          });
          const existingRoute = this.routesById[childRoute.id];
          invariant(
            !existingRoute,
            `Duplicate routes found with id: ${String(childRoute.id)}`
          );
          this.routesById[childRoute.id] = childRoute;
          if (!childRoute.isRoot && childRoute.path) {
            const trimmedFullPath = trimPathRight(childRoute.fullPath);
            if (!this.routesByPath[trimmedFullPath] || childRoute.fullPath.endsWith("/")) {
              this.routesByPath[trimmedFullPath] = childRoute;
            }
          }
          const children = childRoute.children;
          if (children == null ? void 0 : children.length) {
            recurseRoutes(children);
          }
        });
      };
      recurseRoutes([this.routeTree]);
      const scoredRoutes = [];
      const routes = Object.values(this.routesById);
      routes.forEach((d, i) => {
        var _a;
        if (d.isRoot || !d.path) {
          return;
        }
        const trimmed = trimPathLeft(d.fullPath);
        const parsed = parsePathname(trimmed);
        while (parsed.length > 1 && ((_a = parsed[0]) == null ? void 0 : _a.value) === "/") {
          parsed.shift();
        }
        const scores = parsed.map((segment) => {
          if (segment.value === "/") {
            return 0.75;
          }
          if (segment.type === "param") {
            return 0.5;
          }
          if (segment.type === "wildcard") {
            return 0.25;
          }
          return 1;
        });
        scoredRoutes.push({ child: d, trimmed, parsed, index: i, scores });
      });
      this.flatRoutes = scoredRoutes.sort((a, b) => {
        const minLength = Math.min(a.scores.length, b.scores.length);
        for (let i = 0; i < minLength; i++) {
          if (a.scores[i] !== b.scores[i]) {
            return b.scores[i] - a.scores[i];
          }
        }
        if (a.scores.length !== b.scores.length) {
          return b.scores.length - a.scores.length;
        }
        for (let i = 0; i < minLength; i++) {
          if (a.parsed[i].value !== b.parsed[i].value) {
            return a.parsed[i].value > b.parsed[i].value ? 1 : -1;
          }
        }
        return a.index - b.index;
      }).map((d, i) => {
        d.child.rank = i;
        return d.child;
      });
    };
    this.subscribe = (eventType, fn) => {
      const listener = {
        eventType,
        fn
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      this.subscribers.forEach((listener) => {
        if (listener.eventType === routerEvent.type) {
          listener.fn(routerEvent);
        }
      });
    };
    this.parseLocation = (previousLocation, locationToParse) => {
      const parse = ({
        pathname,
        search,
        hash,
        state
      }) => {
        const parsedSearch = this.options.parseSearch(search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        return {
          pathname,
          searchStr,
          search: replaceEqualDeep(previousLocation == null ? void 0 : previousLocation.search, parsedSearch),
          hash: hash.split("#").reverse()[0] ?? "",
          href: `${pathname}${searchStr}${hash}`,
          state: replaceEqualDeep(previousLocation == null ? void 0 : previousLocation.state, state)
        };
      };
      const location = parse(locationToParse ?? this.history.location);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation);
        parsedTempLocation.state.key = location.state.key;
        delete parsedTempLocation.state.__tempLocation;
        return {
          ...parsedTempLocation,
          maskedLocation: location
        };
      }
      return location;
    };
    this.resolvePathWithBase = (from, path) => {
      const resolvedPath = resolvePath({
        basepath: this.basepath,
        base: from,
        to: cleanPath(path),
        trailingSlash: this.options.trailingSlash,
        caseSensitive: this.options.caseSensitive
      });
      return resolvedPath;
    };
    this.getMatchedRoutes = (next, dest) => {
      let routeParams = {};
      const trimmedPath = trimPathRight(next.pathname);
      const getMatchedParams = (route) => {
        const result = matchPathname(this.basepath, trimmedPath, {
          to: route.fullPath,
          caseSensitive: route.options.caseSensitive ?? this.options.caseSensitive,
          fuzzy: true
        });
        return result;
      };
      let foundRoute = (dest == null ? void 0 : dest.to) !== void 0 ? this.routesByPath[dest.to] : void 0;
      if (foundRoute) {
        routeParams = getMatchedParams(foundRoute);
      } else {
        foundRoute = this.flatRoutes.find((route) => {
          const matchedParams = getMatchedParams(route);
          if (matchedParams) {
            routeParams = matchedParams;
            return true;
          }
          return false;
        });
      }
      let routeCursor = foundRoute || this.routesById[rootRouteId];
      const matchedRoutes = [routeCursor];
      while (routeCursor.parentRoute) {
        routeCursor = routeCursor.parentRoute;
        matchedRoutes.unshift(routeCursor);
      }
      return { matchedRoutes, routeParams, foundRoute };
    };
    this.cancelMatch = (id) => {
      const match = this.getMatch(id);
      if (!match) return;
      match.abortController.abort();
      clearTimeout(match.pendingTimeout);
    };
    this.cancelMatches = () => {
      var _a;
      (_a = this.state.pendingMatches) == null ? void 0 : _a.forEach((match) => {
        this.cancelMatch(match.id);
      });
    };
    this.buildLocation = (opts) => {
      const build = (dest = {}, matchedRoutesResult) => {
        var _a, _b, _c, _d, _e, _f;
        const fromMatches = dest._fromLocation ? this.matchRoutes(dest._fromLocation, { _buildLocation: true }) : this.state.matches;
        const fromMatch = dest.from != null ? fromMatches.find(
          (d) => matchPathname(this.basepath, trimPathRight(d.pathname), {
            to: dest.from,
            caseSensitive: false,
            fuzzy: false
          })
        ) : void 0;
        const fromPath = (fromMatch == null ? void 0 : fromMatch.pathname) || this.latestLocation.pathname;
        invariant(
          dest.from == null || fromMatch != null,
          "Could not find match for from: " + dest.from
        );
        const fromSearch = ((_a = this.state.pendingMatches) == null ? void 0 : _a.length) ? (_b = last(this.state.pendingMatches)) == null ? void 0 : _b.search : ((_c = last(fromMatches)) == null ? void 0 : _c.search) || this.latestLocation.search;
        const stayingMatches = matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.filter(
          (d) => fromMatches.find((e) => e.routeId === d.id)
        );
        let pathname;
        if (dest.to) {
          pathname = this.resolvePathWithBase(fromPath, `${dest.to}`);
        } else {
          const fromRouteByFromPathRouteId = this.routesById[(_d = stayingMatches == null ? void 0 : stayingMatches.find((route) => {
            const interpolatedPath = interpolatePath({
              path: route.fullPath,
              params: (matchedRoutesResult == null ? void 0 : matchedRoutesResult.routeParams) ?? {},
              decodeCharMap: this.pathParamsDecodeCharMap
            });
            const pathname2 = joinPaths([this.basepath, interpolatedPath]);
            return pathname2 === fromPath;
          })) == null ? void 0 : _d.id];
          pathname = this.resolvePathWithBase(
            fromPath,
            (fromRouteByFromPathRouteId == null ? void 0 : fromRouteByFromPathRouteId.to) ?? fromPath
          );
        }
        const prevParams = { ...(_e = last(fromMatches)) == null ? void 0 : _e.params };
        let nextParams = (dest.params ?? true) === true ? prevParams : { ...prevParams, ...functionalUpdate(dest.params, prevParams) };
        if (Object.keys(nextParams).length > 0) {
          matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.map((route) => {
            var _a2;
            return ((_a2 = route.options.params) == null ? void 0 : _a2.stringify) ?? route.options.stringifyParams;
          }).filter(Boolean).forEach((fn) => {
            nextParams = { ...nextParams, ...fn(nextParams) };
          });
        }
        pathname = interpolatePath({
          path: pathname,
          params: nextParams ?? {},
          leaveWildcards: false,
          leaveParams: opts.leaveParams,
          decodeCharMap: this.pathParamsDecodeCharMap
        });
        let search = fromSearch;
        if (opts._includeValidateSearch && ((_f = this.options.search) == null ? void 0 : _f.strict)) {
          let validatedSearch = {};
          matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.forEach((route) => {
            try {
              if (route.options.validateSearch) {
                validatedSearch = {
                  ...validatedSearch,
                  ...validateSearch(route.options.validateSearch, {
                    ...validatedSearch,
                    ...search
                  }) ?? {}
                };
              }
            } catch (e) {
            }
          });
          search = validatedSearch;
        }
        const applyMiddlewares = (search2) => {
          const allMiddlewares = (matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.reduce(
            (acc, route) => {
              var _a2;
              const middlewares = [];
              if ("search" in route.options) {
                if ((_a2 = route.options.search) == null ? void 0 : _a2.middlewares) {
                  middlewares.push(...route.options.search.middlewares);
                }
              } else if (route.options.preSearchFilters || route.options.postSearchFilters) {
                const legacyMiddleware = ({
                  search: search3,
                  next
                }) => {
                  let nextSearch = search3;
                  if ("preSearchFilters" in route.options && route.options.preSearchFilters) {
                    nextSearch = route.options.preSearchFilters.reduce(
                      (prev, next2) => next2(prev),
                      search3
                    );
                  }
                  const result = next(nextSearch);
                  if ("postSearchFilters" in route.options && route.options.postSearchFilters) {
                    return route.options.postSearchFilters.reduce(
                      (prev, next2) => next2(prev),
                      result
                    );
                  }
                  return result;
                };
                middlewares.push(legacyMiddleware);
              }
              if (opts._includeValidateSearch && route.options.validateSearch) {
                const validate = ({ search: search3, next }) => {
                  try {
                    const result = next(search3);
                    const validatedSearch = {
                      ...result,
                      ...validateSearch(
                        route.options.validateSearch,
                        result
                      ) ?? {}
                    };
                    return validatedSearch;
                  } catch (e) {
                  }
                };
                middlewares.push(validate);
              }
              return acc.concat(middlewares);
            },
            []
          )) ?? [];
          const final = ({ search: search3 }) => {
            if (!dest.search) {
              return {};
            }
            if (dest.search === true) {
              return search3;
            }
            return functionalUpdate(dest.search, search3);
          };
          allMiddlewares.push(final);
          const applyNext = (index, currentSearch) => {
            if (index >= allMiddlewares.length) {
              return currentSearch;
            }
            const middleware = allMiddlewares[index];
            const next = (newSearch) => {
              return applyNext(index + 1, newSearch);
            };
            return middleware({ search: currentSearch, next });
          };
          return applyNext(0, search2);
        };
        search = applyMiddlewares(search);
        search = replaceEqualDeep(fromSearch, search);
        const searchStr = this.options.stringifySearch(search);
        const hash = dest.hash === true ? this.latestLocation.hash : dest.hash ? functionalUpdate(dest.hash, this.latestLocation.hash) : void 0;
        const hashStr = hash ? `#${hash}` : "";
        let nextState = dest.state === true ? this.latestLocation.state : dest.state ? functionalUpdate(dest.state, this.latestLocation.state) : {};
        nextState = replaceEqualDeep(this.latestLocation.state, nextState);
        return {
          pathname,
          search,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          href: `${pathname}${searchStr}${hashStr}`,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const buildWithMatches = (dest = {}, maskedDest) => {
        var _a;
        const next = build(dest);
        let maskedNext = maskedDest ? build(maskedDest) : void 0;
        if (!maskedNext) {
          let params = {};
          const foundMask = (_a = this.options.routeMasks) == null ? void 0 : _a.find((d) => {
            const match = matchPathname(this.basepath, next.pathname, {
              to: d.from,
              caseSensitive: false,
              fuzzy: false
            });
            if (match) {
              params = match;
              return true;
            }
            return false;
          });
          if (foundMask) {
            const { from: _from, ...maskProps } = foundMask;
            maskedDest = {
              ...pick(opts, ["from"]),
              ...maskProps,
              params
            };
            maskedNext = build(maskedDest);
          }
        }
        const nextMatches = this.getMatchedRoutes(next, dest);
        const final = build(dest, nextMatches);
        if (maskedNext) {
          const maskedMatches = this.getMatchedRoutes(maskedNext, maskedDest);
          const maskedFinal = build(maskedDest, maskedMatches);
          final.maskedLocation = maskedFinal;
        }
        return final;
      };
      if (opts.mask) {
        return buildWithMatches(opts, {
          ...pick(opts, ["from"]),
          ...opts.mask
        });
      }
      return buildWithMatches(opts);
    };
    this.commitLocation = ({
      viewTransition,
      ignoreBlocker,
      ...next
    }) => {
      const isSameState = () => {
        next.state.key = this.latestLocation.state.key;
        const isEqual = deepEqual(next.state, this.latestLocation.state);
        delete next.state.key;
        return isEqual;
      };
      const isSameUrl = this.latestLocation.href === next.href;
      const previousCommitPromise = this.commitLocationPromise;
      this.commitLocationPromise = createControlledPromise(() => {
        previousCommitPromise == null ? void 0 : previousCommitPromise.resolve();
      });
      if (isSameUrl && isSameState()) {
        this.load();
      } else {
        let { maskedLocation, hashScrollIntoView, ...nextHistory } = next;
        if (maskedLocation) {
          nextHistory = {
            ...maskedLocation,
            state: {
              ...maskedLocation.state,
              __tempKey: void 0,
              __tempLocation: {
                ...nextHistory,
                search: nextHistory.searchStr,
                state: {
                  ...nextHistory.state,
                  __tempKey: void 0,
                  __tempLocation: void 0,
                  key: void 0
                }
              }
            }
          };
          if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) {
            nextHistory.state.__tempKey = this.tempLocationKey;
          }
        }
        nextHistory.state.__hashScrollIntoViewOptions = hashScrollIntoView ?? this.options.defaultHashScrollIntoView ?? true;
        this.shouldViewTransition = viewTransition;
        this.history[next.replace ? "replace" : "push"](
          nextHistory.href,
          nextHistory.state,
          { ignoreBlocker }
        );
      }
      this.resetNextScroll = next.resetScroll ?? true;
      if (!this.history.subscribers.size) {
        this.load();
      }
      return this.commitLocationPromise;
    };
    this.buildAndCommitLocation = ({
      replace,
      resetScroll,
      hashScrollIntoView,
      viewTransition,
      ignoreBlocker,
      href,
      ...rest
    } = {}) => {
      if (href) {
        const parsed = parseHref(href, {});
        rest.to = parsed.pathname;
        rest.search = this.options.parseSearch(parsed.search);
        rest.hash = parsed.hash.slice(1);
      }
      const location = this.buildLocation({
        ...rest,
        _includeValidateSearch: true
      });
      return this.commitLocation({
        ...location,
        viewTransition,
        replace,
        resetScroll,
        hashScrollIntoView,
        ignoreBlocker
      });
    };
    this.navigate = ({ to, reloadDocument, href, ...rest }) => {
      if (reloadDocument) {
        if (!href) {
          const location = this.buildLocation({ to, ...rest });
          href = location.href;
        }
        if (rest.replace) {
          window.location.replace(href);
        } else {
          window.location.href = href;
        }
        return;
      }
      return this.buildAndCommitLocation({
        ...rest,
        href,
        to
      });
    };
    this.load = async () => {
      this.latestLocation = this.parseLocation(this.latestLocation);
      let redirect2;
      let notFound2;
      let loadPromise;
      loadPromise = new Promise((resolve) => {
        this.startReactTransition(async () => {
          var _a;
          try {
            const next = this.latestLocation;
            const prevLocation = this.state.resolvedLocation;
            const hrefChanged = prevLocation.href !== next.href;
            const pathChanged = prevLocation.pathname !== next.pathname;
            this.cancelMatches();
            let pendingMatches;
            this.__store.batch(() => {
              pendingMatches = this.matchRoutes(next);
              this.__store.setState((s) => ({
                ...s,
                status: "pending",
                isLoading: true,
                location: next,
                pendingMatches,
                // If a cached moved to pendingMatches, remove it from cachedMatches
                cachedMatches: s.cachedMatches.filter((d) => {
                  return !pendingMatches.find((e) => e.id === d.id);
                })
              }));
            });
            if (!this.state.redirect) {
              this.emit({
                type: "onBeforeNavigate",
                fromLocation: prevLocation,
                toLocation: next,
                pathChanged,
                hrefChanged
              });
            }
            this.emit({
              type: "onBeforeLoad",
              fromLocation: prevLocation,
              toLocation: next,
              pathChanged,
              hrefChanged
            });
            await this.loadMatches({
              matches: pendingMatches,
              location: next,
              // eslint-disable-next-line @typescript-eslint/require-await
              onReady: async () => {
                this.startViewTransition(async () => {
                  let exitingMatches;
                  let enteringMatches;
                  let stayingMatches;
                  this.__store.batch(() => {
                    this.__store.setState((s) => {
                      const previousMatches = s.matches;
                      const newMatches = s.pendingMatches || s.matches;
                      exitingMatches = previousMatches.filter(
                        (match) => !newMatches.find((d) => d.id === match.id)
                      );
                      enteringMatches = newMatches.filter(
                        (match) => !previousMatches.find((d) => d.id === match.id)
                      );
                      stayingMatches = previousMatches.filter(
                        (match) => newMatches.find((d) => d.id === match.id)
                      );
                      return {
                        ...s,
                        isLoading: false,
                        loadedAt: Date.now(),
                        matches: newMatches,
                        pendingMatches: void 0,
                        cachedMatches: [
                          ...s.cachedMatches,
                          ...exitingMatches.filter((d) => d.status !== "error")
                        ]
                      };
                    });
                    this.clearExpiredCache();
                  });
                  [
                    [exitingMatches, "onLeave"],
                    [enteringMatches, "onEnter"],
                    [stayingMatches, "onStay"]
                  ].forEach(([matches, hook]) => {
                    matches.forEach((match) => {
                      var _a2, _b;
                      (_b = (_a2 = this.looseRoutesById[match.routeId].options)[hook]) == null ? void 0 : _b.call(_a2, match);
                    });
                  });
                });
              }
            });
          } catch (err) {
            if (isResolvedRedirect(err)) {
              redirect2 = err;
              if (!this.isServer) {
                this.navigate({
                  ...redirect2,
                  replace: true,
                  ignoreBlocker: true
                });
              }
            } else if (isNotFound(err)) {
              notFound2 = err;
            }
            this.__store.setState((s) => ({
              ...s,
              statusCode: redirect2 ? redirect2.statusCode : notFound2 ? 404 : s.matches.some((d) => d.status === "error") ? 500 : 200,
              redirect: redirect2
            }));
          }
          if (this.latestLoadPromise === loadPromise) {
            (_a = this.commitLocationPromise) == null ? void 0 : _a.resolve();
            this.latestLoadPromise = void 0;
            this.commitLocationPromise = void 0;
          }
          resolve();
        });
      });
      this.latestLoadPromise = loadPromise;
      await loadPromise;
      while (this.latestLoadPromise && loadPromise !== this.latestLoadPromise) {
        await this.latestLoadPromise;
      }
    };
    this.startViewTransition = (fn) => {
      const shouldViewTransition = this.shouldViewTransition ?? this.options.defaultViewTransition;
      delete this.shouldViewTransition;
      if (shouldViewTransition && typeof document !== "undefined" && "startViewTransition" in document && typeof document.startViewTransition === "function") {
        let startViewTransitionParams;
        if (typeof shouldViewTransition === "object" && this.isViewTransitionTypesSupported) {
          startViewTransitionParams = {
            update: fn,
            types: shouldViewTransition.types
          };
        } else {
          startViewTransitionParams = fn;
        }
        document.startViewTransition(startViewTransitionParams);
      } else {
        fn();
      }
    };
    this.updateMatch = (id, updater) => {
      var _a;
      let updated;
      const isPending = (_a = this.state.pendingMatches) == null ? void 0 : _a.find((d) => d.id === id);
      const isMatched = this.state.matches.find((d) => d.id === id);
      const isCached = this.state.cachedMatches.find((d) => d.id === id);
      const matchesKey = isPending ? "pendingMatches" : isMatched ? "matches" : isCached ? "cachedMatches" : "";
      if (matchesKey) {
        this.__store.setState((s) => {
          var _a2;
          return {
            ...s,
            [matchesKey]: (_a2 = s[matchesKey]) == null ? void 0 : _a2.map(
              (d) => d.id === id ? updated = updater(d) : d
            )
          };
        });
      }
      return updated;
    };
    this.getMatch = (matchId) => {
      return [
        ...this.state.cachedMatches,
        ...this.state.pendingMatches ?? [],
        ...this.state.matches
      ].find((d) => d.id === matchId);
    };
    this.loadMatches = async ({
      location,
      matches,
      preload: allPreload,
      onReady,
      updateMatch = this.updateMatch
    }) => {
      let firstBadMatchIndex;
      let rendered = false;
      const triggerOnReady = async () => {
        if (!rendered) {
          rendered = true;
          await (onReady == null ? void 0 : onReady());
        }
      };
      const resolvePreload = (matchId) => {
        return !!(allPreload && !this.state.matches.find((d) => d.id === matchId));
      };
      if (!this.isServer && !this.state.matches.length) {
        triggerOnReady();
      }
      const handleRedirectAndNotFound = (match, err) => {
        var _a, _b, _c;
        if (isResolvedRedirect(err)) {
          if (!err.reloadDocument) {
            throw err;
          }
        }
        if (isRedirect(err) || isNotFound(err)) {
          updateMatch(match.id, (prev) => ({
            ...prev,
            status: isRedirect(err) ? "redirected" : isNotFound(err) ? "notFound" : "error",
            isFetching: false,
            error: err,
            beforeLoadPromise: void 0,
            loaderPromise: void 0
          }));
          if (!err.routeId) {
            err.routeId = match.routeId;
          }
          (_a = match.beforeLoadPromise) == null ? void 0 : _a.resolve();
          (_b = match.loaderPromise) == null ? void 0 : _b.resolve();
          (_c = match.loadPromise) == null ? void 0 : _c.resolve();
          if (isRedirect(err)) {
            rendered = true;
            err = this.resolveRedirect({ ...err, _fromLocation: location });
            throw err;
          } else if (isNotFound(err)) {
            this._handleNotFound(matches, err, {
              updateMatch
            });
            throw err;
          }
        }
      };
      try {
        await new Promise((resolveAll, rejectAll) => {
          ;
          (async () => {
            var _a, _b, _c;
            try {
              const handleSerialError = (index, err, routerCode) => {
                var _a2, _b2;
                const { id: matchId, routeId } = matches[index];
                const route = this.looseRoutesById[routeId];
                if (err instanceof Promise) {
                  throw err;
                }
                err.routerCode = routerCode;
                firstBadMatchIndex = firstBadMatchIndex ?? index;
                handleRedirectAndNotFound(this.getMatch(matchId), err);
                try {
                  (_b2 = (_a2 = route.options).onError) == null ? void 0 : _b2.call(_a2, err);
                } catch (errorHandlerErr) {
                  err = errorHandlerErr;
                  handleRedirectAndNotFound(this.getMatch(matchId), err);
                }
                updateMatch(matchId, (prev) => {
                  var _a3, _b3;
                  (_a3 = prev.beforeLoadPromise) == null ? void 0 : _a3.resolve();
                  (_b3 = prev.loadPromise) == null ? void 0 : _b3.resolve();
                  return {
                    ...prev,
                    error: err,
                    status: "error",
                    isFetching: false,
                    updatedAt: Date.now(),
                    abortController: new AbortController(),
                    beforeLoadPromise: void 0
                  };
                });
              };
              for (const [index, { id: matchId, routeId }] of matches.entries()) {
                const existingMatch = this.getMatch(matchId);
                const parentMatchId = (_a = matches[index - 1]) == null ? void 0 : _a.id;
                const route = this.looseRoutesById[routeId];
                const pendingMs = route.options.pendingMs ?? this.options.defaultPendingMs;
                const shouldPending = !!(onReady && !this.isServer && !resolvePreload(matchId) && (route.options.loader || route.options.beforeLoad) && typeof pendingMs === "number" && pendingMs !== Infinity && (route.options.pendingComponent ?? this.options.defaultPendingComponent));
                let executeBeforeLoad = true;
                if (
                  // If we are in the middle of a load, either of these will be present
                  // (not to be confused with `loadPromise`, which is always defined)
                  existingMatch.beforeLoadPromise || existingMatch.loaderPromise
                ) {
                  if (shouldPending) {
                    setTimeout(() => {
                      try {
                        triggerOnReady();
                      } catch {
                      }
                    }, pendingMs);
                  }
                  await existingMatch.beforeLoadPromise;
                  executeBeforeLoad = this.getMatch(matchId).status !== "success";
                }
                if (executeBeforeLoad) {
                  try {
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      loadPromise: createControlledPromise(() => {
                        var _a2;
                        (_a2 = prev.loadPromise) == null ? void 0 : _a2.resolve();
                      }),
                      beforeLoadPromise: createControlledPromise()
                    }));
                    const abortController = new AbortController();
                    let pendingTimeout;
                    if (shouldPending) {
                      pendingTimeout = setTimeout(() => {
                        try {
                          triggerOnReady();
                        } catch {
                        }
                      }, pendingMs);
                    }
                    const { paramsError, searchError } = this.getMatch(matchId);
                    if (paramsError) {
                      handleSerialError(index, paramsError, "PARSE_PARAMS");
                    }
                    if (searchError) {
                      handleSerialError(index, searchError, "VALIDATE_SEARCH");
                    }
                    const getParentMatchContext = () => parentMatchId ? this.getMatch(parentMatchId).context : this.options.context ?? {};
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      isFetching: "beforeLoad",
                      fetchCount: prev.fetchCount + 1,
                      abortController,
                      pendingTimeout,
                      context: {
                        ...getParentMatchContext(),
                        ...prev.__routeContext,
                        ...prev.__beforeLoadContext
                      }
                    }));
                    const { search, params, context, cause } = this.getMatch(matchId);
                    const preload = resolvePreload(matchId);
                    const beforeLoadFnContext = {
                      search,
                      abortController,
                      params,
                      preload,
                      context,
                      location,
                      navigate: (opts) => this.navigate({ ...opts, _fromLocation: location }),
                      buildLocation: this.buildLocation,
                      cause: preload ? "preload" : cause,
                      matches
                    };
                    let beforeLoadContext = await ((_c = (_b = route.options).beforeLoad) == null ? void 0 : _c.call(_b, beforeLoadFnContext)) ?? {};
                    if (this.serializeLoaderData) {
                      beforeLoadContext = this.serializeLoaderData(
                        "__beforeLoadContext",
                        beforeLoadContext,
                        {
                          router: this,
                          match: this.getMatch(matchId)
                        }
                      );
                    }
                    if (isRedirect(beforeLoadContext) || isNotFound(beforeLoadContext)) {
                      handleSerialError(index, beforeLoadContext, "BEFORE_LOAD");
                    }
                    updateMatch(matchId, (prev) => {
                      return {
                        ...prev,
                        __beforeLoadContext: beforeLoadContext,
                        context: {
                          ...getParentMatchContext(),
                          ...prev.__routeContext,
                          ...beforeLoadContext
                        },
                        abortController
                      };
                    });
                  } catch (err) {
                    handleSerialError(index, err, "BEFORE_LOAD");
                  }
                  updateMatch(matchId, (prev) => {
                    var _a2;
                    (_a2 = prev.beforeLoadPromise) == null ? void 0 : _a2.resolve();
                    return {
                      ...prev,
                      beforeLoadPromise: void 0,
                      isFetching: false
                    };
                  });
                }
              }
              const validResolvedMatches = matches.slice(0, firstBadMatchIndex);
              const matchPromises = [];
              validResolvedMatches.forEach(({ id: matchId, routeId }, index) => {
                matchPromises.push(
                  (async () => {
                    const { loaderPromise: prevLoaderPromise } = this.getMatch(matchId);
                    let loaderRunningAsync = false;
                    if (prevLoaderPromise) {
                      await prevLoaderPromise;
                    } else {
                      const parentMatchPromise = matchPromises[index - 1];
                      const route = this.looseRoutesById[routeId];
                      const getLoaderContext = () => {
                        const {
                          params,
                          loaderDeps,
                          abortController,
                          context,
                          cause
                        } = this.getMatch(matchId);
                        const preload2 = resolvePreload(matchId);
                        return {
                          params,
                          deps: loaderDeps,
                          preload: !!preload2,
                          parentMatchPromise,
                          abortController,
                          context,
                          location,
                          navigate: (opts) => this.navigate({ ...opts, _fromLocation: location }),
                          cause: preload2 ? "preload" : cause,
                          route
                        };
                      };
                      const age = Date.now() - this.getMatch(matchId).updatedAt;
                      const preload = resolvePreload(matchId);
                      const staleAge = preload ? route.options.preloadStaleTime ?? this.options.defaultPreloadStaleTime ?? 3e4 : route.options.staleTime ?? this.options.defaultStaleTime ?? 0;
                      const shouldReloadOption = route.options.shouldReload;
                      const shouldReload = typeof shouldReloadOption === "function" ? shouldReloadOption(getLoaderContext()) : shouldReloadOption;
                      updateMatch(matchId, (prev) => ({
                        ...prev,
                        loaderPromise: createControlledPromise(),
                        preload: !!preload && !this.state.matches.find((d) => d.id === matchId)
                      }));
                      const runLoader = async () => {
                        var _a2, _b2, _c2, _d, _e, _f, _g, _h;
                        try {
                          const potentialPendingMinPromise = async () => {
                            const latestMatch = this.getMatch(matchId);
                            if (latestMatch.minPendingPromise) {
                              await latestMatch.minPendingPromise;
                            }
                          };
                          try {
                            this.loadRouteChunk(route);
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              isFetching: "loader"
                            }));
                            let loaderData = await ((_b2 = (_a2 = route.options).loader) == null ? void 0 : _b2.call(_a2, getLoaderContext()));
                            if (this.serializeLoaderData) {
                              loaderData = this.serializeLoaderData(
                                "loaderData",
                                loaderData,
                                {
                                  router: this,
                                  match: this.getMatch(matchId)
                                }
                              );
                            }
                            handleRedirectAndNotFound(
                              this.getMatch(matchId),
                              loaderData
                            );
                            await route._lazyPromise;
                            await potentialPendingMinPromise();
                            const headFnContent = (_d = (_c2 = route.options).head) == null ? void 0 : _d.call(_c2, {
                              matches,
                              match: this.getMatch(matchId),
                              params: this.getMatch(matchId).params,
                              loaderData
                            });
                            const meta = headFnContent == null ? void 0 : headFnContent.meta;
                            const links = headFnContent == null ? void 0 : headFnContent.links;
                            const scripts = headFnContent == null ? void 0 : headFnContent.scripts;
                            const headers = (_f = (_e = route.options).headers) == null ? void 0 : _f.call(_e, {
                              loaderData
                            });
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              error: void 0,
                              status: "success",
                              isFetching: false,
                              updatedAt: Date.now(),
                              loaderData,
                              meta,
                              links,
                              scripts,
                              headers
                            }));
                          } catch (e) {
                            let error = e;
                            await potentialPendingMinPromise();
                            handleRedirectAndNotFound(this.getMatch(matchId), e);
                            try {
                              (_h = (_g = route.options).onError) == null ? void 0 : _h.call(_g, e);
                            } catch (onErrorError) {
                              error = onErrorError;
                              handleRedirectAndNotFound(
                                this.getMatch(matchId),
                                onErrorError
                              );
                            }
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              error,
                              status: "error",
                              isFetching: false
                            }));
                          }
                          await route._componentsPromise;
                        } catch (err) {
                          updateMatch(matchId, (prev) => ({
                            ...prev,
                            loaderPromise: void 0
                          }));
                          handleRedirectAndNotFound(this.getMatch(matchId), err);
                        }
                      };
                      const { status, invalid } = this.getMatch(matchId);
                      loaderRunningAsync = status === "success" && (invalid || (shouldReload ?? age > staleAge));
                      if (preload && route.options.preload === false) {
                      } else if (loaderRunningAsync) {
                        ;
                        (async () => {
                          try {
                            await runLoader();
                          } catch (err) {
                            if (isResolvedRedirect(err)) {
                              await this.navigate(err);
                            }
                          }
                        })();
                      } else if (status !== "success") {
                        await runLoader();
                      }
                      const { loaderPromise, loadPromise } = this.getMatch(matchId);
                      loaderPromise == null ? void 0 : loaderPromise.resolve();
                      loadPromise == null ? void 0 : loadPromise.resolve();
                    }
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      isFetching: loaderRunningAsync ? prev.isFetching : false,
                      loaderPromise: void 0,
                      invalid: false
                    }));
                    return this.getMatch(matchId);
                  })()
                );
              });
              await Promise.all(matchPromises);
              resolveAll();
            } catch (err) {
              rejectAll(err);
            }
          })();
        });
        await triggerOnReady();
      } catch (err) {
        if (isRedirect(err) || isNotFound(err)) {
          if (isNotFound(err) && !allPreload) {
            await triggerOnReady();
          }
          throw err;
        }
      }
      return matches;
    };
    this.invalidate = (opts) => {
      const invalidate = (d) => {
        var _a;
        if (((_a = opts == null ? void 0 : opts.filter) == null ? void 0 : _a.call(opts, d)) ?? true) {
          return {
            ...d,
            invalid: true,
            ...d.status === "error" ? { status: "pending", error: void 0 } : {}
          };
        }
        return d;
      };
      this.__store.setState((s) => {
        var _a;
        return {
          ...s,
          matches: s.matches.map(invalidate),
          cachedMatches: s.cachedMatches.map(invalidate),
          pendingMatches: (_a = s.pendingMatches) == null ? void 0 : _a.map(invalidate)
        };
      });
      return this.load();
    };
    this.resolveRedirect = (err) => {
      const redirect2 = err;
      if (!redirect2.href) {
        redirect2.href = this.buildLocation(redirect2).href;
      }
      return redirect2;
    };
    this.clearCache = (opts) => {
      const filter = opts == null ? void 0 : opts.filter;
      if (filter !== void 0) {
        this.__store.setState((s) => {
          return {
            ...s,
            cachedMatches: s.cachedMatches.filter(
              (m) => !filter(m)
            )
          };
        });
      } else {
        this.__store.setState((s) => {
          return {
            ...s,
            cachedMatches: []
          };
        });
      }
    };
    this.clearExpiredCache = () => {
      const filter = (d) => {
        const route = this.looseRoutesById[d.routeId];
        if (!route.options.loader) {
          return true;
        }
        const gcTime = (d.preload ? route.options.preloadGcTime ?? this.options.defaultPreloadGcTime : route.options.gcTime ?? this.options.defaultGcTime) ?? 5 * 60 * 1e3;
        return !(d.status !== "error" && Date.now() - d.updatedAt < gcTime);
      };
      this.clearCache({ filter });
    };
    this.loadRouteChunk = (route) => {
      if (route._lazyPromise === void 0) {
        if (route.lazyFn) {
          route._lazyPromise = route.lazyFn().then((lazyRoute) => {
            const { id: _id, ...options2 } = lazyRoute.options;
            Object.assign(route.options, options2);
          });
        } else {
          route._lazyPromise = Promise.resolve();
        }
      }
      if (route._componentsPromise === void 0) {
        route._componentsPromise = route._lazyPromise.then(
          () => Promise.all(
            componentTypes.map(async (type) => {
              const component = route.options[type];
              if (component == null ? void 0 : component.preload) {
                await component.preload();
              }
            })
          )
        );
      }
      return route._componentsPromise;
    };
    this.preloadRoute = async (opts) => {
      const next = this.buildLocation(opts);
      let matches = this.matchRoutes(next, {
        throwOnError: true,
        preload: true,
        dest: opts
      });
      const activeMatchIds = new Set(
        [...this.state.matches, ...this.state.pendingMatches ?? []].map(
          (d) => d.id
        )
      );
      const loadedMatchIds = /* @__PURE__ */ new Set([
        ...activeMatchIds,
        ...this.state.cachedMatches.map((d) => d.id)
      ]);
      this.__store.batch(() => {
        matches.forEach((match) => {
          if (!loadedMatchIds.has(match.id)) {
            this.__store.setState((s) => ({
              ...s,
              cachedMatches: [...s.cachedMatches, match]
            }));
          }
        });
      });
      try {
        matches = await this.loadMatches({
          matches,
          location: next,
          preload: true,
          updateMatch: (id, updater) => {
            if (activeMatchIds.has(id)) {
              matches = matches.map((d) => d.id === id ? updater(d) : d);
            } else {
              this.updateMatch(id, updater);
            }
          }
        });
        return matches;
      } catch (err) {
        if (isRedirect(err)) {
          if (err.reloadDocument) {
            return void 0;
          }
          return await this.preloadRoute({
            ...err,
            _fromLocation: next
          });
        }
        console.error(err);
        return void 0;
      }
    };
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? this.resolvePathWithBase(
          location.from || "",
          location.to
        ) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      if ((opts == null ? void 0 : opts.pending) && this.state.status !== "pending") {
        return false;
      }
      const pending = (opts == null ? void 0 : opts.pending) === void 0 ? !this.state.isLoading : opts.pending;
      const baseLocation = pending ? this.latestLocation : this.state.resolvedLocation;
      const match = matchPathname(this.basepath, baseLocation.pathname, {
        ...opts,
        to: next.pathname
      });
      if (!match) {
        return false;
      }
      if (location.params) {
        if (!deepEqual(match, location.params, { partial: true })) {
          return false;
        }
      }
      if (match && ((opts == null ? void 0 : opts.includeSearch) ?? true)) {
        return deepEqual(baseLocation.search, next.search, { partial: true }) ? match : false;
      }
      return match;
    };
    this.dehydrate = () => {
      var _a;
      const pickError = ((_a = this.options.errorSerializer) == null ? void 0 : _a.serialize) ?? defaultSerializeError;
      return {
        state: {
          dehydratedMatches: this.state.matches.map((d) => {
            return {
              ...pick(d, ["id", "status", "updatedAt"]),
              // If an error occurs server-side during SSRing,
              // send a small subset of the error to the client
              error: d.error ? {
                data: pickError(d.error),
                __isServerError: true
              } : void 0
              // NOTE: We don't send the loader data here, because
              // there is a potential that it needs to be streamed.
              // Instead, we render it next to the route match in the HTML
              // which gives us the potential to stream it via suspense.
            };
          })
        },
        manifest: this.manifest
      };
    };
    this.hydrate = () => {
      var _a, _b, _c;
      let ctx;
      if (typeof document !== "undefined") {
        ctx = this.options.transformer.parse((_a = window.__TSR__) == null ? void 0 : _a.dehydrated);
      }
      invariant(
        ctx,
        "Expected to find a dehydrated data on window.__TSR__.dehydrated... but we did not. Please file an issue!"
      );
      this.dehydratedData = ctx.payload;
      (_c = (_b = this.options).hydrate) == null ? void 0 : _c.call(_b, ctx.payload);
      const dehydratedState = ctx.router.state;
      const matches = this.matchRoutes(this.state.location).map((match) => {
        const dehydratedMatch = dehydratedState.dehydratedMatches.find(
          (d) => d.id === match.id
        );
        invariant(
          dehydratedMatch,
          `Could not find a client-side match for dehydrated match with id: ${match.id}!`
        );
        return {
          ...match,
          ...dehydratedMatch
        };
      });
      this.__store.setState((s) => {
        return {
          ...s,
          matches
        };
      });
      this.manifest = ctx.router.manifest;
    };
    this.injectedHtml = [];
    this.injectHtml = (html) => {
      const cb = () => {
        this.injectedHtml = this.injectedHtml.filter((d) => d !== cb);
        return html;
      };
      this.injectedHtml.push(cb);
    };
    this.injectScript = (script, opts) => {
      this.injectHtml(
        `<script class='tsr-once'>${script}${(opts == null ? void 0 : opts.logScript) ?? true ? `; console.info(\`Injected From Server:
${script}\`)` : ""}; if (typeof __TSR__ !== 'undefined') __TSR__.cleanScripts()<\/script>`
      );
    };
    this.streamedKeys = /* @__PURE__ */ new Set();
    this.getStreamedValue = (key) => {
      var _a;
      if (this.isServer) {
        return void 0;
      }
      const streamedValue = (_a = window.__TSR__) == null ? void 0 : _a.streamedValues[key];
      if (!streamedValue) {
        return;
      }
      if (!streamedValue.parsed) {
        streamedValue.parsed = this.options.transformer.parse(streamedValue.value);
      }
      return streamedValue.parsed;
    };
    this.streamValue = (key, value) => {
      var _a;
      tiny_warning_esm_default(
        !this.streamedKeys.has(key),
        "Key has already been streamed: " + key
      );
      this.streamedKeys.add(key);
      this.injectScript(
        `__TSR__.streamedValues['${key}'] = { value: ${(_a = this.serializer) == null ? void 0 : _a.call(this, this.options.transformer.stringify(value))}}`
      );
    };
    this._handleNotFound = (matches, err, {
      updateMatch = this.updateMatch
    } = {}) => {
      const matchesByRouteId = Object.fromEntries(
        matches.map((match2) => [match2.routeId, match2])
      );
      let routeCursor = (err.global ? this.looseRoutesById[rootRouteId] : this.looseRoutesById[err.routeId]) || this.looseRoutesById[rootRouteId];
      while (!routeCursor.options.notFoundComponent && !this.options.defaultNotFoundComponent && routeCursor.id !== rootRouteId) {
        routeCursor = routeCursor.parentRoute;
        invariant(
          routeCursor,
          "Found invalid route tree while trying to find not-found handler."
        );
      }
      const match = matchesByRouteId[routeCursor.id];
      invariant(match, "Could not find match for route: " + routeCursor.id);
      updateMatch(match.id, (prev) => ({
        ...prev,
        status: "notFound",
        error: err,
        isFetching: false
      }));
      if (err.routerCode === "BEFORE_LOAD" && routeCursor.parentRoute) {
        err.routeId = routeCursor.parentRoute.id;
        this._handleNotFound(matches, err, {
          updateMatch
        });
      }
    };
    this.hasNotFoundMatch = () => {
      return this.__store.state.matches.some(
        (d) => d.status === "notFound" || d.globalNotFound
      );
    };
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      caseSensitive: options.caseSensitive ?? false,
      notFoundMode: options.notFoundMode ?? "fuzzy",
      stringifySearch: options.stringifySearch ?? defaultStringifySearch,
      parseSearch: options.parseSearch ?? defaultParseSearch,
      transformer: options.transformer ?? defaultTransformer
    });
    if (typeof document !== "undefined") {
      window.__TSR__ROUTER__ = this;
    }
  }
  get state() {
    return this.__store.state;
  }
  get looseRoutesById() {
    return this.routesById;
  }
  matchRoutes(pathnameOrNext, locationSearchOrOpts, opts) {
    if (typeof pathnameOrNext === "string") {
      return this.matchRoutesInternal(
        {
          pathname: pathnameOrNext,
          search: locationSearchOrOpts
        },
        opts
      );
    } else {
      return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
    }
  }
  matchRoutesInternal(next, opts) {
    const { foundRoute, matchedRoutes, routeParams } = this.getMatchedRoutes(
      next,
      opts == null ? void 0 : opts.dest
    );
    let isGlobalNotFound = false;
    if (
      // If we found a route, and it's not an index route and we have left over path
      foundRoute ? foundRoute.path !== "/" && routeParams["**"] : (
        // Or if we didn't find a route and we have left over path
        trimPathRight(next.pathname)
      )
    ) {
      if (this.options.notFoundRoute) {
        matchedRoutes.push(this.options.notFoundRoute);
      } else {
        isGlobalNotFound = true;
      }
    }
    const globalNotFoundRouteId = (() => {
      if (!isGlobalNotFound) {
        return void 0;
      }
      if (this.options.notFoundMode !== "root") {
        for (let i = matchedRoutes.length - 1; i >= 0; i--) {
          const route = matchedRoutes[i];
          if (route.children) {
            return route.id;
          }
        }
      }
      return rootRouteId;
    })();
    const parseErrors = matchedRoutes.map((route) => {
      var _a;
      let parsedParamsError;
      const parseParams = ((_a = route.options.params) == null ? void 0 : _a.parse) ?? route.options.parseParams;
      if (parseParams) {
        try {
          const parsedParams = parseParams(routeParams);
          Object.assign(routeParams, parsedParams);
        } catch (err) {
          parsedParamsError = new PathParamError(err.message, {
            cause: err
          });
          if (opts == null ? void 0 : opts.throwOnError) {
            throw parsedParamsError;
          }
          return parsedParamsError;
        }
      }
      return;
    });
    const matches = [];
    matchedRoutes.forEach((route, index) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const parentMatch = matches[index - 1];
      const [preMatchSearch, searchError] = (() => {
        const parentSearch = (parentMatch == null ? void 0 : parentMatch.search) ?? next.search;
        try {
          const search = validateSearch(route.options.validateSearch, parentSearch) ?? {};
          return [
            {
              ...parentSearch,
              ...search
            },
            void 0
          ];
        } catch (err) {
          const searchParamError = new SearchParamError(err.message, {
            cause: err
          });
          if (opts == null ? void 0 : opts.throwOnError) {
            throw searchParamError;
          }
          return [parentSearch, searchParamError];
        }
      })();
      const loaderDeps = ((_b = (_a = route.options).loaderDeps) == null ? void 0 : _b.call(_a, {
        search: preMatchSearch
      })) ?? "";
      const loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) : "";
      const interpolatedPath = interpolatePath({
        path: route.fullPath,
        params: routeParams,
        decodeCharMap: this.pathParamsDecodeCharMap
      });
      const matchId = interpolatePath({
        path: route.id,
        params: routeParams,
        leaveWildcards: true,
        decodeCharMap: this.pathParamsDecodeCharMap
      }) + loaderDepsHash;
      const existingMatch = this.getMatch(matchId);
      const previousMatch = this.state.matches.find(
        (d) => d.routeId === route.id
      );
      const cause = previousMatch ? "stay" : "enter";
      let match;
      if (existingMatch) {
        match = {
          ...existingMatch,
          cause,
          params: previousMatch ? replaceEqualDeep(previousMatch.params, routeParams) : routeParams,
          search: previousMatch ? replaceEqualDeep(previousMatch.search, preMatchSearch) : replaceEqualDeep(existingMatch.search, preMatchSearch)
        };
      } else {
        const status = route.options.loader || route.options.beforeLoad || route.lazyFn || routeNeedsPreload(route) ? "pending" : "success";
        match = {
          id: matchId,
          index,
          routeId: route.id,
          params: previousMatch ? replaceEqualDeep(previousMatch.params, routeParams) : routeParams,
          pathname: joinPaths([this.basepath, interpolatedPath]),
          updatedAt: Date.now(),
          search: previousMatch ? replaceEqualDeep(previousMatch.search, preMatchSearch) : preMatchSearch,
          searchError: void 0,
          status,
          isFetching: false,
          error: void 0,
          paramsError: parseErrors[index],
          __routeContext: {},
          __beforeLoadContext: {},
          context: {},
          abortController: new AbortController(),
          fetchCount: 0,
          cause,
          loaderDeps: previousMatch ? replaceEqualDeep(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
          invalid: false,
          preload: false,
          links: void 0,
          scripts: void 0,
          meta: void 0,
          staticData: route.options.staticData || {},
          loadPromise: createControlledPromise(),
          fullPath: route.fullPath
        };
      }
      const headFnContent = (_d = (_c = route.options).head) == null ? void 0 : _d.call(_c, {
        matches,
        match,
        params: match.params,
        loaderData: match.loaderData ?? void 0
      });
      match.links = headFnContent == null ? void 0 : headFnContent.links;
      match.scripts = headFnContent == null ? void 0 : headFnContent.scripts;
      match.meta = headFnContent == null ? void 0 : headFnContent.meta;
      if (match.status === "success") {
        match.headers = (_f = (_e = route.options).headers) == null ? void 0 : _f.call(_e, {
          loaderData: match.loaderData
        });
      }
      if (!(opts == null ? void 0 : opts.preload)) {
        match.globalNotFound = globalNotFoundRouteId === route.id;
      }
      match.searchError = searchError;
      const parentMatchId = parentMatch == null ? void 0 : parentMatch.id;
      const parentContext = !parentMatchId ? this.options.context ?? {} : parentMatch.context ?? this.options.context ?? {};
      match.context = {
        ...parentContext,
        ...match.__routeContext,
        ...match.__beforeLoadContext
      };
      if (!existingMatch && (opts == null ? void 0 : opts._buildLocation) !== true) {
        const contextFnContext = {
          deps: loaderDeps,
          params: match.params,
          context: match.context,
          location: next,
          navigate: (opts2) => this.navigate({ ...opts2, _fromLocation: next }),
          buildLocation: this.buildLocation,
          cause: match.cause,
          abortController: match.abortController,
          preload: !!match.preload,
          matches
        };
        match.__routeContext = ((_h = (_g = route.options).context) == null ? void 0 : _h.call(_g, contextFnContext)) ?? {};
        match.context = {
          ...parentContext,
          ...match.__routeContext,
          ...match.__beforeLoadContext
        };
      }
      matches.push(match);
    });
    return matches;
  }
};
function lazyFn(fn, key) {
  return async (...args) => {
    const imported = await fn();
    return imported[key || "default"](...args);
  };
}
var SearchParamError = class extends Error {
};
var PathParamError = class extends Error {
};
function getInitialRouterState(location) {
  return {
    loadedAt: 0,
    isLoading: false,
    isTransitioning: false,
    status: "idle",
    resolvedLocation: { ...location },
    location,
    matches: [],
    pendingMatches: [],
    cachedMatches: [],
    statusCode: 200
  };
}
function defaultSerializeError(err) {
  if (err instanceof Error) {
    const obj = {
      name: err.name,
      message: err.message
    };
    if (true) {
      obj.stack = err.stack;
    }
    return obj;
  }
  return {
    data: err
  };
}

// node_modules/@tanstack/react-router/dist/esm/defer.js
var TSR_DEFERRED_PROMISE = Symbol.for("TSR_DEFERRED_PROMISE");
function defer(_promise, options) {
  const promise = _promise;
  if (promise[TSR_DEFERRED_PROMISE]) {
    return promise;
  }
  promise[TSR_DEFERRED_PROMISE] = { status: "pending" };
  promise.then((data) => {
    promise[TSR_DEFERRED_PROMISE].status = "success";
    promise[TSR_DEFERRED_PROMISE].data = data;
  }).catch((error) => {
    promise[TSR_DEFERRED_PROMISE].status = "error";
    promise[TSR_DEFERRED_PROMISE].error = {
      data: ((options == null ? void 0 : options.serializeError) ?? defaultSerializeError)(error),
      __isServerError: true
    };
  });
  return promise;
}

// node_modules/@tanstack/react-router/dist/esm/isServerSideError.js
function isServerSideError(error) {
  if (!(typeof error === "object" && error && "data" in error)) return false;
  if (!("__isServerError" in error && error.__isServerError)) return false;
  if (!(typeof error.data === "object" && error.data)) return false;
  return error.__isServerError === true;
}
function defaultDeserializeError(serializedData) {
  if ("name" in serializedData && "message" in serializedData) {
    const error = new Error(serializedData.message);
    error.name = serializedData.name;
    if (true) {
      error.stack = serializedData.stack;
    }
    return error;
  }
  return serializedData.data;
}

// node_modules/@tanstack/react-router/dist/esm/awaited.js
function useAwaited({
  promise: _promise
}) {
  var _a, _b;
  const router = useRouter();
  const promise = defer(_promise);
  if (promise[TSR_DEFERRED_PROMISE].status === "pending") {
    throw promise;
  }
  if (promise[TSR_DEFERRED_PROMISE].status === "error") {
    if (typeof document !== "undefined") {
      if (isServerSideError(promise[TSR_DEFERRED_PROMISE].error)) {
        throw (((_a = router.options.errorSerializer) == null ? void 0 : _a.deserialize) ?? defaultDeserializeError)(promise[TSR_DEFERRED_PROMISE].error.data);
      } else {
        tiny_warning_esm_default(
          false,
          "Encountered a server-side error that doesn't fit the expected shape"
        );
        throw promise[TSR_DEFERRED_PROMISE].error;
      }
    } else {
      throw {
        data: (((_b = router.options.errorSerializer) == null ? void 0 : _b.serialize) ?? defaultSerializeError)(promise[TSR_DEFERRED_PROMISE].error),
        __isServerError: true
      };
    }
  }
  return [promise[TSR_DEFERRED_PROMISE].data, promise];
}
function Await(props) {
  const inner = (0, import_jsx_runtime3.jsx)(AwaitInner, { ...props });
  if (props.fallback) {
    return (0, import_jsx_runtime3.jsx)(React5.Suspense, { fallback: props.fallback, children: inner });
  }
  return inner;
}
function AwaitInner(props) {
  const [data] = useAwaited(props);
  return props.children(data);
}

// node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var import_jsesc = __toESM(require_jsesc(), 1);
function ScriptOnce({
  className,
  children,
  log,
  ...rest
}) {
  if (typeof document !== "undefined") {
    return null;
  }
  return (0, import_jsx_runtime4.jsx)(
    "script",
    {
      ...rest,
      className: `tsr-once ${className || ""}`,
      dangerouslySetInnerHTML: {
        __html: [
          children,
          (log ?? true) && true ? `console.info(\`Injected From Server:
${(0, import_jsesc.default)(children.toString(), { quotes: "backtick" })}\`)` : "",
          'if (typeof __TSR__ !== "undefined") __TSR__.cleanScripts()'
        ].filter(Boolean).join("\n")
      }
    }
  );
}

// node_modules/@tanstack/react-router/dist/esm/useMatch.js
var React7 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-router/dist/esm/matchContext.js
var React6 = __toESM(require_react(), 1);
var matchContext = React6.createContext(void 0);
var dummyMatchContext = React6.createContext(
  void 0
);

// node_modules/@tanstack/react-router/dist/esm/useMatch.js
function useMatch(opts) {
  const nearestMatchId = React7.useContext(
    opts.from ? dummyMatchContext : matchContext
  );
  const matchSelection = useRouterState({
    select: (state) => {
      const match = state.matches.find(
        (d) => opts.from ? opts.from === d.routeId : d.id === nearestMatchId
      );
      invariant(
        !((opts.shouldThrow ?? true) && !match),
        `Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`
      );
      if (match === void 0) {
        return void 0;
      }
      return opts.select ? opts.select(match) : match;
    },
    structuralSharing: opts.structuralSharing
  });
  return matchSelection;
}

// node_modules/@tanstack/react-router/dist/esm/useLoaderData.js
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (s) => {
      return opts.select ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js
function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return useMatch({
    ...rest,
    select: (s) => {
      return select ? select(s.loaderDeps) : s.loaderDeps;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useParams.js
function useParams(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.params) : match.params;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useSearch.js
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}

// node_modules/@tanstack/react-router/dist/esm/useNavigate.js
var React8 = __toESM(require_react(), 1);
function useNavigate(_defaultOpts) {
  const { navigate } = useRouter();
  return React8.useCallback(
    (options) => {
      return navigate({
        ...options
      });
    },
    [navigate]
  );
}
function Navigate(props) {
  const { navigate } = useRouter();
  React8.useEffect(() => {
    navigate({
      ...props
    });
  }, []);
  return null;
}

// node_modules/@tanstack/react-router/dist/esm/route.js
function getRouteApi(id) {
  return new RouteApi({ id });
}
var RouteApi = class {
  /**
   * @deprecated Use the `getRouteApi` function instead.
   */
  constructor({ id }) {
    this.useMatch = (opts) => {
      return useMatch({
        select: opts == null ? void 0 : opts.select,
        from: this.id,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useMatch({
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({ ...opts, from: this.id, strict: false });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({ ...opts, from: this.id, strict: false });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.id });
    };
    this.notFound = (opts) => {
      return notFound({ routeId: this.id, ...opts });
    };
    this.id = id;
  }
};
var Route = class {
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(options) {
    this.init = (opts) => {
      var _a, _b;
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !(options2 == null ? void 0 : options2.path) && !(options2 == null ? void 0 : options2.id);
      this.parentRoute = (_b = (_a = this.options).getParentRoute) == null ? void 0 : _b.call(_a);
      if (isRoot) {
        this._path = rootRouteId;
      } else {
        invariant(
          this.parentRoute,
          `Child Route instances must pass a 'getParentRoute: () => ParentRoute' option that returns a Route instance.`
        );
      }
      let path = isRoot ? rootRouteId : options2.path;
      if (path && path !== "/") {
        path = trimPathLeft(path);
      }
      const customId = (options2 == null ? void 0 : options2.id) || path;
      let id = isRoot ? rootRouteId : joinPaths([
        this.parentRoute.id === rootRouteId ? "" : this.parentRoute.id,
        customId
      ]);
      if (path === rootRouteId) {
        path = "/";
      }
      if (id !== rootRouteId) {
        id = joinPaths(["/", id]);
      }
      const fullPath = id === rootRouteId ? "/" : joinPaths([this.parentRoute.fullPath, path]);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = fullPath;
      this._ssr = (options2 == null ? void 0 : options2.ssr) ?? opts.defaultSsr ?? true;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn2) => {
      this.lazyFn = lazyFn2;
      return this;
    };
    this.useMatch = (opts) => {
      return useMatch({
        select: opts == null ? void 0 : opts.select,
        from: this.id,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useMatch({
        ...opts,
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.id });
    };
    this.options = options || {};
    this.isRoot = !(options == null ? void 0 : options.getParentRoute);
    invariant(
      !((options == null ? void 0 : options.id) && (options == null ? void 0 : options.path)),
      `Route cannot have both an 'id' and a 'path' option.`
    );
    this.$$typeof = Symbol.for("react.memo");
  }
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
  get ssr() {
    return this._ssr;
  }
  addChildren(children) {
    return this._addFileChildren(children);
  }
  _addFileChildren(children) {
    if (Array.isArray(children)) {
      this.children = children;
    }
    if (typeof children === "object" && children !== null) {
      this.children = Object.values(children);
    }
    return this;
  }
};
function createRoute(options) {
  return new Route(options);
}
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options);
  };
}
var rootRouteWithContext = createRootRouteWithContext;
var RootRoute = class extends Route {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(options) {
    super(options);
  }
  addChildren(children) {
    super.addChildren(children);
    return this;
  }
  _addFileChildren(children) {
    super._addFileChildren(children);
    return this;
  }
  _addFileTypes() {
    return this;
  }
};
function createRootRoute(options) {
  return new RootRoute(options);
}
function createRouteMask(opts) {
  return opts;
}
var NotFoundRoute = class extends Route {
  constructor(options) {
    super({
      ...options,
      id: "404"
    });
  }
};

// node_modules/@tanstack/react-router/dist/esm/fileRoute.js
function createFileRoute(path) {
  return new FileRoute(path, {
    silent: true
  }).createRoute;
}
var FileRoute = class {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      tiny_warning_esm_default(
        this.silent,
        "FileRoute is deprecated and will be removed in the next major version. Use the createFileRoute(path)(options) function instead."
      );
      const route = createRoute(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts == null ? void 0 : _opts.silent;
  }
};
function FileRouteLoader(_path) {
  tiny_warning_esm_default(
    false,
    `FileRouteLoader is deprecated and will be removed in the next major version. Please place the loader function in the the main route file, inside the \`createFileRoute('/path/to/file')(options)\` options`
  );
  return (loaderFn) => loaderFn;
}
var LazyRoute = class {
  constructor(opts) {
    this.useMatch = (opts2) => {
      return useMatch({
        select: opts2 == null ? void 0 : opts2.select,
        from: this.options.id,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing
      });
    };
    this.useRouteContext = (opts2) => {
      return useMatch({
        from: this.options.id,
        select: (d) => (opts2 == null ? void 0 : opts2.select) ? opts2.select(d.context) : d.context
      });
    };
    this.useSearch = (opts2) => {
      return useSearch({
        select: opts2 == null ? void 0 : opts2.select,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing,
        from: this.options.id
      });
    };
    this.useParams = (opts2) => {
      return useParams({
        select: opts2 == null ? void 0 : opts2.select,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing,
        from: this.options.id
      });
    };
    this.useLoaderDeps = (opts2) => {
      return useLoaderDeps({ ...opts2, from: this.options.id });
    };
    this.useLoaderData = (opts2) => {
      return useLoaderData({ ...opts2, from: this.options.id });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.options.id });
    };
    this.options = opts;
    this.$$typeof = Symbol.for("react.memo");
  }
};
function createLazyRoute(id) {
  return (opts) => {
    return new LazyRoute({ id, ...opts });
  };
}
function createLazyFileRoute(id) {
  return (opts) => new LazyRoute({ id, ...opts });
}

// node_modules/@tanstack/react-router/dist/esm/lazyRouteComponent.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var React10 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-router/dist/esm/Match.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var React9 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-router/dist/esm/SafeFragment.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function SafeFragment(props) {
  return (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children: props.children });
}

// node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function renderRouteNotFound(router, route, data) {
  if (!route.options.notFoundComponent) {
    if (router.options.defaultNotFoundComponent) {
      return (0, import_jsx_runtime6.jsx)(router.options.defaultNotFoundComponent, { data });
    }
    if (true) {
      tiny_warning_esm_default(
        route.options.notFoundComponent,
        `A notFoundError was encountered on the route with ID "${route.id}", but a notFoundComponent option was not configured, nor was a router level defaultNotFoundComponent configured. Consider configuring at least one of these to avoid TanStack Router's overly generic defaultNotFoundComponent (<div>Not Found<div>)`
      );
    }
    return (0, import_jsx_runtime6.jsx)(DefaultGlobalNotFound, {});
  }
  return (0, import_jsx_runtime6.jsx)(route.options.notFoundComponent, { data });
}

// node_modules/@tanstack/react-router/dist/esm/Match.js
var Match = React9.memo(function MatchImpl({
  matchId
}) {
  var _a, _b;
  const router = useRouter();
  const routeId = useRouterState({
    select: (s) => {
      var _a2;
      return (_a2 = s.matches.find((d) => d.id === matchId)) == null ? void 0 : _a2.routeId;
    }
  });
  invariant(
    routeId,
    `Could not find routeId for matchId "${matchId}". Please file an issue!`
  );
  const route = router.routesById[routeId];
  const PendingComponent = route.options.pendingComponent ?? router.options.defaultPendingComponent;
  const pendingElement = PendingComponent ? (0, import_jsx_runtime7.jsx)(PendingComponent, {}) : null;
  const routeErrorComponent = route.options.errorComponent ?? router.options.defaultErrorComponent;
  const routeOnCatch = route.options.onCatch ?? router.options.defaultOnCatch;
  const routeNotFoundComponent = route.isRoot ? (
    // If it's the root route, use the globalNotFound option, with fallback to the notFoundRoute's component
    route.options.notFoundComponent ?? ((_a = router.options.notFoundRoute) == null ? void 0 : _a.options.component)
  ) : route.options.notFoundComponent;
  const ResolvedSuspenseBoundary = (
    // If we're on the root route, allow forcefully wrapping in suspense
    (!route.isRoot || route.options.wrapInSuspense) && (route.options.wrapInSuspense ?? PendingComponent ?? ((_b = route.options.errorComponent) == null ? void 0 : _b.preload)) ? React9.Suspense : SafeFragment
  );
  const ResolvedCatchBoundary = routeErrorComponent ? CatchBoundary : SafeFragment;
  const ResolvedNotFoundBoundary = routeNotFoundComponent ? CatchNotFound : SafeFragment;
  const resetKey = useRouterState({
    select: (s) => s.loadedAt
  });
  return (0, import_jsx_runtime7.jsx)(matchContext.Provider, { value: matchId, children: (0, import_jsx_runtime7.jsx)(ResolvedSuspenseBoundary, { fallback: pendingElement, children: (0, import_jsx_runtime7.jsx)(
    ResolvedCatchBoundary,
    {
      getResetKey: () => resetKey,
      errorComponent: routeErrorComponent || ErrorComponent,
      onCatch: (error, errorInfo) => {
        if (isNotFound(error)) throw error;
        tiny_warning_esm_default(false, `Error in route match: ${matchId}`);
        routeOnCatch == null ? void 0 : routeOnCatch(error, errorInfo);
      },
      children: (0, import_jsx_runtime7.jsx)(
        ResolvedNotFoundBoundary,
        {
          fallback: (error) => {
            if (!routeNotFoundComponent || error.routeId && error.routeId !== routeId || !error.routeId && !route.isRoot)
              throw error;
            return React9.createElement(routeNotFoundComponent, error);
          },
          children: (0, import_jsx_runtime7.jsx)(MatchInner, { matchId })
        }
      )
    }
  ) }) });
});
var MatchInner = React9.memo(function MatchInnerImpl({
  matchId
}) {
  var _a, _b, _c, _d, _e;
  const router = useRouter();
  const { match, matchIndex, routeId } = useRouterState({
    select: (s) => {
      const matchIndex2 = s.matches.findIndex((d) => d.id === matchId);
      const match2 = s.matches[matchIndex2];
      const routeId2 = match2.routeId;
      return {
        routeId: routeId2,
        matchIndex: matchIndex2,
        match: pick(match2, ["id", "status", "error"])
      };
    },
    structuralSharing: true
  });
  const route = router.routesById[routeId];
  const out = React9.useMemo(() => {
    const Comp = route.options.component ?? router.options.defaultComponent;
    return Comp ? (0, import_jsx_runtime7.jsx)(Comp, {}) : (0, import_jsx_runtime7.jsx)(Outlet, {});
  }, [route.options.component, router.options.defaultComponent]);
  const RouteErrorComponent = (route.options.errorComponent ?? router.options.defaultErrorComponent) || ErrorComponent;
  if (match.status === "notFound") {
    let error;
    if (isServerSideError(match.error)) {
      const deserializeError = ((_a = router.options.errorSerializer) == null ? void 0 : _a.deserialize) ?? defaultDeserializeError;
      error = deserializeError(match.error.data);
    } else {
      error = match.error;
    }
    invariant(isNotFound(error), "Expected a notFound error");
    return renderRouteNotFound(router, route, error);
  }
  if (match.status === "redirected") {
    invariant(isRedirect(match.error), "Expected a redirect error");
    throw (_b = router.getMatch(match.id)) == null ? void 0 : _b.loadPromise;
  }
  if (match.status === "error") {
    if (router.isServer) {
      return (0, import_jsx_runtime7.jsx)(
        RouteErrorComponent,
        {
          error: match.error,
          info: {
            componentStack: ""
          }
        }
      );
    }
    if (isServerSideError(match.error)) {
      const deserializeError = ((_c = router.options.errorSerializer) == null ? void 0 : _c.deserialize) ?? defaultDeserializeError;
      throw deserializeError(match.error.data);
    } else {
      throw match.error;
    }
  }
  if (match.status === "pending") {
    const pendingMinMs = route.options.pendingMinMs ?? router.options.defaultPendingMinMs;
    if (pendingMinMs && !((_d = router.getMatch(match.id)) == null ? void 0 : _d.minPendingPromise)) {
      if (!router.isServer) {
        const minPendingPromise = createControlledPromise();
        Promise.resolve().then(() => {
          router.updateMatch(match.id, (prev) => ({
            ...prev,
            minPendingPromise
          }));
        });
        setTimeout(() => {
          minPendingPromise.resolve();
          router.updateMatch(match.id, (prev) => ({
            ...prev,
            minPendingPromise: void 0
          }));
        }, pendingMinMs);
      }
    }
    throw (_e = router.getMatch(match.id)) == null ? void 0 : _e.loadPromise;
  }
  return (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
    out,
    router.AfterEachMatch ? (0, import_jsx_runtime7.jsx)(router.AfterEachMatch, { match, matchIndex }) : null
  ] });
});
var Outlet = React9.memo(function OutletImpl() {
  const router = useRouter();
  const matchId = React9.useContext(matchContext);
  const routeId = useRouterState({
    select: (s) => {
      var _a;
      return (_a = s.matches.find((d) => d.id === matchId)) == null ? void 0 : _a.routeId;
    }
  });
  const route = router.routesById[routeId];
  const parentGlobalNotFound = useRouterState({
    select: (s) => {
      const matches = s.matches;
      const parentMatch = matches.find((d) => d.id === matchId);
      invariant(
        parentMatch,
        `Could not find parent match for matchId "${matchId}"`
      );
      return parentMatch.globalNotFound;
    }
  });
  const childMatchId = useRouterState({
    select: (s) => {
      var _a;
      const matches = s.matches;
      const index = matches.findIndex((d) => d.id === matchId);
      return (_a = matches[index + 1]) == null ? void 0 : _a.id;
    }
  });
  if (parentGlobalNotFound) {
    return renderRouteNotFound(router, route, void 0);
  }
  if (!childMatchId) {
    return null;
  }
  const nextMatch = (0, import_jsx_runtime7.jsx)(Match, { matchId: childMatchId });
  const pendingElement = router.options.defaultPendingComponent ? (0, import_jsx_runtime7.jsx)(router.options.defaultPendingComponent, {}) : null;
  if (matchId === rootRouteId) {
    return (0, import_jsx_runtime7.jsx)(React9.Suspense, { fallback: pendingElement, children: nextMatch });
  }
  return nextMatch;
});

// node_modules/@tanstack/react-router/dist/esm/lazyRouteComponent.js
function isModuleNotFoundError(error) {
  return typeof (error == null ? void 0 : error.message) === "string" && /Failed to fetch dynamically imported module/.test(error.message);
}
function ClientOnly({
  children,
  fallback = null
}) {
  return useHydrated() ? (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, { children }) : (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, { children: fallback });
}
function subscribe() {
  return () => {
  };
}
function useHydrated() {
  return React10.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function lazyRouteComponent(importer, exportName, ssr) {
  let loadPromise;
  let comp;
  let error;
  const load = () => {
    if (typeof document === "undefined" && (ssr == null ? void 0 : ssr()) === false) {
      comp = () => null;
      return Promise.resolve();
    }
    if (!loadPromise) {
      loadPromise = importer().then((res) => {
        loadPromise = void 0;
        comp = res[exportName ?? "default"];
      }).catch((err) => {
        error = err;
      });
    }
    return loadPromise;
  };
  const lazyComp = function Lazy(props) {
    if (error) {
      if (isModuleNotFoundError(error)) {
        if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
          const storageKey = `tanstack_router_reload:${error.message}`;
          if (!sessionStorage.getItem(storageKey)) {
            sessionStorage.setItem(storageKey, "1");
            window.location.reload();
            return {
              default: () => null
            };
          }
        }
      }
      throw error;
    }
    if (!comp) {
      throw load();
    }
    if ((ssr == null ? void 0 : ssr()) === false) {
      return (0, import_jsx_runtime8.jsx)(ClientOnly, { fallback: (0, import_jsx_runtime8.jsx)(Outlet, {}), children: React10.createElement(comp, props) });
    }
    return React10.createElement(comp, props);
  };
  lazyComp.preload = load;
  return lazyComp;
}

// node_modules/@tanstack/react-router/dist/esm/link.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var React11 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);
var preloadWarning = "Error preloading route! ☝️";
function useLinkProps(options, forwardedRef) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = React11.useState(false);
  const hasRenderFetched = React11.useRef(false);
  const innerRef = useForwardedRef(forwardedRef);
  const {
    // custom props
    activeProps = () => ({ className: "active" }),
    inactiveProps = () => ({}),
    activeOptions,
    to,
    preload: userPreload,
    preloadDelay: userPreloadDelay,
    hashScrollIntoView,
    replace,
    startTransition: startTransition2,
    resetScroll,
    viewTransition,
    // element props
    children,
    target,
    disabled,
    style,
    className,
    onClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    ignoreBlocker,
    ...rest
  } = options;
  const {
    // prevent these from being returned
    params: _params,
    search: _search,
    hash: _hash,
    state: _state,
    mask: _mask,
    reloadDocument: _reloadDocument,
    ...propsSafeToSpread
  } = rest;
  const type = React11.useMemo(() => {
    try {
      new URL(`${to}`);
      return "external";
    } catch {
    }
    return "internal";
  }, [to]);
  const currentSearch = useRouterState({
    select: (s) => s.location.search,
    structuralSharing: true
  });
  const parentRouteId = useMatch({ strict: false, select: (s) => s.pathname });
  options = {
    from: parentRouteId,
    ...options
  };
  const next = React11.useMemo(
    () => router.buildLocation(options),
    [router, options, currentSearch]
  );
  const preload = React11.useMemo(() => {
    if (options.reloadDocument) {
      return false;
    }
    return userPreload ?? router.options.defaultPreload;
  }, [router.options.defaultPreload, userPreload, options.reloadDocument]);
  const preloadDelay = userPreloadDelay ?? router.options.defaultPreloadDelay ?? 0;
  const isActive = useRouterState({
    select: (s) => {
      if (activeOptions == null ? void 0 : activeOptions.exact) {
        const testExact = exactPathTest(
          s.location.pathname,
          next.pathname,
          router.basepath
        );
        if (!testExact) {
          return false;
        }
      } else {
        const currentPathSplit = removeTrailingSlash(
          s.location.pathname,
          router.basepath
        ).split("/");
        const nextPathSplit = removeTrailingSlash(
          next.pathname,
          router.basepath
        ).split("/");
        const pathIsFuzzyEqual = nextPathSplit.every(
          (d, i) => d === currentPathSplit[i]
        );
        if (!pathIsFuzzyEqual) {
          return false;
        }
      }
      if ((activeOptions == null ? void 0 : activeOptions.includeSearch) ?? true) {
        const searchTest = deepEqual(s.location.search, next.search, {
          partial: !(activeOptions == null ? void 0 : activeOptions.exact),
          ignoreUndefined: !(activeOptions == null ? void 0 : activeOptions.explicitUndefined)
        });
        if (!searchTest) {
          return false;
        }
      }
      if (activeOptions == null ? void 0 : activeOptions.includeHash) {
        return s.location.hash === next.hash;
      }
      return true;
    }
  });
  const doPreload = React11.useCallback(() => {
    router.preloadRoute(options).catch((err) => {
      console.warn(err);
      console.warn(preloadWarning);
    });
  }, [options, router]);
  const preloadViewportIoCallback = React11.useCallback(
    (entry) => {
      if (entry == null ? void 0 : entry.isIntersecting) {
        doPreload();
      }
    },
    [doPreload]
  );
  useIntersectionObserver(
    innerRef,
    preloadViewportIoCallback,
    { rootMargin: "100px" },
    { disabled: !!disabled || !(preload === "viewport") }
  );
  useLayoutEffect2(() => {
    if (hasRenderFetched.current) {
      return;
    }
    if (!disabled && preload === "render") {
      doPreload();
      hasRenderFetched.current = true;
    }
  }, [disabled, doPreload, preload]);
  if (type === "external") {
    return {
      ...propsSafeToSpread,
      ref: innerRef,
      type,
      href: to,
      ...children && { children },
      ...target && { target },
      ...disabled && { disabled },
      ...style && { style },
      ...className && { className },
      ...onClick && { onClick },
      ...onFocus && { onFocus },
      ...onMouseEnter && { onMouseEnter },
      ...onMouseLeave && { onMouseLeave },
      ...onTouchStart && { onTouchStart }
    };
  }
  const handleClick = (e) => {
    if (!disabled && !isCtrlEvent(e) && !e.defaultPrevented && (!target || target === "_self") && e.button === 0) {
      e.preventDefault();
      (0, import_react_dom.flushSync)(() => {
        setIsTransitioning(true);
      });
      const unsub = router.subscribe("onResolved", () => {
        unsub();
        setIsTransitioning(false);
      });
      return router.navigate({
        ...options,
        replace,
        resetScroll,
        hashScrollIntoView,
        startTransition: startTransition2,
        viewTransition,
        ignoreBlocker
      });
    }
  };
  const handleFocus = (_) => {
    if (disabled) return;
    if (preload) {
      doPreload();
    }
  };
  const handleTouchStart = handleFocus;
  const handleEnter = (e) => {
    if (disabled) return;
    const eventTarget = e.target || {};
    if (preload) {
      if (eventTarget.preloadTimeout) {
        return;
      }
      eventTarget.preloadTimeout = setTimeout(() => {
        eventTarget.preloadTimeout = null;
        doPreload();
      }, preloadDelay);
    }
  };
  const handleLeave = (e) => {
    if (disabled) return;
    const eventTarget = e.target || {};
    if (eventTarget.preloadTimeout) {
      clearTimeout(eventTarget.preloadTimeout);
      eventTarget.preloadTimeout = null;
    }
  };
  const composeHandlers = (handlers) => (e) => {
    var _a;
    (_a = e.persist) == null ? void 0 : _a.call(e);
    handlers.filter(Boolean).forEach((handler) => {
      if (e.defaultPrevented) return;
      handler(e);
    });
  };
  const resolvedActiveProps = isActive ? functionalUpdate(activeProps, {}) ?? {} : {};
  const resolvedInactiveProps = isActive ? {} : functionalUpdate(inactiveProps, {});
  const resolvedClassName = [
    className,
    resolvedActiveProps.className,
    resolvedInactiveProps.className
  ].filter(Boolean).join(" ");
  const resolvedStyle = {
    ...style,
    ...resolvedActiveProps.style,
    ...resolvedInactiveProps.style
  };
  return {
    ...propsSafeToSpread,
    ...resolvedActiveProps,
    ...resolvedInactiveProps,
    href: disabled ? void 0 : next.maskedLocation ? router.history.createHref(next.maskedLocation.href) : router.history.createHref(next.href),
    ref: innerRef,
    onClick: composeHandlers([onClick, handleClick]),
    onFocus: composeHandlers([onFocus, handleFocus]),
    onMouseEnter: composeHandlers([onMouseEnter, handleEnter]),
    onMouseLeave: composeHandlers([onMouseLeave, handleLeave]),
    onTouchStart: composeHandlers([onTouchStart, handleTouchStart]),
    disabled: !!disabled,
    target,
    ...Object.keys(resolvedStyle).length && { style: resolvedStyle },
    ...resolvedClassName && { className: resolvedClassName },
    ...disabled && {
      role: "link",
      "aria-disabled": true
    },
    ...isActive && { "data-status": "active", "aria-current": "page" },
    ...isTransitioning && { "data-transitioning": "transitioning" }
  };
}
function createLink(Comp) {
  return React11.forwardRef(function CreatedLink(props, ref) {
    return (0, import_jsx_runtime9.jsx)(Link, { ...props, _asChild: Comp, ref });
  });
}
var Link = React11.forwardRef(
  (props, ref) => {
    const { _asChild, ...rest } = props;
    const { type: _type, ref: innerRef, ...linkProps } = useLinkProps(rest, ref);
    const children = typeof rest.children === "function" ? rest.children({
      isActive: linkProps["data-status"] === "active"
    }) : rest.children;
    if (typeof _asChild === "undefined") {
      delete linkProps.disabled;
    }
    return React11.createElement(
      _asChild ? _asChild : "a",
      {
        ...linkProps,
        ref: innerRef
      },
      children
    );
  }
);
function isCtrlEvent(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
var linkOptions = (options) => {
  return options;
};

// node_modules/@tanstack/react-router/dist/esm/Matches.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var React13 = __toESM(require_react(), 1);

// node_modules/@tanstack/react-router/dist/esm/Transitioner.js
var React12 = __toESM(require_react(), 1);
function Transitioner() {
  const router = useRouter();
  const mountLoadForRouter = React12.useRef({ router, mounted: false });
  const isLoading = useRouterState({
    select: ({ isLoading: isLoading2 }) => isLoading2
  });
  const [isTransitioning, setIsTransitioning] = React12.useState(false);
  const hasPendingMatches = useRouterState({
    select: (s) => s.matches.some((d) => d.status === "pending"),
    structuralSharing: true
  });
  const previousIsLoading = usePrevious(isLoading);
  const isAnyPending = isLoading || isTransitioning || hasPendingMatches;
  const previousIsAnyPending = usePrevious(isAnyPending);
  const isPagePending = isLoading || hasPendingMatches;
  const previousIsPagePending = usePrevious(isPagePending);
  if (!router.isServer) {
    router.startReactTransition = (fn) => {
      setIsTransitioning(true);
      React12.startTransition(() => {
        fn();
        setIsTransitioning(false);
      });
    };
  }
  React12.useEffect(() => {
    const unsub = router.history.subscribe(router.load);
    const nextLocation = router.buildLocation({
      to: router.latestLocation.pathname,
      search: true,
      params: true,
      hash: true,
      state: true,
      _includeValidateSearch: true
    });
    if (trimPathRight(router.latestLocation.href) !== trimPathRight(nextLocation.href)) {
      router.commitLocation({ ...nextLocation, replace: true });
    }
    return () => {
      unsub();
    };
  }, [router, router.history]);
  useLayoutEffect2(() => {
    var _a;
    if (typeof window !== "undefined" && ((_a = window.__TSR__) == null ? void 0 : _a.dehydrated) || mountLoadForRouter.current.router === router && mountLoadForRouter.current.mounted) {
      return;
    }
    mountLoadForRouter.current = { router, mounted: true };
    const tryLoad = async () => {
      try {
        await router.load();
      } catch (err) {
        console.error(err);
      }
    };
    tryLoad();
  }, [router]);
  useLayoutEffect2(() => {
    if (previousIsLoading && !isLoading) {
      const toLocation = router.state.location;
      const fromLocation = router.state.resolvedLocation;
      const pathChanged = fromLocation.pathname !== toLocation.pathname;
      const hrefChanged = fromLocation.href !== toLocation.href;
      router.emit({
        type: "onLoad",
        // When the new URL has committed, when the new matches have been loaded into state.matches
        fromLocation,
        toLocation,
        pathChanged,
        hrefChanged
      });
    }
  }, [previousIsLoading, router, isLoading]);
  useLayoutEffect2(() => {
    if (previousIsPagePending && !isPagePending) {
      const toLocation = router.state.location;
      const fromLocation = router.state.resolvedLocation;
      const pathChanged = fromLocation.pathname !== toLocation.pathname;
      const hrefChanged = fromLocation.href !== toLocation.href;
      router.emit({
        type: "onBeforeRouteMount",
        fromLocation,
        toLocation,
        pathChanged,
        hrefChanged
      });
    }
  }, [isPagePending, previousIsPagePending, router]);
  useLayoutEffect2(() => {
    if (previousIsAnyPending && !isAnyPending) {
      const toLocation = router.state.location;
      const fromLocation = router.state.resolvedLocation;
      const pathChanged = fromLocation.pathname !== toLocation.pathname;
      const hrefChanged = fromLocation.href !== toLocation.href;
      router.emit({
        type: "onResolved",
        fromLocation,
        toLocation,
        pathChanged,
        hrefChanged
      });
      router.__store.setState((s) => ({
        ...s,
        status: "idle",
        resolvedLocation: s.location
      }));
      if (typeof document !== "undefined" && document.querySelector) {
        const hashScrollIntoViewOptions = router.state.location.state.__hashScrollIntoViewOptions ?? true;
        if (hashScrollIntoViewOptions && router.state.location.hash !== "") {
          const el = document.getElementById(router.state.location.hash);
          if (el) {
            el.scrollIntoView(hashScrollIntoViewOptions);
          }
        }
      }
    }
  }, [isAnyPending, previousIsAnyPending, router]);
  return null;
}

// node_modules/@tanstack/react-router/dist/esm/Matches.js
var isMatch = (match, path) => {
  const parts = path.split(".");
  let part;
  let value = match;
  while ((part = parts.shift()) != null && value != null) {
    value = value[part];
  }
  return value != null;
};
function Matches() {
  const router = useRouter();
  const pendingElement = router.options.defaultPendingComponent ? (0, import_jsx_runtime10.jsx)(router.options.defaultPendingComponent, {}) : null;
  const ResolvedSuspense = router.isServer || typeof document !== "undefined" && window.__TSR__ ? SafeFragment : React13.Suspense;
  const inner = (0, import_jsx_runtime10.jsxs)(ResolvedSuspense, { fallback: pendingElement, children: [
    (0, import_jsx_runtime10.jsx)(Transitioner, {}),
    (0, import_jsx_runtime10.jsx)(MatchesInner, {})
  ] });
  return router.options.InnerWrap ? (0, import_jsx_runtime10.jsx)(router.options.InnerWrap, { children: inner }) : inner;
}
function MatchesInner() {
  const matchId = useRouterState({
    select: (s) => {
      var _a;
      return (_a = s.matches[0]) == null ? void 0 : _a.id;
    }
  });
  const resetKey = useRouterState({
    select: (s) => s.loadedAt
  });
  return (0, import_jsx_runtime10.jsx)(matchContext.Provider, { value: matchId, children: (0, import_jsx_runtime10.jsx)(
    CatchBoundary,
    {
      getResetKey: () => resetKey,
      errorComponent: ErrorComponent,
      onCatch: (error) => {
        tiny_warning_esm_default(
          false,
          `The following error wasn't caught by any route! At the very least, consider setting an 'errorComponent' in your RootRoute!`
        );
        tiny_warning_esm_default(false, error.message || error.toString());
      },
      children: matchId ? (0, import_jsx_runtime10.jsx)(Match, { matchId }) : null
    }
  ) });
}
function useMatchRoute() {
  const router = useRouter();
  useRouterState({
    select: (s) => [s.location.href, s.resolvedLocation.href, s.status],
    structuralSharing: true
  });
  return React13.useCallback(
    (opts) => {
      const { pending, caseSensitive, fuzzy, includeSearch, ...rest } = opts;
      return router.matchRoute(rest, {
        pending,
        caseSensitive,
        fuzzy,
        includeSearch
      });
    },
    [router]
  );
}
function MatchRoute(props) {
  const matchRoute = useMatchRoute();
  const params = matchRoute(props);
  if (typeof props.children === "function") {
    return props.children(params);
  }
  return params ? props.children : null;
}
function useMatches(opts) {
  return useRouterState({
    select: (state) => {
      const matches = state.matches;
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}
function useParentMatches(opts) {
  const contextMatchId = React13.useContext(matchContext);
  return useMatches({
    select: (matches) => {
      matches = matches.slice(
        0,
        matches.findIndex((d) => d.id === contextMatchId)
      );
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}
function useChildMatches(opts) {
  const contextMatchId = React13.useContext(matchContext);
  return useMatches({
    select: (matches) => {
      matches = matches.slice(
        matches.findIndex((d) => d.id === contextMatchId) + 1
      );
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}

// node_modules/@tanstack/react-router/dist/esm/RouterProvider.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
function RouterContextProvider({
  router,
  children,
  ...rest
}) {
  router.update({
    ...router.options,
    ...rest,
    context: {
      ...router.options.context,
      ...rest.context
    }
  });
  const routerContext2 = getRouterContext();
  const provider = (0, import_jsx_runtime11.jsx)(routerContext2.Provider, { value: router, children });
  if (router.options.Wrap) {
    return (0, import_jsx_runtime11.jsx)(router.options.Wrap, { children: provider });
  }
  return provider;
}
function RouterProvider({ router, ...rest }) {
  return (0, import_jsx_runtime11.jsx)(RouterContextProvider, { router, ...rest, children: (0, import_jsx_runtime11.jsx)(Matches, {}) });
}

// node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js
var React14 = __toESM(require_react(), 1);
var useLayoutEffect4 = typeof window !== "undefined" ? React14.useLayoutEffect : React14.useEffect;
var windowKey = "window";
var delimiter = "___";
var weakScrolledElements = /* @__PURE__ */ new WeakSet();
var sessionsStorage = typeof window !== "undefined" && window.sessionStorage;
var cache = sessionsStorage ? (() => {
  const storageKey = "tsr-scroll-restoration-v2";
  const state = JSON.parse(
    window.sessionStorage.getItem(storageKey) || "null"
  ) || { cached: {}, next: {} };
  return {
    state,
    set: (updater) => {
      cache.state = functionalUpdate(updater, cache.state);
      window.sessionStorage.setItem(storageKey, JSON.stringify(cache.state));
    }
  };
})() : void 0;
var defaultGetKey = (location) => {
  return location.state.key || location.href;
};
function useScrollRestoration(options) {
  const router = useRouter();
  useLayoutEffect4(() => {
    const getKey = (options == null ? void 0 : options.getKey) || defaultGetKey;
    const { history } = window;
    history.scrollRestoration = "manual";
    const onScroll = (event) => {
      if (weakScrolledElements.has(event.target)) return;
      weakScrolledElements.add(event.target);
      let elementSelector = "";
      if (event.target === document || event.target === window) {
        elementSelector = windowKey;
      } else {
        const attrId = event.target.getAttribute(
          "data-scroll-restoration-id"
        );
        if (attrId) {
          elementSelector = `[data-scroll-restoration-id="${attrId}"]`;
        } else {
          elementSelector = getCssSelector(event.target);
        }
      }
      if (!cache.state.next[elementSelector]) {
        cache.set((c) => ({
          ...c,
          next: {
            ...c.next,
            [elementSelector]: {
              scrollX: NaN,
              scrollY: NaN
            }
          }
        }));
      }
    };
    if (typeof document !== "undefined") {
      document.addEventListener("scroll", onScroll, true);
    }
    const unsubOnBeforeLoad = router.subscribe("onBeforeLoad", (event) => {
      if (event.hrefChanged) {
        const restoreKey = getKey(event.fromLocation);
        for (const elementSelector in cache.state.next) {
          const entry = cache.state.next[elementSelector];
          if (elementSelector === windowKey) {
            entry.scrollX = window.scrollX || 0;
            entry.scrollY = window.scrollY || 0;
          } else if (elementSelector) {
            const element = document.querySelector(elementSelector);
            entry.scrollX = (element == null ? void 0 : element.scrollLeft) || 0;
            entry.scrollY = (element == null ? void 0 : element.scrollTop) || 0;
          }
          cache.set((c) => {
            const next = { ...c.next };
            delete next[elementSelector];
            return {
              ...c,
              next,
              cached: {
                ...c.cached,
                [[restoreKey, elementSelector].join(delimiter)]: entry
              }
            };
          });
        }
      }
    });
    const unsubOnBeforeRouteMount = router.subscribe(
      "onBeforeRouteMount",
      (event) => {
        if (event.hrefChanged) {
          if (!router.resetNextScroll) {
            return;
          }
          router.resetNextScroll = true;
          const restoreKey = getKey(event.toLocation);
          let windowRestored = false;
          for (const cacheKey in cache.state.cached) {
            const entry = cache.state.cached[cacheKey];
            const [key, elementSelector] = cacheKey.split(delimiter);
            if (key === restoreKey) {
              if (elementSelector === windowKey) {
                windowRestored = true;
                window.scrollTo(entry.scrollX, entry.scrollY);
              } else if (elementSelector) {
                const element = document.querySelector(elementSelector);
                if (element) {
                  element.scrollLeft = entry.scrollX;
                  element.scrollTop = entry.scrollY;
                }
              }
            }
          }
          if (!windowRestored) {
            window.scrollTo(0, 0);
          }
          cache.set((c) => ({ ...c, next: {} }));
          weakScrolledElements = /* @__PURE__ */ new WeakSet();
        }
      }
    );
    return () => {
      document.removeEventListener("scroll", onScroll);
      unsubOnBeforeLoad();
      unsubOnBeforeRouteMount();
    };
  }, [options == null ? void 0 : options.getKey, router]);
}
function ScrollRestoration(props) {
  useScrollRestoration(props);
  return null;
}
function useElementScrollRestoration(options) {
  var _a;
  const router = useRouter();
  const getKey = options.getKey || defaultGetKey;
  let elementSelector = "";
  if (options.id) {
    elementSelector = `[data-scroll-restoration-id="${options.id}"]`;
  } else {
    const element = (_a = options.getElement) == null ? void 0 : _a.call(options);
    if (!element) {
      return;
    }
    elementSelector = getCssSelector(element);
  }
  const restoreKey = getKey(router.latestLocation);
  const cacheKey = [restoreKey, elementSelector].join(delimiter);
  return cache.state.cached[cacheKey];
}
function getCssSelector(el) {
  const path = [];
  let parent;
  while (parent = el.parentNode) {
    path.unshift(
      `${el.tagName}:nth-child(${[].indexOf.call(parent.children, el) + 1})`
    );
    el = parent;
  }
  return `${path.join(" > ")}`.toLowerCase();
}

// node_modules/@tanstack/react-router/dist/esm/useBlocker.js
var React15 = __toESM(require_react(), 1);
function _resolveBlockerOpts(opts, condition) {
  if (opts === void 0) {
    return {
      shouldBlockFn: () => true,
      withResolver: false
    };
  }
  if ("shouldBlockFn" in opts) {
    return opts;
  }
  if (typeof opts === "function") {
    const shouldBlock2 = Boolean(condition ?? true);
    const _customBlockerFn2 = async () => {
      if (shouldBlock2) return await opts();
      return false;
    };
    return {
      shouldBlockFn: _customBlockerFn2,
      enableBeforeUnload: shouldBlock2,
      withResolver: false
    };
  }
  const shouldBlock = Boolean(opts.condition ?? true);
  const fn = opts.blockerFn;
  const _customBlockerFn = async () => {
    if (shouldBlock && fn !== void 0) {
      return await fn();
    }
    return shouldBlock;
  };
  return {
    shouldBlockFn: _customBlockerFn,
    enableBeforeUnload: shouldBlock,
    withResolver: fn === void 0
  };
}
function useBlocker(opts, condition) {
  const {
    shouldBlockFn,
    enableBeforeUnload = true,
    disabled = false,
    withResolver = false
  } = _resolveBlockerOpts(opts, condition);
  const router = useRouter();
  const { history } = router;
  const [resolver, setResolver] = React15.useState({
    status: "idle",
    current: void 0,
    next: void 0,
    action: void 0,
    proceed: void 0,
    reset: void 0
  });
  React15.useEffect(() => {
    const blockerFnComposed = async (blockerFnArgs) => {
      function getLocation(location) {
        const parsedLocation = router.parseLocation(void 0, location);
        const matchedRoutes = router.getMatchedRoutes(parsedLocation);
        if (matchedRoutes.foundRoute === void 0) {
          throw new Error(`No route found for location ${location.href}`);
        }
        return {
          routeId: matchedRoutes.foundRoute.id,
          fullPath: matchedRoutes.foundRoute.fullPath,
          pathname: parsedLocation.pathname,
          params: matchedRoutes.routeParams,
          search: parsedLocation.search
        };
      }
      const current = getLocation(blockerFnArgs.currentLocation);
      const next = getLocation(blockerFnArgs.nextLocation);
      const shouldBlock = await shouldBlockFn({
        action: blockerFnArgs.action,
        current,
        next
      });
      if (!withResolver) {
        return shouldBlock;
      }
      if (!shouldBlock) {
        return false;
      }
      const promise = new Promise((resolve) => {
        setResolver({
          status: "blocked",
          current,
          next,
          action: blockerFnArgs.action,
          proceed: () => resolve(false),
          reset: () => resolve(true)
        });
      });
      const canNavigateAsync = await promise;
      setResolver({
        status: "idle",
        current: void 0,
        next: void 0,
        action: void 0,
        proceed: void 0,
        reset: void 0
      });
      return canNavigateAsync;
    };
    return disabled ? void 0 : history.block({ blockerFn: blockerFnComposed, enableBeforeUnload });
  }, [shouldBlockFn, enableBeforeUnload, disabled, withResolver, history]);
  return resolver;
}
var _resolvePromptBlockerArgs = (props) => {
  if ("shouldBlockFn" in props) {
    return { ...props };
  }
  const shouldBlock = Boolean(props.condition ?? true);
  const fn = props.blockerFn;
  const _customBlockerFn = async () => {
    if (shouldBlock && fn !== void 0) {
      return await fn();
    }
    return shouldBlock;
  };
  return {
    shouldBlockFn: _customBlockerFn,
    enableBeforeUnload: shouldBlock,
    withResolver: fn === void 0
  };
};
function Block(opts) {
  const { children, ...rest } = opts;
  const args = _resolvePromptBlockerArgs(rest);
  const resolver = useBlocker(args);
  return children ? typeof children === "function" ? children(resolver) : children : null;
}

// node_modules/@tanstack/react-router/dist/esm/useRouteContext.js
function useRouteContext(opts) {
  return useMatch({
    ...opts,
    select: (match) => opts.select ? opts.select(match.context) : match.context
  });
}

// node_modules/@tanstack/react-router/dist/esm/useLocation.js
function useLocation(opts) {
  return useRouterState({
    select: (state) => (opts == null ? void 0 : opts.select) ? opts.select(state.location) : state.location
  });
}

// node_modules/@tanstack/react-router/dist/esm/searchMiddleware.js
function retainSearchParams(keys) {
  return ({ search, next }) => {
    const result = next(search);
    if (keys === true) {
      return { ...search, ...result };
    }
    keys.forEach((key) => {
      if (!(key in result)) {
        result[key] = search[key];
      }
    });
    return result;
  };
}
function stripSearchParams(input) {
  return ({ search, next }) => {
    if (input === true) {
      return {};
    }
    const result = next(search);
    if (Array.isArray(input)) {
      input.forEach((key) => {
        delete result[key];
      });
    } else {
      Object.entries(input).forEach(
        ([key, value]) => {
          if (deepEqual(result[key], value)) {
            delete result[key];
          }
        }
      );
    }
    return result;
  };
}
export {
  Await,
  Block,
  CatchBoundary,
  CatchNotFound,
  DefaultGlobalNotFound,
  ErrorComponent,
  FileRoute,
  FileRouteLoader,
  LazyRoute,
  Link,
  Match,
  MatchRoute,
  Matches,
  Navigate,
  NotFoundRoute,
  Outlet,
  PathParamError,
  RootRoute,
  Route,
  RouteApi,
  Router,
  RouterContextProvider,
  RouterProvider,
  ScriptOnce,
  ScrollRestoration,
  SearchParamError,
  TSR_DEFERRED_PROMISE,
  cleanPath,
  componentTypes,
  createBrowserHistory,
  createControlledPromise,
  createFileRoute,
  createHashHistory,
  createHistory,
  createLazyFileRoute,
  createLazyRoute,
  createLink,
  createMemoryHistory,
  createRootRoute,
  createRootRouteWithContext,
  createRoute,
  createRouteMask,
  createRouter,
  decode,
  deepEqual,
  defaultDeserializeError,
  defaultParseSearch,
  defaultSerializeError,
  defaultStringifySearch,
  defaultTransformer,
  defer,
  encode,
  escapeJSON,
  functionalUpdate,
  getInitialRouterState,
  getRouteApi,
  getRouterContext,
  interpolatePath,
  invariant,
  isMatch,
  isNotFound,
  isPlainArray,
  isPlainObject,
  isRedirect,
  isServerSideError,
  joinPaths,
  lazyFn,
  lazyRouteComponent,
  linkOptions,
  matchByPath,
  matchContext,
  matchPathname,
  notFound,
  parsePathname,
  parseSearchWith,
  pick,
  redirect,
  removeBasepath,
  replaceEqualDeep,
  resolvePath,
  retainSearchParams,
  rootRouteId,
  rootRouteWithContext,
  shallow2 as shallow,
  stringifySearchWith,
  stripSearchParams,
  trimPath,
  trimPathLeft,
  trimPathRight,
  useAwaited,
  useBlocker,
  useChildMatches,
  useElementScrollRestoration,
  useLayoutEffect2 as useLayoutEffect,
  useLinkProps,
  useLoaderData,
  useLoaderDeps,
  useLocation,
  useMatch,
  useMatchRoute,
  useMatches,
  useNavigate,
  useParams,
  useParentMatches,
  useRouteContext,
  useRouter,
  useRouterState,
  useScrollRestoration,
  useSearch,
  useStableCallback,
  tiny_warning_esm_default as warning
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=@tanstack_react-router.js.map
