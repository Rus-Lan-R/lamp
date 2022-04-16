import React, { useContext } from "react";
import styled from "@emotion/styled";
import { ThemeContext } from "@/contexts/ThemeContext";
import Container from "@/libs/Container";
import { useRouter } from "next/dist/client/router";

const StyledHeaderFrame = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 64px 0;
  background-color: ${({ theme }) => theme.color["white"]};
  border-bottom: 1px solid ${({ theme }) => theme.color["gray-300"]};
`;

const StyledButton = styled.button`
  color: ${({ theme }) => theme.color["red-300"]};
  background-color: ${({ theme }) => theme.color["white"]};
  transition: all 0.2s;
`;

const WrappedButtons = styled.button`
  color: ${({ theme }) => theme.color["red-300"]};
  background-color: ${({ theme }) => theme.color["white"]};
  border: 1px solid ${({ theme }) => theme.color["red-300"]};
  transition: all 0.2s;
  padding: 4px 8px;
`;

export const DesktopHeader: React.VFC = () => {
  const [theme, setTheme = () => {}] = useContext(ThemeContext);
  const router = useRouter();
  const handleThemeChange = () => {
    setTheme((prev: string) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <StyledHeaderFrame className="space-32">
      <StyledButton onClick={handleThemeChange} className="space-32">
        THEME
      </StyledButton>
      <WrappedButtons onClick={() => router.push("/")} className="space-32">
        ANIM
      </WrappedButtons>
      <WrappedButtons
        onClick={() => router.push("/colors")}
        className="space-32"
      >
        COLORS
      </WrappedButtons>
    </StyledHeaderFrame>
  );
};
