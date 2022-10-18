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

            <div>
                <div style={{ backgroundColor: "#d9d9d9", paddingTop: "1%" }}>
                    <div
                        className="banner"
                        style={{
                            position: "relative",
                            backgroundImage:
                                "url(https://images.pexels.com/photos/264300/pexels-photo-264300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                            backgroundSize: "auto",
                            backgroundPosition: "right",
                            backgroundRepeat: "no-repeat",
                            maxWidth: "1800px",
                            maxHeight: "450px",
                            height: "50vh",
                            margin: "0 auto",
                            marginTop: "2%",
                            borderRadius: "1em",
                            backgroundColor: "#d9d9d9",
                            boxShadow:
                                "0px 0.15em 0.15em 0.15em rgba(0, 0, 0, 0.25);",
                            width: "90%",
                        }}
                    >
                        <div
                            className="clipped"
                            style={{
                                width: "60%",
                                height: "100%",
                                background: "#f3f4f8",
                                clipPath:
                                    "polygon(0 0, 100% 0%, 80% 100%, 0% 100%)",
                                borderRadius: "1em 0 0 1em",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <div
                                    className="logo"
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Image
                                        src="/logo1.png"
                                        alt="logo"
                                        width={250}
                                        height={250}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        width: "60%",
                                        maxWidth: "800px",
                                        textAlign: "center",
                                        margin: "auto",
                                        color: "#494252",
                                    }}
                                >
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
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "20vh",
                            fontSize: "2em",
                            color: "#494252",
                            fontWeight: "bold",
                        }}
                    >
                        Our Features
                    </div>
                    <div style={{ paddingBottom: "2%" }}>
                        <div
                            style={{
                                display: "flex",
                                width: "90%",
                                maxWidth: "1800px",
                                justifyContent: "space-around",
                                height: "40vh",
                                padding: "2%",
                                margin: "auto",
                                borderRadius: "1em",
                                backgroundColor: "#f3f4f8",
                                boxShadow:
                                    "0px 0.15em 0.15em 0.15em rgba(0, 0, 0, 0.25);",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: "1em",
                                    backgroundColor: "#f3f4f8",
                                    boxShadow:
                                        "0px .3em .3em .3em rgba(0, 0, 0, 0.25);",
                                    maxWidth: "400px",
                                    width: "25%",
                                    height: "100%",
                                }}
                            >
                                <div style={{ height: "50%" }}>
                                    <Image
                                        src="/filters.png"
                                        height={175}
                                        width={400}
                                        alt="Team Page Screenshot"
                                        style={{
                                            borderRadius: "1em 1em 0 0",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        height: "50%",
                                        backgroundColor:
                                            "rgba(243, 244, 248, 0.5)",
                                        width: "100%",
                                        maxWidth: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexWrap: "wrap",
                                        borderRadius: "inherit",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "75%",
                                            fontSize: "1em",
                                            textAlign: "center",
                                            color: "#777986",
                                        }}
                                    >
                                        Each stat on the site can be filtered by
                                        week and down to let you specify your
                                        queries.
                                    </span>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: "1em",
                                    backgroundColor: "#f3f4f8",
                                    boxShadow:
                                        "0px .3em .3em .3em rgba(0, 0, 0, 0.25);",
                                    maxWidth: "400px",
                                    width: "25%",
                                    height: "100%",
                                }}
                            >
                                <div style={{ height: "50%" }}>
                                    <Image
                                        src="/personnel.png"
                                        height={175}
                                        width={400}
                                        alt="Team Page Screenshot"
                                        style={{
                                            borderRadius: "1em 1em 0 0",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        height: "50%",
                                        backgroundColor:
                                            "rgba(243, 244, 248, 0.7)",
                                        width: "100%",
                                        maxWidth: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexWrap: "wrap",
                                        borderRadius: "inherit",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "75%",
                                            fontSize: "1em",
                                            textAlign: "center",
                                            color: "#777986",
                                        }}
                                    >
                                        Team tendencies by down and personnel
                                        grouping help you predict in-game
                                        decisions.
                                    </span>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: "1em",
                                    backgroundColor: "#f3f4f8",
                                    boxShadow:
                                        "0px .3em .3em .3em rgba(0, 0, 0, 0.25);",
                                    maxWidth: "400px",
                                    width: "25%",
                                    height: "100%",
                                }}
                            >
                                <div style={{ height: "50%" }}>
                                    <Image
                                        src="/receiving.png"
                                        height={175}
                                        width={400}
                                        alt="Team Page Screenshot"
                                        style={{
                                            borderRadius: "1em 1em 0 0",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        height: "50%",
                                        backgroundColor:
                                            "rgba(243, 244, 248, 0.7)",
                                        width: "100%",
                                        maxWidth: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexWrap: "wrap",
                                        borderRadius: "inherit",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "75%",
                                            fontSize: "1em",
                                            textAlign: "center",
                                            color: "#777986",
                                        }}
                                    >
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
