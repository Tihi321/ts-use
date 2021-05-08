import { isFunction } from "lodash";
import { useEffect, useState } from "react";

type TUseMountOptions = {
  onMount?: Function;
  onPromise?: (resolve: Function) => void;
};

type TUseMount = TUseMountOptions | Function;

/**
 * This hook returns state after first mount, takes optional callback to run, it can be resolved with promise
 * @example
 * let timeout: NodeJS.Timeout;
 *
 * const mounted = useMount(
 *   {
 *     onMount: () => {
 *      ... code to execute on resolve
 *     },
 *     onPromise: resolve => {
 *       timeout = setTimeout(() => {
 *         clearTimeout(timeout);
 *         resolve();
 *       }, 500);
 *     }
 *   },
 *   () => {
 *     clearTimeout(timeout);
 *   }
 * );
 * @param {Function | TUseMountOptions} options - it can be function to called after first mount, or object with optional onPromise callback that returns resolve, after resolve hook returns true and run optional onMount callback
 * @param {Function} onUnMount - optional function to be called on unmount
 * @return {boolean} returns mounted state true after second render or after custom resolve
 */
export const useMount = (options: TUseMount, onUnMount?: Function) => {
  const [componentMount, setComponentMount] = useState(false);
  const [mounted, setMounted] = useState(false);

  const onMount = () => {
    if (isFunction(options)) {
      options();

      return;
    }

    const callbackOptions = options as TUseMountOptions;

    if (callbackOptions.onMount && isFunction(callbackOptions.onMount)) {
      callbackOptions.onMount();
    }
  };

  useEffect(() => {
    if (!isFunction(options)) {
      const callbackOptions = options as TUseMountOptions;

      if (callbackOptions.onPromise && isFunction(callbackOptions.onPromise)) {
        new Promise(resolve => callbackOptions.onPromise!(resolve)).then(() =>
          setComponentMount(true)
        );

        return;
      }
    }

    setComponentMount(true);

    // eslint-disable-next-line consistent-return
    return () => {
      if (onUnMount && isFunction(onUnMount)) {
        onUnMount();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (componentMount) {
      onMount();
      setMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentMount]);

  return mounted;
};
