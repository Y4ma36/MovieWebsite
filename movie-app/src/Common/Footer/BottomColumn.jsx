import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CopyRight = styled.h1`
  margin-top: 20px;
  font-size: 20px;
`;

const BottomColumn = () => {
  return (
    <Wrapper>
      <CopyRight>&#169; 2024 Movie & Tv Website</CopyRight>
    </Wrapper>
  );
};

export default BottomColumn;
