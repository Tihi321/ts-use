import { createAction } from "../../../../useStore";
import { ETheme } from "../enums";
import { EActionTypes } from "./types";

export const setTheme = (theme: ETheme) =>
  createAction(EActionTypes.ThemeSet, theme);

export const switchTheme = () => createAction(EActionTypes.ThemeSwitch);
