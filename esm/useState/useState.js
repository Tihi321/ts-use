import { useState } from "react";
import { isEqual } from "lodash";
/**
 * Hook for reactive state, state that react to the changes from initialState
 * @example
 * const [showBoard, setShowBoard] = useReactiveState(show);
 * @param {any} propState - any state that you want to track
 * @return {array} returns state and setState from react
 */
export var useReactiveState = function (propState) {
    var _a = useState(propState), passedValue = _a[0], setPassedValue = _a[1];
    var _b = useState(propState), state = _b[0], setState = _b[1];
    if (!isEqual(passedValue, propState)) {
        setPassedValue(propState);
        setState(propState);
    }
    return [state, setState];
};
//# sourceMappingURL=useState.js.map