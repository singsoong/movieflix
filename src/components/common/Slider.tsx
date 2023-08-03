import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { styled } from "styled-components";
import { IGetMoviesResult } from "../../api/getMovies";
import { makeImagePath } from "../../utils/makeImagePath";
import useWindowDimensions from "../hooks/useWindowDimension";

const MAX_MOIVES = 6;

interface ISliderProps {
  data: IGetMoviesResult | undefined;
}

function Slider({ data }: ISliderProps) {
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (data) {
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / MAX_MOIVES) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const width = useWindowDimensions();

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
                key={movie.id}
                $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
              />
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
  color: red;
  font-size: 64px;
`;

export default Slider;