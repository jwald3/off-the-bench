import { useRouter } from "next/router";

const PlayerTableHeader = () => {
    const router = useRouter();
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
            <div>
                <h1
                    className={
                        path.toLocaleString().toLowerCase().includes("offense")
                            ? "active-item item-selector"
                            : "item-selector"
                    }
                    onClick={() => {
                        if (query.weeks) {
                            {
                                router
                                    .replace({
                                        pathname: "/stats/players/offense",
                                        query: {
                                            weeks: query.weeks,
                                        },
                                    })
                                    .then(() => router.reload());
                            }
                        } else {
                            router
                                .replace({
                                    pathname: "/stats/players/offense",
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
                            ? "active-item item-selector"
                            : "item-selector"
                    }
                    onClick={() => {
                        if (query.weeks) {
                            {
                                router
                                    .replace({
                                        pathname: "/stats/players/defense",
                                        query: {
                                            weeks: query.weeks,
                                        },
                                    })
                                    .then(() => router.reload());
                            }
                        } else {
                            router
                                .replace({
                                    pathname: "/stats/players/defense",
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
