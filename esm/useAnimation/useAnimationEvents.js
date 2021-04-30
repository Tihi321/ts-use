import { useCallback, useEffect, useState } from "react";
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
export var useAnimationEvents = function (props) {
    var defaultDelay = (props === null || props === void 0 ? void 0 : props.delay) || 0;
    var defaultOnExit = props === null || props === void 0 ? void 0 : props.onExit;
    var _a = useState(true), exited = _a[0], setExited = _a[1];
    var _b = useState(false), startAnimationEnded = _b[0], setStartAnimationEnded = _b[1];
    var onExitCallback = useCallback(defaultOnExit, [defaultOnExit]);
    var onAnimationEnd = function () {
        if (startAnimationEnded) {
            setTimeout(function () { return setExited(false); }, defaultDelay);
            return;
        }
        setStartAnimationEnded(true);
    };
    useEffect(function () {
        if (!exited && onExitCallback) {
            onExitCallback();
        }
    }, [exited, onExitCallback]);
    return { exited: exited, onAnimationEnd: onAnimationEnd };
};
//# sourceMappingURL=useAnimationEvents.js.map