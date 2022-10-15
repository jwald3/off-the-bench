import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
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

    const options = [
        {
            id: 0,
            label: "2022",
            value: 2022,
        },
        {
            id: 1,
            label: "2021",
            value: 2021,
        },
        {
            id: 2,
            label: "2020",
            value: 2020,
        },
    ];

    return (
        <div className={styles.cardArea}>
            <div className={styles.seasonCard}>
                <div className={styles.cardHeader}>Season</div>
                <div
                    className={styles.cardBody}
                    onClick={() => setShowSelector(!showSelector)}
                >
                    <Select
                        values={[
                            {
                                id: 0,
                                label: selSeason.toString(),
                                value: selSeason,
                            },
                        ]}
                        labelField="label"
                        valueField="value"
                        options={options}
                        onChange={(val) => handleSeasonChange(val[0].value)}
                        className={styles.selector}
                    />
                </div>
            </div>
            {/* {showSelector && (
                <div className={styles.expandedBody}>
                    <div className={styles.seasonSelector}>
                        <Select
                            values={[]}
                            labelField="label"
                            valueField="value"
                            options={options}
                            onChange={(val) => handleSeasonChange(val[0].value)}
                        />
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
            )} */}
        </div>
    );
};

export default SeasonSelector;
