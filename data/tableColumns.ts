import {
    GridCellParams,
    GridColDef,
    GridValueFormatterParams,
} from "@mui/x-data-grid";

export const playerDefenseColumns: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        flex: 1.75,
        type: "string",
    },
    {
        headerName: "Position",
        field: "position",
        flex: 0.5,
        type: "string",
    },
    {
        headerName: "Team",
        field: "team_abbr",
        flex: 0.5,
        type: "string",
    },
    {
        headerName: "Games",
        field: "week_count",
        flex: 0.5,
        type: "number",
    },
    {
        headerName: "INTs",
        field: "interception",
        flex: 1,
        type: "number",
    },
    {
        headerName: "INT Yards",
        field: "int_return_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "INT TDs",
        field: "int_return_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passes Defended",
        field: "passes_defended",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Forced Fumbles",
        field: "fumbles_forced",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Sacks",
        field: "sack",
        type: "number",
        flex: 1,
        valueGetter: getTotalSacks,
    },
    {
        headerName: "Combined Tackles",
        field: "comb_tackles",
        flex: 1,
        valueGetter: getComboTackles,
        type: "number",
    },
    {
        headerName: "Solo Tackles",
        field: "solo_tackles",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Assists on Tackles",
        field: "assist_tackls",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Tackles For Loss",
        field: "tackles_for_loss",
        flex: 1,
        type: "number",
    },
    {
        headerName: "QB Hits",
        field: "qb_hits",
        flex: 1,
        type: "number",
    },
];

function getTotalSacks(params: GridCellParams) {
    return params.row.sack + params.row.half_sack * 0.5;
}

function getComboTackles(params: GridCellParams) {
    return (
        params.row.solo_tackles +
        params.row.assist_tackls +
        params.row.tackle_with_assist
    );
}

export const playerOffenseColumns: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        flex: 1.5,
        type: "string",
    },
    {
        headerName: "Position",
        field: "position",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Team",
        field: "team_abbr",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Games",
        field: "week_count",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Pass Attempts",
        field: "pass_attempt",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Completions",
        field: "completion",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Incompletions",
        field: "incompletion",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passing Yards",
        field: "passing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passing TDs",
        field: "passing_TD",
        flex: 1,
        type: "number",
    },
    {
        headerName: "INT",
        field: "interception",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Sacks",
        field: "sack",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Carries",
        field: "rush_attempt",
        width: 75,
        type: "number",
    },
    {
        headerName: "Rushing Yards",
        field: "rushing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rushing TDs",
        field: "rushing_TD",
        flex: 1,
        type: "number",
    },
    {
        headerName: "TFL",
        field: "tackled_for_loss",
        width: 75,
        type: "number",
    },
    {
        headerName: "FUM",
        field: "fumble",
        width: 75,
        type: "number",
    },
    {
        headerName: "REC",
        field: "reception",
        flex: 0.75,
        type: "number",
    },
    {
        headerName: "TGT",
        field: "target",
        flex: 0.75,
        type: "number",
    },
    {
        headerName: "Rec. Yards",
        field: "receiving_yards",
        flex: 0.75,
        type: "number",
    },
    {
        headerName: "Rec. TDs",
        field: "receiving_TD",
        flex: 0.75,
        type: "number",
    },
];

export const teamStatColumns: GridColDef[] = [
    { headerName: "Team", field: "posteam", flex: 0.5 },
    {
        headerName: "Completions",
        field: "completions",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Pass Attempts",
        field: "pass_attempts",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Completion %",
        field: "compPercent",
        flex: 1,
        valueGetter: getCompletionPct,
        type: "number",
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return "";
            }

            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted} %`;
        },
    },
    {
        headerName: "Passing TDs",
        field: "pass_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "INTs",
        field: "interceptions",
        flex: 1,
        type: "number",
    },
    { headerName: "Sacks", field: "sacks", flex: 0.5, type: "number" },
    {
        headerName: "Passing Yards",
        field: "passing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rush Attempts",
        field: "rush_attempt",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rushing Yards",
        field: "rushing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Yards Per Carry",
        field: "yardsPerCarry",
        flex: 1,
        valueGetter: getYPC,
        type: "number",
    },
    {
        headerName: "Rushing TDs",
        field: "rush_touchdown",
        flex: 1,
        type: "number",
    },
];

function getCompletionPct(params: GridCellParams) {
    return (
        ((params.row.completions || 0) / params.row.pass_attempts) *
        100
    ).toFixed(2);
}

function getYPC(params: GridCellParams) {
    return `${(
        (params.row.rushing_yards || 0) / params.row.rush_attempt
    ).toFixed(2)}`;
}
