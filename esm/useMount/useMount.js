import isFunction from "lodash/isFunction";
import { useEffect, useState } from "react";
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
export var useMount = function (options, onUnMount) {
    var _a = useState(false), componentMount = _a[0], setComponentMount = _a[1];
    var _b = useState(false), mounted = _b[0], setMounted = _b[1];
    var onMount = function () {
        if (isFunction(options)) {
            options();
            return;
        }
        var callbackOptions = options;
        if (callbackOptions.onMount && isFunction(callbackOptions.onMount)) {
            callbackOptions.onMount();
        }
    };
    useEffect(function () {
        if (!isFunction(options)) {
            var callbackOptions_1 = options;
            if (callbackOptions_1.onPromise && isFunction(callbackOptions_1.onPromise)) {
                new Promise(function (resolve) { return callbackOptions_1.onPromise(resolve); }).then(function () {
                    return setComponentMount(true);
                });
                return;
            }
        }
        setComponentMount(true);
        // eslint-disable-next-line consistent-return
        return function () {
            if (onUnMount && isFunction(onUnMount)) {
                onUnMount();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(function () {
        if (componentMount) {
            onMount();
            setMounted(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [componentMount]);
    return mounted;
};
//# sourceMappingURL=useMount.js.map