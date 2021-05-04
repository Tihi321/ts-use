"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = void 0;
var react_1 = require("react");
var utils_1 = require("../utils");
var useFetch = function (url) {
    var _a = react_1.useState(), data = _a[0], setData = _a[1];
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