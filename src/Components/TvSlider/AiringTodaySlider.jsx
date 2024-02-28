import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAiringToday } from "../../Services/api";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { makeImagePath } from "../../Utils/MovieImage";

const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap");
  font-size: 45px;
  font-family: "Protest Strike", sans-serif;
  padding: 40px;
  color: white;
`;
const Slider = styled.div`
  position: relative;
  svg {
    height: 65px;
    position: absolute;
    cursor: pointer;
    &:first-child {
      top: 160px;
      left: -20px;
      z-index: 1;
    }
    &:last-child {
      top: 160px;
      right: -20px;
      z-index: 1;
    }
    path {
      fill: white;
    }
  }
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  position: absolute;
`;

const Box = styled(motion.div)`
  height: 350px;
  width: 100%;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  position: relative;
`;

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
`;

const CountryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: #7f8fa6;
  opacity: 0.8;
  border-radius: 10px;
  width: 85px;
  height: 50px;
  right: 30px;
  top: 40px;
  position: absolute;
`;

const Country = styled.div`
  font-size: 25px;
`;

const Information = styled.div`
  padding-bottom: 40px;
  padding-left: 30px;
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 10px;
`;

const Genres = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const TvshowTitle = styled.h2`
  font-size: 30px;
  width: 70%;
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

const AiringTodaySlider = () => {
  const { data: airingToday } = useQuery({
    queryKey: ["airingToday"],
    queryFn: getAiringToday,
  });

  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const offSet = 3;

  const handleIndex = (action) => {
    if (leaving) {
      return null;
    }
    let totalAiringToday = airingToday.results.length - 5;
    let maxIndex = totalAiringToday / 3;
    toggleLeaving();
    if (action === "increase") {
      setBack(false);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
    if (action === "decrease") {
      setBack(true);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const increaseIndex = () => {
    handleIndex("increase");
  };

  const decreaseIndex = () => {
    handleIndex("decrease");
  };

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  if (!airingToday || !airingToday.results) {
    return null;
  }

  return (
    <>
      <Title>Airing Today ({airingToday.results.length - 5})</Title>
      <Slider>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={decreaseIndex}
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
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: "1.2" }}
            key={index}
            custom={back}
          >
            {airingToday.results
              .slice(offSet * index, offSet * index + offSet)
              .map((tvShow) => (
                <>
                  <Box
                    bgphoto={makeImagePath(tvShow.backdrop_path)}
                    key={tvShow.id}
                  >
                    <CountryWrapper>
                      <Country>{tvShow.origin_country}</Country>
                    </CountryWrapper>
                    <Information>
                      <Genres>Tv Shows</Genres>
                      <TvshowTitle>{tvShow.name}</TvshowTitle>
                    </Information>
                  </Box>
                  <Overlay />
                </>
              ))}
          </Row>
        </AnimatePresence>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={increaseIndex}
        >
          <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z" />
        </svg>
      </Slider>
    </>
  );
};

export default AiringTodaySlider;
