import { articlesReducer } from "@/pages/home/components/list/article-list/reducer/reducer";
import { articlesInitialState } from "@/pages/home/components/list/article-list/reducer/state";
import { MouseEvent, useReducer, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const useArticlesList = () => {
  const [formValidationErrorMsg, setFormValidationErrorMsg] = useState("");
  const [articlesList, dispatch] = useReducer(
    articlesReducer,
    articlesInitialState,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchArticles = useCallback(
    async (pageNum: number, sortType: string = "asc") => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/home?_page=${pageNum}&_limit=10&_sort=vote&_order=${sortType}`
        );

        if (response.data.length > 0) {
          if (pageNum === 1) {
            dispatch({ type: "create", payload: response.data });
          } else {
            dispatch({ type: "append", payload: response.data });
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );


  useEffect(() => {
    const sortType = searchParams.get("sort") || "asc";
    fetchArticles(page, sortType);
  }, [searchParams, page, fetchArticles]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  const handleArticlesSortByLikes = (sortType: "asc" | "desc") => {
    setSearchParams({ sort: sortType });
    setPage(1);
    fetchArticles(1, sortType);
    dispatch({ type: "sort", payload: { sortType } });
  };

  const handleCreateArticle = (articleFields: {
    titleEn: string;
    descriptionEn: string;
    titleKa: string;
    descriptionKa: string;
    imageSrc: string;
  }) => {
    if (articleFields.titleEn.length > 8 && articleFields.titleKa.length) {
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
    handleScroll,
    loading,
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
