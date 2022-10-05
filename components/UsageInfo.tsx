import ChartHeader from "./ChartHeader";
import StatChart from "./StatChart";
import StatTable from "./StatTable";

interface UsageProps {
    playerData: Array<any>;
    columns: Array<any>;
    barDataOne: string;
    barDataTwo: string | undefined;
    headerTitle: string;
    altOptionOne: string;
    altOptionTwo: string;
    altOptionThree: string;
    changeView: Function;
    dataKey: string;
}

const UsageInfo: React.FunctionComponent<UsageProps> = ({ ...props }) => {
    return (
        <div>
            <div
                style={{
                    boxShadow: "0px 0.3em 0.3em 0.3em rgba(0, 0, 0, 0.25)",
                    width: "90%",
                    maxWidth: "1800px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "2%",
                    marginTop: "2%",
                    backgroundColor: "#f3f4f8",
                    paddingBottom: "1%",
                }}
            >
                <ChartHeader
                    headerTitle={props.headerTitle}
                    altOptionOne={props.altOptionOne}
                    altOptionTwo={props.altOptionTwo}
                    altOptionThree={props.altOptionThree}
                    changeView={props.changeView}
                />
                <StatChart
                    data={props.playerData}
                    barDataOne={props.barDataOne}
                    barDataTwo={props.barDataTwo}
                    dataKey={props.dataKey}
                />

                <StatTable
                    data={props.playerData}
                    columns={props.columns}
                    rowIdCol={"db_id"}
                    pageSize={10}
                    disableFooter={true}
                    showToolbar={false}
                />
            </div>
        </div>
    );
};

export default UsageInfo;
