import React from "react";
import styled from "@emotion/styled";
import themes from "./themes";
import { ThemeProvider } from "@emotion/react";
type Child = number | string | JSX.Element;

export interface IParagraph {
  tag?: React.ElementType;
  size?: 10 | 12 | 14 | 16;
  weight?: 400 | 500;
  color?: string;
  children: Child | Child[];
}

interface IStyledParagraph {
  weight: 400 | 500;
  color: string;
}

const StyledParagraph = styled.div<IStyledParagraph>`
  font-family: var(--font-brand);
  font-size: ${({ theme }) => theme.mobile.fontSize};
  font-weight: ${({ weight }) => weight};
  line-height: ${({ theme }) => theme.mobile.lineHeight};
  color: ${({ theme, color }) => theme.color[color]};

  transition: color 0.2s;
`;

const Paragraph: React.VFC<IParagraph> = (props): JSX.Element => {
  const {
    tag = "p",
    size = 14,
    weight = 400,
    color = "black",
    children,
  } = props;

  const theme = themes[size];

  return (
    <ThemeProvider theme={theme}>
      <StyledParagraph as={tag} weight={weight} color={color}>
        {children}
      </StyledParagraph>
    </ThemeProvider>
  );
};

export default Paragraph;
