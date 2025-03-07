import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import { ThemeProvider } from "@mui/material";
import theme from "@/modules/common/config/theme";
import { Roboto } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apolloClient";
import Layout from "@/modules/common/components/Layout";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ApolloProvider client={apolloClient}>
      <AppCacheProvider {...props}>
        <ThemeProvider theme={theme}>
          <div id="root" className={roboto.variable}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </ThemeProvider>
      </AppCacheProvider>
    </ApolloProvider>
  );
}
