import { getCountries } from "@/api/countries";
import CountryItem from "@/pages/country/countries/index";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const CountriesListView = () => {
  const {
    data: articlesInitialState,
    isLoading: areCountriesLoading,
    isError: areCountriesErrored,
    // refetch: refetchCountries,
  } = useQuery({
    queryKey: ["countries-list"],
    queryFn: getCountries,
    gcTime: 1000 * 5,
    staleTime: 1000 * 5,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  console.log("hu");
  useEffect(() => {}, []);

  return (
    <>
      <div style={{ margin: 48, fontSize: 48 }}>
        {areCountriesLoading ? "Loading ...." : null}
        {areCountriesErrored ? "Error" : null}
        {articlesInitialState?.map((country) => {
          return (
            <CountryItem
              key={country.id}
              id={country.id}
              countryName={country.name}
            />
          );
        })}
      </div>
    </>
  );
};

export default CountriesListView;
