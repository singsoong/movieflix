import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import TvPage from "./pages/Tv";
import Header from "./components/common/Header";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/" element={<HomePage />}>
          <Route path="movies/:movieId" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
