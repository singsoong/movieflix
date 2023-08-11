import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getNowplayingMovies() {
  const response = await axios.get(
    `${BASE_URL}/movie/now_playing?language=ko&page=1&region=kr&api_key=${API_KEY}`
  );
  return response.data;
}
