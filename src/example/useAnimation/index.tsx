import React, { useState } from "react";

import { useAnimation } from "../../useAnimation";

export const BoardPanel = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  const { visible, onAnimationEnd } = useAnimation();

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
      {visible ? "Visible" : "Invisible"}
    </button>
  );
};
