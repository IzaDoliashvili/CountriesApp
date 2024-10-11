import Article from "@/pages/home/components/list/article/article";
import classes from "./article-list.module.css";
import ArticleInfo from "@/pages/home/components/list/article-info/article-info";
import ArticleTitle from "@/pages/home/components/list/article-title/article-title";
import ArticleDescription from "@/pages/home/components/list/article-description/article-description";
import { useReducer, FormEvent, MouseEvent} from "react";
import { Link } from "react-router-dom";
import ArticleCapital from "../article-capital/article-capital";
import { FaSortDown } from "react-icons/fa6";
import { FaSortUp } from "react-icons/fa6";
import { articlesReducer } from "@/pages/home/components/list/article-list/reducer/reducer";
import { articlesInitialState } from "@/pages/home/components/list/article-list/reducer/state";
import ArticleCreateForm from "@/pages/home/components/list/article-create-form/article-create-form";

const ArticleList: React.FC = () => {
  const [articlesList, dispatch] = useReducer(articlesReducer, articlesInitialState);

  const handleArticleUpvote = (id: string) => {
    return () => {
      const updatedArticlesList = articlesList.map((article: { id: string; vote: number }) => {
        if (article.id === id) {
          return { ...article, vote: article.vote + 1 };
        }
        return article;
      });

      dispatch({ type: "sort", payload: updatedArticlesList });
    };
  };

  const sortArticlesAscending = () => {
    const sortedArticles = [...articlesList].sort((a, b) => a.vote - b.vote);
    dispatch({ type: "sort", payload: sortedArticles });
  };

  const sortArticlesDescending = () => {
    const sortedArticles = [...articlesList].sort((a, b) => b.vote - a.vote);
    dispatch({ type: "sort", payload: sortedArticles });
  };

  const handleCreateArticle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const articleFields: any = {};
    const formData = new FormData(e.currentTarget);

    for (const [key, value] of formData) {
      articleFields[key] = value;
    }

    dispatch({ type: "create", payload: { articleFields } });
  };

  const handleArticleDelete = (e: MouseEvent, id: string) => {
    e.preventDefault();
    dispatch({ type: "delete", payload: { id } });
  };
  const handleArticleRecover = (e: MouseEvent, id: string) => {
    e.preventDefault();
    dispatch({ type: "recover", payload: { id } });
  };

  return (
    <section className={classes.root}>
      <div className={classes.SortCreateForm}>
        <div style={{ display: "flex" }}>
          <button
            onClick={sortArticlesAscending}
            style={{
              padding: "10px 15px",
              backgroundColor: "#f0b965",
              width: 40,
              height: 40,
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <FaSortUp />
          </button>

          <button
            onClick={sortArticlesDescending}
            style={{
              padding: "10px 15px",
              width: 40,
              height: 40,
              backgroundColor: "#f0b965",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <FaSortDown />
          </button>
        </div>
        <ArticleCreateForm onArticleCreate={handleCreateArticle} />
      </div>

      <div className={classes.articles}>
        {articlesList
          .sort((a, b) => (a.deleted === b.deleted ? 0 : a.deleted ? 1 : -1))
          .map((article: any) => {
            return (
              <Article key={article.id}
              className={`${article.deleted ? classes.articleDeleted : ''}`}>
                <img src={article.imageSrc} alt={article.title} />
                <ArticleInfo>
                  <ArticleTitle
                    onUpVote={handleArticleUpvote(article.id)}
                    voteCount={article.vote}
                  >
                    {article.title}
                  </ArticleTitle>
                  <ArticleCapital>{article.capital}</ArticleCapital>
                  <ArticleDescription>{article.description}</ArticleDescription>
                  <div>
                    <Link
                      style={{
                        color: "#f0b965",
                        backgroundColor: "black",
                        textDecoration: "none",
                        fontSize: 18,
                        padding: 10,
                        borderRadius: 8,
                      }}
                      to={`/articles/${article.id}`}
                    >
                      More Info
                    </Link>
                    {article.deleted ? (
                      <span
                        style={{
                          color: "rgb(227 211 211)",
                          backgroundColor: "black",
                          marginLeft: 20,
                          fontSize: 18,
                          padding: 10,
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                        onClick={(e) => handleArticleRecover(e, article.id)}
                      >
                        RECOVER
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "rgb(227 211 211)",
                          backgroundColor: "black",
                          marginLeft: 20,
                          fontSize: 18,
                          padding: 10,
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                        onClick={(e) => handleArticleDelete(e, article.id)}
                      >
                        DELETE
                      </span>
                    )}
                  </div>
                </ArticleInfo>
              </Article>
            );
          })}
      </div>
    </section>
  );
};

export default ArticleList;
