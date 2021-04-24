import React from "react";

import { ETheme, getTheme, useSelector, withThemeProvider } from "./store";

export const ThemeContainer = () => {
  const theme = useSelector(getTheme);
  const themeData = theme === ETheme.Dark ? "Dark" : "Light";

  return <div>{themeData}</div>;
};

export default withThemeProvider(ThemeContainer);
