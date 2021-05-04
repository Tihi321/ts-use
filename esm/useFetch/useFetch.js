import { useEffect, useState } from "react";
import { fetch } from "../utils";
export var useFetch = function (url) {
    var _a = useState(), data = _a[0], setData = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    useEffect(function () {
        fetch(url, function (response) {
            setData(response);
            setLoading(false);
        });
    }, [url]);
    return { data: data, loading: loading };
};
//# sourceMappingURL=useFetch.js.map