"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
var react_1 = require("react");
var useLocalStorage = function (key, initialState) {
    if (initialState === void 0) { initialState = null; }
    var _a = react_1.useState(initialState), data = _a[0], setData = _a[1];
    var isWindow = typeof window !== "undefined";
    var isLcalStorage = typeof localStorage !== "undefined";
    react_1.useEffect(function () {
        if (isWindow && isLcalStorage && localStorage.getItem(key) !== null) {
            setData(localStorage.getItem(key));
        }
    }, [isWindow, isLcalStorage, key]);
    var setLocalStorage = function (value) {
        if (isWindow && isLcalStorage) {
            localStorage.setItem(key, value);
            setData(value);
        }
    };
    return {
        data: data,
        setLocalStorage: setLocalStorage
    };
};
exports.useLocalStorage = useLocalStorage;
//# sourceMappingURL=useLocalStorage.js.map