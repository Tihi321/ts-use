import React from "react";

import {
  IProviderProps,
  TKeyValueChanged,
  TOnStateKeyChange,
  TOnStateKeysChange,
  TSelector,
  TState,
  TValue
} from "./shared";

export type TContextState<S = TState> = React.Context<{
  state: S;
  setState: any;
}>;

export type TOnStateChange<S = TState> = (
  state: S,
  callback?: Function,
  innerState?: any
) => void;

export type TStateUseStore<S = TState, V = TValue> = (
  Context?: TContextState<S>
) => {
  state: S;
  stateSelector: TSelector<S>;
  setState: React.Dispatch<React.SetStateAction<S>>;
  stateKeyValueChanged: TKeyValueChanged;
  onStateChange: TOnStateChange<S>;
  onStateKeyChange: TOnStateKeyChange<V>;
  onStateObjectChange: TOnStateKeysChange;
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
