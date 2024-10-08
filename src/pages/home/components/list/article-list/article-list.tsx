import Article from "@/pages/home/components/list/article/article";
import classes from "./article-list.module.css";
import ArticleInfo from "@/pages/home/components/list/article-info/article-info";
import ArticleTitle from "@/pages/home/components/list/article-title/article-title";
import ArticleDescription from "@/pages/home/components/list/article-description/article-description";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArticleCapital from "../article-capital/article-capital";
import { FaSortDown } from "react-icons/fa6";
import { FaSortUp } from "react-icons/fa6";

const ArticleList: React.FC = () => {
  const [articlesList, setArticlesList] = useState<
    {
      imageSrc: string;
      title: string;
      capital: string;
      description: string;
      id: string;
      vote: number;
    }[]
  >([
    {
      imageSrc: "https://storage.georgia.travel/images/nature-of-georgia.webp",
      title: "Georgia",
      capital: "Tbilisi",
      description: "3713000",
      id: "1",
      vote: 55,
    },
    {
      imageSrc: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
      title: "Japan",
      capital: "Tokyo",
      description: "125100000",
      id: "2",
      vote: 23,
    },
    {
      imageSrc: "https://media-magazine.trivago.com/wp-content/uploads/2021/11/07153335/beautiful-places-ireland-skellig-michael.jpg",
      title: "Ireland",
      capital: "Dublin",
      description: "5127000",
      id: "3",
      vote: 30,
    },
  ]);

  const handleArticleUpvote = (id: string) => {
    return () => {
      const updatedArticlesList = articlesList.map((article) => {
        if (article.id === id) {
          return { ...article, vote: article.vote + 1 };
        }
        return article;
      });

      setArticlesList(updatedArticlesList);
    };
  };

  const sortArticlesAscending = () => {
    const sortedArticles = [...articlesList].sort((a, b) => a.vote - b.vote);
    setArticlesList(sortedArticles);
  };

  const sortArticlesDescending = () => {
    const sortedArticles = [...articlesList].sort((a, b) => b.vote - a.vote);
    setArticlesList(sortedArticles);
  };

  return (
    <section className={classes.root}>
      <div style={{  display:"flex", }}>
        <button
          onClick={sortArticlesAscending}
          style={{
            padding: "10px 15px",
            backgroundColor: "#f0b965",
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
            backgroundColor: "#f0b965",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <FaSortDown />
        </button>
      </div>

      <div className={classes.articles}>
      {articlesList.map((article) => {
        return (
          <Article key={article.id}>
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
