import { useRouter } from "next/router";

const TeamLinkFooter: React.FunctionComponent = () => {
    const router = useRouter();

    return (
        <div
            style={{
                paddingBottom: "2%",
                display: "flex",
                gap: "2%",
                width: "90%",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                className="teamLink"
                onClick={() =>
                    router.replace({
                        pathname: "/teams/[team]",
                        query: {
                            team: router.query.team,
                        },
                    })
                }
                style={{ cursor: "pointer" }}
            >
                Team Home
            </div>
            <div
                className="teamLink"
                onClick={() =>
                    router.replace({
                        pathname: "/teams/[team]/usage",
                        query: {
                            team: router.query.team,
                        },
                    })
                }
                style={{ cursor: "pointer" }}
            >
                Usage Rates
            </div>
            <div
                className="teamLink"
                onClick={() =>
                    router.replace({
                        pathname: "/teams/[team]/personnel",
                        query: {
                            team: router.query.team,
                        },
                    })
                }
                style={{ cursor: "pointer" }}
            >
                Personnel
            </div>
            <div
                className="teamLink"
                onClick={() =>
                    router.replace({
                        pathname: "/teams/[team]/snap_counts/offense",
                        query: {
                            team: router.query.team,
                        },
                    })
                }
                style={{ cursor: "pointer" }}
            >
                Snap Counts
            </div>
            <div
                className="teamLink"
                onClick={() =>
                    router.replace({
                        pathname: "/teams/",
                    })
                }
                style={{ cursor: "pointer" }}
            >
                All Teams
            </div>
        </div>
    );
};

export default TeamLinkFooter;
