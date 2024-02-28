import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getPopularTvShows } from "../Services/api";
import { makeImagePath } from "../Utils/MovieImage";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import AiringTodaySlider from "../Components/TvSlider/AiringTodaySlider";
import PopularTvSlider from "../Components/TvSlider/PopularTvSlider";
import TopRatedTvSlider from "../Components/TvSlider/TopRatedTvSlider";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @import url("https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap");
  font-family: "Protest Strike", sans-serif;
  overflow: hidden;
  position: relative;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled(motion.div)`
  width: 100%;
  position: relative;
  .arrowIcon {
    height: 80px;
    transform: translateY(500%);
    position: absolute;
    cursor: pointer;
    fill: white;
    &:first-child {
      top: 0px;
      left: 20px;
      z-index: 1;
    }
    &:last-child {
      top: 0px;
      right: 20px;
      z-index: 1;
    }
  }
`;

const BannerBox = styled(motion.div)`
  height: 100vh;
  background-image: url(${(props) => props.bgphoto});
  background-position: center;
  background-size: cover;
  padding-left: 30px;
  display: flex;
  align-items: center;
  padding-left: 150px;
`;

const Information = styled.div``;

const Description = styled.h2`
  font-size: 40px;
  margin-bottom: 15px;
`;

const TvShowTitle = styled.h1`
  font-size: 70px;
  width: 60%;
  margin-bottom: 30px;
`;

const WatchNowBtn = styled.div`
  display: flex;
  align-items: center;
  svg {
    position: static;
    height: 35px;
    fill: white;
    margin-right: 10px;
  }
`;

const WatchNow = styled.button`
  font-size: 25px;
  padding: 20px 20px;
  background-color: black;
  border-style: none;
  border-radius: 20px;
  cursor: pointer;
  color: white;
  transition: all 0.5s;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const PageCircle = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  bottom: 20px;
  left: 50%;
`;

const FiveCircle = styled(motion.div)`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: ${(props) =>
    props.current_array_index === props.current_index ? "#353b48" : "white"};
`;

const AiringToday = styled.div`
  width: 100%;
  height: 600px;
  padding: 0px 30px;
`;

const PopularTv = styled.div`
  width: 100%;
  height: 600px;
  padding: 0px 30px;
`;

const TopRatedTv = styled.div`
  width: 100%;
  height: 600px;
  padding: 0px 30px;
`;

const Tv = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["PopularTvShows"],
    queryFn: getPopularTvShows,
  });
  const [bannerIndex, setBannerIndex] = useState(0);
  const [back, setBack] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const bannerOffSet = 1;

  const handleIndex = (action) => {
    if (leaving) {
      return null;
    }

    let totalTvShows = data.results.length;
    let maxIndex = totalTvShows / 4 - 1;

    if (action === "increase") {
      setBack(false);
      setBannerIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
    if (action === "decrease") {
      setBack(true);
      setBannerIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
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

  if (!data || !data.results) {
    return null;
  }

  let emptyArray = new Array(5).fill().map((element, index) => index);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="arrowIcon"
              onClick={decreaseIndex}
            >
              <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9L117.5 269.8c-3.5-3.8-5.5-8.7-5.5-13.8s2-10.1 5.5-13.8l99.9-107.1c4.2-4.5 10.1-7.1 16.3-7.1c12.3 0 22.3 10 22.3 22.3l0 57.7 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 57.7c0 12.3-10 22.3-22.3 22.3c-6.2 0-12.1-2.6-16.3-7.1z" />
            </svg>
            {data.results
              .slice(
                bannerIndex * bannerOffSet,
                bannerIndex * bannerOffSet + bannerOffSet
              )
              .map((tvShows) => (
                <AnimatePresence
                  custom={back}
                  initial={false}
                  onExitComplete={toggleLeaving}
                  key={tvShows.id}
                >
                  <BannerBox
                    bgphoto={makeImagePath(tvShows.backdrop_path)}
                    custom={back}
                  >
                    <Information>
                      <Description>TvShows</Description>
                      <TvShowTitle>{tvShows.name}</TvShowTitle>
                      <WatchNowBtn>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path d="M64 64V352H576V64H64zM0 64C0 28.7 28.7 0 64 0H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM128 448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                        </svg>
                        <WatchNow>Watch Now</WatchNow>
                      </WatchNowBtn>
                    </Information>
                    <PageCircle>
                      {emptyArray.map((circle) => (
                        <FiveCircle
                          key={circle}
                          current_array_index={circle}
                          current_index={bannerIndex}
                        ></FiveCircle>
                      ))}
                    </PageCircle>
                  </BannerBox>
                </AnimatePresence>
              ))}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="arrowIcon"
              onClick={increaseIndex}
            >
              <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z" />
            </svg>
          </Banner>
          <AiringToday>
            <AiringTodaySlider />
          </AiringToday>
          <PopularTv>
            <PopularTvSlider />
          </PopularTv>
          <TopRatedTv>
            <TopRatedTvSlider />
          </TopRatedTv>
        </>
      )}
    </Wrapper>
  );
};

export default Tv;
