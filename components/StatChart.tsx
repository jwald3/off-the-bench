import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

interface ChartProps {
    data: Array<any>;
    barDataOne: any;
    barDataTwo: any | undefined;
    dataKey: string;
}

const StatChart: React.FunctionComponent<ChartProps> = ({ ...props }) => {
    return (
        <div
            style={{
                maxWidth: "1800px",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "2%",
                backgroundColor: "#f3f4f8",
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
                {/* <PieChart width={1800} height={300}>
                    <Pie
                        dataKey={props.barDataOne}
                        nameKey="offense_grouping"
                        data={props.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={150}
                        fill="#404252"
                    ></Pie>
                    <Legend align="right" layout="horizontal" iconSize={10} />
                </PieChart> */}
            </ResponsiveContainer>
        </div>
    );
};

export default StatChart;
