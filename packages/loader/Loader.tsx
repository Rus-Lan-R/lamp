import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

type Size = "m" | "l" | "s";

export interface ILoader {
	size?: Size;
}

const rotation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

interface IStyledLoader {
	size: Size;
}

const StyledLoader = styled.span<IStyledLoader>`
	display: inline-block;
	width: ${({ size }) => (size === "m" ? 48 : size === "l" ? 72 : 24)}px;
	height: ${({ size }) => (size === "m" ? 48 : size === "l" ? 72 : 24)}px;
	border: ${({ size }) => (size === "s" ? 3 : 6)}px solid
		var(--color-${({ size }) => (size === "m" ? "gray-300" : size === "l" ? "red-100" : "white")});
	border-right-color: transparent;
	border-radius: 50%;

	animation: ${rotation} 1s infinite;
`;

const Loader: React.VFC<ILoader> = (props): JSX.Element => {
	const { size = "m" } = props;

	return <StyledLoader size={size} />;
};

export default Loader;
