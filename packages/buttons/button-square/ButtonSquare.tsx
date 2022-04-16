import React from 'react';
import styled from '@emotion/styled';
import { media } from '@/helpers/styleBreakpoints';
import { colors } from '@/helpers/styleColors';
import Icon from '@/packages/icon/Icon';

export interface IButtonSquare {
  icon: string;
  color?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const StyledButtonSquare = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;

  background-color: ${colors.gray100};
  transition: background-color 0.2s;

  &:hover,
  &:focus {
    background-color: ${colors.gray200};
  }

  &:active {
    background-color: ${colors.gray100};
  }

  &:disabled {
    background-color: ${colors.gray100};
    cursor: not-allowed;

    svg {
      fill: ${colors.gray200};
    }
  }

  ${media.tablet} {
    width: 64px;
    height: 64px;
  }
`;

const ButtonSquare: React.VFC<IButtonSquare> = (props): JSX.Element => {
  const {
    icon,
    color = 'black',
    isDisabled = false,
    onClick
  } = props;

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <StyledButtonSquare
      disabled={isDisabled}
      onClick={handleClick}
    >
      <Icon name={icon} color={color} />
    </StyledButtonSquare>
  );
};

export default ButtonSquare;
