import Link from "next/link";
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
            <Link
                href={{
                    pathname: "/stats/players/offense",
                    query: { weeks: query.weeks },
                }}
            >
                <h1
                    className={
                        path.toLocaleString().toLowerCase().includes("offense")
                            ? "active-item item-selector"
                            : "item-selector"
                    }
                >
                    Offense
                </h1>
            </Link>
            <h1>|</h1>
            <Link
                href={{
                    pathname: "/stats/players/defense",
                    query: { weeks: query.weeks },
                }}
            >
                <h1
                    className={
                        path.toLocaleString().toLowerCase().includes("defense")
                            ? "active-item item-selector"
                            : "item-selector"
                    }
                >
                    Defense
                </h1>
            </Link>
        </div>
    );
};

export default PlayerTableHeader;
