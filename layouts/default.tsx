import React from "react";
import styled from "@emotion/styled";
import { media } from "@/helpers/index";
import { Header } from "@/components/header/Header";
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${media.laptop} {
    flex-direction: row;
  }
`;

const StyledDefault = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Default: React.VFC<IDefault> = ({ children }): JSX.Element => {
  return (
    <StyledDefault>
      <Header />
      {children}
    </StyledDefault>
  );
};

interface IDefault {
  children: JSX.Element | JSX.Element[];
}

export default Default;
