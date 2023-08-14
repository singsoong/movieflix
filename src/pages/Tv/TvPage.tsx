import { useQuery } from "@tanstack/react-query";
import React from "react";
import { styled } from "styled-components";
import { IGetTvResult, getAiringTodayTv } from "../../api/getAiringTodayTv";
import { makeImagePath } from "../../utils/makeImagePath";
import Slider from "../../components/common/Slider";
import { PathMatch, useMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MovieModal from "../../components/common/MovieModal";
import { getOnTheAirTv } from "../../api/getOnTheAirTv";
import { getPopularTv } from "../../api/getPopularTv";
import { getTopRatedTv } from "../../api/getTopRatedTv";

function TvPage() {
  const { data: airingData, isLoading } = useQuery<IGetTvResult>(
    ["tv", "airingToday"],
    getAiringTodayTv
  );

  const { data: onTheAirData } = useQuery<IGetTvResult>(
    ["tv", "onTheAir"],
    getOnTheAirTv
  );

  const { data: popularData } = useQuery<IGetTvResult>(
    ["tv", "popular"],
    getPopularTv
  );

  const { data: topRatedData } = useQuery<IGetTvResult>(
    ["tv", "topRated"],
    getTopRatedTv
  );

  const tvPathMatch: PathMatch<string> | null = useMatch("tv/:type/:movieId");
  function clickedTv() {
    if (airingData && onTheAirData && popularData && topRatedData) {
      const allTvData = [
        ...airingData.results,
        ...onTheAirData.results,
        ...popularData.results,
        ...topRatedData.results,
      ];
      return (
        tvPathMatch?.params.movieId &&
        allTvData.find((tv) => String(tv.id) === tvPathMatch.params.movieId)
      );
    }
  }

  const tvData = clickedTv();

  return (
    <Container>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(airingData?.results[0].backdrop_path || "")}
          >
            <Title>{airingData?.results[0].name}</Title>
            <SubTitle>{airingData?.results[0].original_name}</SubTitle>
          </Banner>
          <SliderContainer>
            <SliderTitle>오늘 방영중인 쇼</SliderTitle>
            <Slider type="tv" url="airingToday" data={airingData} />
            <SliderTitle>앞으로 7일 동안 방영중인 쇼</SliderTitle>
            <Slider type="tv" url="onTheAir" data={onTheAirData} />
            <SliderTitle>인기있는 티비 쇼</SliderTitle>
            <Slider type="tv" url="popular" data={popularData} />
            <SliderTitle>별점이 높은 티비 쇼</SliderTitle>
            <Slider type="tv" url="topRated" data={topRatedData} />
          </SliderContainer>
        </>
      )}

      <AnimatePresence>
        {tvPathMatch && (
          <MovieModal
            movieId={String(tvPathMatch.params.movieId)}
            movieData={Object(tvData)}
            url={String(tvPathMatch.params.type)}
            type="tv"
          />
        )}
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 60vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
`;

const Title = styled.h2`
  font-size: 70px;
  color: white;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 40px;
  color: white;
`;

const SliderContainer = styled.div`
  background-color: black;
`;

const SliderTitle = styled.h3`
  color: white;
  font-size: 40px;
  font-weight: bold;
  margin-left: 20px;
  margin-bottom: 20px;
`;

export default TvPage;
