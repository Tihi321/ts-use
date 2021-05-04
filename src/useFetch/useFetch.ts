import { useEffect, useState } from "react";

import { fetch } from "../utils";

export const useFetch = (url: string) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url, (response: any) => {
      setData(response);
      setLoading(false);
    });
  }, [url]);

  return { data, loading };
};
