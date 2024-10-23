import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./layout/dashboard/index";
import AboutView from "./pages/about/view/about/index";
import ContactInfo from "./pages/contact/view/contact/index";
import {NotFound }from "./pages/not-found";
import {lazy, Suspense } from "react";
import SingleArticleView from "@/pages/home/components/single"
import HeroSection from "./pages/home/components/list/hero-section/hero-section";


const ArticlesListView = lazy(() => import("./pages/home/view/list"));

function App() {
  return (
    <Routes>
      <Route path="/:lang" element={<DefaultLayout />}>
      <Route path="/:lang" element={<HeroSection />} />
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
      <Route path="/" element={<Navigate to="/en/home" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

