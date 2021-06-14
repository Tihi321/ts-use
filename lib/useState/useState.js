"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReactiveState = void 0;
var react_1 = require("react");
var lodash_1 = require("lodash");
/**
 * Hook for reactive state, state that react to the changes from initialState
 * @example
 * const [showBoard, setShowBoard] = useReactiveState(show);
 * @param {any} propState - any state that you want to track
 * @return {array} returns state and setState from react
 */
var useReactiveState = function (propState) {
    var _a = react_1.useState(propState), passedValue = _a[0], setPassedValue = _a[1];
    var _b = react_1.useState(propState), state = _b[0], setState = _b[1];
    if (!lodash_1.isEqual(passedValue, propState)) {
        setPassedValue(propState);
        setState(propState);
    }
    return [state, setState];
};
exports.useReactiveState = useReactiveState;
//# sourceMappingURL=useState.js.map