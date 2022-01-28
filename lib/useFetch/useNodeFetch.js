"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNodeFetch = void 0;
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var react_1 = require("react");
var tsl_utils_1 = require("tsl-utils");
/**
 * For fetching data from api, when data is receive it returns the state with support for node when in node enviroment
 * @example
 * const { data: randomQuote, loading } = useFetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1", {});
 *
 * const quote = randomQuote;
 * @param {string} url - url of API call
 * @param {any} initialState - optional initial state of data before received from API
 * @return {object} returns object consisting of data and loading state
 */
var useNodeFetch = function (url, initialState) {
    if (initialState === void 0) { initialState = undefined; }
    var _a = react_1.useState(initialState), data = _a[0], setData = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(true), refetch = _c[0], setRefetch = _c[1];
    var urlMemo = react_1.useMemo(function () { return url; }, [url]);
    react_1.useEffect(function () {
        if (!isEmpty_1.default(urlMemo)) {
            tsl_utils_1.fetchApi({
                url: urlMemo,
                toCall: function (response) {
                    setData(response);
                    setLoading(false);
                },
                callFunction: tsl_utils_1.isBrowser() ? window.fetch : node_fetch_1.default
            });
        }
    }, [urlMemo, refetch]);
    return { data: data, loading: loading, refetch: function () { return setRefetch(!refetch); } };
};
exports.useNodeFetch = useNodeFetch;
//# sourceMappingURL=useNodeFetch.js.map