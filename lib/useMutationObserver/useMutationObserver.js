"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutationObserver = void 0;
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react-hooks/rules-of-hooks */
var map_1 = __importDefault(require("lodash/map"));
var react_1 = require("react");
var tsl_utils_1 = require("tsl-utils");
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
var useMutationObserver = function (mutations, config) {
    if (!tsl_utils_1.isBrowser()) {
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
        map_1.default(mutationsList, function (mutation) {
            if (mutation.type === "childList") {
                onChildList(mutation);
            }
            else if (mutation.type === "attributes") {
                onAttributeName(mutation);
            }
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var observer = react_1.useMemo(function () { return new MutationObserver(callback); }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    react_1.useEffect(function () { return function () { return observer.disconnect(); }; }, []);
    var observe = function (element) {
        return observer.observe(element, configDef);
    };
    return { observe: observe, isBrowser: true };
};
exports.useMutationObserver = useMutationObserver;
//# sourceMappingURL=useMutationObserver.js.map