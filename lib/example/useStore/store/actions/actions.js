"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchTheme = exports.setTheme = void 0;
var useStore_1 = require("../../../../useStore");
var types_1 = require("./types");
var setTheme = function (theme) {
    return useStore_1.createAction(types_1.EActionTypes.ThemeSet, theme);
};
exports.setTheme = setTheme;
var switchTheme = function () { return useStore_1.createAction(types_1.EActionTypes.ThemeSwitch); };
exports.switchTheme = switchTheme;
//# sourceMappingURL=actions.js.map