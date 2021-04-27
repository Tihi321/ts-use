import { isEqual } from "lodash";
import React, { useContext, useMemo, useState } from "react";

import {
  IStateProvider,
  TKeyValueChanged,
  TOnStateChange,
  TOnStateKeyChange,
  TOnStateKeysChange,
  TSelector,
  TStateProviderHOC,
  TStateUseStore
} from "../typings";
import { generateSelector, stateKeyChanged } from "../utils";
import { initialContextState, StateContext } from "./context";

/**
 * @typedef {object} ReturnObject
 * @property {object} state - State object
 * @property {function} stateSelector - state in a form of a selector
 * @property {function} setState -  setState function from react
 * @property {function} stateKeyValueChanged -  takes a key and values and checks if value updated with that key in state and returns boolean
 * @property {function} onStateChange - receives the callback and newState, checks if newState is same as old and runs callback with newUpdatedState, with these function state is reactive to state from api
 * @property {function} onStateKeyChange - receives the callback, checks the store with provided key if state object value is updated and runs provided callback with newUpdatedState
 * @property {function} onStateObjectChange - receives the object state or part of the state and callback, checks if state updated then it call the callback with new state
 */

/**
 * A store hook that works with StateProvider, if used with getHooks this needs to be in top package under withStateProvider component, you can check status panel package useContextState hook for more details
 * @example
 * const { setState, stateKeyValueChanged, onStateKeyChange } = useStateStore();
 * const { data: quotes } = useGetData("quotesApi");
 * const stateChanged = stateKeyValueChanged("quotes", quotes);
 * onStateKeyChange("quotes", quotes, newState => setState(newState));
 * if (stateChanged) {
 *  // ... some code
 * }
 * @example
 * const { setState, onStateObjectChange } = useStateStore();
 *  onStateObjectChange(
 *  {
 *    theme: themeData,
 *    quotes: quotesData,
 *  },
 *  newState => setState(newState)
 * )
 * @example
 * const { stateSelector } = useStateStore();
 *
 * // useSelector from redux, used with createSelector
 * const data = useSelector(getDataWith(stateSelector));
 * @example
 * const { dispatch } = useReducerStore();
 * onClick{() => dispatch(switchTheme()}
 * @return {ReturnObject} {
 * state {object} - State object,
 * stateSelector {function} - state in a form of a selector,
 * setState {function} - setState function from react,
 * stateKeyValueChanged {function} - takes a key and values and checks if value updated with that key in state and returns boolean,
 * onStateChange {function} - receives the callback and newState, checks if newState is same as old and runs callback with newUpdatedState, with these function state is reactive to state from api
 * onStateKeyChange {function} - receives the callback, checks the store with provided key if state object value is updated and runs provided callback with newUpdatedState
 * onStateObjectChange {function} - receives the object state or part of the state and callback, checks if state updated then it call the callback with new state
 * }
 */
export const useStateStore: TStateUseStore = (Context = StateContext) => {
  const { state, setState } = useContext(Context);

  const onStateChange: TOnStateChange = (newState, callback) => {
    if (!isEqual(state, newState)) {
      callback(newState);
    }
  };

  const stateKeyValueChanged: TKeyValueChanged = (key, value) =>
    stateKeyChanged(state, key, value);

  const onStateKeyChange: TOnStateKeyChange = (key, value, callback) => {
    if (stateKeyValueChanged(key, value)) {
      callback({ ...state, [key]: value });
    }
  };

  const onStateObjectChange: TOnStateKeysChange = (passedState, callback) => {
    let updatedState = { ...state };
    Object.keys(passedState).forEach(key => {
      if (!isEqual(state[key], passedState[key])) {
        updatedState = { ...state, [key]: passedState[key] };
      }
    });

    if (!isEqual(state, updatedState)) {
      callback({ ...state, ...updatedState });
    }
  };

  return {
    state,
    stateSelector: generateSelector(state),
    setState,
    onStateChange,
    stateKeyValueChanged,
    onStateObjectChange,
    onStateKeyChange
  };
};

/**
 * Helper hook that works with useStateStore, it accepts selector and return value from store
 * @example
 * const data = useStateSelector(getVideoIOInputs);
 * @param {function} selector - selector funtion that accepts state
 * @return {any} returns value from the store
 */
export function useStateSelector<T extends TSelector>(
  selector: T
): ReturnType<T> {
  const { state } = useStateStore();

  return selector(state);
}

export const StateProvider = ({
  children,
  initialState = initialContextState,
  Context = StateContext
}: IStateProvider) => {
  const stateArray = useState(initialState);

  const [state, setState] = (stateArray as unknown) as [any, any];
  const contextValue = useMemo(() => ({ state, setState }), [state, setState]);

  return (
    <Context.Provider
      value={{ state: contextValue.state, setState: contextValue.setState }}
    >
      {children}
    </Context.Provider>
  );
};

/**
 * Represents a hoc component for StateProvider to wrap passed component
 * @example
 * export default withStateProvider(statusPanelnitialState)(StatusPanel);
 * @param {object} initialState - initial state for local store.
 * @return {function} returns function that expects top component, for example top panel component, to be srapped, it will provide state and setState to bottom component that complimentary hooks can use internaly.
 */
export const withStateProvider: TStateProviderHOC = (
  initialState = initialContextState,
  Context = StateContext
  // eslint-disable-next-line react/display-name
) => (Component: React.ComponentType<any>) => (props: any) => (
  <StateProvider Context={Context} initialState={initialState}>
    <Component {...props} />
  </StateProvider>
);
