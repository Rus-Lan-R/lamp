import React, { useContext } from "react";
import styled from "@emotion/styled";
import { ThemeContext } from "@/contexts/ThemeContext";

const StyledHeaderFrame = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color["white"]};
  border-bottom: 1px solid ${({ theme }) => theme.color["gray-300"]};
`;

const StyledButton = styled.button`
  color: ${({ theme }) => theme.color["red-300"]};
  background-color: ${({ theme }) => theme.color["white"]};
  transition: all 0.2s;
`;

export const DesktopHeader: React.VFC = () => {
  const [theme, setTheme = () => {}] = useContext(ThemeContext);

  const handleThemeChange = () => {
    setTheme((prev: string) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <StyledHeaderFrame className="space-32">
      <StyledButton onClick={handleThemeChange} className="space-32">
        THEME
      </StyledButton>
    </StyledHeaderFrame>
  );
};
