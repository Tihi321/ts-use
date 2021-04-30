"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnimationEvents = void 0;
var react_1 = require("react");
/**
 * It counts number of animations, returns exited when second exit animation has ended, used to make sure component is off screen before unmounting
 * @example
 * const { exited, onAnimationEnd } = useAnimationEvents();
 *
 * return (
 *  <StatusBoardContainerStyled
 *   onAnimationEnd={onAnimationEnd}
 *   show={showBoard}
 *  >
 *   ...
 *  </StatusBoardContainerStyled>
 * );
 * @example
 * const { onAnimationEnd } = useAnimationEvents({ onExit: onExitCallback });
 * @param {object} {delay?: number, onExit?: function} - (Optional) delay visible number in miliseconds, onExit callback to run whn component is hidden
 * @return {object} returns exited state and onAnimationEnd function to add to component onAnimationEnd prop
 */
var useAnimationEvents = function (props) {
    var defaultDelay = (props === null || props === void 0 ? void 0 : props.delay) || 0;
    var defaultOnExit = props === null || props === void 0 ? void 0 : props.onExit;
    var _a = react_1.useState(true), exited = _a[0], setExited = _a[1];
    var _b = react_1.useState(false), startAnimationEnded = _b[0], setStartAnimationEnded = _b[1];
    var onExitCallback = react_1.useCallback(defaultOnExit, [defaultOnExit]);
    var onAnimationEnd = function () {
        if (startAnimationEnded) {
            setTimeout(function () { return setExited(false); }, defaultDelay);
            return;
        }
        setStartAnimationEnded(true);
    };
    react_1.useEffect(function () {
        if (!exited && onExitCallback) {
            onExitCallback();
        }
    }, [exited, onExitCallback]);
    return { exited: exited, onAnimationEnd: onAnimationEnd };
};
exports.useAnimationEvents = useAnimationEvents;
//# sourceMappingURL=useAnimationEvents.js.map