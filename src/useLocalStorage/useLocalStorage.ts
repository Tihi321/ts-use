import { useEffect, useState } from "react";
import { isBrowser } from "tsl-utils";

export const useLocalStorage = (
  key: string,
  initialState: string | number | boolean | null = null,
  updateData: boolean = true
) => {
  const [data, setData] = useState(initialState);

  const isWindow = isBrowser();
  const isLcalStorage = typeof localStorage !== "undefined";

  useEffect(() => {
    if (isWindow && isLcalStorage && localStorage.getItem(key) !== null) {
      setData(localStorage.getItem(key));
    }
  }, [isWindow, isLcalStorage, key]);

  const setLocalStorage = (value: string | number | boolean) => {
    if (isWindow && isLcalStorage) {
      localStorage.setItem(key, value as string);

      if (updateData) {
        setData(value);
      }
    }
  };

  return {
    data,
    setLocalStorage
  };
};
