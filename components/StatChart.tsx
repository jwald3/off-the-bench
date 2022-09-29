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

interface ChartProps {
    data: Array<any>;
    barDataOne: any;
    barDataTwo: any | undefined;
}

const StatChart: React.FunctionComponent<ChartProps> = ({ ...props }) => {
    return (
        <div
            style={{
                maxWidth: "1800px",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "2%",
            }}
        >
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={props.data}
                    margin={{ top: 40, right: 40, left: 0, bottom: 20 }}
                    style={{
                        width: "100%",
                        backgroundColor: "#f3f4f8",
                        fontSize: ".7em",
                    }}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="player_id" angle={-15} textAnchor="end" />
                    <YAxis />
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
