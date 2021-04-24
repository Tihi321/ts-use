import React from "react";
import { useReducerSelector, useReducerStore, withReducerProvider } from "../../useStore";
import { ETheme, getTheme, initialState, reducer, switchTheme } from "./store";
export var ThemeContainer = function () {
    var theme = useReducerSelector(getTheme);
    var dispatch = useReducerStore().dispatch;
    var themeData = theme === ETheme.Dark ? "Dark" : "Light";
    return (React.createElement("button", { type: "button", onClick: function () { return dispatch(switchTheme()); } }, themeData));
};
export default withReducerProvider(reducer, initialState)(ThemeContainer);
//# sourceMappingURL=index.js.map