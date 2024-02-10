import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovie } from "../Services/api";
import { makeImagePath } from "../Utils/MovieImage";
import PopularMovieSlider from "../Components/MovieSlider/PopularMovieSlider";
import TopRatedMovieSlider from "../Components/MovieSlider/TopRatedMovieSlider";
import NowPlayingMovieSlider from "../Components/MovieSlider/NowPlayingMovieSlider";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @import url("https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap");
  font-family: "Protest Strike", sans-serif;
  overflow: auto;
  position: relative;
`;

const Loading = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  padding-left: 30px;
  position: relative;
  cursor: pointer;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  z-index: 2;
`;

const Title = styled.h1`
  font-size: 120px;
  margin-bottom: 20px;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-left: 20px;
  margin-bottom: 20px;
  svg {
    height: 30px;
    fill: white;
  }
`;

const VoteAverage = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 30px;
  svg {
    margin-right: 10px;
  }
`;

const VoteNumber = styled.span`
  font-size: 25px;
`;

const Language = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 30px;
  svg {
    margin-right: 10px;
  }
`;

const LanguageShow = styled.span`
  font-size: 25px;
`;

const ReleaseDate = styled.span`
  font-size: 25px;
`;

const Overview = styled.span`
  width: 30%;
  font-size: 25px;
  margin-left: 20px;
  margin-bottom: 40px;
`;

const MovieTraillerButton = styled.button`
  width: 200px;
  margin-left: 20px;
  height: 80px;
  font-size: 20px;
  color: white;
  background-color: #e84118;
  border-radius: 20px;
`;

const MovieTrailer = styled.span``;

const NowPlayingMovie = styled.div`
  width: 100%;
  height: 600px;
  padding: 0px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PopularMovie = styled.div`
  width: 100%;
  height: 600px;
  padding: 0px 30px;
`;
const TopRatedMovie = styled.div`
  width: 100%;
  height: 600px;
  padding: 0px 30px;
`;

const Movie = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["nowplayingMoive"],
    queryFn: getNowPlayingMovie,
  });

  if (!data || !data.results) {
    return null;
  }
  return (
    <Wrapper>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data.results[0].backdrop_path)}>
            <Overlay />
            <Content>
              <Title>{data.results[0].title}</Title>
              <Information>
                <VoteAverage>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                  </svg>
                  <VoteNumber>
                    {Math.ceil(data.results[0].vote_average)}
                  </VoteNumber>
                </VoteAverage>
                <Language>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z" />
                  </svg>
                  <LanguageShow>
                    {data.results[0].original_language}
                  </LanguageShow>
                </Language>
                <ReleaseDate>{data.results[0].release_date}</ReleaseDate>
              </Information>
              <Overview>{data.results[0].overview}</Overview>
              <MovieTraillerButton>
                <MovieTrailer>Watch Trailer</MovieTrailer>
              </MovieTraillerButton>
            </Content>
          </Banner>
          <NowPlayingMovie>
            <NowPlayingMovieSlider />
          </NowPlayingMovie>
          <PopularMovie>
            <PopularMovieSlider />
          </PopularMovie>
          <TopRatedMovie>
            <TopRatedMovieSlider />
          </TopRatedMovie>
        </>
      )}
    </Wrapper>
  );
};

export default Movie;
