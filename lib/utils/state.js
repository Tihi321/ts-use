import { isEqual } from "lodash";
export const generateSelector = (initialState) => () => initialState;
const stateFunctionKeyChanged = (state, key, value) => {
    const stateValue = state[key] ? state[key].toString() : state[key];
    const valueToCheck = value ? value.toString() : value;
    return !isEqual(stateValue, valueToCheck);
};
const stateValueKeyChanged = (state, key, value) => !isEqual(state[key], value);
export const stateKeyChanged = (state, key, value) => typeof value === "function"
    ? stateFunctionKeyChanged(state, key, value)
    : stateValueKeyChanged(state, key, value);
//# sourceMappingURL=state.js.map