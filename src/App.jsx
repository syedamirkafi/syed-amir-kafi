import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import Rail from "./components/Rail.jsx";
import RailMobile from "./components/RailMobile.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="ambient" aria-hidden="true" />
      <ScrollToTop />
      <Rail />
      <RailMobile />
      <ThemeToggle className="hidden lg:flex fixed top-6 right-6 z-40" />
      <div className="flex-1 pt-16 lg:pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
}
