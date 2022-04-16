// @ts-nocheck

import React from 'react';
import styled from '@emotion/styled';
import { css, ThemeProvider } from '@emotion/react';
import { media } from '@/helpers/styleBreakpoints';
import themes from './themes';
import Icon from '@/packages/icon/Icon';

type Size = 's' | 'm'

export interface IButtonIcon {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  color?: 'brand' | 'black' | 'gray' | 'white';
  size?: Size;
  icon: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

type Colors = {
  borderColor: string;
  color: string;
  backgroundColor: string;
}

const formatColors = (colors: Colors) => {
  const { borderColor, color, backgroundColor } = colors;

  const formattedBorderColor = borderColor.includes('rgba')
    ? borderColor
    : `var(--color-${borderColor})`;

  const formattedColor = color.includes('rgba')
    ? color
    : `var(--color-${color})`;

  const formattedBackgroundColor = backgroundColor.includes('rgba')
    ? backgroundColor
    : `var(--color-${backgroundColor})`;

  return css`
    border-color: ${formattedBorderColor};

    background-color: ${formattedBackgroundColor};

    svg {
      fill: ${formattedColor};
    }
  `;
};

interface IStyledButtonIcon {
  size: Size;
}

const StyledButtonIcon = styled.button<IStyledButtonIcon>`
  --size: ${({ size }) => {
    switch (size) {
      case 's':
        return 24;
      case 'm':
        return 40;
    }
  }}px;

  ${media.tablet} {
    --size: ${({ size }) => {
      switch (size) {
        case 's':
          return 24;
        case 'm':
          return 48;
      }
    }}px;
  }

  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: var(--size);
  width: var(--size);
  height: var(--size);
  border: 1px solid;
  border-radius: 50%;

  transition: all 0.2s;

  ${({ theme }) => {
    const { borderColor, color, backgroundColor } = theme.default;
    return formatColors({ borderColor, color, backgroundColor });
  }}

  &:hover,
  &:focus {
    ${({ theme }) => {
      const { borderColor, color, backgroundColor } = theme.hoverAndFocus;
      return formatColors({ borderColor, color, backgroundColor });
    }}
  }

  &:active {
    ${({ theme }) => {
      const { borderColor, color, backgroundColor } = theme.active;
      return formatColors({ borderColor, color, backgroundColor });
    }}
  }

  &:disabled {
    cursor: not-allowed;

    ${({ theme }) => {
      const { borderColor, color, backgroundColor } = theme.disabled;
      return formatColors({ borderColor, color, backgroundColor });
    }}
  }
`;

const ButtonIcon: React.VFC<IButtonIcon> = (props): JSX.Element => {
  const {
    type = 'button',
    variant = 'primary',
    color = 'brand',
    size = 'm',
    icon,
    isDisabled = false,
    onClick
  } = props;

  const theme = themes[variant][color];

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledButtonIcon
        type={type}
        size={size}
        disabled={isDisabled}
        onClick={handleClick}
      >
        <Icon name={icon} />
      </StyledButtonIcon>
    </ThemeProvider>
  );
};

export default ButtonIcon;
