// @ts-nocheck

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { media } from '@/helpers/styleBreakpoints';
import themes from './themes';
import Icon from '@/packages/icon/Icon';

type Size = 's' | 'm'

export interface ICounter {
  size?: Size;
  min: number;
  max: number;
  value?: number;
  isDisabled?: boolean;
  onChange?: (value: number) => void;
}

const StyledCounter = styled.div`
  display: flex;
`;

interface IStyledButtonMinus {
  size: Size;
}

const StyledButtonMinus = styled.button<IStyledButtonMinus>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-${({ theme }) => theme.buttonMinus.default.borderColor});
  padding: ${({ size }) => size === 's' ? '11px 7px' : '21px'};

  color: var(--color-${({ theme }) => theme.buttonMinus.default.color});

  background-color: var(--color-${({ theme }) => theme.buttonMinus.default.backgroundColor});
  transition: all 0.2s;

  svg {
    fill: var(--color-${({ theme }) => theme.buttonMinus.default.color});
  }

  &:hover,
  &:focus {
    border-color: var(--color-${({ theme }) => theme.buttonMinus.hoverAndFocus.borderColor});

    color: var(--color-${({ theme }) => theme.buttonMinus.hoverAndFocus.color});

    background-color: var(--color-${({ theme }) => theme.buttonMinus.hoverAndFocus.backgroundColor});

    svg {
      fill: var(--color-${({ theme }) => theme.buttonMinus.hoverAndFocus.color});
    }
  }

  &:active {
    border-color: var(--color-${({ theme }) => theme.buttonMinus.active.borderColor});

    color: var(--color-${({ theme }) => theme.buttonMinus.active.color});

    background-color: var(--color-${({ theme }) => theme.buttonMinus.active.backgroundColor});

    svg {
      fill: var(--color-${({ theme }) => theme.buttonMinus.active.color});
    }
  }

  &:disabled {
    border-color: var(--color-${({ theme }) => theme.buttonMinus.disabled.borderColor});

    color: var(--color-${({ theme }) => theme.buttonMinus.disabled.color});

    background-color: var(--color-${({ theme }) => theme.buttonMinus.disabled.backgroundColor});
    cursor: not-allowed;

    svg {
      fill: var(--color-${({ theme }) => theme.buttonMinus.disabled.color});
    }
  }

  ${media.tablet} {
    padding: ${({ size }) => size === 's' ? '15px 7px' : '23px'};
  }
`;

interface IStyledButtonPlus {
  size: Size;
}

const StyledButtonPlus = styled.button<IStyledButtonPlus>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-${({ theme }) => theme.buttonPlus.default.borderColor});
  padding: ${({ size }) => size === 's' ? '11px 7px' : '21px'};

  color: var(--color-${({ theme }) => theme.buttonPlus.default.color});

  background-color: var(--color-${({ theme }) => theme.buttonPlus.default.backgroundColor});
  transition: all 0.2s;

  svg {
    fill: var(--color-${({ theme }) => theme.buttonPlus.default.color});
  }

  &:hover,
  &:focus {
    border-color: var(--color-${({ theme }) => theme.buttonPlus.hoverAndFocus.borderColor});

    color: var(--color-${({ theme }) => theme.buttonPlus.hoverAndFocus.color});

    background-color: var(--color-${({ theme }) => theme.buttonPlus.hoverAndFocus.backgroundColor});

    svg {
      fill: var(--color-${({ theme }) => theme.buttonPlus.hoverAndFocus.color});
    }
  }

  &:active {
    border-color: var(--color-${({ theme }) => theme.buttonPlus.active.borderColor});

    color: var(--color-${({ theme }) => theme.buttonPlus.active.color});

    background-color: var(--color-${({ theme }) => theme.buttonPlus.active.backgroundColor});

    svg {
      fill: var(--color-${({ theme }) => theme.buttonPlus.active.color});
    }
  }

  &:disabled {
    border-color: var(--color-${({ theme }) => theme.buttonPlus.disabled.borderColor});

    color: var(--color-${({ theme }) => theme.buttonPlus.disabled.color});

    background-color: var(--color-${({ theme }) => theme.buttonPlus.disabled.backgroundColor});
    cursor: not-allowed;

    svg {
      fill: var(--color-${({ theme }) => theme.buttonPlus.disabled.color});
    }
  }

  ${media.tablet} {
    padding: ${({ size }) => size === 's' ? '15px 7px' : '23px'};
  }
`;

interface IStyledInput {
  size: Size;
}

const StyledInput = styled.input<IStyledInput>`
  flex-grow: 1;
  margin: 0;
  width: 60px;
  border: 1px solid var(--color-${({ theme }) => theme.input.default.borderColor});
  border-right: none;
  border-left: none;
  border-radius: 0;
  padding: ${({ size }) => size === 's' ? '11px 12px' : '21px 22px'};

  font-family: var(--font-brand);
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
  color: var(--color-${({ theme }) => theme.input.default.color});

  background-color: var(--color-${({ theme }) => theme.input.default.backgroundColor});
  transition: all 0.2s;

  &:disabled {
    border-color: var(--color-${({ theme }) => theme.input.disabled.borderColor});

    color: var(--color-${({ theme }) => theme.input.disabled.color});

    background-color: var(--color-${({ theme }) => theme.input.disabled.backgroundColor});
    cursor: not-allowed;
  }

  ${media.tablet} {
    padding: ${({ size }) => size === 's' ? '15px 16px' : '23px 24px'};
  }
`;

const Counter: React.VFC<ICounter> = (props): JSX.Element => {
  const {
    size = 's',
    min,
    max,
    value = min,
    isDisabled = false,
    onChange
  } = props;

  const [innerValue, setInnerValue] = useState<number | string>(value);
  useEffect(() => setInnerValue(value), [value]);

  const theme = themes[size];

  const isMinusDisabled = isDisabled || innerValue === min;
  const isPlusDisabled = isDisabled || innerValue === max;

  const handleMinusClick = () => {
    const newValue = innerValue - 1;
    setInnerValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handlePlusClick = () => {
    const newValue = innerValue + 1;
    setInnerValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const digits = value.replace(/\D/g, '');

    let newValue;

    if (digits) {
      newValue = Number(digits);
      if (newValue < min) newValue = min;
      if (newValue > max) newValue = max;
    } else {
      newValue = '';
    }

    if (newValue === innerValue) return;

    setInnerValue(newValue);
    if (onChange && typeof newValue === 'number') onChange(newValue);
  };

  const handleBlur = () => {
    if (innerValue !== '') return;

    setInnerValue(min);
    if (onChange) onChange(min);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledCounter>

        <StyledButtonMinus
          size={size}
          disabled={isMinusDisabled}
          onClick={handleMinusClick}
        >
          <Icon name="minus-16" />
        </StyledButtonMinus>

        <StyledInput
          size={size}
          value={innerValue}
          disabled={isDisabled}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <StyledButtonPlus
          size={size}
          disabled={isPlusDisabled}
          onClick={handlePlusClick}
        >
          <Icon name="plus-16" />
        </StyledButtonPlus>

      </StyledCounter>
    </ThemeProvider>
  );
};

export default Counter;
