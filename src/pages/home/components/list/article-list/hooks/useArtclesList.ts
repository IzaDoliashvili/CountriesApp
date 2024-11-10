import { articlesReducer } from "@/pages/home/components/list/article-list/reducer/reducer";
import { articlesInitialState } from "@/pages/home/components/list/article-list/reducer/state";
import { MouseEvent, useReducer, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const useArticlesList = () => {
  const [formValidationErrorMsg, setFormValidationErrorMsg] = useState("");
  const [articlesList, dispatch] = useReducer(
    articlesReducer,
    articlesInitialState,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sortType = searchParams.get("sort") || "asc";
    axios
      .get(`/articles?_sort=vote&_order=${sortType}`)
      .then((response) => {
        dispatch({ type: "replace", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [searchParams]);

  const handleArticlesSortByLikes = (sortType: "asc" | "desc") => {
    setSearchParams({ sort: sortType });

    dispatch({ type: "sort", payload: { sortType } });
  };

  const handleCreateArticle = (articleFields: {
    title: string;
    description: string;
  }) => {
    if (articleFields.title.length > 8) {
      setFormValidationErrorMsg(
        "სათაური უნდა შეიცავდეს 8-ზე ნაკლებ სიმბოლოს !",
      );
      return;
    }

    dispatch({ type: "create", payload: { articleFields } });
  };

  const handleArticleDelete = (e: MouseEvent, id: string) => {
    e.preventDefault();
    dispatch({ type: "delete", payload: { id } });
  };

  return {
    articlesList,
    formValidationErrorMsg,
    handleArticlesSortByLikes,
    handleCreateArticle,
    handleArticleDelete,
  };
};

// export const useArticlesList = () => {
//   const [formValidationErrorMsg, setFormValidationErrorMsg] = useState("");
//   const [articlesList, dispatch] = useReducer(
//     articlesReducer,
//     articlesInitialState,
//   );

//   const handleArticleUpvote = (id: string) => {
//     return () => {
//       dispatch({
//         type: "upvote",
//         payload: {
//           id,
//         },
//       });
//     };
//   };

//   const handleArticlesSortByLikes = (sortType: "asc" | "desc") => {
//     dispatch({ type: "sort", payload: { sortType } });
//   };

//   const handleCreateArticle = (articleFields: {
//     title: string;
//     description: string;
//   }) => {
//     if (articleFields.title.length > 8) {
//       setFormValidationErrorMsg(
//         "სათაური უნდა შეიცავდეს 8-ზე ნაკლებ სიმბოლოს !",
//       );
//     }

//     dispatch({ type: "create", payload: { articleFields } });
//   };

//   const handleArticleDelete = (e: MouseEvent, id: string) => {
//     e.preventDefault();

//     dispatch({ type: "delete", payload: { id } });
//   };

//   return {
//     articlesList,
//     formValidationErrorMsg,
//     handleArticleUpvote,
//     handleArticlesSortByLikes,
//     handleCreateArticle,
//     handleArticleDelete,
//   };
// };
