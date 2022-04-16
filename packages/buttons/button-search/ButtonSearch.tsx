import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { media } from '@/helpers/styleBreakpoints';
import themes from './themes';
import Icon from '@/packages/icon/Icon';

export interface IButtonSearch {
  isCross?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const StyledButtonSearch = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;

  background-color: var(--color-${({ theme }) => theme.default.backgroundColor});
  transition: background-color 0.2s;

  svg {
    fill: var(--color-${({ theme }) => theme.default.color});
  }

  &:hover,
  &:focus {
    background-color: var(--color-${({ theme }) => theme.hoverAndFocus.backgroundColor});

    svg {
      fill: var(--color-${({ theme }) => theme.hoverAndFocus.color});
    }
  }

  &:active {
    background-color: var(--color-${({ theme }) => theme.active.backgroundColor});

    svg {
      fill: var(--color-${({ theme }) => theme.active.color});
    }
  }

  &:disabled {
    background-color: var(--color-${({ theme }) => theme.disabled.backgroundColor});
    cursor: not-allowed;

    svg {
      fill: var(--color-${({ theme }) => theme.disabled.color});
    }
  }

  ${media.tablet} {
    width: 64px;
    height: 64px;
  }

  ${media.desktop} {
    width: 72px;
    height: 72px;
  }
`;

const StyledIconSmall = styled.span`
  display: flex;

  ${media.tablet} {
    display: none;
  }
`;

const StyledIconLarge = styled.span`
  display: none;

  ${media.tablet} {
    display: flex;
  }
`;

const ButtonSearch: React.VFC<IButtonSearch> = (props): JSX.Element => {
  const {
    isCross = false,
    isDisabled = false,
    onClick
  } = props;

  const theme = themes[isCross ? 'cross' : 'search'];
  const iconNameSmall = isCross ? 'cross-16' : 'search-16';
  const iconNameLarge = isCross ? 'cross-24' : 'search-24';

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledButtonSearch
        disabled={isDisabled}
        onClick={handleClick}
      >
        <StyledIconSmall>
          <Icon name={iconNameSmall} />
        </StyledIconSmall>
        <StyledIconLarge>
          <Icon name={iconNameLarge} />
        </StyledIconLarge>
      </StyledButtonSearch>
    </ThemeProvider>
  );
};

export default ButtonSearch;
