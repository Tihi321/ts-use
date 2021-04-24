import { EActionTypes } from "./types";
export var setTheme = function (theme) { return ({
    type: EActionTypes.ThemeSet,
    payload: theme
}); };
export var switchTheme = function () { return ({
    type: EActionTypes.ThemeSwitch
}); };
//# sourceMappingURL=actions.js.map