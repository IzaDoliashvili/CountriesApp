import classes from "./article-list.module.css";

 const ArticleList: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <section className={classes.root}>{children}</section>;
};
export default ArticleList;
