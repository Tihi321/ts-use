"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePromiseMap = void 0;
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var react_1 = require("react");
var tsl_utils_1 = require("tsl-utils");
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
var usePromiseMap = function () {
    var _a = react_1.useState([]), data = _a[0], setData = _a[1];
    var promiseMap = function (_a) {
        var _b = _a.items, items = _b === void 0 ? [] : _b, promise = _a.promise, result = _a.result;
        if (!isEmpty_1.default(items)) {
            tsl_utils_1.orderedPromiseAll(items, promise, result).then(function (response) {
                setData(response);
            });
        }
    };
    return {
        promiseMap: promiseMap,
        data: data
    };
};
exports.usePromiseMap = usePromiseMap;
//# sourceMappingURL=usePromiseMap.js.map