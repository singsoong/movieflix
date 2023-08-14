import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";

export async function getSearchMovies(keyword: string | null) {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&languae=ko&query=${keyword}&page=1&include_adult=false`
  );
  return response.data;
}
