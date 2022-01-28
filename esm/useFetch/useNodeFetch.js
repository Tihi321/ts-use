import isEmpty from "lodash/isEmpty";
import nodeFetch from "node-fetch";
import { useEffect, useMemo, useState } from "react";
import { fetchApi, isBrowser } from "tsl-utils";
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
export var useNodeFetch = function (url, initialState) {
    if (initialState === void 0) { initialState = undefined; }
    var _a = useState(initialState), data = _a[0], setData = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(true), refetch = _c[0], setRefetch = _c[1];
    var urlMemo = useMemo(function () { return url; }, [url]);
    useEffect(function () {
        if (!isEmpty(urlMemo)) {
            fetchApi({
                url: urlMemo,
                toCall: function (response) {
                    setData(response);
                    setLoading(false);
                },
                callFunction: isBrowser() ? window.fetch : nodeFetch
            });
        }
    }, [urlMemo, refetch]);
    return { data: data, loading: loading, refetch: function () { return setRefetch(!refetch); } };
};
//# sourceMappingURL=useNodeFetch.js.map