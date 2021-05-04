"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomQuote = void 0;
var react_1 = __importDefault(require("react"));
var useFetch_1 = require("../../useFetch");
var RandomQuote = function () {
    var _a = useFetch_1.useFetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1"), randomQuote = _a.data, loading = _a.loading;
    var quote = randomQuote;
    return react_1.default.createElement("div", null, !loading && randomQuote ? quote.quotes : "Loading");
};
exports.RandomQuote = RandomQuote;
//# sourceMappingURL=index.js.map