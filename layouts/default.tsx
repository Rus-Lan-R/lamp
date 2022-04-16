import React from "react";
import styled from "@emotion/styled";
import { Header } from "@/components/header/Header";

const StyledDefault = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
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
