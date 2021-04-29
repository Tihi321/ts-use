import { useEffect, useMemo, useState } from "react";

export const useReactiveState = (propState: any) => {
  const [state, setState] = useState(propState);

  const propMemoState = useMemo(() => propState, [propState]);

  useEffect(() => {
    setState(propMemoState);
  }, [propMemoState]);

  return [state, setState];
};
