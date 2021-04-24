"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.initialState = void 0;
var actions_1 = require("../actions");
var enums_1 = require("../enums");
exports.initialState = {
    theme: enums_1.ETheme.Dark
};
var reducer = function (state, _a) {
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case actions_1.EActionTypes.ThemeSet:
            return __assign(__assign({}, state), { theme: payload });
        case actions_1.EActionTypes.ThemeSwitch:
            return __assign(__assign({}, state), { theme: state.theme === enums_1.ETheme.Light ? enums_1.ETheme.Dark : enums_1.ETheme.Light });
        default:
            throw new Error();
    }
};
exports.reducer = reducer;
//# sourceMappingURL=index.js.map