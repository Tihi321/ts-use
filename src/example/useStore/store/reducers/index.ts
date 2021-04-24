import { EActionTypes, TAction } from "../actions";
import { ETheme } from "../enums";
import { ThemeState } from "../types";

export const initialState: ThemeState = {
  theme: ETheme.Dark
};

export const reducer = (state: ThemeState, { type, payload }: TAction) => {
  switch (type) {
    case EActionTypes.ThemeSet:
      return {
        ...state,
        theme: payload
      };
    case EActionTypes.ThemeSwitch:
      return {
        ...state,
        theme: state.theme === ETheme.Light ? ETheme.Dark : ETheme.Light
      };
    default:
      throw new Error();
  }
};
