import React, { useState } from "react";
import {
  PathMatch,
  useMatch,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { styled } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { makeImagePath } from "../../utils/makeImagePath";
import MovieModal from "../../components/common/MovieModal";
import Seo from "../../components/common/Seo";
import useSearchQueries from "../../components/hooks/useSearchQueries";

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

function SearchPage() {
  const [searchParams, _] = useSearchParams();
  const [selectIdx, setSelectIdx] = useState(0);
  const keyword = searchParams.get("keyword");
  const [{ data: movieData }, { data: tvData }] = useSearchQueries(
    String(keyword)
  );

  const navigate = useNavigate();

  const onBoxClicked = (id: number) => {
    if (selectIdx === 0) {
      navigate(`/search/movie/${id}?keyword=${keyword}`);
    } else {
      navigate(`/search/tv/${id}?keyword=${keyword}`);
    }
  };

  const pathMatch: PathMatch<string> | null = useMatch(
    "/search/:type/:movieId"
  );

  function clickedItem() {
    if (movieData && tvData) {
      const allData = [...movieData.results, ...tvData.results];
      return (
        pathMatch?.params.movieId &&
        allData.find((item) => String(item.id) === pathMatch.params.movieId)
      );
    }
  }

  const data = clickedItem();

  return (
    <Container>
      <Seo title="Search" />
      <SelectorContainer>
        <Select $isClicked={selectIdx === 0} onClick={() => setSelectIdx(0)}>
          Movies
        </Select>
        <Select $isClicked={selectIdx === 1} onClick={() => setSelectIdx(1)}>
          TV Shows
        </Select>
      </SelectorContainer>
      <Text>"{keyword}"을 검색한 결과입니다.</Text>
      <GridContainer>
        {(selectIdx === 0 ? movieData?.results : tvData?.results)?.map(
          (item) => {
            return (
              <Box
                layoutId={`search/${item.id}`}
                onClick={() => onBoxClicked(item.id)}
                whileHover="hover"
                variants={boxVar}
                key={item.id}
                $bgPhoto={makeImagePath(item.poster_path, "w500")}
              >
                <Info variants={infoVar}>
                  <h4>
                    {selectIdx === 0 ? item.original_title : item.original_name}
                  </h4>
                </Info>
              </Box>
            );
          }
        )}
      </GridContainer>
      <AnimatePresence>
        {pathMatch && (
          <MovieModal
            type={String(pathMatch.params.type)}
            movieId={String(pathMatch.params.movieId)}
            movieData={Object(data)}
            url="search"
          />
        )}
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  height: 100vh;
  padding-top: 100px;
  padding-left: 30px;
  padding-right: 30px;
  overflow: hidden;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.$bgPhoto});
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  position: relative;
  &:hover {
    z-index: 999999;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: #868484;
  width: 100%;
  h4 {
    text-align: center;
    font-size: 12px;
    color: white;
  }
  position: absolute;
  bottom: 0;
  opacity: 0;
`;

const Text = styled.h2`
  color: white;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: bold;
`;

const SelectorContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Select = styled.div<{ $isClicked: boolean }>`
  color: white;
  border: ${(props) =>
    props.$isClicked ? "1px solid #A70400" : "1px solid white"};
  border-radius: 10px;
  padding: 5px 8px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 20px;
  background-color: ${(props) => (props.$isClicked ? "#A70400" : "none")};
`;

export default SearchPage;
