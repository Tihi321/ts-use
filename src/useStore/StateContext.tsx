import { isEqual } from "lodash";
import React, { useContext, useMemo, useState } from "react";

import {
  IStateProvider,
  TSetStateKeyOnChange,
  TSetStateOnChange,
  TStateProviderHOC,
  TStateUseStore,
  TUseSelector
} from "../typings";
import { generateSelector, stateKeyChanged } from "../utils";
import { initialContextState, StateContext } from "./context";

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

export const useStateSelector: TUseSelector = selector => {
  const { state } = useStateStore();

  return selector(state);
};

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

export const withStateProvider: TStateProviderHOC = (
  initialState = initialContextState,
  Context = StateContext
  // eslint-disable-next-line react/display-name
) => (Component: React.ComponentType<any>) => (props: any) => (
  <StateProvider Context={Context} initialState={initialState}>
    <Component {...props} />
  </StateProvider>
);
