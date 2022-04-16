import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Select from "react-dropdown-select";
import { media, mediaRevers } from "@/helpers/styleBreakpoints";
import { colors } from "@/helpers/styleColors";
import Icon from "@/packages/icon/Icon";
import Paragraph from "@/packages/typography/paragraph/Paragraph";
import Checkbox from "@/packages/forms/checkbox/Checkbox";

type Option = {
  value: string;
  description?: string;
  image?: string;
  id?: number;
  stock?: number;
  mask?: string;
  regex?: RegExp;
  label?: string;
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

  background-color: ${colors.white};
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
}

const StyledDropdown = styled.div<IStyledDropdown>`
  ${media.tablet} {
    position: relative;
  }

  .react-dropdown-select {
    height: 60px;
    border: 1px solid
      ${({ isError }) => colors[isError ? "warning" : "gray400"]} !important;
    border-radius: 0;
    padding: 27px 47px 11px 15px;

    font-family: var(--font-brand);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: ${({ isDisabled }) => colors[isDisabled ? "gray300" : "white"]};

    background-color: ${({ isDisabled }) =>
      colors[isDisabled ? "gray100" : "black"]};
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
  }

  .react-dropdown-select-dropdown {
    top: calc(100% + 1px);

    border: none;
    border-radius: 0;

    box-shadow: var(--shadow-small);

    ${mediaRevers.tablet} {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 20;
      padding-top: 68px;
      width: 100%;
      max-height: 100%;
    }
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
    colors[isSelected ? "gray300" : "gray400"]};
  transition: background-color 0.2s;
  p {
    color: ${colors.white};
  }

  &:hover {
    background-color: rgba(170, 170, 170, 0.3);
  }

  ${mediaRevers.tablet} {
    background-color: ${({ isSelected }) =>
      colors[isSelected ? "gray200" : "white"]};
    p {
      color: ${colors.black};
    }
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
  position: absolute;
  top: 100%;
  margin-top: 4px;
`;

const StyledInput = styled.input<{ isSmall: boolean; isDisabled: boolean }>`
  font-size: inherit;
  line-height: inherit;
  color: ${colors.white};
  border: none;
  padding-bottom: 2px;
  width: 100%;
  transition: 0.4s;

  background-color: ${({ isDisabled }) =>
    colors[isDisabled ? "gray100" : "black"]};

  &::placeholder {
    transition: 0.4s;
    color: ${colors.gray300};
  }

  &:focus {
    &::placeholder {
      color: ${colors.gray300};
    }
  }
`;

const WrappedMobileTitle = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  padding: 24px 16px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 21;

  ${media.tablet} {
    display: none;
  }
`;

const WrappedIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;

  :hover {
    opacity: 0.5;
    transition: 0.2s;
  }
  :active {
    opacity: 1;
    transition: 0.2s;
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
  } = props;

  const [values, setValues] = useState(selectedOptions || []);
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setValues(selectedOptions || []);
    // if (!selectedOptions?.length && !)
    //   setSearchValue("")
  }, [selectedOptions]);

  const isError = Boolean(error);
  const isLabelSmall = isOpen || Boolean(values.length);
  const iconName = isOpen ? "chevron-up-16" : "chevron-down-16";
  const iconColor = isDisabled ? "gray-300" : "white";

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
        {isOpen ? (
          <WrappedMobileTitle>
            <WrappedIcon onClick={onIconClick}>
              <Icon name="chevron-left-16" />
            </WrappedIcon>
            <Paragraph weight={500} size={16}>
              {label || ""}
            </Paragraph>
          </WrappedMobileTitle>
        ) : (
          <></>
        )}
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
            }}
            onBlur={() => {
              if (!selectedOptions?.length) setSearchValue("");
              else setSearchValue(selectedOptions[0].value);
            }}
          />
        )}

        {!searchable && content}

        <StyledBorder isWide={isOpen} />

        <StyledIcon disabled={isDisabled} onClick={onIconClick}>
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
          {isMulti && (
            <StyledOptionCheckbox>
              <Checkbox value={isSelected} />
            </StyledOptionCheckbox>
          )}

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
    <>
      <StyledDropdown isError={isError} isDisabled={isDisabled}>
        <Select
          multi={isMulti}
          disabled={isDisabled}
          values={values}
          options={options}
          placeholder=""
          searchable={false}
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
    </>
  );
};

export default Dropdown;
