import { useEffect, useMemo, useState } from "react";
/**
 * Hook for reactive state, state that react to the changes from initialState
 * @example
 * const [showBoard, setShowBoard] = useReactiveState(show);
 * @param {any} propState - any state that you want to track
 * @return {array} returns state and setState from react
 */
export var useReactiveState = function (propState) {
    var _a = useState(propState), state = _a[0], setState = _a[1];
    var propMemoState = useMemo(function () { return propState; }, [propState]);
    useEffect(function () {
        setState(propMemoState);
    }, [propMemoState]);
    return [state, setState];
};
//# sourceMappingURL=useState.js.map