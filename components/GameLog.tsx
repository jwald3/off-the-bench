import StatTable from "./StatTable";

interface TableProps {
    data: Array<any>;
    columns: Array<any>;
    rowIdCol: string;
    pageSize: number;
}

const GameLog: React.FunctionComponent<TableProps> = ({ ...props }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 0.3em 0.3em 0.3em rgba(0, 0, 0, 0.25)",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "2000px",
                height: "100%",
                alignItems: "center",
                backgroundColor: "#f3f4f8",
            }}
        >
            <div
                style={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    color: "#282a3a",
                    width: "100%",
                    paddingLeft: "2%",
                    height: "6vh",
                    display: "flex",
                    fontFamily: "Sarabun",
                    alignItems: "center",
                    textTransform: "uppercase",
                }}
            >
                Game Log
            </div>
            <StatTable
                data={props.data}
                columns={props.columns}
                rowIdCol={props.rowIdCol}
                pageSize={props.pageSize}
            />
        </div>
    );
};

export default GameLog;
