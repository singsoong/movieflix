import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import HomePage from "./pages/Home/HomePage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
