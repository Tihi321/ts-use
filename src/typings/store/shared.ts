import React from "react";

export type TValue = any;
export type TState<T = any> = T;

export interface IProviderProps<S = TState> {
  children: React.ReactNode;
  initialState: S;
}

export type TSelector<S = TState, V = TValue> = (state: S) => V;

export type TKeyValueChanged = (key: string, value: any) => boolean;

export type TOnStateKeyChange<V = TValue> = (
  key: string,
  value: V,
  callback?: Function
) => void;

export type TOnStateKeysChange = (
  keyValues: Record<string, any>,
  callback?: Function
) => void;
