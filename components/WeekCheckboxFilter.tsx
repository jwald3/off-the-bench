import React, { useState } from "react";
import weeks from "../data/weeks.json";

interface CheckboxProps {
    handleFilters: Function;
}

const Checkbox = (props: CheckboxProps) => {
    const [checked, setChecked] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);

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
    };

    const handleClearAll = () => {
        const newChecked: [] = [];
        setChecked(newChecked);
        props.handleFilters(newChecked);
    };

    const handleSelectAll = () => {
        const newChecked: Array<number> = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ];
        setChecked(newChecked);
        props.handleFilters(newChecked);
    };

    return (
        <div className="checkbox-filters">
            {weeks.map((val, idx) => (
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
