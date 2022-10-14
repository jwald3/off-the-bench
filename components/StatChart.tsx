import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import styles from "../styles/StatChart.module.scss";

interface ChartProps {
    data: Array<any>;
    barDataOne: any;
    barDataTwo: any | undefined;
    dataKey: string;
}

const StatChart: React.FunctionComponent<ChartProps> = ({ ...props }) => {
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
                    <Tooltip />
                    <Bar dataKey={props.barDataOne} fill="#777986" />
                    {props.barDataTwo !== "" && (
                        <Bar dataKey={props.barDataTwo} fill="#494252" />
                    )}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatChart;
