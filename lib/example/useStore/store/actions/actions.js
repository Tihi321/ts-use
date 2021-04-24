"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchTheme = exports.setTheme = void 0;
var types_1 = require("./types");
var setTheme = function (theme) { return ({
    type: types_1.EActionTypes.ThemeSet,
    payload: theme
}); };
exports.setTheme = setTheme;
var switchTheme = function () { return ({
    type: types_1.EActionTypes.ThemeSwitch
}); };
exports.switchTheme = switchTheme;
//# sourceMappingURL=actions.js.map