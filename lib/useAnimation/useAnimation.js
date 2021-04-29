"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnimation = void 0;
var react_1 = require("react");
var useAnimation = function (props) {
    var defaultDelay = (props === null || props === void 0 ? void 0 : props.delay) || 0;
    var defaultOnHidden = props === null || props === void 0 ? void 0 : props.onHidden;
    var _a = react_1.useState(true), visible = _a[0], setVisible = _a[1];
    var _b = react_1.useState(false), startAnimationEnded = _b[0], setStartAnimationEnded = _b[1];
    var onPropsHidden = react_1.useCallback(defaultOnHidden, [defaultOnHidden]);
    var onAnimationEnd = function () {
        if (startAnimationEnded) {
            setTimeout(function () { return setVisible(false); }, defaultDelay);
            return;
        }
        setStartAnimationEnded(true);
    };
    react_1.useEffect(function () {
        if (!visible && onPropsHidden) {
            onPropsHidden();
        }
    }, [visible, onPropsHidden]);
    return { visible: visible, onAnimationEnd: onAnimationEnd };
};
exports.useAnimation = useAnimation;
//# sourceMappingURL=useAnimation.js.map