import React from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";

const Logo = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap");
  font-size: 40px;
  margin-right: 20px;
  font-family: "Roboto", sans-serif;
  a {
    color: inherit;
    text-decoration: none;
  }
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 30px;
  }
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  font-size: 20px;
  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const MenuList = styled.li`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap");
  font-family: "Roboto", sans-serif;
  margin-right: 20px;
  position: relative;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const UnderBar = styled(motion.span)`
  position: absolute;
  width: 35px;
  height: 0.5px;
  background-color: red;
  bottom: -5px;
  left: 0px;
  right: 0px;
  margin: 0 auto;
`;

const FirstHeader = () => {
  const homeMatch = useMatch("/");
  const movieMatch = useMatch("/movie");
  const tvMatch = useMatch("/tv");
  const myListMatch = useMatch("/mylist");

  return (
    <>
      <Logo>
        <Link to="/">LOGO</Link>
      </Logo>
      <Menu>
        <MenuList>
          <Link to="/">Home</Link>
          {homeMatch && <UnderBar layoutId="underbar" />}
        </MenuList>
        <MenuList>
          <Link to="/movie">Movie</Link>
          {movieMatch && <UnderBar layoutId="underbar" />}
        </MenuList>
        <MenuList>
          <Link to="/tv">Tv Shows</Link>
          {tvMatch && <UnderBar layoutId="underbar" />}
        </MenuList>
        <MenuList>
          <Link to="/mylist"> My List</Link>
          {myListMatch && <UnderBar layoutId="underbar" />}
        </MenuList>
      </Menu>
    </>
  );
};

export default FirstHeader;
