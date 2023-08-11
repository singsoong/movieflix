import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { makeImagePath } from "./../../utils/makeImagePath";
import { useQuery } from "@tanstack/react-query";
import { IGetMovieDetailData, getMovieDetail } from "../../api/getMovieDetail";

interface IMovie {
  title?: string;
  name?: string;
  backdrop_path: string;
  overview: string;
}

interface IMovieModalProps {
  movieId: string;
  movieData: IMovie;
  url: string;
}

function MovieModal({ movieId, movieData, url }: IMovieModalProps) {
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate(-1);
  };
  const { data: movieDetailData } = useQuery<IGetMovieDetailData>(
    ["moives", movieId],
    () => getMovieDetail(movieId)
  );

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <Container layoutId={`${url}/${movieId}`}>
        <MovieImg
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${makeImagePath(
              movieData.backdrop_path,
              "w500"
            )})`,
          }}
        >
          <TitleContainer>
            <MovieTitle>
              {movieData.title ? movieData.title : movieData.name}
            </MovieTitle>
            <MovieSubTitle>{movieDetailData?.original_title}</MovieSubTitle>
          </TitleContainer>
        </MovieImg>
        <CloseBtn onClick={onOverlayClick}>✕</CloseBtn>

        <PosterImg
          style={{
            backgroundImage: `url(${makeImagePath(
              String(movieDetailData?.poster_path)
            )})`,
          }}
        />
        <OverviewContainer>
          <MovieOverview>
            {movieDetailData?.release_date.slice(0, 4)}
            <Slice>·</Slice>
            {movieDetailData?.runtime}분<Slice>·</Slice>
            {movieDetailData?.genres[0]?.name}
            <Slice>·</Slice>
            {movieDetailData?.vote_average}점
          </MovieOverview>
          {movieDetailData?.tagline && (
            <MovieOverview>● {movieDetailData?.tagline}</MovieOverview>
          )}
          <MovieOverview>{movieData.overview}</MovieOverview>
        </OverviewContainer>
      </Container>
    </>
  );
}

const Container = styled(motion.div)`
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  width: 1000px;
  height: 750px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background-color: #302f2f;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 160%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  opacity: 0;
`;

const MovieImg = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
  position: relative;
`;

const PosterImg = styled.div`
  width: 300px;
  height: 400px;
  background-size: cover;
  background-position: center center;
  position: absolute;
  top: 300px;
  left: 20px;
`;

const TitleContainer = styled.div`
  position: absolute;
  left: calc(30% + 50px);
  bottom: 10px;
`;

const MovieTitle = styled.h3`
  font-size: 30px;
  color: white;
  font-weight: bold;
`;

const MovieSubTitle = styled(MovieTitle)`
  font-size: 20px;
`;

const OverviewContainer = styled.div`
  width: 65%;
  position: absolute;
  left: calc(30% + 50px);
  padding-top: 40px;
  line-height: 23px;
`;
const MovieOverview = styled.p`
  color: white;
  position: relative;
  top: -20px;
  margin-bottom: 20px;
`;

const CloseBtn = styled.div`
  color: white;
  font-size: 30px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  &:hover {
    color: black;
  }
`;

const Slice = styled.span`
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
`;

export default MovieModal;
