import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import wks from "../data/weeks.json";

interface CheckboxProps {
    handleFilters: Function;
    weekFilter: number[];
}

interface Parameters {
    weeks: string | string[];
    phase: string | string[];
}

const Checkbox = (props: CheckboxProps) => {
    const router = useRouter();
    const path = router.pathname;
    const { query } = router;

    const [checked, setChecked] = useState(props.weekFilter);

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
            pathname: path,
            query: {
                phase: query.phase,
                weeks: urlNewChecked,
            },
        });
    };

    const handleClearAll = () => {
        const newChecked: [] = [];
        setChecked(newChecked);
        props.handleFilters(newChecked);

        const urlNewChecked = newChecked.map(String).join(",");

        router.push({
            pathname: path,
            query: {
                phase: query.phase,
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
            pathname: path,
            query: {
                phase: query.phase,
                weeks: urlNewChecked,
            },
        });
    };

    return (
        <div className="checkbox-filters">
            {wks.map((val, idx) => (
                <div key={idx}>
                    <div
                        className={
                            checked.includes(val.val)
                                ? "checkbox active"
                                : "checkbox inactive"
                        }
                        onClick={() => handleToggle(val.val)}
                    >
                        {val.val}
                    </div>
                </div>
            ))}
            <div className="control-btn" onClick={() => handleSelectAll()}>
                Select All
            </div>
            <div className="control-btn" onClick={() => handleClearAll()}>
                Clear All
            </div>
        </div>
    );
};

export default Checkbox;
