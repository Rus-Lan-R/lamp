import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Select from "react-dropdown-select";
import { media } from "@/helpers/styleBreakpoints";
import { colors } from "@/helpers/styleColors";
import Icon from "@/packages/icon/Icon";
import Paragraph from "@/packages/typography/paragraph/Paragraph";

export type Option = {
  value: string;
  description?: string;
  image?: string;
  id?: number;
  stock?: number;
  slug?: string;
};

export interface IDropdown {
  label?: string;
  options: Option[];
  selectedOptions?: Option[];
  error?: string;
  searchable?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;
  onSearch?: (arg: string) => void;
  onChange?: (selectedOptions: Option[]) => void;
  isTabsMode?: boolean;
  withBackground?: boolean;
}

interface IStyledLabel {
  isSmall: boolean;
}

const StyledLabel = styled.div<IStyledLabel>`
  position: absolute;
  top: ${({ isSmall }) => (isSmall ? 8 : 20)}px;
  left: 16px;

  font-size: ${({ isSmall }) => (isSmall ? "10px" : "inherit")};
  line-height: ${({ isSmall }) => (isSmall ? "14px" : "inherit")};
  color: ${colors.gray300};

  transition: all 0.4s;
  pointer-events: none;
`;

interface IStyledBorder {
  isWide: boolean;
}

const StyledBorder = styled.div<IStyledBorder>`
  position: absolute;
  bottom: -1px;
  left: -1px;

  width: ${({ isWide }) => (isWide ? "calc(100% + 2px)" : 0)};
  height: 2px;

  background-color: ${colors.black};
  transition: width 0.4s;
`;

const StyledIcon = styled.button`
  position: absolute;
  top: 50%;
  right: 15px;

  display: flex;

  transform: translateY(-50%);

  &:disabled {
    cursor: not-allowed;
  }
`;

interface IStyledDropdown {
  isError: boolean;
  isDisabled: boolean;
  isTabsMode: boolean;
  withBackground: boolean;
  isLabel: boolean;
}

const StyledDropdown = styled.div<IStyledDropdown>`
  position: relative;

  .react-dropdown-select {
    height: 60px;
    border: 1px solid
      ${({ isError }) => colors[isError ? "warning" : "gray200"]} !important;
    border-radius: 0;
    padding: ${({ isLabel }) => (isLabel ? 27 : 11)}px 47px 11px 15px;

    font-family: var(--font-brand);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: ${({ isDisabled }) => colors[isDisabled ? "gray300" : "black"]};

    background-color: ${({ isDisabled }) =>
      colors[isDisabled ? "gray100" : "white"]};
    box-shadow: none !important;
    opacity: 1;
    cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};

    ${media.tablet} {
      height: 64px;

      font-size: 16px;
      line-height: 24px;
    }

    &:focus {
      ${StyledLabel} {
        top: 8px;

        font-size: 10px;
        line-height: 14px;
      }
    }

    &:not(:disabled) {
      &:hover,
      &:focus {
        ${StyledBorder} {
          width: calc(100% + 2px);
        }
      }
    }

    ${({ isTabsMode }) => {
      if (isTabsMode) {
        return css`
          padding: 18px 47px 18px 16px;
          border-color: transparent !important;
          font-size: 16px;
          line-height: 1.5;

          ${StyledBorder} {
            background-color: ${colors.gray200};
          }
        `;
      }
    }}

    ${({ withBackground }) => {
      if (withBackground) {
        return css`
          background-color: ${colors.gray100};
        `;
      }
    }}
  }

  .react-dropdown-select-dropdown {
    top: calc(100% + 1px);

    border: none;
    border-radius: 0;

    box-shadow: var(--shadow-small);

    ${({ isTabsMode }) => {
      if (isTabsMode) {
        return css`
          box-shadow: var(--shadow-regular);
        `;
      }
    }}
  }

  .react-dropdown-select-dropdown-handle {
    display: none;
  }
`;

interface IStyledOption {
  hasImage: boolean;
  isSelected: boolean;
}

const StyledOption = styled.div<IStyledOption>`
  display: flex;
  align-items: center;
  min-height: ${({ hasImage }) => (hasImage ? 64 : 52)}px;
  height: ${({ hasImage }) => (hasImage ? 64 : 52)}px;
  padding-right: 16px;
  padding-left: 16px;

  background-color: ${({ isSelected }) =>
    colors[isSelected ? "gray200" : "white"]};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.gray100};
  }
`;

const StyledOptionCheckbox = styled.div`
  display: flex;
  margin-right: 8px;

  pointer-events: none;
`;

const StyledOptionImage = styled.img`
  margin-right: 8px;
  width: 56px;
  height: 56px;

  object-fit: cover;
`;

const StyledError = styled.div`
  margin-top: 4px;
  position: absolute;
  top: 100%;
`;

