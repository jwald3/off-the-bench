import { useRouter } from "next/router";
import React, { useState } from "react";
import Select from "react-dropdown-select";
import styles from "../styles/SeasonSelector.module.scss";

interface CheckboxProps {
    statOption: string;
}

const StatOptionSelector = (props: CheckboxProps) => {
    const router = useRouter();
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
            label: "Offense",
            value: "/stats/teams/offense",
        },
        {
            label: "Defense",
            value: "/stats/teams/defense",
        },
        {
            label: "Receiving",
            value: "/stats/players/receiving",
        },
        {
            label: "Rushing",
            value: "/stats/players/rushing",
        },
        {
            label: "Personnel",
            value: "/stats/teams/personnel",
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
                        searchable={false}
                        backspaceDelete={false}
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
