import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import nodeFetch from "node-fetch";
import { isBrowser } from "./window";
export var fetch = function (url, toCall, nodeFetchCallback) {
    if (nodeFetchCallback === void 0) { nodeFetchCallback = nodeFetch; }
    var fetchData = isBrowser() && window.fetch ? window.fetch : nodeFetchCallback;
    if (typeof url === "string") {
        fetchData(url).then(function (response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            toCall(response.json());
        });
    }
    else {
        var fetchUrl = void 0;
        var urlString = get(url, "url");
        var urlQuery = get(url, "query");
        if (!isEmpty(urlQuery)) {
            var queryString = map(urlQuery, function (values) {
                var key = get(values, "key");
                var value = get(values, "value");
                return isEmpty(value) ? key : key + "=" + value;
            }).join("&");
            fetchUrl = urlString + "?" + queryString;
        }
        else {
            fetchUrl = urlString;
        }
        fetchData(fetchUrl, get(url, "options")).then(function (response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            toCall(response.json());
        });
    }
};
//# sourceMappingURL=fetch.js.map