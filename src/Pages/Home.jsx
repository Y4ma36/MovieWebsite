import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../Services/api";
import styled from "styled-components";
import { makeImagePath } from "../Utils/MovieImage";
import { motion } from "framer-motion";
import TrendingSlider from "../Components/HomeSlider/TrendingTvSlider";
import TrendingMovieSlider from "../Components/HomeSlider/TrendingMovieSlider";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
`;

const Head = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap");
  font-size: 45px;
  font-family: "Roboto", sans-serif;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 50px;

  @media ${({ theme }) => theme.device.tablet} {
    margin-top: 150px;
    font-size: 40px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 25px;
  }
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 25px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 18px;
  }
`;

const Item = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 50px;
`;

const ItemList = styled(motion.div)`
  width: 200px;
  height: 255px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border-radius: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100px;
    height: 150px;
  }
`;

const TrendingTvList = styled.div`
  width: 100%;
  height: 600px;
  background-color: black;
  padding: 0px 30px;
  overflow: hidden;
`;

const TrendingMovieList = styled.div`
  width: 100%;
  height: 600px;
  padding: 0px 30px;
  overflow: hidden;
`;

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["items", "trend"],
    queryFn: getTrendingMovies,
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const numOfItem = windowWidth <= 800 ? 3 : 5;
  console.log(process.env.REACT_APP_MOVIE_API_KEY);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(data?.results?.[0]?.backdrop_path || "")}
          >
            <Head>Top Trending</Head>
            <Item>
              {data.results?.slice(1, 1 + numOfItem).map((items) => (
                <ItemList
                  key={items.id}
                  whileHover={{ scale: 1.3 }}
                  bgphoto={makeImagePath(items.poster_path || "")}
                ></ItemList>
              ))}
            </Item>
          </Banner>
          <TrendingTvList>
            <TrendingSlider />
          </TrendingTvList>
          <TrendingMovieList>
            <TrendingMovieSlider />
          </TrendingMovieList>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
