import React from "react";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");

  return <h1>SearchPage</h1>;
}

export default SearchPage;
