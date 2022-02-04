import "../styles/styles.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ModalContext } from "@/contexts/ModalContext";
import { Hydrate } from "react-query/hydration";
import { ThemeProvider } from "@emotion/react";
import { ThemeContext } from "../contexts/ThemeContext";
import theme from "../theme/theme";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
const insert2body = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  div.style.display = "none";
  document.querySelector("body")?.prepend(div);
};

(async () => {
  if (typeof window !== "undefined" && "caches" in window) {
    const spriteLink = "/sprite.svg";
    const newCache = await caches.open("sprite");
    const options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "image/svg+xml",
      }),
    };
    let response = await newCache.match(spriteLink);
    let html;

    if (!response) {
      const req = new Request(spriteLink, options);
      await newCache.add(req);
      response = await newCache.match(spriteLink);
      html = await response?.text();
      insert2body(html || "");
      return;
    }

    html = await response.text();
    insert2body(html);
  }
})();

// const GTM_ID = "GTM-NSSNR3N";
const GTM_ID = "";

const StyledBody = styled.div<{ thisTheme: "light" | "dark" }>`
  ${({ thisTheme }) =>
    thisTheme === "light"
      ? css`
          background-color: white;
          color: black;
        `
      : css`
          background-color: black;
          color: white;
        `}
`;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [modalValue, setModalValue] = useState({ filterModal: false });

  const [themeValue, setThemeValue] = useState<"light" | "dark">("light");
  const thisTheme = theme(themeValue);

  return (
    <ThemeContext.Provider value={[themeValue, setThemeValue]}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ModalContext.Provider value={[modalValue, setModalValue]}>
            <ThemeProvider theme={thisTheme}>
              <StyledBody thisTheme={themeValue || "light"}>
                <Component {...pageProps} />
              </StyledBody>
            </ThemeProvider>
          </ModalContext.Provider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
