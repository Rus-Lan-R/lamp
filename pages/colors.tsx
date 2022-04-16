import React, { useContext, useEffect, useState } from "react";
import Default from "@/layouts/default";
import { ThemeContext } from "@/contexts/ThemeContext";
import styled from "@emotion/styled";
import Paragraph from "@/packages/typography/paragraph/Paragraph";
import Container from "@/libs/Container";
import { FromTest } from "@/components/form/Form";
import { Canva } from "@/components/canvas/Canva";
import { useSendMessage } from "@/hooks/useProfile";
import Dropdown from "@/packages/forms/dropdown/Dropdown";
import RangeSingle from "@/packages/forms/range-single/RangeSingle";
import { Input } from "@/packages/form/Input";
import Button from "@/packages/buttons/button/Button";
import {
  SketchPicker,
  HuePicker,
  ColorChangeHandler,
  ColorResult,
  RGBColor,
} from "react-color";
import useDebounce from "@/hooks/useDebounce";

const StyledColors = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledMiniFrame = styled.div`
  width: 100%;
`;
const Home: React.VFC<any> = (props) => {
  const { mutate: sendMessage } = useSendMessage();
  const [RGBAColor, setRGBAColor] = useState<RGBColor>();
  const [currenColor, setCurrentColor] = useState<{
    hex: string;
    opa: number;
  }>({
    hex: "fffffff",
    opa: 1,
  });
  useEffect(() => {
    handleRequest("L_MODE18");
  }, []);
  const handleRequest = (message: string | number) => {
    sendMessage({
      data: message,
      // onSuccess: () => console.log("success"),
    });
  };
  const handleChange = (value: ColorResult) => {
    setCurrentColor({ opa: value?.rgb?.a || 1, hex: value.hex });
    setRGBAColor(value.rgb);
    handleRequest(
      `{\"red\": ${value.rgb.r}, \"green\": ${value.rgb.g}, \"blue\": ${value.rgb.b}`,
    );
  };

  return (
    <Default>
      <Container>
        <StyledColors>
          {/* <div className="spce-64">
            <SketchPicker
              color={currenColor.hex}
              onChange={(value) => handleChange(value)}
            />
          </div> */}
          <div className="spce-64">
            <HuePicker
              color={currenColor.hex}
              // onChangeComplete={(value) => console.log("end", value)}
              onChange={(value) => handleChange(value)}
            />
          </div>
          <StyledMiniFrame className="space-32">
            <RangeSingle
              label="red"
              min={0}
              max={255}
              step={1}
              value={RGBAColor?.r}
              onChange={(value) => handleRequest(`RED${value}`)}
            />
          </StyledMiniFrame>
          <StyledMiniFrame className="space-32">
            <RangeSingle
              label="green"
              min={0}
              max={255}
              step={1}
              value={RGBAColor?.g}
              onChange={(value) => handleRequest(`GREEN${value}`)}
            />
          </StyledMiniFrame>
          <StyledMiniFrame className="space-32">
            <RangeSingle
              label="blue"
              min={0}
              max={255}
              step={1}
              value={RGBAColor?.b}
              onChange={(value) => handleRequest(`BLUE${value}`)}
            />
          </StyledMiniFrame>
        </StyledColors>
      </Container>
    </Default>
  );
};

export default Home;
