import { TSelector } from "../../../../typings";
import { ThemeState } from "../types";

export const getTheme: TSelector<ThemeState> = state => state.theme;
