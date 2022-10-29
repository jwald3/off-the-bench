import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import NextNProgress from "nextjs-progressbar";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <Layout>
                <NextNProgress color="#1da1f2" />
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    );
}

export default MyApp;
