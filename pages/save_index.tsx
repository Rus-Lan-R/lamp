import React, { useContext, useState } from "react";
import Default from "@/layouts/default";
import { ThemeContext } from "@/contexts/ThemeContext";
import styled from "@emotion/styled";
import Paragraph from "@/packages/typography/paragraph/Paragraph";
import Container from "@/libs/Container";
import { FromTest } from "@/components/form/Form";
import { Canva } from "@/components/canvas/Canva";
import { useSendMessage } from "@/hooks/useProfile";

const StyledButton = styled.button`
  color: ${({ theme }) => theme.color["red-300"]};
  background-color: ${({ theme }) => theme.color["white"]};
  transition: all 0.2s;
`;

const Home: React.VFC<any> = (props) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const { mutate: sendMessage } = useSendMessage();

  const handleRequest = () => {
    console.log("click");

    sendMessage({
      data: "LMODE3",
      onSuccess: () => console.log("success"),
    });
  };
  return (
    <Default>
      <Container>
        <div>Test</div>
        <div>{theme}</div>
        <Paragraph> Paragraph</Paragraph>

        <StyledButton onClick={handleThemeChange} className="space-32">
          THEME
        </StyledButton>
        {/* <Canva /> */}

        <FromTest />
        <StyledButton onClick={handleRequest} className="space-32">
          Request
        </StyledButton>
      </Container>
    </Default>
  );
};

export default Home;
