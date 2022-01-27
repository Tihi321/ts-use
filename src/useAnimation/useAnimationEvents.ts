import { useCallback, useEffect, useState } from "react";

export type TUseAnimationProps = {
  delay?: number;
  onExit?: () => void;
};

/**
 * It counts number of animations, returns exited when second exit animation has ended, used to make sure component is off screen before unmounting
 * @example
 * const { exited, onAnimationEnd } = useAnimationEvents();
 *
 * return (
 *  <StatusBoardContainerStyled
 *   onAnimationEnd={onAnimationEnd}
 *   show={showBoard}
 *  >
 *   ...
 *  </StatusBoardContainerStyled>
 * );
 * @example
 * const { onAnimationEnd } = useAnimationEvents({ onExit: onExitCallback });
 * @param {object} {delay?: number, onExit?: function} - (Optional) delay visible number in miliseconds, onExit callback to run whn component is hidden
 * @return {object} returns exited state and onAnimationEnd function to add to component onAnimationEnd prop
 */

export const useAnimationEvents = (
  props?: TUseAnimationProps
): {
  exited: boolean;
  onAnimationEnd: () => void;
} => {
  const defaultDelay = props?.delay || 0;
  const defaultOnExit = props?.onExit as () => void;
  const [exited, setExited] = useState(true);
  const [startAnimationEnded, setStartAnimationEnded] = useState(false);

  const onExitCallback = useCallback(defaultOnExit, [defaultOnExit]);

  const onAnimationEnd = () => {
    if (startAnimationEnded) {
      setTimeout(() => setExited(false), defaultDelay);

      return;
    }

    setStartAnimationEnded(true);
  };

  useEffect(() => {
    if (!exited && onExitCallback) {
      onExitCallback();
    }
  }, [exited, onExitCallback]);

  return { exited, onAnimationEnd };
};
