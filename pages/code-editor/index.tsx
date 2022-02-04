import React, { useContext } from "react";
import Default from "@/layouts/default";
import Container from "@/libs/Container";
import styled from "@emotion/styled";
import { CodeEditor } from "@/components/code-editor/CodeEditor";
interface IHome {}
import CodePreview from "@uiw/react-code-preview";

const code = `
ReactDOM.render(
  <div>
    <button>hello world</button>
  </div>,
  _mount_
);
`;
const Home: React.VFC<IHome> = (props) => {
  return (
    <Default>
      <Container>
        {/* <CodeEditor /> */}
        <CodePreview code={code} />
      </Container>
    </Default>
  );
};

export default Home;
