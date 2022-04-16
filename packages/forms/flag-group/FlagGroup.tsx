import React from "react";
import styled from "@emotion/styled";
import Paragraph from "@/packages/typography/paragraph/Paragraph";
import Title from "@/packages/typography/title/Title";

export interface IFlagGroup {
  title?: string;
  isColumn?: boolean;
  children: JSX.Element | JSX.Element[];
  description?: string;
  error?: string;
}

interface IStyledFlags {
  isColumn: boolean;
}

const StyledFlags = styled.ul<IStyledFlags>`
  display: ${({ isColumn }) => (isColumn ? "block" : "flex")};
  flex-wrap: wrap;
`;

interface IStyledFlag {
  isColumn: boolean;
}
const StyledError = styled.div`
  margin-top: 4px;
`;

const StyledFlag = styled.li<IStyledFlag>`
  margin-right: ${({ isColumn }) => (isColumn ? 0 : 24)}px;
  margin-bottom: ${({ isColumn }) => (isColumn ? 16 : 0)}px;

  &:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
`;

const FlagGroup: React.VFC<IFlagGroup> = (props): JSX.Element => {
  const { title, isColumn = false, children, description, error } = props;

  const flags = React.Children.map(children, (child) => (
    <StyledFlag isColumn={isColumn}>{child}</StyledFlag>
  ));

  return (
    <div>
      {title && (
        <div className="space-16">
          <Title level={6} color="black">
            {title}
          </Title>
        </div>
      )}
      {description && (
        <div className="space-16">
          <Paragraph size={16} color="gray-300">
            {description}
          </Paragraph>
        </div>
      )}

      <StyledFlags isColumn={isColumn}>{flags}</StyledFlags>
      {error ? (
        <StyledError>
          <Paragraph size={12} color="warning">
            {error}
          </Paragraph>
        </StyledError>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FlagGroup;
