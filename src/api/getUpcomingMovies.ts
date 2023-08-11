import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";

export async function getUpcomingMovies() {
  const response = await axios.get(
    `${BASE_URL}/movie/upcoming?language=ko&page=1&region=kr&api_key=${API_KEY}`
  );
  return response.data;
}
