/* eslint-disable @typescript-eslint/no-explicit-any */
import ArticleInfo from "@/pages/home/components/list/article-info/article-info";
import ArticleTitle from "@/pages/home/components/list/article-title/article-title";
import Article from "@/pages/home/components/list/article/article";
import ArticleDescription from "@/pages/home/components/list/article-description/article-description";
import classes from "./article-list.module.css";
import { Link } from "react-router-dom";
import ArticleCreateForm from "@/pages/home/components/list/article-create-form/article-create-form";
import { useArticlesList } from "@/pages/home/components/list/article-list/hooks/useArtclesList";

const ArticleList: React.FC = () => {
  const {
    articlesList,
    formValidationErrorMsg,
    handleArticleDelete,
    handleArticlesSortByLikes,
    handleCreateArticle,
  } = useArticlesList();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex", marginLeft: 48, gap: 12 }}>
          <button
            onClick={() => {
              handleArticlesSortByLikes("asc");
            }}
          >
            ASC
          </button>
          <button
            onClick={() => {
              handleArticlesSortByLikes("desc");
            }}
          >
            DESC
          </button>
        </div>
        <ArticleCreateForm
          errorMsg={formValidationErrorMsg}
          onArticleCreate={handleCreateArticle}
        />
      </div>
      <section className={classes.countryList}>
        {articlesList.map((article: any) => {
          return (
            <Link
              key={article.id}
              style={{
                color: "blue",
                textDecoration: "none",
                fontSize: 24,
              }}
              to={`/articles/${article.id}`}
            >
              <Article>
                <img src={article.imageSrc} alt={article.title} />
                <ArticleInfo>
                  <ArticleTitle onUpVote={article.id} voteCount={article.vote}>
                    {article.title}
                  </ArticleTitle>
                  <ArticleDescription>{article.description}</ArticleDescription>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <span>More Info</span>
                    <span
                      style={{ color: "red" }}
                      onClick={(e) => {
                        handleArticleDelete(e, article.id);
                      }}
                    >
                      DELETE
                    </span>
                  </div>
                </ArticleInfo>
              </Article>
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default ArticleList;

// interface Country {
//   imageSrc: string;
//   name: {
//     en: string;
//     ka: string;
//   };
//   capital: string;
//   description: {
//     en: string;
//     ka: string;
//   };
//   id: string;
//   vote: number;
//   deleted: boolean;
//   lang: string;

// const ArticleList: React.FC = () => {
//   const { lang = "en" } = useParams<{ lang: string }>();
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [imageBase64, setImageBase64] = useState<string | null>(null);
//   const [name, setName] = useState<{ en: string; ka: string }>({
//     en: "",
//     ka: "",
//   });
//   const [description, setDescription] = useState<{ en: string; ka: string }>({
//     en: "",
//     ka: "",
//   });

//   const handleDeleteCountry = async (id: string) => {
//     try {
//       setCountries((prevCountries) =>
//         prevCountries.filter((country) => country.id !== id),
//       );
//       await axios.delete(`http://localhost:3000/countries/${id}`);
//     } catch (error) {
//       console.error("Error deleting country:", error);
//     }
//   };

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
//     setName((prevTitle) => ({ ...prevTitle, [lang]: value }));
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
//       name,
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
//       setName({ en: "", ka: "" });
//       setDescription({ en: "", ka: "" });
//     } catch (error) {
//       console.error("Error adding country:", error);
//     }
//   };

//   const {
//     data: currentLangCountries,
//     isLoading: areCountriesLoading,
//     isError: areCountriesErrored,
//     refetch: refetchCountries,
//   } = useQuery({
//     queryKey: ["countries-list"],
//     queryFn: getCountries,
//     gcTime: 1000 * 5,
//     staleTime: 1000 * 5,
//     retry: 0,
//     refetchOnWindowFocus: false,
//   });

//   // useEffect(() => {}, []);
//   useEffect(() => {
//     if (currentLangCountries) {
//       setCountries(currentLangCountries);
//     }
//   }, [currentLangCountries]);

//   const { mutate } = useMutation({ mutationFn: updateCountry });

//   return (
//     <section>
//       <form onSubmit={handleAddCountry} className={classes.addCountryForm}>
//         <div>
//           <label>Title (English):</label>
//           <input
//             type="text"
//             value={name.en}
//             onChange={(e) => handleTitleChange("en", e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Title (Georgian):</label>
//           <input
//             type="text"
//             value={name.ka}
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

//       <div>
//         <button
//           onClick={() => {
//             mutate(
//               { id: "1", payload: { visited: true } },
//               {
//                 onSuccess: () => {
//                   refetchCountries();
//                 },
//               },
//             );
//           }}
//         >
//           Update Italyn
//         </button>
//         <div className={classes.countryList}>
//           {areCountriesLoading ? "Loading ...." : null}
//           {areCountriesErrored ? "Error" : null}

//           {currentLangCountries?.map((country: any) => {
//             return (
//               <div className={classes.countryCard} key={country.id}>
//                 <img src={country.imageSrc} />
//                 <p>
//                   Country: {country.name} -{" "}
//                   {country.visited ? "Visited" : "Not Visited"}
//                 </p>
//                 <p>Capital: {country.capital}</p>
//                 <p>Votes: {country.vote}</p>
//                 <button onClick={() => handleDeleteCountry(country.id)}>
//                   Delete
//                 </button>
//               </div>

//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ArticleList;
