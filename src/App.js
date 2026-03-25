import { useState } from "react";
import { styles } from "./styles/styles";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CurrentList from "./components/sections/CurrentList";
import History from "./components/sections/History";
import Overview from "./components/sections/Overview";
import AllLists from "./components/sections/AllLists";
import SearchBooks from "./components/sections/SearchBooks";
import Reviews from "./components/sections/Reviews";
import { useEffect } from "react";
import { responsive } from "./styles/responsive";

export default function App() {
  // Inyectar estilos responsive globales
  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = responsive;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("current");
  const s = styles(dark);

  const renderSection = () => {
    switch (tab) {
      case "current":  return <CurrentList dark={dark} />;
      case "history":  return <History dark={dark} />;
      case "overview": return <Overview dark={dark} />;
      case "names":    return <AllLists dark={dark} />;
      case "search":   return <SearchBooks dark={dark} />;
      case "reviews":  return <Reviews dark={dark} />;
      default:         return null;
    }
  };

  return (
    <div style={s.app}>
      <Header dark={dark} setDark={setDark} />
      <Navbar dark={dark} tab={tab} setTab={setTab} />
      <main style={s.main}>{renderSection()}</main>
      <Footer dark={dark} />
    </div>
  );
}