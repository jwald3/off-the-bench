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
}

const UsageInfo: React.FunctionComponent<UsageProps> = ({ ...props }) => {
    return (
        <div>
            <div>
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
                />
                <div className="weekly-team-stats">
                    <StatTable
                        data={props.playerData}
                        columns={props.columns}
                        rowIdCol={"db_id"}
                        pageSize={10}
                    />
                </div>
            </div>
        </div>
    );
};

export default UsageInfo;
