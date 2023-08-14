import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { styled } from "styled-components";
import { IGetMoviesResult } from "../../api/getNowplayingMovies";
import { makeImagePath } from "../../utils/makeImagePath";
import useWindowDimensions from "../hooks/useWindowDimension";
import { useNavigate } from "react-router-dom";
import { IGetTvResult } from "../../api/getAiringTodayTv";

const MAX_MOIVES = 6;

interface ISliderProps {
  data: IGetMoviesResult | IGetTvResult | undefined;
  url: string;
  type: "movie" | "tv";
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

function Slider({ data, url, type }: ISliderProps) {
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false); // 슬라이더 뒤로 갈지 앞으로 갈지
  const [isExit, setIsExit] = useState(true); // 애니메이션이 끝났는지 여부
  const toggleExit = () => setIsExit((prev) => !prev);

  const navigate = useNavigate();
  const increaseIndex = async () => {
    if (data) {
      if (!isExit) return; // 애니메이션이 끝나야함
      await setBack(false);
      toggleExit();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / MAX_MOIVES) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = async () => {
    if (data) {
      if (!isExit) return; // 애니메이션이 끝나야함
      await setBack(true);
      toggleExit();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / MAX_MOIVES) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const width = useWindowDimensions();

  const onBoxClicked = (movieId: number) => {
    if (type === "movie") {
      navigate(`/movies/${url}/${movieId}`);
    } else {
      navigate(`/tv/${url}/${movieId}`);
    }
  };

  return (
    <Container>
      <AnimatePresence
        initial={false}
        custom={back}
        onExitComplete={toggleExit}
      >
        <Row
          key={index}
          transition={{ type: "tween", duration: 0.7 }}
          initial={{ x: back ? -width - 10 : width + 10 }}
          animate={{ x: 0 }}
          exit={{ x: back ? width + 10 : -width - 10 }}
        >
          {data?.results
            .slice(1)
            .slice(MAX_MOIVES * index, MAX_MOIVES * index + MAX_MOIVES)
            .map((movie) => (
              <Box
                layoutId={String(`${url}/${movie.id}`)}
                onClick={() => onBoxClicked(movie.id)}
                variants={boxVar}
                whileHover="hover"
                transition={{ type: "tween" }}
                key={movie.id}
                $bgPhoto={
                  type === "tv"
                    ? makeImagePath(movie.poster_path, "w500")
                    : makeImagePath(movie.backdrop_path, "w500")
                }
              >
                <Info variants={infoVar}>
                  <h4>{type === "movie" ? movie.title : movie.name}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
      <PrevBtn onClick={decreaseIndex}>＜</PrevBtn>
      <NextBtn onClick={increaseIndex}>＞</NextBtn>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding-bottom: 250px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
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
    transform-origin: center right;
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

const Btn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: none;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  color: white;
  font-size: 30px;
  line-height: 30px;
  cursor: pointer;

  &:hover {
    color: black;
    background-color: #ffffffc0;
  }
`;

const NextBtn = styled(Btn)`
  right: 10px;
  top: 70px;
`;

const PrevBtn = styled(Btn)`
  left: 10px;
  top: 70px;
`;

export default Slider;
