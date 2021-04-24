import React, { useContext, useMemo, useReducer } from "react";

import { IProviderReducerProps, TAction, TSelector, TState } from "../typings";
import { generateSelector, stateKeyChanged } from "../utils";
import { initialContextState, ReducerContext } from "./context";

export const useReducerStore = (Context = ReducerContext) => {
  const { state, dispatch } = useContext(Context);

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
  initialState = initialContextState,
  Context = ReducerContext
}: IProviderReducerProps) => {
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

export const withReducerProvider = (
  reducer: any,
  initialState: TState = initialContextState,
  Context = ReducerContext
  // eslint-disable-next-line react/display-name
) => (Component: React.ComponentType<any>) => (props: any) => (
  <ReducerProvider
    Context={Context}
    reducer={reducer}
    initialState={initialState}
  >
    <Component {...props} />
  </ReducerProvider>
);
