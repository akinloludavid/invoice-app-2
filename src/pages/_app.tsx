import PageLayout from "@/layout/PageLayout";
import { customTheme } from "@/stylesConfig/theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "@fontsource/spartan/400.css";
import "@fontsource/spartan/500.css";
import "@fontsource/spartan/700.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ChakraProvider>
  );
}
