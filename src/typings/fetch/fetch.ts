import { RequestInit } from "node-fetch";

export type TFetchQuery = {
  key: string;
  value?: string;
};

export type TFetchUrl =
  | string
  | {
      url: string;
      options?: RequestInit;
      query?: TFetchQuery[];
      suffix?: string;
    };
