import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, getMovies } from "../../api/getMovies";
import { makeImagePath } from "../../utils/makeImagePath";

function HomePage() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <Container>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
          <Title>{data?.results[0].title}</Title>
          <Overview>{data?.results[0].overview}</Overview>
        </Banner>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 200vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
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
`;

export default HomePage;
