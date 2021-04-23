import { isEqual } from "lodash";
import React, { useContext, useMemo, useState } from "react";

import { IProviderProps, TSelector, TState, TValue } from "../typings";
import { generateSelector, stateKeyChanged } from "../utils";
import { initialContextState, StateContext } from "./context";

export const useStateStore = () => {
  const { state, setState } = useContext(StateContext);

  const setStateOnChange = (newState: TValue) => {
    if (!isEqual(state, newState)) {
      setState(newState);
    }
  };

  const setStateKeyOnChange = (key: string, value: TState) => {
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

export const useStateSelector = (selector: TSelector) => {
  const { state } = useStateStore();

  return selector(state);
};

export const StateProvider = ({
  children,
  initialState = initialContextState
}: IProviderProps) => {
  const stateArray = useState(initialState);

  const [state, setState] = (stateArray as unknown) as [any, any];
  const contextValue = useMemo(() => ({ state, setState }), [state, setState]);

  return (
    <StateContext.Provider
      value={{ state: contextValue.state, setState: contextValue.setState }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const withStateProvider = (
  initialState: TState = initialContextState
  // eslint-disable-next-line react/display-name
) => (Component: React.ComponentType<any>) => (props: any) => (
  <StateProvider initialState={initialState}>
    <Component {...props} />
  </StateProvider>
);
