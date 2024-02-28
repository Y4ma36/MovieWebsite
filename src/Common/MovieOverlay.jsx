import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { getDetailMovie, getVideoMovie } from "../Services/api";
import { makeImagePath, makeVideoPath } from "../Utils/MovieImage";
import YouTube from "react-youtube";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap");
  font-family: "Roboto", sans-serif;
`;

const Trailler = styled.div`
  height: 40%;
  width: 100%;
`;

const TopWrapper = styled.div`
  height: 30%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  h1 {
    font-size: 50px;
    margin-left: 20px;
  }
`;

const BottomWrapper = styled.div`
  height: 70%;
  width: 100%;

  display: flex;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Information = styled.div`
  height: 60%;
  width: 100%;
  background-color: #191819;
`;

const Overview = styled.div`
  width: 70%;
  height: 100%;

  h1 {
    font-size: 25px;
    margin-left: 20px;
  }
`;

const InfoList = styled.div`
  width: 30%;
  height: 100%;
  li {
    font-size: 20px;
  }
`;

const MovieOverlay = (props) => {
  const { movieId } = props;

  const { data: movieDetail } = useQuery({
    queryKey: ["TrendingmovieDetail", movieId],
    queryFn: () => getDetailMovie(movieId),
  });

  const TMDB_ID = movieDetail?.imdb_id;

  const { data: movieVideo } = useQuery({
    queryKey: ["videoMovie", TMDB_ID],
    queryFn: () => getVideoMovie(TMDB_ID),
  });

  return (
    <Wrapper>
      <Trailler>
        {movieVideo?.results && movieVideo.results.length > 0 && (
          <YouTube
            videoId={movieVideo?.results[0].key}
            opts={{
              width: "100%",
              playerVars: { autoplay: 1 },
            }}
          />
        )}
      </Trailler>
      <Information>
        <TopWrapper>
          <h1>{movieDetail?.title}</h1>
          <h3>RunTime: {movieDetail?.runtime}</h3>
          <h3>
            {movieDetail?.genres.map((item) => (
              <span>{item.name} </span>
            ))}
          </h3>
        </TopWrapper>
        <BottomWrapper>
          <Overview>
            <h1>{movieDetail?.overview}</h1>
          </Overview>
          <InfoList>
            <ul>
              <li>{movieDetail?.release_date}</li>
              <li>{}</li>
              <li></li>
            </ul>
          </InfoList>
        </BottomWrapper>
      </Information>
    </Wrapper>
  );
};

export default MovieOverlay;
