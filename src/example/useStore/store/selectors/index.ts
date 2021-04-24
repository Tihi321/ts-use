import { TSelector } from "../../../../typings";
import { ETheme } from "../enums";
import { ThemeState } from "../types";

export const getTheme: TSelector<ThemeState, ETheme> = state => state.theme;
