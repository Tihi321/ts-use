import React from "react";

import { IProviderProps, TSelector, TState, TValue } from "./shared";

export type TContextReducer<S = TState> = React.Context<{
  state: S;
  dispatch: any;
}>;

export type TAction<V = TValue> = {
  type: string;
  payload: V;
};

export type TCreateAction<V = TValue> = (
  type: string,
  payload: V
) => TAction<V>;

export type TDispatchOnChange<V = TValue> = (
  key: string,
  action: TAction<V>
) => void;

export type TReducerUseStore<S = TState> = (
  Context?: TContextReducer<S>
) => {
  state: S;
  stateSelector: TSelector<S>;
  dispatch: any;
  createAction: TCreateAction;
  dispatchOnChange: TDispatchOnChange;
};

export interface IReducerProvider<S = TState> extends IProviderProps<S> {
  reducer: any;
  Context?: TContextReducer<S>;
}

export type TReducerProviderComponent<S = TState> = (
  Component: React.ComponentType<any>
) => React.ComponentType<IReducerProvider<S>>;

export type TReducerProviderHOC<S = TState> = (
  reducer: any,
  initialState: S,
  Context?: TContextReducer<S>
) => TReducerProviderComponent<S>;
