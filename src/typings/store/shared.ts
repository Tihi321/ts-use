import React from "react";

export type TValue = object | string | number | boolean | undefined;
export type TState<T = any> = T;

export interface IProviderProps<S = TState> {
  children: React.ReactNode;
  initialState: S;
}

export type TSelector<S = TState> = (state: S) => TValue;
