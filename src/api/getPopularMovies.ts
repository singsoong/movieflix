import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";

export async function getPopularMovies() {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?language=ko&page=1&region=kr&api_key=${API_KEY}`
  );
  return response.data;
}
