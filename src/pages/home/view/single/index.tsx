import SingleArticle from "@/pages/home/components/single";
import articlesList from "@/pages/home/components/list/article-list/article-list";
import { useParams } from "react-router-dom";

const SingleArticleView = () => {
  const { id } = useParams();

  const articleInfo = Object.values(articlesList).find(
    (article) => article.id == id,
  );

  const articleDoesntExist = !articleInfo;

  if (articleDoesntExist) {
    return <div>Article Not Found</div>;
  }

  return (
    <>
      <SingleArticle />
    </>
  );
};

export default SingleArticleView;
