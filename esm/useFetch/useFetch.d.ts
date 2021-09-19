import { TFetchUrl } from "../typings";
/**
 * For fetching data from api, when data is receive it returns the state
 * @example
 * const { data: randomQuote, loading } = useFetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1", {});
 *
 * const quote = randomQuote;
 * @param {string} url - url of API call
 * @param {any} initialState - optional initial state of data before received from API
 * @return {object} returns object consisting of data and loading state
 */
export declare const useFetch: (url: TFetchUrl, initialState?: undefined) => {
    data: undefined;
    loading: boolean;
    refetch: () => void;
};
//# sourceMappingURL=useFetch.d.ts.map