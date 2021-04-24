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
import { EActionTypes } from "../actions";
import { ETheme } from "../enums";
export var initialState = {
    theme: ETheme.Dark
};
export var reducer = function (state, _a) {
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case EActionTypes.ThemeSet:
            return __assign(__assign({}, state), { theme: payload });
        case EActionTypes.ThemeSwitch:
            return __assign(__assign({}, state), { theme: state.theme === ETheme.Light ? ETheme.Dark : ETheme.Light });
        default:
            throw new Error();
    }
};
//# sourceMappingURL=index.js.map