import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import wks from "../data/weeks.json";
import styles from "../styles/WeekSelector.module.scss";

interface CheckboxProps {
    handleFilters: Function;
    weekFilter: number[];
    seasonFilter: number;
    handleSeason: Function;
}

const WeekSelector = (props: CheckboxProps) => {
    const router = useRouter();
    const { pathname, query } = router;
    const season = query.season || 2022;
    const [showSelector, setShowSelector] = useState(false);
    const [checked, setChecked] = useState(props.weekFilter);

    useEffect(() => {
        if (query.weeks !== undefined) {
            const selectedWeeks = (query.weeks as string)
                ?.split(",")
                .map(Number);

            setChecked(selectedWeeks);
        }
    }, []);

    const getConsectiveCount = (arr: any[], index: number) => {
        arr = arr.map(Number);
        let count = 0;
        for (let i = index; i < arr.length; i++) {
            if (arr[i + 1] === arr[index] + (i - index) + 1) {
                count++;
            }
        }
        return count;
    };

    const replaceFirstConsective = (arr: any[]) => {
        for (let i = 0; i < arr.length; i++) {
            let count = getConsectiveCount(arr, i);
            if (count) {
                return [
                    ...arr.slice(0, i),
                    `${arr[i]}-${arr[i + count]}`,
                    ...arr.slice(i + count + 1),
                ];
            }
        }
        return arr;
    };

    const replaceAllConsectives = (arr: any[]) => {
        for (const element of arr) {
            arr = replaceFirstConsective(arr);
        }
        return arr.map(String);
    };

    const handleToggle = (value: number) => {
        const currentIndex = checked.indexOf(value); // will find index or return -1 if not found
        const newChecked = [...checked]; // array needs to be changed then assigned via new var

        if (currentIndex === -1) {
            newChecked.push(value); // if index not found, add it
        } else {
            newChecked.splice(currentIndex, 1); // if index is found, remove it
        }

        newChecked.sort((a, b) => Number(a) - Number(b));

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

    return (
        <div className={styles.cardArea}>
            <div className={styles.weekCard}>
                <div className={styles.cardHeader}>Weeks</div>
                <div
                    className={styles.cardBody}
                    onClick={() => setShowSelector(!showSelector)}
                >
                    {replaceAllConsectives(checked).join(", ")}
                </div>
            </div>
            {showSelector && (
                <div className={styles.expandedBody}>
                    <div className={styles.weeksLabel}>Weeks</div>
                    <div className={styles.weekBoxes}>
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
                        style={{
                            display: "flex",
                            width: "100%",
                            gap: "5%",
                            paddingTop: "2%",
                        }}
                    >
                        <div
                            className={styles.controlBtn}
                            onClick={() => handleSelectAll()}
                        >
                            Select All
                        </div>
                        <div
                            className={styles.controlBtn}
                            onClick={() => handleClearAll()}
                        >
                            Clear All
                        </div>
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

export default WeekSelector;
