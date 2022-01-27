import isEmpty from "lodash/isEmpty";
import { useState } from "react";
import { orderedPromiseAll } from "tsl-utils";
/**
 * Resolves array of promises within react in a non blocking way. Returns data array after all promises have been resolved. Use within
 * @example
 * const { data, promiseMap } = usePromiseMap();
 * const arrayOfPaths = ["path", "path2", "path3"];
 *
 *
 * useEffect(() => {
 *   promiseMap({
 *     items: arrayOfPaths,
 *     promise: async (path) => { const someAsyncResult = await getAsyncData(path); return someAsyncResult; },
 *     result: (path, asyncPathResult, index) => ({
 *        path,
 *        asyncPathResult,
 *        index
 *     })
 *   })
 * }, [arrayOfPaths.length]);
 * @return {object} returns object consisting of data and promiseMap function that takes items, promise callback that is going to be called on each item in a loop, function should return promise that after it resolves last parameter result function is called with arguments of item, result of promise and index, result of that function is added in output array. After all items/promises are resolved array is returned
 */
export var usePromiseMap = function () {
    var _a = useState([]), data = _a[0], setData = _a[1];
    var promiseMap = function (_a) {
        var _b = _a.items, items = _b === void 0 ? [] : _b, promise = _a.promise, result = _a.result;
        if (!isEmpty(items)) {
            orderedPromiseAll(items, promise, result).then(function (response) {
                setData(response);
            });
        }
    };
    return {
        promiseMap: promiseMap,
        data: data
    };
};
//# sourceMappingURL=usePromiseMap.js.map