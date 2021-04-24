import React, { useContext, useMemo, useReducer } from "react";

import {
  IReducerProvider,
  TCreateAction,
  TDispatchOnChange,
  TReducerProviderHOC,
  TReducerUseStore,
  TSelector,
  TUseSelector
} from "../typings";
import { generateSelector, stateKeyChanged } from "../utils";
import { initialContextState, ReducerContext } from "./context";

export const useReducerStore: TReducerUseStore = (Context = ReducerContext) => {
  const { state, dispatch } = useContext(Context);

  const createAction: TCreateAction = (type: string, payload: any) => ({
    type,
    payload
  });

  const dispatchOnChange: TDispatchOnChange = (key, action) => {
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
