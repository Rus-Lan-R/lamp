import React, { useContext, useState } from "react";
import Default from "@/layouts/default";
import Container from "@/libs/Container";

import { FromTest } from "@/components/form/Form";
interface IFromPage {}

const Home: React.VFC<IFromPage> = (props) => {
  return (
    <Default>
      <Container>
        <FromTest />
      </Container>
    </Default>
  );
};

export default Home;
