import React, { useContext, useState } from "react";
import Default from "@/layouts/default";
import { ThemeContext } from "@/contexts/ThemeContext";
import Container from "@/libs/Container";
import { useSendMessage } from "@/hooks/useProfile";
import Dropdown from "@/packages/forms/Dropdown";
import RangeSingle from "@/packages/forms/range-single/RangeSingle";
import { Option } from "@/packages/forms/dropdown/Dropdown";

{
  /* <option value="0">sparklesRoutine</option>
<option value="1">fireRoutine</option>
<option value="2">rainbowVertical</option>
<option value="3">rainbowHorizontal</option>
<option value="4">colorsRoutine</option>
<option value="5">madnessNoise</option>
<option value="6">cloudNoise</option>
<option value="7">lavaNoise</option>
<option value="8">plasmaNoise</option>
<option value="9">rainbowNoise</option>
<option value="10">rainbowStripeNoise</option>
<option value="11">zebraNoise</option>
<option value="12">forestNoise</option>
<option value="13">oceanNoise</option>
<option value="14">colorRoutine</option>
<option value="15">snowRoutine</option>
<option value="16">matrixRoutine</option>
<option value="17">lightersRoutine</option> */
}
const mockAnim: Option[] = [
  { value: "sparklesRoutine", slug: "L_MODE0" },
  { value: "fireRoutine", slug: "L_MODE1" },
  { value: "rainbowVertical", slug: "L_MODE2" },
  { value: "rainbowHorizontal", slug: "L_MODE3" },
  { value: "colorsRoutine", slug: "L_MODE4" },
  { value: "madnessNoise", slug: "L_MODE5" },
  { value: "lavaNoise", slug: "L_MODE7" },
  { value: "plasmaNoise", slug: "L_MODE8" },

  { value: "colorRoutine", slug: "L_MODE14" },
  { value: "snowRoutine", slug: "L_MODE15" },
  { value: "matrixRoutine", slug: "L_MODE16" },
  { value: "lightersRoutine", slug: "L_MODE17" },

  { value: "cloudNoise", slug: "L_MODE6" },
  { value: "rainbowNoise", slug: "L_MODE9" },
  { value: "rainbowStripeNoise", slug: "L_MODE10" },
  { value: "zebraNoise", slug: "L_MODE11" },
  { value: "forestNoise", slug: "L_MODE12" },
  { value: "oceanNoise", slug: "L_MODE13" },
];

const savedcolors = {
  sparklesRoutine: {
    bright: 60,
    scale: 62,
    speed: 55,
  },
  fireRoutine: {
    bright: 129,
    scale: 0,
    speed: 0,
  },
  rainbowVertical: {
    bright: 45,
    scale: 240,
    speed: 0,
  },
  rainbowHorizontal: {
    bright: 90,
    scale: 230,
    speed: 0,
  },
  colorsRoutine: {
    bright: 50,
    scale: 16,
    speed: 0,
  },
  madnessNoise: {
    bright: 43,
    scale: 28,
    speed: 0,
  },
  cloudNoise: {
    bright: 13,
    scale: 37,
    speed: 6,
  },
  lavaNoise: {
    bright: 13,
    scale: 37,
    speed: 6,
  },
  plasmaNoise: {
    bright: 7,
    scale: 64,
    speed: 4,
  },
  rainbowNoise: {
    bright: 39,
    scale: 37,
    speed: 4,
  },
  rainbowStripeNoise: {
    bright: 39,
    scale: 37,
    speed: 4,
  },
  zebraNoise: {
    bright: 48,
    scale: 20,
    speed: 3,
  },
  forestNoise: {
    bright: 26,
    scale: 26,
    speed: 7,
  },
  oceanNoise: {
    bright: 18,
    scale: 12,
    speed: 16,
  },
  snowRoutine: {
    bright: 34,
    scale: 22,
    speed: 17,
  },
  matrixRoutine: {
    bright: 34,
    scale: 22,
    speed: 17,
  },
  lightersRoutine: {
    bright: 34,
    scale: 22,
    speed: 17,
  },
};
const Home: React.VFC<any> = (props) => {
  const { mutate: sendMessage } = useSendMessage();

  const [savedColors, setSavedcolors] = useState<{
    [key: string]: {
      bright: number;
      scale: number;
      speed: number;
    };
  }>(savedcolors);
  const [theme, setTheme] = useContext(ThemeContext);

  const [currentMode, setCurrentMode] = useState<Option>({
    value: "fireRoutine",
    slug: "L_MODE1",
  });
  const handleRequest = (message: string | number) => {
    sendMessage({
      data: message,
      onSuccess: () => console.log("success"),
    });
  };

  const handleChange = (value: Option[]) => {
    value[0]?.slug &&
      setCurrentMode(
        mockAnim.find((item) => item.slug === value[0]?.slug) || {
          value: "fireRoutine",
          slug: "L_MODE1",
        },
      );
    value[0]?.slug && handleRequest(value[0].slug);
  };
  return (
    <Default>
      <Container>
        <div className="space-32">
          <Dropdown
            options={mockAnim}
            selectedOptions={[
              currentMode || { value: "fireRoutine", slug: "L_MODE1" },
            ]}
            onChange={(value) => handleChange(value)}
          />
        </div>
        <div className="space-32">
          <RangeSingle
            label="Brightness"
            min={0}
            max={255}
            step={1}
            value={savedColors[currentMode.value]?.bright || 0}
            onChange={(value) => {
              handleRequest(`L_BRIGHT${value}`);
              setSavedcolors((prev) => ({
                ...prev,
                [currentMode.value]: {
                  ...prev[currentMode.value],
                  bright: value,
                },
              }));
            }}
          />
        </div>
        <div className="space-32">
          <RangeSingle
            label="Scale"
            min={0}
            max={255}
            step={1}
            value={savedColors[currentMode.value]?.scale || 0}
            onChange={(value) => {
              handleRequest(`L_SCALE${value}`);
              setSavedcolors((prev) => ({
                ...prev,
                [currentMode.value]: {
                  ...prev[currentMode.value],
                  scale: value,
                },
              }));
            }}
          />
        </div>
        <div className="space-32">
          <RangeSingle
            label="Speed"
            min={0}
            max={255}
            step={1}
            value={savedColors[currentMode.value]?.speed || 0}
            onChange={(value) => {
              handleRequest(`L_SPEED${value}`);
              setSavedcolors((prev) => ({
                ...prev,
                [currentMode.value]: {
                  ...prev[currentMode.value],
                  speed: value,
                },
              }));
            }}
          />
        </div>
      </Container>
    </Default>
  );
};

export default Home;
