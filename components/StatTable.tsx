import { DataGrid, GridToolbar } from "@mui/x-data-grid";

interface TableProps {
    data: Array<any>;
    columns: Array<any>;
    rowIdCol: string;
    pageSize: number;
}

const StatTable: React.FunctionComponent<TableProps> = ({ ...props }) => {
    const { data, columns, rowIdCol, pageSize } = props;

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
                components={{ Toolbar: GridToolbar }}
                // hideFooter={true}
                sx={{
                    fontSize: 10,
                    width: "90%",
                    margin: "auto",
                    marginBottom: "3%",
                    height: "100%",
                    color: "#101223",
                    boxShadow: "0px 0.3em 0.3em 0.3em rgba(0, 0, 0, 0.25)",
                }}
            />
        </div>
    );
};

export default StatTable;
