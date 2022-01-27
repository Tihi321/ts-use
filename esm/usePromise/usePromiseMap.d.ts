interface IPromiseMapArguments {
    items: Array<any>;
    promise: (item: any) => Promise<any>;
    result: (item: any, result: any, index: number) => any;
}
/**
 * Resolves array of promises within react in a non blocking way. Returns data array after all promises have been resolved. Use within
 * @example
 * const { data, promiseMap } = usePromiseMap();
 * const arrayOfPaths = ["path", "path2", "path3"];
 *
 *
 * useEffect(() => {
 *   promiseMap({
 *     items: arrayOfPaths,
 *     promise: async (path) => { const someAsyncResult = await getAsyncData(path); return someAsyncResult; },
 *     result: (path, asyncPathResult, index) => ({
 *        path,
 *        asyncPathResult,
 *        index
 *     })
 *   })
 * }, [arrayOfPaths.length]);
 * @return {object} returns object consisting of data and promiseMap function that takes items, promise callback that is going to be called on each item in a loop, function should return promise that after it resolves last parameter result function is called with arguments of item, result of promise and index, result of that function is added in output array. After all items/promises are resolved array is returned
 */
export declare const usePromiseMap: () => {
    promiseMap: ({ items, promise, result }: IPromiseMapArguments) => void;
    data: any[];
};
export {};
//# sourceMappingURL=usePromiseMap.d.ts.map