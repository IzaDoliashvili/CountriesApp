type ArticlesReducerInitialState = {
  imageSrc: string;
  title: string;
  description: string;
  id: string;
  vote: number;
  deleted: boolean;
}[];

type ArticlesReducerAction = {
  type: "upvote" | "sort" | "create" | "delete"| "recover"; 
  payload: any;
};

const handleUpvoteArticle = (articlesList: any, id: any) => {
  return articlesList.map((article: any) => {
    if (article.id === id) {
      return { ...article, vote: article.vote + 1 };
    }

    return { ...article };
  });
};

export const articlesReducer = (
  articlesList: ArticlesReducerInitialState,
  action: ArticlesReducerAction
) => {
  if (action.type === "upvote") {
    return handleUpvoteArticle(articlesList, action.payload.id);
  }

  if (action.type === "sort") {
    return [...articlesList].sort((a, b) => {
      return action.payload.sortType === "asc" ? a.vote - b.vote : b.vote - a.vote;
    });
  }

  if (action.type === "create") {
   
    const newArticle = [
      ...articlesList,
      {
        ...action.payload.articleFields,
        imageSrc: action.payload.articleFields.imageSrc || "https://via.placeholder.com/300",
        vote: 0,
        id: (Number(articlesList.at(-1)?.id) + 1).toString(),
        deleted: false, 
      },
    ];
    const updatedArticlesList = [newArticle, ...articlesList];
    console.log(updatedArticlesList);
    console.log(newArticle);
    
    


    return updatedArticlesList;
   
  }

  if (action.type === "delete") {
    return articlesList.map((article) =>
      article.id === action.payload.id ? { ...article, deleted: true } : article
    );
  }

  if (action.type === "recover") {
    return articlesList.map((article) =>
      article.id === action.payload.id ? { ...article, deleted: false } : article
    );
  }


  return articlesList;
};

