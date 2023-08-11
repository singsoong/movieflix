import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";

export async function getTopRatedMovies() {
  const response = await axios.get(
    `${BASE_URL}/movie/top_rated?language=ko&page=1&region=kr&api_key=${API_KEY}`
  );
  return response.data;
}
