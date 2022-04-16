import React from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import themes from "./themes";
import Icon from "@/packages/icon/Icon";
import Loader from "@/packages/loader/Loader";

type Size = "s" | "l";

export interface IButton {
	type?: "button" | "submit" | "reset";
	variant?: "primary" | "secondary";
	color?: "brand" | "black" | "gray" | "white";
	size?: Size;
	hasSmallHorizontalPadding?: boolean;
	iconLeft?: string;
	iconRight?: string;
	isBlock?: boolean;
	isDisabled?: boolean;
	isLoading?: boolean;
	children: string;
	onClick?: () => void;
}

interface IStyledButton {
	size: Size;
	isBlock: boolean;
	hasSmallHorizontalPadding: boolean;
}

const StyledButton = styled.button<IStyledButton>`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: ${({ isBlock }) => (isBlock ? "100%" : "auto")};
	min-height: ${({ size }) => (size === "s" ? 48 : 64)}px;
	border: 1px solid var(--color-${({ theme }) => theme.default.borderColor});
	padding: ${({ size }) => (size === "s" ? 15 : 19)}px
		${({ hasSmallHorizontalPadding }) => (hasSmallHorizontalPadding ? 16 : 39)}px;

	font-family: var(--font-brand);
	font-size: 14px;
	font-weight: 500;
	line-height: 16px;
	text-transform: uppercase;
	color: var(--color-${({ theme }) => theme.default.color});

	background-color: var(--color-${({ theme }) => theme.default.backgroundColor});
	transition: all 0.2s;

	svg {
		fill: var(--color-${({ theme }) => theme.default.color});
		transition: fill 0.2s;
	}

	&:hover,
	&:focus {
		border-color: var(--color-${({ theme }) => theme.hoverAndFocus.borderColor});

		color: var(--color-${({ theme }) => theme.hoverAndFocus.color});

		background-color: var(--color-${({ theme }) => theme.hoverAndFocus.backgroundColor});

		svg {
			fill: var(--color-${({ theme }) => theme.hoverAndFocus.color});
		}
	}

	&:active {
		border-color: var(--color-${({ theme }) => theme.active.borderColor});

		color: var(--color-${({ theme }) => theme.active.color});

		background-color: var(--color-${({ theme }) => theme.active.backgroundColor});

		svg {
			fill: var(--color-${({ theme }) => theme.active.color});
		}
	}

	&:disabled {
		border-color: var(--color-${({ theme }) => theme.disabled.borderColor});

		color: var(--color-${({ theme }) => theme.disabled.color});

		background-color: var(--color-${({ theme }) => theme.disabled.backgroundColor});
		cursor: not-allowed;

		svg {
			fill: var(--color-${({ theme }) => theme.disabled.color});
		}
	}
`;

const StyledIconLeft = styled.span`
	display: flex;
	margin-right: 8px;
`;

const StyledIconRight = styled.span`
	display: flex;
	margin-left: 8px;
`;

const Button: React.VFC<IButton> = (props): JSX.Element => {
	const {
		type = "button",
		variant = "primary",
		color = "brand",
		size = "s",
		hasSmallHorizontalPadding = false,
		iconLeft,
		iconRight,
		isBlock = false,
		isDisabled = false,
		isLoading = false,
		children,
		onClick,
	} = props;

	const theme = themes[variant][color];

	const handleClick = () => {
		if (onClick) onClick();
	};

	return (
		<ThemeProvider theme={theme}>
			<StyledButton
				type={type}
				size={size}
				isBlock={isBlock}
				hasSmallHorizontalPadding={hasSmallHorizontalPadding}
				disabled={isDisabled}
				onClick={handleClick}
			>
				{!isLoading ? (
					<>
						{iconLeft && (
							<StyledIconLeft>
								<Icon name={iconLeft} />
							</StyledIconLeft>
						)}

						{children}

						{iconRight && (
							<StyledIconRight>
								<Icon name={iconRight} />
							</StyledIconRight>
						)}
					</>
				) : (
					<Loader size="s" />
				)}
			</StyledButton>
		</ThemeProvider>
	);
};

export default Button;
