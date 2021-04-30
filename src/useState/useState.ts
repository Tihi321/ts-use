import { useEffect, useMemo, useState } from "react";

/**
 * Hook for reactive state, state that react to the changes from initialState
 * @example
 * const [showBoard, setShowBoard] = useReactiveState(show);
 * @param {any} propState - any state that you want to track
 * @return {array} returns state and setState from react
 */

export const useReactiveState = (propState: any) => {
  const [state, setState] = useState(propState);

  const propMemoState = useMemo(() => propState, [propState]);

  useEffect(() => {
    setState(propMemoState);
  }, [propMemoState]);

  return [state, setState];
};
