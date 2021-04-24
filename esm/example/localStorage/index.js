import React from "react";
import { useLocalStorage } from "../../useLocalStorage";
export var LayoutContainer = function () {
    var _a = useLocalStorage("ts/theme", false), useTheme = _a.data, setUseTheme = _a.setLocalStorage;
    var switchTheme = function () {
        setUseTheme(!useTheme);
    };
    return (React.createElement("button", { type: "button", onClick: switchTheme }, useTheme ? "Is compliant" : "Is not compliant"));
};
//# sourceMappingURL=index.js.map