import { useState } from "react";
import PageLayout from "@/layout/PageLayout";
import { customTheme } from "@/stylesConfig/theme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "@fontsource/spartan/400.css";
import "@fontsource/spartan/500.css";
import "@fontsource/spartan/700.css";
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <ColorModeScript />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
