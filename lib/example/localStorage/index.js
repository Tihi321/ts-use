"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutContainer = void 0;
var react_1 = __importDefault(require("react"));
var useLocalStorage_1 = require("../../useLocalStorage");
var LayoutContainer = function () {
    var _a = useLocalStorage_1.useLocalStorage("ts/theme", false), useTheme = _a.data, setUseTheme = _a.setLocalStorage;
    var switchTheme = function () {
        setUseTheme(!useTheme);
    };
    return (react_1.default.createElement("button", { type: "button", onClick: switchTheme }, useTheme ? "Is compliant" : "Is not compliant"));
};
exports.LayoutContainer = LayoutContainer;
//# sourceMappingURL=index.js.map