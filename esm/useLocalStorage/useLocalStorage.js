import { useEffect, useState } from "react";
import { isBrowser } from "../utils";
export var useLocalStorage = function (key, initialState, updateData) {
    if (initialState === void 0) { initialState = null; }
    if (updateData === void 0) { updateData = true; }
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
//# sourceMappingURL=useLocalStorage.js.map