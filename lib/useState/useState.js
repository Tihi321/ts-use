"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReactiveState = void 0;
var react_1 = require("react");
/**
 * Hook for reactive state, state that react to the changes from initialState
 * @example
 * const [showBoard, setShowBoard] = useReactiveState(show);
 * @param {any} propState - any state that you want to track
 * @return {array} returns state and setState from react
 */
var useReactiveState = function (propState) {
    var _a = react_1.useState(propState), state = _a[0], setState = _a[1];
    var propMemoState = react_1.useMemo(function () { return propState; }, [propState]);
    react_1.useEffect(function () {
        setState(propMemoState);
    }, [propMemoState]);
    return [state, setState];
};
exports.useReactiveState = useReactiveState;
//# sourceMappingURL=useState.js.map