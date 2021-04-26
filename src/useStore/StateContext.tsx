import { isEqual } from "lodash";
import React, { useContext, useMemo, useState } from "react";

import {
  IStateProvider,
  TSelector,
  TSetStateKeyOnChange,
  TSetStateOnChange,
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
 * @property {function} setStateOnChange - check first if state object changed before udapting setState
 * @property {function} setStateKeyOnChange - checks the store with šrovided key if changed then it updates that key, limitation is that you cannot provide the functions as function never change in initial state, example you cannot provide selector in intial state, but you can use any other value as long as it is changed from the value you pass later on
 */

/**
 * A store hook that works with StateProvider, if used with getHooks this needs to be in top package under withStateProvider component, you can check status panel package useContextState hook for more details
 * @example
 * const { setStateKeyOnChange } = useStateStore();
 * const { data: quotes } = useGetData("quotesApi");
 * setStateKeyOnChange("quotes", quotes);
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
 * setStateOnChange {function} - check first if state object changed before udapting setState,
 * setStateKeyOnChange {function} - checks the store with šrovided key if changed then it updates that key, limitation is that you cannot provide the functions as function never change in initial state, example you cannot provide selector in intial state, but you can use any other value as long as it is changed from the value you pass later on
 * }
 */
export const useStateStore: TStateUseStore = (Context = StateContext) => {
  const { state, setState } = useContext(Context);

  const setStateOnChange: TSetStateOnChange = newState => {
    if (!isEqual(state, newState)) {
      setState(newState);
    }
  };

  const setStateKeyOnChange: TSetStateKeyOnChange = (key, value) => {
    if (stateKeyChanged(state, key, value)) {
      setState({ ...state, [key]: value });
    }
  };

  return {
    state,
    stateSelector: generateSelector(state),
    setState,
    setStateOnChange,
    setStateKeyOnChange
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
