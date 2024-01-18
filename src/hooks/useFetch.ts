import { useEffect, useState } from "react";
import ApiManager from "../api";

export const useFecth = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await ApiManager.get<T>(url);
        const data = await response.data;

        setData(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

  return { data, isLoading, isError };
};
