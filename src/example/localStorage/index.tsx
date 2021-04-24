import React from "react";

import { useLocalStorage } from "../../useLocalStorage";

export const LayoutContainer = () => {
  const { data: useTheme, setLocalStorage: setUseTheme } = useLocalStorage(
    "ts/theme",
    false
  );

  const switchTheme = () => {
    setUseTheme(!useTheme);
  };

  return (
    <button type="button" onClick={switchTheme}>
      {useTheme ? "Is compliant" : "Is not compliant"}
    </button>
  );
};
