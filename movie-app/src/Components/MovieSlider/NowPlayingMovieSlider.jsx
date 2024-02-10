import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { getNowPlayingMovie } from "../../Services/api";
import { makeImagePath } from "../../Utils/MovieImage";
import { AnimatePresence, motion } from "framer-motion";

const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap");
  font-size: 45px;
  font-family: "Protest Strike", sans-serif;
  padding: 40px;
  color: white;
`;

const Slider = styled.div``;

const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Wrapper = styled.div``;
const Box = styled.div`
  height: 300px;
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  border-radius: 20px;
`;

const MovieTitle = styled.h2`
  font-size: 25px;
  margin-top: 20px;
  margin-left: 10px;
`;

const NowPlayingMovieSlider = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["nowplayingMoive"],
    queryFn: getNowPlayingMovie,
  });
  const offSet = 3;
  const [index, setIndex] = useState(0);
  return (
    <>
      <Title>Now Playing</Title>
      <Slider>
        <Row key={index}>
          {data.results
            .slice(offSet * index + 1, offSet * index + offSet + 1)
            .map((movie) => (
              <Wrapper>
                <Box
                  bgphoto={makeImagePath(movie.backdrop_path)}
                  key={movie.id}
                ></Box>
                <MovieTitle>{movie.title}</MovieTitle>
              </Wrapper>
            ))}
        </Row>
      </Slider>
    </>
  );
};

export default NowPlayingMovieSlider;
