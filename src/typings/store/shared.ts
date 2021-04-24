import React from "react";

export type TValue = any;
export type TState<T = any> = T;

export interface IProviderProps<S = TState> {
  children: React.ReactNode;
  initialState: S;
}

export type TSelector<S = TState, V = TValue> = (state: S) => V;

export type TUseSelector<S = TState, V = TValue> = (
  selector: TSelector<S, V>
) => V;
