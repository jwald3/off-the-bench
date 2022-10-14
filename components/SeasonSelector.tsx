import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "../styles/SeasonSelector.module.scss";

interface CheckboxProps {
    seasonFilter: number;
    handleSeason: Function;
}

const SeasonSelector = (props: CheckboxProps) => {
    const router = useRouter();
    const { pathname, query } = router;
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
                    <div className={styles.buttonContainer}>
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
