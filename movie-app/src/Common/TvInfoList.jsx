import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { getDetailTv } from "../Services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faStar,
  faPlayCircle,
  faCircleArrowDown,
} from "@fortawesome/free-solid-svg-icons";

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
  font-size: 23px;
  text-align: center;
  height: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 20px;
  height: 100%;
  position: relative;
  svg {
    height: 30px;
    fill: white;
  }
  h3 {
    font-size: 20px;
    margin-left: 10px;
  }
`;

const Infomenu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  h3 {
    font-size: 25px;
    text-transform: uppercase;
  }
`;

const Rate = styled.div`
  margin-left: 10px;
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
  justify-content: space-evenly;
`;

const TvInfoList = (props) => {
  const { title, country, rating, tvId } = props;

  const { data: tvDetail } = useQuery({
    queryKey: ["tvDetail", tvId],
    queryFn: () => getDetailTv(tvId),
  });

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Info>
        <Infomenu>
          <FontAwesomeIcon icon={faPlayCircle} />
          <h3>{country} </h3>
          <Rate>
            <FontAwesomeIcon icon={faStar} />
            <span>{Math.floor(rating)}</span>
          </Rate>
          <MoreInfo>
            <FontAwesomeIcon icon={faCircleArrowDown} />
          </MoreInfo>
        </Infomenu>

        <Genre>
          {tvDetail &&
            tvDetail.genres &&
            tvDetail.genres.map((genre) => (
              <h3 key={genre.id}>{genre.name}</h3>
            ))}
        </Genre>
      </Info>
    </Wrapper>
  );
};

export default TvInfoList;
