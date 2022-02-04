import React from "react";
import styled from "@emotion/styled";
import { media } from "@/helpers/index";

interface IContainer {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 16px;
  ${media.tablet} {
    padding: 0 72px;
  }

  ${media.laptop} {
    padding: 0 40px;
  }
  ${media.desktop} {
    padding: 0 136px;
  }
`;

const Container: React.VFC<IContainer> = ({
  children,
  className = null,
}): JSX.Element => {
  return (
    <StyledContainer className={className || ""}>{children}</StyledContainer>
  );
};

export default Container;
