import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
    return (
        <div>
            <div className={styles.homeContainer}>
                <Head>
                    <title>Off The Bench</title>
                    <meta
                        name="description"
                        content="Off The Bench provides player and team
                                        stats for the NFL to help you gain an
                                        edge in sports gambling and fantasy
                                        sports"
                    />
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width, height=device-height"
                    />
                </Head>

                <div className={styles.homeBodyContainer}>
                    <div className={styles.banner}>
                        <div className={styles.clipped}>
                            <div className={styles.clippedInner}>
                                <div className={styles.logo}>
                                    <Image
                                        src="/Logo-Purple-No-Background.png"
                                        alt="logo"
                                        width={400}
                                        height={130}
                                    />
                                </div>
                                <div className={styles.textBlurb}>
                                    <span>
                                        Off The Bench provides player and team
                                        stats for the NFL to help you gain an
                                        edge in sports gambling and fantasy
                                        sports.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.featuresHeader}>Our Features</div>
                    <div className={styles.featuresArea}>
                        <div className={styles.featuresContainer}>
                            <div className={styles.singleFeature}>
                                <div className={styles.frontPageImgContainer}>
                                    <Image
                                        className={styles.frontPageImg}
                                        quality={100}
                                        src="/filters.png"
                                        layout="responsive"
                                        width={400}
                                        height={175}
                                        alt="Team Page Screenshot"
                                    />
                                </div>
                                <div className={styles.featureText}>
                                    <span>
                                        Each stat on the site can be filtered by
                                        week and down to let you specify your
                                        queries.
                                    </span>
                                </div>
                            </div>
                            <div className={styles.singleFeature}>
                                <div className={styles.frontPageImgContainer}>
                                    <Image
                                        className={styles.frontPageImg}
                                        quality={100}
                                        src="/personnel.png"
                                        layout="responsive"
                                        width={400}
                                        height={175}
                                        alt="Team Page Screenshot"
                                    />
                                </div>
                                <div className={styles.featureText}>
                                    <span>
                                        Team tendencies by down and personnel
                                        grouping help you predict in-game
                                        decisions.
                                    </span>
                                </div>
                            </div>
                            <div className={styles.singleFeature}>
                                <div className={styles.frontPageImgContainer}>
                                    <Image
                                        className={styles.frontPageImg}
                                        quality={100}
                                        src="/receiving.png"
                                        layout="responsive"
                                        width={400}
                                        height={175}
                                        alt="Team Page Screenshot"
                                    />
                                </div>
                                <div className={styles.featureText}>
                                    <span>
                                        Advanced stats like air yards and red
                                        zone usage offer you prime targets for
                                        regression.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
