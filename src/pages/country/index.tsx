import { getCountries } from "@/api/countries";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const CountriesListView = () => {
  const {
    data: countriesList,
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
 console.log(countriesList);
 
  console.log("hu");
  useEffect(() => {}, []);

  return (
    <>
      <div style={{ margin: 48, fontSize: 48 }}>
        {areCountriesLoading ? "Loading ...." : null}
        {areCountriesErrored ? "Error" : null}
        {countriesList?.map((country) => {
          return (
            <div key={country.id}>
                 <img src={country.imageSrc} />
                 <p>
                   Country: {country.name} 
                 </p>
                 <p>Capital: {country.capital}</p>
             <p>Votes: {country.vote}</p>
                
              </div>
          );
        })}
      </div>
    </>
  );
};

export default CountriesListView;
