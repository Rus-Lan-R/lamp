// @ts-nocheck

import { themeDarkColor, themeLightColor } from "./colors";
import { themeDarkShadow, themeLightShadow } from "./shadow";
import { Theme } from "@emotion/react";

const theme = (mode: string): Theme => ({
  color: mode === "dark" ? themeDarkColor : themeLightColor,
  shadow: mode === "dark" ? themeDarkShadow : themeLightShadow,
  mode,
});

export default theme;
