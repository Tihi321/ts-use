"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var window_1 = require("./window");
var fetch = function (url, toCall) {
    var fetchData = window_1.isBrowser() ? window.fetch : node_fetch_1.default;
    fetchData(url).then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        toCall(response.json());
    });
};
exports.fetch = fetch;
//# sourceMappingURL=fetch.js.map