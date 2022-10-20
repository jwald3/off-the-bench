import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import styles from "../styles/SeasonSelector.module.scss";

interface CheckboxProps {
    statOption: string;
}

const StatOptionSelector = (props: CheckboxProps) => {
    const router = useRouter();
    const { pathname, query } = router;
    const [showSelector, setShowSelector] = useState(false);
    const [selStat, setSelStat] = useState(props.statOption);

    const handleStatChange = (val: string) => {
        router.push({
            pathname: val,
            query: {
                ...router.query,
            },
        });

        setSelStat(val);
    };

    const options = [
        {
            label: "Basic",
            value: "/stats/players/offense",
        },
        {
            label: "Receiving",
            value: "/stats/players/receiving",
        },
    ];

    return (
        <div className={styles.cardArea}>
            <div className={styles.seasonCard}>
                <div className={styles.cardHeader}>Stats</div>
                <div
                    className={styles.cardBody}
                    onClick={() => setShowSelector(!showSelector)}
                >
                    <Select
                        values={[
                            {
                                label: selStat.toString(),
                                value: selStat,
                            },
                        ]}
                        labelField="label"
                        valueField="value"
                        options={options}
                        onChange={(val) => handleStatChange(val[0].value)}
                        className={styles.selector}
                        color={"#939691"}
                    />
                </div>
            </div>
        </div>
    );
};

export default StatOptionSelector;
