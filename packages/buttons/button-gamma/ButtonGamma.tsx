import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import themes from './themes';
import Icon from '@/packages/icon/Icon';

export interface IButtonGamma {
  type?: 'button' | 'submit' | 'reset';
  color?: 'black' | 'gray-400' | 'gray-300' | 'white' | 'red-100';
  iconLeft?: string;
  iconRight?: string;
  isDisabled?: boolean;
  children: string;
  onClick?: () => void;
}

const StyledButtonGamma = styled.button`
  display: inline-flex;
  align-items: center;

  font-family: var(--font-brand);
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  text-transform: uppercase;
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

const ButtonGamma: React.VFC<IButtonGamma> = (props): JSX.Element => {
  const {
    type = 'button',
    color = 'black',
    iconLeft,
    iconRight,
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
      <StyledButtonGamma
        type={type}
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

      </StyledButtonGamma>
    </ThemeProvider>
  );
};

export default ButtonGamma;
