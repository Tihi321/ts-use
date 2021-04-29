import { useReactiveState } from "../../useState";

export const useCustomHook = (propThatUpdates: any) => {
  const [reactiveState, setReactiveState] = useReactiveState(propThatUpdates);

  return [reactiveState, setReactiveState];
};
