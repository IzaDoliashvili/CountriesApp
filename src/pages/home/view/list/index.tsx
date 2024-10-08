import { lazy } from "react";


  const LazyArticleList = lazy(
    () => import("../../components/list/article-list/article-list")
  );
  

  
  const ArticlesListView = () => {
    return (
      <>
        <LazyArticleList />
      </>
    );
  };
  
  export default ArticlesListView;
  