import React from "react";

import { useFetch } from "../../useFetch";

interface IRandomQuote {
  status: number;
  message: string;
  count: number;
  quotes: [
    {
      text: string;
      author: string;
      tag: string;
    }
  ];
}

export const RandomQuote = () => {
  const { data: randomQuote, loading } = useFetch(
    "https://goquotes-api.herokuapp.com/api/v1/random?count=1"
  );

  const quote = (randomQuote as unknown) as IRandomQuote;

  return <div>{!loading && randomQuote ? quote.quotes : "Loading"}</div>;
};
