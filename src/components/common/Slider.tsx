import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { styled } from "styled-components";
import { IGetMoviesResult } from "../../api/getMovies";
import { makeImagePath } from "../../utils/makeImagePath";
import useWindowDimensions from "../hooks/useWindowDimension";
import { useNavigate } from "react-router-dom";

const MAX_MOIVES = 6;

interface ISliderProps {
  data: IGetMoviesResult | undefined;
}

const infoVar = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const boxVar = {
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

function Slider({ data }: ISliderProps) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const increaseIndex = () => {
    if (data) {
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / MAX_MOIVES) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const width = useWindowDimensions();

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <Container onClick={increaseIndex}>
      <AnimatePresence initial={false}>
        <Row
          key={index}
          transition={{ type: "tween", duration: 0.7 }}
          initial={{ x: width + 10 }}
          animate={{ x: 0 }}
          exit={{ x: -width - 10 }}
        >
          {data?.results
            .slice(1)
            .slice(MAX_MOIVES * index, MAX_MOIVES * index + MAX_MOIVES)
            .map((movie) => (
              <Box
                layoutId={String(movie.id)}
                onClick={() => onBoxClicked(movie.id)}
                variants={boxVar}
                whileHover="hover"
                transition={{ type: "tween" }}
                key={movie.id}
                $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
              >
                <Info variants={infoVar}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-bottom: 10px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  height: 200px;
  font-size: 64px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: #868484;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 12px;
    color: white;
  }
`;

export default Slider;
