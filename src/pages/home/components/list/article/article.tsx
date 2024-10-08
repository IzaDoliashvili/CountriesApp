import classes from "./article.module.css";

const Article: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <article className={classes.root}>{children}</article>;
};

export default Article;
