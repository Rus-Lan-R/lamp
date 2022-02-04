import React, { useState } from "react";

import { Pre, Line, LineNo, LineContent } from "./CodeEditor.styled";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import CodePreview from "@uiw/react-code-preview";
const initCode = `function add(a, b) {
  return a + b;
}
`;

export const CodeEditor: React.VFC = () => {
  const [code, setCode] = useState(initCode);

  const highlightWithNubers = (thisCode: string) => (
    <Highlight {...defaultProps} theme={theme} code={thisCode} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  );

  const highlight = (thisCode: string) => (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={thisCode}
      language="handlebars"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  );
  return (
    <>
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code)}
        padding={10}
        style={{
          boxSizing: "border-box",
          fontFamily: '"Dank Mono", "Fira Code", monospace',
          caretColor: "auto",
          ...theme.plain,
        }}
      />
      <CodePreview code={code} />;
    </>
  );
};
