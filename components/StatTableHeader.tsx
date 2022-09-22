import Link from "next/link";
import { useRouter } from "next/router";

const StatTableHeader = () => {
    const router = useRouter();
    const { phase } = router.query;
    const path = router.pathname;
    const { query } = router;

    return (
        <div
            style={{
                display: "flex",
                gap: "1%",
                margin: "auto",
                paddingLeft: "2%",
                maxWidth: "1400px",
                alignItems: "center",
            }}
        >
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
                            ? "active-item item-selector"
                            : "item-selector"
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
            <h1>|</h1>
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
                            ? "active-item item-selector"
                            : "item-selector"
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
