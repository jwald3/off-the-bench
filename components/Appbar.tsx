import * as React from "react";
import styles from "../styles/Appbar.module.scss";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

export default function DrawerAppBar() {
    const router = useRouter();
    const { user, error, isLoading } = useUser();

    return (
        <div className={styles.navbar}>
            <div className={styles.appLogo}>
                <Link href="/">
                    <picture>
                        <source
                            srcSet="https://user-images.githubusercontent.com/59290280/197950860-40a12f30-b942-455d-a34d-cfb636cac81c.png"
                            media="(min-width: 1400px)"
                            style={{
                                width: "350px",
                                height: "35px",
                            }}
                        />
                        <source
                            srcSet="https://user-images.githubusercontent.com/59290280/197330148-52e59072-de59-4105-b9d9-bcc738e65af5.png"
                            media="(max-width: 900px)"
                            style={{
                                width: "350px",
                                height: "35px",
                            }}
                        />
                        <img
                            src="https://user-images.githubusercontent.com/59290280/197950860-40a12f30-b942-455d-a34d-cfb636cac81c.png"
                            alt="example"
                            className={styles.logo}
                        />
                    </picture>
                </Link>
            </div>
            <div className={styles.navbarLinks}>
                {user ? (
                    <>
                        <div className={styles.navbarLink}>
                            <div>
                                <span
                                    onClick={() =>
                                        router.replace({
                                            pathname: "/teams",
                                        })
                                    }
                                >
                                    TEAMS
                                </span>
                            </div>
                        </div>
                        <div className={styles.navbarLink}>
                            <div>
                                <span
                                    onClick={() =>
                                        router.replace({
                                            pathname: "/stats/teams/offense",
                                        })
                                    }
                                >
                                    TEAM STATS
                                </span>
                            </div>
                        </div>
                        <div className={styles.navbarLink}>
                            <div>
                                <span
                                    onClick={() =>
                                        router.replace({
                                            pathname: "/stats/players/offense",
                                        })
                                    }
                                >
                                    PLAYER STATS
                                </span>
                            </div>
                        </div>
                        <div className={styles.navbarLink}>
                            <div>
                                <Link href="/api/auth/logout">LOG OUT</Link>
                            </div>
                        </div>
                        <div className={styles.navbarHomeLink}>
                            <Link href="/" passHref>
                                <span>
                                    <AiFillHome />
                                </span>
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.navbarLink}>
                            <div>
                                <Link href="/api/auth/login">LOGIN</Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
