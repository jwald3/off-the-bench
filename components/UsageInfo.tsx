import ChartHeader from "./ChartHeader";
import StatChart from "./StatChart";
import StatTable from "./StatTable";
import styles from "../styles/UsageInfo.module.scss";

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
        <div className={styles.usageContainer}>
            <div className={styles.usageInfo}>
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
