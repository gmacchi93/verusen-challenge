import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import { ThemeProvider } from "@mui/material";
import theme from "@/modules/common/config/theme";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider>
      <ThemeProvider theme={theme}>
        <div id="root" className={roboto.className}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
