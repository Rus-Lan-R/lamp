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

const StyledButton = styled.button`
  color: ${({ theme }) => theme.color["red-300"]};
  background-color: ${({ theme }) => theme.color["white"]};
  transition: all 0.2s;
`;
const mockAnim = [
  { value: "sparklesRoutine", additional: "L_MODE0" },
  { value: "fireRoutine", additional: "L_MODE1" },
  { value: "rainbowVertical", additional: "L_MODE2" },
  { value: "rainbowHorizontal", additional: "L_MODE3" },
  { value: "colorsRoutine", additional: "L_MODE4" },
  { value: "madnessNoise", additional: "L_MODE5" },
  { value: "cloudNoise", additional: "L_MODE6" },
  { value: "lavaNoise", additional: "L_MODE7" },
  { value: "plasmaNoise", additional: "L_MODE9" },
  { value: "rainbowStripeNoise", additional: "L_MODE10" },
  { value: "zebraNoise", additional: "L_MODE11" },
  { value: "forestNoise", additional: "L_MODE12" },
  { value: "oceanNoise", additional: "L_MODE13" },
  { value: "colorRoutine", additional: "L_MODE14" },
  { value: "snowRoutine", additional: "L_MODE15" },
  { value: "matrixRoutine", additional: "L_MODE16" },
  { value: "lightersRoutine", additional: "L_MODE17" },
  { value: "rainbow", additional: "L_MODE18" },
];
const Home: React.VFC<any> = (props) => {
  const { mutate: sendMessage } = useSendMessage();
  const [[pin], setPin] = useState("");
  const [colors, setColors] = useState({
    red: 0,
    green: 0,
    blue: 0,
  });
  useEffect(() => {
    handleRequest("L_MODE19");
  }, []);
  const handleRequest = (message: string | number) => {
    sendMessage({
      data: message,
      onSuccess: () => console.log("success"),
    });
  };
  return (
    <Default>
      <Container>
        <div className="space-32">
          <Input label="pin" value={pin} onChange={(value) => setPin(value)} />
        </div>
        <div className="space-32">
          <RangeSingle
            label="red"
            min={0}
            max={255}
            step={1}
            onChange={(value) => setColors((prev) => ({ ...prev, red: value }))}
          />
        </div>
        <div className="space-32">
          <RangeSingle
            label="green"
            min={0}
            max={255}
            step={1}
            onChange={(value) =>
              setColors((prev) => ({ ...prev, green: value }))
            }
          />
        </div>
        <div className="space-32">
          <RangeSingle
            label="blue"
            min={0}
            max={255}
            step={1}
            onChange={(value) =>
              setColors((prev) => ({ ...prev, blue: value }))
            }
          />
        </div>

        <Button
          onClick={() =>
            handleRequest(
              `{\"pin\":${pin},\"red\": ${colors.red}, \"green\": ${colors.green}, \"blue\": ${colors.blue}}`,
            )
          }
        >
          отправить
        </Button>
      </Container>
    </Default>
  );
};

export default Home;
