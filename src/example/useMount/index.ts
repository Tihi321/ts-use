import { useMount } from "../../useMount";

export const useDelayMount = () => {
  let timeout: NodeJS.Timeout;

  const mounted = useMount(
    {
      onPromise: resolve => {
        timeout = (setTimeout(() => {
          clearTimeout(timeout);
          resolve();
        }, 500) as unknown) as NodeJS.Timeout;
      }
    },
    () => {
      clearTimeout(timeout);
    }
  );

  return mounted;
};
