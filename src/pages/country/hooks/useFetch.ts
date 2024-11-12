import { useEffect, useState } from "react";
import data from "database.json";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    try {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch {
      setIsError(true);
    }
  }, []);

  return { data, isLoading, isError };
};
