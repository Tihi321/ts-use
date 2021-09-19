"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReactiveState = void 0;
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var react_1 = require("react");
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
    if (!isEqual_1.default(passedValue, propState)) {
        setPassedValue(propState);
        setState(propState);
    }
    return [state, setState];
};
exports.useReactiveState = useReactiveState;
//# sourceMappingURL=useState.js.map