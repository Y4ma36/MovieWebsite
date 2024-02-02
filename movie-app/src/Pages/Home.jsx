import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMovies } from "../Services/api";
import styled from "styled-components";
import { makeImagePath } from "../Utils/MovieImage";

const Wrapper = styled.div``;

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
  justify-content: center;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`;

const Title = styled.h2`
  font-size: 50px;
  margin-top: 100px;
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
  text-align: center;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 25px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 18px;
  }
`;

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["movies", "trend"],
    queryFn: getMovies,
  });

  return (
    <Wrapper
      style={{
        height: "200vh",
        boxSizing: "border-box",
      }}
    >
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
