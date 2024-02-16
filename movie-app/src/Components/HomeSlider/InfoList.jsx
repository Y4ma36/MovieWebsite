import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDetailTv } from "../../Services/api";

const Wrapper = styled.div`
  position: relative;
`;

const Title = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 5px;
`;

const Info = styled.div`
  svg {
    height: 30px;
    fill: white;
  }
  h3 {
    font-size: 20px;
  }
`;

const InfoList = (props) => {
  const { title, country, rating, tvId } = props;

  const { data } = useQuery({
    queryKey: ["detail"],
    queryFn: getDetailTv(tvId),
  });

  console.log(data);
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Info>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
        </svg>
        <h3>{country}</h3>
        <h3>{Math.floor(rating)}</h3>
      </Info>
    </Wrapper>
  );
};

export default InfoList;
