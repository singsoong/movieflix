import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import {
  IGetMoviesResult,
  getNowplayingMovies,
} from "../../api/getNowplayingMovies";
import { makeImagePath } from "../../utils/makeImagePath";
import Slider from "../../components/common/Slider";
import { PathMatch, useMatch } from "react-router-dom";
import MovieModal from "../../components/common/MovieModal";
import { AnimatePresence } from "framer-motion";
import { getPopularMovies } from "../../api/getPopularMovies";
import { getTopRatedMovies } from "../../api/getTopRatedMovies";
import { getUpcomingMovies } from "../../api/getUpcomingMovies";

function HomePage() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowplayingMovies
  );

  const { data: popularMoviesData } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );

  const { data: topRatedMoviesData } = useQuery<IGetMoviesResult>(
    ["movies", "topRated"],
    getTopRatedMovies
  );

  const { data: upcomingMoviesData } = useQuery<IGetMoviesResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );

  const moviePathMatch: PathMatch<string> | null = useMatch(
    "/movies/:type/:movieId"
  );

  function clickedMovie() {
    if (data && popularMoviesData && topRatedMoviesData && upcomingMoviesData) {
      const allMoviesData = [
        ...data.results,
        ...popularMoviesData.results,
        ...upcomingMoviesData.results,
        ...topRatedMoviesData.results,
      ];
      return (
        moviePathMatch?.params.movieId &&
        allMoviesData.find(
          (movie) => String(movie.id) === moviePathMatch.params.movieId
        )
      );
    }
  }

  const movieData = clickedMovie();

  return (
    <Container>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <SliderContainer>
            <SliderTitle>상영중인 영화</SliderTitle>
            <Slider type="movie" url="nowPlaying" data={data} />
            <SliderTitle>인기있는 영화</SliderTitle>
            <Slider type="movie" url="popular" data={popularMoviesData} />
            <SliderTitle>별점이 높은 영화</SliderTitle>
            <Slider type="movie" url="topRated" data={topRatedMoviesData} />
            <SliderTitle>개봉 예정 영화</SliderTitle>
            <Slider type="movie" url="upcoming" data={upcomingMoviesData} />
          </SliderContainer>
        </>
      )}

      <AnimatePresence>
        {moviePathMatch && (
          <MovieModal
            type="movie"
            movieId={String(moviePathMatch.params.movieId)}
            movieData={Object(movieData)}
            url={String(moviePathMatch.params.type)}
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
const Overview = styled.p`
  font-size: 30px;
  color: white;
  width: 50%;
  margin-bottom: 100px;
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

export default HomePage;
