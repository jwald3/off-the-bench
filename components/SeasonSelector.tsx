import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import downs from "../data/downs.json";
import styles from "../styles/WeekCheckboxFilterUsage.module.scss";

interface CheckboxProps {
    seasonFilter: number;
    handleSeason: Function;
}

const SeasonSelector = (props: CheckboxProps) => {
    const router = useRouter();
    const path = router.pathname;
    const { asPath, pathname, query } = router;
    const season = query.season || 2022;
    const [showSelector, setShowSelector] = useState(false);
    const [selSeason, setSelSeason] = useState(props.seasonFilter);

    useEffect(() => {
        if (query.season !== undefined) {
            const selectedSeason = Number(query.season);

            setSelSeason(selectedSeason);
        }
    }, []);

    const handleSeasonChange = (val: number) => {
        props.handleSeason(val);

        const allChecked: Array<number> = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ];

        const urlAllChecked = allChecked.map(String).join(",");

        router
            .push({
                pathname: pathname,
                query: {
                    ...router.query,
                    season: val,
                },
            })
            .then(() => router.reload());

        setSelSeason(val);
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
            <div style={{ fontWeight: "bold" }}>Season</div>
            <div
                onClick={() => setShowSelector(!showSelector)}
                style={{ padding: "5%", cursor: "pointer" }}
            >
                {selSeason}
            </div>
            {showSelector && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div className={styles.weeksLabel}>Weeks</div>
                    <div className={styles.seasonSelector}>
                        <select
                            value={selSeason}
                            onChange={(e) =>
                                handleSeasonChange(Number(e.target.value))
                            }
                        >
                            <option value={2022}>2022</option>
                            <option value={2021}>2021</option>
                            <option value={2020}>2020</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeasonSelector;
