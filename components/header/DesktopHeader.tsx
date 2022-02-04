import React from "react";
import styled from "@emotion/styled";

const StyledHeaderFrame = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color["white"]};
  border-bottom: 1px solid ${({ theme }) => theme.color["gray-300"]};
`;

export const DesktopHeader: React.VFC = () => {
  return <StyledHeaderFrame className="space-32"></StyledHeaderFrame>;
};
