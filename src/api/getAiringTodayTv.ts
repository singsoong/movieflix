import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  original_name: string;
  title?: string;
}

export interface IGetTvResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: ITv[];
}

export async function getAiringTodayTv() {
  const response = await axios.get(
    `${BASE_URL}/tv/airing_today?language=ko&api_key=${API_KEY}`
  );
  return response.data;
}