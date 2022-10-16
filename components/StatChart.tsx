import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";
import {
    ValueType,
    NameType,
} from "recharts/src/component/DefaultTooltipContent";
import styles from "../styles/StatChart.module.scss";

interface ChartProps {
    data: Array<any>;
    barDataOne: any;
    barDataTwo: any | undefined;
    dataKey: string;
}

const StatChart: React.FunctionComponent<ChartProps> = ({ ...props }) => {
    const CustomTooltip = ({
        active,
        payload,
        label,
    }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: "white",
                        padding: "1em 1.5em",
                        boxShadow: "0px 0.3em 0.3em 0.3em rgba(0, 0, 0, 0.25)",
                        fontSize: "1.2em",
                        textTransform: "capitalize",
                    }}
                >
                    <div>
                        <p>{`${label}`}</p>
                        <p className="label">{`${payload[0].dataKey} : ${payload[0].value}`}</p>
                        {payload[1] && (
                            <p className="label">{`${payload[1].dataKey} : ${payload[1].value}`}</p>
                        )}
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className={styles.chartBody}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={props.data}
                    margin={{ top: 40, right: 40, left: 0, bottom: 20 }}
                    className={styles.barChart}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis
                        dataKey={props.dataKey}
                        angle={-15}
                        textAnchor="end"
                    />
                    <YAxis
                        type="number"
                        domain={[0, "auto"]}
                        allowDataOverflow={true}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey={props.barDataOne} fill="#494252" />
                    {props.barDataTwo !== "" && (
                        <Bar dataKey={props.barDataTwo} fill="#939691" />
                    )}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatChart;
