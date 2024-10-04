import { Link } from "react-router-dom";
import classes from "./article.module.css";

const Article: React.FC<React.PropsWithChildren<{ id: string }>> = ({
  id,
  children,
}) => {
  return (
    <Link  className={classes.articleWidth}
      to={`/articles/${id}`}
    >
      <article className={classes.root}>{children}</article>
    </Link>
  );
};

export default Article;
