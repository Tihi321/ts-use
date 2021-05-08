"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = void 0;
var react_1 = require("react");
var utils_1 = require("../utils");
/**
 * For fetching data from api, when data is receive it returns the state
 * @example
 * const { data: randomQuote, loading } = useFetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1", {});
 *
 * const quote = randomQuote;
 * @param {string} url - url of API call
 * @param {any} initialState - optional initial state of data before received from API
 * @return {object} returns object consisting of data and loading state
 */
var useFetch = function (url, initialState) {
    if (initialState === void 0) { initialState = undefined; }
    var _a = react_1.useState(initialState), data = _a[0], setData = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    react_1.useEffect(function () {
        utils_1.fetch(url, function (response) {
            setData(response);
            setLoading(false);
        });
    }, [url]);
    return { data: data, loading: loading };
};
exports.useFetch = useFetch;
//# sourceMappingURL=useFetch.js.map