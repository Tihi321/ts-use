import nodeFetch from "node-fetch";
import { isBrowser } from "./window";
export var fetch = function (url, toCall) {
    var fetchData = isBrowser() ? window.fetch : nodeFetch;
    fetchData(url).then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        toCall(response.json());
    });
};
//# sourceMappingURL=fetch.js.map