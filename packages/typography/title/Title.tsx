import React from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { media } from "@/helpers/styleBreakpoints";
import themes from "./themes";

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type Child = number | string | JSX.Element;

export interface ITitle {
  level: Level;
  color?: string;
  children: Child | Child[];
}

interface IStyledTitle {
  level: Level;
  color: string;
}

const StyledTitle = styled.div<IStyledTitle>`
  font-family: var(--font-brand);
  font-size: ${({ theme }) => theme.mobile.fontSize};
  font-weight: 500;
  line-height: ${({ theme }) => theme.mobile.lineHeight};
  color: ${({ theme, color }) => theme.color[color]};

  transition: color 0.2s;

  ${media.tablet} {
    font-size: ${({ theme }) => theme.tablet.fontSize};
    line-height: ${({ theme }) => theme.tablet.lineHeight};
  }

  ${media.desktop} {
    font-size: ${({ theme }) => theme.desktop.fontSize};
    line-height: ${({ theme }) => theme.desktop.lineHeight};
  }
`;

const Title: React.VFC<ITitle> = (props): JSX.Element => {
  const { level, color = "black", children } = props;

  const theme = themes[level];

  const tags: React.ElementType[] = ["h1", "h2", "h3", "h4", "h5", "h6"];
  const tag = tags[level - 1];

  return (
    <ThemeProvider theme={theme}>
      <StyledTitle as={tag} level={level} color={color}>
        {children}
      </StyledTitle>
    </ThemeProvider>
  );
};

export default Title;
