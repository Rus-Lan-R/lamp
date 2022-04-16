import React, { useContext, useState } from "react";
import Default from "@/layouts/default";
import { ThemeContext } from "@/contexts/ThemeContext";
import Container from "@/libs/Container";
import { useSendMessage } from "@/hooks/useProfile";
import Dropdown from "@/packages/forms/Dropdown";
import RangeSingle from "@/packages/forms/range-single/RangeSingle";
import { Option } from "@/packages/forms/dropdown/Dropdown";
const mockAnim: Option[] = [
  { value: "sparklesRoutine", slug: "L_MODE0" },
  { value: "fireRoutine", slug: "L_MODE1" },
  { value: "rainbowVertical", slug: "L_MODE2" },
  { value: "rainbowHorizontal", slug: "L_MODE3" },
  { value: "colorsRoutine", slug: "L_MODE4" },
  { value: "madnessNoise", slug: "L_MODE5" },
  { value: "cloudNoise", slug: "L_MODE6" },
  { value: "lavaNoise", slug: "L_MODE7" },
  { value: "plasmaNoise", slug: "L_MODE9" },
  { value: "rainbowStripeNoise", slug: "L_MODE10" },
  { value: "zebraNoise", slug: "L_MODE11" },
  { value: "forestNoise", slug: "L_MODE12" },
  { value: "oceanNoise", slug: "L_MODE13" },
  { value: "colorRoutine", slug: "L_MODE14" },
  { value: "snowRoutine", slug: "L_MODE15" },
  { value: "matrixRoutine", slug: "L_MODE16" },
  { value: "lightersRoutine", slug: "L_MODE17" },
];
const Home: React.VFC<any> = (props) => {
  const { mutate: sendMessage } = useSendMessage();
  const [theme, setTheme] = useContext(ThemeContext);

  const [currentMode, setCurrentMode] = useState<Option | undefined>({
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
    value[0].slug &&
      setCurrentMode(mockAnim.find((item) => item.slug === value[0].slug));
    value[0].slug && handleRequest(value[0].slug);
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
            onChange={(value) => handleRequest(`L_BRIGHT${value}`)}
          />
        </div>
        <div className="space-32">
          <RangeSingle
            label="Scale"
            min={0}
            max={255}
            step={1}
            onChange={(value) => handleRequest(`L_SCALE${value}`)}
          />
        </div>
        <div className="space-32">
          <RangeSingle
            label="Speed"
            min={0}
            max={255}
            step={1}
            onChange={(value) => handleRequest(`L_SPEED${value}`)}
          />
        </div>
      </Container>
    </Default>
  );
};

export default Home;
