import { createAction } from "../../../../useStore";
import { EActionTypes } from "./types";
export var setTheme = function (theme) {
    return createAction(EActionTypes.ThemeSet, theme);
};
export var switchTheme = function () { return createAction(EActionTypes.ThemeSwitch); };
//# sourceMappingURL=actions.js.map