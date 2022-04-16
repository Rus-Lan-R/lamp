import React, { useContext, useEffect, useState } from "react";
import Default from "@/layouts/default";
import styled from "@emotion/styled";
import Container from "@/libs/Container";
import { useSendMessage } from "@/hooks/useProfile";
import RangeSingle from "@/packages/forms/range-single/RangeSingle";
import { Input } from "@/packages/form/Input";
import Button from "@/packages/buttons/button/Button";

const Home: React.VFC<any> = (props) => {
  const { mutate: sendMessage } = useSendMessage();
  const [pin, setPin] = useState("");
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
