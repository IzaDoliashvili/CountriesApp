type ArticlesReducerInitialState = {
  imageSrc: string;
  title: string;
  description: string;
  id: string;
  vote: number;
  deleted: boolean;
}[];

type ArticlesReducerAction = {
  type: "upvote" | "sort" | "create" | "delete" | "recover";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload:any;
};

const handleUpvoteArticle = (articlesList: ArticlesReducerInitialState, id: string) => {
  return articlesList.map((article:{ 
    imageSrc: string;
    title: string;
    description: string;
    id: string;
    vote: number;
    deleted: boolean;} ) => {
    if (article.id === id) {
      return { ...article, vote: article.vote + 1 };
    }

    return { ...article };
  });
};

export const articlesReducer = (
  articlesList: ArticlesReducerInitialState,
  action: ArticlesReducerAction,
) => {
  if (action.type === "upvote") {
    return handleUpvoteArticle(articlesList, action.payload.id);
  }

  if (action.type === "sort") {
    return [...articlesList].sort((a, b) => {
      return action.payload.sortType === "asc"
        ? a.vote - b.vote
        : b.vote - a.vote;
    });
  }

  if (action.type === "create") {
    const newId =
      articlesList.length > 0
        ? (Number(articlesList.at(-1)?.id) + 1).toString()
        : "1";

    const newArticle = {
      ...action.payload.articleFields,
      imageSrc:
        action.payload.articleFields.imageSrc ||
        "https://via.placeholder.com/300",
      vote: 0,
      id: newId,
      deleted: false,
    };
    const updatedArticlesList = [newArticle, ...articlesList];

    console.log("New Article:", newArticle);
    console.log("Updated Articles List:", updatedArticlesList);

    return updatedArticlesList;
  }

  if (action.type === "delete") {
    return articlesList.map((article) =>
      article.id === action.payload.id
        ? { ...article, deleted: true }
        : article,
    );
  }

  if (action.type === "recover") {
    return articlesList.map((article) =>
      article.id === action.payload.id
        ? { ...article, deleted: false }
        : article,
    );
  }

  return articlesList;
};


