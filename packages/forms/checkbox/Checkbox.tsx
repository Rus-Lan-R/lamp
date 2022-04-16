import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Paragraph from '@/packages/typography/paragraph/Paragraph';

const checkWhite = 'data:image/svg+xml,%3Csvg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12"%3E%3Cpath d="M5.74 9.3L14.57.49l1.06 1.06-9.89 9.89-5.39-5.4 1.06-1.05L5.74 9.3z" fill="%23fff"/%3E%3C/svg%3E';
const checkGray = 'data:image/svg+xml,%3Csvg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12"%3E%3Cpath d="M5.74 9.3L14.57.49l1.06 1.06-9.89 9.89-5.39-5.4 1.06-1.05L5.74 9.3z" fill="%23AAA"/%3E%3C/svg%3E';

type Child = number | string | JSX.Element

export interface ICheckbox {
  value?: boolean;
  isDisabled?: boolean;
  error?: string;
  children?: Child | Child[];
  onChange?: (value: boolean) => void;
}

const StyledCheckbox = styled.label`
  display: inline-block;
  position: relative;
`;

interface IStyledLabel {
  isError: boolean;
}

const StyledLabel = styled.span<IStyledLabel>`
  display: flex;

  cursor: pointer;

  &::before {
    content: '';

    flex-shrink: 0;
    width: 24px;
    height: 24px;

    border: ${({ isError }) => isError
      ? '2px solid var(--color-warning) !important'
      : '1px solid var(--color-gray-200)'
    };

    background-color: var(--color-white)${({ isError }) => isError ? ' !important' : ''};
    background-position: center;
    background-size: 16px;
    background-repeat: no-repeat;
  }

  &:hover {
    &::before {
      border-color: var(--color-gray-400);
    }
  }
`;

interface IStyledInput {
  isError: boolean;
}

const StyledInput = styled.input<IStyledInput>`
  position: absolute;

  margin: -1px;
  width: 1px;
  height: 1px;
  border: 0;
  padding: 0;

  white-space: nowrap;

  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;

  &:focus {
    + ${StyledLabel} {
      &::before {
        border-color: var(--color-gray-400);
      }
    }
  }

  &:disabled {
    + ${StyledLabel} {
      cursor: not-allowed;

      &::before {
        border-color: var(--color-gray-200);

        background-color: var(--color-gray-100);
      }
    }
  }

  &:checked {
    + ${StyledLabel} {
      &::before {
        border-color: var(--color-black);

        background-color: ${({ isError }) => isError
          ? 'var(--color-warning) !important'
          : 'var(--color-black)'
        };

        background-image: url('${checkWhite}')${({ isError }) => isError ? ' !important' : ''};
      }

      &:hover {
        &::before {
          border-color: var(--color-gray-400);

          background-color: var(--color-gray-400);
        }
      }
    }

    &:focus {
      + ${StyledLabel} {
        &::before {
          border-color: var(--color-gray-400);

          background-color: var(--color-gray-400);
        }
      }
    }

    &:disabled {
      + ${StyledLabel} {
        &::before {
          border-color: var(--color-gray-200);

          background-color: var(--color-gray-100);
          background-image: url('${checkGray}');
        }
      }
    }
  }
`;

const StyledText = styled.span`
  margin-left: 16px;
`;

const StyledError = styled.div`
  margin-top: 8px;
  position: absolute;
  top: 100%;
`;

const Checkbox: React.VFC<ICheckbox> = (props): JSX.Element => {
  const {
    value = false,
    isDisabled = false,
    error,
    children,
    onChange
  } = props;

  const [isChecked, setIsChecked] = useState(value);
  useEffect(() => setIsChecked(value), [value]);

  const isError = Boolean(error);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked } = event.target;
    setIsChecked(checked);
    if (onChange) onChange(checked);
  };

  const color = isDisabled ? 'gray-300' : 'gray-400';

  return (
    <>

      <StyledCheckbox>

        <StyledInput
          type="checkbox"
          checked={isChecked}
          disabled={isDisabled}
          isError={isError}
          onChange={handleChange}
        />

        <StyledLabel isError={isError}>
          {children && (
            <StyledText>
              <Paragraph tag="span" color={color}>
                { children }
              </Paragraph>
            </StyledText>
          )}
        </StyledLabel>

      </StyledCheckbox>

      {error && (
        <StyledError>
          <Paragraph tag="span" size={12} color="warning">
            { error }
          </Paragraph>
        </StyledError>
      )}

    </>
  );
};

export default Checkbox;
