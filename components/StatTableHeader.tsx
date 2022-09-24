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
            <Link
                href={{
                    pathname: path,
                    query: {
                        phase: "offense",
                        weeks: query.weeks,
                    },
                }}
            >
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
                                    },
                                })
                                .then(() => router.reload());
                        }
                    }}
                >
                    Offense
                </h1>
            </Link>
            <h1 className={styles.dividerBar}>|</h1>
            <Link
                href={{
                    pathname: path,
                    query: {
                        phase: "offense",
                        weeks: query.weeks,
                    },
                }}
            >
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
                                    },
                                })
                                .then(() => router.reload());
                        }
                    }}
                >
                    Defense
                </h1>
            </Link>
        </div>
    );
};

export default StatTableHeader;
