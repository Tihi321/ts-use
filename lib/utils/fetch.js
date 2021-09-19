"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = void 0;
var get_1 = __importDefault(require("lodash/get"));
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var map_1 = __importDefault(require("lodash/map"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var window_1 = require("./window");
var fetch = function (url, toCall, nodeFetchCallback) {
    if (nodeFetchCallback === void 0) { nodeFetchCallback = node_fetch_1.default; }
    var fetchData = window_1.isBrowser() && window.fetch ? window.fetch : nodeFetchCallback;
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
        var urlString = get_1.default(url, "url");
        var urlQuery = get_1.default(url, "query");
        if (!isEmpty_1.default(urlQuery)) {
            var queryString = map_1.default(urlQuery, function (values) {
                var key = get_1.default(values, "key");
                var value = get_1.default(values, "value");
                return isEmpty_1.default(value) ? key : key + "=" + value;
            }).join("&");
            fetchUrl = urlString + "?" + queryString;
        }
        else {
            fetchUrl = urlString;
        }
        fetchData(fetchUrl, get_1.default(url, "options")).then(function (response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            toCall(response.json());
        });
    }
};
exports.fetch = fetch;
//# sourceMappingURL=fetch.js.map