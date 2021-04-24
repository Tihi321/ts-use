import React from "react";

import {
  useReducerSelector,
  useReducerStore,
  withReducerProvider
} from "../../useStore";
import { ETheme, getTheme, initialState, reducer, switchTheme } from "./store";

export const ThemeContainer = () => {
  const theme = useReducerSelector(getTheme);
  const { dispatch } = useReducerStore();
  const themeData = theme === ETheme.Dark ? "Dark" : "Light";

  return (
    <button type="button" onClick={() => dispatch(switchTheme())}>
      {themeData}
    </button>
  );
};

export default withReducerProvider(reducer, initialState)(ThemeContainer);
