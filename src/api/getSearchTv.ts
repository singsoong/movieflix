import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";

export async function getSearchTv(keyword: string | null) {
  const response = await axios.get(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&languae=ko&query=${keyword}&page=1&include_adult=false`
  );
  return response.data;
}
