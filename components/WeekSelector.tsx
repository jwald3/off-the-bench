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

const WeekSelector = (props: CheckboxProps) => {
    const router = useRouter();
    const path = router.pathname;
    const { asPath, pathname, query } = router;
    const season = query.season || 2022;
    const [showSelector, setShowSelector] = useState(false);
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
                minWidth: "200px",
            }}
        >
            <div style={{ fontWeight: "bold" }}>Weeks</div>
            <div
                onClick={() => setShowSelector(!showSelector)}
                style={{ padding: "5%", cursor: "pointer" }}
            >
                {replaceAllConsectives(checked).join(", ")}
            </div>
            {showSelector && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div className={styles.weeksLabel}>Weeks</div>
                    <div style={{ display: "flex" }}>
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
                </div>
            )}
        </div>
    );
};

export default WeekSelector;
