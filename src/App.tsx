import { Routes, Route } from "react-router-dom";
import ArticlesListView from "./pages/home/view/list/index";
import DefaultLayout from "./layout/dashboard/index";
import AboutView from "./pages/about/view/about/index";
import ContactInfo from "./pages/contact/view/contact/index";
import NotFoundPage from "./pages/404";
import { Suspense } from "react";
import SingleArticleView from "@/pages/home/components/single"

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
      <Route path="/" element={<div>Landing</div>} />
          <Route
            path="home"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ArticlesListView />
              </Suspense>
            }
          />
        <Route path="articles/:id" element={<SingleArticleView />} />
        <Route path="about" element={<AboutView />} />
        <Route path="contact" element={<ContactInfo />} />
        
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
