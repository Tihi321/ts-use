import isEqual from "lodash/isEqual";
export { generateSelector } from "tsl-utils";
var stateFunctionKeyChanged = function (state, key, value) {
    var stateValue = state[key] ? state[key].toString() : state[key];
    var valueToCheck = value ? value.toString() : value;
    return !isEqual(stateValue, valueToCheck);
};
var stateValueKeyChanged = function (state, key, value) {
    return !isEqual(state[key], value);
};
export var stateKeyChanged = function (state, key, value) {
    return typeof value === "function"
        ? stateFunctionKeyChanged(state, key, value)
        : stateValueKeyChanged(state, key, value);
};
//# sourceMappingURL=state.js.map