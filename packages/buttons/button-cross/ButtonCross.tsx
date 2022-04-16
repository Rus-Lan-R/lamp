import React from 'react';
import styled from '@emotion/styled';
import { media } from '@/helpers/styleBreakpoints';
import { colors } from '@/helpers/styleColors';
import Icon from '@/packages/icon/Icon';

export interface IButtonCross {
  isDisabled?: boolean;
  onClick?: () => void;
}

const StyledButtonCross = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  background-color: ${colors.gray400};
  transition: background-color 0.2s;

  svg {
    fill: ${colors.white};
  }

  &:hover,
  &:focus {
    background-color: ${colors.gray300};
  }

  &:active {
    background-color: ${colors.gray400};
  }

  &:disabled {
    background-color: ${colors.gray200};
    cursor: not-allowed;

    svg {
      fill: ${colors.gray300};
    }
  }

  ${media.tablet} {
    width: 48px;
    height: 48px;
  }
`;

const ButtonCross: React.VFC<IButtonCross> = (props): JSX.Element => {
  const { isDisabled = false, onClick } = props;

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <StyledButtonCross
      disabled={isDisabled}
      onClick={handleClick}
    >
      <Icon name="cross-24" />
    </StyledButtonCross>
  );
};

export default ButtonCross;
