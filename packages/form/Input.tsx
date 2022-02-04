import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { media } from "@/helpers/styleBreakpoints";

type Element = "input" | "textarea";

export interface IInput {
  element?: Element;
  label?: string;
  value?: string | number;
  type?: "text" | "password";
  error?: string;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  mask?: string;
}

interface IStyledInput {
  isError: boolean;
  isDisabled: boolean;
}

const StyledInput = styled.div<IStyledInput>`
  position: relative;
  padding-top: 27px;

  font-family: var(--font-brand);
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  ${media.tablet} {
    font-size: 20px;
    line-height: 24px;
  }
`;

interface IStyledLabel {
  isSmall: boolean;
}

const StyledLabel = styled.div<IStyledLabel>`
  position: absolute;
  bottom: ${({ isSmall }) => (isSmall ? 42 : 8)}px;
  font-size: ${({ isSmall }) => (isSmall ? "12px" : "18px")};
  font-weight: inherit;
  line-height: ${({ isSmall }) => (isSmall ? "16px" : "24px")};

  opacity: ${({ isSmall }) => (isSmall ? "1" : "0.4")};

  transition: all 0.4s;
  pointer-events: none;
`;

const StyledBorder = styled.div<{ isError: boolean }>`
  position: absolute;
  bottom: -1px;
  left: -1px;
  width: 100%;

  ${({ theme, isError }) => {
    const borderColor = theme.color["input-border"];
    return isError
      ? css`
          background: linear-gradient(
            90deg,
            #ff4d31 0%,
            rgba(255, 123, 102, 0) 100%
          );
        `
      : css`
          background: linear-gradient(
            90deg,
            borderColor 0%,
            rgba(255, 255, 255, 0) 100%
          );
        `;
  }}
  height: 1px;

  transition: 0.4s;
`;

interface IStyledElement {
  element: Element;
}

const StyledElement = styled.input<IStyledElement>`
  display: block;
  width: 100%;
  height: ${({ element }) => (element === "input" ? "auto" : "93px")};
  border: none;
  padding: 0 15px 8px 0px;
  color: var(--color-white);
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  ${media.tablet} {
    font-size: 20px;
    line-height: 24px;
  }

  background-color: inherit;
  resize: none;

  &:focus {
    ~ ${StyledLabel} {
      bottom: 42px;
      opacity: 1;
      font-size: 12px;
      line-height: 16px;
    }
  }

  &:disabled {
    color: var(--color-gray-300);
    cursor: not-allowed;
  }

  &:not(:disabled) {
    &:hover,
    &:focus {
      ~ ${StyledBorder} {
        transition: 0.4s;
        height: 2px;
        background: linear-gradient(
          90deg,
          #00ded3 0%,
          rgba(0, 222, 211, 0) 100%
        );
      }
    }
  }
`;

export const Input: React.VFC<IInput> = (props): JSX.Element => {
  const {
    mask = "",
    element = "input",
    type = "text",
    label,
    value,
    error,
    isDisabled = false,
    onChange,
    onBlur,
  } = props;

  const [content, setContent] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => setContent(value), [value]);

  const isError = Boolean(error);
  const isLabelSmall = Boolean(content);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setContent(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <>
      <StyledInput isError={isError} isDisabled={isDisabled}>
        <StyledElement
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={isDisabled}
          value={content}
          type={type}
          element={element}
        />

        {label && <StyledLabel isSmall={isLabelSmall}>{label}</StyledLabel>}

        <StyledBorder isError={isError} />
      </StyledInput>
    </>
  );
};
