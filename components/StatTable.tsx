import { DataGrid, GridToolbar } from "@mui/x-data-grid";

interface TableProps {
    data: Array<any>;
    columns: Array<any>;
    rowIdCol: string;
    pageSize: number;
    disableFooter: boolean;
    showToolbar: boolean;
}

const StatTable: React.FunctionComponent<TableProps> = ({ ...props }) => {
    const { data, columns, rowIdCol, pageSize } = props;
    let toolbarVal = props.showToolbar ? GridToolbar : undefined;

    return (
        <div className="statTable">
            <DataGrid
                density="compact"
                autoHeight
                style={{ color: "#101223", backgroundColor: "#f3f4f8" }}
                rows={data}
                getRowId={(row) => row[rowIdCol]}
                columns={columns}
                pageSize={pageSize}
                experimentalFeatures={{ newEditingApi: true }}
                rowHeight={44}
                components={{ Toolbar: toolbarVal }}
                hideFooter={props.disableFooter}
                sx={{
                    fontSize: 10,
                    width: "100%",
                    margin: "auto",
                    height: "100%",
                    color: "#101223",
                    border: "none",
                    paddingLeft: "1%",
                    paddingRight: "1%",
                }}
            />
        </div>
    );
};

export default StatTable;
