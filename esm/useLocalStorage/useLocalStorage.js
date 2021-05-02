import { useEffect, useState } from "react";
import { isBrowser } from "../utils";
export var useLocalStorage = function (key, initialState) {
    if (initialState === void 0) { initialState = null; }
    var _a = useState(initialState), data = _a[0], setData = _a[1];
    var isWindow = isBrowser();
    var isLcalStorage = typeof localStorage !== "undefined";
    useEffect(function () {
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
//# sourceMappingURL=useLocalStorage.js.map