import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GlobalHome from "./pages/GlobalHome";
import GlobalServicePage, { SERVICE_SLUGS } from "./pages/GlobalServicePage";
import GeoRedirect from "./components/GeoRedirect";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GeoRedirect />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/global" element={<GlobalHome />} />
          {SERVICE_SLUGS.map((slug) => (
            <Route key={slug} path={`/global/${slug}`} element={<GlobalServicePage slug={slug} />} />
          ))}
          <Route path="/global/*" element={<GlobalHome />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
