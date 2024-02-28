import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../Services/api";
import { makeImagePath } from "../../Utils/MovieImage";
import MovieInfoList from "../../Common/MovieInfoList";
import { useMatch, useNavigate } from "react-router-dom";
import MovieOverlay from "../../Common/MovieOverlay";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap");
  font-size: 45px;
  font-family: "Protest Strike", sans-serif;
  padding: 40px;
  color: white;
`;

const Slider = styled.div`
  .arrowIcon {
    position: absolute;
    height: 60px;
    cursor: pointer;
    path {
      fill: white;
    }
    &:first-child {
      top: 300px;
      left: -20px;
      z-index: 1;
    }
    &:last-child {
      top: 300px;
      right: -20px;
      z-index: 1;
    }
  }
`;

const Row = styled(motion.div)`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
`;

const Box = styled(motion.div)`
  height: 450px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  background-color: black;
  height: 30%;
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const MovieOverlayWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 40vw;
  height: 90vh;
  margin: auto;
  background-color: black;
  z-index: 50;
`;

const BackgroundOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 10;
`;

const rowVariant = {
  hidden: (back) => ({
    x: back ? -window.innerWidth : window.innerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (back) => ({
    x: back ? window.innerWidth : -window.innerWidth,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
    transition: {
      type: "tween",
    },
  },
  hover: {
    zIndex: 30,
    scale: 1.2,
    y: -45,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const TrendingMovieSlider = () => {
  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: getPopularMovies,
  });
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);

  const movieMatch = useMatch("/home/:movieId");

  const navigate = useNavigate();

  const offSet = 6;

  const increaseIndex = () => {
    handleIndex("increase");
  };
  const decreaseIndex = () => {
    handleIndex("decrease");
  };
  const handleIndex = (action) => {
    if (leaving) {
      return;
    }
    toggleLeaving();
    let total = data.results.length;
    let maxIndex = Math.floor(total / offSet - 1);
    if (action === "increase") {
      setBack(false);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
    if (action === "decrease") {
      setBack(true);
      setIndex((prev) => (prev === 0 ? 2 : prev - 1));
    }
  };

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onBoxClicked = (movieId) => {
    navigate(`/home/${movieId}`);
  };

  const onOverlayClick = () => {
    navigate(-1);
  };

  if (!data || !data.results) {
    return null;
  }

  return (
    <Wrapper>
      <Title>Top Movies</Title>
      <Slider>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={decreaseIndex}
          className="arrowIcon"
        >
          <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9L117.5 269.8c-3.5-3.8-5.5-8.7-5.5-13.8s2-10.1 5.5-13.8l99.9-107.1c4.2-4.5 10.1-7.1 16.3-7.1c12.3 0 22.3 10 22.3 22.3l0 57.7 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 57.7c0 12.3-10 22.3-22.3 22.3c-6.2 0-12.1-2.6-16.3-7.1z" />
        </svg>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={back}
        >
          <Row
            variants={rowVariant}
            custom={back}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: "1.2" }}
            key={index}
          >
            {data.results
              .slice(offSet * index, offSet * index + offSet)
              .map((movie) => (
                <Box
                  bgphoto={makeImagePath(movie.poster_path, "w500")}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  onClick={() => onBoxClicked(movie.id)}
                  layoutId={movie.id + ""}
                  key={movie.id}
                >
                  <Info variants={infoVariants}>
                    <MovieInfoList
                      title={movie.title}
                      country={movie.original_language}
                      rating={movie.vote_average}
                      movieId={movie.id}
                    />
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={increaseIndex}
          className="arrowIcon"
        >
          <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z" />
        </svg>
      </Slider>
      <AnimatePresence>
        {movieMatch ? (
          <>
            <BackgroundOverlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <MovieOverlayWrapper
              layoutId={movieMatch.params.movieId}
              onClick={onOverlayClick}
            >
              <MovieOverlay movieId={movieMatch.params.movieId} />
            </MovieOverlayWrapper>
          </>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
};

export default TrendingMovieSlider;
