import React, { useContext, useState } from "react";
import Default from "@/layouts/default";
import { ThemeContext } from "@/contexts/ThemeContext";
import styled from "@emotion/styled";

import Container from "@/libs/Container";
import { Canva } from "@/components/canvas/Canva";
interface IHome {}

const StyledButton = styled.button`
  color: ${({ theme }) => theme.color["red-300"]};
  background-color: ${({ theme }) => theme.color["white"]};
  transition: all 0.2s;
`;

const StyledCanva = styled.div`
  height: 80vh;
`;

const Home: React.VFC<IHome> = (props) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Default>
      <Container>
        <StyledButton onClick={handleThemeChange} className="space-32">
          THEME
        </StyledButton>
        <StyledCanva>
          <Canva />
        </StyledCanva>
      </Container>
    </Default>
  );
};

export default Home;
