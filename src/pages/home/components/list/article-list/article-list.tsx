import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import classes from "./article-list.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCountries, updateCountry } from "@/api/countries";

interface Country {
  imageSrc: string;
  name: {
    en: string;
    ka: string;
  };
  capital: string;
  description: {
    en: string;
    ka: string;
  };
  id: string;
  vote: number;
  deleted: boolean;
  lang: string;
}

 const ArticleList: React.FC = () => {

  const {  lang = "en" } = useParams<{ lang: string }>();
  const [countries, setCountries] = useState<Country[]>([]);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [name, setName] = useState<{ en: string; ka: string }>({
    en: "",
    ka: "",
  });
  const [description, setDescription] = useState<{ en: string; ka: string }>({
    en: "",
    ka: "",
  });

  
 
  
  const handleDeleteCountry = async (id: string) => {
      try {
        setCountries((prevCountries) =>
          prevCountries.filter((country) => country.id !== id),
        );
        await axios.delete(`http://localhost:3000/countries/${id}`);
      } catch (error) {
        console.error("Error deleting country:", error);
      }
     };
    
      const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setImageBase64(reader.result as string);
          };
        }
      };
    
      const handleTitleChange = (lang: "en" | "ka", value: string) => {
        setName((prevTitle) => ({ ...prevTitle, [lang]: value }));
      };
    
      const handleDescriptionChange = (lang: "en" | "ka", value: string) => {
        setDescription((prevDescription) => ({
          ...prevDescription,
          [lang]: value,
        }));
      };
    
      const handleAddCountry = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const newCountry: Country = {
          id: (countries.length + 1).toString(),
          imageSrc: imageBase64 || "",
          name,
          capital: "",
          description,
          vote: 0,
          deleted: false,
          lang: lang || "en",
        };
    
        try {
          const response = await axios.post(
            "http://localhost:3000/countries",
            newCountry,
          );
          setCountries((prevCountries) => [response.data, ...prevCountries]);
          setImageBase64(null);
          setName({ en: "", ka: "" });
          setDescription({ en: "", ka: "" });
        } catch (error) {
          console.error("Error adding country:", error);
        }
       };

  const {
    data: currentLangCountries,
    isLoading: areCountriesLoading,
    isError: areCountriesErrored,
    refetch: refetchCountries,
  } = useQuery({
    queryKey: ["countries-list"],
    queryFn: getCountries,
    gcTime: 1000 * 5,
    staleTime: 1000 * 5,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {}, []);
  useEffect(() => {
    if (currentLangCountries) {
      setCountries(currentLangCountries);
    }
  }, [currentLangCountries]);

  const { mutate } = useMutation({ mutationFn: updateCountry });

  return (
    <section>
    <form onSubmit={handleAddCountry} className={classes.addCountryForm}>
            <div>
             <label>Title (English):</label>
           <input
                type="text"
                value={name.en}
                onChange={(e) => handleTitleChange("en", e.target.value)}
                required
              />
            </div>
            <div>
              <label>Title (Georgian):</label>
              <input
                type="text"
                value={name.ka}
                onChange={(e) => handleTitleChange("ka", e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description (English):</label>
              <textarea
                value={description.en}
                onChange={(e) => handleDescriptionChange("en", e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description (Georgian):</label>
              <textarea
                value={description.ka}
                onChange={(e) => handleDescriptionChange("ka", e.target.value)}
                required
              />
            </div>
            <div>
              <label>Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
            </div>
            {imageBase64 && (
              <img src={imageBase64} alt="Preview" style={{ width: "100px" }} />
            )}
            <button type="submit">Add Country</button>
    </form>

    <div >
  <button
    onClick={() => {
      mutate(
        { id: "1", payload: { visited: true } },
        {
          onSuccess: () => {
            refetchCountries();
          },
        },
      );
    }}
  >
    Update Italyn
  </button>
  <div className={classes.countryList}>
  {areCountriesLoading ? "Loading ...." : null}
  {areCountriesErrored ? "Error" : null}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {currentLangCountries ?.map((country:any) => {
        return (
          <div className={classes.countryCard} key={country.id}>
            <img src={country.imageSrc} />
      <p>
        Country: {country.name} - {country.visited ? "Visited" : "Not Visited"}
      </p>
      <p>Capital: {country.capital}</p>
      <p>Votes: {country.vote}</p>
      <button onClick={() => handleDeleteCountry(country.id)}>Delete</button>
    </div>
          // <div key={country.id} className={classes.countryCard} >
          //   <img
          //   src={country.imageSrc}
          // />
          // <p>Country:{country.name[lang || "en"]} - {country.visited ? " Visited" : " Not Visited"}</p>
          // <p>Capital: {country.capital[lang || "en"]}</p>
          // <p>Population: {country.description}</p>
          // <p>Votes: {country.vote}</p>
          // <button onClick={() => handleDeleteCountry(country.id)}>
          //   Delete
          // </button>
            
          // </div>
        );
      })}
        

    </div>
    </div>


</section>

);
};

export default ArticleList;


//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/countries");
//         setCountries(response.data);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   const { lang } = useParams<{ lang: string }>();
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [imageBase64, setImageBase64] = useState<string | null>(null);
//   const [title, setTitle] = useState<{ en: string; ka: string }>({
//     en: "",
//     ka: "",
//   });
//   const [description, setDescription] = useState<{ en: string; ka: string }>({
//     en: "",
//     ka: "",
//   });

//   const currentLangCountries = countries.filter(
//     (country: { lang: string | undefined }) => country.lang === lang,
//   );

// //   const handleDeleteCountry = async (id: string) => {
//   try {
//     setCountries((prevCountries) =>
//       prevCountries.filter((country) => country.id !== id),
//     );
//     await axios.delete(`http://localhost:3000/countries/${id}`);
//   } catch (error) {
//     console.error("Error deleting country:", error);
//   }
// // };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setImageBase64(reader.result as string);
//       };
//     }
//   };

//   const handleTitleChange = (lang: "en" | "ka", value: string) => {
//     setTitle((prevTitle) => ({ ...prevTitle, [lang]: value }));
//   };

//   const handleDescriptionChange = (lang: "en" | "ka", value: string) => {
//     setDescription((prevDescription) => ({
//       ...prevDescription,
//       [lang]: value,
//     }));
//   };

//   const handleAddCountry = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const newCountry: Country = {
//       id: (countries.length + 1).toString(),
//       imageSrc: imageBase64 || "",
//       title,
//       capital: "",
//       description,
//       vote: 0,
//       deleted: false,
//       lang: lang || "en",
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/countries",
//         newCountry,
//       );
//       setCountries((prevCountries) => [response.data, ...prevCountries]);
//       setImageBase64(null);
//       setTitle({ en: "", ka: "" });
//       setDescription({ en: "", ka: "" });
//     } catch (error) {
//       console.error("Error adding country:", error);
//     }
//   };

//   return (
//     <section>
//       <form onSubmit={handleAddCountry} className={classes.addCountryForm}>
//         <div>
//           <label>Title (English):</label>
//           <input
//             type="text"
//             value={title.en}
//             onChange={(e) => handleTitleChange("en", e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Title (Georgian):</label>
//           <input
//             type="text"
//             value={title.ka}
//             onChange={(e) => handleTitleChange("ka", e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description (English):</label>
//           <textarea
//             value={description.en}
//             onChange={(e) => handleDescriptionChange("en", e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description (Georgian):</label>
//           <textarea
//             value={description.ka}
//             onChange={(e) => handleDescriptionChange("ka", e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Upload Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             required
//           />
//         </div>
//         {imageBase64 && (
//           <img src={imageBase64} alt="Preview" style={{ width: "100px" }} />
//         )}
//         <button type="submit">Add Country</button>
//       </form>

//       <section className={classes.countryList}>
//         {currentLangCountries.map((country) => (
//           <div key={country.id} className={classes.countryCard}>
//             <img
//               src={country.imageSrc}
//               alt={country.title[lang as "en" | "ka"]}
//             />
//             <h2>{country.title[lang as "en" | "ka"]}</h2>
//             <p>Capital: {country.capital}</p>
//             <p>Population: {country.description[lang as "en" | "ka"]}</p>
//             <p>Votes: {country.vote}</p>
//             <button onClick={() => handleDeleteCountry(country.id)}>
//               Delete
//             </button>
//           </div>
//         ))}
//       </section>
//     </section>
//   );
// };
