import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { animate, motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";
import theme from "../../Styles/theme";

const Nav = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 40px 40px;
  background-color: rgba(0, 0, 0, 0);
  @media ${({ theme }) => theme.device.tablet} {
    justify-content: space-between;
  }
`;

const Col = styled.div`
  display: flex;
`;

const Header = () => {
  return (
    <Nav>
      <Col>
        <LeftHeader />
      </Col>
      <Col>
        <RightHeader />
      </Col>
    </Nav>
  );
};

export default Header;
