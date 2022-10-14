import StatTable from "./StatTable";
import styles from "../styles/GameLog.module.scss";

interface TableProps {
    data: Array<any>;
    columns: Array<any>;
    rowIdCol: string;
    pageSize: number;
    tableTitle: string;
}

const GameLog: React.FunctionComponent<TableProps> = ({ ...props }) => {
    return (
        <div className={styles.gamelogContainer}>
            <div className={styles.titleContainer}>{props.tableTitle}</div>
            <StatTable
                data={props.data}
                columns={props.columns}
                rowIdCol={props.rowIdCol}
                pageSize={props.pageSize}
                disableFooter={true}
                showToolbar={false}
            />
        </div>
    );
};

export default GameLog;
