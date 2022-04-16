import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { media } from "@/helpers/styleBreakpoints";
import Icon from "@/packages/icon/Icon";
import ButtonIcon from "@/packages/buttons/button-icon/ButtonIcon";
import Paragraph from "@/packages/typography/paragraph/Paragraph";

type Element = "input" | "textarea";
export type InputType = "text" | "password";

export interface IInput {
  element?: Element;
  label?: string;
  value?: string | number;
  list?: string;
  type?: InputType;
  description?: string;
  error?: string;
  icon?: string;
  buttonIcon?: string;
  isDisabled?: boolean;
  isControlled?: boolean;
  onChange?: (value: string) => void;
  onIconClick?: () => void;
  onBlur?: () => void;
}

interface IStyledInput {
  isError: boolean;
  isDisabled: boolean;
}

const StyledInput = styled.div<IStyledInput>`
  position: relative;

  border: 1px solid
    var(--color-${({ isError }) => (isError ? "warning" : "gray-200")});
  padding-top: 27px;

  font-family: var(--font-brand);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  background-color: var(
    --color-${({ isDisabled }) => (isDisabled ? "gray-100" : "white")}
  );

  ${media.tablet} {
    font-size: 16px;
    line-height: 24px;
  }
`;

interface IStyledLabel {
  isSmall: boolean;
}

const StyledLabel = styled.div<IStyledLabel>`
  position: absolute;
  top: ${({ isSmall }) => (isSmall ? 8 : 20)}px;
  left: 16px;

  font-family: inherit;
  font-size: ${({ isSmall }) => (isSmall ? "10px" : "inherit")};
  font-weight: inherit;
  line-height: ${({ isSmall }) => (isSmall ? "14px" : "inherit")};
  color: var(--color-gray-300);

  transition: all 0.4s;
  pointer-events: none;
`;

const StyledBorder = styled.div`
  position: absolute;
  bottom: -1px;
  left: -1px;

  width: 0;
  height: 2px;

  background-color: var(--color-black);
  transition: width 0.4s;
`;

const StyledIcon = styled.div`
  position: absolute;
  right: 16px;

  display: flex;
`;

interface IStyledElement {
  element: Element;
  hasIcon: boolean;
}

const StyledElement = styled.input<IStyledElement>`
  display: block;
  width: 100%;
  height: ${({ element }) => (element === "input" ? "auto" : "93px")};
  border: none;
  padding: 0 ${({ hasIcon }) => (hasIcon ? 47 : 15)}px 11px 15px;

  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  color: var(--color-black);

  resize: none;

  &:focus {
    ~ ${StyledLabel} {
      top: 8px;

      font-size: 10px;
      line-height: 14px;
    }
  }

  &:disabled {
    color: var(--color-gray-300);

    background-color: var(--color-gray-100);
    cursor: not-allowed;
  }

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }

  &:not(:disabled) {
    &:hover,
    &:focus {
      ~ ${StyledBorder} {
        width: calc(100% + 2px);
      }
    }
  }

  ~ ${StyledIcon} {
    ${({ element }) =>
      element === "input"
        ? css`
            top: 50%;

            transform: translateY(-50%);
          `
        : css`
            top: 24px;
          `}
  }
`;

const StyledDescription = styled.div`
  margin-top: 4px;
`;

const StyledError = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 4px;
`;

const Input: React.VFC<IInput> = (props): JSX.Element => {
  const {
    element = "input",
    type = "text",
    label,
    list,
    value,
    description,
    error,
    icon,
    buttonIcon,
    isDisabled = false,
    isControlled = false,
    onChange,
    onIconClick,
    onBlur,
  } = props;

  const [content, setContent] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => setContent(value), [value]);

  const isValid = Boolean(content) && !error;
  const isError = Boolean(error);
  const isLabelSmall = Boolean(content);

  const showButtonIcon = Boolean(buttonIcon);
  const showClearIcon =
    !icon && Boolean(content) && !showButtonIcon && isFocused;
  const showValidIcon = !icon && !showButtonIcon && !showClearIcon && isValid;
  const showErrorIcon = !icon && !showButtonIcon && !showClearIcon && isError;

  const hasIcon =
    showButtonIcon || showClearIcon || showValidIcon || showErrorIcon;

  const validIconColor = isDisabled ? "gray-300" : "success";
  const errorIconColor = isDisabled ? "gray-300" : "warning";

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setContent(newValue);
    if (onChange) onChange(newValue);
  };

  const handleButtonIconClick = () => {
    if (onIconClick) onIconClick();
  };

  const handleClearIconMouseDown = () => {
    setContent("");
    if (onChange) onChange("");
  };

  return (
    <>
      <StyledInput isError={isError} isDisabled={isDisabled}>
        <StyledElement
          as={element}
          list={list}
          type={type}
          element={element}
          value={isControlled ? value : content}
          disabled={isDisabled}
          hasIcon={hasIcon}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        {label && <StyledLabel isSmall={isLabelSmall}>{label}</StyledLabel>}

        <StyledBorder />

        {icon && (
          <StyledIcon as="button">
            <Icon name={icon} color="gray-300" />
          </StyledIcon>
        )}

        {buttonIcon && (
          <StyledIcon>
            <ButtonIcon
              size="s"
              icon={buttonIcon}
              isDisabled={isDisabled}
              onClick={handleButtonIconClick}
            />
          </StyledIcon>
        )}

        {showClearIcon && (
          <StyledIcon as="button" onMouseDown={handleClearIconMouseDown}>
            <Icon name="cross-16" color="gray-300" />
          </StyledIcon>
        )}

        {showValidIcon && (
          <StyledIcon>
            <Icon name="check-16" color={validIconColor} />
          </StyledIcon>
        )}

        {showErrorIcon && (
          <StyledIcon>
            <Icon name="alert-16" color={errorIconColor} />
          </StyledIcon>
        )}
      </StyledInput>

      {description && (
        <StyledDescription>
          <Paragraph size={10} color="gray-300">
            {description}
          </Paragraph>
        </StyledDescription>
      )}

      {error && (
        <StyledError>
          <Paragraph size={10} color="warning">
            {error}
          </Paragraph>
        </StyledError>
      )}
    </>
  );
};

export default Input;
