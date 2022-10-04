import { useRouter } from "next/router";

const TeamLinkBar: React.FunctionComponent = () => {
    const router = useRouter();

    return (
        <div
            className="teamLinkBar"
            style={{
                width: "90%",
                maxWidth: "1800px",
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "auto",
                marginRight: "auto",
                height: "10vh",
                padding: "2%",
                backgroundColor: "#f3f4f8",
                marginBottom: "2%",
                alignItems: "center",
                boxShadow: "0px 0.3em 0.3em 0.3em rgba(0, 0, 0, 0.25)",
                textTransform: "uppercase",
            }}
        >
            <div
                className="teamLinkHeader"
                style={{
                    height: "100%",
                    width: "65%",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    color: "#282a3a",
                }}
            >
                Team Links
            </div>
            <div
                className="teamLinks"
                style={{
                    height: "100%",
                    fontSize: "1em",
                    fontWeight: "bold",
                    width: "35%",
                    maxWidth: "300px",
                    display: "flex",
                    gap: "2%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#777986",
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
                    Home
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
            </div>
        </div>
    );
};

export default TeamLinkBar;
