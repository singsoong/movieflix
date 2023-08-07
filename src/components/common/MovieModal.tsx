import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { makeImagePath } from "./../../utils/makeImagePath";

interface IMovie {
  title: string;
  backdrop_path: string;
  overview: string;
}

interface IMovieModalProps {
  movieId: string;
  movieData: IMovie;
}

function MovieModal({ movieId, movieData }: IMovieModalProps) {
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/");

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <Container layoutId={movieId}>
        <MovieImg
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${makeImagePath(
              movieData.backdrop_path,
              "w500"
            )})`,
          }}
        />
        <ContentContainer>
          <MovieTitle>{movieData.title}</MovieTitle>
          <MovieOverview>{movieData.overview}</MovieOverview>
        </ContentContainer>
      </Container>
    </>
  );
}

const Container = styled(motion.div)`
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  width: 700px;
  height: 80vh;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background-color: #302f2f;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  opacity: 0;
`;

const MovieImg = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const MovieTitle = styled.h3`
  font-size: 30px;
  color: white;
  position: relative;
  top: -70px;
  font-weight: bold;
`;

const MovieOverview = styled.p`
  color: white;
  position: relative;
  top: -50px;
`;

const ContentContainer = styled.div`
  padding-left: 20px;
`;

export default MovieModal;
