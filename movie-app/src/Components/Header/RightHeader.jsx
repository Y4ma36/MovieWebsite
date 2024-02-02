import React, { useState } from "react";
import { animate, motion, useAnimation, useScroll } from "framer-motion";
import styled from "styled-components";

const RightMenu = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap");
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
`;

const Search = styled.span`
  display: flex;
  align-items: center;
  margin-right: 20px;
  svg {
    height: 20px;
    fill: white;
  }
  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  padding: 5px 10px;
  padding-left: 40px;
  font-size: 15px;
  color: white;
  background-color: rgba(0, 0, 0, 0.1);
`;

const SearchBtn = styled.span`
  margin-left: 10px;
`;

const Notifi = styled.span`
  margin-right: 20px;
  svg {
    height: 25px;
    fill: white;
  }
`;

const Profile = styled.span`
  display: flex;
`;

const Picture = styled.img``;

const UserName = styled.h3``;

const RightHeader = () => {
  const [open, setOpen] = useState(false);
  const isOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <RightMenu>
        <Search>
          <Input
            type="text"
            placeholder="Search for movie or tv show..."
            transition={{ type: "linear" }}
            animate={{ scaleX: open ? 1 : 0 }}
          />
          <motion.svg
            onClick={isOpen}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            transition={{ type: "linear" }}
            animate={{ x: open ? -205 : 0 }}
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </motion.svg>
          <SearchBtn>Search</SearchBtn>
        </Search>
        <Notifi>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
          </svg>
        </Notifi>
        <Profile>
          <Picture></Picture>
          <UserName>Elijah Kim</UserName>
        </Profile>
      </RightMenu>
    </>
  );
};

export default RightHeader;
