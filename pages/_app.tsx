import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import "../styles/globals.css";
import { ThemeProvider } from "styled-components";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return <Component {...pageProps} />;
};

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default MyApp;
