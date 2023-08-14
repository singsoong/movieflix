import { useQuery } from "@tanstack/react-query";
import { getSearchMovies } from "../../api/getSearchMovies";
import { getSearchTv } from "../../api/getSearchTv";

interface IItems {
  backdrop_path: string;
  id: number;
  original_title?: string;
  poster_path: string;
  original_name?: string;
}

interface ISearchData {
  page: number;
  results: IItems[];
}
const useSearchQueries = (keyword: string) => {
  const movie = useQuery<ISearchData>(["search", "movie", keyword], () =>
    getSearchMovies(keyword)
  );

  const tv = useQuery<ISearchData>(["search", "tv", keyword], () =>
    getSearchTv(keyword)
  );

  return [movie, tv];
};

export default useSearchQueries;
