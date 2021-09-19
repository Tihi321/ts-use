import { RequestInit } from "node-fetch";
export declare type TFetchQuery = {
    key: string;
    value?: string;
};
export declare type TFetchUrl = string | {
    url: string;
    options?: RequestInit;
    query?: TFetchQuery[];
};
//# sourceMappingURL=fetch.d.ts.map