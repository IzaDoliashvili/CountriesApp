import { getCountries } from "@/api/countries";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import classes from "@/pages/home/components/list/article-list/article-list.module.css";
import CountryItem from "./countries";

 
type LanguageKey = "en" | "ka"; 


const CountriesListView = () => {
  const { lang = "en" } = useParams<{ lang: string }>();

  const languageKey: LanguageKey = (["en", "ka"].includes(lang) ? lang : "en") as LanguageKey;

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
  


  return (
    <>
      <div className={classes.countryList}>
        {areCountriesLoading ? "Loading ...." : null}
        {areCountriesErrored ? "Error" : null}
        {countriesList?.map((country) => (
            <div key={country.id} >
                <img src={country.imageSrc} alt={`Image of ${country.name?.[languageKey]}`} />
              <p>Country: {country.name?.[languageKey]}</p>
            <p>Capital: {country.capital}</p>
             <p>Votes: {country.vote}</p>
           </div>
         ))}
         
      </div>
    </>
  );
};

export default CountriesListView;
