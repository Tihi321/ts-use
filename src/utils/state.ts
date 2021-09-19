import isEqual from "lodash/isEqual";

import { TState, TValue } from "../typings";

export const generateSelector = (initialState: any) => () => initialState;

const stateFunctionKeyChanged = (state: TState, key: string, value: TValue) => {
  const stateValue = state[key] ? state[key].toString() : state[key];
  const valueToCheck = value ? value.toString() : value;

  return !isEqual(stateValue, valueToCheck);
};
const stateValueKeyChanged = (state: TState, key: string, value: TValue) =>
  !isEqual(state[key], value);

export const stateKeyChanged = (state: TState, key: string, value: TValue) =>
  typeof value === "function"
    ? stateFunctionKeyChanged(state, key, value)
    : stateValueKeyChanged(state, key, value);
