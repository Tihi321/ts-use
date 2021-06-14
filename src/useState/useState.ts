import { useState } from "react";
import { isEqual } from "lodash";

/**
 * Hook for reactive state, state that react to the changes from initialState
 * @example
 * const [showBoard, setShowBoard] = useReactiveState(show);
 * @param {any} propState - any state that you want to track
 * @return {array} returns state and setState from react
 */

export const useReactiveState = (propState: any) => {
  const [passedValue, setPassedValue] = useState(propState);
  const [state, setState] = useState(propState);

  if (!isEqual(passedValue, propState)) {
    setPassedValue(propState);
    setState(propState);
  }

  return [state, setState];
};
