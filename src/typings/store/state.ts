import React from "react";

import { IProviderProps, TSelector, TState, TValue } from "./shared";

export type TContextState<S = TState> = React.Context<{
  state: S;
  setState: any;
}>;

export type TSetStateOnChange<S = TState> = (state: S) => void;
export type TSetStateKeyOnChange<V = TValue> = (key: string, value: V) => void;

export type TStateUseStore<S = TState, V = TValue> = (
  Context?: TContextState<S>
) => {
  state: S;
  stateSelector: TSelector<S>;
  setState: React.Dispatch<React.SetStateAction<S>>;
  setStateOnChange: TSetStateOnChange<S>;
  setStateKeyOnChange: TSetStateKeyOnChange<V>;
};

export interface IStateProvider<S = TState> extends IProviderProps<S> {
  Context?: TContextState<S>;
}

export type TStateProviderComponent<S = TState> = (
  Component: React.ComponentType<any>
) => React.ComponentType<IStateProvider<S>>;

export type TStateProviderHOC<S = TState> = (
  initialState: S,
  Context?: TContextState<S>
) => TStateProviderComponent<S>;
