// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react-hooks/rules-of-hooks */
import map from "lodash/map";
import { useEffect, useMemo } from "react";
import { isBrowser } from "tsl-utils";
/**
 * Use mutation Observer with this hook in react. Safe with SSR rendering
 * @example
 * const [reveal, setReveal] = useState(false);
 * const observerElement = useRef(undefined as any);
 * useMutationObserver({
 *   onChildList: () => {
 *     setReveal(true);
 *   }
 * });
 * useEffect(() => {
 *   if (observe) {
 *     observe(observerElement.current);
 *   }
 * }, []);
 * @param {Object} mutations - object with 2 optional callbacks that will be called eather when child or attribute mutations are triggered, they pass mutation object to callback function
 * @param {object} config (Optional) config object, on what should be observed. Keys are attributes , childList and subtree
 * @return {object} return observe function that accepts HTMLElement to observe, if SSR observe will return undefined. It returns isBrowser boolean for checking
 */
export var useMutationObserver = function (mutations, config) {
    if (!isBrowser()) {
        return { observe: undefined, isBrowser: false };
    }
    var configDef = config || {
        attributes: true,
        childList: true,
        subtree: true
    };
    var onChildList = function (mutation) {
        if (mutations.onChildList) {
            mutations.onChildList(mutation);
        }
    };
    var onAttributeName = function (mutation) {
        if (mutations.onAttributeName) {
            mutations.onAttributeName(mutation);
        }
    };
    var callback = function (mutationsList) {
        map(mutationsList, function (mutation) {
            if (mutation.type === "childList") {
                onChildList(mutation);
            }
            else if (mutation.type === "attributes") {
                onAttributeName(mutation);
            }
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var observer = useMemo(function () { return new MutationObserver(callback); }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(function () { return function () { return observer.disconnect(); }; }, []);
    var observe = function (element) {
        return observer.observe(element, configDef);
    };
    return { observe: observe, isBrowser: true };
};
//# sourceMappingURL=useMutationObserver.js.map