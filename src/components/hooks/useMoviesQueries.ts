import { useQuery } from "@tanstack/react-query";
import {
  IGetMoviesResult,
  getNowplayingMovies,
} from "../../api/getNowplayingMovies";
import { getTopRatedMovies } from "../../api/getTopRatedMovies";
import { getUpcomingMovies } from "../../api/getUpcomingMovies";
import { getPopularMovies } from "../../api/getPopularMovies";

const useMoviesQueries = () => {
  const now = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowplayingMovies
  );

  const popular = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );

  const upcoming = useQuery<IGetMoviesResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );

  const topRated = useQuery<IGetMoviesResult>(
    ["movies", "topRated"],
    getTopRatedMovies
  );

  return [now, popular, upcoming, topRated];
};

export default useMoviesQueries;
