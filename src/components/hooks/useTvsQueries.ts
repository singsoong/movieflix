import { useQuery } from "@tanstack/react-query";
import { IGetTvResult, getAiringTodayTv } from "../../api/getAiringTodayTv";
import { getOnTheAirTv } from "../../api/getOnTheAirTv";
import { getPopularTv } from "../../api/getPopularTv";
import { getTopRatedTv } from "../../api/getTopRatedTv";

const useTvsQueries = () => {
  const airing = useQuery<IGetTvResult>(
    ["tv", "airingToday"],
    getAiringTodayTv
  );
  const onTheAir = useQuery<IGetTvResult>(["tv", "onTheAir"], getOnTheAirTv);
  const popular = useQuery<IGetTvResult>(["tv", "popular"], getPopularTv);
  const topRated = useQuery<IGetTvResult>(["tv", "topRated"], getTopRatedTv);

  return [airing, onTheAir, popular, topRated];
};

export default useTvsQueries;
