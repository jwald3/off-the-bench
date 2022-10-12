import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Off The Bench</title>
                <meta name="description" content="Over the Bench Homepage" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div
                style={{
                    display: "flex",
                    minHeight: "100%",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        height: "100%",
                        minHeight: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                ></div>
                <div
                    style={{
                        flex: 1,
                        height: "100%",
                        minHeight: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <img src="/Landing-Page.jpg" />
                </div>
            </div>
        </div>
    );
};

export default Home;
