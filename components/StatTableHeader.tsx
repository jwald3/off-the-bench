import Link from "next/link";
import { useRouter } from "next/router";

const StatTableHeader = () => {
    const router = useRouter();
    const { phase } = router.query;

    return (
        <div style={{ display: "flex", gap: "1%", marginLeft: "5%" }}>
            <Link href="/stats/teams?phase=offense">
                <h1
                    className={
                        phase?.toLocaleString().toLowerCase() == "offense"
                            ? "active-item"
                            : ""
                    }
                >
                    Offense
                </h1>
            </Link>
            <h1>|</h1>
            <Link href="/stats/teams?phase=defense">
                <h1
                    className={
                        phase?.toLocaleString().toLowerCase() == "defense"
                            ? "active-item"
                            : ""
                    }
                >
                    Defense
                </h1>
            </Link>
        </div>
    );
};

export default StatTableHeader;
