import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Post from "./pages/Post.jsx";
import Wins from "./pages/Wins.jsx";
import About from "./pages/About.jsx";
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
    <div className="min-h-screen bg-base text-ink flex flex-col">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/wins" element={<Wins />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <BottomNav />
    </div>
  );
}
