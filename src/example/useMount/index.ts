import { useMount } from "../../useMount";

export const useDelayMount = () => {
  let timeout: NodeJS.Timeout;

  const mounted = useMount(
    {
      onPromise: resolve => {
        timeout = setTimeout(() => {
          clearTimeout(timeout);
          resolve();
        }, 500);
      }
    },
    () => {
      clearTimeout(timeout);
    }
  );

  return mounted;
};
