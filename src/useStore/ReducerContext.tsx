import React, { useContext, useMemo, useReducer } from "react";

import { IProviderReducerProps, TAction, TSelector, TState } from "../typings";
import { generateSelector, stateKeyChanged } from "../utils";
import { initialContextState, ReducerContext } from "./context";

export const useReducerStore = () => {
  const { state, dispatch } = useContext(ReducerContext);

  const createAction = (type: string, payload: any) => ({
    type,
    payload
  });

  const dispatchOnChange = (key: string, action: TAction) => {
    if (stateKeyChanged(state, key, action.payload)) {
      dispatch(action);
    }
  };

  return {
    state,
    stateSelector: generateSelector(state),
    dispatch,
    createAction,
    dispatchOnChange
  };
};

export const useReducerSelector = (selector: TSelector) => {
  const { state } = useReducerStore();

  return selector(state);
};

export const ReducerProvider = ({
  children,
  reducer,
  initialState = initialContextState
}: IProviderReducerProps) => {
  const reducerArray = useReducer(reducer, initialState);

  const [state, dispatch] = (reducerArray as unknown) as [any, any];
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ReducerContext.Provider
      value={{ state: contextValue.state, dispatch: contextValue.dispatch }}
    >
      {children}
    </ReducerContext.Provider>
  );
};

export const withReducerProvider = (
  reducer: any,
  initialState: TState = initialContextState
  // eslint-disable-next-line react/display-name
) => (Component: React.ComponentType<any>) => (props: any) => (
  <ReducerProvider reducer={reducer} initialState={initialState}>
    <Component {...props} />
  </ReducerProvider>
);
