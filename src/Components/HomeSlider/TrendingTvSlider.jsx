import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getPopularTvShows } from "../../Services/api";
import { makeImagePath } from "../../Utils/MovieImage";
import InfoList from "../../Common/TvInfoList";

const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap");
  font-size: 45px;
  font-family: "Protest Strike", sans-serif;
  padding: 40px;
`;

const Slider = styled.div`
  position: relative;
  .arrowIcon {
    position: absolute;
    height: 60px;
    cursor: pointer;
    path {
      fill: white;
    }
    &:first-child {
      top: 200px;
      left: -20px;
      z-index: 1;
    }
    &:last-child {
      top: 200px;
      right: -20px;
    }
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
`;

const Box = styled(motion.div)`
  height: 450px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 50px;
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

const TvOverlayWrapper = styled(motion.div)`
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

const rowVariants = {
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

const TrendingSlider = () => {
  const { data } = useQuery({
    queryKey: ["items"],
    queryFn: getPopularTvShows,
  });

  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const offSet = 6;

  const increaseIndex = () => {
    handleIndex("increase");
  };
  const decreaseIndex = () => {
    handleIndex("decrease");
  };
  const handleIndex = (action) => {
    if (leaving) return;
    toggleLeaving();
    const totalTv = data.results.length;
    const maxIndex = Math.floor(totalTv / offSet) - 1;

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

  if (!data || !data.results) {
    return null;
  }

  return (
    <>
      <Title>Top Tv Shows</Title>
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
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={back}
            transition={{ type: "tween", duration: "1.2" }}
            key={index}
          >
            {data.results
              .slice(offSet * index, offSet * index + offSet)
              .map((tv) => (
                <Box
                  key={tv.id}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  bgphoto={makeImagePath(tv.poster_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <InfoList
                      title={tv.name}
                      country={tv.origin_country}
                      rating={tv.vote_average}
                      tvId={tv.id}
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
    </>
  );
};

export default TrendingSlider;
