import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import downs from "../data/downs.json";
import styles from "../styles/WeekCheckboxFilterUsage.module.scss";

interface CheckboxProps {
    handleFilters: Function;
    downFilter: number[];
}

const DownFilter = (props: CheckboxProps) => {
    const router = useRouter();
    const path = router.pathname;
    const { asPath, pathname, query } = router;
    const season = query.season || 2022;

    const [checked, setChecked] = useState(props.downFilter);

    useEffect(() => {
        if (query.downs !== undefined) {
            const selectedDowns = (query.downs as string)
                ?.split(",")
                .map(Number);

            setChecked(selectedDowns);
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
                downs: urlNewChecked,
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
                downs: "none",
                season: season,
            },
        });
    };

    const handleSelectAll = () => {
        const newChecked: Array<number> = [1, 2, 3, 4];
        setChecked(newChecked);
        props.handleFilters(newChecked);

        const urlNewChecked = newChecked.map(String).join(",");

        router.push({
            pathname: pathname,
            query: {
                ...router.query,
                downs: urlNewChecked,
                season: season,
            },
        });
    };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.weeksLabel}>Downs</div>
            <div className={styles.weekInputs}>
                {downs.map((val, idx) => (
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
        </div>
    );
};

export default DownFilter;
