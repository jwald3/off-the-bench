import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import styles from "../styles/SeasonSelector.module.scss";

interface CheckboxProps {
    statOption: string;
    categories: string;
}

interface SelectorOption {
    label: string;
    value: string;
}

const StatOptionSelector = (props: CheckboxProps) => {
    const router = useRouter();
    const [showSelector, setShowSelector] = useState(false);
    const [selStat, setSelStat] = useState(props.statOption);
    const [selectorOptions, setSelectorOptions] = useState<
        SelectorOption | any
    >([]);

    const handleStatChange = (val: string) => {
        router.push({
            pathname: val,
            query: {
                ...router.query,
            },
        });

        setSelStat(val);
    };

    const teamOptions: Array<SelectorOption> = [
        {
            label: "Basic",
            value: "/stats/teams/offense",
        },
        {
            label: "Personnel",
            value: "/stats/teams/personnel",
        },
    ];

    const playerOptions: Array<SelectorOption> = [
        {
            label: "Basic",
            value: "/stats/players/offense",
        },
        {
            label: "Receiving",
            value: "/stats/players/adv_rec",
        },
        {
            label: "Rushing",
            value: "/stats/players/rushing",
        },
    ];

    useEffect(() => {
        if (props.categories === "teams") {
            setSelectorOptions([...teamOptions]);
        } else if (props.categories === "players") {
            setSelectorOptions([...playerOptions]);
        }
    }, []);

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
                        options={selectorOptions}
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
