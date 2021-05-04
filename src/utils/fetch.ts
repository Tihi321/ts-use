import nodeFetch from "node-fetch";

import { isBrowser } from "./window";

export const fetch = (url: string, toCall: (response: any) => void) => {
  const fetchData: typeof nodeFetch = isBrowser() ? window.fetch : nodeFetch;

  fetchData(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    toCall(response.json());
  });
};
