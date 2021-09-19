import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import nodeFetch from "node-fetch";

import { TFetchQuery, TFetchUrl } from "../typings";
import { isBrowser } from "./window";

export const fetch = (
  url: TFetchUrl,
  toCall: (response: any) => void,
  nodeFetchCallback: typeof nodeFetch = nodeFetch
) => {
  const fetchData: typeof nodeFetch =
    isBrowser() && window.fetch ? window.fetch : nodeFetchCallback;

  if (typeof url === "string") {
    fetchData(url).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      toCall(response.json());
    });
  } else {
    let fetchUrl;
    const urlString = get(url, "url");
    const urlQuery = get(url, "query") as TFetchQuery[] | undefined;

    if (!isEmpty(urlQuery)) {
      const queryString = map(urlQuery, values => {
        const key = get(values, "key");
        const value = get(values, "value");

        return isEmpty(value) ? key : `${key}=${value}`;
      }).join("&");

      fetchUrl = `${urlString}?${queryString}`;
    } else {
      fetchUrl = urlString;
    }

    fetchData(fetchUrl, get(url, "options")).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      toCall(response.json());
    });
  }
};
