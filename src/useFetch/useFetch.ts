import isEmpty from "lodash/isEmpty";
import { useEffect, useMemo, useState } from "react";

import { TFetchUrl } from "../typings";
import { fetch } from "../utils";

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
export const useFetch = (url: TFetchUrl, initialState: any = undefined) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const urlMemo = useMemo(() => url, [url]);

  useEffect(() => {
    if (!isEmpty(urlMemo)) {
      fetch(urlMemo, (response: any) => {
        setData(response);
        setLoading(false);
      });
    }
  }, [urlMemo, refetch]);

  return { data, loading, refetch: () => setRefetch(!refetch) };
};
