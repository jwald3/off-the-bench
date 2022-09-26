import { useRouter } from "next/router";
import styles from "../styles/PlayerTableHeader.module.scss";

const PlayerTableHeader = () => {
    const router = useRouter();
    const path = router.pathname;
    const { query } = router;
    const sznVal = query.season || 2022;

    return (
        <div className={styles.tableHeader}>
            <div>
                <h1
                    className={
                        path.toLocaleString().toLowerCase().includes("offense")
                            ? styles.activeItem
                            : styles.itemSelector
                    }
                    onClick={() => {
                        if (query.weeks) {
                            {
                                router
                                    .replace({
                                        pathname: "/stats/players/offense",
                                        query: {
                                            weeks: query.weeks,
                                            season: sznVal,
                                        },
                                    })
                                    .then(() => router.reload());
                            }
                        } else {
                            router
                                .replace({
                                    pathname: "/stats/players/offense",
                                    query: {
                                        season: sznVal,
                                    },
                                })
                                .then(() => router.reload());
                        }
                    }}
                >
                    Offense
                </h1>
            </div>
            <h1>|</h1>
            <div>
                <h1
                    className={
                        path.toLocaleString().toLowerCase().includes("defense")
                            ? styles.activeItem
                            : styles.itemSelector
                    }
                    onClick={() => {
                        if (query.weeks) {
                            {
                                router
                                    .replace({
                                        pathname: "/stats/players/defense",
                                        query: {
                                            weeks: query.weeks,
                                            season: sznVal,
                                        },
                                    })
                                    .then(() => router.reload());
                            }
                        } else {
                            router
                                .replace({
                                    pathname: "/stats/players/defense",
                                    query: {
                                        season: sznVal,
                                    },
                                })
                                .then(() => router.reload());
                        }
                    }}
                >
                    Defense
                </h1>
            </div>
        </div>
    );
};

export default PlayerTableHeader;
