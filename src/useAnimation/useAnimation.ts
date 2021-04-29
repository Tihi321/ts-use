import { useCallback, useEffect, useState } from "react";

export type TUseAnimationProps = {
  delay?: number;
  onHidden?: () => void;
};

export const useAnimation = (
  props?: TUseAnimationProps
): {
  visible: boolean;
  onAnimationEnd: (event?: Event) => void;
} => {
  const defaultDelay = props?.delay || 0;
  const defaultOnHidden = props?.onHidden as () => void;
  const [visible, setVisible] = useState(true);
  const [startAnimationEnded, setStartAnimationEnded] = useState(false);

  const onPropsHidden = useCallback(defaultOnHidden, [defaultOnHidden]);

  const onAnimationEnd = () => {
    if (startAnimationEnded) {
      setTimeout(() => setVisible(false), defaultDelay);

      return;
    }

    setStartAnimationEnded(true);
  };

  useEffect(() => {
    if (!visible && onPropsHidden) {
      onPropsHidden();
    }
  }, [visible, onPropsHidden]);

  return { visible, onAnimationEnd };
};
