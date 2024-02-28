import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDetailMovie, getDetailTv } from "../Services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faStar,
  faPlayCircle,
  faCircleArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @import url("https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap");
  font-family: "Protest Strike", sans-serif;
`;

const Title = styled.div`
  font-size: 28px;
  text-align: center;
  height: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 20px;
  height: 100%;
  svg {
    height: 30px;
    fill: white;
  }
  h3 {
    font-size: 25px;
    margin-left: 10px;
  }
`;

const Infomenu = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 20px;
    font-size: 1px;
    color: #fbc531;
  }
  span:last-child {
    font-size: 25px;
    margin-left: 10px;
    color: white;
  }
  h3 {
    text-transform: uppercase;
  }
`;

const Rate = styled.div`
  display: flex;
  align-items: center;
  font-size: 1px;
  color: #fbc531;
  span {
    font-size: 30px;
    margin-left: 10px;
    color: white;
  }
`;

const MoreInfo = styled(motion.h3)`
  display: flex;
  position: absolute;
  right: 15px;
  cursor: pointer;
`;

const Genre = styled.div`
  display: flex;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

const GenreList = styled.div`
  font-size: 15px;
`;

const MovieInfoList = (props) => {
  const { title, country, rating, movieId } = props;

  const { data } = useQuery({
    queryKey: ["movieDetail", movieId],
    queryFn: () => getDetailMovie(movieId),
  });

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Info>
        <Infomenu>
          <FontAwesomeIcon icon={faPlayCircle} />
          <h3>{country}</h3>
          <Rate>
            <FontAwesomeIcon icon={faStar} />
            <span>{Math.floor(rating)}</span>
          </Rate>
          <MoreInfo>
            <FontAwesomeIcon icon={faCircleArrowDown} />
          </MoreInfo>
        </Infomenu>
        <Genre>
          {data &&
            data.genres &&
            data.genres
              .slice(0, 3)
              .map((genre) => (
                <GenreList key={genre.id}>{genre.name}</GenreList>
              ))}
        </Genre>
      </Info>
    </Wrapper>
  );
};

export default MovieInfoList;
