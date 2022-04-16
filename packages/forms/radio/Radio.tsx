import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Paragraph from "@/packages/typography/paragraph/Paragraph";

type Child = number | string | JSX.Element;

export interface IRadio {
  hideErrorMessage?: boolean;
  name?: string;
  value?: boolean;
  isDisabled?: boolean;
  error?: string;
  children?: Child | Child[];
  onChange?: (value: boolean) => void;
}

const StyledRadio = styled.label`
  display: inline-block;
`;

interface IStyledLabel {
  isError: boolean;
}

const StyledLabel = styled.span<IStyledLabel>`
  display: flex;
  min-width: 10px;
  cursor: pointer;

  &::before {
    content: "";

    flex-shrink: 0;
    width: 24px;
    height: 24px;

    border: ${({ isError }) =>
      isError
        ? "2px solid var(--color-warning) !important"
        : "1px solid var(--color-gray-200)"};

    border-radius: 50%;

    background-color: var(--color-white)
      ${({ isError }) => (isError ? " !important" : "")};
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

        box-shadow: ${({ isError }) =>
          isError
            ? "inset 0 0 0 4px var(--color-warning) !important"
            : "inset 0 0 0 5px var(--color-black)"};
      }

      &:hover {
        &::before {
          border-color: var(--color-gray-400);

          box-shadow: inset 0 0 0 5px var(--color-gray-400);
        }
      }
    }

    &:focus {
      + ${StyledLabel} {
        &::before {
          border-color: var(--color-gray-400);

          box-shadow: inset 0 0 0 5px var(--color-gray-400);
        }
      }
    }

    &:disabled {
      + ${StyledLabel} {
        &::before {
          border-color: var(--color-gray-200);

          background-color: var(--color-white);
          box-shadow: inset 0 0 0 5px var(--color-gray-200);
        }
      }
    }
  }
`;

const StyledText = styled.span`
  margin-left: 16px;
  min-width: 10px;
`;

const StyledError = styled.div`
  margin-top: 8px;
`;

const Radio: React.VFC<IRadio> = (props): JSX.Element => {
  const {
    name,
    value = false,
    isDisabled = false,
    error,
    children,
    onChange,
    hideErrorMessage = false,
  } = props;

  const [isChecked, setIsChecked] = useState(value);
  useEffect(() => setIsChecked(value), [value]);

  const isError = Boolean(error);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const { checked } = event.target;
    setIsChecked(checked);
    if (onChange) onChange(checked);
  };

  const color = isDisabled ? "gray-300" : "gray-400";

  return (
    <>
      <StyledRadio>
        <StyledInput
          type="radio"
          name={name}
          checked={isChecked}
          disabled={isDisabled}
          isError={isError}
          onChange={handleChange}
        />

        <StyledLabel isError={isError}>
          {children && (
            <StyledText>
              <Paragraph tag="span" color={color}>
                {children}
              </Paragraph>
            </StyledText>
          )}
        </StyledLabel>
      </StyledRadio>

      {error && !hideErrorMessage && (
        <StyledError>
          <Paragraph tag="span" size={12} color="warning">
            {error}
          </Paragraph>
        </StyledError>
      )}
    </>
  );
};

export default Radio;
