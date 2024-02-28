import React from "react";
import { styled } from "styled-components";
import TopColumn from "./TopColumn";
import BottomColumn from "./BottomColumn";

const Wrapper = styled.div`
  height: 350px;
  padding: 0px 30px;
  margin-top: 30px;
`;

const Top = styled.div`
  height: 45%;
  width: 100%;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
`;

const Bottom = styled.div`
  height: 55%;
  width: 100%;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Top>
        <TopColumn />
      </Top>
      <Bottom>
        <BottomColumn />
      </Bottom>
    </Wrapper>
  );
};

export default Footer;
