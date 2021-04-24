"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeContainer = void 0;
var react_1 = __importDefault(require("react"));
var useStore_1 = require("../../useStore");
var store_1 = require("./store");
var ThemeContainer = function () {
    var theme = useStore_1.useReducerSelector(store_1.getTheme);
    var dispatch = useStore_1.useReducerStore().dispatch;
    var themeData = theme === store_1.ETheme.Dark ? "Dark" : "Light";
    return (react_1.default.createElement("button", { type: "button", onClick: function () { return dispatch(store_1.switchTheme()); } }, themeData));
};
exports.ThemeContainer = ThemeContainer;
exports.default = useStore_1.withReducerProvider(store_1.reducer, store_1.initialState)(exports.ThemeContainer);
//# sourceMappingURL=index.js.map