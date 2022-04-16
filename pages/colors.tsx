import React, { useEffect, useState } from "react";
import Default from "@/layouts/default";
import styled from "@emotion/styled";
import Container from "@/libs/Container";
import { useSendMessage } from "@/hooks/useProfile";
import RangeSingle from "@/packages/forms/range-single/RangeSingle";
import { HuePicker, ColorResult, RGBColor } from "react-color";

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
          <StyledMiniFrame className="space-32">
            <RangeSingle
              label="Brightness"
              min={0}
              max={255}
              step={1}
              onChange={(value) => handleRequest(`L_BRIGHT${value}`)}
            />
          </StyledMiniFrame>
        </StyledColors>
      </Container>
    </Default>
  );
};

export default Home;
