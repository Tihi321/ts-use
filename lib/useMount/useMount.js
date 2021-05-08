"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMount = void 0;
var lodash_1 = require("lodash");
var react_1 = require("react");
/**
 * This hook returns state after first mount, takes optional callback to run, it can be resolved with promise
 * @example
 * let timeout: NodeJS.Timeout;
 *
 * const mounted = useMount(
 *   {
 *     onMount: () => {
 *      ... code to execute on resolve
 *     },
 *     onPromise: resolve => {
 *       timeout = setTimeout(() => {
 *         clearTimeout(timeout);
 *         resolve();
 *       }, 500);
 *     }
 *   },
 *   () => {
 *     clearTimeout(timeout);
 *   }
 * );
 * @param {Function | TUseMountOptions} options - it can be function to called after first mount, or object with optional onPromise callback that returns resolve, after resolve hook returns true and run optional onMount callback
 * @param {Function} onUnMount - optional function to be called on unmount
 * @return {boolean} returns mounted state true after second render or after custom resolve
 */
var useMount = function (options, onUnMount) {
    var _a = react_1.useState(false), componentMount = _a[0], setComponentMount = _a[1];
    var _b = react_1.useState(false), mounted = _b[0], setMounted = _b[1];
    var onMount = function () {
        if (lodash_1.isFunction(options)) {
            options();
            return;
        }
        var callbackOptions = options;
        if (callbackOptions.onMount && lodash_1.isFunction(callbackOptions.onMount)) {
            callbackOptions.onMount();
        }
    };
    react_1.useEffect(function () {
        if (!lodash_1.isFunction(options)) {
            var callbackOptions_1 = options;
            if (callbackOptions_1.onPromise && lodash_1.isFunction(callbackOptions_1.onPromise)) {
                new Promise(function (resolve) { return callbackOptions_1.onPromise(resolve); }).then(function () {
                    return setComponentMount(true);
                });
                return;
            }
        }
        setComponentMount(true);
        // eslint-disable-next-line consistent-return
        return function () {
            if (onUnMount && lodash_1.isFunction(onUnMount)) {
                onUnMount();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    react_1.useEffect(function () {
        if (componentMount) {
            onMount();
            setMounted(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [componentMount]);
    return mounted;
};
exports.useMount = useMount;
//# sourceMappingURL=useMount.js.map