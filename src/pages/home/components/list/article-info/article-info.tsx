import classes from "./article-info.module.css";

const ArticleInfo: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={classes.root}>{children}</div>;
};
export default ArticleInfo;
