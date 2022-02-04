import React from "react";

import { Canvas } from "react-three-fiber";
import { Scene } from "./Scene";

export const Canva: React.VFC = () => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }} id="rtfCanvas">
        <Scene />
      </Canvas>
      ;
    </>
  );
};
