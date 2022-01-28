import { TFetchUrl } from "tsl-utils";
/**
 * For fetching data from api, when data is receive it returns the state with support for node when in node enviroment
 * @example
 * const { data: randomQuote, loading } = useFetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1", {});
 *
 * const quote = randomQuote;
 * @param {string} url - url of API call
 * @param {any} initialState - optional initial state of data before received from API
 * @return {object} returns object consisting of data and loading state
 */
export declare const useNodeFetch: (url: TFetchUrl, initialState?: any) => {
    data: any;
    loading: boolean;
    refetch: () => void;
};
//# sourceMappingURL=useNodeFetch.d.ts.map