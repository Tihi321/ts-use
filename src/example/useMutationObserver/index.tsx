import React, { useEffect, useRef, useState } from "react";

import { useMutationObserver } from "../../useMutationObserver";

export const RevealElement = () => {
  const element = useRef({} as any);
  const [reveal, setReveal] = useState(false);
  const { observe } = useMutationObserver({
    onChildList: () => {
      setReveal(true);
    }
  });

  useEffect(() => {
    if (observe) {
      observe(element.current);
    }
  }, []);

  return <div ref={element}>{reveal && "reveal"}</div>;
};
