import React, { useState } from "react";
import { useAnimation } from "../../useAnimation";
export var BoardPanel = function () {
    var _a = useState(false), startAnimation = _a[0], setStartAnimation = _a[1];
    var _b = useAnimation(), visible = _b.visible, onAnimationEnd = _b.onAnimationEnd;
    var onButtonClick = function () {
        setStartAnimation(false);
    };
    return (React.createElement("button", { type: "button", className: startAnimation ? "startAnimation" : "exitAnimatino", onAnimationEnd: onAnimationEnd, onClick: onButtonClick }, visible ? "Visible" : "Invisible"));
};
//# sourceMappingURL=index.js.map