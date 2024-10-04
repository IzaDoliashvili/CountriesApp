
import HeroSection from "@/pages/home/components/list/hero-section/hero-section";
import { articlesList } from "@/pages/home/static/dummy-data";
import Article from "../../components/list/article/article";
import { lazy } from "react";

const LazyArticleDescription = lazy(
    () => import("../../components/list/article-description/article-description")
  );
  
  const LazyArticleInfo = lazy(
    () => {
          return import("../../components/list/article-info/article-info");
      }
  );
  
  const LazyArticleList = lazy(
    () => import("../../components/list/article-list/article-list")
  );
  
  const LazyArticleTitle = lazy(
    () => import("../../components/list/article-title/article-title")
  );
  const LazyArticleCapital = lazy(
    () => import("../../components/list/article-capital/article-capital")
  );

  
  const ArticlesListView = () => {
    return (
      <>
        <HeroSection />
        <LazyArticleList>
          <Article id={articlesList[0].id}>
            <img src={articlesList[0].imageSrc} alt={articlesList[0].title} />
            <LazyArticleInfo>
              <LazyArticleTitle>{articlesList[0].title}</LazyArticleTitle>
              <LazyArticleCapital>{articlesList[0].capital}</LazyArticleCapital>
  
              <LazyArticleDescription>
                {articlesList[0].description}
              </LazyArticleDescription>
            </LazyArticleInfo>
          </Article>
  
          <Article id={articlesList[1].id}>
            <img src={articlesList[1].imageSrc} alt={articlesList[1].title} />
            <LazyArticleInfo>
              <LazyArticleTitle>{articlesList[1].title}</LazyArticleTitle>
              <LazyArticleCapital>{articlesList[1].capital}</LazyArticleCapital>
              <LazyArticleDescription>
                {articlesList[1].description}
              </LazyArticleDescription>
            </LazyArticleInfo>
          </Article>
  
          <Article id={articlesList[2].id}>
            <img src={articlesList[2].imageSrc} alt={articlesList[2].title} />
            <LazyArticleInfo>
              <LazyArticleTitle>{articlesList[2].title}</LazyArticleTitle>
              <LazyArticleCapital>{articlesList[2].capital}</LazyArticleCapital>
              <LazyArticleDescription>
                {articlesList[2].description}
              </LazyArticleDescription>
            </LazyArticleInfo>
          </Article>
        </LazyArticleList>
      </>
    );
  };
  
  export default ArticlesListView;
  