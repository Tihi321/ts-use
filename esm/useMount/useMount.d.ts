declare type TUseMountOptions = {
    onMount?: Function;
    onPromise?: (resolve: Function) => void;
};
declare type TUseMount = TUseMountOptions | Function;
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
export declare const useMount: (options: TUseMount, onUnMount?: Function | undefined) => boolean;
export {};
//# sourceMappingURL=useMount.d.ts.map