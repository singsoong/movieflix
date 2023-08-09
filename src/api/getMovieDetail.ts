import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";

interface IGenres {
  id: number;
  name: string;
}

export interface IGetMovieDetailData {
  genres: IGenres[];
  original_title: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  vote_average: number;
}

export async function getMovieDetail(movieId: string) {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?language=ko&api_key=${API_KEY}`
  );
  return response.data;
}
