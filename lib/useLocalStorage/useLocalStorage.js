"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
var react_1 = require("react");
var tsl_utils_1 = require("tsl-utils");
var useLocalStorage = function (key, initialState, updateData) {
    if (initialState === void 0) { initialState = null; }
    if (updateData === void 0) { updateData = true; }
    var _a = react_1.useState(initialState), data = _a[0], setData = _a[1];
    var isWindow = tsl_utils_1.isBrowser();
    var isLcalStorage = typeof localStorage !== "undefined";
    react_1.useEffect(function () {
        if (isWindow && isLcalStorage && localStorage.getItem(key) !== null) {
            setData(localStorage.getItem(key));
        }
    }, [isWindow, isLcalStorage, key]);
    var setLocalStorage = function (value) {
        if (isWindow && isLcalStorage) {
            localStorage.setItem(key, value);
            if (updateData) {
                setData(value);
            }
        }
    };
    return {
        data: data,
        setLocalStorage: setLocalStorage
    };
};
exports.useLocalStorage = useLocalStorage;
//# sourceMappingURL=useLocalStorage.js.map