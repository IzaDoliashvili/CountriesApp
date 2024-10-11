import classes from "./article.module.css";
import classNames from "classnames";

interface ArticleProps {
  children: React.ReactNode;
  className?: string; 
}

const Article: React.FC<ArticleProps> = ({ children, className }) => {
  return (
    <article className={classNames(classes.article, className)}>
      {children}
    </article>
  );
};

export default Article;


// const Article: React.FC<React.PropsWithChildren> = ({ children }) => {
//   return <article className={classes.root}>{children}</article>;
// };

// export default Article;
