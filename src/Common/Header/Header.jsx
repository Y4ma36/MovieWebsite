import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";
import theme from "../../Styles/theme";

const Nav = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 40px 40px;
  z-index: 50;
  @media ${({ theme }) => theme.device.tablet} {
    justify-content: space-between;
  }
`;

const NavVariant = {};

const Col = styled.div`
  display: flex;
`;

const Header = () => {
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 90) {
      navAnimation.start({
        backgroundColor: "black",
      });
    } else {
      navAnimation.start({
        backgroundColor: "rgba(0,0,0,0)",
      });
    }
  });
  return (
    <AnimatePresence>
      <Nav variants={NavVariant} animate={navAnimation}>
        <Col>
          <LeftHeader />
        </Col>
        <Col>
          <RightHeader />
        </Col>
      </Nav>
    </AnimatePresence>
  );
};

export default Header;
