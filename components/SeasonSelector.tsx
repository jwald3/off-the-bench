import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "../styles/SeasonSelector.module.scss";

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
        <div className={styles.cardArea}>
            <div className={styles.seasonCard}>
                <div className={styles.cardHeader}>Season</div>
                <div
                    className={styles.cardBody}
                    onClick={() => setShowSelector(!showSelector)}
                >
                    {selSeason}
                </div>
            </div>
            {showSelector && (
                <div className={styles.expandedBody}>
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
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            gap: "5%",
                            paddingTop: "2%",
                        }}
                    >
                        <div
                            className={styles.closeBtn}
                            onClick={() => setShowSelector(!showSelector)}
                        >
                            Close
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeasonSelector;
