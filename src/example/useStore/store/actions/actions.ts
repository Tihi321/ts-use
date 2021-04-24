import { ETheme } from "../enums";
import { EActionTypes } from "./types";

export const setTheme = (theme: ETheme) => ({
  type: EActionTypes.ThemeSet,
  payload: theme
});

export const switchTheme = () => ({
  type: EActionTypes.ThemeSwitch
});