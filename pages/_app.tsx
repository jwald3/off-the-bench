import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <NextNProgress color="#1da1f2" />
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
