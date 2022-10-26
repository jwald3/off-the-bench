import * as React from "react";
import styles from "../styles/Appbar.module.scss";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { useRouter } from "next/router";
import Image from "next/image";

export default function DrawerAppBar() {
    const router = useRouter();

    return (
        <div className={styles.navbar}>
            <div className={styles.appLogo}>
                <Link href="/">
                    <Image
                        src="/sameLineLogo.png"
                        height={35}
                        width={350}
                        alt="Off The Bench Logo"
                        style={{ cursor: "pointer" }}
                    />
                </Link>
            </div>
            <div className={styles.navbarLinks}>
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
                <div className={styles.navbarHomeLink}>
                    <Link href="/" passHref>
                        <span>
                            <AiFillHome />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
