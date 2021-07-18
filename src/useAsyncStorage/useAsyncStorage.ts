import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export type TKey = string | number | boolean;

export const useAsyncStorage = (
  key: string,
  initialState: TKey | null = null
) => {
  const [data, setData] = useState(initialState);

  const storeData = async (value: TKey) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setData(value);
    } catch (e) {
      console.log("Error saving value", e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value !== null) {
        setData(JSON.parse(value));
      }
    } catch (e) {
      console.log("Error reading value", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    storeData,
    getData
  };
};
