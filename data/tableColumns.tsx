import { GridCellParams, GridColDef } from "@mui/x-data-grid";

export const playerDefenseColumns: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        width: 150,
        type: "string",
    },
    {
        headerName: "Position",
        field: "position",
        // flex: 0.75,
        type: "string",
    },
    {
        headerName: "Team",
        field: "team_abbr",
        type: "string",
    },
    {
        headerName: "Games",
        field: "week_count",
        type: "number",
    },
    {
        headerName: "INTs",
        field: "interception",
        // flex: 1,
        type: "number",
    },
    {
        headerName: "INT Yards",
        field: "int_return_yards",
        // flex: 0.75,
        type: "number",
    },
    {
        headerName: "INT TDs",
        field: "int_return_touchdown",
        // flex: 0.75,
        type: "number",
    },
    {
        headerName: "Passes Defended",
        field: "passes_defended",
        // flex: 0.75,
        type: "number",
    },
    {
        headerName: "Forced Fumbles",
        field: "fumbles_forced",
        // flex: 0.75,
        type: "number",
    },
    {
        headerName: "Sacks",
        field: "sack",
        type: "number",
        valueGetter: getTotalSacks,
    },
    {
        headerName: "Combined Tackles",
        field: "comb_tackles",
        // flex: 0.75,
        valueGetter: getComboTackles,
        type: "number",
    },
    {
        headerName: "Solo Tackles",
        field: "solo_tackles",
        type: "number",
    },
    {
        headerName: "Assists on Tackles",
        field: "assist_tackls",
        type: "number",
    },
    {
        headerName: "Tackles For Loss",
        field: "tackles_for_loss",
        // flex: 0.75,
        type: "number",
    },
    {
        headerName: "QB Hits",
        field: "qb_hits",
        // flex: 0.75,
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
        width: 150,
        type: "string",
    },
    {
        headerName: "Position",
        field: "position",
        // flex: 0.75,
        type: "string",
    },
    {
        headerName: "Team",
        field: "team_abbr",
        width: 50,
        type: "string",
    },
    {
        headerName: "Games",
        field: "week_count",
        width: 50,
        type: "number",
    },
    {
        headerName: "Pass Attempts",
        field: "pass_attempt",
        // flex: 1,
        type: "number",
    },
    {
        headerName: "Completions",
        field: "completion",
        // flex: 0.75,
        type: "number",
    },
    {
        headerName: "Incompletions",
        field: "incompletion",
        // flex: 0.75,
        type: "number",
    },
    {
        headerName: "Passing Yards",
        field: "passing_yards",
        // flex: 0.75,
        type: "number",
    },
    {
        headerName: "Passing TDs",
        field: "passing_TD",
        // flex: 0.75,
        type: "number",
    },
    {
        headerName: "INT",
        field: "interception",
        width: 50,
        type: "number",
    },
    {
        headerName: "Sacks",
        field: "sack",
        width: 50,
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
        // flex: 0.75,
        type: "number",
    },
    {
        headerName: "Rushing TDs",
        field: "rushing_TD",
        // flex: 0.75,
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
        width: 50,
        type: "number",
    },
    {
        headerName: "TGT",
        field: "target",
        width: 50,
        type: "number",
    },
    {
        headerName: "Receiving Yards",
        field: "receiving_yards",
        // flex: 1,
        type: "number",
    },
    {
        headerName: "Receiving TDs",
        field: "receiving_TD",
        // flex: 1,
        type: "number",
    },
];
