import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import wks from "../data/weeks.json";
import styles from "../styles/WeekCheckboxFilterUsage.module.scss";

interface CheckboxProps {
    handleFilters: Function;
    weekFilter: number[];
    seasonFilter: number;
    handleSeason: Function;
}

const Checkbox = (props: CheckboxProps) => {
    const router = useRouter();
    const path = router.pathname;
    const { asPath, pathname, query } = router;
    const season = query.season || 2022;

    const [checked, setChecked] = useState(props.weekFilter);
    const [selSeason, setSelSeason] = useState(props.seasonFilter);

    useEffect(() => {
        if (query.weeks !== undefined) {
            const selectedWeeks = (query.weeks as string)
                ?.split(",")
                .map(Number);

            setChecked(selectedWeeks);
        }
    }, []);

    const handleToggle = (value: number) => {
        const currentIndex = checked.indexOf(value); // will find index or return -1 if not found
        const newChecked = [...checked]; // array needs to be changed then assigned via new var

        if (currentIndex === -1) {
            newChecked.push(value); // if index not found, add it
        } else {
            newChecked.splice(currentIndex, 1); // if index is found, remove it
        }

        setChecked(newChecked);
        props.handleFilters(newChecked);

        const urlNewChecked = newChecked.map(String).join(",");

        router.push({
            pathname: pathname,
            query: {
                ...router.query,
                weeks: urlNewChecked,
                season: season,
            },
        });
    };

    const handleClearAll = () => {
        const newChecked: [] = [];
        setChecked(newChecked);
        props.handleFilters(newChecked);

        router.push({
            pathname: pathname,
            query: {
                ...router.query,
                weeks: "none",
                season: season,
            },
        });
    };

    const handleSelectAll = () => {
        const newChecked: Array<number> = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ];
        setChecked(newChecked);
        props.handleFilters(newChecked);

        const urlNewChecked = newChecked.map(String).join(",");

        router.push({
            pathname: pathname,
            query: {
                ...router.query,
                weeks: urlNewChecked,
                season: season,
            },
        });
    };

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
        <div className={styles.filterContainer}>
            <div className={styles.weeksLabel}>Weeks</div>
            <div className={styles.weekInputs}>
                {wks.map((val, idx) => (
                    <div key={idx}>
                        <div
                            className={
                                checked.includes(val.val)
                                    ? styles.checkboxActive
                                    : styles.checkboxInactive
                            }
                            onClick={() => handleToggle(val.val)}
                        >
                            {val.val}
                        </div>
                    </div>
                ))}
            </div>
            <div
                className={styles.controlBtn}
                onClick={() => handleSelectAll()}
            >
                Select All
            </div>
            <div className={styles.controlBtn} onClick={() => handleClearAll()}>
                Clear All
            </div>
            <div className={styles.seasonSelector}>
                <select
                    value={selSeason}
                    onChange={(e) => handleSeasonChange(Number(e.target.value))}
                >
                    <option value={2022}>2022</option>
                    <option value={2021}>2021</option>
                    <option value={2020}>2020</option>
                </select>
            </div>
        </div>
    );
};

export default Checkbox;
