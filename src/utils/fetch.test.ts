import { RequestInit } from "node-fetch";

import { fetch } from "./fetch";

type TResponse = {
  url: string;
  options?: RequestInit;
};

const url: string = "https://www.googleapis.com/v2";

const makeResponse = (urlArgument: string, options?: RequestInit) => ({
  url: urlArgument,
  options
});

const mockResponse = (res: any) => ({
  json: () => res,
  ok: true
});

const nodeFetchMock = (urlArgument: string, options?: RequestInit) =>
  new Promise(resolve => {
    resolve(mockResponse(makeResponse(urlArgument, options)));
  });

const jestCallback = jest.fn((response: TResponse): TResponse => response);

test("It will call fetch with default url string", async () => {
  await new Promise(resolve => {
    fetch(
      url,
      response => {
        jestCallback(response);
        resolve(undefined);
      },
      nodeFetchMock as any
    );
  });

  expect(jestCallback.mock.calls).toEqual([[makeResponse(url)]]);
});

test("It will call fetch with query arguemnts", async () => {
  await new Promise(resolve => {
    fetch(
      {
        url,
        query: [
          {
            key: "firstKey",
            value: "firstVal"
          },
          {
            key: "secondKey",
            value: "secondVal"
          }
        ]
      },
      response => {
        jestCallback(response);
        resolve(undefined);
      },
      nodeFetchMock as any
    );
  });

  expect(jestCallback.mock.calls).toEqual([
    [makeResponse(`${url}?firstKey=firstVal&secondKey=secondVal`)]
  ]);
});
