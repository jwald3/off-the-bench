import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/StatTableHeader.module.scss";

const StatTableHeader = () => {
    const router = useRouter();
    const { phase } = router.query;
    const path = router.pathname;
    const { query } = router;

    return (
        <div className={styles.tableHeader}>
            <div>
                <h1
                    className={
                        phase?.toLocaleString().toLowerCase() == "offense"
                            ? styles.activeItem
                            : styles.itemSelector
                    }
                    onClick={() => {
                        if (query.weeks) {
                            {
                                router
                                    .replace({
                                        pathname: path,
                                        query: {
                                            phase: "offense",
                                            weeks: query.weeks,
                                            season: query.season,
                                        },
                                    })
                                    .then(() => router.reload());
                            }
                        } else {
                            router
                                .replace({
                                    pathname: path,
                                    query: {
                                        phase: "offense",
                                        season: query.season,
                                    },
                                })
                                .then(() => router.reload());
                        }
                    }}
                >
                    Offense
                </h1>
            </div>
            <h1 className={styles.dividerBar}>|</h1>
            <div>
                <h1
                    className={
                        phase?.toLocaleString().toLowerCase() == "defense"
                            ? styles.activeItem
                            : styles.itemSelector
                    }
                    onClick={() => {
                        if (query.weeks) {
                            {
                                router
                                    .replace({
                                        pathname: path,
                                        query: {
                                            phase: "defense",
                                            weeks: query.weeks,
                                            season: query.season,
                                        },
                                    })
                                    .then(() => router.reload());
                            }
                        } else {
                            router
                                .replace({
                                    pathname: path,
                                    query: {
                                        phase: "defense",
                                        season: query.season,
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

export default StatTableHeader;
