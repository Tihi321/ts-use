import React, { useContext, useMemo, useReducer } from "react";

import {
  IReducerProvider,
  TCreateAction,
  TKeyValueChanged,
  TOnStateKeyChange,
  TReducerProviderHOC,
  TReducerUseStore,
  TSelector
} from "../typings";
import { generateSelector, stateKeyChanged } from "../utils";
import { initialContextState, ReducerContext } from "./context";

/**
 * A function that returns action object
 * @example
 * const setTheme = payload => createAction("SET_THEME", payload);
 * @param {string} type - action type
 * @param {any} payload - optional payload that action needs.
 * @return {object} { type: string, payload: any }
 */
export const createAction: TCreateAction = (type, payload) => ({
  type,
  payload
});

/**
 * @typedef {object} ReturnObject
 * @property {object} state - State object
 * @property {function} stateSelector - state in a form of a selector
 * @property {function} dispatch - Dispatch function from react
 * @property {function} stateKeyValueChanged -  takes a key and values and checks if value updated with that key in state and returns boolean
 * @property {function} onStateKeyChange - receives the callback, checks the store with provided key if state object value is updated and runs provided callback with newUpdatedState
 */

/**
 * A store hook that works with ReducerProvider,  if used with getHooks this needs to be in top package under withReducerProvider component
 * @example
 * const { dispatch, stateKeyValueChanged, onStateKeyChange } = useStateStore();
 * const { data: quotes } = useGetData("quotesApi");
 * const stateChanged = stateKeyValueChanged("quotes", quotes);
 * onStateKeyChange("quotes", quotes, () => dispatch(setQuotes(quotes)));
 * if (stateChanged) {
 *  // ... some code
 * }
 * @example
 * const { stateSelector } = useReducerStore();
 *
 * // useSelector from redux, used with createSelector
 * const data = useSelector(getDataWith(stateSelector));
 * @example
 * const { dispatch } = useReducerStore();
 * onClick{() => dispatch(switchTheme()}
 * @return {ReturnObject} {
 * state {object} - State object,
 * stateSelector {function} - state in a form of a selector,
 * dispatch {function} - dispatch function from react,
 * stateKeyValueChanged {function} - takes a key and values and checks if value updated with that key in state and returns boolean,
 * onStateKeyChange {function} - receives the callback, checks the store with provided key if state object value is updated and runs provided callback
 * }
 */
export const useReducerStore: TReducerUseStore = (Context = ReducerContext) => {
  const { state, dispatch } = useContext(Context);

  const stateKeyValueChanged: TKeyValueChanged = (key, value) =>
    stateKeyChanged(state, key, value);

  const onStateKeyChange: TOnStateKeyChange = (key, value, callback) => {
    if (stateKeyValueChanged(key, value)) {
      callback();
    }
  };

  return {
    state,
    stateSelector: generateSelector(state),
    dispatch,
    stateKeyValueChanged,
    onStateKeyChange
  };
};

/**
 * Helper hook that works with useReducerStore, it accepts selector and return value from store
 * @example
 * const theme = useReducerSelector(getTheme);
 * @param {function} selector - selector funtion that accepts state
 * @return {any} returns value from the store
 */
export function useReducerSelector<T extends TSelector>(
  selector: T
): ReturnType<T> {
  const { state } = useReducerStore();

  return selector(state);
}

export const ReducerProvider = ({
  children,
  reducer,
  initialState = initialContextState,
  Context = ReducerContext
}: IReducerProvider) => {
  const reducerArray = useReducer(reducer, initialState);

  const [state, dispatch] = (reducerArray as unknown) as [any, any];
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <Context.Provider
      value={{ state: contextValue.state, dispatch: contextValue.dispatch }}
    >
      {children}
    </Context.Provider>
  );
};

/**
 * Represents a hoc component for ReducerProvider to wrap passed component
 * !Important do not use useState hooks in this provider component
 * @example
 * const StatusPanel = () => {
 *
 *  // in component
 *  const { setStateKeyOnChange } = useReducerStore();
 *
 *  // custom hook
 *  useContextReducerProvider();
 *
 *  return <StatusPanelContainer />;
 * };
 *
 * export default withStateProvider(statusPanelnitialState)(StatusPanel);
 * @param {function} reducer - reducer to work with state
 * @param {object} initialState - initial state for local store.
 * @return {function} returns function that expects top component, for example top panel component, to be srapped, it will provide state and dispatch to bottom component that complimentary hooks can use internaly.
 */
export const withReducerProvider: TReducerProviderHOC = (
  reducer,
  initialState = initialContextState,
  Context = ReducerContext
  // eslint-disable-next-line react/display-name
) => Component => (props: any) => (
  <ReducerProvider
    Context={Context}
    reducer={reducer}
    initialState={initialState}
  >
    <Component {...props} />
  </ReducerProvider>
);
