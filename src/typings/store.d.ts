import React from "react";

export interface IProviderProps {
  children: React.ReactNode;
  initialState: TState;
}

export interface IProviderReducerProps extends IProviderProps {
  reducer: any;
}

export type TValue = object | string | number | boolean;
export type TState = Record<string, TValue>;
export type TAction = {
  type: string;
  payload: TValue;
};

export type TSelector = (state: TState) => TValue;
