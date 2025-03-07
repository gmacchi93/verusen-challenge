import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/modules/common/config/theme";
import { Roboto } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apolloClient";
import Layout from "@/modules/common/components/Layout";
import SnackbarProvider from "@/modules/common/components/SnackbarProvider/SnackbarProvider";

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
          <CssBaseline />
          <div id="root" className={roboto.variable}>
            <SnackbarProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SnackbarProvider>
          </div>
        </ThemeProvider>
      </AppCacheProvider>
    </ApolloProvider>
  );
}
