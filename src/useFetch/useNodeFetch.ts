import isEmpty from "lodash/isEmpty";
import nodeFetch from "node-fetch";
import { useEffect, useMemo, useState } from "react";
import { fetchApi, isBrowser, TFetchUrl } from "tsl-utils";

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
export const useNodeFetch = (url: TFetchUrl, initialState: any = undefined) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const urlMemo = useMemo(() => url, [url]);

  useEffect(() => {
    if (!isEmpty(urlMemo)) {
      fetchApi({
        url: urlMemo,
        toCall: (response: any) => {
          setData(response);
          setLoading(false);
        },
        callFunction: isBrowser() ? window.fetch : nodeFetch
      });
    }
  }, [urlMemo, refetch]);

  return { data, loading, refetch: () => setRefetch(!refetch) };
};
