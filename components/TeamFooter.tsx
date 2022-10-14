import { useRouter } from "next/router";
import styles from "../styles/TeamFooter.module.scss";

const TeamLinkFooter: React.FunctionComponent = () => {
    const router = useRouter();

    return (
        <div className={styles.footerContainer}>
            <div
                className={styles.teamLink}
                onClick={() =>
                    router.replace({
                        pathname: "/teams/[team]",
                        query: {
                            team: router.query.team,
                        },
                    })
                }
            >
                Team Home
            </div>
            <div
                className={styles.teamLink}
                onClick={() =>
                    router.replace({
                        pathname: "/teams/[team]/usage",
                        query: {
                            team: router.query.team,
                        },
                    })
                }
            >
                Usage Rates
            </div>
            <div
                className={styles.teamLink}
                onClick={() =>
                    router.replace({
                        pathname: "/teams/[team]/personnel",
                        query: {
                            team: router.query.team,
                        },
                    })
                }
            >
                Personnel
            </div>
            <div
                className={styles.teamLink}
                onClick={() =>
                    router.replace({
                        pathname: "/teams/[team]/snap_counts/offense",
                        query: {
                            team: router.query.team,
                        },
                    })
                }
            >
                Snap Counts
            </div>
            <div
                className={styles.teamLink}
                onClick={() =>
                    router.replace({
                        pathname: "/teams/",
                    })
                }
            >
                All Teams
            </div>
        </div>
    );
};

export default TeamLinkFooter;
