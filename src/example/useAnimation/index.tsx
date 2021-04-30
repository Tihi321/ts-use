import React, { useState } from "react";

import { useAnimationEvents } from "../../useAnimation";

export const BoardPanel = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  const { exited, onAnimationEnd } = useAnimationEvents();

  const onButtonClick = () => {
    setStartAnimation(false);
  };

  return (
    <button
      type="button"
      className={startAnimation ? "startAnimation" : "exitAnimatino"}
      onAnimationEnd={onAnimationEnd}
      onClick={onButtonClick}
    >
      {exited ? "Visible" : "Invisible"}
    </button>
  );
};
