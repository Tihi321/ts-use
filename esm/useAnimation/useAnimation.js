import { useCallback, useEffect, useState } from "react";
export var useAnimation = function (props) {
    var defaultDelay = (props === null || props === void 0 ? void 0 : props.delay) || 0;
    var defaultOnHidden = props === null || props === void 0 ? void 0 : props.onHidden;
    var _a = useState(true), visible = _a[0], setVisible = _a[1];
    var _b = useState(false), startAnimationEnded = _b[0], setStartAnimationEnded = _b[1];
    var onPropsHidden = useCallback(defaultOnHidden, [defaultOnHidden]);
    var onAnimationEnd = function () {
        if (startAnimationEnded) {
            setTimeout(function () { return setVisible(false); }, defaultDelay);
            return;
        }
        setStartAnimationEnded(true);
    };
    useEffect(function () {
        if (!visible && onPropsHidden) {
            onPropsHidden();
        }
    }, [visible, onPropsHidden]);
    return { visible: visible, onAnimationEnd: onAnimationEnd };
};
//# sourceMappingURL=useAnimation.js.map