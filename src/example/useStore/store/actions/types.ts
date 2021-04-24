export enum EActionTypes {
  ThemeSet = "themeSet",
  ThemeSwitch = "themeSwitch"
}

export type TAction = {
  type: EActionTypes;
  payload?: any;
};
