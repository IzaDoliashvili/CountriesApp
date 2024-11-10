import { httpClient } from "@/api";
import { useEffect, useState } from "react";

export const useFetch = (endpoint: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    httpClient
      .get(endpoint)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [endpoint]);

  return { data, isLoading, isError };
};
