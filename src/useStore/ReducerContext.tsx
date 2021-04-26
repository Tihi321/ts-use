import React, { useContext, useMemo, useReducer } from "react";

import {
  IReducerProvider,
  TCreateAction,
  TDispatchOnChange,
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
 * @param {any} payload - ayn optional payload that action nneds.
 * @return {object} { type: string, payload: any }
 */
export const createAction: TCreateAction = (type: string, payload?: any) => ({
  type,
  payload
});

/**
 * @typedef {object} ReturnObject
 * @property {object} state - State object
 * @property {function} stateSelector - state in a form of a selector
 * @property {function} dispatch - Dispatch function from react
 * @property {function} createAction - accepts type and payload and return action object
 * @property {function} dispatchOnChange - checks the store with provided key if changed, it dispaches the action
 */

/**
 * A store hook that works with ReducerProvider,  if used with getHooks this needs to be in top package under withReducerProvider component
 * @example
 * const { dispatchOnChange } = useReducerStore();
 * const { data: quotes } = useGetData("quotesApi");
 * dispatchOnChange("quotes", quotes);
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
 * dispatchOnChange {function} - checks the store with provided key if changed, it dispaches the action
 * }
 */
export const useReducerStore: TReducerUseStore = (Context = ReducerContext) => {
  const { state, dispatch } = useContext(Context);

  const dispatchOnChange: TDispatchOnChange = (key, action) => {
    if (stateKeyChanged(state, key, action.payload)) {
      dispatch(action);
    }
  };

  return {
    state,
    stateSelector: generateSelector(state),
    dispatch,
    dispatchOnChange
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
 * @example
 * export default withReducerProvider(statusPanelReducer, statusPanelnitialState)(StatusPanel);
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
