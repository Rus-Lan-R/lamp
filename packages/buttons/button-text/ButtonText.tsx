import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import themes from './themes';
import Icon from '@/packages/icon/Icon';

type Size = 's' | 'm' | 'l'

export interface IButtonText {
  type?: 'button' | 'submit' | 'reset';
  color?: 'gray-400' | 'gray-300' | 'white' | 'red-100';
  size?: Size;
  iconLeft?: string;
  iconRight?: string;
  isUnderlined?: boolean;
  isDisabled?: boolean;
  children: string;
  onClick?: () => void;
}

interface IStyledButtonText {
  size: Size;
  isUnderlined: boolean;
}

const StyledButtonText = styled.button<IStyledButtonText>`
  display: inline-flex;
  align-items: center;

  font-family: var(--font-brand);

  font-size: ${({ size }) => {
    switch (size) {
      case 's':
        return 12;
      case 'm':
        return 14;
      case 'l':
        return 16;
    }
  }}px;

  font-weight: 400;

  line-height: ${({ size }) => {
    switch (size) {
      case 's':
        return 16;
      case 'm':
        return 20;
      case 'l':
        return 24;
    }
  }}px;

  text-decoration: ${({ isUnderlined }) => isUnderlined ? 'underline' : 'none'};
  color: var(--color-${({ theme }) => theme.default.color});

  svg {
    fill: var(--color-${({ theme }) => theme.default.color});
  }

  &:hover,
  &:focus {
    color: var(--color-${({ theme }) => theme.hoverAndFocus.color});

    svg {
      fill: var(--color-${({ theme }) => theme.hoverAndFocus.color});
    }
  }

  &:active {
    color: var(--color-${({ theme }) => theme.active.color});

    svg {
      fill: var(--color-${({ theme }) => theme.active.color});
    }
  }

  &:disabled {
    color: var(--color-${({ theme }) => theme.disabled.color});

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

const ButtonText: React.VFC<IButtonText> = (props): JSX.Element => {
  const {
    type = 'button',
    color = 'gray-400',
    size = 'm',
    iconLeft,
    iconRight,
    isUnderlined = false,
    isDisabled = false,
    children,
    onClick
  } = props;

  const theme = themes[color];

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledButtonText
        type={type}
        size={size}
        isUnderlined={isUnderlined}
        disabled={isDisabled}
        onClick={handleClick}
      >

        {iconLeft && (
          <StyledIconLeft>
            <Icon name={iconLeft} />
          </StyledIconLeft>
        )}

        { children }

        {iconRight && (
          <StyledIconRight>
            <Icon name={iconRight} />
          </StyledIconRight>
        )}

      </StyledButtonText>
    </ThemeProvider>
  );
};

export default ButtonText;
