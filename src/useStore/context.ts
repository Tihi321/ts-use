import { createContext } from "react";

import { TAction, TState, TValue } from "../typings";

export const initialContextState: TState = {};

export const ReducerContext = createContext({
  state: initialContextState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: (_action: TAction) => null
});

export const StateContext = createContext({
  state: initialContextState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setState: (_value: TValue) => null
});
