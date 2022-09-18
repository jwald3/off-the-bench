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
                }}
            />
        </div>
    );
};

export default StatTable;
