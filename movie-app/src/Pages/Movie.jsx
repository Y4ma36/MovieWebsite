import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovie } from ;

const Wrapper = styled.div``;

const Banner = styled.div``;

const Movie = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["nowplayingMoive"],
    queryFn: getNowPlayingMovie,
  });
  return (
    <Wrapper>
      <Banner></Banner>
    </Wrapper>
  );
};

export default Movie;
