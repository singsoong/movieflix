import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import TvPage from "./pages/Tv";
import Header from "./components/common/Header";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/search" element={<SearchPage />}>
          <Route path=":type/:movieId" element={<SearchPage />} />
        </Route>
        <Route path="/tv" element={<TvPage />}>
          <Route path=":type/:movieId" element={<TvPage />} />
        </Route>
        <Route path="/" element={<HomePage />}>
          <Route path="movies/:type/:movieId" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
