import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import Header from "./components/Header.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import Post from "./pages/Post.jsx";
import Work from "./pages/Work.jsx";
import About from "./pages/About.jsx";
import Now from "./pages/Now.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-base text-ink flex flex-col">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/now" element={<Now />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
