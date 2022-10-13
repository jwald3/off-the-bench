import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import wks from "../data/weeks.json";
import styles from "../styles/WeekCheckboxFilterUsage.module.scss";

const PhaseToggle = () => {
    const router = useRouter();
    const path = router.pathname;
    const { asPath, pathname, query } = router;
    const season = query.season || 2022;
    const [showSelector, setShowSelector] = useState(false);
    const phase = pathname.includes("offense")
        ? "offense"
        : pathname.includes("defense")
        ? "defense"
        : "offense";

    const handleToggle = () => {
        router.push({
            pathname: "/teams/[team]/snap_counts/[phase]",
            query: {
                ...router.query,
                team: query.team,
                phase: phase == "offense" ? "defense" : "offense",
            },
        });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f3f4f8",
                height: "100%",
                padding: "1%",
                borderRadius: ".5em",
                boxShadow: "0px 0.15em 0.15em 0.15em rgba(0, 0, 0, 0.25)",
                color: "#282a3a",
                minWidth: "10em",
                minHeight: "100%",
            }}
        >
            <div style={{ fontWeight: "bold" }}>Phase</div>
            <div
                onClick={() => setShowSelector(!showSelector)}
                style={{
                    padding: "5%",
                    cursor: "pointer",
                    textTransform: "capitalize",
                }}
            >
                {phase}
            </div>
            {showSelector && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: "1%",
                    }}
                >
                    <div onClick={() => handleToggle()}>
                        Go to {phase == "offense" ? "Defense" : "Offense"}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhaseToggle;
