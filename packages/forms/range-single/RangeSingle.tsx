import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Range, getTrackBackground } from "react-range";
import { colors } from "@/helpers/styleColors";
import Title from "@/packages/typography/title/Title";
import Paragraph from "@/packages/typography/paragraph/Paragraph";

export interface IRangeSingle {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value?: number;
  valueFormatter?: string | ((value: number) => string);
  onChange?: (value: number) => void;
}

const StyledLabel = styled.div`
  margin-bottom: 24px;

  text-align: center;
`;

const StyledTrack = styled.div`
  height: 21px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const StyledThumb = styled.div`
  width: 21px;
  height: 21px;
  border: 4px solid ${colors.red100};
  border-radius: 50%;

  background-color: ${({ theme }) => theme.color["neutral-white"]};
`;

const StyledValue = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;

  white-space: nowrap;

  transform: translateX(-50%);
`;

const RangeSingle: React.VFC<IRangeSingle> = (props): JSX.Element => {
  const {
    label,
    min,
    max,
    step = 1,
    value = Math.round((min + max) / 2),
    valueFormatter,
    onChange,
  } = props;

  const [values, setValues] = useState([value]);
  useEffect(() => setValues([value]), [value]);

  const renderTrack = ({ props, children }: any) => {
    const gradient = getTrackBackground({
      min,
      max,
      values,
      colors: [colors.red100, colors.gray300],
    });

    const style = {
      ...props.style,
      background: `${gradient} content-box`,
    };

    return (
      <StyledTrack {...props} style={style}>
        {children}
      </StyledTrack>
    );
  };

  const renderThumb = ({ props, value }: any) => {
    let formattedValue = value;

    if (valueFormatter) {
      formattedValue =
        typeof valueFormatter === "string"
          ? `${formattedValue} ${valueFormatter}`
          : valueFormatter(formattedValue);
    }

    return (
      <StyledThumb {...props}>
        <StyledValue>
          <Paragraph size={16}>{formattedValue}</Paragraph>
        </StyledValue>
      </StyledThumb>
    );
  };

  const handleChange = ([newValue]: any) => {
    setValues([newValue]);
    if (onChange) onChange(newValue);
  };

  return (
    <div>
      {label && (
        <StyledLabel>
          <Title level={6}>{label}</Title>
        </StyledLabel>
      )}

      <Range
        min={min}
        max={max}
        step={step}
        values={values}
        renderTrack={renderTrack}
        renderThumb={renderThumb}
        onChange={handleChange}
      />
    </div>
  );
};

export default RangeSingle;
