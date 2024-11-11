
import { useEffect, useState } from "react";
import data from "database.json";

export const useFetch = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  
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

  return {  data, isLoading, isError };
};
