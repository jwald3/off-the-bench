import styles from "../styles/TeamLinkBar.module.scss";
import { useRouter } from "next/router";

const TeamLinkBar: React.FunctionComponent = () => {
    const router = useRouter();

    return (
        <div className={styles.teamLinkBar}>
            <div className={styles.teamLinkHeader}>Team Links</div>
            <div className={styles.teamLinks}>
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
                    Home
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
            </div>
        </div>
    );
};

export default TeamLinkBar;
