/// <reference types="react" />
export declare type TUseAnimationProps = {
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
export declare const useAnimationEvents: (props?: TUseAnimationProps | undefined) => {
    exited: boolean;
    onAnimationEnd: (event?: Event | undefined) => void;
};
//# sourceMappingURL=useAnimationEvents.d.ts.map