const StyledInput = styled.input<{ isSmall: boolean; isDisabled: boolean }>`
  font-size: inherit;
  line-height: inherit;
  color: ${colors.black};
  border: none;
  padding-bottom: 2px;
  width: 100%;
  transition: 0.4s;

  background-color: ${({ isDisabled }) =>
    colors[isDisabled ? "gray100" : "white"]};

  &::placeholder {
    transition: 0.4s;
    color: transparent;
  }

  &:focus {
    &::placeholder {
      color: ${colors.gray300};
    }
  }
`;

const Dropdown: React.VFC<IDropdown> = (props): JSX.Element => {
  const {
    label,
    options,
    selectedOptions,
    error,
    searchable = false,
    isMulti = false,
    isDisabled = false,
    onChange,
    onSearch,
    isTabsMode = false,
    withBackground = false,
  } = props;

  const [values, setValues] = useState(selectedOptions || []);
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setValues(selectedOptions || []);
    // if (!selectedOptions?.length && !)
    //   setSearchValue("")
  }, [selectedOptions]);

  useEffect(() => {
    if (searchable && selectedOptions?.length)
      setSearchValue(selectedOptions[0].value);
  }, []);

  const isError = Boolean(error);
  const isLabelSmall = isOpen || Boolean(values.length);
  const iconName = isOpen ? "chevron-up-16" : "chevron-down-16";
  const iconColor = isDisabled ? "gray-300" : "black";

  const contentRenderer = ({ methods }: any) => {
    const { dropDown } = methods;
    const { length } = values;

    let content = null;
    if (length === 1) content = values[0].value;
    if (length > 1) content = `Выбрано ${length}`;

    const onIconClick = () => dropDown("toggle");

    return (
      <>
        {label && <StyledLabel isSmall={isLabelSmall}>{label}</StyledLabel>}

        {searchable && (
          <StyledInput
            isDisabled={isDisabled}
            value={searchValue}
            placeholder="Поиск"
            isSmall={isLabelSmall}
            onChange={(value) => {
              if (onSearch) onSearch(value.target.value);
              setSearchValue(value.target.value);
            }}
            onFocus={() => {
              setSearchValue("");
              if (onSearch) onSearch("");
            }}
            onBlur={() => {
              if (!selectedOptions?.length) setSearchValue("");
              else setSearchValue(selectedOptions[0].value);
            }}
          />
        )}

        {!searchable && content}

        <StyledBorder isWide={isOpen} />

        <StyledIcon type="button" disabled={isDisabled} onClick={onIconClick}>
          <Icon name={iconName} color={iconColor} />
        </StyledIcon>
      </>
    );
  };

  const dropdownRenderer = ({ methods }: any) => {
    const { addItem, removeItem } = methods;

    const optionElements = options.map((option: Option, index: number) => {
      const { value, description, image } = option;

      const hasImage = Boolean(image);
      const isSelected = values.includes(option);

      const onClick = () => {
        if (isSelected) removeItem(null, option);
        else addItem(option);
      };

      return (
        <StyledOption
          key={index}
          hasImage={hasImage}
          isSelected={isSelected}
          onClick={onClick}
        >
          {/* {isMulti && (
            <StyledOptionCheckbox>
              <Checkbox value={isSelected} />
            </StyledOptionCheckbox>
          )} */}

          {image && <StyledOptionImage src={image} />}

          <div>
            <Paragraph>{value}</Paragraph>
            {description && (
              <Paragraph size={10} color="gray-300">
                {description}
              </Paragraph>
            )}
          </div>
        </StyledOption>
      );
    });

    return <>{optionElements}</>;
  };

  const noDataRenderer = () => (
    <StyledOption hasImage={false} isSelected={false}>
      <Paragraph>Ничего не найдено</Paragraph>
    </StyledOption>
  );

  const handleDropdownOpen = () => setIsOpen(true);
  const handleDropdownClose = () => setIsOpen(false);

  const handleChange = (newValues: Option[]) => {
    setValues(newValues);
    if (searchable && newValues.length && newValues[0]) {
      setSearchValue(newValues[0].value);
    }
    if (onChange) onChange(newValues);
  };

  return (
    <StyledDropdown
      isError={isError}
      isDisabled={isDisabled}
      isTabsMode={isTabsMode}
      withBackground={withBackground}
      isLabel={!!label}
    >
      <Select
        multi={isMulti}
        disabled={isDisabled}
        values={values}
        options={options}
        placeholder=""
        searchable={false}
        backspaceDelete={!searchable}
        contentRenderer={contentRenderer}
        dropdownRenderer={dropdownRenderer}
        noDataRenderer={noDataRenderer}
        onDropdownOpen={handleDropdownOpen}
        onDropdownClose={handleDropdownClose}
        onChange={handleChange}
      />

      {error && (
        <StyledError>
          <Paragraph size={10} color="warning">
            {error}
          </Paragraph>
        </StyledError>
      )}
    </StyledDropdown>
  );
};

export default Dropdown;
